

// some basic constants for the request routing
var baseDelivery = require('./util/baseDelivery');
var locateStreet = function(request, response) {
    var streetLocator = require('./locateStreet');
    var url = require('url');
    var queryParams = url.parse(request.url, true).query;
    console.log("query: " + queryParams);
    streetLocator.getStreetname(queryParams.lat, queryParams.lon, function (streetName) {
        
        console.log("response from streetfinder: " + streetName);
        
        response.writeHead("200", {"Content-Type": "text/plain"});
        response.end(streetName);
    });
};

var url_mappings = {
  '/': baseDelivery.deliverIndex,
  '/index.html': baseDelivery.deliverIndex,
  '/getstreetname': locateStreet,
  '/jquery-1.7.1.js' : baseDelivery.deliverJQuery
};

var http = require('http');

http.createServer(function (request, response) {
    var url = require('url');
      
    var mapped = url_mappings[url.parse(request.url).pathname.toLowerCase()];
    if (mapped) {
        mapped(request, response);
    } else {
      console.log(request.url + ' has not been mapped');
      baseDelivery.invalidURL(request, response);
    }  
    
    
    
}).listen(process.env.PORT);
console.log("server running at port " + process.env.PORT);
