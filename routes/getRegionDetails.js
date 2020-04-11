import { success, failure } from '../libs/response-lib'
import getRegionDetail from './getters'

export async function handler (event) {
  
  let details = await getRegionDetail(event.pathParameters.region_code)

  return success({
      "region_code": event.pathParameters.region_code,
      "details": details
  })
}