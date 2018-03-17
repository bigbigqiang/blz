$(function () {
    $(window).resize(resize);
    function resize() {
        var windowHeight = $(window).height();
        $('#content').height(windowHeight - 90);
        $(".floorTab").mCustomScrollbar("destroy");
        $("#cmpTable").mCustomScrollbar("destroy");
        $(".scroll").mCustomScrollbar("destroy");
        var height = parseInt($(".informationBox").css("height"));
        $(".floorTab").css("height",height - 83 + "px")
        $("#cmpTable").css("height",height - 40 + "px")
        $(".scroll").css("height",height - 40 + "px")
        $(".floorTab").mCustomScrollbar();
        $("#cmpTable").mCustomScrollbar();
        $(".scroll").mCustomScrollbar();
    }
    resize();
    /*************变量定义*************/
    var mapBox = $('#map');//地图容器
    /***************************地图定义区begin**********************/
    var map_maxBounds = L.latLngBounds([39.89, 116.44], [39.94, 116.54]);
    if (URL.indexOf('192.168') == -1) {// 外
        var vec_c = new L.TileLayer.WMTS(URL, {
            tileSize:256,
            layer: 'vec_c',
            minZoom:14,
            maxZoom:18
        });
        var cva_c = new L.TileLayer.WMTS(URL, {
            tileSize:256,
            layer: 'cva_c',
            minZoom:14,
            maxZoom:18
        });
        var map = L.map('map', {
            crs:L.CRS.EPSG4326, 
            zoomControl: false,
            maxBounds:map_maxBounds, //设置地图最大视图边界
            attributionControl: false
        }).setView([39.9156, 116.491], 15);
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

    var buildingIcon= L.divIcon({//房屋图标
        className: 'building-statistic-icon',
        iconSize: [32, 32],
        iconAnchor: [16, 16]
    });
    if ($('#lat').html()) {
        L.marker([$('#lat').html(),$('#lng').html()],{icon:buildingIcon}).addTo(map);
        map.setView([$('#lat').html(),$('#lng').html()], 14);
    } else {
        $('.modal-info').show();
    }

    /*************右侧房间及企业列表*************/
    var buildingUnit = $(".houseTab");//楼层信息单元切换
    var floorTab = $(".floorTab");
    var roomList = $(".roomList");//楼层信息房间列表
    var roomDetail = $(".roomDetail");//楼层信息房间详情
    var cmpList = $(".cmpList tbody");//企业信息表格
    $(".houseTab li:first-child").addClass("active");
    $(".floorList:first-child").addClass("active");
    //单元切换
    buildingUnit.on('click','li',function(){
        if(!$(this).hasClass("active")) {
            $(this).addClass("active").siblings(".active").removeClass("active");
            var index = $(this).index();
            $(floorTab.find('ul')[index]).addClass("active").siblings(".active").removeClass("active");
        }
    });
    //房间号点击事件
    floorTab.on('click','span:not(.floorNum)',function(){
        var roomid = $(this).attr("roomid");
        var roomNUM = $(this).html();
        $.ajax({
            type: 'post',
            url: '/blz/getRoomPeople.do',
            data: {roomId:roomid},
            dataType: 'json',
            success: function (data) {
                roomList.hide();
                roomDetail.show();
                var tbody = roomDetail.find("tbody").empty();
                for(var i= 0;i<data.data.length;i++){
                    tbody.append('<tr peopleid='+data.data[i].id+'>' +
                        '<td>'+data.data[i].name+'</td>' +
                        '<td>'+data.data[i].sex+'</td>' +
                        '<td>'+data.data[i].phone+'</td>' +
                        '<td title='+data.data[i].dicNative+'>'+(data.data[i].dicNative.length > 9?(data.data[i].dicNative.slice(0,9)+'...'):data.data[i].dicNative)+'</td>' +
                        '<td title='+data.data[i].workCompany+'>'+(data.data[i].workCompany.length > 9?(data.data[i].workCompany.slice(0,9)+'...'):data.data[i].workCompany)+'</td>' +
                        '</tr>');
                }
                roomDetail.find("h5 span").html(roomNUM);
            },
            error: function () {
                layer.alert("请求出错，请稍后重试！")
            }
        });
    });
    //房间详情返回列表
    $(".roomDetail h5 li").on('click',function(){
        roomList.show();
        roomDetail.hide();
    });

    //企业点击事件
    $(".informationTable.cmpList").on('click','tbody tr',function(){
        var id = $(this).attr('cmpid');
        location.href = "/detail/company/"+id;
    });
    //人点击事件
    $(".informationTable.peopleList").on('click','tbody tr',function(){
        var id = $(this).attr('peopleid');
        location.href = "/detail/people/"+id;
    });
    $("table").on('mouseover','tbody tr',function(){
        $(this).css('cursor', 'pointer');
    });
    $("table").on('mouseout','tbody tr',function(){
        $(this).css('cursor', 'arrow');
    });
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
