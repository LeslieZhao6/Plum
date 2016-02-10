var Twitter = require('twitter');
 
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


exports.getTweets = function(user , cb )
{
	client.get('statuses/user_timeline', { screen_name: user , count: 200 }, function(error, tweets, response) {
	    if (!error) {
	      cb(null , tweets);
	    }
	    else {
	      // res.status(500).json({ error: error });
	      cb(error);
	    }
	});
}


exports.tweetObjToText = function(tweetObj)
{
	var text = "";

	for ( tweet of tweetObj)
		text +=   tweet.text + " ";

	return text;
}

// exports.getTweets('levelsio' , function(e , r){
// 	console.log( tweetObjToText (  r ))
// })