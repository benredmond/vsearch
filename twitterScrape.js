require('dotenv').load();

const Twitter = require('twitter');
const moment = require('moment');
const request = require('request');


module.exports = {
  scrapeTwitter: function(callback, searchQuery, resultType, tweetsToFind) {
    let tweetIds = [];
    let weekAgo = moment().subtract(1, 'w');
    let weekAgoFormatted = moment(weekAgo).format('YYYY-MM-DD');

    let client = new Twitter({
      consumer_key: process.env.CONSUMER_KEY,
      consumer_secret: process.env.CONSUMER_SECRET,
      access_token_key: process.env.ACCESS_TOKEN_KEY,
      access_token_secret: process.env.ACCESS_TOKEN_SECRET
    });

    client.get('search/tweets', {q: `${searchQuery} since:${weekAgoFormatted} -filter:retweets`, result_type: resultType, count: tweetsToFind}, function(error, tweets, response) {
      let numTweets = tweets.statuses.length;
      let i = 0;
      // let nextSearch = tweets.search_metadata;
      // console.log(nextSearch);
      // nextSearch = nextSearch[0];

      tweets.statuses.forEach((status) => {
        tweetIds.push(`https://twitter.com/${status.user.screen_name}/status/${status.id_str}`);
        i++;
        if (i === numTweets) {
          callback(tweetIds);
        }
      });
    });
  }
}
