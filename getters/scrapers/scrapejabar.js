const puppeteer = require('puppeteer')
const fs = require('fs')

const getCheerioContent = async (url) => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(url, {waitUntil: 'load'});
  await page.waitFor(10000);
  const textContent = await page.evaluate(() => document.querySelector('body').innerHTML)

  fs.writeFile('pikobar_content.txt', textContent, function (err) {
    if (err) return console.log(err)
    console.log('Success')
  })

  browser.close()
}

try {
  getCheerioContent('https://pikobar.jabarprov.go.id')
} catch (error) {
  console.error(error)
}
