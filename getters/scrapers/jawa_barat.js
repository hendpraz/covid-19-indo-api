const rp = require('request-promise')
const cheerio = require('cheerio')

const url = 'https://pikobar.jabarprov.go.id'

const getHTML = () => 
    new Promise(async (resolve, reject) => {
        rp(url)
            .then(function(html){
                resolve(html)
            })
            .catch(function(err){
                reject(err)
            });
    })

export default async function () {
    const content = await getHTML();
    const $ = cheerio.load(content)
    const test = $.html()

    return ({
        "test": test
        // "positif":,
        // "sembuh":,
        // "meninggal":,
        // ODP adalah Orang Dalam Pengawasan yang masih dalam proses pemantauan, kalau di data webnya cuma satu angka
        // nanti jadi satu dulu aja
        // "odp": {
        //     "total":,
        //     "proses":,
        //     "selesai":,
        // },
        // "pdp": {
        //     "total":,
        //     "proses":,
        //     "selesai":,
        // },
    })
}