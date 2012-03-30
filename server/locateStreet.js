
function getStreetname(lat, lon, callback) {
    
    // compute box for api request
    var bbox = {
        'minLat' : lat - 0.000035,  // left
        'maxLat' : lat + 0.000035, // right
        'minLon' : lon - 0.000048, // bottom
        'maxLon' : lon + 0.000048 // top
    };
    // call api
    var osm = require('./osm');
    osm.getData(bbox, function (osmData) {
            // extract streetname from xml
            console.log(osmData);
            callback(osmData);
        });
    
}

var ftGetStreetname = getStreetname;

module.exports = {
    getStreetname : ftGetStreetname
};