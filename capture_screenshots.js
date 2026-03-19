const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

// --- Configuration ---
const BASE_URL = 'http://localhost:3000';
const OUTPUT_DIR = 'screenshots_hd';
const VIEWPORT = { width: 1920, height: 1080 };

// --- Main Function ---
async function run() {
  console.log('🚀 Starting screenshot process...');

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR);
  }

  const browser = await chromium.launch();
  const context = await browser.newContext({ 
    viewport: VIEWPORT,
    deviceScaleFactor: 2 // For HD/Retina quality
  });
  
  try {
    // Phase 1: Crawl and find all URLs
    const allUrls = await crawlSite(BASE_URL, context);
    console.log(`✅ Found ${allUrls.size} unique pages to capture.`);

    // Phase 2: Take screenshots of each URL
    const screenshotData = [];
    for (const url of allUrls) {
      const data = await captureScreenshot(url, context);
      if (data) screenshotData.push(data);
    }
    
    // Phase 3: Generate the HTML gallery
    generateGallery(screenshotData);
    console.log(`\n🎉 Process complete! Check the '${OUTPUT_DIR}' directory and 'gallery.html'.`);

  } catch (error) {
    console.error('An error occurred:', error);
  } finally {
    await browser.close();
  }
}

// --- Helper Functions ---

/**
 * Phase 1: Crawler to discover all internal links.
 */
async function crawlSite(startUrl, context) {
  console.log('🕵️‍♂️ Crawling site to find all URLs...');
  const queue = [startUrl];
  const visited = new Set();
  const urlHostname = new URL(startUrl).hostname;

  while (queue.length > 0) {
    const currentUrl = queue.shift();
    if (visited.has(currentUrl)) continue;

    visited.add(currentUrl);
    console.log(`   - Visiting: ${currentUrl}`);

    const page = await context.newPage();
    try {
      await page.goto(currentUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });
      // Extract all links that are internal
      const links = await page.evaluate(() => Array.from(document.querySelectorAll('a'), a => a.href));
      
      for (const link of links) {
        try {
            const absoluteUrl = new URL(link, startUrl).href.split('#')[0]; // Normalize and remove fragment
            if (new URL(absoluteUrl).hostname === urlHostname && !visited.has(absoluteUrl)) {
              queue.push(absoluteUrl);
            }
        } catch (e) {
            // Ignore invalid URLs
        }
      }
    } catch (error) {
      console.warn(`   - Could not process ${currentUrl}: ${error.message}`);
    } finally {
      await page.close();
    }
  }
  return visited;
}

/**
 * Phase 2: Screenshot Taker.
 */
async function captureScreenshot(url, context) {
    const page = await context.newPage();
    try {
        console.log(`📸 Capturing: ${url}`);
        // Create a filename from the URL
        let fileNamePart = url.replace(`${BASE_URL}`, '').replace(/\/$/, '') || 'index';
        if (fileNamePart.startsWith('/')) fileNamePart = fileNamePart.substring(1);
        const filename = `${fileNamePart.replace(/\//g, '_') || 'index'}.png`;
        const filepath = path.join(OUTPUT_DIR, filename);

        await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
        
        // Wait for animations/renders
        await page.waitForTimeout(1000); 

        await page.screenshot({ path: filepath, fullPage: true });
        
        console.log(`   -> Saved to ${filepath}`);
        return { url, filepath: path.relative(process.cwd(), filepath) };
    } catch (error) {
        console.error(`   -> Failed to capture ${url}: ${error.message}`);
        return null;
    } finally {
        await page.close();
    }
}

/**
 * Phase 3: Gallery Generator.
 */
function generateGallery(screenshotData) {
  console.log('🖼️  Generating HTML gallery...');
  let htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Adraca.io Screenshot Gallery</title>
      <style>
        body { font-family: 'Inter', sans-serif; background-color: #f8fafc; margin: 0; padding: 40px; color: #1e293b; }
        h1 { text-align: center; font-weight: 800; margin-bottom: 40px; font-size: 2.5rem; }
        .gallery { display: grid; grid-template-columns: repeat(auto-fill, minmax(400px, 1fr)); gap: 30px; }
        .card { border: none; border-radius: 16px; overflow: hidden; background: #fff; box-shadow: 0 10px 25px rgba(0,0,0,0.05); transition: transform 0.2s; }
        .card:hover { transform: translateY(-5px); }
        .card img { width: 100%; display: block; border-bottom: 1px solid #e2e8f0; cursor: pointer; }
        .card a { text-decoration: none; color: inherit; }
        .card-info { padding: 20px; }
        .card-info p { margin: 0; word-wrap: break-word; font-size: 14px; color: #64748b; }
        .card-info h3 { margin: 0 0 8px 0; font-size: 16px; color: #0f172a; }
      </style>
    </head>
    <body>
      <h1>Adraca.io HD Screenshot Gallery</h1>
      <div class="gallery">
  `;

  for (const { url, filepath } of screenshotData) {
    const pageName = url.replace(`${BASE_URL}/`, '') || 'Home';
    htmlContent += `
        <div class="card">
          <a href="${filepath}" target="_blank">
            <img src="${filepath}" alt="Screenshot of ${url}" loading="lazy">
            <div class="card-info">
              <h3>${pageName}</h3>
              <p>${url}</p>
            </div>
          </a>
        </div>
    `;
  }

  htmlContent += `
      </div>
    </body>
    </html>
  `;
  fs.writeFileSync('gallery.html', htmlContent);
  console.log('✅ Gallery saved to gallery.html');
}

// --- Execute the script ---
run();
