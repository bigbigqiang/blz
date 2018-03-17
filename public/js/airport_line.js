/**
 * Created by Administrator on 2016/8/30.
 */
$(function () {
    var planeMapContainer = $('#plane_container');  //底图和初始化航线
    //设置底图宽高
    function setSize(obj){
        obj.width($(window).width());
        obj.height($(window).height());
    }
    setSize(planeMapContainer);

    //初始化航线container
    var planeMapChart = document.getElementById('plane_container');
    var planeInit = echarts.init(planeMapChart);
    //初始化地图上所有的数据点container
    planeMapContainer.append('<div id="map_point_container"></div>');
    var mapPointContainer = $('#map_point_container');
    setSize(mapPointContainer);
    var mapPointChart = document.getElementById('map_point_container');
    var mapPointInit = echarts.init(mapPointChart);
    mapPointContainer.css({
        top: (-mapPointContainer.height()),
        left: 0
    });
    var mapOption = {
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
                    borderColor: '#111111'
                },
                emphasis: {
                    areaColor: '#2a333d'
                }
            }
        },
        series: {
            type: 'scatter',
            coordinateSystem: 'geo',
            data: [],
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
    mapPointInit.showLoading();
    var series = [];
    var geoCoordMap;
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
    //初始化航线柱状图
    var planeBarContainer = $('#plane_bar_container');
    var planeBarInit = echarts.init(document.getElementById('plane_bar_container'));
    var planeBarOptions = {
        backgroundColor: '#cccccc',
        title: {
            text: '航班数量-起点：' + 'San Diego International-Lindbergh'
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

    ajaxPlane();
    //请求美国地图,获取所有点数据坐标，并给每个数据添加点击事件
    function ajaxMap(){
        $.get('/js/USA.json', function (USAJson) {
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
            mapPointInit.setOption(mapOption);
            $.getJSON('/iwherelink/getGeoCoordMap.do').done(function (data) {
                mapPointInit.hideLoading();
                mapPointInit.setOption({
                    series: {
                        data: data.data
                    }
                });
                mapPointInit.on('click', function (params) {
                    if (params.componentType === 'series') {
                        // 点击终点，绘制柱状图
                        if (params.seriesType === 'scatter') {
                            $.getJSON('/iwherelink/getFlightCount.do?airport=' + params.name).done(function (data) {
                                planeBarInit.setOption({
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
                                $.getJSON('/iwherelink/getFlightTestData.do?airport=' + params.name).done(function (data) {
                                    defaultData = [[params.name, data]];
                                    defaultData.forEach(setDataStyle);
                                    planeInit.setOption({
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
            });
        });
    }
    //设置每个迁徙点数据的样式
    function setDataStyle(item, i) {
        $.ajax({
            type: 'post',
            url: '/iwherelink/getA2Cdata.do',
            dataType: 'json',
            success: function (data) {
                geoCoordMap = data;
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
                color: '#ffffff',
                symbolSize: 3
            },
            lineStyle: {
                normal: {
                    color: '#a6c84c',
                    width: 0,
                    curveness: 0.2
                }
            },
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
    //请求航线数据，并添加到地图上
    function ajaxPlane() {
        ajaxMap();
        var color = ['#a6c84c', '#ffa022', '#46bee9'];
        $.getJSON('/iwherelink/getFlightTestData.do?airport=' + 'San Diego International-Lindbergh').done(function (data) {
                defaultData = [['San Diego International-Lindbergh', data]];
                function setDataStyle(item, i) {
                $.ajax({
                    type: 'post',
                    url: '/iwherelink/getA2Cdata.do',
                    dataType: 'json',
                    success: function (data) {
                        geoCoordMap = data;
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
                        color: '#ffffff',
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
                planeBarInit.setOption(planeBarOptions);
            });
    }
    $(window).resize(function(){
        setSize(planeMapContainer);
        setSize(mapPointContainer);
        planeInit.resize();
        mapPointInit.resize();
        mapPointContainer.css({
            top: (-mapPointContainer.height()),
            left: 0
        });
    })
});