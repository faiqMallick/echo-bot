'use strict';

const line = require('@line/bot-sdk');
const express = require('express');
const https = require('https');

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
  const echo = { type: 'text', text: "You said: " + event.message.text };
   console.log("pappu12323");


   https.get('https://jsonplaceholder.typicode.com/posts/1', (resp) => {
    let data = '';
    console.log("httpin");

    console.log(JSON.stringify(resp));
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


  // use reply API
  return client.replyMessage(event.replyToken, echo);
}

// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
