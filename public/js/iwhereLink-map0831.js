/**
 * Created by Administrator on 2015/12/18.
 */

var sign;// 全局的标记，点击矩形查询的时候值为 region ；点击网格查询的时候值为grid
var sourceTypeMSGs = "";//全局性的元数据类型
var isFirst = 0;
var json = {};
var newLayer;
var oldLayer;

//地图宽度设置
function setMapWidth() {
    var windowWidth = $(window).width();
    var mapContainer = $('.map_container');
    mapContainer.width(windowWidth);
}

setMapWidth();
$(window).resize(setMapWidth);
//初始化地图
var map_maxBounds = L.latLngBounds([-90, 180], [90, -180]);
var map = L.map("map", {
    zoomControl: false,
    center: [39.7599, 116.1015],
    zoom: 5,
    maxZoom: 17,
    minZoom: 3,
    maxBounds: map_maxBounds,
    attributionControl: false
});
L.tileLayer('http://192.168.0.199:9999/mapbox-studio-streets-basic/{z}/{x}/{y}' + (L.Browser.retina ? '@2x' : '') + '.png').addTo(map);

// marker
var marker = L.marker([39.7599, 116.1015], {opacity: 0.6});
marker.addTo(map);
marker.bindPopup("北京");
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
var scaleSlide = $(".leaflet-control-scale-slide");
var mainSlider = $("#slider-range-min");
var amount = $("#amount");
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
        var leftSlider = $("#slider-range-min div");
        var value = leftSlider.width();
        var zoomLevel = scalevalue = Math.round(value / 5.3);
        //console.log(scalevalue);
    }
});
$(".leaflet-control-scale-sub").click(function () {
    var leftSlider = $("#slider-range-min div");
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
    var leftSlider = $("#slider-range-min div");
    var width = leftSlider.width();
    if (width < 91) {
        leftSlider.width(width + 5.3);
        $("#slider-range-min span").css("left", leftSlider.width() + 5.3);
        zoomLevel = scalevalue = Math.round(width / 5.3) + 1;
        //hand_Graticule(zoomLevel);
    }
});
/*--------------------------*/
/****************************************绘制网格 begin*****************************************/
//L.control.gridSlace({position: 'topright'}).addTo(map);//网格层级控件
var geoSotGeoJson;//定义网格层对象
var zoomOuts = $('.leaflet-control-scale-sub');
var zoomIns = $('.leaflet-control-scale-add');
var GeoDataInt;
var scaleLayer = 5;
var isGridHere = false;
function drawGeoSotGrid(zoomLevel) {//绘制网格
    isGridHere = true;
//	//删除旧图层
//   	if (map.hasLayer(mongoGridJson)) {
//   		map.removeLayer(mongoGridJson);
//   	}
//   	if (map.hasLayer(mysqlGridJson)) {
//   		map.removeLayer(mysqlGridJson);
//   	}
//   	if (map.hasLayer(oracleGridJson)) {
//   		map.removeLayer(oracleGridJson);
//   	}
//   	if (map.hasLayer(postgresqlGridJson)) {
//   		map.removeLayer(postgresqlGridJson);
//   	}
    if (GeoDataInt) {
        clearInterval(GeoDataInt);
    }
    var zoomleval = zoomLevel ? zoomLevel : map.getZoom();
    var GeoDataArr = [];

    function getCodeArray() {//获取屏幕范围内所有网格的网格编码
        var mapBounds = map.getBounds(), codeArray;
        var leftTopLon = mapBounds._southWest.lng,
            leftTopLat = mapBounds._northEast.lat,
            rightBottomLon = mapBounds._northEast.lng,
            rightBottomLat = mapBounds._southWest.lat;
        (leftTopLon < -180) && (leftTopLon = -180);
        (leftTopLat < -90) && (leftTopLat = -90);
        (rightBottomLon > 180) && (rightBottomLon = 180);
        (rightBottomLat > 90) && (rightBottomLat = 90);
        codeArray = getGCode1DOfRectangle(leftTopLon, leftTopLat, rightBottomLon, rightBottomLat, zoomleval);
        return codeArray;
    }

    var count = 0;
    var Code_Array = getCodeArray();
    var len = Code_Array.array.length;
    if (len < 10000) {
        if (map.hasLayer(geoSotGeoJson)) {//如果地图上有网格，那么先把他移除
            map.removeLayer(geoSotGeoJson);
        }
        while (count < len) {
            var GeoData = {"type": "FeatureCollection", "features": []};//定义网格数据
            for (var i = 0; i < 2000 && count < len; i++) {//整理网格数据
                var GeoRange = [];
                var feature = {
                    "type": "Feature",
                    "properties": {},
                    "geometry": {
                        "type": "Polygon",
                        "coordinates": []
                    }
                };
                var GeoRangeObject = toGeoRangeFromGCode1D(Code_Array.array[count]);
                GeoRange.push([
                    [GeoRangeObject.minLon, GeoRangeObject.minLat],
                    [GeoRangeObject.maxLon, GeoRangeObject.minLat],
                    [GeoRangeObject.maxLon, GeoRangeObject.maxLat],
                    [GeoRangeObject.minLon, GeoRangeObject.maxLat]
                ]);
                feature.geometry.coordinates = GeoRange;
                GeoData.features[i] = feature;
                GeoRange = [];
                count++;
            }
            GeoDataArr.push(GeoData);

        }
//        function highlightFeature(e) {//点击每个网格网格高亮显示函数
//            var layer = e.target;
//            layer.setStyle({
//                weight: 1,
//                color: '#069',
//                dashArray: '',
//                fillOpacity: 0.2
//            });
//
//            if (!L.Browser.ie && !L.Browser.opera) {
//                layer.bringToFront();
//            }
//           
//            
//        }
        function onEachFeature(feature, layer) {//每个网格添加事件
            layer.on({
                click: function () {
                    updateGridForm(layer.getBounds());
                }
            });
        }

        geoSotGeoJson = L.geoJson(GeoDataArr[0], {//把网格加到地图上
            style: {
                weight: 1,
                opacity: 1,
                color: '#38D5A3',
                dashArray: '3',
                fillOpacity: 0.2,
                fillColor: '#f7cdb1'
            },
            onEachFeature: onEachFeature
        }).addTo(map);


        var addDataCount = 1;
        GeoDataInt = setInterval(function () {
            if (addDataCount < GeoDataArr.length) {
                geoSotGeoJson.addData(GeoDataArr[addDataCount]);
                addDataCount++;
            } else {
                clearInterval(GeoDataInt);
            }
        }, 100);

    } else {
        alert('网格量过大，请您减少层级。。。');
        return false;
    }
}


