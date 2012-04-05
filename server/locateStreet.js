
function getStreetname(lat, lon, callback) {
    
    // compute box for api request
    var bbox = {
        'minLat' : parseFloat(lat) - 0.000065,  // left
        'maxLat' : parseFloat(lat) + 0.000065, // right
        'minLon' : parseFloat(lon) - 0.000078, // bottom
        'maxLon' : parseFloat(lon) + 0.000078 // top
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