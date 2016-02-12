var watson = require('watson-developer-cloud');
var fs     = require('fs');

var natural_language_classifier = watson.natural_language_classifier({
  url: 'https://gateway.watsonplatform.net/natural-language-classifier/api',
  username: '1feb075a-ad3f-4fbe-8735-c04f4544082f',
  password: 'AnHbuBuauY7W',
  version: 'v1'
});

// Don't call this unless very sure,can be called only once (for free)

// Creating a classifier
var params = {
  language: 'en',
  name: 'tag-classifier',
  training_data: fs.createReadStream('.training_data')
};

natural_language_classifier.create(params, function(err, response) {
  if (err)
    console.log(err);
  else
    // copy the classifier_id from the response
    console.log(JSON.stringify(response, null, 2));
});