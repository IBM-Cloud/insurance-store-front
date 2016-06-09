// add comment
var express   	= require('express'),
	  app         = express(),
		bodyParser 	= require('body-parser'),
	  request			= require('request'),
	  cfenv       = require('cfenv');

// Setup the express app
var appEnv = cfenv.getAppEnv();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

var catalog_url = "https://insurance-catalog.mybluemix.net";

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
  // print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});

// Request handler for tone analysis
app.post('/api/tradeoff', function(req, res, next) {
	console.log(req.body);
	var url = catalog_url + '/tradeoff';
	var options = {
	  body: req.body,
	  json: true,
	  url: url
	};
	request.post(options, function (err, response) {
	  if (err)
      return res.json(err);
    else
      return res.json(response);
	});
});