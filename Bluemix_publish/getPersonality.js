var watson    = require('watson-developer-cloud');
var fs = require("fs");
var Q         = require('q')

var fetchTweets = require("./fetchTweets");
var writeFile = Q.denodeify(fs.writeFile);
var readFile = Q.denodeify(fs.readFile);

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


	var fName = "./data/personalities/"+ handle +".json";
	var personalityG ;

	readFile(fName)
	.then(function(  content ){
		cb( null , JSON.parse(content ));
	})
	.catch(function(  err ){
		console.log("personality not cached YO")
		getTweets(handle)
		.then(function(tweetObj){
			return fetchTweets.tweetObjToText( tweetObj );
		})
		.then(function(text){
			return getPersonality(text)
		})
		.then(function(  personality ){
			// saveFile
			personalityG = personality;
			return writeFile( fName , JSON.stringify(personality));
		})
		.then(function(){
			cb( null , personalityG )
		})
		.catch(function(err){ cb(err) })
		.done();

	})

	
}

exports.personalityToVec = function(r){
	var raw = r['tree']['children'];
	var personality = raw[0]['children'];
	var needs = raw[1]['children'];
	var values = raw[2]['children'];

	var vec = {};

	function mergeVec( name , persentage)
	{
		if( name in vec)
			vec[name] += persentage;
		else vec[name] = persentage;
	}

	// console.log("\nPersonality:");
	// Considering 3 levels; should be sufficient.
	for(x of personality)
	{
		 
		mergeVec( x['name'] ,   x['percentage']  );
		if('children' in x)
		{
			for(y of x['children'])
			{
				 
				mergeVec( y['name'] ,   y['percentage']  );
				if('children' in y)
				{
					for(z of y['children'])
					{
					 
						mergeVec( z['name'] ,   z['percentage']  );
					}
				}
			}
		}
	}

	// console.log("\nNeeds:");
	for(x of needs)
	{
		mergeVec( x['name'] ,   x['percentage']  );
		if('children' in x)
		{
			for(y of x['children'])
			{
				mergeVec( y['name'] ,   y['percentage']  );
			}
		}
	}

	// console.log("\nValues:");
	for(x of values)
	{
		mergeVec( y['name'] ,   y['percentage']  );
		if('children' in x)
		{
			for(y of x['children'])
			{
				mergeVec( y['name'] ,   y['percentage']  );
			}
		}
	}

	return(vec)
}
 
 
// exports.getPersonalityTwitterHandle( "sciguy14" , function(e , r){
// 	console.log(  exports.personalityToVec(r)  )
//  } );