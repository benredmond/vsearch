var search = require('youtube-search');

var opts = {
	maxResults: 10,
	key: 'AIzaSyBKATwU4mBTh_EzyQGEscS6rbhxE-uYwYQ'
};

search('hurricane harvey', opts, function(err, results) {
	if(err) return console.log(err);

	console.dir("https://www.youtube.com/watch?v=" + results[0].id);
});