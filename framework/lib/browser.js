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
        headless: true,
        // slowMo: 500,
    });
    context = await browser.newContext();
    page = await context.newPage();
};
async function stop() {
    await page.close();
    await browser.close();
};
async function login() {
    await page.click('#uid');
    await page.fill('#uid', "admin");
    await page.click('#passw');
    await page.fill('#passw', "admin");
    await page.click('//tbody/tr[3]/td[2]/input[1]');
};

export {goto, run, stop, login};