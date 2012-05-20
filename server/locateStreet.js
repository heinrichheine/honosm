function extractFromXML(xmlData) {
    var libxmljs = require("libxmljs");
    var eyes = require('eyes');


    log("parsing xml data");
    var xmlDoc = libxmljs.parseXmlString(xmlData);
    log("starting xpath search for street relation")
    log("root: " + xmlData);
    var root = xmlDoc.root();


    // find relation with street tag
    var relations = root.find("/osm/relation[tag[@k='highway'] and tag[@k='name']]");
    log("found " + relations.length + " relation that seems to be a street");

    // find way tags
    var ways = root.find("/osm/way[tag[@k='name'] and tag[@k='highway']]");
    log("found " + ways.length + " ways that seems to be a street");

    var streetNodes = relations.concat(ways);


    var streets = {};

    streetNodes.forEach(function (streetElement) {
        log("content id:" + streetElement.attr("id").value() + " - " + streetElement.name());
        // get name of street -> tag
        var nameTag = streetElement.get("tag[@k='name']");
        var streetName = nameTag.attr("v").value();
        log("found streetname: " + streetName);

        streets[streetName] = streetElement.attr("id").value();
    });


    return streets;
}


function getStreetname(lat, lon, callback) {

    // compute box for api request
    var bbox = {
        'minLat':parseFloat(lat) - 0.000765, // left
        'maxLat':parseFloat(lat) + 0.000765, // right
        'minLon':parseFloat(lon) - 0.000778, // bottom
        'maxLon':parseFloat(lon) + 0.000778 // top
    };
    // call api
    var osm = require('./osm');
    osm.getData(bbox, function (osmData) {
        // extract streetname from xml
        //log(osmData);
        log("found osm data");
        var streets = extractFromXML(osmData);
        callback(streets);
    });

}


var ftGetStreetname = getStreetname;

module.exports = {
    getStreetname:ftGetStreetname
};