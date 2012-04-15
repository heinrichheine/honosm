var PORT = 9900


// some basic constants for the request routing
var baseDelivery = require('./util/baseDelivery');
var locateStreet = function (request, response) {
    var streetLocator = require('./locateStreet');
    var url = require('url');
    var queryParams = url.parse(request.url, true).query;
    console.log("query: " + queryParams);
    streetLocator.getStreetname(queryParams.lat, queryParams.lon, function (streetName) {

        console.log("response from streetfinder: " + streetName);

        for (var ir in streetName) {
            console.log(ir);
        }


        response.writeHead(200, {'content-type':'application/json' });
        response.write(JSON.stringify({"name":streetName}));
        response.end('\n');
        //response.end(streetName);
        //response.end({"name" : "Hauptstr"});
    });
};

var url_mappings = {
    '/':baseDelivery.deliverIndex,
    '/index.html':baseDelivery.deliverIndex,
    '/getstreetname':locateStreet,
    '/jquery-1.7.1.js':baseDelivery.deliverJQuery,
    '/mobile-base.js':baseDelivery.deliverMobileBase,
    '/mobile-jq.js':baseDelivery.deliverMobileJq
};

var http = require('http');

http.createServer(
    function (request, response) {
        var url = require('url');

        var mapped = url_mappings[url.parse(request.url).pathname.toLowerCase()];
        if (mapped) {
            mapped(request, response);
        } else {
            console.log(request.url + ' has not been mapped');
            baseDelivery.invalidUrl(request, response);
        }


    }).listen(PORT);
console.log("server running at port " + PORT);
