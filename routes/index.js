import { success, failure } from '../libs/response-lib'

export async function handler (event) {
  let host = event.headers.Host;

  return success({
    regions: [
      {
        "name": "Jawa Barat",
        "code": "jawa_barat",
        "detail": `https://${host}/v1/regions/jawa_barat`
      },
      {
        "name": "Banten",
        "code": "banten",
        "detail": `https://${host}/v1/regions/banten`
      },
      {
        "name": "DKI Jakarta",
        "code": "jakarta",
        "detail": `https://${host}/v1/regions/jakarta`
      },
      {
        "name": "Jawa Tengah",
        "code": "jawa_tengah",
        "detail": `https://${host}/v1/regions/jawa_tengah`
      },
      {
        "name": "DI Yogyakarta",
        "code": "yogyakarta",
        "detail": `https://${host}/v1/regions/yogyakarta`
      },
      {
        "name": "Jawa Timur",
        "code": "jawa_timur",
        "detail": `https://${host}/v1/regions/jawa_timur`
      },
      {
        "name": "Nusa Tenggara Barat (NTB)",
        "code": "ntb",
        "detail": `https://${host}/v1/regions/ntb`
      },
      {
        "name": "Sulawesi Selatan",
        "code": "sulawesi_selatan",
        "detail": `https://${host}/v1/regions/sulawesi_selatan`
      },
      {
        "name": "Aceh",
        "code": "aceh",
        "detail": `https://${host}/v1/regions/aceh`
      },
      {
        "name": "Sumatera Barat",
        "code": "sumatera_barat",
        "detail": `https://${host}/v1/regions/sumatera_barat`
      },
      {
        "name": "Kepulauan Riau",
        "code": "kepulauan_riau",
        "detail": `https://${host}/v1/regions/kepulauan_riau`
      },
      {
        "name": "Lampung",
        "code": "lampung",
        "detail": `https://${host}/v1/regions/lampung`
      }
    ]
  })
}