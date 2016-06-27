/*eslint-env express, node*/
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

// Get URLs for Catalog and Orders APIs
var appName;
if (appEnv.isLocal) {
	require('dotenv').load();
	appName = process.env.CF_APP_NAME;
}
else {
	appName = JSON.parse(process.env.VCAP_APPLICATION).name;
}

var domainPrefix = appName.substr(0, appName.indexOf("insurance") + 10);
var catalog_url = constructApiRoute(domainPrefix, "catalog"),
		orders_url = constructApiRoute(domainPrefix, "orders");
		
// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
  // print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});

 app.post('/api/tradeoff', function(req, res, next) {
  	return makePostRequest(req.body, catalog_url + '/tradeoff', res);
  });


/**
 * Makes an HTTP POST request given options and the initial response object
 */

function makePostRequest(payload, url, res) {
	var options = {
	  body: payload,
	  json: true,
	  url: url
	};

	request.post(options, function (err, response) {
	  if (err)
      return res.json(err);
    else
      return res.json(response.body);
	});
}

/**
 * Constructs a URL for an insurance microservice
 */
function constructApiRoute(prefix, suffix) {
	return "https://" + prefix + suffix + ".mybluemix.net";
}
 // app.post('/api/tradeoff', function(req, res, next) {
 // 	return makePostRequest(req.body, catalog_url + '/tradeoff', res);
 // });
