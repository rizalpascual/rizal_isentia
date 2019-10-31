const express = require('express');
const request = require('request');
const http = require('http');
const path = require('path');
const app = express();
const cors = require('cors');

app.use(cors());
app.set('port', 8000);

// Serve the angular app client
app.use(express.static('dist/client'));

const router = express.Router();

/*
Service that will be used by the client to get the flickr images.
This can be done in the client side as well but we just want to do it in nodejs app.
*/
router.get('/', function (req, res) {
  // Use flickr to get the public images
  request.get(
    !!req.query.criteria ?
      `https://api.flickr.com/services/feeds/photos_public.gne?format=json&tags=${req.query.criteria}&jsoncallback=?` :
      'https://api.flickr.com/services/feeds/photos_public.gne?format=json&&jsoncallback=?',
    function (error, response, body) {
      const items = JSON.parse(body.substring(1, body.length - 1)).items;
      //Return only the images to the client
      res.send(items.map(e => e.media.m));
    }
  );
});

app.use('/api', router);

//We start webapp in port 8000
http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});