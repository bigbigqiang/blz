/**
 * 根据百度地图API做后台的搜索插件
 */

L.Control.MapSearch = L.Control.extend({
	options: {
        position: "topleft",
        ajaxurl:"/index.php/Home/index/myData.html",
    },

    initialize: function (options) { 
        L.Util.setOptions(this, options);
        //alert($);
    },

    onAdd: function(map){  //初始化地图控件
    	this._map = map;
    	container = this._container = L.DomUtil.create('div', 'MapSearchContainer');

        var html = '<input type="text" class="MapSearchInput" id="MapSearchInput" >' +
                '<a class="MapSearchClear" id="MapSearchClear">×</a>' +
                '<a class="MapSearchSubmit" id="MapSearchSubmit">搜索<a>' +
                '<div class="MapSearchIndex">' +
                    '<ul>' +
                        '<li class="top"><img src="/Public/image/food.png"> 寻<span>美食</span></li>'+
                        '<li class="top"><img src="/Public/image/hotel.png"> 找<span>酒店</span></li>'+
                        '<li class="top"><img src="/Public/image/bus.png" > 查<span>公交</span></li>'+
                        '<li><span>景点</span></li>'+
                        '<li><span>电影院</span></li>'+
                        '<li><span>银行</span></li>'+
                        '<li><span>KTV</span></li>'+
                    '</ul>'+
                    '<div style="clear:both"></div>'+
                '</div>'+  
                '<div class="MapSearchResults">'+                
                '</div>'
        container.innerHTML = html;

        var MapSearchInput = document.getElementById('MapSearchInput');
        var MapSearchSubmit = document.getElementById('MapSearchSubmit');
        var MapSearchClear = document.getElementById('MapSearchClear');

        //MapSearchSubmit.onclick = this.ajaxdata('美食',0,'郑州');

        return container;
    },

    


    ajaxdata : function(keyworks,searchtype, bounds){

         searchtype?searchtype:0;
         bounds?bounds:'郑州';

         $.ajax({
             type     : 'post',
             url      : this.options.ajaxurl, 
             dataType : "json",
             data     : {
                 'keyworks'  : keyworks,
                 'searchtype' : searchtype,  // 搜索区域类型 0：城市，1：视野
                 'bounds': bounds,
             },
             success  : function(data){
                 $('.MapSearchIndex').css('display','none')
                 $('.MapSearchResults').empty()
                 //searchGroup.clearLayers();

                 var mapSearchDivIcon = L.divIcon({
                    className: 'mapSearchDivIcon',
                    html : '1',
                    iconSize : [30,50],
                    iconAnchor : [15,-50]
                 });

                 var info = data.results;
                 for (var i = 0; i <= info.length; i++) {

                     var html = '<div class="MapSearchList"><div class="left"><span>'+ (i+1) +'</span></div><div class="right"><h3>'+ info[i].name +'</h3><img src="/Public/script/leaflet/images/image.png" width="80px" height="60px"><p class="tags">'+ info[i].detail_info.tag+'</p><p>'+ info[i].address +'</p><p class="tel">TEL：'+ info[i].telephone +'</p></div><div style="clear:both"></div></div>';
                     $('.MapSearchResults').append(html).slideDown();


                    mapSearchDivIcon = L.divIcon({
                        className: 'mapSearchDivIcon',
                        html :  'jjj',
                        iconSize : [30,50],
                        iconAnchor : [15,-50]
                    });

                    L.marker(info[i].location,{
                        icon : mapSearchDivIcon,
                    }).bindPopup(info[i].address).openPopup().addTo(searchGroup);   
                 };
             },
             error : function() {  
                    alert("异常！");  
             }  
         });
    }


})

L.Control.mapSearch = function (option) {
    return new L.Control.MapSearch(option);
};