var watson    = require('watson-developer-cloud');
var Q         = require('q')
var fs = require("fs");

var fetchTweets = require("./fetchTweets");

var writeFile = Q.denodeify(fs.writeFile);
var readFile = Q.denodeify(fs.readFile);


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

  var fName = "./data/concepts/"+ handle +".json";
  var ConceptsG ;

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
        return getConcepts(text)
      })
      .then(function(concept){
        ConceptsG = concept;
        return writeFile( fName , JSON.stringify(concept));
      })
      .then(function(  ){
        cb( null , ConceptsG )
      })
      .catch(function(err){ cb(err) })
      .done();
  });

}



 



exports.conceptsTovec = function(r)
{
  var vec = {};

  function mergeVec( name , persentage)
  {
    if( name in vec)
      vec[name] += persentage;
    else vec[name] = persentage;
  }

   var concepts = r['annotations'];

   for(x of concepts)
   {
      // console.log(x['concept']['label']);
      // console.log(x['score'])
      mergeVec( x['concept']['label']  ,  x['score']  )
   }

   return vec;


}



exports.getConceptsTwitterHandle( "manojpandey" , function(e , r){
      console.log( exports.conceptsTovec(r)  )
});



// Retrieve the concepts for input text 
// exports.getConcepts("potato is just another vegetable",console.log);