var watson = require('watson-developer-cloud');
 
var tradeoff_analytics = watson.tradeoff_analytics({
  username: 'ed301322-4fcc-47cc-867a-2a68b9ca619a',
  password: 'yvkpvSjuDKAe',
  version: 'v1'
});
 
// From file 
var params = require('./tradeoff_data.json');
 
tradeoff_analytics.dilemmas(params, function(err, res) {
  if (err)
    console.log(err);
  else
    // console.log(JSON.stringify(res, null, 2));
	console.log(res['resolution']['solutions']);
});