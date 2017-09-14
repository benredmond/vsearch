require('dotenv').load();
const snoowrap = require('snoowrap'); //packages here

const r = new snoowrap({
  userAgent: process.env.SECRET_AGENT,
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  username: process.env.REDDIT_USER,
  password: process.env.REDDIT_PASS
});

//r.getHot().map(post => post).then(console.log);