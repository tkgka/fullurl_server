import puppeteer from "puppeteer";
export default async (html: any) => {
    const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
    const page = await browser.newPage();
    await page.goto(html);
    const imageBuffer = await page.screenshot({ omitBackground: true });
    await browser.close();
    return imageBuffer;
};