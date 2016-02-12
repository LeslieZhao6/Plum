var watson = require('watson-developer-cloud');
 
var alchemy_language = watson.alchemy_language({
  api_key: 'd6aee88a1a9b99038ca060ca08c30848d9ed02a0'
});


exports.getSentiment = function(tweet, cb)
{
	var sentiment = 0;
	var params = {
  	  text: tweet
	};
	alchemy_language.sentiment(params, function (err, response) {
 	 if (err)
    	console.log('error:', err);
  	else
  	{
  		if( 'score' in response['docSentiment'])
  		{
  			sentiment = response['docSentiment']['score'];
  		}	
  	}
	    console.log(sentiment);
	});
}

exports.getSentiment( 'potatoes are tasty', function(e , r){});