//map.on('dragend', function () {//地图拖动时重新绘制网格
//    var handleLever = $(".leaflet-control-zoomslace-knobs").html();
//    drawGeoSotGrid(handleLever);
//});
//map.on('zoomend', function () {//地图缩放后重新绘制网格
//    var handleLever = $(".leaflet-control-zoomslace-knobs").html();
//    drawGeoSotGrid(handleLever);
//});
zoomIns.on('click', function () {
    scaleLayer++;
    drawGeoSotGrid(scaleLayer);
});
zoomOuts.on('click', function () {
    scaleLayer--;
    drawGeoSotGrid(scaleLayer);
});
/****************************************绘制网格 end*****************************************/


// draw添加
var drawnItems = L.featureGroup().addTo(map);
var drawControl = new L.Control.Draw({
    position: 'topleft',
    draw: {
        polyline: {
            metric: true,
            shapeOptions: {
                color: '#f06eaa'
            }
        },
        polygon: {
            allowIntersection: false,
            showArea: true,
            drawError: {
                color: '#b00b00',
                timeout: 1000
            },
            /*
             * shapeOptions: { color: '#bada55' }
             */
        },
        circle: {
            /*
             * shapeOptions: { color: '#662d91' }
             */
        },
        marker: true
    },
    edit: {
        featureGroup: drawnItems,
        remove: true
    }
});
map.addControl(drawControl);

map.on('draw:created', function (e) {
    var type = e.layerType,
        layer = e.layer;
    if (!(type == 'marker')) {
        drawnItems.setStyle({color: '#f06eaa'});
        layer.setStyle({color: '#bada55'});
    }
    if (type == 'rectangle') {
        var rectBounds = layer.getBounds();
        updateForm(rectBounds);

    }
    drawnItems.addLayer(layer);
    oldLayer=newLayer;
    newLayer=layer;
    bounds = layer.getBounds();
    /* console.log(layer.getLatLngs()); */
    layer.on('click', function () {
        drawnItems.setStyle({color: '#f06eaa'});
        this.setStyle({color: '#bada55'});
        bounds = this.getBounds();
    });
});
// 矩形添加

var isMouseDown = false;
var isRectHere = false;
var beignPoint, endPoint;
var bounds = [
    [50, 72],
    [18, 138]
];
var rect = L.rectangle(bounds, {color: "#ff7800", weight: 1});
function onMouseDown(e) {
    isMouseDown = true;
    beignPoint = e.latlng;
}
function onMouseUp(e) {
    isMouseDown = false;
}
function onMouseMove(e) {
    if (isMouseDown == false)return;
    endPoint = e.latlng;
    bounds = L.latLngBounds(beignPoint, endPoint);

    if (isRectHere == false) {
        rect = L.rectangle(bounds, {color: "#ff7800", weight: 1}).addTo(map);
        isRectHere = true;
    }
    rect.setBounds(bounds);
    console.log('rect');
    updateForm(bounds);
}
var addStatus = false;
var editStatus = false;
var delStatus = false;

// /绘制矩形
function addRect() {
    addStatus = true;
    editStatus = false;
    delStatus = false;
    if (isRectHere) {
        // 把矩形删掉
        map.removeLayer(rect);
        // 置标识符isRectHere为false
        isRectHere = false;
    }
    map.dragging.disable();
    map.on('mousedown', onMouseDown);
    map.on('mouseup', onMouseUp);
    map.on('mousemove', onMouseMove);


}
// 恢复拖拽
function resetMap() {
    addStatus = false;
    editStatus = false;
    delStatus = false;
    map.dragging.enable();
    map.off('mousedown', onMouseDown);
    map.off('mouseup', onMouseUp);
    map.off('mousemove', onMouseMove);
}
// 删除矩形
function delRect(rect) {
    if (isRectHere == true) {
        // 把矩形删掉
        map.removeLayer(rect);
        // 置标识符isRectHere为false
        isRectHere = false;
        $("#llat").val("");
        $("#llon").val("");
        $("#rlat").val("");
        $("#rlon").val("");
    }
}

// 设置按钮状态
function setBtnStatus(btn, status) {
    if (btn == "editBtn") {
        if (status == true) {
            editStatus = true;
            $(".editBtn").removeClass("green");
            $(".addBtn").addClass("blue");
            $(".delBtn").addClass("red");
        } else {
            editStatus = false;
            $(".editBtn").addClass("green");
        }
    } else if (btn == "addBtn") {
        if (status == true) {
            addStatus = true;
            $(".addBtn").removeClass("blue");
            $(".editBtn").addClass("green");
            $(".delBtn").addClass("red");
        } else {
            addStatus = false;
            $(".addBtn").addClass("blue");
        }
    } else if (btn == "delBtn") {
        if (status == true) {
            delStatus = true;
            $(".addBtn").addClass("blue");
            $(".editBtn").addClass("green");
            $(".delBtn").removeClass("red");
        } else {
            delStatus = false;
            $(".delBtn").addClass("red");
        }
    }

}
// 点击按钮时触发操作
$(".addBtn").click(function (e) {
    if ($(".leaflet-draw-section").css("display") == "none") {
        $(".leaflet-draw-section").css('display', 'block');
        $(".leaflet-draw-toolbar a").css('display', 'block');
    } else {
        $(".leaflet-draw-section").css('display', 'none');
        $(".leaflet-draw-toolbar a").css('display', 'none');
    }
});

$(".editBtn").click(function (e) {
    if (editStatus == false) {
        resetMap();
        setBtnStatus("editBtn", true);
    } else {
        resetMap();
        setBtnStatus("editBtn", false);
    }
    map.fitBounds(bounds);
    setBtnStatus("editBtn", false);
});


function importFile() {
    $.ajax({
        type: 'GET',
        url: 'downloadFile.do',
        dataType: 'html',
        data: $("#grid_check").serialize(),
        success: function (data) {
            location.assign(data);
        },
        error: function () {
            alert("导出失败");
        }
    });
}


function updateRect(rect, llat, llon, rlat, rlon) {
    var leftTop = L.latLng({lat: llat, lon: llon});
    var rightBottom = L.latLng({lat: rlat, lon: rlon});
    bounds = L.latLngBounds(leftTop, rightBottom);
    rect.setBounds(bounds);
}
// 根据坐标点绘制矩形
function drawRect(llat, llon, rlat, rlon) {
    var bounds = [
        [llat, llon],
        [rlat, rlon]
    ];
    rect = L.rectangle(bounds, {color: "#ff7800", weight: 1});
    rect.addTo(map);
    map.fitBounds(bounds);
    isRectHere = true;
}


$(".update-rect").click(function (e) {

    var llat = $("#llat").val();
    var llon = $("#llon").val();
    var rlat = $("#rlat").val();
    var rlon = $("#rlon").val();
    var bounds = [
        [llat, llon],
        [rlat, rlon]
    ];
    var isAccordRange = accordRange(llat, "lat") && accordRange(llon, "lon") && accordRange(rlat, "lat") && accordRange(rlon, "lon");

    if (isRectHere) {
        if (isAccordRange) {
            updateRect(rect, llat, llon, rlat, rlon);
            map.fitBounds(bounds);
        } else {
            alert("请输入正确的经纬度坐标！");
        }

    } else {
        if (isAccordRange) {
            drawRect(llat, llon, rlat, rlon);
            map.fitBounds(bounds);
        } else {
            alert("请输入正确的经纬度坐标！");
        }
    }
});
// 验证经纬度是否符合范围
function accordRange(data, type) {
    if (data == "") {
        return false;
    }
    var _data = Number(data);
    var reg = /^[+-]?\d*\.?\d{0,6}$/;
    if (reg.test(_data)) {
        if (type == "lat") {
            if (_data >= -90 && _data <= 90) {
                return true;
            } else {
                return false;
            }
        } else if (type == "lon") {
            if (_data >= -180 && _data <= 180) {
                return true;
            } else {
                return false;
            }
        }
    }
}


