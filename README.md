# geojson-mapnikify-image

Leverages [geojson-mapnikify](https://github.com/mapbox/geojson-mapnikify) and [node-mapnik](https://github.com/mapnik/node-mapnik)
bindings to take geojson and output an image directly with [mapnik](https://github.com/mapnik/mapnik).

## install

As a dependency:

    npm install --save geojson-mapnikify-image

As a binary:

    npm install -g geojson-mapnikify-image

## Requirements

geojson-mapnikiy assumptions for converting to valid mapnik stylesheet XML:

* GeoJSON is valid, and in EPSG:4326
* Styles, if any, are expressed in simplestyle-spec
* Mapnik **3.x** is the rendering engine

## binary

If you install `-g`, you can use `geojson-mapnikify-image` as a binary that takes
a single GeoJSON file, image dimensions, and output filepath as arguments and generates a PNG image.