const puppeteer = require('puppeteer')
const fs = require('fs')
const cheerio = require('cheerio')

const url = 'https://pikobar.jabarprov.go.id'

const getCheerioContent = async (url) => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(url, {waitUntil: 'load'});
  await page.waitFor(5000);
  const htmlContent = await page.evaluate(() => {
    let result = document.querySelector('body')
    result = result.getElementsByClassName('md:m-8 flex')[0].innerHTML
    return result
  })

  browser.close()

  return htmlContent;
}

const getIntFromContent = (content) => {
  // Parse Integer from Cheerio content
  // Example I/O: "14.000" -> 14000
  return parseInt(content.html().replace('.', ''))
}

const extractData = (content) => {
  const $ = cheerio.load(content)

  const lastUpdated = $('h2 small').html()

  const positif = getIntFromContent($('div div div div section div div:nth-child(2) div b:nth-child(2)'))
  const sembuh = getIntFromContent($('div div div div section div:nth-child(2) div:nth-child(2) div b:nth-child(2)'))
  const meninggal = getIntFromContent($('div div div div section div:nth-child(3) div:nth-child(2) div b:nth-child(2)'))

  const odp = {}
  const pdp = {}

  odp.proses = getIntFromContent($('div div div div section:nth-child(2) div div:nth-child(2) div div:nth-child(1) span'))
  odp.selesai = getIntFromContent($('div div div div section:nth-child(2) div div:nth-child(2) div div:nth-child(2) span'))
  odp.total = getIntFromContent($('div div div div section:nth-child(2) div div:nth-child(2) div div:nth-child(3) span'))

  pdp.proses = getIntFromContent($('div div div div section:nth-child(2) div:nth-child(2) div:nth-child(2) div div:nth-child(1) span'))
  pdp.selesai = getIntFromContent($('div div div div section:nth-child(2) div:nth-child(2) div:nth-child(2) div div:nth-child(2) span'))
  pdp.total = getIntFromContent($('div div div div section:nth-child(2) div:nth-child(2) div:nth-child(2) div div:nth-child(3) span'))

  return ({
      positif,
      sembuh,
      meninggal,
      odp,
      pdp,
      source: url,
      lastUpdated
  })
}

const execute = async () => {
  try {
    const content = await getCheerioContent(url)
    const result = await extractData(content)

    console.log(result)
  } catch (error) {
    console.error(error)
  }
}

execute()
