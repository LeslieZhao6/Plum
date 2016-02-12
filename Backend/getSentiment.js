
var watson    = require('watson-developer-cloud');
var Q         = require('q')
var fs = require("fs");

var fetchTweets = require("./fetchTweets");

var writeFile = Q.denodeify(fs.writeFile);
var readFile = Q.denodeify(fs.readFile);
var getTweets = Q.denodeify(fetchTweets.getTweets)


var alchemy_language = watson.alchemy_language({
  api_key: 'd6aee88a1a9b99038ca060ca08c30848d9ed02a0'
});


exports.getSentiment = function(text, cb)
{
	var sentiment = 0;
	var params = {
  	  text: text
	};
	alchemy_language.sentiment(params, function (err, response) {
 	 if (err)
    	cb(err);
  	else
  	{
     cb(null , response)
  	// 	if( 'score' in response['docSentiment'])
  	// 	{
  	// 		sentiment = response['docSentiment']['score'];
  	// 	}	
  	}
	  //   console.log(sentiment);
	});
}

var getSentiment =  Q.denodeify(exports.getSentiment );

exports.getSentimentTwitterHandle = function( handle  , cb )
{

  var fName = "./data/sentiments/"+ handle +".json";
  var SentimentG ;

  readFile(fName)
  .then(function(  content ){
    cb( null , JSON.parse(content ));
  })
  .catch(function(  err ){
      getTweets(handle)
      .then(function(tweetObj){
        return fetchTweets.tweetObjToText( tweetObj );
      })
      .then(function(text){
        return getSentiment(text)
      })
      .then(function(senti){
        SentimentG = senti;
        return writeFile( fName , JSON.stringify(senti));
      })
      .then(function(  ){
        cb( null , SentimentG )
      })
      .catch(function(err){ cb(err) })
      .done();
  });

}


exports.getSentimentTwitterHandle('levelsio' , console.log )