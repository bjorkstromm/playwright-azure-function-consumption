const { app } = require('@azure/functions');
const { Browser, chromium } = require('playwright');

app.http('test', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log(`Http function processed request for url "${request.url}"`);

        const browser = await chromium.launch();
        const page = await browser.newPage();
        const html = "<!DOCTYPE html><html><head><title>Test Page</title></head><body><h1>Hello world</h1></body></html>";
        await page.setContent(html);
        await page.evaluateHandle("document.fonts.ready");
        const footerHtml = `<div style="display:flex; justify-content:flex-end; font-size: 8px; width: 297mm; margin-right: 15px; margin-left: 15px;">FOOTER<span style="position:fixed"><span class="pageNumber"></span>/<span class="totalPages"></span></span></div>`;
        const reportBuffer = await page.pdf({
            format: "A4",
            displayHeaderFooter: true,
            headerTemplate: `<div></div>`,
            footerTemplate: footerHtml,
            margin: { top: "5mm", bottom: "1.5cm", left: "5mm", right: "5mm" },
        });

        return { body: reportBuffer, headers: { "Content-Type": "application/pdf" } };
    }
});