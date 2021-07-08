import { expect } from 'chai';
import { goto, run, stop, login } from './framework/lib/browser';

describe('UI тестрование Altoro Mutual Online', () => {
    let page;
    beforeEach(async () => {
        await run();
        page = await goto()
    });
    afterEach(async () => {
        await stop()
    });

    it('Логгирование', async () => {
        await login();
        const text = ('tbody:nth-child(1) tr:nth-child(1) td.bb div.fl > p:nth-child(2)');
        const welcomeText = await page.textContent(text);
        expect(welcomeText).to.have.string('Welcome to Altoro Mutual Online.');
    });

    it('Просмотр истории переводов', async () => {
        await login();
        await page.click('#btnGetAccount');
        const text = ('td.bb div.fl td:nth-child(1) table:nth-child(1) tbody:nth-child(1) tr:nth-child(1) > th:nth-child(1)');
        const balanceText = await page.textContent(text);
        expect(balanceText).to.have.string('Balance Detail');
    });

    it('Перевод денег со счета на счет', async () => {
        await login();
        await page.click('#MenuHyperLink3');
        await page.selectOption('#toAccount', '800001');
        let sum = '100.0';
        await page.fill('#transferAmount', sum);
        await page.click('#transfer');
        const text = ('td.bb div.fl:nth-child(2) tbody:nth-child(1) tr:nth-child(6) td:nth-child(1) span:nth-child(1) > span:nth-child(1)');
        const successText = await page.textContent(text);
        expect(successText).to.have.string(`${sum} was successfully transferred`);
    });

    it('Изменение языка сайта', async () => {
        await login();
        await page.click('#MenuHyperLink5');
        await page.click('//a[contains(text(),"International")]');
        const text = ('tr:nth-child(1) td.bb div.fl form:nth-child(2) > p:nth-child(1)');
        const languageText = await page.textContent(text);
        expect(languageText).to.have.string('international');
    });

    it('Создание карты', async () => {
        await login();
        await page.click("//a[contains(text(),'Here')]");
        await page.click('//body[1]/table[2]/tbody[1]/tr[1]/td[2]/div[1]/span[1]/form[1]/table[1]/tbody[1]/tr[1]/td[2]/input[1]'); //password
        await page.fill('//body[1]/table[2]/tbody[1]/tr[1]/td[2]/div[1]/span[1]/form[1]/table[1]/tbody[1]/tr[1]/td[2]/input[1]', "admin"); //password
        await page.click('//tbody/tr[2]/td[2]/input[1]'); //submit
        const text = ('#_ctl0__ctl0_Content_Main_lblMessage');
        const cardText = await page.textContent(text);
        expect(cardText).to.have.string('will be sent in the mail');
    });
});
