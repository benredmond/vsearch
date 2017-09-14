const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const request = require('request');
const twitter = require('./twitterScrape.js');
var DiscoveryV1 = require('watson-developer-cloud/discovery/v1');

// Send index.html file when user goes to the webpage
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

var discovery = new DiscoveryV1({
  username: 'dde1e968-c669-41f0-b025-52b85cb7bd1e',
  password: '6yzNVaxoljL3',
  version: 'v1',
  version_date: '2017-09-07'
});

let queryParams = {
  count: 50,
  return: '',
  query: 'Trump',
  aggregations: [ "term(enrichedTitle.entities.text).top_hits(1)" ],
  environment_id: 'system',
  collection_id: 'news'
};

discovery.query(queryParams, function(err, response) {

  let newsLinks = [];
  let linkDomain;
  let plsPush = true;
  if (err) {
    console.error(err);
  } else {
    // console.log(response);
    response.results.forEach((article) => { //array of all the IBM api articles
      plsPush = true;
      let articleDomain = article.url.split('.');
      articleDomain = articleDomain[1];
      let i = 0;
        // if (i < newsLinks.length) {
        //   newsLinks.push(article.url);
        //   console.log(article.url);
        //   i++;
        // }
        // else {
        //   i++;
        // }
        // newsLinks.push(article.url);
        // console.log(article.url);

      if (newsLinks.length > 0) {
        newsLinks.forEach((link) => {
          linkDomain = link.split('.');
          linkDomain = linkDomain[1];
          // console.log(link + " " + articleDomain)
          let i = 0;
          if (linkDomain == articleDomain) {
            plsPush = false;
            i++;
          }
        });
      }
      // else {
      //   newsLinks.push(article.url);
      // }

      if(plsPush) {
        newsLinks.push(article.url);
        // console.log(newsLinks);
      }
    });
  }
  console.log(newsLinks)

 });
io.on('connection', function(socket){
  socket.on('searchInfo', (searchInfo) => {

    // Executes scrapeTwitter function to find tweets based on user criteria
    twitter.scrapeTwitter((tweetLinks) => {
      embedTweets((htmlTweets) => {
        socket.emit('htmlTweets', htmlTweets);
      }, searchInfo, tweetLinks);
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