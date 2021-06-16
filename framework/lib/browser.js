import playwright from 'playwright';

let browser;
let context;
let page;

async function goto() {
    await page.goto('http://demo.testfire.net/login.jsp');
    return page;
};
async function run() {
    browser = await playwright.chromium.launch({
        headless: false,
        slowMo: 500,
    });
    context = await browser.newContext();
    page = await context.newPage();
};
async function stop() {
    await page.close();
    await browser.close();
};

export {goto, run, stop};