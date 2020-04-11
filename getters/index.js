import getInfoFromDatabase from './getInfoFromDatabase';
import scrapeAndSaveToDatabase from './scrapers';

export default async function(region_code) {

    let result = await getInfoFromDatabase(region_code);
    if (!result || result.length < 1) {
        result = await scrapeAndSaveToDatabase(region_code);
    }

    return result;

}