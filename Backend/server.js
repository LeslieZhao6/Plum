
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

//  /registerUser?name=levels &profile_pic=https://pbs.twimg.com/profile_images/696588888836599808/BuuCzpKH_400x400.jpg&bio=hello&gender=m&age=18&username=levelsio


//  /registerUser?name=levels&profile_pic=hello&bio=hello&gender=m&age=18&username=levelsio


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
