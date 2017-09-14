require('dotenv').load();
var search = require('youtube-search');

const NUM_RESULTS = 10;
var opts = {
	maxResults: NUM_RESULTS,
	key: process.env.YT_KEY
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