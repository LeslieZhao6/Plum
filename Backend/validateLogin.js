var Twitter = require('twitter');

exports.validateLogin = function (token)
{
	var client = new Twitter({
  	consumer_key:  'HnC9HLRBhPxmikTA03yGXm0d4',
  	consumer_secret: 'AUAYiujFchl5ISUb2meoyVjvjLQnc8Bb9UqxyYKnHHKv6fSqKD',
  	access_token_key: token,
  	access_token_secret: 'LosMj2fAEKuzlPMKcvbL1pymuD4BYY1nv8cw3Vmy9AjLs'
	});
	client.get('account/verify_credentials',{include_email : true, skip_status : true, include_entities : false},function(error, response) {
		console.log(response);
		if (!error) {
	      console.log("Validated");
	    }
	     else {
	      console.log(error);
	    }
	});
}

exports.validateLogin('312016800-Pea41FhTYZuTkK8Oa3NBYGV5UlkML6rI3FEykwep' , function(e , r){
	// console.log(r);
})