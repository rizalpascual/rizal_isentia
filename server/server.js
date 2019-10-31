const express = require('express');
const request = require('request');
const app = express();
const cors = require('cors');

app.use(cors());

app.get('/', function (req, res) {
  request.get(
    'https://api.flickr.com/services/feeds/photos_public.gne?format=json&tags=kamote&jsoncallback=?',
    function (error, response, body) {
      const items = JSON.parse(body.substring(1, body.length - 1)).items;
      res.send(items.map(e => e.media.m));
    }
  );
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});