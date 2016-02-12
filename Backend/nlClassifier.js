var watson = require('watson-developer-cloud');
var fs     = require('fs');

var natural_language_classifier = watson.natural_language_classifier({
  url: 'https://gateway.watsonplatform.net/natural-language-classifier/api',
  username: '1feb075a-ad3f-4fbe-8735-c04f4544082f',
  password: 'AnHbuBuauY7W',
  version: 'v1'
});

// Using a classifier
natural_language_classifier.classify({
  text: 'Is it sunny?',
  classifier_id: '<classifier-id>' }, 
  function(err, response) {
    if (err)
      console.log('error:', err);
    else
      console.log(JSON.stringify(response, null, 2));
});