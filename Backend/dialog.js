// More : https://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/dialog/api/v1/?node#converse
var fs     = require('fs');
var watson = require('watson-developer-cloud');
 
var dialog = watson.dialog({
  username: '2b6fe143-4ebd-4d3d-84ee-d256884c3c63',
  password: 'ww13VzvbVh6B',
  version: 'v1'
});
 
var params = {
  name: 'sample-convo',
  file: fs.createFileStream('./sample_pizza.xml')
};

dialog.createDialog(params, function(err, dialog) {
  if (err)
    console.log(err)
  else
    console.log(dialog);
});
