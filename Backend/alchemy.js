var watson = require('watson-developer-cloud');
 
var alchemy_language = watson.alchemy_language({
  api_key: 'd6aee88a1a9b99038ca060ca08c30848d9ed02a0'
});
 
var params = {
  text: 'Forgetting, opium of the people, Bandwagoning, acid throwing, sarcifice,Political correctness',
  maxRetrieve: 5
};
 
alchemy_language.keywords(params, function (err, response) {
  if (err)
    console.log('error:', err);
  else
    console.log(response['keywords']);
});