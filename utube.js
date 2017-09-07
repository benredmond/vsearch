var search = require('youtube-search');
const NUM_RESULTS = 10;
var opts = {
	maxResults: NUM_RESULTS,
	key: 'AIzaSyBKATwU4mBTh_EzyQGEscS6rbhxE-uYwYQ'
};

module.exports = { //not sure I can do anything with resultType
	scrapeYT: function(callback, query, resultType, count) {
		opts.maxResults = count;
		YTlinks = [];
		search(query, opts, function(err, results) {
			if(err) return console.log(err);
			for(var i=0; i<opts.maxResults; i++) {
				YTlinks.push(results[i].id);
		}
		callback(YTlinks);
		});

}
}