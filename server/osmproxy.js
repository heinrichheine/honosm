
var osm = require('./osm');

var http = require('http');

http.createServer(function (request, response) {
    

	// call osm api
	var options = {
	               host : 'api.openstreetmap.org',
	               port : 80,
	               path : request.url,
	               method : request.method,
	               headers : {'Content-Type' : 'text/xml'}
	};
	console.log(options);
	console.log("bla");
	var osmRequest = http.request(options, function(osmResponse){
		console.log('STATUS: ' + osmResponse.statusCode);
		  console.log('HEADERS: ' + JSON.stringify(osmResponse.headers));
		  osmResponse.setEncoding('utf8');
		  osmResponse.on('data', function (chunk) {
		    console.log('BODY: ' + chunk);
		  });
	});
	osmRequest.on('response', function(oresponse) {
		oresponse.on('data', function (chunk) {
		    console.log('BODY: ' + chunk);
		    response.writeHead(200, {'Content-Type': 'text/plain'});
		    response.end('_testcb(\'{"message": "Hello world!"}\')');
		  });
	});
	
	
    console.log('request received');
    
    
    
}).listen(process.env.PORT);