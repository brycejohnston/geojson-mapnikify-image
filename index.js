var mapnikify = require('@mapbox/geojson-mapnikify');
var mapnik = require('mapnik');
var fs = require('fs');

module.exports = generateImage;

function generateImage(gj, size, output, callback) {
  
  mapnikify(gj, false, function(err,xml) {
    if (err) throw err;
    fs.writeFile('./other.xml', xml, function(err) {
      if(err) {
          return console.log(err);
      }
      fs.exists('./other.xml', function(exists) {
        if (exists) {
          mapnik.register_default_fonts();
          mapnik.register_default_input_plugins();

          var map = new mapnik.Map(size, size);
          map.load('./other.xml', function(err,map) {
            if (err) throw err;
            map.zoomAll();
            var im = new mapnik.Image(size, size);
            map.render(im, function(err,im) {
              if (err) throw err;
              im.encode('png', function(err,buffer) {
                if (err) throw err;
                fs.writeFile(output, buffer, function(err) {
                  if (err) throw err;
                  return callback(null, 'saved map image.');
                });
              });
            });
          });
        }
      });
    }); 
  });

}



