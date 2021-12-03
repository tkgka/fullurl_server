import puppeteer from "puppeteer";
export default async (html: string) => {
    const browser = await puppeteer.launch({ args: ['--no-sandbox'], defaultViewport: { width: 960, height: 540 } });
    const page = await browser.newPage();
    await page.goto(html);
    const imageBuffer = await page.screenshot({ omitBackground: true });
    await browser.close();
    return imageBuffer;
};