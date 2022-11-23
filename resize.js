const Jimp = require('jimp');
const testFolder = './images/';
const fs = require('fs');

fs.readdir(testFolder, (err, files) => {
  files.map(file => {
    async function resize() { // Function name is same as of file name
      // Reading Image
      const image = await Jimp.read
        (`./images/${file}`);
      image.resize(200, 200, function (err) {
        if (err) throw err;
      })
        .write(`./resizeImages/re-${file}`);
    }

    resize();


  });
});