function pageListByOneTable(dbMSGs, page, layer) {
    // 单选 表 ,分页查询
    // dbMSGs 数据库信息
    // sign 标记当前查询是矩形查询还是网格查询
    // range 获取经纬度范围rbLon,ltLon,ltLat,rbLat
    var rbLon;
    var ltLon;
    var ltLat;
    var rbLat;

    if (sign == "grid") {
        // 网格查询
        rbLon = rbLonGLB;
        ltLon = ltLonGLB;
        ltLat = ltLatGLB;
        rbLat = rbLatGLB;

    } else if (sign == "region") {
        // 矩形查询
        rbLon = $("#rlon").val();// 大经
        ltLon = $("#llon").val(); // 小经
        ltLat = $("#llat").val();  // 大纬
        rbLat = $("#rlat").val();  // 小纬
    }

    var sensorType = $("#sensorType_k").val();// 传感器
    var resolution = $("#resolution_k").val();// 分辨率
    var uri = "";
    var dbType = dbMSGs.split(":")[0];
    if (dbType == "mysql") {
        // mysql
        uri = "getOneTableDataByPageFromMysql.do";
    }
    if (dbType == "mongo") {
        // mongodb
        uri = "getOneTableDataByPageFromMongodb.do";
    }
    if (dbType == "oracle") {
        // oracle
        uri = "getOneTableDataByPageFromOracle.do";
    }
    alert("uri:" + uri + "  dbMSGs :" + dbMSGs);
    $.ajax({
        type: "post",
        url: uri +
        "?rbLon=" + rbLon + "&ltLon=" + ltLon + "&ltLat=" + ltLat + "&rbLat=" + rbLat + "&layer=" + layer + "&page=" + page + "&dbMSGs=" + dbMSGs + "&sensorType=" + encodeURIComponent(sensorType) + "&resolution=" + encodeURIComponent(resolution),
        success: function (result) {

            $("#seleteOneTabelResult").html(result);
        },
        error: function (data) {
            alert("单表查询失败了！");
        }
    });


}

// 单选 表,点击查询
function selectOneTable(dbMSGs) {
    // dbMSGs 数据库信息
    // sign 标记当前查询是矩形查询还是网格查询
    // range 获取经纬度范围rbLon,ltLon,ltLat,rbLat

    var rbLon;
    var ltLon;
    var ltLat;
    var rbLat;
    if (sign == "grid") {
        // 网格查询
        rbLon = rbLonGLB;
        ltLon = ltLonGLB;
        ltLat = ltLatGLB;
        rbLat = rbLatGLB;

    } else if (sign == "region") {
        // 矩形查询
        rbLon = $("#rlon").val();// 大经
        ltLon = $("#llon").val(); // 小经
        ltLat = $("#llat").val();  // 大纬
        rbLat = $("#rlat").val();  // 小纬
    }

    var layer = scalevalue + 1;// 层级
    var sensorType = $("#sensorType_k").val();// 传感器
    var resolution = $("#resolution_k").val();// 分辨率
    $.ajax({
        type: "post",
        url: "getSourceDataByOneTableByPage.do" +
        "?rbLon=" + rbLon + "&ltLon=" + ltLon + "&ltLat=" + ltLat + "&rbLat=" + rbLat + "&layer=" + layer + "&sensorType=" + encodeURIComponent(sensorType) + "&resolution=" + encodeURIComponent(resolution),
        data: {
            dbMSGs: dbMSGs
        },
        success: function (result) {

            $("#seleteOneTabelResult").html(result);
        },
        error: function (data) {
            alert("请框选地图、指定数据库及数据表等信息");
        }
    });
}


//矩形查询
function regionSelect(singleTableDataIndex, currentTableTotalCount, currentPage, layer, isFirst) {
    $("#result_show_multi").html("");
    //mark_grid
    var idAndValueMSG = "";
    var hiddenInputs = $(".rectangle_check").find("input[class='mark_region']");
    for (var i = 0; i < hiddenInputs.length; i++) {
        var oneHiddenInputValueId = hiddenInputs[i].value;
        var oneHiddenInputValue = $("#" + oneHiddenInputValueId).val();//多个值之间用，分割 即：id:kkkk,lll,kk
        if (oneHiddenInputValue != undefined && oneHiddenInputValue.length > 0 && oneHiddenInputValue != "") {//判断可能不成立
            idAndValueMSG = idAndValueMSG + oneHiddenInputValueId + ":" + oneHiddenInputValue + ";";
        }
    }
    var lastIndex = idAndValueMSG.lastIndexOf(";");
    var conditions = idAndValueMSG.substring(0, lastIndex);

    var selectType = "region";// 标记为框选查询s

    var rbLon = bounds.getSouthEast().lng.toFixed(6);// 大经

    var ltLon = bounds.getNorthWest().lng.toFixed(6); // 小经

    var ltLat = bounds.getNorthWest().lat.toFixed(6);  // 大纬

    var rbLat = bounds.getSouthEast().lat.toFixed(6);  // 小纬

    layer = scalevalue + 1;// 层级
//	 数据类型

    $.ajax({
        type: "post",
        url: "getSourceDataByPage.do",
        data: {
            conditions: conditions,
            rbLon: rbLon,
            rbLat: rbLat,
            ltLon: ltLon,
            ltLat: ltLat,
            layer: layer,
            selectType: selectType,
            sourceTypeMSGs: sourceTypeMSGs,
            singleTableDataIndex: singleTableDataIndex,
            currentTableTotalCount: currentTableTotalCount,
            currentPage: currentPage
        },
        dataType: "json",
        success: function (finalResult) {

            if (isFirst != '1') {
                // 只有第一次的时候让其改变元数据类型
                $("#kinners_content").html(finalResult.sourceDataType);
            }
            $("#result_show_multi").html(finalResult.mapResult);
            $(".results span:last").remove();
            $("#result_import_file").html("");
            $("#result_import_file").html(finalResult.export_str);


            if (isFirst != '1') {
                // 获取图层数据
                $.ajax({
                    type: "post",
                    url: "getImageGeosotBlock.do",
                    data: {
                        conditions: conditions,
                        rbLon: rbLon,
                        rbLat: rbLat,
                        ltLon: ltLon,
                        ltLat: ltLat,
                        layer: layer,
                        selectType: selectType,
                        singleTableDataIndex: singleTableDataIndex,
                        currentTableTotalCount: currentTableTotalCount,
                        currentPage: currentPage
                    },
                    dataType: "json",
                    success: function (msg) {

                        L.Distribution().onUpdate(msg);

                    },
                    error: function (data) {
                        alert("请框选地图、指定数据库及数据表等信息");
                    }
                });
            }

            // 获取图层数据
        },
        error: function (data) {
            alert("请框选地图、指定数据库及数据表等信息");
        }
    });

}
var geogridjson;
var gridint;

