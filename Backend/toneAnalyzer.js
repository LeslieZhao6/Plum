var watson = require('watson-developer-cloud');
 
// Version errors -_- 
var tone_analyzer = watson.tone_analyzer({
  url: 'https://gateway.watsonplatform.net/tone-analyzer/api/',
  username: '4e599e30-dc44-477e-b81f-b39829723ffb',
  password: '2g84o1rOV5UG',
  version_date: '2016-02-11',
  version: 'v3'
});
 
tone_analyzer.tone({ text: 'Hi! I am a potato.Do you care to have some tea?' },
  function(err, tone) {
    if (err)
      console.log(err);
    else
      console.log(JSON.stringify(tone, null, 2));
});