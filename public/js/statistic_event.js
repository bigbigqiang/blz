$(function () {
    /********* 变量定义 ********/
    var content = $("#content");
    var infoContent = $(".infoContent");
    var Container10 = $('#chart10').get(0);
    var Chart10 = echarts.init(Container10);//房产统计
    var Container11 = $('#chart11').get(0);
    var Chart11 = echarts.init(Container11);//房产统计
    var Container2 = $('#chart2').get(0);
    var Chart2 = echarts.init(Container2);//出租率
    var Container3 = $('#chart3').get(0);
    var Chart3 = echarts.init(Container3);//危房统计
    var Container6 = $('#pie1').get(0);
    var Pie1 = echarts.init(Container6);//事件
    var Container7 = $('#pie2').get(0);
    var Pie2 = echarts.init(Container7);//事件
    var Container8 = $('#pie3').get(0);
    var Pie3 = echarts.init(Container8);//事件
    var Container9 = $('#pie4').get(0);
    var Pie4 = echarts.init(Container9);//事件
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
    var communityNameIcon= L.divIcon({//社区名称图标
        className: 'communityNameIcon',
        iconSize: [100, 20],
        iconAnchor: [50, 10]
    });
    var eventIcon1= L.divIcon({//房屋图标
        className: 'event-statistic-icon1',
        html: '<div class="inner-icon"></div>',
        iconSize: [32, 42],
        iconAnchor: [21, 9]
    });
    var eventIcon2= L.divIcon({//房屋图标
        className: 'event-statistic-icon2',
        html: '<div class="inner-icon"></div>',
        iconSize: [32, 42],
        iconAnchor: [21, 9]
    });
    var eventIcon3= L.divIcon({//房屋图标
        className: 'event-statistic-icon3',
        html: '<div class="inner-icon"></div>',
        iconSize: [32, 42],
        iconAnchor: [21, 9]
    });
    var eventIcon4= L.divIcon({//房屋图标
        className: 'event-statistic-icon4',
        html: '<div class="inner-icon"></div>',
        iconSize: [32, 42],
        iconAnchor: [21, 9]
    });
    var informationIcon = L.divIcon({
        class: 'info-detail-box',
        iconSize: [290, ''],
        iconAnchor: [-15,-15]
    });
    var informationMarker;
    var shapeHere = false;
    var gridHere = false;
    var deleteShape =$('.deleteShape');//draw删除按钮
    var warningList = $(".warning-list");//四色预警
    var classifyList = $(".classify-list");// 事件大类
    var beginDate = $("#beginDate");// 查询开始时间
    var endDate = $("#endDate");// 查询结束时间
    var DATA;//请求到的事件数据
    var information =$('.info-detail-box');//信息框
    var informationList = $('.info-con');//信息框详情列表
    var allMarkerLayers; //图标层
    var comm = $("#comm");
    var status = $("#status");
    var searchBtn = $("#searchBtn");
    var eventList = $("#eventList");
    var splitNum = 2;
    var communityBounds =[L.latLngBounds(L.latLng(39.80743011843621, 116.47191660917477), L.latLng(39.93020273629616, 116.5121319431268))];//社区bounds数组

    /*********** 查询选项 **********/
    var now = new Date();
    var YY = now.getFullYear();
    var MM = parseInt(now.getMonth()) + 1;
    var beginMM, endMM;
    if (MM - 2 > 0) {
        beginMM = (MM - 2 + 100 + '').slice(1)
    } else {
        beginMM = (MM + 10 + 100 + '').slice(1);
        YY = YY - 1;
    }
    endMM = (MM + 100 + '').slice(1);
    beginDate.val(YY + '-' + beginMM);
    beginDate.val('2016-01');
    endDate.val(YY + '-' + endMM);
    beginDate.simpleCanleder();
    endDate.simpleCanleder();
    $(".legend").on('click','li',function () {
        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
        } else {
            $(this).addClass('active');
        }
        allMarkerLayers&&allMarkerLayers.clearLayers();
        informationMarker&&map.removeLayer(informationMarker);
        buildMarkerOnMap();
    });
    searchBtn.on('click', function () {
        var commCode = null;
        var text = comm.find('option:selected').text() + '社区';
        geojson.eachLayer(function(layer){
            if(layer.name ==text){
                commCode = layer.commCode;
                return;
            }
        });
        // getEvents(commCode,status.val(),beginDate.val(),endDate.val());
        if (commCode) getImportant(commCode,beginDate.val(),endDate.val());
        else getMost(commCode,beginDate.val(),endDate.val());
    });

    /********* window resize ********/
    $(".chzn-select").chosen();
    function resize () {
        var H = window.innerHeight;
        content.css("height", H - 130 + "px");
        var h = parseInt(infoContent.parent().css("height"));
        infoContent.css("height",h - 40 + "px");
        Chart10.resize();
        Chart11.resize();
        Chart2.resize();
        Chart3.resize();
        Pie1.resize();
        Pie2.resize();
        Pie3.resize();
        Pie4.resize();
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

    /****** draw控件 *******/
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
        var elayer = e.layer;
        drawnItems.addLayer(elayer);
        elayer.on('click', function () {
            drawnItems.setStyle({color: '#f06eaa'});
            this.setStyle({color: '#f7370b'});
            var geoJson = this.toGeoJSON();
            var bounds='';
            for(var i=0;i<geoJson.geometry.coordinates[0].length;i++){
                bounds+=geoJson.geometry.coordinates[0][i].toString()+';'
            }
            bounds=bounds.slice(0,bounds.length-1);
            /*communityParams.bounds = bounds;*/
            $.ajax({
                type: 'post',
                url: '/blz/getPolygonCloudEvents.do',
                data: {
                    bounds:bounds,
                    status: status.val(),
                    startMouth: beginDate.val(),
                    endMouth: endDate.val()
                },
                dataType: 'json',
                success: function (data){
                    console.log(data.data);
                    DATA = data.data;
                    buildMarkerOnMap();
                },
                error: function () {
                    layer.alert("请求出错，请稍后重试！")
                }
            });
        });
        if(gridHere&&e.layerType=="rectangle"){
            var bounds = elayer.getBounds();
            var geosotCodes='';
            geoSotGeoJson.eachLayer(function(layer){
                var layerBounds = elayer.getBounds();
                if(layerBounds.intersects(bounds)){
                    elayer.setStyle({color: '#fcff00'});
                    elayer.selected=true;
                    geosotCodes+=elayer.geosotCode+',';
                }else if(layerBounds.contains(bounds)){
                    elayer.setStyle({color: '#fcff00'});
                    elayer.selected=true;
                    geosotCodes+=elayer.geosotCode+',';
                }else if(layerBounds.equals(bounds)){
                    elayer.setStyle({color: '#fcff00'});
                    elayer.selected=true;
                    geosotCodes+=elayer.geosotCode+',';
                }
            });
            geosotCodes=geosotCodes.slice(0,geosotCodes.length-1);
            var level = $(".grid-tool-text").html();
            var pointParams={
                layer: level,
                geosotCodes: geosotCodes
            };
            // gridParams.id=geosotCodes;
            // gridParams.layer=level;
            addPointData(pointParams);
            map.removeLayer(elayer);
        }
        shapeHere=true;
    });
    map.on('draw:drawstart', function (e) {//每画之前触发的事件
        drawnItems.clearLayers();
        gridBtnClose();
        warning=false;
        gridTool.hide();
        clearAllData();
        geoSotGeoJson && geoSotGeoJson.clearLayers();
        geojson.eachLayer(function(layer){
            geojson.resetStyle(layer);
            layer.selected=false;
        });
    });
    map.off('dblclick');

    /********* 图表 ********/
    function barInverseChartOption(xData,yData){//柱状图参数
        var option = {
            color:["#e6b045"],
            /*tooltip:{
                trigger:'axis'
            },*/
            calculable:true,
            grid:{
                left:100,
                top:0,
                right: 50,
                bottom: 0,
                borderColor:"#0d1430"
            },
            xAxis:[
                {
                    type:"value",
                    axisLabel:{show:false},
                    splitLine:{show:false},
                    axisLine:{show:false},
                    axisTick:{show:false}
                }

            ],
            yAxis:{
                type:'category',
                axisLine:{
                    show:false
                },
                axisLabel:{
                    textStyle:{color:"#262b2e"},
                    interval: 0,
                },
                axisTick:{show:false},
                splitLine:{show:false},
                data:xData
            },
            series :[
                {
                    name:"社区统计",
                    type:'bar',
                    barWidth:10,
                    label:{
                        normal:{
                            show: true,
                            position: 'right',
                            formatter: '{c}',
                            textStyle: {
                                color: '#262b2e'
                            }
                        }
                    },
                    data:yData
                }
            ]

        };
        return option;
    }
    function barChartOption (xData, yData, color) {
        var data = [];
        yData.forEach(function (v,i) {
            data.push({
                value: yData[i],
                itemStyle: {
                    normal: {
                        color: color[i]
                    }
                }
            });
        });
        var option = {
            tooltip:{
                trigger:'axis'
            },
            grid:{
                left:50,
                top:40,
                right: 10,
                bottom: 35,
                borderColor:"#0d1430"
            },
            xAxis:{
                type:'category',
                axisLine:{
                    show:false
                },
                axisLabel:{
                    textStyle:{color:"#262b2e", fontSize: 14},
                    interval: 0,
                    formatter: function(v){
                        if (v.length > 4) {
                            return v.slice(0,3) + '\n' + v.slice(3);
                        } else {
                            return v;
                        }
                    }
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
                name:"单位 (件)",
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
            },
            series :[
                {
                    name:"数值",
                    type:'bar',
                    barWidth:14,
                    data:data
                }
            ]

        };
        return option;
    }
    function pieChartOption(total,foreign,color){//饼图参数
        var data = [{
            value:foreign,label: {
                normal: {
                    show: true,
                    position: 'center',
                    formatter: function(){
                        return (foreign/total*100).toFixed(0) + "%";
                    },
                    textStyle: {
                        color: "#262b2e",
                        fontSize: 20
                    }
                }
            }
        },{
            value: total-foreign,
            label: {
                normal: {show: false}
            },
            itemStyle: {
                emphasis: {
                    color: '#e5e5e5'
                }
            }
        }];
        var option = {
            color:['#e5e5e5',color,'transparent'],
            series:[
                {
                    name:'背景',
                    type:'pie',
                    hoverAnimation: false,
                    radius:['74%','81%'],
                    center:["50%","50%"],
                    data:[total],
                    labelLine: {
                        normal: {show: false}
                    }
                },
                {
                    name:'人口',
                    type:'pie',
                    hoverAnimation: false,
                    radius:['70%','85%'],
                    center:["50%","50%"],
                    data:data,
                    labelLine: {
                        normal: {show: false}
                    }
                }
            ]

        };
        return option;
    }
    
    Chart10.setOption(barInverseChartOption(
        ["远洋天地", "八里庄西里", "八里庄东里", "延静里", "华贸", "红庙北", "红庙"], 
        [0, 0, 0, 0, 0, 0, 0]
    ));
    Chart11.setOption(barInverseChartOption(
        ["罗马嘉园", "甘露园", "甘露园中里", "朝阳无限", "十里堡南里", "十里堡", "城市华庭"], 
        [0, 0, 0, 0, 0, 0, 0]
    ));
    Chart2.setOption(barChartOption(
        ["市容环境", "宣传广告", "施工管理", "突发事件", "界面秩序", "单位"],
        [0, 0, 0, 0, 0, 0],
        ["#008ae6", "#7070ff", "#a64cff", "#24b324", "#ffaa00", "#e64c2e"]
    ));
    Chart3.setOption(barChartOption(
        ["待网格员分配", "待科室/社区分配", "待处理", "待审核", "审核不通过", "待复核", "复核不通过", "已结案"],
        [0, 0, 0, 0, 0, 0, 0, 0],
        ["#00a2fa", "#fadd53", "#5ce65c", "#e66045", "#ffb266"]
    ));
    Pie1.setOption(pieChartOption(10,0,"#ff5c5c"));
    Pie2.setOption(pieChartOption(10,0,"#ff7733"));
    Pie3.setOption(pieChartOption(10,0,"#fdaa29"));
    Pie4.setOption(pieChartOption(10,0,"#32a3fa"));

    /*******请求事件统计数据******/
    getMost(null,beginDate.val(),endDate.val());
    function highlightIcon(e,type){
        e = type == 'bounce' ? e : e.target;
        map.setView(e._latlng);
        var point = map.latLngToContainerPoint([e._latlng.lat,e._latlng.lng]);
        mapBox.css("cursor","pointer");
        informationIcon.options.html = '<i class="blt-large"></i><b class="info-close">×</b><ul class="info-con"><li><img src="'+(/*e.info.photo||*/'../image/photo.jpg')+
        '" alt=""></li><li><label>案件类型：</label><span>'+(e.info.type||'无')+
        '</span></li><li><label>地点：</label><span>'+(e.info.address||'无')+
        '</span></li><li><label>发现时间：</label><span>'+(e.info.shangbaosj||'无')+
        '</span></li><li><label>上报人：</label><span>'+(e.info.jubaor||'无')+
        '</span></li><li><label>状态：</label><span>'+(statusArray[e.info.zhuangtai]||'无')+
        '</span></li><li><label>截止时间：</label><span>'+(e.info.jiezhisj||'无')+
        '</span></li><li><label>负责科室：</label><span>'+(e.info.zerenks||'无')+
        '</span></li><li><label>紧迫性：</label><span>'+(colorArr[e.info.zhongyaox]||'无')+
        '</span></li><li><label>事件描述：</label><span>'+(e.info.miaoshu||'无')+
        '</span></li></ul>';
        informationMarker&&map.removeLayer(informationMarker);
        informationMarker = L.marker(e._latlng,{icon: informationIcon}).addTo(map);
    }
    var classifyArray = ["市容环境", "宣传广告", "施工管理", "突发事件", "街面秩序", "单位"];
    // var classifyArray = ["0101", "0102", "0103", "0104", "0105", "0106"];
    var eventIconArray = [eventIcon1, eventIcon2, eventIcon3, eventIcon4];
    var classifyClassArray = ['event-type1', 'event-type2', 'event-type3', 'event-type4', 'event-type5', 'event-type6'];
    var statusArray = [0, "待网格员分配", "待科室/社区分配", "待处理", "待审核", "审核不通过", "待复核", "复核不通过", "已结案"];
    var colorArr = [0,'红','橙','黄','蓝'];
    var xileiObj = {};
    function buildMarkerOnMap(first){
        allMarkerLayers&&allMarkerLayers.clearLayers();
        informationMarker&&map.removeLayer(informationMarker);
        eventList.empty();
        var arr1 = [],arr2 = [];
        var allMarkers = [];
        warningList.find('.active').each(function (i,v) {
            arr1.push($(v).index());
        });
        classifyList.find('.active').each(function (i,v) {
            arr2.push($(v).index());
        });
        eventList.empty();
        leftModal.mCustomScrollbar('destroy');
        var redNum = 0, orangeNum = 0, yellowNum = 0, blueNum = 0;
        for(var i=0;i<DATA.length;i++){
            if(DATA[i].lat&&DATA[i].lng){
                for(var j=0;j<arr1.length;j++){
                    var importantType = DATA[i].zhongyaox;
                    if (importantType == arr1[j] + 1 + ''){
                        for(var k=0;k<arr2.length;k++){
                            if (DATA[i].type == classifyArray[arr2[k]]){
                                var icon = eventIconArray[arr1[j]];
                                icon.options.html = '<div class="inner-icon '+classifyClassArray[arr2[k]]+'"></div>';
                                var marker = L.marker([DATA[i].lat, DATA[i].lng],{icon:icon}).addTo(map);
                                // var gcj = coordtransform.wgs84togcj02(DATA[i].lng,DATA[i].lat);
                                // var bd = coordtransform.gcj02tobd09(gcj[0],gcj[1]);
                                // var marker = L.marker([bd[1], bd[0]],{icon:icon}).addTo(map);
                                marker.id=DATA[i].id;
                                marker.type=DATA[i].type;
                                marker.info=DATA[i];
                                marker.on('click',highlightIcon);
                                allMarkers.push(marker);
                                eventList.append("<li eventid="+DATA[i].id+"><p class='title'>小类:"+(DATA[i].xilei||DATA[i].xiaolei)+"</p><p>上报时间:"+DATA[i].shangbaosj+"</p><p>状态:"+statusArray[DATA[i].zhuangtai]+"</p></li>");
                                importantType == 1 ? redNum += 1 : importantType == 2 ? orangeNum += 1 : importantType == 3 ? yellowNum += 1 : blueNum += 1;
                            }
                        }
                    }
                }
            }
        }
        if (first) {
            $('.legend-type').find('li:first-child label').html(redNum);
            $('.legend-type').find('li:nth-child(2) label').html(orangeNum);
            $('.legend-type').find('li:nth-child(3) label').html(yellowNum);
            $('.legend-type').find('li:nth-child(4) label').html(blueNum);
        }
        leftModal.mCustomScrollbar();
        allMarkerLayers=L.featureGroup(allMarkers).addTo(map);
        $(".toggle-modal").show();
        $(".toggle-modal span").html(eventList.children().length);
    } 

    //获取整个街道所有统计
    function getMost (commCode, startMouth, endMouth) {
        $('.commChart').show();
        $('.pieBox').hide();
        $.ajax({//社区统计
            type: 'get',
            url: '/blz/getCloudEventsNumOfCommunity.do',
            dataType: 'json',
            data: {commCode: commCode,startMouth:startMouth,endMouth:endMouth},
            success: function (data) {
                getStatisticData(null,startMouth,endMouth);
                if (data.code == 0){
                    var data1 = [],data2 = [],xData1 = [],xData2 = [],i=0;
                    for(var k in data.data) {
                        if(i<7) {
                            xData1.push(commArray[k]);
                            data1.push(data.data[k]);
                        } else {
                            xData2.push(commArray[k]);
                            data2.push(data.data[k]);
                        }
                        i++;
                    }
                    Chart10.setOption(barInverseChartOption(
                        xData1, 
                        data1
                    ));
                    Chart11.setOption(barInverseChartOption(
                        xData2, 
                        data2
                    ));
                    resize();
                }else {
                    layer.alert('获取统计信息失败，请稍后重试！');
                }
            },
            error: function () {
                layer.alert('请求出错，请稍后重试！');
            }
        });
    }
    //获取单个社区所有统计
    function getImportant(commCode, startMouth, endMouth) {
        $('.commChart').hide();
        $('.pieBox').show();
        $.ajax({
            type: 'get',
            url: '/blz/getCloudEventsNumOfImportant.do',
            dataType: 'json',
            data: {commCode: commCode,startMouth:startMouth,endMouth:endMouth},
            success: function (data) {
                getStatisticData(commCode,beginDate.val(),endDate.val());
                if (data.code == 0){
                    var total = 0;
                    for (var k in data.data) {
                        total += parseInt(data.data[k]);
                    }
                    Pie1.setOption(pieChartOption(total||1,data.data['1']-0||0,"#ff5c5c"));
                    Pie2.setOption(pieChartOption(total||1,data.data['2']-0||0,"#ff7733"));
                    Pie3.setOption(pieChartOption(total||1,data.data['3']-0||0,"#fdaa29"));
                    Pie4.setOption(pieChartOption(total||1,data.data['4']-0||0,"#32a3fa"));
                    $('.pieText').each(function (i,v){
                        v.innerHTML = data.data[i+1+''];
                    });
                    resize();
                }else {
                    layer.alert('获取统计信息失败，请稍后重试！');
                }
            },
            error: function () {
                layer.alert('请求出错，请稍后重试！');
            }
        });
    }
    //获取下面两个柱状图统计
    function getStatisticData(commCode, startMouth, endMouth) {
        $.ajax({//类型统计
            type: 'get',
            url: '/blz/getCloudEventsNumOfType.do',
            dataType: 'json',
            data: {commCode:commCode,startMouth:startMouth,endMouth:endMouth},
            success: function (data) {
                if (data.code == 0){
                    var result = data.data;
                    Chart2.setOption(barChartOption(
                        ["市容环境", "宣传广告", "施工管理", "突发事件", "界面秩序", "单位"],
                        [result['0101']||0,result['0102']||0,result['0103']||0,result['0104']||0,result['0105']||0,result['0106']||0],
                        ["#008ae6", "#7070ff", "#a64cff", "#24b324", "#ffaa00", "#e64c2e"]
                    ));
                    $.ajax({//状态统计
                        type: 'get',
                        url: '/blz/getCloudEventsNumOfStatus.do',
                        dataType: 'json',
                        data: {commCode:commCode,startMouth:startMouth,endMouth:endMouth},
                        success: function (data) {
                            getEvents(commCode,status.val(),startMouth,endMouth);
                            if (data.code == 0){
                                var data1 = [];
                                for(var k in data.data) {
                                    data1.push(data.data[k]);
                                }
                                Chart3.setOption(barChartOption(
                                    ["待网格员分配", "待科室/社区分配", "待处理", "待审核", "审核不通过", "待复核", "复核不通过", "已结案"],
                                    data1,
                                    ["#00a2fa", "#fadd53", "#5ce65c", "#e66045", "#ffb266"]
                                ));
                            }else {
                                layer.alert('获取统计信息失败，请稍后重试！');
                            }
                        },
                        error: function () {
                            layer.alert('请求出错，请稍后重试！');
                        }
                    });
                }else {
                    layer.alert('获取统计信息失败，请稍后重试！');
                }
            },
            error: function () {
                layer.alert('请求出错，请稍后重试！');
            }
        });
    }
    //获取所有事件位置信息
    function getEvents(commCode,status,startMouth,endMouth){
        var params = commCode ? {commCode:commCode,status:status,startMouth:startMouth,endMouth:endMouth}
            : {status:status,startMouth:startMouth,endMouth:endMouth};
        $('#loading').show();
        $.ajax({//获取所有事件
            type: 'post',
            url: '/blz/getCloudEvents.do',
            dataType: 'json',
            data: params,
            success: function (data) {
                $('#loading').hide();
                if (data.code == 0){
                    DATA = data.data;
                    buildMarkerOnMap(true);
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
    var leftModal = $('.left-modal');
    leftModal.on('click', 'li', function () {
        var index = $(this).index();
        var eventid = $(this).attr('eventid');
        allMarkerLayers.eachLayer(function(layer) {
            if (layer.id == eventid) {
                var zoom = map.getZoom() < 15 ? 15 : map.getZoom();
                map.setView(layer.getLatLng(),map.getZoom());
                highlightIcon(layer,'bounce');
                setTimeout(function () {
                    layer.bounce({duration: 500, height: 20});
                }, 500);
                return;
            }
        });
    });
    function gridBtnClose(){//网格开关关闭
        gridBtn.addClass('off');
        gridBtn.find('span').animate({left:'0'},"fast");
        gridHere=false;
    }
    deleteShape.on('click',function(e){
        e.stopPropagation();
        drawnItems.clearLayers();
        clearAllData();
    });
    gridBtn.on('click',function(){
        // clearAllData();
        if(!gridHere){//如果是关着的，那么开
            // popClass.css({'background-color':'#3D8A71'});
            // $(".leaflet-draw-draw-polygon").hide();
            // deleteShape.hide();
            drawnItems.clearLayers();
            shapeHere=false;
            changePosition(18);
            gridHere=true;
            warning=false;
            // marginal.hide();
        }else{//如果是开着的，那么关
            $(".leaflet-draw-draw-polygon").show();
            deleteShape.show();
            map.removeLayer(geoSotGeoJson);
            // hideTimeLine();
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
    $('.layerManage .result-selected').removeClass('result-selected');
    layerManage.change(function(){
        var value = layerManage.val();
        var index = layerManage.find('[value='+value+']').index();
        // $('.layerManage .result-selected').removeClass('result-selected');
        // $($('.layerManage .chzn-results li')[index-1]).addClass('result-selected');
        location.href = index == 0 ? '/distribute/monitor' :
                        index == 1 ? '/distribute/fireplug' :
                                     '/distribute/furnace';
    });

    $(".toggle-modal").on('mouseover',function (){
        if ($(".toggle-modal span").html() == '0') return;
        leftModal.slideDown(300);
        $(".toggle-modal").hide();
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
        getImportant(layer.commCode, beginDate.val(), endDate.val());
        allMarkerLayers&&allMarkerLayers.clearLayers();
        informationMarker&&map.removeLayer(informationMarker);
        drawnItems.clearLayers();
        $('#community_chzn').find('span').text(layer.name.slice(0,-2));
        map.fitBounds(layer.getBounds());
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
    var commArray = {};
    //获取社区编码
    $.ajax({
        type: "get",
        url: "/blz/getCommCode.do",
        dataType: "json",
        success: function(data) {
            if(data.code == 0){
                var commCode = data.data;
                commArray = {};
                for(var i=0;i<commCode.length;i++) {
                    geojson.eachLayer(function (layer) {
                        layer.name == commCode[i].name && (layer.commCode = commCode[i].code)
                    });
                    commArray[commCode[i].code] = commCode[i].name.slice(0, -2);
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
    var geoSOTCode=$('.geoSOTCode');//鼠标移到网格上出现的网格码div
    function resetStyle(geojson){
        geojson.eachLayer(function(layer){
            geojson.resetStyle(layer);
        });
    }
    function clearAllData(){//清除地图上的数据
        allMarkerLayers&&allMarkerLayers.clearLayers();
        informationMarker&&map.removeLayer(informationMarker);
        drawnItems.clearLayers();
        eventList.empty();
        $('.toggle-modal').hide();
        $('.toggle-modal span').html('');
        $('.legend-type').find('li:first-child label').html('');
        $('.legend-type').find('li:nth-child(2) label').html('');
        $('.legend-type').find('li:nth-child(3) label').html('');
        $('.legend-type').find('li:nth-child(4) label').html('');
        DATA = [];
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
                                        '#99efa4';
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
                        // popClass.css({'background-color':'#3D8A71'});
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
                        // gridParams.id=layer.geosotCode;
                        // gridParams.layer=gridLayer;
                        var coordinates = elayer.feature.geometry.coordinates;
                        coordinates[0].push(coordinates[0][0]);
                        var result = coordinates[0].join(";");
                        allMarkerLayers && allMarkerLayers.clearLayers();
                        $.ajax({
                            type: 'post',
                            url: '/blz/getGridCloudEvents.do',
                            // data: {bounds:result},
                           data: {
                                code: elayer.geosotCode,
                                status: status.val(),
                                startMouth: beginDate.val(),
                                endMouth: endDate.val(),
                                layer: $(".grid-tool-text").html()
                            },
                            dataType: 'json',
                            success: function (data){
                                DATA = data.data;
                                buildMarkerOnMap(data.data);
                            },
                            error: function () {
                                layer.alert("请求出错，请稍后重试！")
                            }
                        });
                        //barChart(chartParams);
                        //addPointData(pointParams);
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