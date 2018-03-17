/*created by gyj*/
$(function () {
    var searchPanel = $('#search-btn'); //场景查询面板
    var accordionPannel = $('#accordion'); //手风琴场景面板
    var addSceneBtn = $('.add-scene');  //添加业务场景按钮
    var sideSearch = $('.side-search');   //侧边栏
    var reslutPannel = $('.result');      //结果面板
    // 地图查询
    var oracleJson = L.layerGroup();
    var mysqlJson = L.layerGroup();
    var mongoJson = L.layerGroup();
    var postgresqlJson = L.layerGroup();
    var dmJson = L.layerGroup();
    var dataJson = L.layerGroup();
    var dbGeoJson = L.layerGroup().addTo(map);
    //初始化滚动条
    accordionPannel.mCustomScrollbar({
        scrollInertia: 300
    });
    //$('#result-tab-table').mCustomScrollbar({
    //    scrollInertia: 300
    //});
    //添加圆盘控件
    L.control.pan().addTo(map);
    //加载自定义控件zoomslider缩放
    L.control.zoomslider().addTo(map);

    var panControl = $('.leaflet-control-container .leaflet-control-pan'); //漫游控件
    var zoomSliderControl = $('.leaflet-control-container .leaflet-control-zoomslider'); //缩放控件
    var drawControl = $("#btn_group");    //draw 控件
    //toggle侧边栏
    var onOff = true;
    $('#collapse_btn').click(function () {
        if (onOff) {
            sideSearch.animate({"left": -265}, 500);
            reslutPannel.animate({"left": 0}, 500);
            console.log(panControl);
            panControl.animate({"left": 10}, 500);
            zoomSliderControl.animate({"left": 25}, 500);
            drawControl.animate({"left": 80}, 500);
            $(this).css("background", "url('/image/sprite.png') no-repeat -99px -23px");
            onOff = false;
        }
        else {
            sideSearch.animate({"left": 0}, 500);
            reslutPannel.animate({"left": 265}, 500);
            panControl.animate({"left": 265}, 500);
            zoomSliderControl.animate({"left": 280}, 500);
            drawControl.animate({"left": 335}, 500);
            $(this).css("background", "url('/image/sprite.png') no-repeat -97px 0");
            onOff = true;
        }
    });
    //导航条各功能切换
    $('.top-nav li a').click(function () {
        $('.top-nav li').removeClass('current');
        $(this).parent().addClass('current');
    });
    //添加业务场景
    var clickNum = 0;
    var num = 0;
    addSceneBtn.click(function () {
        var sceneNum = $('.panel-accordion').length;
        if (sceneNum == 3) {
            alert('超出最大限制，最多可添加3种业务场景');
            return;
        }
        else {
            num++;
            creatScenePanelString(num);
            //业务场景二
            var sceneIdTwo = $("#source-type1");
            if (sceneIdTwo.length > 0) {
                var dicIdTwo = $("#dic-type1");
                var conditionlistTwo = $("#conditionlist1");
                initSceneData(sceneIdTwo);
                sceneDataChange(sceneIdTwo, dicIdTwo, conditionlistTwo, function () {
                    //其他场景的四个经纬度先不显示
                    conditionlistTwo.find('.query_value:lt(4)').css("display", "none");
                    //如果场景一,四个经纬度有值，那么就直接赋给场景二
                    var fourLatLon = $("#conditionlist div input").eq(0).val();
                    if (fourLatLon != '') {
                        $("#conditionlist1 div input[name='LEFTLONGITUDE']").val($("#conditionlist div input[name='LEFTLONGITUDE']").val());
                        $("#conditionlist1 div input[name='LEFTLATITUDE']").val($("#conditionlist div input[name='LEFTLATITUDE']").val());
                        $("#conditionlist1 div input[name='RIGHTLATITUDE']").val($("#conditionlist div input[name='RIGHTLATITUDE']").val());
                        $("#conditionlist1 div input[name='RIGHTLONGITUDE']").val($("#conditionlist div input[name='RIGHTLONGITUDE']").val());
                    }
                });
            }
            //业务场景三
            var sceneIdThree = $("#source-type2");
            var dicIdThree = $("#dic-type2");
            var conditionlistThree = $("#conditionlist2");
            if (sceneIdThree.length > 0) {
                initSceneData(sceneIdThree);
                sceneDataChange(sceneIdThree, dicIdThree, conditionlistThree, function () {
                    conditionlistThree.find('.query_value:lt(4)').css("display", "none");
                    //如果场景一,四个经纬度有值，那么就直接赋给场景二
                    var fourLatLon = $("#conditionlist div input").eq(0).val();
                    if (fourLatLon != '') {
                        $("#conditionlist2 div input[name='LEFTLONGITUDE']").val($("#conditionlist div input[name='LEFTLONGITUDE']").val());
                        $("#conditionlist2 div input[name='LEFTLATITUDE']").val($("#conditionlist div input[name='LEFTLATITUDE']").val());
                        $("#conditionlist2 div input[name='RIGHTLATITUDE']").val($("#conditionlist div input[name='RIGHTLATITUDE']").val());
                        $("#conditionlist2 div input[name='RIGHTLONGITUDE']").val($("#conditionlist div input[name='RIGHTLONGITUDE']").val());
                    }
                });
            }
        }
    });
    //拼接场景字符串
    function creatScenePanelString(num) {
        var sceneNum = $('.panel-accordion').length;
        var sceneName;
        if (sceneNum == 1) {
            sceneName = "业务场景二";
        }
        if (sceneNum == 2) {
            sceneName = "业务场景三";
        }
        var scenePanelString = '<div class="panel panel-accordion no-padding no-margin no-border border-bottom no-border-radius">' +
            '<div class="scene-head bgcolor-hd border-bottom">' +
            '<h4 class="panel-title">' +
            '<a>' +
            '<span  data-target="#panel2" data-toggle="collapse" data-parent="#accordion" >' + sceneName + '</span> <i></i></a>' +
            '</h4>' +
            '</div>' +
            '<div class="panel-collapse collapse in scene-con bgcolor-con" id="panel2">' +
            '<div class="panel-body no-padding">' +
            '<form class=" search-condition grid_check" id="grid_check' + num + '">' +
            '<div class="form-group">' +
            '<label>业务场景：</label>' +
            '<select class="form-control select-source-type" id="source-type' + num + '" name="data_product_type_grid">' +
            '<option value="0">请选择业务场景</option>' +
            '</select>' +
            '</div>' +
            '<div class="form-group">' +
            '<label>字典聚类：</label>' +
            '<select class="form-control" id="dic-type' + num + '" name="data_dictionary_type_grid">' +
            '<option>请选择字典聚类</option>' +
            '</select>' +
            '</div>' +
            '<div id="conditionlist' + num + '" style="display: none;"></div>' +
            '</form>' +
            '</div>' +
            '</div>' +
            '</div>';
        searchPanel.before(scenePanelString);
    }

    //业务场景一
    var sceneIdOne = $("#data_product_type_grid");
    var dicIdOne = $("#select_dictionary_type_grid");
    var conditionlistOne = $("#conditionlist");
    sceneDataChange(sceneIdOne, dicIdOne, conditionlistOne);
    //业务场景所有的数据交互动作
    function sceneDataChange(sceneId, dicId, conditionlist, fn) {
        //字典下拉框切换时,调用ajax获取后端数据
        dicId.change(function () {
            loadDictionaryType();
        });
        function loadDictionaryType() {
            var sourceTypeId = sceneId.val();
            var dictionaryTypeId = dicId.val();
            $.ajax({
                type: 'post',
                url: '/iwherelink_0.1/getConditionInfoByDictionaryType.do',
                dataType: 'html',
                data: {
                    dictionaryTypeId: dictionaryTypeId,
                    sourceTypeId: sourceTypeId,
                    timestamp: new Date().getTime()
                },
                success: function (data) {
                    conditionlist.show();
                    conditionlist.empty();
                    conditionlist.html(data);
                    fn && fn();
                },
                error: function () {
                    alert('select_dictionary_type_grid error!');
                }
            });
        }

        //根据业务场景的id检索出该业务场景下的所有的字典聚类,并将其填充到字典聚类的下拉框中
        function loadProductType() {
            var sourceTypeId = sceneId.val();
            $.ajax({
                type: 'post',
                url: '/iwherelink_0.1/getConditionDictionaryTypeBySourceType.do',
                dataType: 'json',
                data: {
                    id: sourceTypeId
                },
                success: function (data) {
                    dicId.empty();
                    var option = "<option value='0'>选择字典聚类</option>";
                    if (data.length > 0) {
                        $.each(data, function (n, value) {
                            option += "<option value='" + value.id + "'>" + value.typeName + "</option>";
                        });
                    }
                    dicId.append(option);
                    conditionlist.empty();
                },
                error: function () {
                    alert("很遗憾地告诉您,字典聚类加载失败,烦请刷新页面再做尝试!");
                    return;
                }
            });
        }

        //业务场景下拉框切换时请求的方法
        sceneId.change(function () {
            loadProductType();
        });
    }

    //添加后初始化业务场景
    function initSceneData(sceneId) {
        $.ajax({
            type: 'get',
            url: '/iwherelink_0.1/getAllSourceType.do',
            dataType: 'json',
            success: function (data) {
                var option = '';
                $.each(data, function (n, value) {
                    option += "<option value='" + value.id + "'>" + value.sourceType + "</option>";
                });
                sceneId.append(option);
            },
            error: function () {
                alert('初始化业务场景失败，请重新刷新页面')
            }
        });
    }

    //删除业务场景
    accordionPannel.on('click', 'i', function () {
        $(this).parents('.panel-accordion').remove();
    });
    var page = 1;
    var scenePageData = [];        //序列化后的业务场景数据数组
    var sceneResultArr = [];     //每种业务场景对应的数据
    var databaseData = [];        //数据库信息数据
    var eachDBData = {};        //每条数据库信息的name和value
    var totalRecordArr = [];      //场景总条数数组
    var xDataArr = [];            //柱状图横坐标数组
    var resultTabHead = $('#result-tab-head');
    var resultTabTable = $('#result-tab-table');
    //数据展示页面 点击查询按钮监听事件
    $("#indexDisplayFrom").click(function () {

        var sourceId = $("#data_product_type_grid").val();//获取业务场景
        var typeId = $("#select_dictionary_type_grid").val();//获取字典聚类

        //var page = $(".page").attr("page");//分页类型

        $('#scene-total-data ul').html('');  //清空地图标题数据
        var scenePageData1 = $("#grid_check").serialize();  //序列化场景一数据
        scenePageData.push(scenePageData1);
        var sceneIdTwo = $("#source-type1"); //获取场景二业务场景
        var dicIdTwo = $("#dic-type1");
        var conditionlistTwo = $("#conditionlist1");
        drawnItems.removeLayer(oldLayer);       //删除矩形框
        if (sceneIdTwo.length > 0) {
            var sceneIdTwoVal = sceneIdTwo.val();
            var dicIdTwoVal = dicIdTwo.val();
            if (typeof(sceneIdTwoVal) == 'undefined' || "" == sceneIdTwoVal || null == sceneIdTwoVal || "0" == sceneIdTwoVal) {
                alert("亲,劳驾动一动您的小手,选择对应的一种业务场景!");
                return;
            }
            if ((typeof(dicIdTwoVal) == 'undefined' || "" == dicIdTwoVal || null == dicIdTwoVal || "0" == dicIdTwoVal)) {
                alert("亲,劳驾动一动您的小手,选择对应的一种字典聚类!");
                return;
            }
            if (sceneIdTwoVal == sourceId) {
                alert("亲,业务场景不能重复选择!");
                return;
            }
            var scenePageData2 = $("#grid_check1").serialize();  //序列化场景二数据
            scenePageData.push(scenePageData2);
        }
        var sceneIdThree = $("#source-type2");  //获取场景三业务场景
        var dicIdThree = $("#dic-type2");
        var conditionlistThree = $("#conditionlist2");
        if (sceneIdThree.length > 0) {
            var sceneIdThreeVal = sceneIdThree.val();
            var dicIdThreeVal = dicIdThree.val();
            if (typeof(sceneIdThreeVal) == 'undefined' || "" == sceneIdThreeVal || null == sceneIdThreeVal || "0" == sceneIdThreeVal) {
                alert("亲,劳驾动一动您的小手,选择对应的一种业务场景!");
                return;
            }
            if ((typeof(dicIdThreeVal) == 'undefined' || "" == dicIdThreeVal || null == dicIdThreeVal || "0" == dicIdThreeVal)) {
                alert("亲,劳驾动一动您的小手,选择对应的一种字典聚类!");
                return;
            }
            if (sceneIdThreeVal == sourceId) {
                alert("亲,业务场景不能重复选择!");
                return;
            }
            if (sceneIdThreeVal == sceneIdTwoVal) {
                alert("亲,业务场景不能重复选择!");
                return;
            }
            var scenePageData3 = $("#grid_check2").serialize();  //序列化场景二数据
            scenePageData.push(scenePageData3);
        }
        //以下是校验经纬度是否有值的情况
        var leftLongitude = $("#condition_LEFTLONGITUDE").val();
        var leftLatitude = $("#condition_LEFTLATITUDE").val();
        var rightLongitude = $("#condition_RIGHTLONGITUDE").val();
        var rightLatitude = $("#condition_RIGHTLATITUDE").val();

        if (typeof(sourceId) == 'undefined' || "" == sourceId || null == sourceId || "0" == sourceId) {
            alert("亲,劳驾动一动您的小手,选择对应的一种业务场景!");
            return;
        }
        if (typeof(typeId) == 'undefined' || "" == typeId || null == typeId || "0" == typeId) {
            alert("亲,劳驾动一动您的小手,选择对应的一种字典聚类!");
            return;
        }
        if (typeof(leftLongitude) == 'undefined' || "" == leftLongitude || null == leftLongitude) {//此处只需要校验一个值即可
            alert("亲,劳驾动一动您的小手,在对应的地图中选择坐标!");
            return;
        }
        //var sceneNum = scenePageData.length;
        resultTabHead.html('');
        resultTabTable.html('');
        //先删除旧图层
        dbGeoJson.clearLayers();
        //有几种场景请求几次数据
        for (var i = 0; i < scenePageData.length; i++) {
            ajaxSceneData(scenePageData[i], i + 1);
        }
    });
    function ajaxSceneData(scenePageData, num) {
        var searchType = $(this).attr("search");//获取搜索类型
        var layer = scalevalue + 1;
        $.ajax({
            //type: 'get',
            type: 'post',
            url: '/iwherelink_0.1/getSourceDataByCondition.do?searchType=' + searchType + '&layer=' + layer + '&page=' + page,
            //url: '/js/mockResultData.json',
            dataType: 'json',
            data: scenePageData,
            success: function (data) {
                //$("#grid_check").hide();      //侧边栏隐藏
                databaseData = [];
                eachDBData = {};
                sceneResultArr.push(data);
                $(".result").show();
                $(".map-head").show();
                //处理后台数据mapResult
                var obj = new Object();
                obj = html2json(data.mapResult);
                xDataArr.push(obj.source);

                //把场景来源添加到tab头上
                var li = '<li><a data-toggle="tab" href="#scene_tab' + num + '" aria-expanded="">' + obj.source + '<i class="iconfont scene' + num + '"></i></a></li>';
                resultTabHead.append(li);
                switch (data.sourceTypeId) {
                    case 21:
                        $(".scene" + num).addClass('icon-diliweizhi');
                        break;
                    case 41:
                        $(".scene" + num).addClass('icon-feiji');
                        break;
                    case 42:
                        $(".scene" + num).addClass('icon-font16');
                        break;
                    case 43:
                        $(".scene" + num).addClass('icon-jizhan');
                        break;
                    case 71:
                        $(".scene" + num).addClass('icon-kongjian');
                        break;
                    case 83:
                        $(".scene" + num).addClass('icon-shichangfenxi');
                        break;
                    case 85:
                        $(".scene" + num).addClass('icon-iconfontapptianqi');
                        break;
                }
                var feature;
                var thCell = '';
                var tableCell = '';
                var attrs = [];
                for (var i = 0; i < obj.data.length; i++) {
                    feature = obj.data[i];
                    if (i === 0) {
                        feature.forEach(function (v, k, array) {
                            for (attr in v) {
                                attrs.push(attr);
                                thCell += '<th>' + attr + '</th>';
                            }
                        })
                    }
                    var trDom = '<tr>';
                    feature.forEach(function (v, k, array) {
                        trDom += '<td>' + v[attrs[k]] + '</td>';
                    });
                    trDom += '</tr>';
                    tableCell += trDom;
                }
                var resultPage = '<div id = "result_page' + num + '" class="row text-right no-margin" style="position:absolute;bottom:0;right:20px;height:43px;padding:10px;">' +
                    '<span id = "prePage' + num + '"  class="page"  style="font-size:14px;color:white;" page="">上一页&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>' +
                    '<span id = "nextPage' + num + '"  class="page"  style="font-size:14px;color:white;" page="">下一页&nbsp;&nbsp;&nbsp;</span>' +
                    '<span id = "currentPage' + num + '"   style="font-size:14px;color:white;"></span> <span id = "totalPage' + num + '"  style="font-size:14px;color:white;"></span>' +
                    '</div> ';
                var pieChart = '<div class="pull-left pie-chart" id="result-pie' + num + '"></div>';
                var tableData = '<div id="scene_tab' + num + '" class="tab-pane">' +
                    '<table class="table table-bordered">' +
                    '<thead>' +
                    '<tr>' +
                    thCell +
                    '</tr>' +
                    '</thead>' +
                    '<tbody>' +
                    tableCell +
                    '</tbody>' +
                    '</table>' +
                    resultPage +
                    pieChart +
                    '</div>';
                resultTabTable.append(tableData);
                $('#scene' + num + 'table tbody tr').html(tableCell);
                $('#scene_tab1').addClass('active');
                $('#result-tab-head li a[href="#scene_tab1"]').parent().addClass('active');

                var totalPage = data.totalPage;
                var currentPage = data.currentPage;
                var totalRecord = data.totalRecord;
                totalRecordArr.push(totalRecord);
                //动态统计各场景数据量，添加成地图标题
                var mapHeadLi = '<li>' + obj.source + ':<span>' + totalRecord + '</span>条</li>';
                $('#scene-total-data ul').append(mapHeadLi);

                //如果xDataArr的长度==请求的场景数，则开始渲染柱状图
                if (xDataArr.length == scenePageData.length) {

                    var mapChartBar = echarts.init(document.getElementById('scene-data-bar'));
                    var option = {
                        backgroundColor: 'transparent',
                        tooltip: {
                            trigger: 'axis'
                        },
                        xAxis: {
                            show: false,
                            type: 'category',
                            data: xDataArr
                        },
                        yAxis: {
                            show: false,
                            type: 'value'
                        },
                        series: {
                            name: '查询结果数量',
                            type: 'bar',
                            data: totalRecordArr
                        }
                    };
                    //设置初始化选项
                    mapChartBar.setOption(option);
                }
                if (totalRecord > 10) { //需要显示分页信息
                    $('#result_page' + num).show();
                    if (1 == currentPage) {
                        $('#prePage' + num).hide();
                    }
                    if (currentPage == totalPage) {
                        $('#nextPage' + num).hide();
                    }

                    if (1 != currentPage && currentPage != totalPage) {
                        $('#prePage' + num).show();
                        $('#nextPage' + num).show();
                    }
                    $('#totalPage' + num).text("  共" + totalPage + "页");
                    $('#currentPage' + num).text(" 当前第" + currentPage + "页");

                    $('#prePage' + num).attr("page", Number(currentPage) - 1);
                    $('#nextPage' + num).attr("page", Number(currentPage) + 1);
                }
                if (totalRecord <= 10) {
                    $('#result_page' + num).hide();
                }
                if (0 == totalRecord) {
                    $('#result_page' + num).hide();
                }
                //分页
                //$('#nextPage'+num).on('click',function () {
                //    page = $(this).attr("page");
                //    ajaxSceneData(scenePageData,num);
                //});

                //把图标添加到地图上
                function difIconOnMap(geoJsonName, data, sourceTypeId) {
                    function addIconToMap(iconName) {
                        geoJsonName = L.geoJson(data, {
                            onEachFeature : onEachFeature,
                            pointToLayer: function (feature, latlng) {
                                return L.marker(latlng, {icon: iconName});
                            }
                        }).addTo(dbGeoJson);
                    }
                    switch (sourceTypeId) {
                        case 21:
                            addIconToMap(newDifSceneIcon.geoPosMarker);
                            break;
                        case 41:
                            addIconToMap(newDifSceneIcon.planeMarker);
                            break;
                        case 42:
                            addIconToMap(newDifSceneIcon.trainMarker);
                            break;
                        case 43:
                            addIconToMap(newDifSceneIcon.baseStationMarker);
                            break;
                        case 71:
                            addIconToMap(newDifSceneIcon.spaceDataMarker);
                            break;
                        case 83:
                            addIconToMap(newDifSceneIcon.marketMarker);
                            break;
                        case 85:
                            addIconToMap(newDifSceneIcon.weatherMarker);
                            break;
                        default :
                            geoJsonName = L.geoJson(data, {
                                //onEachFeature : onEachFeature,
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
                            }).addTo(dbGeoJson);
                    }
                }
                function onEachFeature(feature, layer) {
                    var messageLi='';
                    for(var attr in feature.properties.map){
                        messageLi+="<li>"+attr+"："+feature.properties.map[attr]+"</li>";
                    }
                    var popContent='<div class="popup-container">'+
                        '<div class="popup-contain">'+
                        '<ul>'+
                        messageLi+
                        '</ul>'+
                        '</div>'+
                        '<span class="popup-arrow"></span>'+
                        '</div>';
                    layer.bindPopup(popContent,{
                        className:'custom-data-popup'
                    });
                }

                if (data.mysqlDataOnMap) {
                    if (data.mysqlDataOnMap.features[0].geometry.type == "Point") {
                        createDifIcon('mysql-color');
                        difIconOnMap(mysqlJson, data.mysqlDataOnMap, data.sourceTypeId);
                    }
                    else {
                        mysqlJson = L.geoJson(data.mysqlDataOnMap, {
                            style: mapColorStyle,
                            onEachFeature: onEachFeature
                        }).addTo(dbGeoJson);
                    }
                    var dbNum = data.mysqlDataOnMap.features.length;
                    eachDBData = {"name": "mysql", "value": dbNum};
                    databaseData.push(eachDBData);
                }
                if (data.mongoDataOnMap) {
                    if (data.mongoDataOnMap.features[0].geometry.type == "Point") {
                        createDifIcon('mongo-color');
                        difIconOnMap(mongoJson, data.mongoDataOnMap, data.sourceTypeId);
                    }
                    else {
                        mongoJson = L.geoJson(data.mongoDataOnMap, {
                            style: mapColorStyle,
                            onEachFeature: onEachFeaturePolygon
                        }).addTo(dbGeoJson);
                    }
                    var dbNum = data.mongoDataOnMap.features.length;
                    eachDBData = {"name": "mongo", "value": dbNum};
                    databaseData.push(eachDBData);
                }
                if (data.oracleDataOnMap) {
                    if (data.oracleDataOnMap.features[0].geometry.type == "Point") {
                        createDifIcon('oracle-color');
                        difIconOnMap(oracleJson, data.oracleDataOnMap, data.sourceTypeId);
                    }
                    else {
                        oracleJson = L.geoJson(data.oracleDataOnMap, {
                            style: mapColorStyle,
                            onEachFeature: onEachFeature
                        }).addTo(dbGeoJson);
                    }
                    var dbNum = data.oracleDataOnMap.features.length;
                    eachDBData = {"name": "oracle", "value": dbNum};
                    databaseData.push(eachDBData);
                }
                if (data.dmDataOnMap) {
                    if (data.dmDataOnMap.features[0].geometry.type == "Point") {
                        createDifIcon('dm-color');
                        difIconOnMap(dmJson, data.dmDataOnMap, data.sourceTypeId);
                    }
                    else {
                        dmJson = L.geoJson(data.dmDataOnMap, {
                            style: mapColorStyle,
                            onEachFeature: onEachFeature
                        }).addTo(dbGeoJson);
                    }
                    var dbNum = data.dmDataOnMap.features.length;
                    eachDBData = {"name": "dm", "value": dbNum};
                    databaseData.push(eachDBData);
                }
                //if (data.dataOnMap && data.dataOnMap.features[0].geometry.type == "Point") {
                //    createDifIcon('data-color');
                //    difIconOnMap(dataJson, data.dataOnMap, data.sourceTypeId);
                //} else {
                //    dataJson = L.geoJson(data.dataOnMap, {
                //        style: mapColorStyle,
                //        onEachFeature2: onEachFeature2
                //    }).addTo(dbGeoJson);
                //}

                var mapChartPie = echarts.init(document.getElementById('result-pie' + num));
                var pieOption = {
                    backgroundColor: 'transparent',
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a}<br/>{b} : {c}({d}%)"
                    },
                    series: {
                        name: '查询结果数量',
                        type: 'pie',
                        data: databaseData,
                        label: {
                            normal: {
                                textStyle: {
                                    color: '#ffffff'
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                lineStyle: {
                                    color: '#ffffff'
                                }
                            }
                        },
                        color: ['#559ce5', '#e62b4a', '#e62bce', '#2be4e6', '#2be669', '#ebee12', '#ee7f12', '#1c12ee', '#7f12ee']
                    }
                };
                mapChartPie.setOption(pieOption);
            },
            error: function () {
                alert('检索数据并加载数据失败,请稍后再做尝试操作!');
            }
        });
    }
    var newDifSceneIcon = {};
    //不同场景，不同库，不同图标,7种
    function createDifIcon(colorClass) {
        var difSceneIcon = {
            name: ['geoPosMarker', 'planeMarker'
                , 'trainMarker', 'baseStationMarker',
                'spaceDataMarker', 'marketMarker', 'weatherMarker'
            ],
            fontClassName: ['icon-diliweizhi', 'icon-feiji', 'icon-font16', 'icon-jizhan',
                'icon-kongjian', 'icon-shichangfenxi', 'icon-iconfontapptianqi']
        };
        for (var i = 0; i < difSceneIcon.name.length; i++) {
            newDifSceneIcon[difSceneIcon.name[i]] = L.divIcon({
                className: difSceneIcon.name[i]+' '+colorClass,
                iconSize: [16, 16],
                html: '<i class="iconfont ' + difSceneIcon.fontClassName[i] + '"></i>'
            });
        }
    }

    //处理后台的mapResult数据
    function html2json(data) {      //处理成json对象
        var obj = new Object();
        obj = getSource(data);
        var txt = [];
        txt = data.split(/<li[^>]*>/g);
        var list = [];
        for (var i = 1; i < txt.length; i++) {
            list.push(getList(txt[i]));
        }
        obj["data"] = list;
        return obj;
    }

    function getSource(data) {
        var txt = [];
        txt = data.split(/<p[^>]*>/g);
        txt = txt[1].split(new RegExp("</p>"));
        var t = txt[0].split(new RegExp("<br>"));
        var source = [];
        source = t[0].split(/：/);
        var record = t[1].match(/\d+/g);
        var obj = new Object();
        obj["source"] = source[1];
        obj["record"] = record[0];
        return obj;
    }

    function getList(data) {
        var txt = [];
        txt = data.split(/col[^>]*>/g);
        var list = [];
        for (var i = 1; i < txt.length; i++) {
            var tmp = [];
            var value = [];
            tmp = txt[i].split(new RegExp("</div>"));
            value = tmp[0].split(/:/);
            var obj = new Object();
            obj[value[0].trim()] = value[1].trim();
            list.push(obj);
        }
        return list;
    }

    $('.close-icon').click(function () {
        $('.result').hide();
    });

    function map_radio(obj) {
        var dom = $(obj);
        dom.on('click', function () {
            var radio = $(this).find('i');
            var radio_brothers = $(this).siblings().find('i');
            if (radio_brothers.hasClass('active')) {
                radio_brothers.removeClass('active');
            }
            radio.addClass('active');
        });
    }

    map_radio('.thematic-head');
    map_radio('.analysis-lable');
    /*var thematic_head = $('.thematic-head');*/
    /*thematic_head.on('click',function(){
     var radio = $(this).find('i');
     var radio_brothers = $(this).siblings().find('i');
     if(radio_brothers.hasClass('active')){
     radio_brothers.removeClass('active');
     }
     radio.addClass('active');
     });*/

    // 网格查询与矩形查询切换
    var specialMapList = $(".special_map_data");
    var resultsPanel = $(".result");
    var rectanglePanel = $(".rect-search");
    var gridCheckPanel = $(".grid_check");
    var specialMapPanel = $(".special_map_container");

    //左侧栏的网格查询图表点击监听事件
    $(".grid").click(function () {
        //$(".result").show();
        //先删除旧图层
        if (map.hasLayer(mongoJson)) {
            map.removeLayer(mongoJson);
        }
        if (map.hasLayer(mysqlJson)) {
            map.removeLayer(mysqlJson);
        }
        if (map.hasLayer(oracleJson)) {
            map.removeLayer(oracleJson);
        }
        if (map.hasLayer(dmJson)) {
            map.removeLayer(dmJson);
        }
        if (map.hasLayer(dataJson)) {
            map.removeLayer(dataJson);
        }
        //删除矩形框
        if (map.hasLayer(drawnItems)) {
            drawnItems.clearLayers();
        }
        if (map.hasLayer(indexGPopulationLayer)) {
            map.removeLayer(indexGPopulationLayer);
            map.removeControl(peopleLegend);
            $('#genderpie_container').remove();
        }
        $('#plane_container').remove();
        $('#plane_bar_container').remove();
        specialMapPanel.hide();
        resultsPanel.hide();
        //rectanglePanel.hide();
        //gridCheckPanel.show();
        $("#grid_check div input[name='LEFTLONGITUDE']").val("");
        $("#grid_check div input[name='LEFTLATITUDE']").val("");
        $("#grid_check div input[name='RIGHTLONGITUDE']").val("");
        $("#grid_check div input[name='RIGHTLATITUDE']").val("");

        $("#btn_group").css("display", "none");
        $(".leaflet-draw a").css("display", "none");
        $(this).attr('src', 'media/image/grid2.png');
        //$(".rectangle").attr('src', 'media/image/rectangle.png');
        //$(".special_map").css("color", "#b2b2b2");
        $("#indexDisplayFrom").attr("search", "grid");//此处为了方便在按钮里面添加了一个属性search,对其赋值
        specialMapPanel.hide();
    });

    //左侧栏的矩形查询图表点击监听事件
    $(".rectangle").click(function () {
        //$(".results").show();
        if (map.hasLayer(indexGPopulationLayer)) {
            map.removeLayer(indexGPopulationLayer);
            map.removeControl(peopleLegend);
            $('#genderpie_container').remove();
        }
        $('#genderpie_container').hide();
        $('#plane_container').remove();
        $('#plane_bar_container').remove();
        specialMapPanel.hide();
        resultsPanel.hide();
        gridCheckPanel.show();
        rectanglePanel.show();
        $("#btn_group").css("display", "block");
        isGridHere = false;
        // 删除剖分网格
//		if (map.hasLayer(geogridjson)) {
//			map.removeLayer(geogridjson);
//			map.removeLayer(groupMarker);
//			markers = [];
//		}
        if (map.hasLayer(geoSotGeoJson)) {
            map.removeLayer(geoSotGeoJson);
        }

        $("#grid_check div input[name='LEFTLONGITUDE']").val("");
        $("#grid_check div input[name='LEFTLATITUDE']").val("");
        $("#grid_check div input[name='RIGHTLONGITUDE']").val("");
        $("#grid_check div input[name='RIGHTLATITUDE']").val("");

        $('.grid').attr('src', 'media/image/grid.png');
        $(this).attr('src', 'media/image/rectangle2.png');
        $(".special_map").css("color", "#b2b2b2");
        $("#indexDisplayFrom").attr("search", "rect");//此处为了方便在按钮里面添加了一个属性search,对其赋值
    });


    //人口航线相关数据监听事件
    $(".special_map").click(function () {
        $(".result").hide();
        if (map.hasLayer(indexGPopulationLayer)) {
            map.removeLayer(indexGPopulationLayer);
            map.removeControl(peopleLegend);
            $('#genderpie_container').remove();
        }
        $('#genderpie_container').hide();
        $('#plane_container').remove();
        $('#plane_bar_container').remove();
        specialMapPanel.hide();
        gridCheckPanel.hide();
        $(".delBtn").click();
        isGridHere = false;
        // 删除剖分网格
        if (map.hasLayer(geogridjson)) {
            map.removeLayer(geogridjson);
            map.removeLayer(groupMarker);
            markers = [];
        }
        //$(this).css("color", "white");
        rectanglePanel.hide();
        gridCheckPanel.hide();
        specialMapPanel.show();
    });

    specialMapList.click(function () {
        specialMapList.removeClass('data_active');
        $(this).addClass('data_active');
    });

    // 网格显示隐藏按钮
    var flagNumber = 1;
    $('#gridFlag').click(
        function () {
            if (flagNumber % 2) {
                flag = true;
                hand_flag = false;
                draw_Graticule();
                $(this).css('background-image',
                    'url("media/image/gridClose.png")');
            } else {
                flag = false;
                hand_flag = false;
                map.removeLayer(mapGraticule);
                $(this).css('background-image',
                    'url("media/image/gridOpen.png")');

            }
            flagNumber++;
        });
    $('#gridFlag').hover(function () {
        $('#grid_content').css('display', 'block');
    }, function () {
        $('#grid_content').css('display', 'none');
    });
    // 点击剖分网格查询
    $(".slicegrid p span").click(function () {
        var slice = $(".slicegrid");
        slice.animate({
            "bottom": -300
        });
        setTimeout(function () {
            slice.css('display', 'none')
        }, 600);

    });
    // 滚动条

    $(".slicegrid_right").mCustomScrollbar();

    $('.nav-tabs li a:first').parent().addClass('active');

    // $('#conditionlist').html(conlist.responseText);

    $('.nav-tabs li a').click(function () {
        // alert($(this).attr("id"));
        $(this).parent().siblings().removeClass('active');
        $(this).parent().addClass('active');
    });

    // 清除按钮
    $(".delBtn").click(function (e) {
        resetMap();
        setBtnStatus("delBtn", true);
        delRect(rect);
        if (map.hasLayer(drawnItems)) {
            drawnItems.clearLayers();
        }
        //先删除旧图层
        if (map.hasLayer(mongoJson)) {
            map.removeLayer(mongoJson);
        }
        if (map.hasLayer(mysqlJson)) {
            map.removeLayer(mysqlJson);
        }
        if (map.hasLayer(oracleJson)) {
            map.removeLayer(oracleJson);
        }
        if (map.hasLayer(postgresqlJson)) {
            map.removeLayer(postgresqlJson);
        }
        if (map.hasLayer(dmJson)) {
            map.removeLayer(dmJson);
        }
        if (map.hasLayer(dataJson)) {
            map.removeLayer(dataJson);
        }
        $("#res").click();
        $("#result-table").children("tbody").children().remove();
        setBtnStatus("delBtn", false);
    });
    function mapColorStyle(feature) {
        var colorValue = feature.properties.colorValue;
        return {
            weight: 2,
            opacity: 1,
            color: colorValue == 0 ? '#e69373' : colorValue == 1 ? '#CCCC00'
                : colorValue == 2 ? '#FF66FF' : colorValue == 3 ? '#0099FF'
                : colorValue == 4 ? '#CCFF00' : '#FF0099',
            dashArray: '',
            fillOpacity: 0.7,
            fillColor: colorValue == 0 ? '#e69373'
                : colorValue == 1 ? '#CCCC00' : colorValue == 2 ? '#FF66FF'
                : colorValue == 3 ? '#0099FF'
                : colorValue == 4 ? '#CCFF00' : '#FF0099'
        };
    }

    // 显示或隐藏选择数据库面板
    var dataBaseToggle = function (btn, panel) {
        var btn_status = $(btn).attr("status");
        if (btn_status == "hide") {
            openDataBasePanel(btn, panel)
        } else {
            closeDataBasePanel(btn, panel)
        }
    };
    // 隐藏选择数据库面板
    var closeDataBasePanel = function (btn, panel) {
        $(btn).attr("status", "hide");
        $(panel).slideUp();
        $(btn).find("span").css("background",
            "url(/image/icons.png) -10px 0px no-repeat")
    };
    // 显示选择数据库面板
    var openDataBasePanel = function (btn, panel) {
        $(btn).attr("status", "show");
        $(panel).slideDown();
        $(btn).find("span").css("background",
            "url(/image/icons.png) 0px 0px no-repeat")
    };

    // ----------------------------------test------------------------
    var tabs = $("#tabs").find('li');
    var list = $("#list");
    var ul = list.find("ul");

    function active() {
//		alert(1);
        $(this).addClass('active');
        $(this).siblings().removeClass('active');
        $("#list").find("ul").eq($(this).index()).addClass('active');
        $("#list").find("ul").eq($(this).index()).siblings().removeClass(
            'active');
    }

    $("#tabs").find('li').delegate('click', active);


    var indexGPopulationLayer; // 定义全局人口图层
    var peopleLegend = L.control({
        position: 'bottomright'
    });
    var genderRatio = '<div id="genderpie_container"></div>';
    // 点击确定数据按钮，出现图层
    $(".sure").click(function () {
        if (map.hasLayer(indexGPopulationLayer)) {
//			map.remove();
            map.removeLayer(indexGPopulationLayer);
            map.removeControl(peopleLegend);
            $('#genderpie_container').hide();
        }
        $('#plane_container').remove();
        $('#plane_bar_container').remove();
//		$('#plane_container').remove();
//		 removeLayerLegendPie()
        resultsPanel.hide();

//		if (!specialMapList.hasClass("data_active")) {
//			alert('请先选择数据！');
//		} else {
        if (specialMapList.eq(0).hasClass("data_active")) {

            $('#plane_container').remove();
            $('#plane_bar_container').remove();
            $('#genderpie_container').show();
            ajaxPopulation();
//				planeMapContainerDom.hide();
//				planeBarDom.hide();
//				MapContainerDom.hide();

        } else {
            if (map.hasLayer(indexGPopulationLayer)) {
//					map.remove();
                map.removeLayer(indexGPopulationLayer);
                map.removeControl(peopleLegend);
                $('#genderpie_container').hide();
            }
            // $('#contents #map').hide();
            initAir();
            // MapContainerDom.show();
            // planeMapContainerDom.show();


            // ajaxmap();
//				ajaxPlane();
            // 初始化先绘制广州的
//				planeBarDom.show();
//				planeBarInit.setOption(planeBarOptions);
        }
//		}
    });

    // //点击确定数据按钮，出现图层
    // $(".sure").click(function(){
    // resultsPanel.hide();
    // if(!specialMapList.hasClass("data_active")){
    // alert('请先选择数据！')
    // }
    // else{
    // if(specialMapList.eq(0).hasClass("data_active")){
    //
    // ajaxPopulation();
    // }
    // else{
    // map.removeLayer(indexGPopulationLayer);
    // map.removeControl(peopleLegend);
    // $('#genderpie_container').hide();
    // ajaxPlane();
    // alert("你选择的是航线数据，暂时无图");
    // }
    // }
    // });

    // 设置初始化选项
    //移除人口图层，图例，那女比例饼图
    function removeLayerLegendPie() {
        if (map.hasLayer(indexGPopulationLayer)) {
            map.removeLayer(indexGPopulationLayer);
            map.removeControl(peopleLegend);
            $('#genderpie_container').remove();
        }
    }

    // genderInit.setOption(genderOption);
    // 发送人口数据请求，并加到地图上
    function ajaxPopulation() {
        var city = "全国";
        $.ajax({
            type: 'get',
            // url:'media/testChinaData.json',
            url: '/iwherelik_0.1/getPopulation.do',
            dataType: 'json',
            success: function (data) {
                // alert("数据已加进来");
                indexGPopulationLayer = L.geoJson(data, {
                    style: populationStyle,
                    onEachFeature: onEachPeopleFeature
                });
                indexGPopulationLayer.addTo(map);
                peopleLegend.addTo(map);
                genderInit.setOption(genderOption);

            },
            error: function () {
                alert('没有加载进数据');
            }
        });

        var peopleTip = new L.LayerGroup();
        // 人口提示的icon
        var peopleIcon = L.divIcon({
            className: 'peole-tip-icon',
            iconSize: [95, 40],
            iconAnchor: [-10, -10]
        });

        // 数据样式
        function populationStyle(feature) {
            return {
                weight: 2,
                opacity: 1,
                color: 'white',
                dashArray: '3',
                fillOpacity: 0.7,
                fillColor: getPeopleColor(feature.properties.density)
            };
        }

        // 不同密度的区域对应不同颜色
        function getPeopleColor(n) {
            var d = n / 10000;
            return d > 10000 ? '#800026'
                : d > 9000 ? '#a40122'
                : d > 8000 ? '#bd0026'
                : d > 7000 ? '#d30f11'
                : d > 6000 ? '#e31a1c'
                : d > 5000 ? '#e23512'
                : d > 4000 ? '#fc4e2a'
                : d > 3000 ? '#f17216'
                : d > 2000 ? '#fd8d3c'
                : d > 1000 ? '#ea9119'
                : d > 500 ? '#feb24c'
                : d > 300 ? '#f7ba17'
                : d > 100 ? '#fed976'
                : '#fae176';
        }

        // 给每一个区域添加鼠标移入，移出，移动事件
        function onEachPeopleFeature(feature, layer) {
            // genderInit.setOption(genderOption);
            layer.on({
                mouseover: highlightPeopleFeature,
                mousemove: tipLabelMove,
                mouseout: resetHighlightPeople,
                click: function (data) {
                    city = layer.feature.properties.name;
                    genderInit.setOption(genderOption);
                    // alert("feature:"+city);
                    $.ajax({
                        type: 'post',
                        async: false,
                        // url: 'media/js/gendaData.json',
                        url: '/iwherelik_0.1/genderData.do?city=' + city,
                        dataType: 'json',
                        success: function (data) {
                            genderInit.hideLoading();
                            genderInit.setOption({
                                title: {
                                    text: city + '男女比例饼形图',
                                },
                                series: [{
                                    data: data.data.sort(function (a, b) {
                                        return a.value - b.value;
                                    })
                                }]
                            });
                        },
                        error: function () {
                            alert("error");
                        }
                    });

                    // genderInit.showLoading();

                }
            });
        }

        // 鼠标移入，区域高亮显示，且出现提示标签
        function highlightPeopleFeature(e, props) {
            var layer = e.target;
            layer.setStyle({
                weight: 5,
                color: '#666',
                dashArray: '',
                fillOpacity: 0.7
            });
            if (!L.Browser.ie && !L.Browser.opera) {
                layer.bringToFront();
            }
            indexGTipMarker = L.marker(e.latlng, {
                icon: peopleIcon
            });

            peopleTip.addLayer(indexGTipMarker);
            peopleTip.addTo(map);
            tipContent(layer.feature.properties);
        }

        // 鼠标移出，区域高亮显示恢复，且提示标签消失
        function resetHighlightPeople(e) {
            indexGPopulationLayer.resetStyle(e.target);
            peopleTip.clearLayers();
            map.removeLayer(peopleTip);
        }

        // 点击区域，会放大该区域，且以该区域为地图中心
        function zoomToPeopleFeature(e) {
            map.fitBounds(e.target.getBounds());
        }

        // 设置提示标签的内容
        function tipContent(props) {
            $(".peole-tip-icon").get(0).innerHTML = (props ? '<h4>'
            + props.name + '</h4>' + '人口：' + props.density
                : '把鼠标放到行政区域上');
        }

        // 在每个区域移动时，提示标签也跟随移动
        function tipLabelMove(e) {
            indexGTipMarker.setLatLng(e.latlng);
        }

        // 人口数据图例控件

        peopleLegend.onAdd = function (map) {
            var div = L.DomUtil.create('div', 'people legend'), grades = [0,
                    100, 200, 500, 1000, 2000, 5000, 10000], // [0, 1000000,
            // 2000000,
            // 5000000,
            // 10000000,
            // 20000000,
            // 50000000,
            // 100000000],
                labels = [], // [0, 100, 200, 500, 1000, 2000, 5000, 10000],
                from, to;
            for (var i = 0; i < grades.length; i++) {
                from = grades[i] * 10000;
                to = grades[i + 1] * 10000;
                labels.push('<i style="background:' + getPeopleColor(from + 1)
                    + '"></i> ' + from / 10000
                    + (to / 10000 ? '&ndash;' + to / 10000 : '+'));
            }
            labels.unshift('单位：万');
            div.innerHTML = labels.join('<br>');
            return div;
        };

        // 男女比例饼状图
//		var genderRatio = '<div id="genderpie_container"></div>';
        $('body').append(genderRatio);
        var genderPieContainer = $('#genderpie_container').get(0);
        var genderInit = echarts.init(genderPieContainer);
        var genderOption = {
            backgroundColor: '#ccc',
            title: {
                text: city + '男女比例饼形图',
                left: 'center',
                top: 20
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a}<br />{b}:{c}({d}%)'
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                bottom: 'bottom',
                data: ["女", "男"]
            },
            series: [{
                name: '男女比例',
                type: 'pie',
                selectOffset: 30,
                radius: '55%',
                center: ['50%', '55%'],
                // url: 'media/js/gendaData.json'
                data: [{
                    value: 650481765,
                    name: '女'
                }, {
                    value: 682329104,
                    name: '男'
                }],
                label: {
                    normal: {
                        show: false
                    }
                },
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0,0,0,0.5)'
                    }
                }
            }]
        };
        // 设置初始化选项

        // genderInit.showLoading();
        // genderInit.setOption(genderOption);
        // 发送请求，返回数据
        // $.ajax({
        // type: 'post',
        // async: false,
        // // url: 'media/js/gendaData.json',
        // url: 'genderData.do?city='+city,
        // dataType: 'json',
        // success: function (data) {
        // genderInit.hideLoading();
        // genderInit.setOption({ title: {
        // text:city+'男女比例饼形图',
        // },
        // series: [{
        // data: data.data.sort(function (a, b) {
        // return a.value - b.value;
        // })
        // }]
        // });
        // },
        // error: function () {
        // alert("error");
        // }
        // });

    }

    // 航线右下角柱状图初始化


    // 航线数据迁徙图初始化
    function initAir() {
        var planeContainer = '<div id="plane_container"></div>';
        $('body').append(planeContainer);
        var planeMapContainerDom = $('#plane_container');

        planeMapContainerDom.css({
            top: (-planeMapContainerDom.height()),
            left: 0
        });

        var planeMapContainer = planeMapContainerDom.get(0);
        var planeInit = echarts.init(planeMapContainer);

        var mapContainer = '<div id="map_container"></div>';
        $('#plane_container').append(mapContainer);
//		$('body').append(mapContainer);
        var MapContainerDom = $('#map_container');
        MapContainerDom.css({
            top: (-MapContainerDom.height()),
            left: 0
        });
        var MapContainer = MapContainerDom.get(0);
        var mapInit = echarts.init(MapContainer);
        ajaxPlane();
        MapContainerDom.show();
        planeMapContainerDom.show();

        var planeBarNode = '<div id="plane_bar_container"></div>';
        $('body').append(planeBarNode);
        var planeBarDom = $('#plane_bar_container');
        var planeBarContainer = planeBarDom.get(0);
        var planeBarInit = echarts.init(planeBarContainer);

        planeBarDom.show();


        // var geoCoordMap = {
        // 'Thigpen' : [-89.23450472,31.95376472],
        // 'Livingston Municipal' : [ -95.0179, 30.6858 ],
        // 'Meadow Lake' : [ -104.5698, 38.9457 ],
        // 'Perry-Warsaw' : [ -78.0520, 42.7413 ],
        // 'Hilliard Airpark' : [ -81.9059, 30.6880 ],
        // 'Tishomingo County' : [ -88.20111111, 34.4916 ],
        // 'Calhoun County' : [ -89.34285194, 33.93011222 ],
        // 'Memphis Memorial' : [ -92.22696056, 40.44725889 ],
        // 'Columbiana County' : [ -80.64140639, 40.67331278 ],
        // 'Capitol' : [ -88.17786917, 43.08751 ],
        // 'Gragg-Wade' : [ -86.61145333, 32.85048667 ],
        // 'Eupora Municipal':[-89.31256917,33.53456583]
        // };
        // var a2cdata = [ {
        // name : 'Thigpen',
        // value : '00M'
        // }, {
        // name : 'Livingston Municipal',
        // value : '00R'
        // }, {
        // name : 'Meadow Lake',
        // value : '00V'
        // }, {
        // name : 'Perry-Warsaw',
        // value : '01G'
        // }, {
        // name : 'Hilliard Airpark',
        // value : '01J'
        // }, {
        // name : 'Eupora Municipal',
        // value : '06M'
        // } ];
        var planeBarOptions = {
            backgroundColor: '#ccc',
            title: {
                text: '航班数量-起点：' + 'San Diego International-Lindbergh',
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                show: false
            },
            xAxis: [{
                type: 'category',
                name: '终点',
                data: ["LAX", "PHX", "SFO", "SJC", "LAS", "DEN", "ORD", "DFW",
                    "OAK", "SLC"]
            }],
            yAxis: [{
                type: 'value'
            }],
            series: [{
                name: '航班数',
                type: 'bar',
                data: [2388, 2108, 1959, 1044, 1004, 861, 821, 798, 734, 287],
                center: ['50%', '55%'],
                markPoint: {
                    data: [{
                        type: 'max',
                        name: '最大值'
                    }, {
                        type: 'min',
                        name: '最小值'
                    }]

                }
            }]
        };
        planeBarInit.setOption(planeBarOptions);
        var geoCoordMap;

        function ajaxmap() {

            $.get(
                'media/USA.json',
                function (USAJson) {
                    echarts.registerMap('USA', USAJson, {
                        Alaska: {
                            left: -131,
                            top: 25,
                            width: 15
                        },
                        Hawaii: {
                            left: -110,
                            top: 28,
                            width: 5
                        },
                        'Puerto Rico': {
                            left: -76,
                            top: 26,
                            width: 2
                        }
                    });
                    // $.getJSON('media/geoMap.json').done(function(data)
                    // {
                    $.getJSON('/iwherelik_0.1/getGeoCoordMap.do').done(function (data) {
                        // geoCoordMap=data.data;
                        mapInit.setOption({
                            series: {
                                data: data.data
                                // data.data
                            }
                        });
                        // planeInit.setOption({
                        // series : [{},{},{
                        // data : data.data
                        // }
                        // ]
                        // });
                    });

                    var mapOption = {
                        // backgroundColor : '#404a59',
                        tooltip: {
                            trigger: 'item',
                            show: false
                        },
                        geo: {
                            show: false,
                            map: 'USA',
                            label: {
                                emphasis: {
                                    show: true
                                }
                            },
                            roam: true,
                            tooltip: {
                                trigger: 'item'
                            },
                            itemStyle: {
                                normal: {
                                    areaColor: "#323c48",
                                    borderColor: '#111'
                                },
                                emphasis: {
                                    areaColor: '#2a333d'
                                }
                            }
                        },
                        series: {
                            // name : geoCoordMap[dataItem[0].name],
                            type: 'scatter',
                            coordinateSystem: 'geo',
                            data: [],// transformData(geoCoordMap),
                            symbolSize: 5,
                            label: {
                                normal: {
                                    formatter: '{b}',
                                    position: 'right',
                                    show: false
                                },
                                emphasis: {
                                    show: true
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: '#ddb926'
                                }
                            }

                        }
                    };

                    mapInit.setOption(mapOption);

                    mapInit
                        .on(
                        'click',
                        function (params) {
                            if (params.componentType === 'series') {
                                console
                                    .log(params.componentType);
                                // 点击终点，绘制柱状图
                                if (params.seriesType === 'scatter') {
                                    // 更新柱状图
                                    // $.get('media/bjdata.json').done(function(data)
                                    // {
                                    $
                                        .getJSON(
                                        '/iwherelik_0.1/getFlightCount.do?airport='
                                        + params.name)
                                        .done(
                                        function (data) {
                                            planeBarInit
                                                .setOption({
                                                    title: {
                                                        text: '航班数量-起点：'
                                                        + params.name
                                                    },
                                                    xAxis: [{
                                                        data: data.categories
                                                    }],
                                                    series: {
                                                        data: data.data
                                                    }
                                                });
                                            // $.getJSON('getFlightData.do?airport='+params.name).done(function(data)
                                            // {
                                            //
                                            // defaultData
                                            // = [[
                                            // params.name,
                                            // data
                                            // ]];
                                            // defaultData.forEach(setDataStyle);
                                            //
                                            // planeInit.setOption(planeOption);
                                            // });
                                            $
                                                .getJSON(
                                                '/iwherelik_0.1/getFlightTestData.do?airport='
                                                + params.name)
                                                .done(
                                                function (data) {

                                                    defaultData = [[
                                                        params.name,
                                                        data]];
                                                    defaultData
                                                        .forEach(setDataStyle);

                                                    planeInit
                                                        .setOption({
                                                            series: [
                                                                {
                                                                    data: data.line1
                                                                },
                                                                {
                                                                    data: data.line2
                                                                },
                                                                {
                                                                    data: data.points
                                                                }]
                                                        });
                                                });
                                        });
                                }
                            }
                        });
                    // ajaxPlane();
                });
        }

        var series = [];

        var planeOption = {
            backgroundColor: '#404a59',
            title: {
                show: false
            },
            tooltip: {
                trigger: 'item'
            },
            legend: {
                show: false
            },
            geo: {
                // show : false,
                map: 'USA',
                label: {
                    emphasis: {
                        show: false
                    }
                },
                roam: true,
                itemStyle: {
                    normal: {
                        areaColor: '#323c48',
                        borderColor: '#404a59'
                    },
                    emphasis: {
                        areaColor: '#2a333d'
                    }
                }

            },
            series: series
        };

        function setDataStyle(item, i) {
            $.ajax({
                type: 'post',
                async: false,
                // url: 'media/A2Cdata.json',
                url: '/iwherelik_0.1/getA2Cdata.do',
                dataType: 'json',
                success: function (data) {
                    geoCoordMap = data;
                    console.log("success");
                },
                error: function () {
                    alert("error");
                }
            });

            series.push({
                name: item[0],
                type: 'lines',
                zlevel: 2,
                effect: {
                    show: true,
                    period: 6,
                    trailLength: 0.7,
                    color: '#fff',
                    symbolSize: 3
                },
                lineStyle: {
                    normal: {
                        color: '#a6c84c',
                        width: 0,
                        curveness: 0.2
                    }
                },
                // data : convertData(item[1])
                data: []
            }, {
                name: item[0],
                type: 'lines',
                zlevel: 1,
                effect: {
                    show: true,
                    period: 6,
                    trailLength: 0,
                    symbolSize: 10
                },
                lineStyle: {
                    normal: {
                        color: '#a6c84c',
                        width: 1,
                        opacity: 0.4,
                        curveness: 0.2
                    }
                },
                // data : convertData(item[1])
                data: []
            }, {
                name: item[0],
                type: 'effectScatter',
                coordinateSystem: 'geo',
                zlevel: 2,
                rippleEffect: {
                    brushType: 'stroke'
                },
                label: {
                    normal: {
                        show: true,
                        position: 'right',
                        formatter: '{b}'
                    }
                },
                symbolSize: function (val) {
                    console.log(val);
                    return val[2] / 100;
                },
                itemStyle: {
                    normal: {
                        color: '#a6c84c'
                    }
                },
                data: []

            });
        }

        function ajaxPlane() {

            ajaxmap();
            // 发送航线数据请求，并加到地图上

            var color = ['#a6c84c', '#ffa022', '#46bee9'];

            // var defaultData = [ [ 'San Diego International-Lindbergh', BJData ]
            // ];
            // [['Thigpen', BJData], ['Livingston Municipal', SHData], ['广州',
            // GZData]].forEach(function
            // (item, i) {
            $
                .getJSON(
                '/iwherelik_0.1/getFlightTestData.do?airport='
                + 'San Diego International-Lindbergh')
                .done(
                function (data) {

                    defaultData = [[
                        'San Diego International-Lindbergh', data]];
                    function setDataStyle(item, i) {
                        $.ajax({
                            type: 'post',
                            async: false,
                            // url: 'media/A2Cdata.json',
                            url: 'getA2Cdata.do',
                            dataType: 'json',
                            success: function (data) {
                                geoCoordMap = data;
                                console.log("success");
                            },
                            error: function () {
                                alert("error");
                            }
                        });

                        series.push({
                            name: item[0],
                            type: 'lines',
                            zlevel: 2,
                            effect: {
                                show: true,
                                period: 6,
                                trailLength: 0.7,
                                color: '#fff',
                                symbolSize: 3
                            },
                            lineStyle: {
                                normal: {
                                    color: '#a6c84c',
                                    width: 0,
                                    curveness: 0.2
                                }
                            },
                            data: data.line1

                        }, {
                            name: item[0],
                            type: 'lines',
                            zlevel: 1,
                            effect: {
                                show: true,
                                period: 6,
                                trailLength: 0,
                                symbolSize: 10
                            },
                            lineStyle: {
                                normal: {
                                    color: '#a6c84c',
                                    width: 1,
                                    opacity: 0.4,
                                    curveness: 0.2
                                }
                            },
                            data: data.line2

                        }, {
                            name: item[0],
                            type: 'effectScatter',
                            coordinateSystem: 'geo',
                            zlevel: 2,
                            rippleEffect: {
                                brushType: 'stroke'
                            },
                            label: {
                                normal: {
                                    show: true,
                                    position: 'right',
                                    formatter: '{b}'
                                }
                            },
                            symbolSize: function (val) {
                                console.log(val);
                                return val[2] / 100;
                            },
                            itemStyle: {
                                normal: {
                                    color: '#a6c84c'
                                }
                            },
                            data: data.points
                        });
                    }

                    defaultData.forEach(setDataStyle);
                    planeInit.setOption(planeOption);

                });

            // defaultData.forEach(setDataStyle);
            // planeInit.setOption(planeOption);

        } // 浏览器窗口大小变化，重绘地图
    }

    //window.onresize = function() {
    //	MapContainerDom.width($(window).width());
    //	MapContainerDom.height($(window).height());
    //	MapContainerDom.css({
    //		top : (-MapContainerDom.height()),
    //		left : 0
    //	});
    //	mapInit.resize();
    //	planeMapContainerDom.width($(window).width());
    //	planeMapContainerDom.height($(window).height());
    //	planeMapContainerDom.css({
    //		top : (-planeMapContainerDom.height()),
    //		left : 0
    //	});
    //	planeInit.resize();
    //};

});
