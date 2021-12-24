const fs = require('fs')
const path = require('path')
const csv = require('csv-parser')
const axios = require('axios')
require('dotenv').config()

const NFT_DIR = 'nft'

const options = {
  responseType: 'json',
  headers: { 'X-API-Key': process.env.MORALIS_API_KEY }
};

fs.promises
  .readdir(NFT_DIR)
  .then((files) => {
    files.forEach(async (file) => {
      console.log(file)
      const results = [];
      const fileLocation = `${NFT_DIR}/${file}`
      const addresses = new Set()
      if (path.extname(file) == '.csv') {
        fs.createReadStream(fileLocation)
          .pipe(csv())
          .on('data', (data) => results.push(data))
          .on('end', async () => {
            // console.log(results)
            if (results.length) {
              for (const { address, token_id } of results) {
                console.log('address', address)
                console.log('token_id', token_id)
                let more_nfts = true
                let offset = 0
                while (more_nfts && offset < 2000) {
                  if (address !== '') {
                    await axios
                      .get(`https://deep-index.moralis.io/api/v2/nft/${address}${token_id ? `/${token_id}` : ''}/owners?chain=eth&format=decimal&offset=${offset}&limit=500`, options)
                      .then((res) => {
                        console.log('length', res.data.result.length)
                        for (const nft of res.data.result) {
                          addresses.add(nft.owner_of)
                        }
                        console.log('page', res.data.page)
                        console.log('size', addresses.size)
                        if (res.data.result.length === 500) {
                          offset = offset + 500
                        } else {
                          more_nfts = false
                        }
                        fs.writeFile(`owners/${file}`, [...addresses].join('\n'), (error) => {
                          if (error) throw error
                        })
                      })
                      .catch((error) => {
                        console.log(error)
                      })
                  }
                }
              }
            }
          });
      }
    })
  })
  .catch((err) => {
    console.error(err)
  })
