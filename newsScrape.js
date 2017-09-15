var DiscoveryV1 = require('watson-developer-cloud/discovery/v1');

var discovery = new DiscoveryV1({
  username: '*******',
  password: '*******',
  version: 'v1',
  version_date: '2017-09-07'
});
function getNews(callback, query, count) {
  let queryParams = {
    count: count,
    return: '',
    query: query,
    aggregations: [ "term(enrichedTitle.entities.text).top_hits(1)" ],
    environment_id: 'system',
    collection_id: 'news'
  };

  discovery.query(queryParams, function(err, response) {
    let newsLinks = [];
    let news = [];
    let linkDomain;
    let push = true;
    if (err) {
      console.error(err);
    } else {
      response.results.forEach((article) => { //array of all the IBM api articles
        plsPush = true;
        let articleDomain = article.url.split('.');
        articleDomain = articleDomain[1];
        let i = 0;

        if (newsLinks.length > 0) {
          newsLinks.forEach((link) => {
            linkDomain = link.split('.');
            linkDomain = linkDomain[1];
            let i = 0;
            if (linkDomain == articleDomain) {
              push = false;
              i++;
            }
          });
        }
        if(push) {
          let newsInfo = {
            headline: article.title,
            url: article.url
          }
          news.push(newsInfo);
          newsLinks.push(article.url);

        }
      });
    }
    callback(news);
   });
}
module.exports = {
  getNews: getNews
}
