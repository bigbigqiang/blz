/**
 * Created by Administrator on 2016/8/14.
 */
$(function () {
    var searchPanel = $('.search-btn'); //场景查询面板
    var accordionPannel = $('#accordion'); //手风琴场景面板
    var addSceneBtn = $('.add-scene');  //添加业务场景按钮
    //地图宽度设置
    function setMapWidth() {
        var windowWidth = $(window).width();
        var mapContainer = $('.map_container');
        mapContainer.width(windowWidth);
    }
    setMapWidth();
    $(window).resize(setMapWidth);
    //初始化地图
    var map_maxBounds = L.latLngBounds([-90,180], [90,-180]);
    var map = L.map("map", {
        zoomControl: false,
        center: [39.7599, 116.1015],
        zoom: 5,
        maxZoom: 17,
        minZoom:3,
        maxBounds:map_maxBounds,
        attributionControl: false
    });
    L.tileLayer('http://192.168.0.199:9999/mapbox-studio-streets-basic/{z}/{x}/{y}' + (L.Browser.retina ? '@2x' : '') + '.png').addTo(map);
    //初始化滚动条
    accordionPannel.mCustomScrollbar({
        scrollInertia: 300
    });
    //toggle侧边栏
    var onOff=true;
    $('#collapse_btn').click(function(){
        if(onOff){
            $('.side-search').animate({"left":-265},500);
            $('.result').animate({"left":0},500);
            $(this).css("background","url('/image/sprite.png') no-repeat -99px -23px");
            onOff=false;
        }
        else{
            $('.side-search').animate({"left":0},500);
            $('.result').animate({"left":265},500);
            $(this).css("background","url('/image/sprite.png') no-repeat -97px 0");
            onOff=true;
        }
    });
    //添加业务场景
    var clickNum=0;
    addSceneBtn.click(function () {
        var sceneNum = $('.panel-accordion').length;
        if (sceneNum == 3) {
            alert('超出最大限制，最多可添加3种业务场景');
            return;
        }
        else {
            num++;
            creatScenePanelString(num);
        }
    });
    //拼接场景字符串
    function creatScenePanelString(num) {
        var scenePanelString = '<div class="panel panel-accordion no-padding no-margin no-border border-bottom no-border-radius">' +
            '<div class="scene-head bgcolor-hd border-bottom">' +
            '<h4 class="panel-title">' +
            '<a>' +
            '<span  data-target="#panel2" data-toggle="collapse" data-parent="#accordion" >业务场景一</span> <i></i></a>' +
            '</h4>' +
            '</div>' +
            '<div class="panel-collapse collapse in scene-con bgcolor-con" id="panel2">' +
            '<div class="panel-body no-padding">' +
            '<form class=" search-condition" id="side-scrollbar">' +
            '<div class="form-group">' +
            '<label>业务场景：</label>' +
            '<select class="form-control select-source-type" id="source-type'+num+'">' +
            '<option>请选择业务场景</option>' +
            '</select>' +
            '</div>' +
            '<div class="form-group">' +
            '<label>字典聚类：</label>' +
            '<select class="form-control" id="dic-type'+num+'">' +
            '<option>请选择字典聚类</option>' +
            '</select>' +
            '</div>' +
            '</form>' +
            '</div>' +
            '</div>' +
            '</div>';
        searchPanel.before(scenePanelString);
    }

    //删除业务场景
    accordionPannel.on('click', 'i', function () {
        $(this).parents('.panel-accordion').remove();
    });
    //添加圆盘控件
    L.control.pan().addTo(map);
    //加载自定义控件zoomslider缩放
    L.control.zoomslider().addTo(map);
    //测量控件
    L.Control.measureControl().addTo(map);
    //加载自定义控件scale比例尺
    L.aeroScale().addTo(map);
    //加载自定义控件pointInfo经纬度
    L.pointInfo().addTo(map);
    //加载自定义控件minimap全球缩略图
    var osmUrl = 'http://192.168.0.199:9999/mapbox-studio-streets-basic/{z}/{x}/{y}' + (L.Browser.retina ? '@2x' : '') + '.png';//缩略图
    var baseLayers = new L.TileLayer(osmUrl, {minZoom: 0, maxZoom: 13});
    var miniMap = new L.Control.MiniMap(baseLayers, {toggleDisplay: true, position: 'bottomright'}).addTo(map);
//添加网格比例尺控件
    L.Scale().addTo(map);
    //scale控件内的点击事件,  开始
    var num = 0;
    var zoomLevel;
    var scaleSlide=$(".leaflet-control-scale-slide");
    var mainSlider=$("#slider-range-min");
    var amount=$("#amount");
    $(".leaflet-control-scale-imgs").click(function () {
        num++;
        if (num % 2 == 1) {
            $(this).find('img').attr('src', 'image/scale2.png');
            scaleSlide.show();
        } else {
            $(this).find('img').attr('src', 'image/scale.png');
            scaleSlide.hide();
        }
        hand_flag = true;
        flag = false;
        zoomLevel = map.getZoom();
        //hand_Graticule(zoomLevel);
    });
    mainSlider.slider({
        range: "min",
        value: 7,
        min: 1,
        max: 18,
        slide: function (event, ui) {
            amount.val("$" + ui.value);
        }
    });
    amount.val("$" + mainSlider.slider("value"));
    mainSlider.slider({
        stop: function (event, ui) {
            var leftSlider=$("#slider-range-min div");
            var value = leftSlider.width();
            var zoomLevel = scalevalue = Math.round(value / 5.3);
            //console.log(scalevalue);
        }
    });
    $(".leaflet-control-scale-sub").click(function () {
        var leftSlider=$("#slider-range-min div");
        var width = leftSlider.width();
        if (width > 6) {
            $("#slider-range-min span").css("left", leftSlider.width() - 5.3);
            leftSlider.width(width - 5.3);
            zoomLevel = scalevalue = Math.round(width / 5.3) - 1;
            console.log(scalevalue);
            //hand_Graticule(zoomLevel);
        }
    });
    $(".leaflet-control-scale-add").click(function () {
        var leftSlider=$("#slider-range-min div");
        var width = leftSlider.width();
        if (width < 91) {
            leftSlider.width(width + 5.3);
            $("#slider-range-min span").css("left", leftSlider.width() + 5.3);
            zoomLevel = scalevalue = Math.round(width / 5.3) + 1;
            //hand_Graticule(zoomLevel);
        }
    });

    //柱状图
    var mapChartBar = echarts.init(document.getElementById('scene-data-bar'));
    mapChartBar.showLoading();
    //$.ajax({
    //    type: "post",
        //url: "/iwherelink_0.1/getChartData.do",
        //dataType: "json",
        //success: function (data) {
            mapChartBar.hideLoading();
            var option = {
                backgroundColor:'transparent',
                tooltip: {
                    trigger: 'axis'
                },
                xAxis: {
                    show:false,
                    type: 'category',
                    data: ['航空港信息数据','地理信息数据','火车站点']
                },
                yAxis: {
                    show:false,
                    type:'value'
                },
                series: {
                    name:'查询结果数量',
                    type:'bar',
                    data:[10102,25664,8696]
                }
            };
            //设置初始化选项
            mapChartBar.setOption(option);
            $(window).resize(function () {
                mapChartBar.resize();
            });
        //},
        //error: function (data) {
        //    alert("数据加载失败，请刷新页面");
        //}
    //});
    //饼形图
    var mapChartPie = echarts.init(document.getElementById('result-pie'));
    mapChartPie.showLoading();
    //$.ajax({
    //    type: "post",
    //url: "/iwherelink_0.1/getChartData.do",
    //dataType: "json",
    //success: function (data) {
    mapChartPie.hideLoading();
    var pieOption = {
        backgroundColor:'transparent',
        tooltip: {
            trigger: 'axis'
        },
        series: {
            name:'查询结果数量',
            type:'pie',
            data:[
                {"name":"库1"},
                {"name":"库2"},
                {"name":"库3"},
                {"name":"库4"}
            ]
        }
    };
    //设置初始化选项
    mapChartPie.setOption(pieOption);
    $(window).resize(function () {
        mapChartPie.resize();
    });
    //},
    //error: function (data) {
    //    alert("数据加载失败，请刷新页面");
    //}
    //});
    //隐藏结果表格
    $('.close-icon').click(function(){
        $('.result').hide();
    });
    //业务场景联动字典聚类
    var selectScene=$();
});