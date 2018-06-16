var Twit = require('twit'); //import
var config = require('./config');

var T = new Twit(config);
var compliment = 'you look great today!';
var follow_compliment = 'thanks for the follow, ' + compliment;
var myUsername = 'bot_confidence';

var stream = T.stream('user'); //user stream

//follow
stream.on('follow', followed);

function followed(followData) {
	var name = followData.source.name; //name on twitter page - Sam
	var username = followData.source.screen_name;
	var obj = {};
	obj['name'] = name;
	obj['username'] = username;
	tweetAt(obj, follow_compliment);
}

//tweeted at 
stream.on('tweet', tweetedAt);

function tweetedAt(tweetAtData) {
	var replyTo = tweetAtData.in_reply_to_screen_name;
	var text = tweetAtData.text;
	var fromUsername = tweetAtData.user.screen_name;
	var fromName = tweetAtData.user.name;

	if (replyTo === myUsername) {
		var obj = {};
		obj['name'] = fromName;
		obj['username'] = fromUsername;
		console.log(obj);
		tweetAt(obj, compliment);
	}
}

//daily tweet
var daySeconds = 1000*60*24;
setInterval(dailyTweet, daySeconds);

function dailyTweet() {
	tweetOut("Today is " + todayDate() + " and " + compliment);
}

//helper functions
function todayDate() {
	var today = new Date();
	var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

	return date;
}

function tweetAt(user, message) {
	tweetOut("@" + user['username'] + " " + user['name'] + ", on this day (" + todayDate() + "), " + message);
}

function tweetOut(text) {
	var tweet = {
		status: text
	}

	T.post('statuses/update', tweet, postTweet);
}

function postTweet(err, data, response) {
	if (err) {
		console.log(err.code);
		console.log(err.statusCode);
		console.log(err.message);
		console.log(err.twitterReply);

		if (err.message === 'Status is a duplicate.') {
			tweetOut("Please slow down you guys!");
		}
	} else {
		console.log("Succeeded!");
	}
}
