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
    var geoSOTCode=$('.geoSOTCode');//鼠标移到网格上出现的网格码div
    var communityNameIcon= L.divIcon({//社区名称图标
        className: 'communityNameIcon',
        iconSize: [100, 20],
        iconAnchor: [50, 10]
    });
    var peopleIcon= L.divIcon({//房屋图标
        className: 'people-icon',
        iconSize: [32, 38],
        iconAnchor: [16, 19]
    });
    var informationIcon = L.divIcon({
        class: 'info-detail-box',
        iconSize: [290, ''],
        iconAnchor: [-15,-15]
    });
    var informationMarker;
    var heatMapLayer;
    var shapeHere = false;
    var gridHere = false;
    var information =$('.info-detail-box');//信息框
    var informationList = $('.info-con');//信息框详情列表
    var searchInput = $("#search-input");// 搜索框
    var resultList = $(".result-list");// 搜索匹配结果
    var deleteShape = $(".deleteShape");// 删除按钮
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
    var allMarkerLayers;
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
    
    function buildMarkerOnMap(data){//添加各种marker
        clearAllData();
        var peopleMarker = [];
        for(var k=0;k<data.length;k++){
            if(data[k].lat&&data[k].lng){
                var people = L.marker([data[k].lat, data[k].lng],{icon:peopleIcon}).addTo(map);
                people.info=data[k];
                people.on('click',highlightIcon);
                peopleMarker.push(people);
            }
        }
        
        if (peopleMarker.length == 0) {
            layer.msg('无坐标信息');
        }
        allMarkerLayers=L.featureGroup(peopleMarker).addTo(map);
    }
    function highlightIcon(e){
        map.setView(e.latlng);
        // var point = map.latLngToContainerPoint([e.latlng.lat,e.latlng.lng]);
        mapBox.css("cursor","pointer");
        informationIcon.options.html = '<i class="blt-large"></i><b class="info-close">×</b><ul class="info-con"><li><label>姓名：</label><span>'+(this.info.name||'无')+
            '</span></li><li><label>性别：</label><span>'+(this.info.sex||'无')+
            '</span></li><li><label>电话：</label><span>'+(this.info.phone||'无')+
            '</span></li><li><label>住址：</label><span>'+(this.info.address||'无')+
            '</span></li><li><a class="btn" target="_blank" href="/detail/people/'+this.info.id+'">查看详情</a></li></ul>';
        // informationList.html('');
        // $(this._icon).append(information);
        // information.show();
        informationMarker&&map.removeLayer(informationMarker);
        informationMarker = L.marker(e.latlng,{icon: informationIcon}).addTo(map);
    }

    /********* 图表 ********/
    function barChartOption (xData, yData) {
        var option = {
            color:["#74b336", "#f07556", "#f0b904", "#1dbae3"],
            tooltip:{
                trigger:'axis'
            },
            legend: {
                data: ["第一季度", "第二季度", "第三季度", "第四季度"],
                right: 0,
                itemWidth: 10,
                itemHeight: 10,
                borderRadius: 0
            },
            grid:{
                left:50,
                top:40,
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
            yAxis:{
                type:"value",
                name:"单位 (万人)",
                min: 6000,
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
            },
            series :[
                {
                    name:"第一季度",
                    type:'bar',
                    barWidth:14,
                    data:yData[0]
                },
                {
                    name:"第二季度",
                    type:'bar',
                    barWidth:14,
                    data:yData[1]
                },
                {
                    name:"第三季度",
                    type:'bar',
                    barWidth:14,
                    data:yData[2]
                },
                {
                    name:"第四季度",
                    type:'bar',
                    barWidth:14,
                    data:yData[3]
                }
            ]

        };
        return option;
    }
    function lineChartOption (xData, yData) {
        var option = {
            color:["#14cc7c"],
            tooltip:{
                trigger:'axis',
                formatter:'{b}：{c}人'
            },
            calculable:true,
            grid:{
                left:50,
                top:30,
                right: 10,
                bottom: 30,
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
                    name:"单位 (人)",
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
                    name:"人数",
                    type:'bar',
                    barWidth:14,
                    data:yData
                }
            ]

        };
        return option;
    }
    function lineChartOption2 (xData, yData) {
        var option = {
            color:["#ff700a", "#ffbb33"],
            tooltip:{
                trigger:'axis'
            },
            legend: {
                data: ["本地人口", "外来人口"],
                icon: 'circle',
                right: 0,
                itemWidth: 10
            },
            calculable:true,
            grid:{
                left:50,
                top:40,
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
                    name:"单位 (万人)",
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
                    name:"本地人口",
                    type:'line',
                    barWidth:14,
                    data:yData[0]
                },
                {
                    name:"外来人口",
                    type:'line',
                    barWidth:14,
                    data:yData[1]
                }
            ]

        };
        return option;
    }
    
    Chart1.setOption(barChartOption(
        ["", "", "", ""], 
        [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ]
    ));
    Chart2.setOption(lineChartOption(["博士", "硕士", "大学", "高中", "初中"],[0, 0, 0, 0, 0]));
    Chart3.setOption(lineChartOption2(
        ["", "", "", "", ""], 
        [
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0]
        ]
    ));

    Chart1.on('click',function (params) {
        getHeatMapData(params.name, params.seriesIndex+1);
    });
    Chart3.on('click',function (params) {
        getHeatMapData(params.name, params.seriesIndex == 0 ? 'local' : 'outside');
    });
    /*******请求人口统计数据******/
    var heatMapLayer,heatMapData = [];
    $.ajax({//人口总量变化
        type: 'get',
        url: '/blz/getPeopleNumByTimeChange.do',
        dataType: 'json',
        success: function (data) {
            if (data.code == 0){
                var xData = [],yData = [[],[],[],[]];
                for(var k in data.data) {
                    xData.push(k);
                    for (var j=0;j<data.data[k].length;j++){
                        yData[j].push(data.data[k][j]);
                    }
                }
                Chart1.setOption(barChartOption(xData, yData));
            }else {
                layer.alert('获取统计信息失败，请稍后重试！');
            }


            $.ajax({//文化程度统计
                type: 'get',
                url: '/blz/getPeopleNumOfCulture.do',
                dataType: 'json',
                success: function (data) {
                    if (data.code == 0){
                        var xData = [],data1 = [];
                        for(var k in data.data) {
                            xData.push(k);
                            data1.push(data.data[k]);
                        }
                        Chart2.setOption(lineChartOption(xData, data1));
                    }else {
                        layer.alert('获取统计信息失败，请稍后重试！');
                    }

                    $.ajax({//人口数量变化
                        type: 'get',
                        url: '/blz/getPeopleNumByArea.do',
                        dataType: 'json',
                        success: function (data) {
                            if (data.code == 0){
                                var xData = [],yData = [[],[]];
                                for(var k in data.data.local) {
                                    xData.push(k);
                                    yData[0].push(data.data.local[k]);
                                    yData[1].push(data.data.outSider[k]);
                                }
                                Chart3.setOption(lineChartOption2(xData, yData));
                            }else {
                                layer.alert('获取统计信息失败，请稍后重试！');
                            }
                        },
                        error: function () {
                            layer.alert('请求出错，请稍后重试！');
                        }
                    });
                },
                error: function () {
                    layer.alert('请求出错，请稍后重试！');
                }
            });

        },
        error: function () {
            layer.alert('请求出错，请稍后重试！');
        }
    });
    function getHeatMapData(year,type) {
        clearAllData();
        var url = type == 'local' ? 'getLocalByYear' : type == 'outside' ? 'getOutsideByYear' : 'getAllPeopleBySeason';
        $('#loading').show();
        $.ajax({
            type: 'post',
            url: '/blz/'+url+'.do',
            data: {year: year,season:type},
            dataType: 'json',
            success: function (data) {
                $('#loading').hide();
                if (data.code == 0){
                    heatMapLayer && map.removeLayer(heatMapLayer);
                    var localData = [];
                    for(var k=0;k<data.data.length;k++) {
                        // for(var m=0;m<5;m++){
                            data.data[k].lat && localData.push([data.data[k].lat,data.data[k].lng,data.data[k].num/10]);
                        // }
                    }
                    heatMapLayer = L.heatLayer(localData, {radius: 25}).addTo(map);
                }else {
                    layer.alert('获取统计信息失败，请稍后重试！');
                }
            },
            error: function () {
                $('#loading').hide();
                layer.alert('请求出错，请稍后重试！');
            }
        });
    }

    /********* 开关 ********/
    deleteShape.on('click',function(){
        heatMapLayer && map.removeLayer(heatMapLayer);
        allMarkerLayers && allMarkerLayers.clearLayers();
        informationMarker && map.removeLayer(informationMarker);
    });
    gridBtn.on('click',function(){
        // clearAllData();
        if(!gridHere){//如果是关着的，那么开
            changePosition(18);
            gridHere=true;
            warning=false;
        }else{//如果是开着的，那么关
            $(".leaflet-draw-draw-polygon").show();
            gridHere=false;
            map.removeLayer(geoSotGeoJson);
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
    $('.layerManage .result-selected').removeClass('result-selected');
    layerManage.change(function(){
        var value = layerManage.val();
        var index = layerManage.find('[value='+value+']').index();
        // $('.layerManage .result-selected').removeClass('result-selected');
        // $($('.layerManage .chzn-results li')[index-1]).addClass('result-selected');
        window.open(index == 0 ? '/distribute/monitor' :
                        index == 1 ? '/distribute/fireplug' :
                                     '/distribute/furnace');
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
            url: '/blz/getPeopleFuzzy.do',
            data: {peopleFuzzy: $(this).val().trim()},
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
        searchPeopleResult(value);
    });
    $("#search").click(function(){
        searchPeopleResult(searchInput.val());
    });

    function searchPeopleResult(value){
        resultList.slideUp();
        clearAllData();
        $.ajax({
            type: 'post',
            url: '/blz/getPeopleFromName.do',
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
        map.fitBounds(layer.getBounds());
        $('#community_chzn').find('span').text(layer.name.slice(0,-2));
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
    function resetStyle(geojson){
        geojson.eachLayer(function(layer){
            geojson.resetStyle(layer);
        });
    }
    function getColor(d) {//图例颜色
        return d > 1000 ? '#ed1e02' :
            d > 900  ? '#ef5704' :
                d > 800 ? '#ef8904' :
                    d > 700   ? '#efc004' :
                        d > 600 ? '#efec04' :
                            d > 500  ? '#dff977' :
                                d > 300 ? '#deef98' :
                                    d > 100   ? '#eaefd2' :
                                        '#99efa4';}
    function clearAllData(){//清除地图上的数据
        allMarkerLayers&&allMarkerLayers.clearLayers();
        informationMarker&&map.removeLayer(informationMarker);
        heatMapLayer && map.removeLayer(heatMapLayer);
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