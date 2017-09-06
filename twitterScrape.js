const Twitter = require('twitter');
const moment = require('moment');
const request = require('request');


module.exports = {
  scrapeTwitter: function(callback, searchQuery, resultType, tweetsToFind) {
    let tweetIds = [];
    let weekAgo = moment().subtract(1, 'w');
    let weekAgoFormatted = moment(weekAgo).format('YYYY-MM-DD');

    let client = new Twitter({
      consumer_key: 'h6QhlulCmOEv9iRqtWuDrm5yT',
      consumer_secret: 'oYlOl4EWDrKS9YbMfN8968QVJ2JwKQededYpbyUENjQta15BaE',
      access_token_key: '2704444296-B0E7yOWwWWMNVENAOyJpuXW3jCqwgM8afBtVYpI',
      access_token_secret: '8iQjHW9JQQrKGd7XTObMOjEXeZVJQv5eKjSJEeXzhtgk4'
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
