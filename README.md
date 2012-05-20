# HonOSM - HouseNumber OpenStreetMap

This project is intended to create a slick and easy web application to record and upload housenumbers to the OSM-Servers.
The plan is to walk by a house (in real life outside) and use yyour smartphone to type in the housenumber. By acquiring the geo position by the 
html5 geolocation api, HonOSM will detect the street you are currently on and you can submit the housenumber as tag and member of the street relation to the OSM-Server.

Reason for this project: Using walking-papers to track down each housenumber is quite boring and it might speed up the workflow to get all housenumbers of the world.


## Technology
Its based on nodejs and some of its plugins, jquery and jquery mobile:
  * libxmljs
  * node-uuid
  * logging
  * eyes (debug only)
  
## Starting
get the code from github and type

  node omsproxy.js

and point your browser to the location localhost:9900


