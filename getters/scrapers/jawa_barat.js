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

const getIntFromContent = (content) => {
    // Parse Integer from Cheerio content
    // Example I/O: "14.000" -> 14000
    return parseInt(content.html().replace('.', ''))
}

export default async function () {
    const content = await getDummyHTML()
    const $ = cheerio.load(content)

    const positif = getIntFromContent($('div section div div:nth-child(2) div b:nth-child(2)'))
    const sembuh = getIntFromContent($('div section div:nth-child(2) div:nth-child(2) div b:nth-child(2)'))
    const meninggal = getIntFromContent($('div section div:nth-child(3) div:nth-child(2) div b:nth-child(2)'))

    const odp = {}
    const pdp = {}

    odp.proses = getIntFromContent($('div section:nth-child(2) div div:nth-child(2) div div:nth-child(1) span'))
    odp.selesai = getIntFromContent($('div section:nth-child(2) div div:nth-child(2) div div:nth-child(2) span'))
    odp.total = getIntFromContent($('div section:nth-child(2) div div:nth-child(2) div div:nth-child(3) span'))

    pdp.proses = getIntFromContent($('div section:nth-child(2) div:nth-child(2) div:nth-child(2) div div:nth-child(1) span'))
    pdp.selesai = getIntFromContent($('div section:nth-child(2) div:nth-child(2) div:nth-child(2) div div:nth-child(2) span'))
    pdp.total = getIntFromContent($('div section:nth-child(2) div:nth-child(2) div:nth-child(2) div div:nth-child(3) span'))

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