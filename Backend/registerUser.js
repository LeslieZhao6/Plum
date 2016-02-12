var Q = require('q')
var fs = require("fs");

var writeFile = Q.denodeify(fs.writeFile);
var readFile = Q.denodeify(fs.readFile);



exports.newUser = function(user_data, cb) {
	var fName = "./data/users.json";

	readFile(fName)
	.then(function(content) {
		var prevUsers = JSON.parse(content);
		prevUsers[user_data.username] = user_data;
		return writeFile( fName , JSON.stringify(prevUsers))
	})
	.then(function(   ){
		cb( null );
	})
	.catch(function(  err ){
		cb(err)
	})
	.done();

}

// exports.newUser( {username : "levelsio" , bio : "dehvchdvchgecd" , gender : "F" } , console.log)
