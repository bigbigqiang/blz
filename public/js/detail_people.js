$(function () {
    $('body').css('overflow', 'visible');
    /*************变量定义*************/
    var mapBox = $('#map');//地图容器
    /***************************地图定义区begin**********************/
    var map_maxBounds = L.latLngBounds([39.89, 116.44], [39.94, 116.54]);
    if (URL.indexOf('192.168') == -1) {// 外
        var vec_c = new L.TileLayer.WMTS(URL, {
            tileSize:256,
            layer: 'vec_c',
            minZoom:14,
            maxZoom:19
        });
        var cva_c = new L.TileLayer.WMTS(URL, {
            tileSize:256,
            layer: 'cva_c',
            minZoom:14,
            maxZoom:19
        });
        var map = L.map('map', {
            crs:L.CRS.EPSG4326, 
            zoomControl: false,
            maxBounds:map_maxBounds, //设置地图最大视图边界
            attributionControl: false
        }).setView([39.9156, 116.491], 14);
        map.addLayer(vec_c);
        map.addLayer(cva_c);
    }else {
        var mapwms=L.tileLayer(URL,{
            layers:'world:China',
            format:'image/png',
            transparent:true,
            version:'1.1.0',
            minZoom:14,
            maxZoom:19
        });
        var map = L.map('map', {
            zoomControl: false,
            layers: mapwms,
            maxBounds:map_maxBounds, //设置地图最大视图边界
            attributionControl: false
        }).setView([39.9156, 116.491], 14);
    }
    var peopleIcon= L.divIcon({//房屋图标
        className: 'people-statistic-icon',
        iconSize: [32, 40],
        iconAnchor: [16, 20]
    });
    console.log($('#lat').html(),$('#lng').html())
    if ($('#lat').html()) {
        L.marker([$('#lat').html(),$('#lng').html()],{icon:peopleIcon}).addTo(map);
        map.setView([$('#lat').html(),$('#lng').html()], 14);
    } else {
        $('.modal-info').show();
    }
    /*********************** 社区边界 **********************/
    var geojson;
    var communityNameIcon= L.divIcon({//社区名称图标
        className: 'communityNameIcon',
        iconSize: [100, 20],
        iconAnchor: [50, 10]
    });
    var communityBounds =[L.latLngBounds(L.latLng(39.80743011843621, 116.47191660917477), L.latLng(39.93020273629616, 116.5121319431268))];//社区bounds数组
    function communityStyle(feature) {
        return {
            weight: 2,
            opacity: 1,
            color: '#006bd6',
            dashArray: '5',
            fillOpacity: 0,
            fillColor: '#069'
        };
    }
    geojson = L.geoJson(statesData, {
        style: communityStyle
    }).addTo(map);
    geojson.eachLayer(function(layer){
        communityNameIcon.options.html=layer.feature.properties.name.slice(0,-2);
        var name= L.marker(layer.getCenter(),{icon:communityNameIcon}).addTo(map);
    });
});