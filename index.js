var mapnikify = require('@mapbox/geojson-mapnikify');
var mapnik = require('mapnik');
var fs = require('fs');

module.exports = generateImage;

function generateImage(gj, size, output, filename, callback) {
  
  mapnikify(gj, false, function(err,xml) {
    var xml_path = `${filename}.xml`;
    var png_path = `${output}/${filename}.png`;

    if (err) throw err;
    fs.writeFile(xml_path, xml, function(err) {
      if(err) {
          return console.log(err);
      }
      fs.exists(xml_path, function(exists) {
        if (exists) {
          mapnik.register_default_fonts();
          mapnik.register_default_input_plugins();

          var map = new mapnik.Map(size, size);
          map.load(xml_path, function(err,map) {
            if (err) throw err;
            map.zoomAll();
            var im = new mapnik.Image(size, size);
            map.render(im, function(err,im) {
              if (err) throw err;
              im.encode('png', function(err,buffer) {
                if (err) throw err;
                fs.writeFile(png_path, buffer, function(err) {
                  if (err) throw err;
                  try {
                    fs.unlinkSync(xml_path)
                    return callback(null, 'saved map image.');
                  } catch(err) {
                    console.error(err)
                  }
                });
              });
            });
          });
        }
      });
    }); 
  });

}



