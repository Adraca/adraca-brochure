// Native fetch is available in Node.js 18+
// No external dependencies needed

const BASE_URL = 'http://localhost:3000';
const visited = new Set();
const queue = [BASE_URL];
const brokenLinks = [];

// Helper to normalize URLs
const normalizeUrl = (url) => {
    try {
        const u = new URL(url, BASE_URL);
        // Only crawl internal links
        if (u.origin !== BASE_URL) return null;
        // Strip hash
        u.hash = '';
        return u.href;
    } catch (e) {
        return null;
    }
};

async function checkLinks() {
    console.log(`Starting crawl at ${BASE_URL}...`);

    while (queue.length > 0) {
        const url = queue.shift();
        if (visited.has(url)) continue;
        visited.add(url);

        try {
            const res = await fetch(url);

            if (!res.ok) {
                console.error(`[BROKEN] ${url} (Status: ${res.status})`);
                brokenLinks.push({ url, status: res.status, source: 'Crawler' });
                continue;
            }

            console.log(`[OK] ${url}`);

            // Only extract links from HTML pages
            const contentType = res.headers.get('content-type');
            if (contentType && contentType.includes('text/html')) {
                const text = await res.text();
                // Simple regex or cheerio to find links. 
                // Since we don't have cheerio installed, let's use a regex for hrefs.
                // Re-using cheerio if available would be robust, but regex is sufficient for <a href="...">
                const hrefRegex = /href=["']([^"']+)["']/g;
                let match;
                while ((match = hrefRegex.exec(text)) !== null) {
                    const foundUrl = normalizeUrl(match[1]);
                    if (foundUrl && !visited.has(foundUrl) && !queue.includes(foundUrl)) {
                        queue.push(foundUrl);
                    }
                }
            }

        } catch (err) {
            console.error(`[ERROR] ${url} (${err.message})`);
            brokenLinks.push({ url, error: err.message, source: 'Crawler' });
        }
    }

    console.log('\n--- Report ---');
    if (brokenLinks.length === 0) {
        console.log('No broken links found!');
    } else {
        console.log(`${brokenLinks.length} broken links found:`);
        brokenLinks.forEach(link => console.log(JSON.stringify(link)));
    }
}

checkLinks();
