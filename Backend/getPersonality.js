var watson    = require('watson-developer-cloud');
var Q         = require('q')

var fetchTweets = require("./fetchTweets");

var personalityInsights = watson.personality_insights({
  username: '5f6e82de-be7f-4f45-833b-a15c343ee6da',
  password: 'FD2vI8eBCtaX',
  version: 'v2'
});

var getProfile = Q.denodeify(personalityInsights.profile.bind(personalityInsights));
var getTweets = Q.denodeify(fetchTweets.getTweets)

exports.getPersonality = function( text , cb )
{
	getProfile({text:text})
    .then(function(response){
       cb( null , response[0]);
      })
    .catch(function(err){ cb(err) })
    .done();
}

getPersonality =  Q.denodeify(exports.getPersonality )

exports.getPersonalityTwitterHandle = function( handle  , cb )
{
	getTweets(handle)
	.then(function(tweetObj){
		return fetchTweets.tweetObjToText( tweetObj );
	})
	.then(function(text){
		return getPersonality(text)
	})
	.then(function(personality){
		cb( null , personality )
	})
	.catch(function(err){ cb(err) })
	.done();
}

exports.getPersonalityTwitterHandle( "ladygaga" , function(e , r){
	console.log(JSON.stringify(r) , null  , 4 )
} );