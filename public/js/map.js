$(function(){
    /***************************变量定义区begin**********************/
    var left = $('.left');
    var right = $('.right');
    var content = $('.content');
    var mapContent = $('.mapContent');
    var chartBlock = $('.chartBlock');
    var chartContent = $('.chartContent');
    var searchInput = $("#search-input");// 搜索框
    var resultList = $(".result-list");// 搜索匹配结果
    var Container1 = $('#chart1').get(0);
    var Chart1 = echarts.init(Container1);//房屋统计
    var Container2 = $('#chart2').get(0);
    var Chart2 = echarts.init(Container2);//企业统计
    var Container3 = $('#chart_top').get(0);
    var Chart_top = echarts.init(Container3);//人口统计
    var Container4 = $('#chart_pie').get(0);
    var Chart_pie = echarts.init(Container4);//外来人口
    var Container5 = $('#chart3').get(0);
    var Chart3 = echarts.init(Container5);//事件
    var Container6 = $('#pie1').get(0);
    var Pie1 = echarts.init(Container6);//事件
    var Container7 = $('#pie2').get(0);
    var Pie2 = echarts.init(Container7);//事件
    var Container8 = $('#pie3').get(0);
    var Pie3 = echarts.init(Container8);//事件
    var Container9 = $('#pie4').get(0);
    var Pie4 = echarts.init(Container9);//事件
    var buildingDetail = $(".buildingDetail");//建筑相关人口企业信息
    var defaultShow = $(".defaultShow");//默认显示的图表信息
    var buildingUnit = $(".houseTab");//楼层信息单元切换
    var floorTab = $(".floorTab");
    var roomList = $(".roomList");//楼层信息房间列表
    var roomDetail = $(".roomDetail");//楼层信息房间详情
    var cmpList = $(".cmpList tbody");//企业信息表格
    var informationTable = $(".informationTable");
    var mapBox = $('#map');//地图容器
    var timeLineBox = $('.timeLine');//时间轴容器
    var peopleMarker=[];//人口marker数组
    var buildingMarker=[];//建筑marker数组
    var companyMarker=[];//企业marker数组
    var gridBtn = $('.gridBtn');//网格开关
    var annualData = $('#annualData');//时间轴数据统计div
    var gridTool =$('.gridTool');//网格层级控制工具
    var community =$('#community');//社区选择下拉
    var searchType = $('#searchType');//搜索类型下拉
    var buildingBtn =$('.buildingBtn');//建筑开关
    var companyBtn =$('.companyBtn');//企业开关
    var warningBtn =$('.warningBtn');//人口预警开关
    var peopleBtn =$('.peopleBtn');//人口开关
    var nameBtn =$('.nameBtn');//社区名称开关
    var communityBtn =$('.communityBtn');//社区基本概况开关
    var deleteShape =$('.deleteShape');//draw删除按钮
    var popClass =$('.likeRadio');//社区人口类型
    var geoSOTCode=$('.geoSOTCode');//鼠标移到网格上出现的网格码div
    var communityInformation=$('.communityInformation');//鼠标移到社区上出现的网格码div
    var buildingMarkerHere = true;//建筑数据是否在
    var companyMarkerHere = true;//企业数据是否在
    var peopleMarkerHere = true;//人口数据是否在
    var warning = false;//人口预警是否开启
    var nameOpen = false;//社区名称是否打开
    var popClassClicked =false;//人口类型是否点击了
    var communitySituation = true;
    var gridParams = {};//网格查询参数
    var communityParams = {};//社区查询参数
    var shapeParams = {};//多边形查询参数
    var communityName=[];//社区名称
    var buildingIcon = L.divIcon({//建筑图标
        className: 'building-select-icon',
        iconSize: [22, 22],
        iconAnchor: [11, 11]
    });
    var buildingsIcon = L.divIcon({//建筑搜索图标
        className: 'building-icon',
        iconSize: [30, 40],
        iconAnchor: [15, 16]
    });
    var companyIcon = L.divIcon({//企业搜索图标
        className: 'company-icon',
        iconSize: [30, 40],
        iconAnchor: [13, 19]
    });
    var peopleIcon = L.divIcon({//人口搜索图标
        className: 'people-icon',
        iconSize: [30, 40],
        iconAnchor: [13, 19]
    });

    
    var monitorIcon= L.divIcon({//监控探头
        className: 'monitor-icon',
        iconSize: [32, 32],
        iconAnchor: [16, 16]
    });
    var fireplugIcon= L.divIcon({//消防栓
        className: 'fireplug-icon',
        iconSize: [32, 32],
        iconAnchor: [16, 16]
    });

    var communityNameIcon= L.divIcon({//社区名称图标
        className: 'communityNameIcon',
        iconSize: [100, 20],
        iconAnchor: [50, 10]
    });
    var informationIcon = L.divIcon({
        class: 'info-detail-box',
        iconSize: [300, ''],
        iconAnchor: [-15,-15]
    });
    var informationMarker;

    var information =$('.info-detail-box');//信息框
    var informationList = $('.info-con');//信息框详情列表
    var closeBtn = $('.closeBtn');//关闭按钮
    var adBtn = $('.adBtn');//介绍页面按钮
    var Options = $('.Options:even').css('background','rgba(1,236,255,0.1)');//信息栏每条数据样式
    var shapeHere = false;
    var gridHere = false;
    var splitNum = 1;
    var communityBounds =[L.latLngBounds(L.latLng(39.80743011843621, 116.47191660917477), L.latLng(39.93020273629616, 116.5121319431268))];//社区bounds数组

    /***************************变量定义区end**********************/
    if(!window.sessionStorage.getItem('isIn')){
        window.sessionStorage.setItem('isIn','yes');
    }
    resize();//初始化宽度高度
    $(window).resize(resize);//窗口缩放
    $(".chzn-select").chosen({allow_single_deselect: false});
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

    /***************************地图定义区end**********************/

    /***************************函数定义区begin**********************/

    var allMarkerLayers;            //所有数据（人口，建筑，企业）
    var monitorMarkerLayers;            //
    var fireplugMarkerLayers;            //
    var timeLineVisible=false;      //时间轴是否显示
    function dataCount(){           //统计数据
        annualData.show();
        var companyCount = companyMarker.length;
        var buildingCount = buildingMarker.length;
        var peopleCount=0;
        for(var i=0;i<peopleMarker.length;i++){
            peopleCount+=peopleMarker[i].personCount;
        }
        $('.peopleCount').html(peopleCount+'个');
        $('.companyCount').html(companyCount+'个');
        $('.buildingCount').html(buildingCount+'个');
        return "企业总数："+companyCount+";建筑总数："+buildingCount+";人口总数："+peopleCount;
    }

    function hideTimeLine(){//时间轴隐藏
        if(timeLineVisible){
            timeLine.stop();
            timeLine.resetPosition();
            var mapHeight = mapBox.height();
            var h=mapHeight+49+'px';
            mapBox.animate({'height':h});
            annualData.hide();
            timeLineBox.slideUp();
            timeLineVisible=false;
        }
    }

    function showTimeLine(){//时间轴出现
        if(!timeLineVisible){
            var mapHeight = mapBox.height();
            var h=mapHeight-45+'px';
            mapBox.animate({'height':h});
            timeLineBox.slideDown();
            timeLine.setPosition();
            timeLineVisible=true;
        }
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
    function getColor2(d) {//图例颜色
        return d > 1000 ? '#67012f' :
            d > 900  ? '#9f1653' :
                d > 800 ? '#ed217c' :
                    d > 700   ? '#f1608f' :
                        d > 600 ? '#f387a4' :
                            d > 500  ? '#f3b087' :
                                d > 300 ? '#d1f387' :
                                    d > 100   ? '#87f38a' :
                                        '#5afa5f';
    }

    function resize(){//屏幕缩放
        var windowWidth = $(window).width();
        var windowHeight = $(window).height();
        $('#content>div').height(windowHeight-140);
        var boxH = parseInt($('#chart_top').parents('.informationBox').css("height"));
        $('.statisticBox').css("height",boxH - 70 + "px");
        $(".informationContent").each(function (i,v){
            var height = parseInt($(v).parent().css("height"));
            $(v).css("height", height - 40 + "px");
        });
        Chart1.resize();
        Chart2.resize();
        Chart3.resize();
        Chart_top.resize();
        Chart_pie.resize();
        Pie1.resize();
        Pie2.resize();
        Pie3.resize();
        Pie4.resize();
    }

    function addMarkers(markers){//添加图标
        for(var i=0;i<markers.length;i++){
            markers[i].addTo(map);
            fillBox(markers[i],20);
        }
    }

    function reMoveMarkers(markers){//清除图标
        for(var i=0;i<markers.length;i++){
            map.removeLayer(markers[i]);
        }
    }

    function barPeopleChartOption(max,total,xData,yData){//人口柱状图参数
        var data = [];
        yData.forEach(function(v){
            data.push(max - v);
        });
        total == 0 && (total = 1);
        var option = {
            color:["#ff6666","#e5e5e5"],
            grid:{
                x:65,
                y:0,
                right: 120,
                height:'100%',
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
                    textStyle:{color:"#262b2e", fontSize: 14}
                },
                axisTick:{show:false},
                splitLine:{show:false},
                data:xData.reverse()
            },
            series :[
                {
                    name:"人口统计",
                    stack:"people",
                    type:'bar',
                    silent: true,
                    barWidth:12,
                    itemStyle:{
                        emphasis:{
                            opacity:1
                        }
                    },
                    data:yData
                },{
                    name:"统计",
                    stack:"people",
                    type:'bar',
                    silent: true,
                    barWidth:12,
                    label:{
                        normal:{
                            show: true,
                            position: ['100%','10%'],
                            formatter: function(val){
                                var num = yData[val.dataIndex];
                                return "\t\t\t" + (num / total * 100).toFixed(1) + "% \t\t\t" + num + "人";
                            },
                            textStyle: {
                                color: '#262b2e',
                                fontSize: 14
                            }
                        }
                    },
                    data:data
                }
            ]

        };
        return option;
    }
    function barBuildChartOption(xData,yData){//房屋柱状图参数
        var option = {
            color:["#14cc7c"],
            tooltip:{
                trigger:'axis',
                formatter:'{b}:{c}间'
            },
            calculable:true,
            grid:{
                left:60,
                top:35,
                right: 50,
                bottom: 40,
                borderColor:"#0d1430"
            },
            xAxis:{
                type:'category',
                axisLine:{
                    show:false
                },
                axisLabel:{
                    textStyle:{color:"#262b2e", fontSize: 12}
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
                    name:"单位 (间)",
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
                    type:'bar',
                    barWidth:14,
                    data:yData
                }
            ]

        };
        return option;
    }
    function barCompanyChartOption(xData,yData){//企业柱状图参数
        var option = {
            color:["#578fff"],
            /*tooltip:{
                trigger:'axis'
            },*/
            calculable:true,
            grid:{
                left:100,
                top:10,
                right: 50,
                bottom: 20,
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
                    textStyle:{color:"#262b2e", fontSize: 12},
                    // interval: 0
                },
                axisTick:{show:false},
                splitLine:{show:false},
                data:xData
            },
            series :[
                {
                    name:"企业统计",
                    type:'bar',
                    barWidth:10,
                    label:{
                        normal:{
                            show: true,
                            position: 'right',
                            formatter: '{c}个',
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
            hoverAnimation: false,
            series:[
                {
                    name:'背景',
                    type:'pie',
                    hoverAnimation: false,
                    radius:['79%', '86%'],
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
                    radius:['75%','90%'],
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
    function barEventChartOption(xData1,yData1){//事件柱状图参数
        var option = {
            color:["#f0ad48"],
            tooltip:{
                trigger:'axis',
                formatter: '{b}:{c}件'
            },
            calculable:true,
            grid:[
                {
                    top: 10,
                    left: 50,
                    right: 20,
                    bottom: 30,
                    borderColor:"#0d1430"
                }
            ],
            xAxis:[
                {
                    type:'category',
                    axisLine:{
                        show:false
                    },
                    axisLabel:{
                        interval: 0,
                        textStyle:{color:"#262b2e", fontSize: 12}
                    },
                    axisTick:{ show: false },
                    splitLine:{show: false},
                    data:xData1
                }
            ],
            yAxis:[
                {
                    type:"value",
                    name:"单位 (件)",
                    nameTextStyle:{
                        color:"#262b2e"
                    },
                    axisLabel:{
                        textStyle:{color:"#262b2e"}
                    },
                    axisTick:{ show: false },
                    splitLine:{lineStyle:{color:"#e5e5e5"}},
                    splitNumber: splitNum,
                    axisLine:{ show: false}
                }
            ],
            series :[
                {
                    name:"事件",
                    type:'bar',
                    barWidth:14,
                    data:yData1
                }
            ]

        };
        return option;
    }

    function clearAllData(){//清除地图上的数据
        drawnItems.clearLayers();
        allMarkerLayers&&allMarkerLayers.clearLayers();
        monitorMarkerLayers&&monitorMarkerLayers.clearLayers();
        fireplugMarkerLayers&&fireplugMarkerLayers.clearLayers();
        peopleMarker=[];buildingMarker=[];companyMarker=[];
        informationMarker&&map.removeLayer(informationMarker);
        searchInput.val();
        manageList.find('li.active').removeClass('active');
    }
    function highlightIcon(e){
        map.setView(e.latlng);
        var point = map.latLngToContainerPoint([e.latlng.lat,e.latlng.lng]);
        mapBox.css("cursor","pointer");
        var TYPE = this.type;
        if (TYPE == '0'){
            informationIcon.options.html = '<i class="blt-large"></i><b class="info-close">×</b><ul class="info-con"><li><label>姓名：</label><span>'+(this.info.name||'无')+
            '</span></li><li><label>性别：</label><span>'+(this.info.sex||'无')+
            '</span></li><li><label>电话：</label><span>'+(this.info.phone||'无')+
            '</span></li><li><label>住址：</label><span>'+(this.info.address||'无')+
            '</span></li><li><a class="btn" target="_blank" href="/detail/people/'+this.info.id+'">查看详情</a></li></ul>';
        } else if (TYPE == '1'){
            var type = this.info.buildType == 0 ? '居民楼' :
                       this.info.buildType == 1 ? '商住' :
                       this.info.buildType == 2 ? '写字楼' :
                       this.info.buildType == 3 ? '单位楼' :
                                                    '平房' ;
            informationIcon.options.html = '<i class="blt-large"></i><b class="info-close">×</b><ul class="info-con"><li><label>建筑类型：</label><span>'+type+
            '</span></li><li><label>地址：</label><span>'+(this.info.address||'无')+
            '</span></li><li><a class="btn" target="_blank" onclick="<%Session[address]=ksjdfkjd>" href="/detail/building/'+this.info.id+'/'+this.info.lat+'/'+this.info.lng+'/'+this.info.address+'">查看详情</a></li></ul>';
        } else if (TYPE == '2'){
            informationIcon.options.html = '<i class="blt-large"></i><b class="info-close">×</b><ul class="info-con"><li><label>企业名称：</label><span>'+(this.info.name||'无')+
            '</span></li><li><label>企业法人：</label><span>'+(this.info.legal||'无')+
            '</span></li><li><label>企业地址：</label><span>'+(this.info.address||'无')+
            '</span></li><li><label>联系电话：</label><span>'+(this.info.phone||'无')+
            '</span></li><li><a class="btn" target="_blank" href="/detail/company/'+this.info.id+'">查看详情</a></li></ul>';
            // '</span></li><li><a class="btn" target="_blank" id="'+this.info.id+'">查看详情</a></li></ul>';
        }
        informationMarker&&map.removeLayer(informationMarker);
        informationMarker = L.marker(e.latlng,{icon: informationIcon}).addTo(map);
    }
    // mapBox.on('click', '.info-con a', function(){
    //     var id = $(this).attr('id');
    //     $.ajax({
    //         type: 'post',
    //         url: '/detail/company',
    //         data: {id:id},
    //         success: function(data){
    //             var newwin = window.open('','','');
    //             newwin.opener = null;
    //             newwin.document.write(data);
    //             newwion.document.close();
    //         }
    //     });
    // });
    function fillBox(marker,companyCount){
        var fillBoxes = document.createDocumentFragment();
        var classHeader = marker.type=="building"?"companyBox":"peopleBox";
        //var numb=parseInt(1000*Math.random());
        for(var i=1;i<=companyCount;i++){
            var companyBox = document.createElement('div');
            companyBox.className=classHeader+i;
            //companyBox.style.cssText="background:"+getColor(numb);
            fillBoxes.appendChild(companyBox);
        }
        marker._icon.appendChild(fillBoxes);
    }

    function addPointMarkers(data, type){//添加各种marker
        clearAllData();
        if(type == '0'){
            for(var j=0;j<data.length;j++){
                if(data[j].lat&&data[j].lng){
                    var people = L.marker([data[j].lat, data[j].lng],{icon:peopleIcon}).addTo(map);
                    people.type=type;
                    people.info=data[j];
                    people.on('click',highlightIcon);
                    peopleMarker.push(people);
                }
            }
        }else if (type == '1') {
            for(var j=0;j<data.length;j++){
                if(data[j].lat&&data[j].lng){
                    var building = L.marker([data[j].lat, data[j].lng],{icon:buildingIcon}).addTo(map);
                    building.type=type;
                    building.info=data[j];
                    building.on('click',highlightIcon);
                    buildingMarker.push(building);
                }
            }
        } else if (type == '2'){
            for(var k=0;k<data.length;k++){
                if(data[k].lat&&data[k].lng){
                    var company = L.marker([data[k].lat, data[k].lng],{icon:companyIcon}).addTo(map);
                    company.type=type;
                    company.info=data[k];
                    company.on('click',highlightIcon);
                    companyMarker.push(company);
                }
            }
        }
        var allMarker =buildingMarker.concat(peopleMarker,companyMarker);
        if (allMarker.length == 0) {
            layer.msg('无坐标信息');
            return;
        }
        map.setView([data[0].lat, data[0].lng],16);
        allMarkerLayers=L.featureGroup(allMarker).addTo(map);
    }
    function addTimeData(params){//添加时间轴数据
        var obj = {
            locale: "zh_CN",
            SIID: "100,at",
            params: params
        };
        $.ajax({
            type: "POST",
            url: "./blz/api/fetch/points/info/group/year.json",
            data: JSON.stringify(obj),
            dataType:'json',
            beforeSend:function(){
                clearAllData();
            },
            success: function (data) {
                addPointMarkers(data);
                dataCount();
                buildingBtnOpen();
                companyBtnOpen();
                peopleBtnOpen();
                legendIcon.show();
            },
            error: function () {
                layer.alert("请求出错，请稍后重试！")
            }
        });
    }

    function gridBtnClose(){//网格开关关闭
        gridBtn.addClass('off');
        gridBtn.find('span').animate({left:'0'},"fast");
        gridHere=false;
    }

    function warningBtnClose(){//人口预警关闭
        warningBtn.addClass('off');
        warningBtn.find('span').animate({left:'0'},"fast");
        warning=false;
    }

    function buildingBtnOpen(){//建筑开关开启
        buildingBtn.removeClass('off');
        buildingBtn.find('span').animate({left:'25px'},"fast");
        buildingMarkerHere=true;
    }

    function companyBtnOpen(){//企业开关开启
        companyBtn.removeClass('off');
        companyBtn.find('span').animate({left:'25px'},"fast");
        companyMarkerHere=true;
    }

    function peopleBtnOpen(){//人口开关开启
        peopleBtn.removeClass('off');
        peopleBtn.find('span').animate({left:'25px'},"fast");
        peopleMarkerHere=true;
    }

    function buildMarkerOnMap(data){
        allMarkerLayers&&allMarkerLayers.clearLayers();
        monitorMarkerLayers&&monitorMarkerLayers.clearLayers();
        fireplugMarkerLayers&&fireplugMarkerLayers.clearLayers();
        informationMarker&&map.removeLayer(informationMarker);
        buildingMarker = [];
        for(var j=0;j<data.length;j++){
            if(data[j].lat&&data[j].lng){
                var building = L.marker([data[j].lat, data[j].lng],{icon:buildingIcon}).addTo(map);
                building.type = '1';
                building.info = data[j];
                // building.on('mouseover',showInformation2);
                // building.on('mouseout',resetIcon);
                building.on('click',highlightIcon);
                buildingMarker.push(building);
            }
        }
        allMarkerLayers = L.featureGroup(buildingMarker).addTo(map);
    }
    
    /***************************函数定义区end**********************/

    /***************************社区基本信息栏begin**********************/

    var legend = L.control({position: 'bottomright'});//人口预警图例
    legend.onAdd = function (map) {
        var div = L.DomUtil.create('div', 'legend'),
            grades = [0, 100, 300, 500, 600, 700, 800,900,1000],
            labels = [],
            from, to;
        for (var i = 0; i < grades.length; i++) {
            from = grades[i];
            to = grades[i + 1];

            labels.push(
                '<span style="background:' + getColor(from + 1) + '"></span> ' +
                from + (to ? '&ndash;' + to : '+'));
        }

        div.innerHTML = labels.join('<br>')+'<i class="blt"></i> <i class="brt"></i> <i class="blb"></i> <i class="brb"></i>';
        return div;
    };
    legend.addTo(map);
    var marginal = $('.legend');
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
            popClass.css({'background-color':'#3D8A71'});
            drawnItems.setStyle({color: '#f06eaa'});
            this.setStyle({color: '#f7370b'});
            var geoJson = this.toGeoJSON();
            var bounds='';
            for(var i=0;i<geoJson.geometry.coordinates[0].length;i++){
                bounds+=geoJson.geometry.coordinates[0][i].toString()+';'
            }
            bounds=bounds.slice(0,bounds.length-1);
            shapeParams={bounds:bounds};
            $.ajax({
                type: 'post',
                url: '/blz/getPolygonBuild.do',
                dataType: 'json',
                data: shapeParams,
                success: function (data){
                    buildMarkerOnMap(data.data);
                    getPolygonStatisticData(bounds);
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
        warningBtnClose();
        warning=false;
        gridTool.hide();
        clearAllData();
        hideTimeLine();
        geojson.eachLayer(function(layer){
            geojson.resetStyle(layer);
            layer.selected=false;
        });
        if(map.hasLayer(geoSotGeoJson)){
            map.removeLayer(geoSotGeoJson);
            gridHere=false;
        }
    });
    /***************************社区基本信息栏end**********************/

    /***********************************点击事件begin*****************************************/
    gridBtn.on('click',function(){
        clearAllData();
        if(!gridHere){//如果是关着的，那么开
            popClass.css({'background-color':'#3D8A71'});
            warningBtnClose();
            drawnItems.clearLayers();
            shapeHere=false;
            changePosition(18);
            gridHere=true;
            warning=false;
            marginal.hide();
        }else{//如果是开着的，那么关
            hideTimeLine();
            gridHere=false;
            map.removeLayer(geoSotGeoJson);
        }
        if(!gridHere&&!warning){
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
    communityBtn.on("click",function(){
        communitySituation=communitySituation?false:true;
    });
    nameBtn.on('click',function(){
        if(nameOpen){
            for(var i=0;i<communityName.length;i++){
                map.removeLayer(communityName[i]);
            }
            nameOpen=false;
        }else{
            addCommName();
            nameOpen=true;
        }

    });
    closeBtn.on('click',function(){
        $(this).parent().parent().slideUp();
    });
    popClass.on('click',function(){
        popClass.css({'background-color':'#3D8A71'});
        $(this).css({'background-color':'#02f354'});
        var pClass = $(this).siblings().html();
        switch(pClass){
            case '无':
                popClassClicked=false;
                marginal.hide();
                geojson.eachLayer(function(layer){
                    layer.setStyle({weight: 3,opacity: 1,dashArray: '5', fillOpacity: 0});
                    layer.selected = false;
                });
                break;
            case '老人':
                popClassClicked=true;
                marginal.show();
                drawnItems.clearLayers();
                clearAllData();
                hideTimeLine();
                geojson.eachLayer(function(layer){
                    layer.setStyle({weight: 1,opacity: 1,dashArray: '5', fillOpacity: 0.6, fillColor: getColor(parseInt(1000*Math.random()))});
                    layer.selected = true;
                });
                break;
            case '孕妇':
                popClassClicked=true;
                marginal.show();
                drawnItems.clearLayers();
                clearAllData();
                hideTimeLine();
                geojson.eachLayer(function(layer){
                    layer.setStyle({weight: 1,opacity: 1,dashArray: '5', fillOpacity: 0.6, fillColor: getColor(parseInt(1000*Math.random()))});
                    layer.selected = true;
                });
                break;
            case '孩子':
                popClassClicked=true;
                marginal.show();
                drawnItems.clearLayers();
                clearAllData();
                hideTimeLine();
                geojson.eachLayer(function(layer){
                    layer.setStyle({weight: 1,opacity: 1,dashArray: '5', fillOpacity: 0.6, fillColor: getColor(parseInt(1000*Math.random()))});
                    layer.selected = true;
                });
                break;

        }

    });
    community.change(function(){
        if(this.value == 0) {
            map.setView([39.9156, 116.491], 15);
            resize();
            return;
        }
        var val = this.value;
        resize();
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
    // 图层管理
    var manageToggle = $(".manage-toggle");
    var manageList = $(".manage-list");
    manageToggle.click(function(){
        if ($(this).hasClass('open')) {
            $(this).removeClass('open');
            manageList.hide();
        }
        else {
            $(this).addClass('open');
            manageList.show();
        }
    });
    function showMsgBox(e){
        map.setView(e.latlng);
        var point = map.latLngToContainerPoint([e.latlng.lat,e.latlng.lng]);
        mapBox.css("cursor","pointer");
        informationIcon.options.html = '<i class="blt-large"></i><b class="info-close">×</b><ul class="info-con"><li><label>地址：</label><span>'+(this.info.cameraaddress||'无')+
            '</span></li><li><label>类型：</label><span>'+(this.info.cameratype||'无')+
            '</span></li><li><label>分辨率：</label><span>'+(this.info.videoresolution||'无')+
            '</span></li><li><label>运行状态：</label><span>'+(this.info.runingstate||'无')+
            '</span></li><li><label>存储类型：</label><span>'+(this.info.videostorgetype||'无')+
            '</span></li><li><label>管理单位：</label><span>'+(this.info.managementunit||'无')+
            '</span></li><li><label>管理单位电话：</label><span>'+(this.info.managementunitphone||'无')+
            '</span></li></ul>';
        informationMarker&&map.removeLayer(informationMarker);
        informationMarker = L.marker(e.latlng,{icon: informationIcon}).addTo(map);
    }
    manageList.on('click','li',function(){
        drawnItems.clearLayers();
        allMarkerLayers&&allMarkerLayers.clearLayers();
        peopleMarker=[];buildingMarker=[];companyMarker=[];
        informationMarker&&map.removeLayer(informationMarker);
        searchInput.val();
        // clearAllData();
        var index = $(this).index();
        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
            index == 0 ? monitorMarkerLayers.clearLayers() : fireplugMarkerLayers.clearLayers();
        }
        else {
            // $(this).addClass('active').siblings().removeClass('active');
            $(this).addClass('active');
            var markerArr = [];
            if (index == 0) { // 监控探头
                $.ajax({
                    type: 'get',
                    url: '/blz/getCamera.do',
                    dataType: 'json',
                    success: function (data) {
                        if (data.code == 0) {
                            for (var i=0;i<data.data.length;i++) {
                                if (data.data[i].lat && data.data[i].lng) {
                                    var marker = L.marker([data.data[i].lat, data.data[i].lng],{icon: monitorIcon}).addTo(map);
                                    marker.info = data.data[i];
                                    marker.on('click',showMsgBox);
                                    markerArr.push(marker);
                                }
                            }
                            monitorMarkerLayers = L.featureGroup(markerArr).addTo(map);
			    map.setView([39.9156, 116.491], 15);
                        } else {
                            layer.alert("查询失败，请重试！");
                        }
                    },
                    error: function () {
                        layer.alert("查询失败，请重试！");
                    }
                });
            } else if (index == 1) { // 消防栓
                $.getJSON('/js/00data.json',function(data){
                    for (var i=200;i<400;i++) {
                        if (data[i] && data[i].lat && data[i].lng) {
                            markerArr.push(L.marker([data[i].lat, data[i].lng],{icon: fireplugIcon}).addTo(map));
                        }
                    }
                    fireplugMarkerLayers = L.featureGroup(markerArr).addTo(map);
		    map.setView([39.9156, 116.491], 15);
                });
            }
        }
    });

    buildingBtn.on('click',function(){
        if(buildingMarkerHere){
            reMoveMarkers(buildingMarker);
            buildingMarkerHere=false;
        }else{
            addMarkers(buildingMarker);
            buildingMarkerHere=true;
        }
    });
    companyBtn.on('click',function(){
        if(companyMarkerHere){
            reMoveMarkers(companyMarker);
            companyMarkerHere=false;
        }else{
            addMarkers(companyMarker);
            companyMarkerHere=true;
        }
    });
    peopleBtn.on('click',function(){
        if(peopleMarkerHere){
            reMoveMarkers(peopleMarker);
            peopleMarkerHere=false;
        }else{
            addMarkers(peopleMarker);
            peopleMarkerHere=true;
        }
    });
    deleteShape.on('click',function(){
        drawnItems.clearLayers();
        clearAllData();
        hideTimeLine();
    });
    // 搜索类型切换
    searchType.on('change',function () {
        searchInput.val('');
        resultList.slideUp();
    });
    // 搜索匹配结果
    searchInput.on('input propertychange',function () {
        var type = searchType.val();
        var value = $(this).val().trim();
        if (value == '') {
            resultList.slideUp();
        }else {
            resultList.empty();
            resultList.slideDown();
            var url = '';
            var data = {};
            if (type == '0'){
                url = '/blz/getPeopleFuzzy.do';
                data = {peopleFuzzy: value}
            } else if (type == '1'){
                url = '/blz/getBuildFuzzy.do';
                data = {buildFuzzy: value}
            } else if (type == '2'){
                url = '/blz/getCompanyFuzzy.do';
                data = {companyFuzzy: value}
            }
            $.ajax({
                type: 'post',
                url: url,
                data: data,
                dataType: 'json',
                success: function (data){
                    if(data.code == 0){
                        resultList.empty();
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
        }
    });
    // 匹配结果列表
    resultList.on('mouseover','li',function () {
        $(this).addClass("active")
    });
    resultList.on('mouseout','li',function () {
        $(this).removeClass("active")
    });
    // 点击列表查询详情
    resultList.on('click','li',function () {
        var value = $(this).html();
        resultList.slideUp();
        searchInput.val(value);
        searchResult(value);
    });
    // 点击查询按钮
    $("#search").click(function () {
        resultList.slideUp();
        searchResult(searchInput.val());
    });
    // 模糊查询结果请求
    function searchResult(value) {
        if (value == '') { return; }
        clearAllData();
        if (geoSotGeoJson){
            geoSotGeoJson.eachLayer(function(layer){
                geoSotGeoJson.resetStyle(layer);
            });
        }
        var type = searchType.val();
        var url = type == '0' ? '/blz/getPeopleFromName.do' :
                  type == '1' ? '/blz/getBuildFromName.do'  :
                  type == '2' ? '/blz/getCompanyFromName.do':
                                '';
        $.ajax({
            type: 'post',
            url: url,
            data: {name: value},
            dataType: 'json',
            success: function (data){
                if(data.code == 0){
                    if (type != '2' && data.data.length == 0) {
                        layer.msg("无坐标信息");
                    } else if (type == '2') {
                        if (data.data.lat && data.data.lng) addPointMarkers([data.data], type);
                        else layer.msg("无坐标信息");
                    } else addPointMarkers(data.data, type);
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
        map.removeLayer(informationMarker);
    });
    //退出登录
    $('.logout').click(function(){
        $.ajax({
            type:'get',
            url:'/logout',
            dataType:'json',
            success:function(data){},
            error:function(){
                layer.alert("退出失败，请稍后重试！");
            }
        });
    });

    /***********************************点击事件end*****************************************/

    /***********************************添加社区边界begin*****************************************/
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
        if(!warning&&!gridHere&&!shapeHere&&communitySituation){
            mapBox.css("cursor","pointer");
            var layer = e.target;
            var li = communityInformation.find("li");
            var h4 = communityInformation.find("h4");
            var num = 0,num2 = 0;
            for(var pro in layer.feature.properties){
                if(num>1){
                    li.eq(num2).find("span").html(layer.feature.properties[pro]);
                    num2++;
                }
                num++;
            }
            var point = map.latLngToContainerPoint([e.latlng.lat,e.latlng.lng]);
            h4.html("当前社区："+layer.name);
            if(!layer.selected){
                layer.setStyle({weight: 2,color: '#ff6666'});
            }
            communityInformation.show();
            communityInformation.css({"top":point.y+10+"px","left":point.x+10+"px"});
        }
    }
    function resetCommunity(e) {
        mapBox.css("cursor","grab");
        mapBox.css("cursor","-webkit-grab");
        var layer = e.target;
        communityInformation.hide();
        if(!layer.selected){geojson.resetStyle(layer);}
    }
    function showInformation(){
        var id = this.id;
        information.hide();
        if(this.type=="company"){
            witchIcon=0;
            companyDtl.slideDown();
        }else{
            witchIcon=1;
            companyDtl.slideDown();
        }
    }
    function resetStyle(geojson){
        geojson.eachLayer(function(layer){
            geojson.resetStyle(layer);
        });
    }
    function zoomToFeature(e) {
        popClass.css({'background-color':'#3D8A71'});
        marginal.hide();
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
        communityParams.id=this.id;
        drawnItems.clearLayers();
        shapeHere=false;
        $('#community_chzn').find('span').text(layer.name);
        geojson.eachLayer(function(layer){
            geojson.resetStyle(layer);
            layer.selected=false;
        });
        getStatisticData(layer.commCode);
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
    function showInformation2(){
        $.ajax({
            type: "POST",
            url: "/blz/getBuildInfo.do",
            data: {
                buildId: this.buildId,
                lat:this.lat,
                lng:this.lng,
                address:this.address
            },
            dataType:'json',
            async:false,
            success: function (data) {
                renderHouseInfo(data.data.house);
                renderCompanyInfo(data.data.company);
            },
            error: function () {
                layer.alert("请求出错，请稍后重试！")
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
                addCommName();
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
    function addCommName() {
        geojson.eachLayer(function(layer){
            communityNameIcon.options.html=layer.name.slice(0,-2);
            var name= L.marker(communityBounds[layer.feature.id].getCenter(),{icon:communityNameIcon}).addTo(map);
            /*name.on({
                mousemove: function(){
                    mapBox.css('cursor','pointer');
                    var num = 0,num2 = 0;
                    if(!layer.selected){
                        layer.setStyle({weight: 2,color: '#ff6666'});
                    }
                },
                click: function(){
                    layer.selected=true;
                    layer.setStyle({weight: 3,dashArray: '',opacity: 1,color: '#ff7070'});
                    drawnItems.clearLayers();
                    shapeHere=false;
                    $('#community_chzn').find('span').text(layer.name);
                    geojson.eachLayer(function(layer){
                        geojson.resetStyle(layer);
                        layer.selected=false;
                    });
                    getStatisticData(layer.commCode);
                    resize();
                    map.fitBounds(layer.getBounds());
                    $.ajax({
                        type: "POST",
                        url: "/blz/getCommBuild.do",
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
            });*/
            communityName.push(name);
            nameOpen=true;
        });
    }
    /***********************************添加社区边界end*****************************************/

    /***********************************绘制geosot网格begin*****************************************/
    var geoSotGeoJson;//定义网格层对象
    var GeoDataInt;
    function drawGeoSotGrid(zoomLevel){//绘制网格
        resetStyle(geojson);//社区范围样式还原
        clearAllData();//清空数据
        hideTimeLine();//隐藏时间轴
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
                        // color: '#e59973',
                        color: '#FF6666',
                        dashArray: '',
                        fillOpacity: warning?0.6:0,
                        fillColor: getColor(feature.properties.density)
                    };
                }
                function highlightGrid(e) {//点击每个网格网格高亮显示函数
                    if(!warning){
                        popClass.css({'background-color':'#3D8A71'});
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
                        gridParams.id=elayer.geosotCode;
                        gridParams.layer=gridLayer;
                        $.ajax({
                           type: 'post',
                           url: '/blz/getGridInfoOfHomePage.do',
                           data: {code:elayer.geosotCode,layer:$('.grid-tool-text').html()},
                           dataType: 'json',
                           success: function (data){
                               buildMarkerOnMap(JSON.parse(data.data.buildings) || []);
                               getGridStatisticData(data.data);
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
    /***********************************绘制geosot网格end*****************************************/

    /***********************************统计数据start*****************************************/
    Chart1.setOption(barBuildChartOption(["居民楼","商住","写字楼","单位楼","平房"],[0,0,0,0,0]));
    Chart2.setOption(barCompanyChartOption(["其他","批发零售业","住房餐饮业","信息技术业","文化娱乐业","房产建筑业","金融业"],[0,0,0,0,0,0,0]));
    Chart_top.setOption(barPeopleChartOption(100,500,["河北","河南","广东","江苏","湖北","辽宁","上海","天津"],[0,0,0,0,0,0,0,0]));
    Chart_pie.setOption(pieChartOption(100,0,"#ff6666"));
    Chart3.setOption(barEventChartOption(["市容环境","宣传广告","施工管理","突发事件","街面秩序","单位"],[0,0,0,0,0,0],"#FF6666"));
    Pie1.setOption(pieChartOption(11,0,"#ff5c5c"));
    Pie2.setOption(pieChartOption(11,0,"#ff7733"));
    Pie3.setOption(pieChartOption(11,0,"#fdaa29"));
    Pie4.setOption(pieChartOption(11,0,"#32a3fa"));
    // 社区统计数据
    function getStatisticData(commCode){
        var data = {commCode:commCode};
        $.ajax({
            type: 'get',
            url: '/blz/getBuildType.do',
            data: data,
            dataType: 'json',
            success: renderBuildBar,
            error: function () {
                layer.alert("请求出错，请稍后重试！");
            }
        });
        $.ajax({
            type: 'get',
            url: '/blz/getCompanyType.do',
            data: data,
            dataType: 'json',
            success: renderCompanyBar,
            error: function () {
                layer.alert("请求出错，请稍后重试！");
            }
        });
        $.ajax({
            type: 'get',
            url: '/blz/getEventType.do',
            data: data,
            dataType: 'json',
            success: renderEventBar,
            error: function () {
                layer.alert("请求出错，请稍后重试！");
            }
        });
        $.ajax({
            type: 'get',
            url: '/blz/getCompanyColorType.do',
            data: data,
            dataType: 'json',
            success: renderEventPie,
            error: function () {
                layer.alert("请求出错，请稍后重试！");
            }
        });
        $.ajax({
            type: 'get',
            url: '/blz/getForeignPopulation.do',
            data: data,
            dataType: 'json',
            success: renderPeopleBar,
            error: function () {
                layer.alert("请求出错，请稍后重试！");
            }
        });
    }
    // 多边形统计数据
    function getPolygonStatisticData(bounds){
        var data = {bounds:bounds};
        $.ajax({
            type: 'get',
            url: '/blz/getBuildTypeFromPolygon.do',
            data: data,
            dataType: 'json',
            success: renderBuildBar,
            error: function () {
                layer.alert("请求出错，请稍后重试！");
            }
        });
        $.ajax({
            type: 'get',
            url: '/blz/getCompanyTypeFromPolygon.do',
            data: data,
            dataType: 'json',
            success: renderCompanyBar,
            error: function () {
                layer.alert("请求出错，请稍后重试！");
            }
        });
        $.ajax({
            type: 'get',
            url: '/blz/getEventTypeFromPolygon.do',
            data: data,
            dataType: 'json',
            success: renderEventBar,
            error: function () {
                layer.alert("请求出错，请稍后重试！");
            }
        });
        // $.ajax({
        //     type: 'get',
        //     url: '/blz/getCompanyColorTypeFromPolygon.do',
        //     data: data,
        //     dataType: 'json',
        //     success: renderEventPie,
        //     error: function () {
        //         layer.alert("请求出错，请稍后重试！");
        //     }
        // });
        $.ajax({
            type: 'get',
            url: '/blz/getForeignPopulationFromPolygon.do',
            data: data,
            dataType: 'json',
            success: renderPeopleBar,
            error: function () {
                layer.alert("请求出错，请稍后重试！");
            }
        });
    }
    // 网格统计数据
    function getGridStatisticData(data){
        renderBuildBar(data.buildType || [],'grid');
        renderCompanyBar(data.companyType || {},'grid');
        renderEventBar(data.event || [],'grid');
        renderEventPie(data.companyColorType || [],'grid');
        renderPeopleBar(data.foreignPopulation || {},'grid');
    }
    // 渲染图表
    function renderBuildBar(data,type) {
        var arr = ["居民楼","商住","写字楼","单位楼","平房"];
        var xData = [],yData = [];
        if (type == 'grid') {
            for(var j in data) {
                xData.push(arr[data[j].BUILDTYPE - 1]);
                yData.push(data[j].statValue);
            }
        }else{
            xData = arr;
            for(var i in data.data){
                yData.push(data.data[i]);
            }
        }
        Chart1.setOption(barBuildChartOption(xData,yData));
    }
    function renderCompanyBar(data,type) {
        var xData = ["金融业","房产建筑业","文化娱乐业","信息技术业","住房餐饮业","批发零售业","其他"];
        var yData = [];
        if (type == 'grid') {
            yData = [data[0]||0,data[1]||0,data[2]||0,data[3]||0,data[4]||0,data[5]||0,data[6]||0];
        }else {
            for(var i in data.data){
                yData.unshift(data.data[i]);
            }
        }
        Chart2.setOption(barCompanyChartOption(xData.reverse(),yData));
    }
    function renderEventBar(data,type) {
        var arr = ["市容环境","宣传广告","施工管理","突发事件","街面秩序","单位"];
        var xData = [],yData = [];
        if (type == 'grid') {
            for(var j in data){
                xData.push(arr[data[j].subStr - 1]);
                yData.push(data[j].statValue);
            }
        }else{
            xData = arr;
            for(var i in data.data.event){
                yData.push(data.data.event[i]);
            }
        }
        Chart3.setOption(barEventChartOption(xData,yData,"#FF6666"));
    }
    function renderEventPie(data,type) {
        var dataResult = [0,0,0,0];
        if (Object.getOwnPropertyNames(data).length != 1) {
            if (type == 'grid') {
                for(var i in data){
                    var level = data[i].biaoqian[0];
                    level == '红' ? dataResult[0] = data[i].statValue :
                    level == '橙' ? dataResult[1] = data[i].statValue :
                    level == '黄' ? dataResult[2] = data[i].statValue :
                                    dataResult[3] = data[i].statValue;
                }
            }else {
                var result = data.data;
                var arr = [];
                for(var k in result){
                    arr.push(k);
                }
                dataResult = [result[arr[0]]||0,result[arr[1]]||0,result[arr[2]]||0,result[arr[3]]||0];
            } 
        }
        var total = dataResult[0] + dataResult[1] + dataResult[2] + dataResult[3];
        total == 0 && (total = 1);
        Pie1.setOption(pieChartOption(total,dataResult[0],"#ff5c5c"));
        Pie2.setOption(pieChartOption(total,dataResult[1],"#ff7733"));
        Pie3.setOption(pieChartOption(total,dataResult[2],"#fdaa29"));
        Pie4.setOption(pieChartOption(total,dataResult[3],"#32a3fa"));
        $('.pieBox>div:first-child span').html(dataResult[0]);
        $('.pieBox>div:nth-child(2) span').html(dataResult[1]);
        $('.pieBox>div:nth-child(2) span').html(dataResult[2]);
        $('.pieBox>div:nth-child(2) span').html(dataResult[3]);
        $('.pieText').each(function (i,v){
            v.innerHTML = dataResult[i]
        });
    }
    function renderPeopleBar(data,type) {
        var xData = ["河北","河南","广东","江苏","湖北","辽宁","上海","天津"];
        var yData = [];
        var total;
        var result = type == 'grid' ? data : data.data;
        var Max = 0;
        for (var j=0;j<xData.length;j++){
            for(var i=0;i<result.data.length;i++){
                    if (parseInt(result.data[i].population) > Max) Max = parseInt(result.data[i].population);
                if (result.data[i].provinceName == xData[j]){
                    yData.unshift(result.data[i].population);
                }
            }
        }
        $(".totalPopulationSum").html(result.total);
        $(".foreignPopulationSum").html(result.foreign);
        // Chart_top.setOption(barPeopleChartOption(Math.floor(Max*1.25),xData,yData));
        Chart_top.setOption(barPeopleChartOption(Math.floor(Max*1.25),result.foreign,xData,yData));
        Chart_pie.setOption(pieChartOption(result.total||1,result.foreign,"#ff6666"));
    }
    getStatisticData(null);
    /***********************************统计数据end*****************************************/

});
