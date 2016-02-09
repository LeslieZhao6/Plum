var watson    = require('watson-developer-cloud');
var Q         = require('q')


var personalityInsights = watson.personality_insights({
  username: '<username>',
  password: '<password>',
  version: 'v2'
});


var getProfile = Q.denodeify(personalityInsights.profile.bind(personalityInsights));

function getPersonality( text , cb )
{
	getProfile({text:text})
    .then(function(response){
       cb( null , response[0]);
      })
    .catch(function(err){
    	cb(err)
    })
    .done();
}



getPersonality( "hello i am a good boy. and dogs are really bad" , console.log );