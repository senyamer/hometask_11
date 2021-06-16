import { expect } from 'chai';
import { goto, run, stop } from './framework/lib/browser';

describe('Наш тест', () => {
    let page;
    beforeEach(async () => {
        await run();
        page = await goto()
    });
    afterEach(async () => {
        await stop()
    });


    it('тест', async () => {
        await page.click('#uid');
        await page.fill('#uid', "admin");
        await page.click('#passw');
        await page.fill('#passw', "admin");
        await page.click('//tbody/tr[3]/td[2]/input[1]');
        //await page.waitForNavigation();
        const text = ('tbody:nth-child(1) tr:nth-child(1) td.bb div.fl > p:nth-child(2)')
        const welcomeText = await page.textContent(text);
        expect('\n\t\t  Welcome to Altoro Mutual Online.\n\t\t').to.have.string(welcomeText);
    });
});
