var Q = require('q');
var fs = require('fs');

var getPersonality = require('./getPersonality')
var fetchTweets = require("./fetchTweets");

var getPersonalityTwitterHandle = Q.denodeify(getPersonality.getPersonalityTwitterHandle);
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


// getPersonalityTwitterHandle('levelsio')
// .then(function(  personality ){
// 	return [ getTweets('manojpandey')  ,  getTweets('sciguy14')  ]
// })
// .spread(function(   ){
// 	console.log( JSON.stringify(arguments ));
// })



getClosnessAllNewUser = function( user  , cb )
{

	var personalityVec;
	var UsersList;
	var clossness = {};

	Q.all([  getPersonalityTwitterHandle(user) , readFile('./data/users.json')  ])
	.spread( function( personality , usersText){
		personalityVec = getPersonality.personalityToVec(personality);
		UsersList = JSON.parse(usersText);

		var promises = [];

		for( user in UsersList )
			promises.push( getPersonalityTwitterHandle(user) ) ;
		return promises ; 

	} )
	.spread(function(){
 		var i = 0;
 		for( user in UsersList )
 		{
 			clossness[user] = getDoctClosness( personalityVec , getPersonality.personalityToVec( arguments[i]));
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

// a = { q : 3 , h : 8}
// b = { u : 8 , q : 9}
// console.log(  dictVectorCosTheeta( a, b )  )