const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const request = require('request');
const twitter = require('./twitterScrape.js');
const utube = require('./utube.js');
var express = require('express');
var path = require('path');
// Send index.html file when user goes to the webpage
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.use('/public', express.static('public'));

io.on('connection', function(socket){
  socket.on('searchInfo', (searchInfo) => {
    // Executes scrapeTwitter function to find tweets based on user criteria
    twitter.scrapeTwitter((tweetLinks) => {
      embedTweets((htmlTweets) => {
        socket.emit('htmlTweets', htmlTweets);
      }, searchInfo, tweetLinks);
    },
    searchInfo.query, searchInfo.resultType, searchInfo.count);
    utube.scrapeYT((htmlYT) => {
      socket.emit('htmlYT',htmlYT);
    }, searchInfo.query, searchInfo.resultType, searchInfo.count);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

function embedTweets(callback, searchInfo, tweetLinks) {
  let htmlTweets = [];
  tweetLinks.forEach((link) => {
    let url = `https://publish.twitter.com/oembed?url=${link}`;
    // Gets tweet embed html for each link
    request.get(url, (error, response, body) => {
      let JSONRes = JSON.parse(body);
      htmlTweets.push(JSONRes.html);
      if (htmlTweets.length === tweetLinks.length) {
        callback(htmlTweets);
      }
    });
  });
}
