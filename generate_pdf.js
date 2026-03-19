const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const SCREENSHOTS_DIR = 'screenshots_hd';
const OUTPUT_PDF = 'adraca_io_screenshots_consolidated.pdf';
const TEMP_HTML = 'temp_gallery_for_pdf.html';

const SEQUENCE = [
    'index.png',
    'platform.png',
    'products.png',
    'products_security-sovereignty.png',
    'products_cloud-infrastructure.png',
    'products_data-migration.png',
    'industries.png',
    'industries_finance.png',
    'industries_health.png',
    'industries_energy.png',
    'industries_automotive.png',
    'industries_cmt.png',
    'industries_consumer-goods.png',
    'industries_retail.png',
    'intelligence.png',
    'demo.png',
    'about.png',
    'pricing.png',
    'contact.png',
    'contact_subject=Free_Audit.png',
    'compliance.png',
    'compliance_privacy.png',
    'compliance_terms.png',
    'impressum.png'
];

async function generatePDF() {
    console.log('📄 Starting consolidated PDF generation (Retry with Temp File)...');
    
    const browser = await chromium.launch();
    const page = await browser.newPage();

    const allFiles = fs.readdirSync(SCREENSHOTS_DIR).filter(f => f.endsWith('.png'));
    const sortedFiles = [...SEQUENCE.filter(f => allFiles.includes(f))];
    allFiles.forEach(f => {
        if (!sortedFiles.includes(f)) {
            sortedFiles.push(f);
        }
    });

    let htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { margin: 0; padding: 0; background: #fff; }
                .page { 
                    page-break-after: always; 
                    width: 100%;
                }
                img { 
                    width: 100%;
                    height: auto;
                    display: block;
                }
                .label {
                    padding: 10px;
                    font-family: sans-serif;
                    font-size: 14px;
                    background: #f1f5f9;
                    text-align: center;
                    border-bottom: 1px solid #e2e8f0;
                }
            </style>
        </head>
        <body>
    `;

    for (const file of sortedFiles) {
        const absolutePath = path.resolve(SCREENSHOTS_DIR, file);
        const displayName = file.replace('.png', '').replace(/_/g, ' ').toUpperCase();
        htmlContent += `
            <div class="page">
                <div class="label">${displayName}</div>
                <img src="${absolutePath}" />
            </div>
        `;
    }
    htmlContent += `</body></html>`;

    fs.writeFileSync(TEMP_HTML, htmlContent);

    // Load the local HTML file
    await page.goto('file://' + path.resolve(TEMP_HTML), { waitUntil: 'networkidle' });

    // Wait extra time for all images to render
    await page.waitForTimeout(3000);

    await page.pdf({
        path: OUTPUT_PDF,
        format: 'A4',
        printBackground: true,
        scale: 0.8, // Scale down slightly to ensure headers and images fit on A4 well
        margin: { top: '0px', right: '0px', bottom: '0px', left: '0px' }
    });

    console.log(`✅ PDF successfully generated: ${OUTPUT_PDF}`);
    
    // Clean up
    fs.unlinkSync(TEMP_HTML);
    await browser.close();
}

generatePDF().catch(err => {
    console.error('❌ Error generating PDF:', err);
    process.exit(1);
});
