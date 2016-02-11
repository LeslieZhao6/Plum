var Twitter = require('twitter');
var fs = require("fs");
var Q = require('q')
 
var client = new Twitter({
  consumer_key:  'HnC9HLRBhPxmikTA03yGXm0d4',
  consumer_secret: 'AUAYiujFchl5ISUb2meoyVjvjLQnc8Bb9UqxyYKnHHKv6fSqKD',
  access_token_key: '312016800-Pea41FhTYZuTkK8Oa3NBYGV5UlkML6rI3FEykwep',
  access_token_secret: 'LosMj2fAEKuzlPMKcvbL1pymuD4BYY1nv8cw3Vmy9AjLs'
});

// client.stream('statuses/filter',   { screen_name: 'nodejs'}  , function(stream) {
//   stream.on('data', function(tweet) {
//     console.log(tweet.text);
//   });
 
//   stream.on('error', function(error) {
//     throw error;
//   });
// });

function getTweeetsQ( params , cb )
{
	client.get( 'statuses/user_timeline' , params  , cb );
}

var readFile = Q.denodeify(fs.readFile);
var writeFile = Q.denodeify(fs.writeFile);
var twitterClientGet = Q.denodeify(getTweeetsQ);

exports.getTweets = function(user , cb )
{
	var isCached = true;
	var latestTweetId = "0";
	var prevTweets = [];
	var fName = "./data/tweets/"+ user+".json";
	var cbDone = false;

	readFile(fName)
	.then(function(content){
		var x = JSON.parse(content);
		latestTweetId  = x.latestTweetId;
		prevTweets = x.tweets;

		cbDone = true;
		cb(null , prevTweets);

	})
	.catch(function(err){
		console.log("file not created yo")
	})
	.then( function(){
		if(latestTweetId == "0")
			return twitterClientGet( { screen_name: user , count: 200 });
		else 
			return twitterClientGet( { screen_name: user , count: 200  , since_id : latestTweetId } );
	})
	.then(function(tweets , response){
		 prevTweets = prevTweets.concat(tweets[0]);

	   	  if(tweets[0].length > 0 )
	   	  {
 	   		  latestTweetId = tweets[0][0].id_str;
	   	  }

	   	  return tweets
	})
	.then(function(){
 		return writeFile( fName , JSON.stringify({
			latestTweetId : latestTweetId  , tweets : prevTweets
		}));
	})
	.then(function(){
		if(!cbDone)
			cb(null , prevTweets);
	})
	.catch(function(err){
 		cb(err);
	});

}


exports.tweetObjToText = function(tweetObj)
{
	var text = "";

	for ( tweet of tweetObj)
		text +=   tweet.text + " ";

	return text;
}

// exports.getTweets('sciguy14' , function(e , r){
// 	// console.log( JSON.stringify(  r ))
// 	console.log(r);
// })