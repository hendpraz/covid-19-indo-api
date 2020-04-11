# Covid-19-API For Indonesia Regional (Status: In Development)

## What is this?

We strongly believe that accessible information are very important to understand the spread of covid-19 in Indonesia. So, we want to help any developers build their covid-19 applications without any trouble.

## How to Install

1. Clone this repo
2. Make sure you already logged in to your AWS Account via `aws configure`
3. `npm install`
4. `serverless deploy`

## How it works

We are gonna scrape government covid-19 websites every 6 hours (list provided in https://tirto.id/daftar-link-cek-persebaran-corona-covid-19-di-indonesia-dan-dunia-eHkM ) and save it to database (for caching).
Our API will be based on the data we have retrieved through scraping.

##  Stacks

- Serverless Framework - AWS
- AWS DynamoDB
- Node.JS
- Serverless Dot Env Plugin
- Serverless Bundle
- Serverless Offline

## Folder Structure and File Explanation
```
   .
   ├── getters                 # Getter and scraper are inside this folder
   │   ├── scrapers            # Scraping logic
   │       ├── index.js        # The controller
   │       ├── scrapeAllRegionAndSaveToDatabase  # This is the cron task
   │       ├── jawa_barat.js   # Scraper for jawa_barat
   │       ├── ..... .js       # Scraper for other region
   ├── libs                    # Containing some database / http helpers
   ├── resources               # Serverless AWS Resources
   └── serverless.yml          # Configuration File
```
## API Documentation

- `GET /v1`
   This will retrieve all the region name, code, and detail link
   ```
   {
      "regions": [
         {
               "name": "Jawa Barat",
               "code": "jawa_barat",
               "detail": "{{ deployed_url }}/v1/regions/jawa_barat"
         },
         {
               "name": "Banten",
               "code": "banten",
               "detail": "{{ deployed_url }}/v1/regions/banten"
         },
         {
               "name": "DKI Jakarta",
               "code": "jakarta",
               "detail": "{{ deployed_url }}/v1/regions/jakarta"
         },
         ...
      ]
   }
   ```
- `GET /v1/regions/{code}`
   This will retrieve the region detail along with source and lastUpdated
   ```
   {
      "region_code": "jawa_barat",
      "details": {
         "positif": 376,
         "sembuh": 19,
         "meninggal": 40,
         "odp": {
               "total": 27816,
               "proses": 16700,
               "selesai": 11116
         },
         "pdp": {
               "total": 2174,
               "proses": 1322,
               "selesai": 852
         },
         "source": "https://pikobar.jabarprov.go.id/",
         "lastUpdated": "Fri Apr 10 2020 11:47:28 GMT+0700 (Indochina Time)"
      }
   }
   ```

## Response Object
```
`region_code`  : The region code (you can see all the region codes via path '/v1')
`details`: The detail object
... `positif`: The number of positive cases of covid-19 in the region
... `sembuh`: The number of recoveries in the positive cases detected
... `meninggal` The number of deaths in the positive cases detected
... `odp`:
......   `total`: The total number of ODP (Total ODP)
......   `proses`: The number of ODP currently on proccess (Dalam Proses)
......   `selesai`: The number of ODP finished process (Proses selesai)
... `pdp`:
......   `total`: The total number of PDP (Total PDP)
......   `proses`: The number of PDP currently on proccess (Dalam Proses)
......   `selesai`: The number of PDP finished process (Proses selesai)
... `source`: The data source
... `lastUpdated`: Last time this data retrieved from the source
```



## Who are behind this

1. Terry Djony [@terryds](https://github.com/terryds)
2. Farhan Rahmadi [@huntz20](https://github.com/huntz20)

This is open source projects, feel free to contribute by pull request!
We're gonna list major contributors here!