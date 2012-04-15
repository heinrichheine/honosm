// deliver just index.html
var deliverIndex = function (request, response) {
    var fs = require('fs');
    fs.readFile(__dirname + "/../index.html", "binary", function (err, file) {
        if (err) {
            response.writeHead(500, {"Content-Type":"text/plain"});
            response.end(err + "\n");
            return;
        }
        response.writeHead(200);
        response.end(file, "binary");
    });
};

var deliverJQuery = function (request, response) {
    var fs = require('fs');
    fs.readFile(__dirname + "/../lib/jquery-1.7.1.js", "binary", function (err, file) {
        if (err) {
            response.writeHead(500, {"Content-Type":"text/plain"});
            response.end(err + "\n");
            return;
        }
        response.writeHead(200);
        response.end(file, "binary");
    });

};


var deliverFile = function (request, response, filename) {
    var fs = require('fs');
    fs.readFile(__dirname + "/../" + filename, "binary", function (err, file) {
        if (err) {
            response.writeHead(500, {"Content-Type":"text/plain"});
            response.end(err + "\n");
            return;
        }
        response.writeHead(200);
        response.end(file, "binary");
    });

};

var deliverMobileBase = function (request, response) {

    deliverFile(request, response, "lib/mobile-base.js");
}
var deliverMobileJq = function (request, response) {

    deliverFile(request, response, "lib/mobile-jq.js");
}


// defautl 404 error page
var ftInvalidURL = function (req, res) {
    res.writeHead(404, {'Content-Type':'text/plain'});
    res.end('Invalid URL!\n');
};

var ftDeliverIndex = deliverIndex;

module.exports = {
    deliverIndex:ftDeliverIndex,
    invalidUrl:ftInvalidURL,
    deliverJQuery:deliverJQuery,
    deliverMobileBase:deliverMobileBase,
    deliverMobileJq:deliverMobileJq
};