var addGrid = function (e) {
    mapbounds = map.getBounds();
    latLngBounds = L.latLngBounds(mapbounds.getNorthEast(), mapbounds.getSouthWest());
    var zoomLevel = scalevalue;
    var r_layer = zoomLevel + 1;
    $("#zoom-level").attr("value", r_layer);
    var bounds = {
        southWest: [latLngBounds.getWest(), latLngBounds.getSouth()],
        northEast: [latLngBounds.getEast(), latLngBounds.getNorth()]
    };
    var NElng = bounds.northEast[0];
    var SWlng = bounds.southWest[0];
    var NElat = bounds.northEast[1];
    var SWlat = bounds.southWest[1];
    (NElng > 180) && (NElng = 180);
    (SWlng < -180) && (SWlng = -180);
    $.ajax({
        type: "post",
        async: false,
        url: "getGridData.do?layer=" + r_layer,
        data: {
            leftLatlng: NElat + "," + SWlng,
            rightLatlng: SWlat + "," + NElng,
        },
        success: function (msg) {
            if (gridint) {
                window.clearInterval(gridint);
            }
            // 清楚geogridjson
            if (map.hasLayer(geogridjson)) {
                map.removeLayer(geogridjson);
                map.removeLayer(groupMarker);
                markers = [];
            }

            var jsonArr = eval(msg);// jS函数 从string To
                                    // Json（数组或者对象）
            console.log(jsonArr[0]);
            var count = 1;
            geogridjson = L.geoJson(jsonArr[0], {
                style: gridstyle,
                onEachFeature: onEachFeatureData,
            }).addTo(map);

            gridint = setInterval(function () {
                if (count < jsonArr.length) {
                    geogridjson.addData(jsonArr[count]);
                } else {
                    window.clearInterval(gridint);
                    groupMarker = L.layerGroup(markers).addTo(map);
                    geogridjson.bringToBack();
                }
                count++;
            }, 1);
        },
        error: function (data) {
            alert("addGrid_error" + data);
        }

    });
};

function gridClick() {
    sourceTypeMSGs = "";
    $("#result_show_multi").html("");
    $(".leaflet-control-scale-slide").css("display", "none");
    $(".leaflet-control-distribution-slide").css("display", "none");
    isGridHere = true;
    scalevalue = 5;
//    	addGrid();
    sign = "grid";
}
//加载网格
var oracleGridJson;
var mysqlGridJson;
var mongoGridJson;
var postgresqlGridJson;
$(".rectangle").click(function () {
    sourceTypeMSGs = "";
    $(".result").hide();
    $(".leaflet-control-scale-slide").css("display", "none");
    $(".leaflet-control-distribution-slide").css("display", "none");
    sign = "region";
    //先删除旧图层
    if (map.hasLayer(mongoGridJson)) {
        map.removeLayer(mongoGridJson);
    }
    if (map.hasLayer(mysqlGridJson)) {
        map.removeLayer(mysqlGridJson);
    }
    if (map.hasLayer(oracleGridJson)) {
        map.removeLayer(oracleGridJson);
    }
    if (map.hasLayer(postgresqlGridJson)) {
        map.removeLayer(postgresqlGridJson);
    }
});
$("#btn_group").show();
$(".rectangle").click();
map.on('zoomend', function (e) {
    if (isGridHere) {
        drawGeoSotGrid(scaleLayer);
    }
});
map.on('dragend', function (e) {

    if (isGridHere) {
        drawGeoSotGrid(scaleLayer);
    }
});
var markers = [];
var groupMarker;
function getOpacity(d) {
    return d == 0 ? 0 : 0.5;
}
function getColor(d) {
    return d > 5000 ? '#Bd0026' :
        d > 2000 ? '#E31A1C' :
            d > 1000 ? '#FC4E2A' :
                d > 500 ? '#FD8D3C' :
                    d > 200 ? '#FEB24C' :
                        d > 100 ? '#FED976' : '#FFeDa0';
}
function gridstyle(feature) {
    return {
        weight: 2,
        opacity: 1,
// color: 'white',
        color: '#53FF53',
        dashArray: '3',
        fillOpacity: getOpacity(feature.properties.density),
        fillColor: getColor(feature.properties.density),
    };
}

var sourceInt;
var ltLatGLB;// 全局的经纬度，仅在网格查询范围内有效使用
var ltLonGLB;
var rbLatGLB;
var rbLonGLB;
//网格查询
var hiddenInputs;
/*//地图边界
 var mapbounds = map.getBounds();
 //边界经纬度
 var latLngBounds = L.latLngBounds(mapbounds.getNorthEast(), mapbounds.getSouthWest());

 var bounds={southWest:[latLngBounds.getWest(),latLngBounds.getSouth()],
 northEast:[latLngBounds.getEast(),latLngBounds.getNorth()]};
 alert(bounds.southWest[1] + "," + bounds.northEast[0]);*/
