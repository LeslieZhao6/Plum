
var express = require('express');
var app = express();

var doMatch = require('./doMatch');
var registerUser = require('./registerUser');

// This responds with "Hello World" on the homepage
app.get('/getMatches', function (req, res) {
   
   doMatch.getClosnessAllNewUser(  req.param('user')  , function( e , r){
   	if(!e)
   		res.json(  r );
   	else
   		res.send(e);
   });

});


app.get('/registerUser', function (req, res) {

	var user_data = { 
	 name : req.param('name') ,
	 profile_pic : req.param('profile_pic')  , 
	 bio : req.param('bio') ,
	 gender : req.param('gender') ,
	 age : req.param('age') ,
	 username :  req.param('username') 
	}
   
   registerUser.newUser(  user_data  , function( e ){
   	if(!e)
   		res.json(  "OK" );
   	else
   		res.send(e);
   });

});


var server = app.listen( (process.env.PORT || 8081) , function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})
