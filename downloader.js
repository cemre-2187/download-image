const fs = require('fs');
const axios = require('axios')
const { Pool, Client } = require('pg')
const connectionString = 'postgresql://postgres:    @localhost:5432/sample'
let errors = []

var cron = require('node-cron');



const client = new Client({
  connectionString,
})
client.connect()

const getImages = async () => {
  let res = await client.query('SELECT image from yenitoptanci')
  return res.rows
}




let index = 0
let images = []
cron.schedule('*/1 * * * * *', async () => {
  console.log("first", index)
  if (images.length === 0) {
    images = await getImages()
  } else if (index < images.length) {
    let filepath = images[index].image.replace("https://www.yenitoptanci.com/uploads/UrunResimleri/buyuk/", "./images/")
    let url = images[index].image
    try {
      const response = await axios({
        url,
        method: 'GET',
        responseType: 'stream'
      });
      index++
      return new Promise((resolve, reject) => {
        response.data.pipe(fs.createWriteStream(filepath))
          .on('error', reject)
          .once('close', () => resolve(filepath));
      });
    } catch (error) {
      console.log("axios", url)
      errors.push(url)
      index++
    }
    if (index == images.length - 2) {
      console.log(errors, errors.length)
    }

  }

});