//点击网格加载地图数据
function onEachFeatureData(feature, layer) {
    var count = feature.properties.density;
    layer.myIcon = L.divIcon({className: 'my-div-icon', html: count,});
    layer.count = count,
        layer.gridsBounds = feature.geometry.coordinates;
    layer.on({
//            		click: showcount,
        click: function () {
            updateGridForm(layer.gridsBounds)
        }
    });
    if (count != 0) {
        var singlemarker = L.marker(feature.properties.gridCountBounds, {icon: layer.myIcon});
        markers.push(singlemarker);
    }

}
// 矩形查询时，更新表单中经纬度
function updateForm(bounds) {
    var leftTop = bounds.getNorthWest();
    var rightBottom = bounds.getSouthEast();
    var llat = leftTop.lat.toFixed(6);
    var llon = leftTop.lng.toFixed(6);
    var rlat = rightBottom.lat.toFixed(6);
    var rlon = rightBottom.lng.toFixed(6);

    //下边是暂时写死的
    $("#conditionlist div input[name='LEFTLONGITUDE']").val(llon);
    $("#conditionlist div input[name='LEFTLATITUDE']").val(llat);
    $("#conditionlist div input[name='RIGHTLATITUDE']").val(rlat);
    $("#conditionlist div input[name='RIGHTLONGITUDE']").val(rlon);
    if($("#conditionlist1").length>0){
        $("#conditionlist1 div input[name='LEFTLONGITUDE']").val(llon);
        $("#conditionlist1 div input[name='LEFTLATITUDE']").val(llat);
        $("#conditionlist1 div input[name='RIGHTLATITUDE']").val(rlat);
        $("#conditionlist1 div input[name='RIGHTLONGITUDE']").val(rlon);
    }
    if($("#conditionlist2").length>0){
        $("#conditionlist2 div input[name='LEFTLONGITUDE']").val(llon);
        $("#conditionlist2 div input[name='LEFTLATITUDE']").val(llat);
        $("#conditionlist2 div input[name='RIGHTLATITUDE']").val(rlat);
        $("#conditionlist2 div input[name='RIGHTLONGITUDE']").val(rlon);
    }
}
// 网格查询时，更新表单中经纬度
function updateGridForm(bounds) {

    var lt_lng = bounds._southWest.lng;
    var lt_lat = bounds._northEast.lat;
    var rb_lng = bounds._northEast.lng;
    var rb_lat = bounds._southWest.lat;
    var zsjd = $("#conditionlist div input[name='ZSJD']").val();
    if (typeof(zsjd) == 'undefined') {
        alert("请选择数据类型")
        return;
    }
    //下边是暂时写死的
    $("#conditionlist div input[name='ZSJD']").val(lt_lng);
    $("#conditionlist div input[name='ZSWD']").val(lt_lat);
    $("#conditionlist div input[name='YXWD']").val(rb_lat);
    $("#conditionlist div input[name='YXJD']").val(rb_lng);

    var layer = scalevalue + 1;
    var sourceId = $("#data_product_type_grid").val();
    var typeId = $("#select_dictionary_type_grid").val();

    if (typeof(sourceId) == 'undefined' || "" == sourceId || sourceId == null) {
        alert("请选择对应的产品!");
        $("#grid_check").css("display", "block");
        return;
    }
    if (typeof(typeId) == 'undefined' || "" == typeId || typeId == null) {
        alert("请选择对应的字典类型!");
        $("#grid_check").css("display", "block");
        return;
    }

    $.ajax({
        type: 'GET',
        url: 'getSourceDataByCondition.do?searchType=rect&layer=' + layer,
        dataType: 'json',
        //data :
        data: $("#grid_check").serialize(),
        success: function (data) {
//                	   alert(data.mapResult);
            $(".grid_check").css("display", "none");
            $(".rectangle_check").css("display", "none");
            $(".results").css("display", "block");
            $("#result_show_multi").show();
            $("#result_show_multi").empty();
            $("#result_show_multi").html(data.mapResult);

            //先删除旧图层
            if (map.hasLayer(mongoGridJson)) {
                map.removeLayer(mongoGridJson);
            }
            if (map.hasLayer(mysqlGridJson)) {
                map.removeLayer(mysqlGridJson);
            }
            if (map.hasLayer(oracleGridJson)) {
                map.removeLayer(oracleGridJson);
            }
            if (map.hasLayer(postgresqlGridJson)) {
                map.removeLayer(postgresqlGridJson);
            }
            //加载地图数据
            /*	mongoGridJson = L.geoJson(data.mongoDataOnMap, {
             style : mapColorStyle,
             onEachFeature : onEachFeature
             }).addTo(map);*/

            if (data.mongoDataOnMap && data.mongoDataOnMap.features[0].geometry.type == "Point") {
                mongoGridJson = L.geoJson(data.mongoDataOnMap, {
                    onEachFeature: onEachFeature,
                    pointToLayer: function (feature, latlng) {
                        return L.circleMarker(latlng, {
                            radius: 6,
                            fillColor: '#ff0000',
                            color: "#fff",
                            weight: 1,
                            opacity: 1,
                            fillOpacity: 0.8
                        });
                    }
                }).addTo(map);
            } else {
                mongoGridJson = L.geoJson(data.mongoDataOnMap, {
                    style: mapColorStyle,
                    onEachFeature: onEachFeature
                }).addTo(map);
            }


            /*mysqlGridJson = L.geoJson(data.mysqlDataOnMap, {
             style : mapColorStyle,
             onEachFeature : onEachFeature
             }).addTo(map);*/
            if (data.mysqlDataOnMap && data.mysqlDataOnMap.features[0].geometry.type == "Point") {
                mysqlGridJson = L.geoJson(data.mysqlDataOnMap, {
                    onEachFeature: onEachFeature,
                    pointToLayer: function (feature, latlng) {
                        return L.circleMarker(latlng, {
                            radius: 6,
                            fillColor: '#0000ff',
                            color: "#fff",
                            weight: 1,
                            opacity: 1,
                            fillOpacity: 0.8
                        });
                    }
                }).addTo(map);
            } else {
                mysqlGridJson = L.geoJson(data.mysqlDataOnMap, {
                    style: mapColorStyle,
                    onEachFeature: onEachFeature
                }).addTo(map)
            }


            /*	oracleGridJson = L.geoJson(data.oracleDataOnMap, {
             style : mapColorStyle,
             onEachFeature : onEachFeature
             }).addTo(map);*/

            if (data.oracleDataOnMap && data.oracleDataOnMap.features[0].geometry.type == "Point") {
                oracleGridJson = L.geoJson(data.oracleDataOnMap, {
                    onEachFeature: onEachFeature,
                    pointToLayer: function (feature, latlng) {
                        return L.circleMarker(latlng, {
                            radius: 6,
                            fillColor: '#0000ff',
                            color: "#fff",
                            weight: 1,
                            opacity: 1,
                            fillOpacity: 0.8
                        });
                    }
                }).addTo(map);
            } else {
                oracleGridJson = L.geoJson(data.oracleDataOnMap, {
                    style: mapColorStyle,
                    onEachFeature: onEachFeature
                }).addTo(map)
            }

            /*postgresqlGridJson = L.geoJson(data.postgresqlDataOnMap, {
             style : mapColorStyle,
             onEachFeature : onEachFeature
             }).addTo(map);*/

            if (data.postgresqlDataOnMap && data.postgresqlDataOnMap.features[0].geometry.type == "Point") {
                postgresqlGridJson = L.geoJson(data.postgresqlDataOnMap, {
                    onEachFeature: onEachFeature,
                    pointToLayer: function (feature, latlng) {
                        return L.circleMarker(latlng, {
                            radius: 6,
                            fillColor: '#ff7800',
                            color: "#fff",
                            weight: 1,
                            opacity: 1,
                            fillOpacity: 0.8
                        });
                    }
                }).addTo(map);
            } else {
                postgresqlGridJson = L.geoJson(data.postgresqlDataOnMap, {
                    style: mapColorStyle,
                    onEachFeature: onEachFeature
                }).addTo(map)
            }

            $("#result_import_file").show();
            $("#result_import_file").empty();
            $("#result_import_file").html(data.exportStr);
        },
        error: function () {
            alert('select_dictionary_type_grid error!');
        }
    });
}
var showcount = function (singleTableDataIndex, currentTableTotalCount, currentPage, layer, isFirst) {
    //清空结果显示区域
    $("#result_show_multi").html("");
    //清空地图上的其他的小方块
    if (isFirst == 0) {
        $(".delBtn").click();
    }

    if (singleTableDataIndex == '[object Object]' || singleTableDataIndex == 'undefined') {
        singleTableDataIndex = 0;
    }
    if (currentTableTotalCount == 'undefined') {
        currentTableTotalCount = 0;
    }
    if (currentPage == 'undefined') {
        currentPage = 1;
    }

    if (isFirst != '1') {
        // 只有第一次的时候让其分配网格的经纬度
        // 点击网格进行查询时调用
        latlngArr = (this.gridsBounds + "").split(",");
        ltLatGLB = latlngArr[1];
        ltLonGLB = latlngArr[0];
        rbLatGLB = latlngArr[3];
        rbLonGLB = latlngArr[4];
    }

    var selectType = "grid";
    var ltLat = ltLatGLB;
    var ltLon = ltLonGLB;
    var rbLat = rbLatGLB;
    var rbLon = rbLonGLB;
    var idAndValueMSG = "";
    hiddenInputs = $(".grid_check").find("input[class='mark_grid']");
    for (var i = 0; i < hiddenInputs.length; i++) {
        var oneHiddenInputValueId = hiddenInputs[i].value;
        var oneHiddenInputValue = $("#" + oneHiddenInputValueId).val();//多个值之间用，分割 即：id:kkkk,lll,kk

        if (oneHiddenInputValue != undefined && oneHiddenInputValue.length > 0 && oneHiddenInputValue != "") {//判断可能不成立
            idAndValueMSG = idAndValueMSG + oneHiddenInputValueId + ":" + oneHiddenInputValue + ";";
        }
    }
    var lastIndex = idAndValueMSG.lastIndexOf(";");
    var conditions = idAndValueMSG.substring(0, lastIndex);

    layer = scalevalue + 1;// 层级

//        		// 数据类型

    $.ajax({
        type: "post",
        url: "getSourceDataByPage.do",
        data: {
            conditions: conditions,
            rbLon: rbLon,
            rbLat: rbLat,
            ltLon: ltLon,
            ltLat: ltLat,
            layer: layer,
            selectType: selectType,
            sourceTypeMSGs: sourceTypeMSGs,
            singleTableDataIndex: singleTableDataIndex,
            currentTableTotalCount: currentTableTotalCount,
            currentPage: currentPage
        },
        dataType: "json",
        success: function (finalResult) {
            $(".grid_check").css("display", "none");
            $(".rectangle_check").css("display", "none");
            $(".results").css("display", "block");
            if (isFirst != '1') {
                // 只有第一次的时候让其改变元数据类型
                $("#kinners_content").html(finalResult.sourceDataType);
            }

            $("#result_show_multi").html(finalResult.mapResult);
            $(".results span:last").remove();
            $("#result_import_file").html("");
            $("#result_import_file").html(finalResult.export_str);

            if (isFirst != '1') {
                // 获取图层数据
                $.ajax({
                    type: "post",
                    url: "getImageGeosotBlock.do",
                    data: {
                        conditions: conditions,
                        rbLon: rbLon,
                        rbLat: rbLat,
                        ltLon: ltLon,
                        ltLat: ltLat,
                        layer: layer,
                        selectType: selectType

                    },
                    dataType: "json",
                    success: function (msg) {

                        L.Distribution().onUpdate(msg);

                    },
                    error: function () {
                        alert("地图数据加载失败");
                    }
                });
            }

        },
        error: function (data) {
            alert("error" + data);
        }
    });
};
function mapColorStyle(feature) {
    var colorValue = feature.properties.colorValue;
    return {
        weight: 2,
        opacity: 1,
        color: colorValue == 0 ? '#e69373' : colorValue == 1 ? '#CCCC00' : colorValue == 2 ? '#FF66FF' : colorValue == 3 ? '#EEEEEE' : colorValue == 4 ? '#CCFF00' : '#FF0099',
        dashArray: '',
        fillOpacity: 0.7,
        fillColor: colorValue == 0 ? '#e69373' : colorValue == 1 ? '#CCCC00' : colorValue == 2 ? '#FF66FF' : colorValue == 3 ? '#EEEEEE' : colorValue == 4 ? '#CCFF00' : '#FF0099'
    };
}


