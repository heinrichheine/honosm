var PORT = 9900
GLOBAL.log = require('logging').from(__filename);


var SESSION_CACHE = {};

function ClientSession ( sessionId, creationDate) {
    this.creationDate = creationDate;
    this.sessionId = sessionId;
}


// some basic constants for the request routing
var baseDelivery = require('./util/baseDelivery');
var locateStreet = function (request, response) {
    var streetLocator = require('./locateStreet');
    var url = require('url');
    var queryParams = url.parse(request.url, true).query;
    log("query: " + queryParams);
    streetLocator.getStreetname(queryParams.lat, queryParams.lon, function (streetName) {

        log("response from streetfinder: " + streetName);

        for (var ir in streetName) {
            log(ir);
        }


        response.writeHead(200, {'content-type':'application/json' });
        response.write(JSON.stringify({"name":streetName}));
        response.end('\n');

    });
};


var findOrCreateSession = function( request, response ) {
    var url = require('url');
    var queryParams = url.parse(request.url, true).query;

    var sentSessionId = queryParams.id;
    
    log("incoming sessionid: ", sentSessionId);

    if ( typeof sentSessionId == "undefined" || !( sentSessionId in SESSION_CACHE ) ) {
        // generate new sessionId
        var uuid = require('node-uuid');
        sentSessionId = uuid.v4();
        SESSION_CACHE[ sentSessionId ] = new ClientSession( sentSessionId, new Date() );
        
        log("creating new session", SESSION_CACHE[ sentSessionId ]);
        
    } 
    
    response.writeHead(200,  {'content-type':'text/plain' });
    response.write(sentSessionId);

    
    response.end('\n');        
    
}



var url_mappings = {
    '/':baseDelivery.deliverIndex,
    '/index.html':baseDelivery.deliverIndex,
    '/getstreetname':locateStreet,
    '/getsession' : findOrCreateSession,
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
            log(request.url + ' has not been mapped');
            baseDelivery.invalidUrl(request, response);
        }


    }).listen(PORT);
log("server running at port " + PORT);
