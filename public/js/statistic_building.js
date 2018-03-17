$(function () {
    /********* 变量定义 ********/
    var content = $("#content");
    var infoContent = $(".infoContent");
    var Container1 = $('#chart1').get(0);
    var Chart1 = echarts.init(Container1);//房产统计
    var Container2 = $('#chart2').get(0);
    var Chart2 = echarts.init(Container2);//出租率
    var Container3 = $('#chart3').get(0);
    var Chart3 = echarts.init(Container3);//危房统计
    var mapBox = $('#map');//地图容器
    var nameOpen = false;//社区名称是否打开
    var gridBtn = $('.gridBtn');//网格开关
    var annualData = $('#annualData');//时间轴数据统计div
    var gridTool =$('.gridTool');//网格层级控制工具
    var community =$('#community');//社区选择下拉
    var layerManage = $('#layerManage');//图层管理下拉
    var buildingBtn =$('.buildingBtn');//建筑开关
    var companyBtn =$('.companyBtn');//企业开关
    var warningBtn =$('.warningBtn');//人口预警开关
    var peopleBtn =$('.peopleBtn');//人口开关
    var nameBtn =$('.nameBtn');//社区名称开关
    var communityName=[];//社区名称
    var communityNameIcon = L.divIcon({//社区名称图标
        className: 'communityNameIcon',
        iconSize: [100, 20],
        iconAnchor: [50, 10]
    });
    var buildingIcon = L.divIcon({//房屋图标
        className: 'building-statistic-icon',
        iconSize: [22, 22],
        iconAnchor: [11, 11]
    });
    var dangerIcon = L.divIcon({//危房图标
        className: 'building-danger-icon',
        iconSize: [22, 22],
        iconAnchor: [11, 11]
    });
    var informationIcon = L.divIcon({
        class: 'info-detail-box',
        iconSize: [290, ''],
        iconAnchor: [-15,-15]
    });
    var informationMarker;
    var shapeHere = false;
    var gridHere = false;
    var information =$('.info-detail-box');//信息框
    var informationList = $('.info-con');//信息框详情列表
    var deleteShape =$('.deleteShape');//draw删除按钮
    var geoSOTCode=$('.geoSOTCode');//鼠标移到网格上出现的网格码div
    var searchInput = $("#search-input");// 搜索框
    var resultList = $(".result-list");// 搜索匹配结果
    var splitNum = 2;
    var communityBounds =[L.latLngBounds(L.latLng(39.80743011843621, 116.47191660917477), L.latLng(39.93020273629616, 116.5121319431268))];//社区bounds数组

    /********* window resize ********/
    $(".chzn-select").chosen();
    function resize () {
        var H = window.innerHeight;
        content.css("height", H - 130 + "px");
        var h = parseInt(infoContent.parent().css("height"));
        infoContent.css("height",h - 40 + "px");
        Chart1.resize();
        Chart2.resize();
        Chart3.resize();
    } 
    resize();
    $(window).resize(resize);

    /********* 地图 ********/
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
            layers: mapwms,
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
        }).setView([39.9156, 116.491], 15);
    }
    map.off('dblclick');

    /***************************社区基本信息栏begin**********************/
    var drawnItems = L.featureGroup().addTo(map);
    var drawControl = new L.Control.Draw({
        position: 'topright',
        draw: {
            polyline: false,
            rectangle:{
                shapeOptions: { color: '#069' }
            },
            polygon: {
                allowIntersection: false,
                showArea: true,
                drawError: {
                    color: '#b00b00',
                    timeout: 1000
                },
                shapeOptions: { color: '#069' }
            },
            circle: false,
            marker: false
        },
        edit: false

    });//draw控件
    map.addControl(drawControl);
    map.on('draw:created', function (e) {//每画完一个图形触发的事件
        var layer = e.layer;
        drawnItems.addLayer(layer);
        layer.on('click', function () {
            drawnItems.setStyle({color: '#f06eaa'});
            this.setStyle({color: '#f7370b'});
            var geoJson = this.toGeoJSON();
            var bounds='';
            for(var i=0;i<geoJson.geometry.coordinates[0].length;i++){
                bounds+=geoJson.geometry.coordinates[0][i].toString()+';'
            }
            bounds=bounds.slice(0,bounds.length-1);
            shapeParams={bounds:bounds};
            /*communityParams.bounds = bounds;*/
            $.ajax({
                type: 'post',
                url: '/blz/getPolygonBuild.do',
                dataType: 'json',
                data: shapeParams,
                success: function (data){
                    buildMarkerOnMap(data.data);
                },
                error: function () {
                    layer.alert("请求出错，请稍后重试！")
                }
            });
        });
        if(gridHere&&e.layerType=="rectangle"){
            var bounds = layer.getBounds();
            var geosotCodes='';
            geoSotGeoJson.eachLayer(function(layer){
                var layerBounds = layer.getBounds();
                if(layerBounds.intersects(bounds)){
                    layer.setStyle({color: '#fcff00'});
                    layer.selected=true;
                    geosotCodes+=layer.geosotCode+',';
                }else if(layerBounds.contains(bounds)){
                    layer.setStyle({color: '#fcff00'});
                    layer.selected=true;
                    geosotCodes+=layer.geosotCode+',';
                }else if(layerBounds.equals(bounds)){
                    layer.setStyle({color: '#fcff00'});
                    layer.selected=true;
                    geosotCodes+=layer.geosotCode+',';
                }
            });
            geosotCodes=geosotCodes.slice(0,geosotCodes.length-1);
            var level = $(".grid-tool-text").html();
            var pointParams={
                layer: level,
                geosotCodes: geosotCodes
            };
            gridParams.id=geosotCodes;
            gridParams.layer=level;
            map.removeLayer(layer);
        }
        shapeHere=true;
    });
    map.on('draw:drawstart', function (e) {//每画之前触发的事件
        drawnItems.clearLayers();
        gridBtnClose();
        warning=false;
        gridTool.hide();
        clearAllData();
        geojson.eachLayer(function(layer){
            geojson.resetStyle(layer);
            layer.selected=false;
        });
        if(map.hasLayer(geoSotGeoJson)){
            map.removeLayer(geoSotGeoJson);
            gridHere=false;
        }
    });
    var allMarkerLayersNormal;
    var allMarkerLayers = L.markerClusterGroup({
        showCoverageOnHover: false,
        spiderfyOnMaxZoom: false,
        minClusterSize: 100
    });
    var buildingList = $("#buildingList");
    function buildMarkerOnMap(data, danger){
        allMarkerLayers&&allMarkerLayers.clearLayers();
        allMarkerLayersNormal&&allMarkerLayersNormal.clearLayers();
        informationMarker&&map.removeLayer(informationMarker);
        buildingMarker = [];
        buildingList.empty();
        leftModal.mCustomScrollbar('destroy');
        var length = data.length;
        for(var j=0;j<data.length;j++){
            if(data[j].lat&&data[j].lng){
                var icon = danger ? dangerIcon : buildingIcon;
                var building = length<100 ? L.marker([data[j].lat, data[j].lng],{icon:icon}).addTo(map) : L.marker([data[j].lat, data[j].lng],{icon:icon});
                building.info = data[j];
                building.id = data[j].buildId || data[j].id;
                building.on('click',highlightIcon);
                buildingMarker.push(building);
                var type = data[j].buildType == 0 ? '居民楼' : data[j].buildType == 1 ? '商住' : data[j].buildType == 2 ? '写字楼' : data[j].buildType == 3 ? '单位楼' : '平房';
                buildingList.append("<li eventid="+(data[j].buildId || data[j].id)+"><p class='title'>"+data[j].address+"</p><p>建筑类型:"+type+"</p></li>");

                if (length>=100) {
                    allMarkerLayers.addLayer(building);
                    map.addLayer(allMarkerLayers);
                }
            }
        }
        if (buildingMarker.length == 0) {
            layer.msg('无坐标信息');
        }
        leftModal.mCustomScrollbar();
        length<100 && (allMarkerLayersNormal = L.featureGroup(buildingMarker).addTo(map));
        if (buildingMarker.length < 5) {
            console.log(buildingMarker[0])
            map.setView(buildingMarker[0]._latlng, 15);
        }
        $(".toggle-modal").show();
        $(".toggle-modal span").html(buildingList.children().length);
    }
    function highlightIcon(e,type){
        e = type == 'bounce' ? e : e.target;
        map.setView(e._latlng);
        var point = map.latLngToContainerPoint([e._latlng.lat,e._latlng.lng]);
        mapBox.css("cursor","pointer");
        var TYPE = e.type;
        var type = e.info.buildType == 0 ? '居民楼' :
                    e.info.buildType == 1 ? '商住' :
                    e.info.buildType == 2 ? '写字楼' :
                    e.info.buildType == 3 ? '单位楼' :
                                                '平房' ;
        informationIcon.options.html = '<i class="blt-large"></i><b class="info-close">×</b><ul class="info-con"><li><label>建筑类型：</label><span>'+type+
        '</span></li><li><label>地址：</label><span>'+(e.info.address||'无')+
        '</span></li><li><a class="btn" target="_blank" href="/detail/building/'+(e.info.buildId||e.info.id)+'/'+e.info.lat+'/'+e.info.lng+'/'+e.info.address+'">查看详情</a></li></ul>';
        // informationList.html('');
        // $(this._icon).append(information);
        // information.show();
        informationMarker&&map.removeLayer(informationMarker);
        informationMarker = L.marker(e._latlng,{icon: informationIcon}).addTo(map);
    }
    /********* 图表 ********/
    function barChartOption (xData, yData) {
        var yData2 = [];
        yData.forEach(function (v){
            yData2.push(v * 1.1);
        });
        var option = {
            color:["#14cc7c"],
            tooltip:{
                trigger:'axis',
                formatter:'{b}年：{c}套'
            },
            calculable:true,
            grid:{
                left:50,
                top:30,
                right: 10,
                bottom: 20,
                borderColor:"#0d1430"
            },
            xAxis:{
                type:'category',
                axisLine:{
                    show:false
                },
                axisLabel:{
                    textStyle:{color:"#262b2e", fontSize: 14}
                },
                axisTick:{
                    //alignWithLable:true
                    show: false
                },
                splitLine:{show: false},
                data:xData
            },
            yAxis:[
                {
                    type:"value",
                    name:"单位 (套)",
                    nameTextStyle:{
                        color:"#262b2e"
                    },
                    axisLabel:{
                        textStyle:{color:"#262b2e"}
                    },
                    splitLine:{lineStyle:{color:"#e5e5e5"}},
                    splitNumber: splitNum-1,
                    axisLine:{show: false},
                    axisTick: {show: false}
                }

            ],
            series :[
                {
                    name:"房屋",
                    type:'bar',
                    barWidth:14,
                    data:yData
                },
                {
                    name:"房屋",
                    type:'line',
                    barWidth:14,
                    data:yData2
                }
            ]

        };
        return option;
    }
    function lineChartOption (xData, yData, color) {
        var option = {
            color:[color],
            tooltip:{
                trigger:'axis',
                formatter:'{b}年：{c}套'
            },
            calculable:true,
            grid:{
                left:50,
                top:30,
                right: 10,
                bottom: 20,
                borderColor:"#0d1430"
            },
            xAxis:{
                type:'category',
                axisLine:{
                    show:false
                },
                axisLabel:{
                    textStyle:{color:"#262b2e", fontSize: 14}
                },
                axisTick:{
                    //alignWithLable:true
                    show: false
                },
                splitLine:{show: false},
                data:xData
            },
            yAxis:[
                {
                    type:"value",
                    name:"单位 (套)",
                    nameTextStyle:{
                        color:"#262b2e"
                    },
                    axisLabel:{
                        textStyle:{color:"#262b2e"}
                    },
                    splitLine:{lineStyle:{color:"#e5e5e5"}},
                    splitNumber: splitNum,
                    axisLine:{show: false},
                    axisTick: {show: false}
                }

            ],
            series :[
                {
                    name:"房屋",
                    type:'line',
                    barWidth:14,
                    data:yData
                }
            ]

        };
        return option;
    }
    
    Chart1.setOption(barChartOption(["2013", "2014", "2015", "2016", "2017"], [400, 580, 450, 630, 820]));
    Chart2.setOption(lineChartOption(["2013", "2014", "2015", "2016", "2017"], [400, 580, 450, 630, 820], "#14cc7c"));
    Chart3.setOption(lineChartOption(["2013", "2014", "2015", "2016", "2017"], [400, 580, 450, 630, 820], "#ff700a"));

    Chart1.on('click',function(params){
        clearAllData();
        drawnItems.clearLayers();
        gridBtnClose();
        $("#loading").show();
        $.ajax({
            type: 'post',
            url: '/blz/getBuildingByYear.do',
            dataType: 'json',
            data: {year: params.name},
            success: function(data){
                // layer.close(loading);
                $("#loading").hide();
                if(data.code == 0) {
                    buildMarkerOnMap(data.data);
                }else {
                    layer.alert('请求出错，请稍后重试！');
                }
            },error: function (){
                $("#loading").hide();
                layer.alert('请求出错，请稍后重试！');
            }
        });
    });
    Chart3.on('click',function(params){
        clearAllData();
        drawnItems.clearLayers();
        gridBtnClose();
        $("#loading").show();
        $.ajax({
            type: 'post',
            url: '/blz/getDangerousByYear.do',
            dataType: 'json',
            data: {year: params.name},
            success: function(data){
                $('#loading').hide();
                if(data.code == 0) {
                    buildMarkerOnMap(data.data, 'red');
                }else {
                    layer.alert('请求出错，请稍后重试！');
                }
            },error: function (){
                $('#loading').hide();
                layer.alert('请求出错，请稍后重试！');
            }
        });
    });

    /******* 统计结果 *******/
    $.ajax({
        type: 'get',
        url: '/blz/getBuildingNumByYear.do',
        dataType: 'json',
        success: function (data) {
            if (data.code == 0) {
                var xData = [];
                var yData = [];
                for(var k in data.data) {
                    xData.push(k);
                    yData.push(data.data[k]);
                }
                Chart1.setOption(barChartOption(xData, yData));
                getDangerousNumByYear();
            }else {
                layer.alert('请求出错，请稍后重试！');
            }
        },error: function (){
            layer.alert('请求出错，请稍后重试！');
        }
    });
    function getDangerousNumByYear() {
        $.ajax({
            type: 'get',
            url: '/blz/getDangerousNumByYear.do',
            dataType: 'json',
            success: function (data) {
                if (data.code == 0) {
                    var xData = [];
                    var yData = [];
                    for(var k in data.data) {
                        xData.push(k);
                        yData.push(data.data[k]);
                    }
                    Chart3.setOption(lineChartOption(xData, yData, "#ff700a"));
                }else {
                    layer.alert('请求出错，请稍后重试！');
                }
            },error: function (){
                layer.alert('请求出错，请稍后重试！');
            }
        });
    }
    /********* 开关 ********/
    gridBtn.on('click',function(){
        clearAllData();
        if(!gridHere){//如果是关着的，那么开
            drawnItems.clearLayers();
            // drawnItems.clearLayers();
            shapeHere=false;
            changePosition(18);
            gridHere=true;
            warning=false;
            // marginal.hide();
        }else{//如果是开着的，那么关
            $(".leaflet-draw-draw-polygon").show();
            map.removeLayer(geoSotGeoJson);
            gridHere=false;
        }
        if(!gridHere/*&&!warning*/){
            gridTool.hide();
        }else{
            gridTool.show();
        }

    });
    warningBtn.on('click',function(){
        if(!warning){//如果是关着的，那么开
            popClass.css({'background-color':'#3D8A71'});
            gridBtnClose();
            drawnItems.clearLayers();
            clearAllData();
            shapeHere=false;
            changePosition(map.getZoom());
            warning=true;
            gridHere=false;
            marginal.show();
        }else{//如果是开着的，那么关
            warning=false;
            marginal.hide();
            map.removeLayer(geoSotGeoJson);
        }
        if(!gridHere&&!warning){
            gridTool.hide();
        }else{
            gridTool.show();
        }
    });
    nameBtn.on('click',function(){
        if(nameOpen){
            for(var i=0;i<communityName.length;i++){
                map.removeLayer(communityName[i]);
            }
            nameOpen=false;
        }else{
            geojson.eachLayer(function(layer){
                communityNameIcon.options.html=layer.name.slice(0,-2);
                var name= L.marker(communityBounds[layer.feature.id].getCenter(),{icon:communityNameIcon}).addTo(map);
                communityName.push(name);
            });
            nameOpen=true;
        }

    });
    community.change(function(){
        if(this.value == 0) {
            // clearAllData();
            // changeAreaData(null);
            // $("#map").css("height","63%");
            // defaultShow.show();
            // buildingDetail.hide();
            map.setView([39.9156, 116.491], 15);
            // resize();
            return;
        }
        var val = this.value;
        // geojson.eachLayer(function (layer) {
        //     layer.feature.id == val && changeAreaData(layer.commCode);
        // });
        // $("#map").css("height","63%");
        // defaultShow.show();
        // buildingDetail.hide();
        // resize();
        // clearAllData();
        // hideTimeLine();
        var text = $(this).find('option:selected').text();
        geojson.eachLayer(function(layer){
            geojson.resetStyle(layer);
            layer.selected=false;
            if(layer.name ==text){
                var red=true;
                var blink = setInterval(function(){
                    if(red){
                        layer.setStyle({weight: 3,dashArray: '',opacity: 1,color: '#ff7070'});
                        red=false;
                    }else{
                        geojson.resetStyle(layer);
                        red=true;
                    }
                },400);
                setTimeout(function(){
                    clearInterval(blink);
                },3000);
                layer.selected=true;
            }
        });
        map.fitBounds(communityBounds[$(this).val()]);
    });
    function gridBtnClose(){//网格开关关闭
        gridBtn.addClass('off');
        gridBtn.find('span').animate({left:'0'},"fast");
        gridHere=false;
        geoSotGeoJson && geoSotGeoJson.clearLayers();
    }
    // 删除按钮
    deleteShape.on('click',function(){
        drawnItems.clearLayers();
        clearAllData();
    });
    $('.layerManage .result-selected').removeClass('result-selected');
    layerManage.change(function(){
        var value = layerManage.val();
        var index = layerManage.find('[value='+value+']').index();
        // $('.layerManage .result-selected').removeClass('result-selected');
        // $($('.layerManage .chzn-results li')[index-1]).addClass('result-selected');
        window.open(index == 1 ? '/distribute/monitor' :
                        index == 2 ? '/distribute/fireplug' :
                                     '/distribute/furnace');
    });
    var leftModal = $('.left-modal');
    leftModal.on('click', 'li', function () {
        var index = $(this).index();
        var eventid = $(this).attr('eventid');
        var layers = allMarkerLayers._layers ? allMarkerLayers : allMarkerLayersNormal;
        layers.eachLayer(function(layer) {
            if (layer.id == eventid) {
                var zoom = map.getZoom() < 18 ? 18 : map.getZoom();
                map.setView(layer.getLatLng(),zoom);
                highlightIcon(layer,'bounce');
                setTimeout(function () {
                    layer.bounce({duration: 500, height: 20});
                }, 500);
                return;
            }
        });
    });
    // 搜索匹配结果
    searchInput.on('input',function () {
        resultList.empty();
        resultList.slideDown();
        if (searchInput.val().trim() == '') {
            return;
            resultList.slideUp();
        }
        $.ajax({
            type: 'post',
            url: '/blz/getBuildFuzzy.do',
            data: {buildFuzzy: $(this).val().trim()},
            dataType: 'json',
            success: function (data){
                if(data.code == 0){
                    data.data.forEach(function (v,i){
                        resultList.append('<li>'+v+'</li>');
                    });
                }else {
                    layer.alert("查询失败，请重试！");
                }
            },
            error: function () {
                layer.alert("查询失败，请重试！");             
            }
        });
    });
    // 点击列表查询详情
    resultList.on('click','li',function () {
        var value = $(this).html();
        searchInput.val(value);
        searchBuildResult(value);
    });
    $("#search").click(function(){
        searchBuildResult(searchInput.val());
    });
    function searchBuildResult(value){
        resultList.slideUp();
        drawnItems.clearLayers();
        allMarkerLayers&&allMarkerLayers.clearLayers();
        allMarkerLayersNormal&&allMarkerLayersNormal.clearLayers();
        buildingMarker=[];
        informationMarker&&map.removeLayer(informationMarker);
        buildingList.empty();
        drawnItems.clearLayers();
        $(".toggle-modal").hide();
        $.ajax({
            type: 'post',
            url: '/blz/getBuildFromName.do',
            data: {name: value},
            dataType: 'json',
            success: function (data){
                if(data.code == 0){
                    if(data.data.length == 0){
                        layer.msg("没有查询到数据");
                    }else buildMarkerOnMap(data.data);
                }else {
                    layer.alert("查询失败，请重试！");
                }
            },
            error: function () {
                layer.alert("查询失败，请重试！");                    
            }
        });
    }

    $(".toggle-modal").on('mouseover',function (){
        if ($(".toggle-modal span").html() == '0') return;
        $(".toggle-modal").hide();
        leftModal.slideDown(300);
    });
    leftModal.hover(function(){},function(e){
        $(".toggle-modal").show();
        leftModal.slideUp(300);
    });
    
    // 关闭信息框
    $("#map").on('click','.info-close',function(){
        informationMarker&&map.removeLayer(informationMarker);
    });
    /********* 社区边界 ********/
    var geojson;
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
    function highlightCommunity(e) {
        // if(!warning&&!gridHere&&!shapeHere&&communitySituation){
            mapBox.css("cursor","pointer");
            var layer = e.target;
            // var li = communityInformation.find("li");
            // var h4 = communityInformation.find("h4");
            var num = 0,num2 = 0;
            for(var pro in layer.feature.properties){
                if(num>1){
                    // li.eq(num2).find("span").html(layer.feature.properties[pro]);
                    num2++;
                }
                num++;
            }
            var point = map.latLngToContainerPoint([e.latlng.lat,e.latlng.lng]);
            // h4.html("当前社区："+layer.name);
            if(!layer.selected){
                layer.setStyle({weight: 2,color: '#FF7070'});
            }
            // communityInformation.show();
            // communityInformation.css({"top":point.y+10+"px","left":point.x+10+"px"});
        // }
    }
    function resetCommunity(e) {
        mapBox.css("cursor","grab");
        mapBox.css("cursor","-webkit-grab");
        var layer = e.target;
        // communityInformation.hide();
        if(!layer.selected){geojson.resetStyle(layer);}
    }
    function zoomToFeature(e) {
        var layer = e.target;
        var chartParams={
            chart: "LINESTRING",		//PIE:饼图；LINESTRING折线图
            commId: this.id				//社区ID，存在此键值对视为点击社区查询
        };
        var communityBoundsParams={
            commId: this.id
        };
        this.selected=true;
        this.setStyle({weight: 3,dashArray: '',opacity: 1,color: '#ff7070'});
        drawnItems.clearLayers();
        shapeHere=false;
        $('#community_chzn').find('span').text(layer.name.slice(0,-2));
        geojson.eachLayer(function(layer){
            geojson.resetStyle(layer);
            layer.selected=false;
        });
        resize();
        map.fitBounds(layer.getBounds());
        $.ajax({
            type: "POST",
            url: "/blz/getCommBuild.do",
            //data: {id:01},
            data: {commCode: layer.commCode},
            dataType:'json',
            async:false,
            success: function (data) {
                buildMarkerOnMap(data.data);
            },
            error: function () {
                console.log("error");
            }
        });
    }
    function communityOnEachFeature(feature, layer) {
        layer.id = feature.properties.id;
        layer.name = feature.properties.name;
        layer.on({
            mousemove: highlightCommunity,
            mouseout: resetCommunity,
            click: zoomToFeature
        });
        communityBounds.push(layer.getBounds());
    }
    //获取社区编码
    $.ajax({
        type: "get",
        url: "/blz/getCommCode.do",
        dataType: "json",
        success: function(data) {
            if(data.code == 0){
                var commCode = data.data;
                for(var i=0;i<commCode.length;i++) {
                    geojson.eachLayer(function (layer) {
                        layer.name == commCode[i].name && (layer.commCode = commCode[i].code)
                    });
                }
            }else layer.alert("请求出错，请稍后重试！")
        },
        error: function () {
            layer.alert("请求出错，请稍后重试！")
        }
    });
    geojson = L.geoJson(statesData, {
        style: communityStyle,
        onEachFeature: communityOnEachFeature
    }).addTo(map);
    geojson.eachLayer(function(layer){
        communityNameIcon.options.html=layer.name.slice(0,-2);
        var name= L.marker(communityBounds[layer.feature.id].getCenter(),{icon:communityNameIcon}).addTo(map);
        communityName.push(name);
    });
    nameOpen=true;

    /***************绘制geosot网格***************/
    var geoSotGeoJson;//定义网格层对象
    var GeoDataInt;
    function getColor(d) {//图例颜色
        return d > 1000 ? '#ed1e02' :
            d > 900  ? '#ef5704' :
                d > 800 ? '#ef8904' :
                    d > 700   ? '#efc004' :
                        d > 600 ? '#efec04' :
                            d > 500  ? '#dff977' :
                                d > 300 ? '#deef98' :
                                    d > 100   ? '#eaefd2' :
                                        '#99efa4';
    }
    function resetStyle(geojson){
        geojson.eachLayer(function(layer){
            geojson.resetStyle(layer);
        });
    }
    function clearAllData(){//清除地图上的数据
        allMarkerLayers&&allMarkerLayers.clearLayers();
        allMarkerLayersNormal&&allMarkerLayersNormal.clearLayers();
        buildingMarker=[];
        informationMarker&&map.removeLayer(informationMarker);
        buildingList.empty();
        searchInput.val("");
        drawnItems.clearLayers();
        $(".toggle-modal").hide();
        leftModal.hide();
    }
    function drawGeoSotGrid(zoomLevel){//绘制网格
        resetStyle(geojson);//社区范围样式还原
        clearAllData();//清空数据
        if(map.hasLayer(geoSotGeoJson)){//如果地图上有网格，那么先把他移除
            map.removeLayer(geoSotGeoJson);
        }
        if(GeoDataInt){
            clearInterval(GeoDataInt);
        }
        var gridLayer = zoomLevel?zoomLevel:map.getZoom();
        var obj = {
            locale: "zh_CN",
            SIID: "100,at",
            params: {
                gridLayer: gridLayer
            }
        };
        $.ajax({
            type: "POST",
            url: "/blz/getGrid.do",
            //data: JSON.stringify(obj),
            data: {layer: gridLayer},
            dataType:'json',
            success: function (data) {
                drawRectangle(data.data);
            },
            error: function () {
                layer.alert("请求出错，请稍后重试！")
            }
        });
        function drawRectangle(geoSotRectangle){
            var GeoDataArr = [];
            var count = 0;
            var len = geoSotRectangle.length;
            if(len<10000){
                while(count < len){
                    var GeoData = {"type": "FeatureCollection", "features":[]};//定义网格数据
                    for(var i = 0; i <1000 && count < len; i++){//整理网格数据
                        var GeoRangeObject = geoSotRectangle[count];
                        var geosotCode=GeoRangeObject.geosotCode;
                        var density=parseInt(geosotCode.substr(geosotCode.length-3));
                        var GeoRange = [[
                            [GeoRangeObject.minLon,GeoRangeObject.minLat],
                            [GeoRangeObject.maxLon,GeoRangeObject.minLat],
                            [GeoRangeObject.maxLon,GeoRangeObject.maxLat],
                            [GeoRangeObject.minLon,GeoRangeObject.maxLat]
                        ]];
                        var feature = {
                            "type": "Feature",
                            "properties": {
                                "density":density,
                                "geosotCode": geosotCode
                            },
                            "geometry": {
                                "type": "Polygon",
                                "coordinates": []
                            }
                        };
                        feature.geometry.coordinates=GeoRange;
                        GeoData.features[i] = feature;
                        count++;
                    }
                    GeoDataArr.push(GeoData);

                }
                function gridStyle(feature) {
                    return {
                        weight: warning?0:0.5,
                        opacity: 1,
                        color: '#038b63',
                        dashArray: '',
                        fillOpacity: warning?0.6:0,
                        fillColor: getColor(feature.properties.density)
                    };
                }
                function highlightGrid(e) {//点击每个网格网格高亮显示函数
                    if(!warning){
                        var elayer = e.target;
                        var chartParams={
                            layer: gridLayer,
                            chart: "LINESTRING",
                            geosotCodes: elayer.geosotCode
                        };
                        var pointParams={
                            layer: gridLayer,
                            geosotCodes: elayer.geosotCode
                        };
                        elayer.selected = true;
                        geoSotGeoJson.eachLayer(function(layer){
                            geoSotGeoJson.resetStyle(layer);
                        });
                        elayer.setStyle({
                            weight: 1,
                            color: '#fcff00',
                            fillOpacity: 0.1
                        });
                        var coordinates = elayer.feature.geometry.coordinates;
                        coordinates[0].push(coordinates[0][0]);
                        var result = coordinates[0].join(";");
                        allMarkerLayers&&allMarkerLayers.clearLayers();
                        allMarkerLayersNormal&&allMarkerLayersNormal.clearLayers();
                        $.ajax({
                            type: 'post',
                            url: '/blz/getGridInfoOfHomePage.do',
                            data: {code:elayer.geosotCode,layer:$('.grid-tool-text').html()},
                            dataType: 'json',
                            success: function (data){
                                buildMarkerOnMap(JSON.parse(data.data.buildings)||[]);
                            },
                            error: function () {
                                layer.alert("请求出错，请稍后重试！")
                            }
                        });
                        if (!L.Browser.ie && !L.Browser.opera) {
                            elayer.bringToFront();
                        }
                    }
                }
                function showPopup(e){//显示网格码
                    //console.log(warning, e.target)
                    if(!warning){
                        var layer = e.target;
                        var point = map.latLngToContainerPoint([e.latlng.lat,e.latlng.lng]);
                        layer.setStyle({fillColor:'#3fbaf7', fillOpacity: 0.1});
                        geoSOTCode.show();
                        geoSOTCode.css({"top":point.y+10+"px","left":point.x+10+"px"});
                        geoSOTCode.html("网格编码："+layer.geosotCode.toString());
                        if (!L.Browser.ie && !L.Browser.opera) {
                            layer.bringToFront();
                        }
                    }
                }
                function hidePopup(e){//隐藏网格码
                    if(!warning){
                        var layer = e.target;
                        geoSOTCode.hide();
                        if(!layer.selected){
                            geoSotGeoJson.resetStyle(layer);
                        }
                    }
                }
                function gridOnEachFeature(feature, layer) {//每个网格添加事件
                    layer.geosotCode = feature.properties.geosotCode;
                    layer.on({
                        click: highlightGrid,
                        mousemove: showPopup,
                        mouseout:hidePopup
                    });
                }
                geoSotGeoJson = L.geoJson(GeoDataArr[0], {//把网格加到地图上
                    style: gridStyle,
                    onEachFeature: gridOnEachFeature
                }).addTo(map);
                geoSotGeoJson.bringToFront();

                var addDataCount = 1;
                GeoDataInt = setInterval(function(){
                    if(addDataCount < GeoDataArr.length){
                        geoSotGeoJson.addData(GeoDataArr[addDataCount]);
                        addDataCount++;
                    }else{
                        clearInterval(GeoDataInt);
                    }
                },100);

            }else {
                layer.alert('网格量过大，请您减少层级。。。');
                return false;
            }
        }
    }
    var zoomOut = $('.grid-tool-out');
    var zoomIn = $('.grid-tool-in');
    var zoomText = $('.grid-tool-text');
    var zoomBefore= $('.grid-tool-before');
    var zoomBar= $('.grid-tool-bar');
    var zoomAxle= $('.grid-tool-axle');
    var axleWidth = zoomAxle.width();
    var stepWidth = axleWidth/22;
    function changePosition(value){
        var distance=value*stepWidth+"px";
        zoomBar.css("left",distance);
        zoomBefore.css("width",distance);
        zoomText.html(value);
        drawGeoSotGrid(value);
    }
    zoomIn.on('click',function(){
        var num = parseInt(zoomText.html());
        if(num<21){
            (gridHere||warning)&&changePosition(num+1);
        }
    });
    zoomOut.on('click',function(){
        var num = parseInt(zoomText.html());
        if(num>17){
            (gridHere||warning)&&changePosition(num-1);
        } 
    });
});