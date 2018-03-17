var radar = echarts.init(document.getElementById('radar'));
option = {
    title: {
        text: '基础雷达图',
		show:false
    },
    tooltip: {show:false},
    legend: {
        data: ['预算分配（Allocated Budget）', '实际开销（Actual Spending）'],
		show:false
    },
    radar: {
        // shape: 'circle',
        indicator: [
           { name: '销售（sales）', max: 6500},
           { name: '管理（Administration）', max: 16000},
           { name: '信息技术（Information Techology）', max: 30000},
           { name: '客服（Customer Support）', max: 38000},
           { name: '研发（Development）', max: 52000},
           { name: '市场（Marketing）', max: 25000}
        ]
    },
    series: [{
        name: '预算 vs 开销（Budget vs spending）',
        type: 'radar',
		 zlevel: 2,
        // areaStyle: {normal: {}},
        data : [
            {
                value : [4300, 10000, 28000, 35000, 50000, 19000],
                name : '预算分配（Allocated Budget）'
            }
        ]
    }]
};
radar.setOption(option);