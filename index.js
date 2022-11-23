const fs = require('fs');
const axios = require('axios')
const { Pool, Client } = require('pg')
const connectionString = 'postgresql://postgres:    @localhost:5432/sample'

let imageUrls = ["https://www.yenitoptanci.com/uploads/UrunResimleri/buyuk/peri-led-isik-5-metre-sari-pilli-aydinla-8505.jpg"]

const client = new Client({
  connectionString,
})
client.connect()

const getImages = async () => {
  let res = await client.query('SELECT image from yenitoptanci')
  return res.rows
}


async function downloadImage() {
  let images = await getImages()
  console.log(images[0])

  images.map(async (item) => {
    let filepath = item.image.replace("https://www.yenitoptanci.com/uploads/UrunResimleri/buyuk/", "./images/")
    let url = item.image
    try {
      const response = await axios({
        url,
        method: 'GET',
        responseType: 'stream'
      });
      return new Promise((resolve, reject) => {
        response.data.pipe(fs.createWriteStream(filepath))
          .on('error', reject)
          .once('close', () => resolve(filepath));
      });
    } catch (error) {
      console.log("axios")

    }



  })

}
downloadImage()