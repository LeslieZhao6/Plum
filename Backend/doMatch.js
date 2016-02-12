var Q = require('q');
var fs = require('fs');

var getPersonality = require('./getPersonality');
var conceptInsights = require('./conceptInsights');
var getTone = require("./getTone");
var fetchTweets = require("./fetchTweets");

var getPersonalityTwitterHandle = Q.denodeify(getPersonality.getPersonalityTwitterHandle);
var getConceptsTwitterHandle = Q.denodeify(conceptInsights.getConceptsTwitterHandle);
var getToneTwitterHandle = Q.denodeify(getTone.getToneTwitterHandle);
var getTweets = Q.denodeify(fetchTweets.getTweets);
var readFile = Q.denodeify(fs.readFile);

getDoctClosness = function( v1 , v2 )
{

	var norm1 = 0;

	for(var key in v1 )
		norm1 += v1[key]*v1[key];
	norm1 = Math.sqrt(norm1);

	var norm2 = 0;

	for(var key in v2 )
		norm2 += v2[key]*v2[key];
	norm2 = Math.sqrt(norm2);

	var dot = 0;

	for ( var key in v1)
	{
		if( key in v2)
			dot += v1[key]*v2[key];
	}

	return dot / (norm2 * norm1);

}




getClosnessAllNewUser = function( user  , cb )
{

	var personalityVec;
	var conceptVec;
	var toneVec;

	var UsersList;
	var clossness = {};

	var interests = {};
	var personalites = {};
	var tones = {};

	Q.all([  getPersonalityTwitterHandle(user) , getConceptsTwitterHandle(user)  , getToneTwitterHandle(user)  , readFile('./data/users.json')  ])
	.spread( function( personality ,  concepts , tone , usersText){
		personalityVec = getPersonality.personalityToVec(personality);
		conceptVec = conceptInsights.conceptsTovec(concepts)
		toneVec = getTone.toneTovec(tone);

		UsersList = JSON.parse(usersText);

		var promises = [];

		for( user in UsersList )
			promises.push( getPersonalityTwitterHandle(user) ) ;

		for( user in UsersList )
			promises.push( getConceptsTwitterHandle(user) ) ;

		for( user in UsersList )
			promises.push( getToneTwitterHandle(user) ) ;


		return promises ; 

	} )
	.spread(function(){
 		var i = 0;
 		for( user in UsersList )
 		{
 			personalites[user] = getPersonality.personalityToVec( arguments[i]);
 			clossness[user] = { p :  getDoctClosness( personalityVec , personalites[user]  ) };
 			i++;
 		}

 		for( user in UsersList )
 		{
 			interests[user] = conceptInsights.conceptsTovec( arguments[i]);
 			clossness[user]['c'] =  getDoctClosness( conceptVec , interests[user]  );
 			i++;
 		}

 		for( user in UsersList )
 		{
 			tones[user] = getTone.toneTovec( arguments[i]);
 			clossness[user]['t'] =  getDoctClosness( toneVec , tones[user]  );
 			i++;
 		}

 		cb( null , JSON.stringify(clossness));

 	})
 	.catch(function(  err ){
 		cb(err)
 	})
 	.done();
	
}

getClosnessAllNewUser('taylorswift13' , console.log);




