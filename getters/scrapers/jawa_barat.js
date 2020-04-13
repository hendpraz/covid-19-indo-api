// const rp = require('request-promise')
let axios = require('axios')
const cheerio = require('cheerio')
// const { getChrome } = require('../../libs/chrome-script')

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

    const positif = $('div section div div:nth-child(2) div b:nth-child(2)').html();
    const sembuh = $('div section div:nth-child(2) div:nth-child(2) div b:nth-child(2)').html();
    const meninggal = $('div section div:nth-child(3) div:nth-child(2) div b:nth-child(2)').html();

    let odp = {};
    let pdp = {};

    odp.proses = $('div section:nth-child(2) div div:nth-child(2) div div:nth-child(1) span').html();
    odp.selesai = $('div section:nth-child(2) div div:nth-child(2) div div:nth-child(2) span').html();
    odp.total = $('div section:nth-child(2) div div:nth-child(2) div div:nth-child(3) span').html();

    pdp.proses = $('div section:nth-child(2) div:nth-child(2) div:nth-child(2) div div:nth-child(1) span').html();
    pdp.selesai = $('div section:nth-child(2) div:nth-child(2) div:nth-child(2) div div:nth-child(2) span').html();
    pdp.total = $('div section:nth-child(2) div:nth-child(2) div:nth-child(2) div div:nth-child(3) span').html();

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