function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 2,
        color: '',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera) {
        layer.bringToFront();
    }

    updata_source(layer.feature.properties);
// info.update(layer.feature.properties);
}

function resetHighlight(e) {
    // geojson.resetStyle(e.target);
// info.update();
}
//点击小点点
function openThumbnail(e) {
    var slcgrid = $(".slicegrid");
    if ($('.toolbar').position().left == 0) {
        slcgrid.css({"display": "block", "left": 315, "position": "absolute"});
        slcgrid.animate({"bottom": 0});
    }
    else {
        slcgrid.css({"display": "block", "left": 0});
        slcgrid.animate({"bottom": 0});
    }


}
var i = 1;
function updata_source(props) {
    if (props.map) {
        var data = JSON.stringify(props.map);
        data = $.parseJSON(data);
        $(".slicegrid_left").html("<img src='media/image/" + i + ".PNG'>");
        i++;
        if (i == 21) {
            i = 1;
        }
        ;
        $(".slicegrid_right").html("<table><caption>数据信息</caption></table>");

        for (var key in data) {
            $(".slicegrid_right table").append("<tr><td>" + key + "</td><td>" + data[key] + "</td></tr>");

        }
//		if(props.mongo){
//			$(".slicegrid_right").html("");
//			$(".slicegrid_right").html( 
//					"<table><caption>"+props.mongo.dataname+"</caption>"+
//	                    "<tr>" +
//	                    "<td> 拍摄日期：</td><td>" + props.mongo.shortTime + "</td></tr>" +
//	                    "<tr ><td> 传感器：</td><td>" + props.mongo.sensorType + "</td></tr>"+
//	                    "<tr ><td > 剖分编码：</td><td>" + props.mongo.ltLon + "</td>"+
//	                    "</tr></table>"
//			);		
//		}
    }
    if (props.imageMap) {
        var data = JSON.stringify(props.imageMap);
        data = $.parseJSON(data);
        $(".slicegrid_left").html("");
        $(".slicegrid_right").html("<table><caption>数据信息</caption></table>");

        for (var key in data) {
            $(".slicegrid_right table").append("<tr><td>" + key + "</td><td>" + data[key] + "</td></tr>");

        }
    }

};
function onEachFeature2(feature, layer) {
    layer.on({
        mouseover: highlightFeature2,
        mouseout: resetHighlight,
        click: openThumbnail
    });
}

function highlightFeature2(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 2,
        color: '#000000',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera) {
        layer.bringToFront();
    }

    updata_source(layer.feature.properties);
// info.update(layer.feature.properties);
}


