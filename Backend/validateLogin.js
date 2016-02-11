var Twitter = require('twitter');
var fs      = require('fs');

exports.validateLogin = function (token)
{
	var client = new Twitter({
  	consumer_key:  'HnC9HLRBhPxmikTA03yGXm0d4',
  	consumer_secret: 'AUAYiujFchl5ISUb2meoyVjvjLQnc8Bb9UqxyYKnHHKv6fSqKD',
  	access_token_key: token,
  	access_token_secret: 'LosMj2fAEKuzlPMKcvbL1pymuD4BYY1nv8cw3Vmy9AjLs'
	});
	client.get('account/verify_credentials',{include_email : true, skip_status : true, include_entities : false},function(error, response) {
		// console.log(response);
		if (!error) {
	      var all_data;
		  var id = response['screen_name'];
		  var this_user = {};
	      this_user[id] = { name: response['name'],location: "Location", gender: "Male" };
	      // console.log(this_user);
	      fs.readFile('user_list.json', 'utf8', function (err, data) {
  		  	if (err) throw err;
  		  	all_data = JSON.parse(data);
	 		all_data[id] = this_user[id];
  		  	// console.log(all_data);
	     	fs.writeFile("user_list.json", JSON.stringify(all_data), function(err) {
    			if(err) throw err;
				});
			});
	      console.log("Updated \"DB\"");
	    }
	     else {
	      console.log(error);
	    }
	});
}

exports.validateLogin('312016800-Pea41FhTYZuTkK8Oa3NBYGV5UlkML6rI3FEykwep' , function(e , r){
	// console.log(r);
})