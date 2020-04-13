let axios = require('axios')
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

export default async function () {
    const content = await getDummyHTML()
    const $ = cheerio.load(content)

    const positif = parseInt($('div section div div:nth-child(2) div b:nth-child(2)').html().replace('.', ''))
    const sembuh = parseInt($('div section div:nth-child(2) div:nth-child(2) div b:nth-child(2)').html().replace('.', ''))
    const meninggal = parseInt($('div section div:nth-child(3) div:nth-child(2) div b:nth-child(2)').html().replace('.', ''))

    let odp = {};
    let pdp = {};

    odp.proses = parseInt($('div section:nth-child(2) div div:nth-child(2) div div:nth-child(1) span').html().replace('.', ''))
    odp.selesai = parseInt($('div section:nth-child(2) div div:nth-child(2) div div:nth-child(2) span').html().replace('.', ''))
    odp.total = parseInt($('div section:nth-child(2) div div:nth-child(2) div div:nth-child(3) span').html().replace('.', ''))

    pdp.proses = parseInt($('div section:nth-child(2) div:nth-child(2) div:nth-child(2) div div:nth-child(1) span').html().replace('.', ''))
    pdp.selesai = parseInt($('div section:nth-child(2) div:nth-child(2) div:nth-child(2) div div:nth-child(2) span').html().replace('.', ''))
    pdp.total = parseInt($('div section:nth-child(2) div:nth-child(2) div:nth-child(2) div div:nth-child(3) span').html().replace('.', ''))

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