function resetHighlight(e) {
    // geojson.resetStyle(e.target);
// info.update();
}
//点击小点点
function openThumbnail(e) {
//    var slcgrid = $(".slicegrid");
//    if ($('.toolbar').position().left == 0) {
//        slcgrid.css({"display": "block", "left": 315, "position": "absolute"});
//        slcgrid.animate({"bottom": 0});
//    }
//    else {
//        slcgrid.css({"display": "block", "left": 0});
//        slcgrid.animate({"bottom": 0});
//}

}
$(function () {
    // geojson数据加载
    var num = 1;
    $(".leaflet-control-distribution-imgs").click(function () {
        num++;
        if (num % 2 == 1) {
            $(".leaflet-control-distribution-slide").show();
        } else {
            $(".leaflet-control-distribution-slide").hide();
        }
        ;
    });
});

// scale控件内的点击事件
// 手动画网格函数
var hand_Graticule = function (zoomlevel) {
    if (hand_flag && !flag) {
        mapbounds = map.getBounds();
        latLngBounds = L.latLngBounds(mapbounds.getNorthEast(), mapbounds.getSouthWest());
        if (map.hasLayer(mapGraticule)) {
            map.removeLayer(mapGraticule);
        }
        var zoomLevel = zoomlevel;
        var bounds = {// 经度 纬度
            northEast: [latLngBounds.getWest(), latLngBounds.getSouth()],
            southWest: [latLngBounds.getEast(), latLngBounds.getNorth()]
        };
        var boundstyle = {color: '#777', weight: 1, opacity: 0.5};
        mapGraticule = L.graticule({style: boundstyle, bounds: bounds, zoomLevel: zoomLevel});
        mapGraticule.addTo(map);
    }

};
// 加载自定义控件graticule经纬网格
var flag = true;
var hand_flag = false;
var mapbounds = map.getBounds();// 获取地图视图范围

var latLngBounds = L.latLngBounds(mapbounds.getNorthEast(), mapbounds.getSouthWest());
// latLngBounds.toBBoxString
// ();//'southwest_lng,southwest_lat,northeast_lng,northeast_lat'
//
//var mapGraticule = L.graticule({
//    style: {
//        color: '#777',
//        weight: 1,
//        opacity: 0.5
//    },
//    bounds: {// 经度 纬度
//        northEast: [latLngBounds.getWest(), latLngBounds.getSouth()],
//        southWest: [latLngBounds.getEast(), latLngBounds.getNorth()]
//    },
//    zoomLevel: 4// 地图层级
//}).addTo(map);

var draw_Graticule = function () {
    if (flag && !hand_flag) {
        mapbounds = map.getBounds();
        latLngBounds = L.latLngBounds(mapbounds.getNorthEast(), mapbounds.getSouthWest());
        if (map.hasLayer(mapGraticule)) {
            map.removeLayer(mapGraticule);
        }
        var zoomLevel = map.getZoom();
        var bounds = {// 经度 纬度
            northEast: [latLngBounds.getWest(), latLngBounds.getSouth()],
            southWest: [latLngBounds.getEast(), latLngBounds.getNorth()]
        };
        var boundstyle = {color: '#777', weight: 1, opacity: 0.5};
        mapGraticule = L.graticule({style: boundstyle, bounds: bounds, zoomLevel: zoomLevel});
        mapGraticule.addTo(map);
    }

};


//结果页中单一类型查询
function selectByOneSourceDataType(selectTotalSourceTypeName, selectType, self) {
    var singleTableDataIndex = 0;
    var currentTableTotalCount = 0;
    var currentPage = 1;
    var isFirst = 1;
    var layer;
    $(".sourcetypeid").val($(self).attr("id"));

    //在查询结果页选择tip页的时候调用此方法     result_show_one
    if (selectType == "region") {
        //框选单类型查询
        regionSelectOneType(selectTotalSourceTypeName, singleTableDataIndex, currentTableTotalCount, currentPage, layer, isFirst);

    } else if (selectType == "grid") {
        //网格单类型查询
        showcountSelectOneType(selectTotalSourceTypeName, singleTableDataIndex, currentTableTotalCount, currentPage, layer, isFirst);
    }

}

//框选点击单类型查询结果调用
function regionSelectOneType(selectTotalSourceTypeName, singleTableDataIndex, currentTableTotalCount, currentPage, layer, isFirst) {
    $("#result_show_multi").html("");
    sourceTypeMSGs = "";
    /*
     * 框选 查询的点击事件 var rbLon = $("#llon").val();//小经 var ltLon =
     * $("#rlon").val(); //大经
     */
    var selectType = "region";// 标记为框选查询

    var idAndValueMSG = "";
    var hiddenInputs = $(".rectangle_check").find("input[class='mark_region']");
    for (var i = 0; i < hiddenInputs.length; i++) {
        var oneHiddenInputValueId = hiddenInputs[i].value;
        var oneHiddenInputValue = $("#" + oneHiddenInputValueId).val();//多个值之间用，分割 即：id:kkkk,lll,kk

        if (oneHiddenInputValue != undefined && oneHiddenInputValue.length > 0 && oneHiddenInputValue != "") {//判断可能不成立
            idAndValueMSG = idAndValueMSG + oneHiddenInputValueId + ":" + oneHiddenInputValue + ";";
        }
    }
    var lastIndex = idAndValueMSG.lastIndexOf(";");
    var conditions = idAndValueMSG.substring(0, lastIndex);
    var selectType = "region";// 标记为框选查询s

    var rbLon = bounds.getSouthEast().lng.toFixed(6);// 大经              //此处有问题！！！！！！！！！！！！！！！！！1

    var ltLon = bounds.getNorthWest().lng.toFixed(6); // 小经

    var ltLat = bounds.getNorthWest().lat.toFixed(6);  // 大纬

    var rbLat = bounds.getSouthEast().lat.toFixed(6);  // 小纬
    var
        layer = scalevalue + 1;// 层级
    // 数据类型
    sourceTypeMSGs = selectTotalSourceTypeName + ",";


    $.ajax({
        type: "post",
        url: "getSourceDataByPage.do",
        data: {
            conditions: conditions,
            rbLon: rbLon,
            rbLat: rbLat,
            ltLon: ltLon,
            ltLat: ltLat,
            layer: layer,
            sourceTypeMSGs: sourceTypeMSGs,
            selectType: selectType,
            singleTableDataIndex: singleTableDataIndex,
            currentTableTotalCount: currentTableTotalCount,
            currentPage: currentPage

        },
        dataType: "json",
        success: function (result) {
            $("#result_show_multi").html(result.mapResult);
            $("#result_import_file").html("");
            $("#result_import_file").html(result.export_str);
        },
        error: function (data) {
            alert("请框选地图、指定数据库及数据表等信息");
        }
    });

}

