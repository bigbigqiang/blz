/*
 Graticule plugin for Leaflet powered maps.
*/

L.Graticule = L.GeoJSON.extend({

    options: {
        style: {
            color: '#777',
            weight: 1,
            opacity: 0.5
        },
        interval: 5 
		
    }, 
    initialize: function (options){
        L.Util.setOptions(this, options);
        this._layers = {};

        if (this.options.sphere) {
            this.addData(this._getFrame());
        } else {
            this.addData(this._getGraticule());
        }
    },
    _getFrame: function() {
        return { "type": "Polygon",
          "coordinates": [
              this._getMeridian(-180).concat(this._getMeridian(180).reverse())
          ]
        };
    },

    _getGraticule: function () {
        var features = [], interval = this.options.interval;
            ne0= this.options.bounds.northEast[0];
            sw0= this.options.bounds.southWest[0];
            ne1= this.options.bounds.northEast[1];
            sw1= this.options.bounds.southWest[1];
          /* (ne0<-180)&&(ne0=-180);
           (ne1<-90)&&(ne1= -90);
           (sw0>180)&&(sw0= 180);
           (sw1>90)&&(sw1=90);*/
		var max_lg = Math.max(ne0,sw0);
        var min_lg =  Math.min(ne0,sw0);
		var max_lt = Math.max(ne1,sw1);
        var min_lt =  Math.min(ne1,sw1);

        var lineLgLt=[];
        var allLg = getAllLines(min_lg,max_lg,this.options.zoomLevel);
        var allLn = getAllLines(min_lt,max_lt,this.options.zoomLevel);
        for(var i = 0;i<allLn.length;i++){
            for(var j = 0;j<allLg.length;j++){
                lineLgLt.push([allLn[i],allLg[j]]);
            }
        }
		/*var min_lngLine = function(x){ return Math.floor(x/interval)*interval+interval}
		var max_lngLine = function(x){ return Math.floor(x/interval)*interval}*/
        // Meridians
        for (var k = 0;k<allLg.length;k++) {
            features.push(this._getFeature(this._getMeridian(allLg[k]), {
                "name": (allLg[k]) ? allLg[k].toString() + "° E" : "Prime meridian"
            }));
           
        }
		
        // Parallels
        for (var n = 0;n<allLn.length;n++) {
            features.push(this._getFeature(this._getParallel(allLn[n]), {
                "name": (allLn[n]) ? allLn[n].toString() + "° N" : "Equator"
            }));
          
        }
        return {
            "type": "FeatureCollection",
            "features": features
        };
    },

    _getMeridian: function (lng) {
       // lng = this._lngFix(lng);
        var coords = [];
        for (var lat = -90; lat <= 90; lat=lat+90) {
            coords.push([lng, lat]);
            //每一度添加一条纬线
        }
        return coords;
    },

    _getParallel: function (lat) {
        var coords = [];
        for (var lng = -180; lng <= 180; lng=lng+180) {
            //coords.push([this._lngFix(lng), lat]);
            coords.push([lng, lat]);
            //同一纬度下 每一度添加一条经线
        }
        return coords;
    },

    _getFeature: function (coords, prop) {
        return {
            "type": "Feature",
            "geometry": {
                "type": "LineString",
                "coordinates": coords
            },
            "properties": prop
        };
    }
});

L.graticule = function (options) {
    return new L.Graticule(options);
};

