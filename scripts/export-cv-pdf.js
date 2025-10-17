const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(`file://${path.resolve('generated/cv-latest.html')}`, {waitUntil: 'networkidle0'});
  await page.pdf({
    path: path.resolve('generated/cv-latest.pdf'),
    format: 'A4',
    printBackground: true,
    margin: {top: '20mm', bottom: '20mm', left: '10mm', right: '10mm'}
  });
  await browser.close();
  console.log('✅ PDF CV exported to generated/cv-latest.pdf');
})();
