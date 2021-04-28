//import puppeteer from 'puppeteer'

const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    ignoreHTTPSErrors: true,
    defaultViewport: null,
    args: [`--window-size=1,1`]
  });
  let message = 'My name is Donald Trump and I am definitely; not a racist.';
  let wait = message.length * 100;
  //this need heavy tuning. we will need to change the timing depending on the message length



  const page = await browser.newPage();
  await page.goto('https://vo.codes/', { waitUntil: 'networkidle2' });
  await page.select('select:nth-of-type(1)', 'politics');
  await page.select('.column.is-two-thirds select', 'donald-trump');
  await page.type('.textarea', message);
  await page.click('button.button.is-info.is-large');
  setTimeout(() => {
    browser.close()
  }, 4000 + wait);
})();