

var watson    = require('watson-developer-cloud');
var Q         = require('q')
var fs = require("fs");

var fetchTweets = require("./fetchTweets");

var writeFile = Q.denodeify(fs.writeFile);
var readFile = Q.denodeify(fs.readFile);
var getTweets = Q.denodeify(fetchTweets.getTweets)



var toneAnalyzer = watson.tone_analyzer({
  url: 'https://gateway.watsonplatform.net/tone-analyzer-beta/api/',
  username:'4e599e30-dc44-477e-b81f-b39829723ffb',
  password: '2g84o1rOV5UG',
  version_date: '2016-11-02',
  version: 'v3-beta'
});


exports.getTone = function( text , cb )
{
	  
	toneAnalyzer.tone({ text: text },
	  function(err, tone) {
	    if (err)
	     cb(err);
	    else
	      cb( null , tone );
	});
}

var getTone =  Q.denodeify(exports.getTone );



exports.getToneTwitterHandle = function( handle  , cb )
{

  var fName = "./data/tones/"+ handle +".json";
  var ToneG ;

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
        return getTone(text)
      })
      .then(function(tone){
        ToneG = tone;
        return writeFile( fName , JSON.stringify(tone));
      })
      .then(function(  ){
        cb( null , ToneG )
      })
      .catch(function(err){ cb(err) })
      .done();
  });

}

exports.toneTovec = function(r)
{
  var vec = {};

  function mergeVec( name , persentage)
  {
    if( name in vec)
      vec[name] += persentage;
    else vec[name] = persentage;
  }

  var x = r['document_tone']['tone_categories'][0]['tones'];

  for( t of x)
  {
  	vec[t['tone_id']] = t['score']
  }

   return vec;


}


// exports.getToneTwitterHandle('namanspace' , function(e , r){
// 	console.log( e , exports.toneTovec(r));
// })