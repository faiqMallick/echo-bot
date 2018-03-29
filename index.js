'use strict';

const line = require('@line/bot-sdk');
const express = require('express');
const http = require('http');
var body = "";
var echo = "";

// create LINE SDK config from env variables
const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET,
};

// create LINE SDK client
const client = new line.Client(config);

// create Express app
// about Express itself: https://expressjs.com/
const app = express();

// register a webhook handler with middleware
// about the middleware, please refer to doc
app.post('/callback', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

// event handler
function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    // ignore non-text-message event
    return Promise.resolve(null);
  } 

  // create a echoing text message
   //var echo = { type: 'text', text: "You said: " + event.message.text };
   console.log("pappu12323");

/*
   //https.get('https://api.line.me/v2/bot/', (resp) => {
    http.get('http://66.228.117.22/RestTest/', (resp) => {
    // let data = '';
    console.log("httpin");

    //console.log(resp.replyMessage);

    let body = "";
    resp.on("data", data => {
      body += data;
    });
    resp.on("end", () => {
      //body = JSON.parse(body);
      console.log(body);
      //kyz = Object.keys(body);
      //console.log("TESTING ::: " + obj[kyz[0]]);
      echo = { type: 'text', text: "You said: " +  body };
    });
    // A chunk of data has been recieved.
    // resp.on('data', (chunk) => {
    //   data += chunk;
    // });
   
    // // The whole response has been received. Print out the result.
    // resp.on('end', () => {
    //   console.log(JSON.parse(data).explanation);
    // });
   
  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });
  */

  

  var request = require('request');
request.post({
  headers: {'content-type' : 'application/x-www-form-urlencoded'},
  url:     'http://66.228.117.22/RestTest/',
  body:   event.message.text //"20060461"
}, function(error, response, body){
  console.log("WS1044LOG "+ body);
  console.log("FROM LINE :: "+ event.message.text );
  echo = { type: 'text', text: body };
});




  //  http.get('http://66.228.117.22:50629/RestTest1/RestTest/', (res) => {
  //   console.log('statusCode:', res.statusCode);
  //   console.log('headers:', res.headers);

  //   res.on('data', (d) => {
  //     process.stdout.write(d);
  //   });

  // }).on('error', (e) => {
  //   console.error(e);
  // });


//    http.get("http://66.228.117.22:50629/RestTest1/RestTest", function(res){
//     console.log('STATUS: ' + res.statusCode);
//     console.log('HEADERS: ' + JSON.stringify(res.headers));
//     console.log(res.text);
//     echo = { type: 'text', text: "You said: " + res.text };
//     console.log("pappu12");
// });

  console.log("ECHO 2 :: "+ echo);
  // use reply API
  return client.replyMessage(event.replyToken, echo);
}

// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
