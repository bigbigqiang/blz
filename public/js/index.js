$(function () {
    var dbStatics = $('#db-data');
    var serviceStatics = $('#service-data');
    var viewStatics = $('#view-data');
    var dicStatics = $('#dic-data');
    var indexTableTotalnum = $('#index-table-totalnum');
    //四个状态统计
    function ajaxStatics(obj, url) {
        $.ajax({
            type: 'get',
            url: url,
            dataType: 'json',
            success: function (data) {
                if (data.code == 0) {
                    console.log(data);
                    for (var i = 0; i < data.data.length; i++) {
                        if (data.data[i].status == 0) {
                            var goingNum = data.data[i].count;
                        }
                        else {
                            var stopNum = data.data[i].count;
                        }
                    }
                    var totalNum = goingNum + stopNum;
                    console.log(totalNum);
                    obj.find('.state-totalnum').text(totalNum);
                    obj.find('.state-num  em:first').text(goingNum);
                    obj.find('.state-num  em:last').text(stopNum);
                }
                else {
                    layer.msg(data.message, {time: 2000});
                }
            },
            error: function (e) {
                layer.msg('获取统计状态失败', {time: 2000});
            }
        });
    }
    //索引大表编码总量
    $('.sub-menu a[href="./index.do"]').addClass('current_page');
    ajaxStatics(dbStatics, '/iwherelink/dashboard/database.do');
    ajaxStatics(serviceStatics, '/iwherelink/dashboard/webservice.do');
    ajaxStatics(viewStatics, '/iwherelink/view/statistic.do');
    ajaxStatics(dicStatics, '/iwherelink/combine/statistic.do');
    //ajaxIndex(indexTableTotalnum, '/iwherelink/indexBigTable/getAll.do?page=1&order=code&mode=0');


    var codeColors = ['#90caf9', '#52abf1', '#2196f3', '#095ea1'];
    //初始化作业运行情况
    var taskChart = echarts.init(document.getElementById('task-chart'));
    var taskChartOptions = {
        legend: {
            data: [],
            orient: 'horizontal',
            top: '10%',
            left: '10%',
            icon: 'circle',
            itemWidth: 10,
            itemHeight: 10,
            itemGap: 20,
            textStyle: {
                color: '#8497a0'
            },
            selectedMode: false
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                lineStyle: {
                    color: '#ffffff',
                    type: 'dashed'
                }
            },
            backgroundColor: '#4f5f6f',
            padding: 8,
            textStyle: {
                color: '#ffffff'
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: [],
            splitLine: {
                show: false
            },
            axisLine: {
                show: false
            },
            axisLabel: {
                interval: 0,
                textStyle: {
                    color: '#90a4ae'
                }
            }
        },
        yAxis: {
            type: 'value',
            boundaryGap: [0, '100%'],
            splitLine: {
                lineStyle: {
                    color: '#373c44'
                }
            },
            axisLine: {
                show: false
            },
            axisLabel: {
                interval: 0,
                textStyle: {
                    color: '#90a4ae'
                }
            }
        },
        series: [
            {
                name: '迁移作业量',
                type: 'line',
                smooth: true,
                symbol: 'none',
                sampling: 'average',
                itemStyle: {
                    normal: {
                        color: '#36b3b3'
                    }
                },
                areaStyle: {
                    normal: {
                        color: '#36b3b3'
                    }
                },
                data: []
            },
            {
                name: '清洗作业量',
                type: 'line',
                smooth: true,
                symbol: 'none',
                sampling: 'average',
                itemStyle: {
                    normal: {
                        color: '#61707c'
                    }
                },
                areaStyle: {
                    normal: {
                        color: '#61707c'
                    }
                },
                data: []
            }
        ]
    };
    taskChart.setOption(taskChartOptions);
    //初始化索引任务运行情况
    var indexTaskChart = echarts.init(document.getElementById('index-task-chart'));
    var indexTaskChartOptions = {
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: [],
            orient: 'horizontal',
            top: '10%',
            left: '10%',
            icon: 'circle',
            itemWidth: 10,
            itemHeight: 10,
            itemGap: 20,
            textStyle: {
                color: '#8497a0'
            },
            selectedMode: false
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: [],
            splitLine: {
                lineStyle: {
                    color: '#42474f'
                }
            },
            axisLine: {
                lineStyle: {
                    color: '#62676d'
                }
            },
            axisLabel: {
                interval: 0,
                textStyle: {
                    color: '#90a4ae'
                }
            }
        },
        yAxis: {
            type: 'value',
            splitLine: {
                lineStyle: {
                    color: '#42474f'
                }
            },
            axisLine: {
                lineStyle: {
                    color: '#62676d'
                }
            },
            axisLabel: {
                textStyle: {
                    color: '#90a4ae'
                }
            }
        },
        series: [
            {
                name: '原表索引',
                type: 'line',
                data: [],
                lineStyle: {
                    normal: {
                        color: '#fad567'
                    }
                },
                symbol: 'circle',
                symbolSize: 10,
                itemStyle: {
                    normal: {
                        color: '#fad567'
                    }
                }
            },
            {
                name: '索引大表索引',
                type: 'line',
                data: [],
                lineStyle: {
                    normal: {
                        color: '#21c393'
                    }
                },
                symbol: 'circle',
                symbolSize: 10,
                itemStyle: {
                    normal: {
                        color: '#21c393'
                    }
                }
            }
        ]
    };
    indexTaskChart.setOption(indexTaskChartOptions);

    //初始化发布服务情况
    var serviceChart = echarts.init(document.getElementById('service-chart'));
    var serviceChartOptions = {
        tooltip: {
            trigger: 'item',
            show: false
        },
        legend: {
            orient: 'vertical',
            right: '15%',
            bottom: '10%',
            data: [],
            icon: 'circle',
            itemWidth: 10,
            itemHeight: 10,
            itemGap: 20,
            textStyle: {
                color: '#8497a0'
            },
            selectedMode: false
        },
        series: [
            {
                name: '',
                type: 'pie',
                radius: ['50%', '70%'],
                center: ['30%', '50%'],
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: false,
                        position: 'center',
                        formatter: "{b}\n{c}"
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: '16',
                            color: '#fff'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data: []
            }
        ]
    };
    serviceChart.setOption(serviceChartOptions);
   //索引大表编码总量

    //初始化索引大表编码类型
    var indexTableChart = echarts.init(document.getElementById('index-table-chart'));
    var indexTableChartOptions = {
        tooltip: {
            trigger: 'axis'
        },
        xAxis: {
            type: 'category',
            data: [],
            splitLine: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: '#3d4249'
                }
            },
            axisLabel: {
                interval: 0,
                textStyle: {
                    color: '#889ba5'
                }
            }
        },
        yAxis: {
            type: 'value',
            splitLine: {
                lineStyle: {
                    color: '#343a42'
                }
            },
            axisLine: {
                show: false
            },
            axisLabel: {
                textStyle: {
                    color: '#889ba5'
                }
            }
        },
        series: [
            {
                name: '',
                type: 'bar',
                data: [],
                barGap: 48,
                barWidth:31
            },
            {
                name: '',
                type: 'line',
                data: [],
                itemStyle: {
                    normal: {
                        color: '#f8b509'
                    }
                },
                symbol: 'circle',
                symbolSize: 9,
                showAllSymbol: true
            }
        ]
    };
    indexTableChart.setOption(indexTableChartOptions);

    $(window).resize(
        function () {
            taskChart.resize();
            indexTaskChart.resize();
            serviceChart.resize();
            indexTableChart.resize();
        }
    );
    $('#table-range').mCustomScrollbar({
        axis:'yx'
    });
    //获取折线图数据
    function getLineData(url,lineChart){
        $.ajax({
            type: 'get',
            url: url,
            dataType: 'json',
            success: function (data) {
                if (data.code == 0) {
                    var legend = [];
                    var xAxis = data.xAxis;
                    legend.push(data.option[0].name);
                    legend.push(data.option[1].name);
                    lineChart.setOption(
                        {
                            xAxis:{
                                data:xAxis
                            },
                            legend:{
                                data:legend
                            },
                            series:[
                                {
                                    name:legend[0],
                                    data:data.option[0].data
                                },
                                {
                                    name:legend[1],
                                    data:data.option[1].data
                                }
                            ]
                        }
                    );
                }
                else {
                    layer.msg(data.message, {time: 2000});
                }
            },
            error: function (e) {
                layer.msg('获取图表数据失败', {time: 2000});
            }
        });
    }
    getLineData('/iwherelink/dashboard/job.do',taskChart);
    getLineData('/iwherelink/dashboard/index.do',indexTaskChart);
    //发布服务
    $.ajax({
        type: 'get',
        url: '/iwherelink/dashboard/publish.do',
        dataType: 'json',
        success: function (data) {
            if (data.code == 0) {
                console.log(data.data[0].count);
                var jsonNum=data.data[0].count;
                var soapNum=data.data[1].count;
                console.log(jsonNum);
                console.log(soapNum);
                var legend=[];
                var pieData=[];
                for(var i=0;i<data.option.length;i++){
                    legend.push(data.option[i].name);
                    var item={
                        value: data.option[i].data,
                        name: data.option[i].name,
                        itemStyle: {
                            normal: {
                                color: codeColors[i]
                            }
                        }
                    };
                    pieData.push(item);
                }
                serviceChart.setOption({
                    legend:{
                      data:legend
                    },
                    series:{
                        data:pieData
                    }
                });
                $('#soap-num span').text(soapNum);
                $('#json-num span').text(jsonNum);
            }
            else {
                layer.msg(data.message, {time: 2000});
            }
        },
        error: function (e) {
            layer.msg('获取图表数据失败', {time: 2000});
        }
    });
    //右侧索引大表相关
    $.ajax({
        type: 'get',
        url: '/iwherelink/dashboard/bigtable.do',
        dataType: 'json',
        success: function (data) {
            if (data.code == 0) {
                var totalNum=data.totalNum;
                var xAxis = data.xAxis;
                var lineData=[];
                for(var j=0;j<data.option[0].data.length;j++){
                    var item={
                        value:data.option[0].data[j],
                        itemStyle: {
                            normal: {
                                color: codeColors[j]
                            }
                        }
                    };
                    lineData.push(item);
                }
                indexTableChart.setOption({
                    xAxis:{
                        data:xAxis
                    },
                    series:[{
                        data:lineData},
                        {
                            data:data.option[0].data
                        }]
                });
                $('#index-table-totalnum p').text(totalNum);
                var tr='';
                for(var i=0;i<data.data.length;i++){
                    tr+='<tr>'+
                        '<td class="hidden">'+data.data[i].id+'</td>'+
                        '<td>'+data.data[i].name+'</td>'+
                        '<td>'+data.data[i].data+'</td>'+
                        '</tr>';
                }
                $('#table-range').find('tbody').empty().append(tr);
            }
            else {
                layer.msg(data.message, {time: 2000});
            }
        },
        error: function (e) {
            layer.msg('获取图表数据失败', {time: 2000});
        }
    });
});
