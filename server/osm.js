module.exports = {
    getData:// bbox = {minLat, minLon, maxLat, maxLon}
        function (bbox, callback) {

            var http = require('http');

            var minLat = bbox.minLat.toFixed(6);
            var minLon = bbox.minLon.toFixed(6);
            var maxLat = bbox.maxLat.toFixed(6);
            var maxLon = bbox.maxLon.toFixed(6);
            // 49.376273,8.680783,49.376343,8.680879
            var options = {
                host:'api.openstreetmap.org',
                port:80,
                path:'/api/0.6/map?bbox=' + minLon + ',' + minLat + ',' + maxLon + ',' + maxLat,
                method:'GET',
                headers:{'Content-Type':'text/xml'}
            };

            console.log("connecting to " + options.host + options.path);

            http.get(options, function (response) {

                var pageData = "";
                response.setEncoding('utf8');
                //stream the data into the response
                response.on('data', function (chunk) {
                    pageData += chunk;
                });

                //write the data at the end
                response.on('end', function () {
                    console.log("received data from osm server");
                    callback(pageData);
                });

            });
        }
};






 