//网格点击单类型查询结果调用
var showcountSelectOneType = function (selectTotalSourceTypeName, singleTableDataIndex, currentTableTotalCount, currentPage, layer, isFirst) {

    $("#result_show_multi").html("");
    sourceTypeMSGs = "";
    if (singleTableDataIndex == '[object Object]' || singleTableDataIndex == 'undefined') {
        singleTableDataIndex = 0;
    }
    if (currentTableTotalCount == 'undefined') {
        currentTableTotalCount = 0;
    }
    if (currentPage == 'undefined') {
        currentPage = 1;
    }

    if (isFirst != '1') {
        // 只有第一次的时候让其分配网格的经纬度
        // 点击网格进行查询时调用
        var latlngArr = (this.gridsBounds + "").split(",");
        ltLatGLB = latlngArr[1];
        ltLonGLB = latlngArr[0];
        rbLatGLB = latlngArr[3];
        rbLonGLB = latlngArr[4];
    } else {
        // isFirst = 1 即 不是第一次了
    }

    var selectType = "grid";

    var ltLat = ltLatGLB;
    var ltLon = ltLonGLB;
    var rbLat = rbLatGLB;
    var rbLon = rbLonGLB;

    var idAndValueMSG = "";
    var hiddenInputs = $(".grid_check").find("input[class='mark_grid']");
    for (var i = 0; i < hiddenInputs.length; i++) {
        var oneHiddenInputValueId = hiddenInputs[i].value;
        var oneHiddenInputValue = $("#" + oneHiddenInputValueId).val();//多个值之间用，分割 即：id:kkkk,lll,kk
        if (oneHiddenInputValue != undefined && oneHiddenInputValue.length > 0 && oneHiddenInputValue != "") {//判断可能不成立
            idAndValueMSG = idAndValueMSG + oneHiddenInputValueId + ":" + oneHiddenInputValue + ";";
        }
    }
    var lastIndex = idAndValueMSG.lastIndexOf(";");
    var conditions = idAndValueMSG.substring(0, lastIndex);

    layer = scalevalue + 1;// 层级
    sourceTypeMSGs = selectTotalSourceTypeName + ",";

    $.ajax({
        type: "post",
        url: "getSourceDataByPage.do",
        data: {
            conditions: conditions,
            rbLon: rbLon,
            rbLat: rbLat,
            ltLon: ltLon,
            ltLat: ltLat,
            layer: layer,
            selectType: selectType,
            sourceTypeMSGs: sourceTypeMSGs,
            singleTableDataIndex: singleTableDataIndex,
            currentTableTotalCount: currentTableTotalCount,
            currentPage: currentPage
        },
        dataType: "json",
        success: function (result) {

            $(".grid_check").css("display", "none");
            $(".rectangle_check").css("display", "none");
            $(".results").css("display", "block");

            $("#result_show_multi").html(result.mapResult);
            $("#result_import_file").html("");
            $("#result_import_file").html(result.export_str);

        },
        error: function (data) {
            alert("查询失败" + data);
        }
    });

};
//导出文件

function download(selectType, self) {

    alert("scalevalue:" + scalevalue);
    // 类型id
    var sourceTypeId = $(".sourcetypeid").val();

    alert("sourceTypeId:" + sourceTypeId);

    // 层级
    var layer = scalevalue + 1;
    var rbLon;
    var ltLon;
    var ltLat;
    var rbLat;
    // 矩形
    if (selectType == "region") {// 标记为框选查询
        rbLon = $("#rlon").val();// 大经
        ltLon = $("#llon").val(); // 小经
        ltLat = $("#llat").val();  // 大纬
        rbLat = $("#rlat").val();  // 小纬
    }

    alert("ltLatGLB:" + ltLatGLB);
    // 网格
    if (selectType == "grid") {
        ltLat = ltLatGLB;
        ltLon = ltLonGLB;
        rbLat = rbLatGLB;
        rbLon = rbLonGLB;
    }

    $.ajax({
        type: "post",
        url: "download.do",
        data: {
            layer: layer,
            ltLat: ltLat,
            ltLon: ltLon,
            rbLat: rbLat,
            rbLon: rbLon,
            sourceTypeId: sourceTypeId
        },
        success: function (data) {
            location.assign(data);
        },
        error: function (data) {
            alert("导出失败");
        }
    });

}


/*统计图模块*/
function map_pie() {

    layer.open({
        type: 1,
        title: ['饼形图', 'color:white;border-bottom:1px solid #666;background:#6396fc'],
        area: ['950px', '600px'],
        shade: [0.3, '#000'],
        shadeClose: false, //点击遮罩关闭
        skin: 'poplayer',
        content: '<div id="mappie_container" style="width:950px;height:557px;"></div>'
    });
    var pieContainer = $('#mappie_container').get(0);
    var pieChart = echarts.init(pieContainer);
    var app = {};
    var option = {
        backgroundColor: '#424749',
        title: {
            text: '访问来源饼形图',
            left: 'center',
            top: 20,
            textStyle: {
                color: '#ccc'
            }
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a}<br />{b}:{c}({d}%)'
        },
        visualMap: {
            show: false,
            min: 80,
            max: 600,
            inRange: {
                colorLightness: [0, 1]
            }
        },
        series: [{
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
            data: [],
            roseType: 'radius',
            label: {
                normal: {
                    textStyle: {
                        color: 'rgba(255,255,255,0.3)'
                    }
                }
            },
            labelLine: {
                normal: {
                    lineStyle: {
                        color: 'rgba(255,255,255,0.3)'
                    },
                    smooth: 0.2,
                    length: 10,
                    length2: 20
                }
            },
            itemStyle: {
                normal: {
//		                    color: '#ff0',
                    shadowBlur: 200,
                    shadowColor: 'rgba(0,0,0,0.5)'
                }
            }
        }]
    };

    //设置初始化选项
    pieChart.setOption(option);
    pieChart.showLoading();
    //发送请求，返回数据
    var ltLat = ltLatGLB;
    var ltLon = ltLonGLB;
    var rbLat = rbLatGLB;
    var rbLon = rbLonGLB;
    var cj = scalevalue + 1;// 层级

    var idAndValueMSG = "";
    hiddenInputs = $(".grid_check").find("input[class='mark_grid']");
    for (var i = 0; i < hiddenInputs.length; i++) {
        var oneHiddenInputValueId = hiddenInputs[i].value;
        var oneHiddenInputValue = $("#" + oneHiddenInputValueId).val();//多个值之间用，分割 即：id:kkkk,lll,kk

        if (oneHiddenInputValue != undefined && oneHiddenInputValue.length > 0 && oneHiddenInputValue != "") {//判断可能不成立
            idAndValueMSG = idAndValueMSG + oneHiddenInputValueId + ":" + oneHiddenInputValue + ";";
        }
    }
    var lastIndex = idAndValueMSG.lastIndexOf(";");
    var conditions = idAndValueMSG.substring(0, lastIndex);
    $.ajax({
        type: 'post',
        async: false,
        url: 'statistic.do',
        dataType: 'json',
        data: {
            ltLat: ltLat,
            ltLon: ltLon,
            rbLat: rbLat,
            rbLon: rbLon,
            cj: cj,
            conditions: conditions
        },
        success: function (data) {
            pieChart.hideLoading();
            pieChart.setOption({
                series: [{
                    data: data.data.sort(function (a, b) {
                        return a.value - b.value;
                    })
                }]
            });
        },
        error: function () {
        }
    });
}
