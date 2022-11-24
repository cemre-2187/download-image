This tiny program just downloading imageing from urls and resizing them to different folder.

Install packages with

 > npm install

I get image urls from a local db for test. You can provide any url for that part. You can use big image url arrays. There will be cron job for handling
loop issue.

It will save images to /images folder. For download images;

 > node downloader.js


It will save images to /resizeImages folder. For resize images

 > node resize.js

