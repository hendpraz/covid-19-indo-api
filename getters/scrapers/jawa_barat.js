const axios = require('axios')
const cheerio = require('cheerio')

import { getDummyHTML } from './dummy_html'

const url = 'https://pikobar.jabarprov.go.id'

const getHTML = () => 
    new Promise(async (resolve, reject) => {
        axios.get(url)
            .then((response) => {
                if(response.status === 200) {
                    resolve(response.data) 
                }
            }, (error) => reject(error))
    })

const getIntegerFromHTML = ($, selector) => {
    return parseInt($(selector).html().replace('.', ''))
}

export default async function () {
    const content = await getDummyHTML()
    const $ = cheerio.load(content)

    const positif = getIntegerFromHTML($, 'div section div div:nth-child(2) div b:nth-child(2)')
    const sembuh = getIntegerFromHTML($, 'div section div:nth-child(2) div:nth-child(2) div b:nth-child(2)')
    const meninggal = getIntegerFromHTML($, 'div section div:nth-child(3) div:nth-child(2) div b:nth-child(2)')

    const odp = {}
    const pdp = {}

    odp.proses = getIntegerFromHTML($, 'div section:nth-child(2) div div:nth-child(2) div div:nth-child(1) span')
    odp.selesai = getIntegerFromHTML($, 'div section:nth-child(2) div div:nth-child(2) div div:nth-child(2) span')
    odp.total = getIntegerFromHTML($, 'div section:nth-child(2) div div:nth-child(2) div div:nth-child(3) span')

    pdp.proses = getIntegerFromHTML($, 'div section:nth-child(2) div:nth-child(2) div:nth-child(2) div div:nth-child(1) span')
    pdp.selesai = getIntegerFromHTML($, 'div section:nth-child(2) div:nth-child(2) div:nth-child(2) div div:nth-child(2) span')
    pdp.total = getIntegerFromHTML($, 'div section:nth-child(2) div:nth-child(2) div:nth-child(2) div div:nth-child(3) span')

    return ({
        positif,
        sembuh,
        meninggal,
        odp,
        pdp,
        source: url,
        lastUpdated: "-"
    })
}