var watson    = require('watson-developer-cloud');
var Q         = require('q')

var fetchTweets = require("./fetchTweets");

var concept_insights = watson.concept_insights({
  username: '32a7b493-3396-4d1b-a180-fa0fd8adcbd1',
  password: 'v9JXEYYUiPjQ',
  version: 'v2'
});

var getConcept = Q.denodeify(concept_insights.graphs.annotateText);
var getTweets = Q.denodeify(fetchTweets.getTweets)

exports.getConcepts = function( text , cb )
{
  var params = {
    graph: '/graphs/wikipedia/en-20120601',
    text: text
  };
   concept_insights.graphs.annotateText(params, function(err, res) {
      if (err)
        cb(err);
      else {
       cb(null , res);
      }
    });
}

getConcepts =  Q.denodeify(exports.getConcepts );

exports.getConceptsTwitterHandle = function( handle  , cb )
{
  getTweets(handle)
  .then(function(tweetObj){
    return fetchTweets.tweetObjToText( tweetObj );
  })
  .then(function(text){
    return getConcepts(text)
  })
  .then(function(concept){
    cb( null , concept )
  })
  .catch(function(err){ cb(err) })
  .done();
}
 
 exports.getConceptsTwitterHandle( "manojpandey" , function(e , r){
 var concepts = r['annotations'];
 for(x of concepts)
 {
  console.log(x['concept']['label']);
  console.log(x['score'])
 }
} );

// Retrieve the concepts for input text 
exports.getConcepts("potato is just another vegetable",console.log);