require('dotenv').load();
const snoowrap = require('snoowrap'); //packages here

const r = new snoowrap({
  userAgent: process.env.SECRET_AGENT,
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  username: process.env.REDDIT_USER,
  password: process.env.REDDIT_PASS
});

module.exports = { //This is a wip, this part doesn't work yet. 
	scrapeReddit: function(callback, query, resultType, count) {
		var titles = [];
		var wordsInTitle = [];
		var pleaseAdd;
		var submissions = [];
		r.getHot().map(post => post.title).then(titles.push);
		console.log("THIS IS THE TITLES " + titles);
		var words = query.split();
		for(j = 0; j<titles.length; j++) { //This is probably the worst algo ever
			pleaseAdd = false;
			wordsInTitle = titles[j].split();
			for(i = 0; i<words.length; i++) {
				for (k = 0; k<wordsInTitle.length; k++);
					if(words[i].equals(wordsInTitle[k])) {
						pleaseAdd = true;
					}
			}
			submissions.push(titles[j]);
		}
		console.log(submissions);
		callback(submissions);

}
}