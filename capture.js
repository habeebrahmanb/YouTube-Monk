const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
    console.log("Launching browser...");
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });
    
    const fileUrl = `file://${path.join(__dirname, 'store', 'screenshots.html').replace(/\\/g, '/')}`;
    console.log("Navigating to:", fileUrl);
    await page.goto(fileUrl, { waitUntil: 'networkidle0' });
    
    // Give it an extra second for iframes to fully render
    await new Promise(r => setTimeout(r, 1000));
    
    // Capture each banner
    const banners = [
        { id: '#banner-1', name: 'promo_dashboard.png' },
        { id: '#banner-2', name: 'promo_seo.png' },
        { id: '#banner-3', name: 'promo_stats.png' },
        { id: '#banner-4', name: 'promo_export.png' }
    ];

    for (const b of banners) {
        const element = await page.$(b.id);
        if (element) {
            await element.screenshot({ path: path.join(__dirname, 'store', b.name) });
            console.log(`Saved ${b.name}`);
        } else {
            console.log(`Element ${b.id} not found.`);
        }
    }
    
    await browser.close();
    console.log("Screenshots captured successfully.");
})();
