/**
 * Created by Administrator on 2016/8/11.
 */
/**
 * Created by Administrator on 2016/8/1.
 */
$(function () {
    var pieContainer;   //饼状图
    var pointContainer;   //散点图
    var lineContainer;   //折线图
    var barContainer;   //柱状图
    var dataType = $('#data-type');    //业务场景下拉框
    var dicTypeSelect = $('#dic-type');   //字典聚类下拉框
    var chartTypeSelect = $('#chart-type'); //图表类型下拉框
    var startTime = $('.select-stime'); //开始时间
    var endTime = $('.select-etime'); //结束时间
    var anaStander = $('.select-stander');  //统计标准
    var chartContainer = $('.chart-container');
    var xSelect = $('#x-condi');      //x轴下拉框
    var ySelect = $('#y-condi');      //y轴下拉框
    var zSelect = $('#z-condi');      //z轴下拉框
    //设置图表的宽度
    function setSize() {
        var winWidth = $(window).width();
        chartContainer.width(winWidth - 265);
    }

    setSize();
    $(window).resize(function () {
        setSize();
    });
    //初始化设置筛选数据checked为false,主要是消除火狐浏览器的记忆
    $('.select-data').find('input').prop("checked", false);
    
    function init(){
    	 //初始化业务场景数据
        $.ajax({
            type: 'get',
            url: '/iwherelink/getSourceTypeList.do',
            dataType: 'json',
            success: function (data) {
            	dataType.empty();
            	var option = "<option value='0'>请选择业务场景</option>";
                $.each(data, function (n, value) {
                	//if('85' == value.id){
                		option += "<option value='" + value.id + "'>" + value.sourceType + "</option>";
                	//}
                });
                dataType.append(option);
            },
            error: function () {
                alert('统计分析初始化业务场景失败，请重新刷新页面')
            }
        });
    }
    init();
    //选择业务场景，出现不同的字典聚类
    dataType.change(function () {
        var sourceTypeId = $(this).find('option:selected').val();
        $.ajax({
            type: 'post',
            url: '/iwherelink/getConditionDictionaryTypeBySourceType.do',
            dataType: 'json',
            data: {
                id: sourceTypeId
            },
            success: function (data) {
                dicTypeSelect.empty();
                var option = "<option value='0'>请选择字典聚类</option>";
                $.each(data, function (n, value) {
                    option += "<option value='" + value.id + "'>" + value.typeName + "</option>";
                });
                dicTypeSelect.append(option);
                //X轴
                xSelect.empty();
                var optionx = "<option value='0'>请选择X轴/类别名</option>";
                xSelect.append(optionx);
                //Y轴
                ySelect.empty();
                var optiony = "<option value='0'>请选择Y轴/类别名</option>";
                ySelect.append(optiony);
                //z轴
                zSelect.empty();
                var optionz = "<option value='0'>请选择Z轴/类别名</option>";
                zSelect.append(optionz);
            },
            error: function () {
                alert('统计分析初始化字典聚类失败，请重新刷新页面')
            }
        });
    });
    //选择不同的字典聚类，出现不同的字典
    dicTypeSelect.change(function () {
        var sourceTypeId = dataType.val();
        var dictionaryTypeId = $(this).find('option:selected').val();
        $.ajax({
            type: 'post',
            url: '/iwherelink/getConditionList.do',
            dataType: 'json',
            data: {
                sourceTypeId: sourceTypeId,
                dictionaryTypeId: dictionaryTypeId
            },
            success: function (data) {
            	 //X轴
                xSelect.empty();
                var optionx = "<option value='0'>请选择X轴/类别名</option>";
                //Y轴
                ySelect.empty();
                var optiony = "<option value='0'>请选择Y轴/类别名</option>";
                //z轴
                zSelect.empty();
                var optionz = "<option value='0'>请选择Z轴/类别名</option>";
                var option = '';
                $.each(data, function (n, value) {
                    option += "<option value='" + value.id + "'>" + value.chineseName + "</option>";
                });
                xSelect.append(optionx).append(option);
                ySelect.append(optiony).append(option);
                zSelect.append(optionz).append(option);
            },
            error: function () {
                alert('统计分析初始化属性失败，请重新刷新页面')
            }
        });
    });
    //初始化滚动条
    $('.select-cond form').mCustomScrollbar({
        scrollIntertia: 300  //滚动速度
    });
    //初始化日历插件
    $('.calender').datetimepicker({
        locale: 'zh-cn',
        format:'YYYY-MM-DD',
        dayViewHeaderFormat: 'YYYY MMMM',
        widgetPositioning: {
            horizontal: 'left',
            vertical: 'top'
        },
        allowInputToggle: true
    });
    //选择饼图，就没有图例下拉框
    chartTypeSelect.change(function () {
        var selectedId = $(this).find('option:selected').val();
        if (selectedId == 4) {
        	$('.z-axis').val('');
            $('.z-axis').hide();
        }
        else {
            $('.z-axis').show();
        }
    });
    //是否按时间筛选数据
    $('.select-data input').click(function () {
        var radioVal = $(this).val();
        if (radioVal == 1) {
            startTime.show();
            endTime.show();
            anaStander.show();
        }
        if (radioVal == 0) {
        	startTime.val('');
            startTime.hide();
            endTime.val('');
            endTime.hide();
            anaStander.hide();
        }
    });
    //x轴联动y轴
    xSelect.change(function () {
        var disabledVal = $(this).find('option:disabled');
        if (disabledVal) {
            disabledVal.prop("disabled", false);
        }
        var selected = $(this).find('option:selected');
        selected.prop("disabled", true);
        var xHtml = xSelect.html();
        ySelect.html(xHtml);
    });
    //x,y轴联动z轴
    ySelect.change(function () {
        var selectedClassOption = $(this).find('.selectedY');  //选中的项同时添加类名 selectedY
        if (selectedClassOption) {
            selectedClassOption.removeClass('selectedY');
            selectedClassOption.prop("disabled", false);
        }
        var selectedY = $(this).find('option:selected');
        selectedY.prop("disabled", true);
        selectedY.addClass('selectedY');
        var yHtml = ySelect.html();
        zSelect.html(yHtml);
    });
    //设置日历视图模式
    function setCanderModel(obj,viewMode,format){
        obj.data('DateTimePicker').options({
            viewMode:viewMode,
            format:format
        });
    }
    //不同的统计标准，显示不同的日历视图模式
    $('#stander').change(function () {
        var selectedVal = $(this).find('option:selected').val();
        var startCalender=$('#datetimepicker1');
        var endCalender=$('#datetimepicker2');
        if (selectedVal === 'YEAR') {
            setCanderModel(startCalender,'years','YYYY');
            setCanderModel(endCalender,'years','YYYY');
        }
        else if (selectedVal === 'MONTH') {
            setCanderModel(startCalender,'months','YYYY-MM');
            setCanderModel(endCalender,'months','YYYY-MM');
        }
        else if (selectedVal === 'DAY') {
            setCanderModel(startCalender,'days','YYYY-MM-DD');
            setCanderModel(endCalender,'days','YYYY-MM-DD');
        }
    });
    //生成图表
    $('#makeChart').click(function () {
    	var dataFromData = [];
        var dataTypeId = dataType.find('option:selected').val();   //业务场景
        var dicTypeId = dicTypeSelect.find('option:selected').val();   //字典聚类
        var chartHd = $('#chart-hd').val();   //图表标题
        var chartTypeId = chartTypeSelect.find('option:selected').val();
        var selectData = $('.select-data input:checked').val(); //筛选数据
        var xPropVal = xSelect.find('option:selected').val();
        var yPropVal = ySelect.find('option:selected').val();
        var zPropVal = zSelect.find('option:selected').val();
        var xPropValText = xSelect.find('option:selected').text();
        var yPropValText = ySelect.find('option:selected').text();
        var zPropValText = zSelect.find('option:selected').text();
        var sTime = $('#startTime').val();     //起始时间
        var eTime = $('#endTime').val();     //起始时间
        var anaSt = $('#stander').find('option:selected').val(); //统计标准
        chartContainer.html('');
        chartContainer.append("<div id='dataFrom'></div>");
        var dataFrom = $('#dataFrom');//数据来源饼图
        if (typeof(dataTypeId) == 'undefined' || dataTypeId == '' || "0" == dataTypeId || dataTypeId == null) {
            alert("亲,动一动您的小手,烦请选择业务场景后再做操作!");
            return;
        } else if (typeof(dicTypeId) == 'undefined' || dicTypeId == '' || "0" == dicTypeId || dicTypeId == null) {
            alert("亲,动一动您的小手,烦请选择字典聚类后再做操作!");
            return;
        }
        else if (typeof(chartTypeId) == 'undefined' || chartTypeId == '' || "0" == chartTypeId || chartTypeId == null) {
            alert("亲,动一动您的小手,烦请选择图表类型后再做操作!");
            return;
        }
        else if (typeof(selectData) == 'undefined' || selectData == '' || selectData == null) {
            alert("亲,动一动您的小手,烦请选择是否按照时间筛选数据后再做操作!");
            return;
        }
        else if (typeof(xPropVal) == 'undefined' || xPropVal == '' || "0" == xPropVal || xPropVal == null) {
            alert("亲,动一动您的小手,烦请选择X轴后再做操作!");
            return;
        }
        else if (typeof(yPropVal) == 'undefined' || yPropVal == '' || "0" == yPropVal || yPropVal == null) {
            alert("亲,动一动您的小手,烦请选择Y轴后再做操作!");
            return;
        }
        else if ($('.z-axis').css("display")=='block'&&(typeof(zPropVal) == 'undefined' || zPropVal == '' || "0" == zPropVal || zPropVal == null)) {
            alert("亲,动一动您的小手,烦请选择类目后再做操作!");
            return;
        }
        if (selectData == 1) {
            if (typeof(sTime) == 'undefined' || sTime == '' || sTime == null || typeof(eTime) == 'undefined' || eTime == '' || eTime == null || typeof(anaSt) == 'undefined' || anaSt == '' || anaSt == null || anaSt == '0') {
                alert("亲,动一动您的小手,烦请选择起始时间、终止时间和统计标准后再做操作!");
                return;
            }
        }
       var chartTypeValue = "name:" + xPropVal + ",value:" + yPropVal;
        if(4 != chartTypeId){
        	chartTypeValue += ",z:"+zPropVal;
        }
        $.ajax({
            type: "post",
            url: "/iwherelink/getChartData.do",
            dataType: "json",
            data: {
                data_product_type_grid: dataTypeId,
                data_dictionary_type_grid: dicTypeId,
                chartTypeValue: chartTypeValue,
                startDate: sTime,
                endDate: eTime,
                dateType: anaSt
            },
            success: function (data) {
            	if (4 == chartTypeId) {//饼形图渲染
                    if (data.analysisData.length > 10000) {//数据量太大的话 不适合饼图渲染
                        alert("亲,当前数据量过多,不适合采用饼形图，请选择使用其他图表类型展示!");
                        return;
                    }else{//此处需要分两种加以判断,1 X轴为数字,Y轴为类目  2 X轴为类目,Y轴为数字
                        var legendData=[];
                        var chartNode = '<div id="pie_container"></div>';
                        chartContainer.append(chartNode);
                        if(typeof(data) != 'undefined' && data.analysisData.length > 0){
                        	var isNumericVar = isNumeric(data.analysisData[0].name);
                        	//alert("value:"+data[0].name);
                        	if(isNumericVar){//X轴为数字
                        		for(var i = 0;i<data.analysisData.length;i++){
                            		legendData.push(data[i].value);
                                }
                        	}else{//X轴不为数字
                        		for(var i = 0;i<data.analysisData.length;i++){
                        			legendData.push(data.analysisData[i].name);
                                }
                        	}
                        }
                        //alert(legendData);
                        var option = {//全局的设置
                            backgroundColor: '#cccccc',
                            title: {
                                text: chartHd,
                                left: 'center',
                                top: 20,
                                textStyle: {
                                    color: '#313436'
                                }
                            },
                            tooltip: {
                                trigger: 'item',
                                formatter: '{a}<br />{b}:{c}({d}%)'
                            },
                            legend: {
                                orient: 'vertical',
                                x: 'left',
                                data:legendData
                            },
                            series: {//系列
                                name: chartHd,
                                type: 'pie',
                                selectOffset: 30,
                                radius: '55%',
                                center: ['50%', '50%'],
                                data: data.analysisData.sort(function (a, b) {
                                    return (isNumeric(a.value) && isNumeric(b.value))?a.value- b.value:a.name - b.name ;
                                }),
                                label: {
                                    normal: {
                                        textStyle: {
                                            color: 'rgba(44,52,60,0.8)'
                                        }
                                    }
                                },
                                labelLine: {
                                    normal: {
                                        lineStyle: {//饼图的视觉引导线的颜色
                                            color: 'rgba(49,52,54,0.8)'
                                        },
                                        smooth: 0.2,
                                        length: 10,
                                        length2: 20
                                    }
                                },
                                itemStyle: {//阴影 透明度 颜色 边框颜色 边框宽度 
                                    normal: {//表示正常显示下的样式
                                        shadowBlur: 200,//阴影大小
                                        shadowColor: 'rgba(0,0,0,0.5)'//阴影的颜色
                                    },
                                    emphasis:{//鼠标hover时候的高亮样式
                                    	 shadowBlur: 200,//阴影大小
                                         shadowColor: 'rgba(0,0,0,0.5)'//阴影的颜色
                                    }
                                }
                            }
                        };
                        //alert(legendData);
                        //alert(option.legend.data)
                        var pieContainer = $('#pie_container').get(0);
                        var pieChart = echarts.init(pieContainer);
                        dataFromData=pieChartDisplayFromDbType(data.allDbTypeDataSize);
                        dataFromChart(dataFrom,dataFromData);
                        //设置初始化选项
                        pieChart.setOption(option);
                        $(window).resize(function () {
                            pieChart.resize();
                        });
                    }
                }else if (1 == chartTypeId) {//折线图
                    var chartNode = '<div id="line_container"></div>';
                    chartContainer.append(chartNode);
                    var series=[];
                    reCreatDataFormat(data.analysisData);
                    //设置每个图例数据的样式
                    for(var i=0;i<dataArr[0].length;i++){
                        var  everyStyle={
                            name: dataArr[0][i],
                            type: 'line',
                            data: dataArr[3][dataArr[0][i]],
                            markPoint: {
                                data: [
                                    {type: 'max', name: '最大值'},
                                    {type: 'min', name: '最小值'}
                                ]
                            },
                            markLine: {
                                data: [
                                    {type: 'average', name: '平均值'}
                                ]
                            }
                        };
                        series.push(everyStyle);
                    }
                    var option = {
                        backgroundColor: '#cccccc',
                        title: {
                            text: chartHd,
                            left: 'center',
                            top: 20,
                            textStyle: {
                                color: '#313436'
                            }
                        },
                        tooltip: {
                            trigger: 'axis'
                        },
                        legend:{
                            data:dataArr[0]
                        },
                        toolbox: {
                            show: true,
                            feature: {
                                dataView: {readOnly: true, show: false},
                                magicType: {type: ['line', 'bar']},
                                restore: {show: false},
                                saveAsImage: {show: false}
                            }
                        },
                        xAxis: {
                            type: 'category',
                            boundaryGap: false,
                            data: dataArr[1],
                            name: xPropValText
                        },
                        yAxis: {
                            type: 'value',
                            data:dataArr[2],
                            name: yPropValText
                        },
                        series:series
                    };
                    var lineContainer = $('#line_container').get(0);
                    var lineChart = echarts.init(lineContainer);
                    lineChart.setOption(option);
                    dataFromData=pieChartDisplayFromDbType(data.allDbTypeDataSize);
                    //console.log(dataFromData);
                    //console.log(dataFrom);
                    dataFromChart(dataFrom,dataFromData);
                    $(window).resize(function () {
                        lineChart.resize();
                    });
                }else if (2 == chartTypeId) {//柱状图
                    var chartNode = '<div id="bar_container"></div>';
                    chartContainer.append(chartNode);
                    
                    var series=[];
                    reCreatDataFormat(data.analysisData);
                    //设置每个图例数据的样式
                    for(var i=0;i<dataArr[0].length;i++){
                        var  everyStyle={
                            name: dataArr[0][i],
                            type: 'bar',
                            data: dataArr[3][dataArr[0][i]],
                            markPoint: {
                                data: [
                                    {type: 'max', name: '最大值'},
                                    {type: 'min', name: '最小值'}
                                ]
                            },
                            markLine: {
                                data: [
                                    {type: 'average', name: '平均值'}
                                ]
                            }
                        };
                        series.push(everyStyle);
                    }
                    var option = {
                        backgroundColor: '#cccccc',
                        title: {
                            text: chartHd,
                            left: 'center',
                            top: 20,
                            textStyle: {
                                color: '#313436'
                            }
                        },
                        legend: {
                            data: dataArr[0]
                        },
                        tooltip: {
                            trigger: 'axis'
                        },
                        toolbox: {
                            show: true,
                            feature: {
                                dataZoom: {show: false},
                                dataView: {readOnly: true, show: false},
                                magicType: {show: true, type: ['line', 'bar']},
                                restore: {show: false},
                                saveAsImage: {show: false}
                            }
                        },
                        xAxis: {
                            type: 'category',       //类目
                            boundaryGap: false,
                            data: dataArr[1],
                            name: xPropValText
                        },
                        yAxis: {
                            type: 'value',
                            data:dataArr[2],
                            name: yPropValText
                        },
                        series:series
                    };
                    var barContainer = $('#bar_container').get(0);
                    var barChart = echarts.init(barContainer);
                    dataFromData=pieChartDisplayFromDbType(data.allDbTypeDataSize);
                    dataFromChart(dataFrom,dataFromData);
                    //设置初始化选项
                    barChart.setOption(option);
                    $(window).resize(function () {
                        barChart.resize();
                    });
                }else if (3 == chartTypeId) {//散点图
                    var chartNode = '<div id="point_container"></div>';
                    chartContainer.append(chartNode);
                    var series=[];
                    reCreatDataFormat(data.analysisData);
                    //设置每个图例数据的样式
                    for(var i=0;i<dataArr[0].length;i++){
                        var  everyStyle={
                            name: dataArr[0][i],
                            type: 'scatter',
                            data:dataArr[3][dataArr[0][i]],
                            symbolSize:20,
                            label: {
                                emphasis: {
                                    show: true,
                                    formatter: function (param) {
                                        return [param.data[0],param.data[1]];
                                    },
                                    position: 'top'
                                }
                            }
                        };
                        series.push(everyStyle);
                    }
                    var option = {
                        backgroundColor: '#cccccc',
                        title: {
                            text: chartHd,
                            left: 'center',
                            top: 20,
                            textStyle: {
                                color: '#313436'
                            }
                        },
                        legend:{
                            data:dataArr[0]
                        },
                        xAxis: {
                            type:'category',
                            data: dataArr[1],
                            splitLine: {
                                lineStyle: {
                                    type: 'dashed'
                                }
                            }
                        },
                        yAxis: {
                            type:'value',
                            data: dataArr[2],
                            splitLine: {
                                lineStyle: {
                                    type: 'dashed'
                                }
                            },
                            scale: true
                        },
                        series:series
                    };
                    var pointContainer = $('#point_container').get(0);
                    var pointChart = echarts.init(pointContainer);
                    dataFromData=pieChartDisplayFromDbType(data.allDbTypeDataSize);
                    dataFromChart(dataFrom,dataFromData);
                    //设置初始化选项
                    pointChart.setOption(option);
                    $(window).resize(function () {
                        pointChart.resize();
                    });
                }
            },
            error: function (data) {
                alert("统计分析数据加载异常,烦请刷新页面后再做尝试,其它问题请联系管理员!");
            }
        });
    });
    
//统计分析的四种图表右上角饼图展示(来自不同的DB)   
function pieChartDisplayFromDbType(allDbTypeDataSize){
	var dataFromData=[];
	if(typeof(allDbTypeDataSize) != 'undefined' && null != allDbTypeDataSize && "" != allDbTypeDataSize){
		 $.each(allDbTypeDataSize, function(key, value){
			 	var map = {value:value,name:key};
			 	dataFromData.push(map);
	        });
	        return dataFromData;
	}
}
    
    
// 2016年8月23日09:15:40  张松强 add begin
function dataFromChart(obj,data){
    if(!obj.is(':empty')){//如果内容非空，先清除
        obj.empty();
    }
    var dataFromOption = {//定义饼图参数
        backgroundColor: 'rgba(0,0,0,0.1)',
        title: {
            text: "数据来源",
            left: 'center',
            top: 10,
            textStyle: {
                color: '#307D3D',
                fontSize:16
            }
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a}<br />{b}:{c}({d}%)'
        },
        /*visualMap:{
            show:false,
            min:80,
            inRange:{
                colorLightness:[0,1]
            }
        },*/
        series: {//系列
            name: '访问来源',
            type: 'pie',
            //selectOffset: 30,
            radius: '55%',
            center: ['50%', '50%'],
            data:data.sort(function(a,b){ return a.value - b.value}),//数据传入
            roseType:'angle',
            label: {
                normal: {
                    textStyle: {
                        color: 'rgba(48,125,61,0.8)'
                    }
                }
            },
            labelLine: {
                normal: {
                    lineStyle: {//饼图的视觉引导线的颜色
                        color: 'rgba(48,125,61,0.8)'
                    },
                    smooth: 0.2,
                    length: 10,
                    length2: 20
                }
            },
            itemStyle: {//阴影 透明度 颜色 边框颜色 边框宽度
                normal: {//表示正常显示下的样式
                    color:'#274838',
                    shadowBlur: 200,//阴影大小
                    shadowColor: 'rgba(0,0,0,0.5)'//阴影的颜色
                }
            }
        }
    };
    //把div显示出来
    obj.show();
    var dataFromCharts = echarts.init(obj.get(0));
    //设置初始化选项
    dataFromCharts.setOption(dataFromOption);
}
// 2016年8月23日09:15:40  张松强 add end

    
    
        
    //处理数据，得出新数组
    function createArr(parentArr, childArr, attr) {
        $.each(parentArr, function (n, value) {
            childArr.push(value[attr]);
        });
        return childArr;
    }
    //数组去重
    function delReapetArr(arr){
        for (var i = 0; i < arr.length; i++) {
            for (var j = i + 1; j < arr.length; j++) {
                if (arr[i] == arr[j]) {
                    arr.splice(j, 1);
                    j--;
                }
            }
        }
        return arr;
    }

    //重组图表的数据格式（因为是强制一个类目，一个值，所以折，柱，散，数据格式一样，饼自己一样）
    var dataArr=[];
    function reCreatDataFormat(arr){
        var legendData = [];
        var xData = [];
        var yData = [];
        var lineData={};
        createArr(arr, xData, "name");     //x轴类目
        createArr(arr, yData, "value");   //y轴数据
        createArr(arr,legendData,"z");     //图例
        delReapetArr(legendData);
        delReapetArr(xData);
        //重组柱状图数据格式，跟折线图一样
        for(i=0;i<legendData.length;i++){
            lineData[legendData[i]] = [];
            $.each(arr,function(n,value){
                if(value.z==legendData[i]){
                    lineData[legendData[i]].push(value.value);
                }
            })
        }
        dataArr=[];
        dataArr.push(legendData,xData,yData,lineData);
        return dataArr;
    }
    
    function isNumeric(target){
    	var re = new RegExp("/-?[0-9]+.?[0-9]+/");
    	if(re.test(target)){
    		return true;
    	}
    	return false;
    }
    
});