import { success, failure } from '../libs/response-lib'
import jawa_barat from '../getters/scrapers/jawa_barat'
// import getRegionDetail from './getters'

export async function handler (event) {
  
  // let details = await getRegionDetail(event.pathParameters.region_code)
  const region_code = event.pathParameters.region_code

  if (region_code == "jawa_barat") {
    let details = await jawa_barat()

    return success({
      "region_code": region_code,
      "details": details,
      "region_name": "Jawa Barat"
    })
  }

  return success({
    "region_code": event.pathParameters.region_code
  })
}