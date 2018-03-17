// JavaScript Document
$(document).ready(function () {
    $("#map").width($(window).width());
    $("#map").height($(window).height());
    var myChart = echarts.init(document.getElementById('map'));
    var weatherChart = echarts.init(document.getElementById('weatherChart'));
    var selectedIata = [];
    var wthdate = "";
//-------天气平行折线图-------
    var data1 = [[16.7, 41, 1012.2, 48.3, "North", 7.4, "Clear"]];
    var data2 = [[8.9, 89, 1012.5, 32.2, "West", 5.6, "Clear"]];
//var data3=[16.7,41,1012.2,48.3,North,7.4,Clear];

    var schema = [
        {name: 'Temperature', index: 0, text: 'Temperature'},
        {name: 'Humidity', index: 1, text: 'Humidity'},
        {name: 'Pressure', index: 2, text: 'Pressure'},
        {name: 'Visibility', index: 3, text: 'Visibility'},
        {name: 'WindDirection', index: 4, text: 'WindDirection'},//c
        {name: 'WindSpeed', index: 5, text: 'WindSpeed'},
        {name: 'Conditions', index: 6, text: 'Conditions'}//c
    ];

    var lineStyle = {
        normal: {
            width: 2,
            opacity: 0.8
        }
    };

    var parallelaxis = [
        {dim: 0, name: schema[0].text},
        {dim: 1, name: schema[1].text},
        {dim: 2, name: schema[2].text},
        {dim: 3, name: schema[3].text},
        {
            dim: 4, name: schema[4].text, type: 'category', data: [
            'North',
            'WNW',
            'West',
            'WSW',
            'NNW',
            'NW',
            'Calm',
            'NE',
            'NNE',
            'SW',
            'SSW',
            'ENE',
            'East',
            'South',
            'SE',
            'ESE',
            'Overcast',
            'Scattered Clouds',
            'SSE']
        },
        {dim: 5, name: schema[5].text},
        {
            dim: 6, name: schema[6].text, type: 'category', data: ['Clear',
            'Scattered Clouds',
            'Mostly Cloudy',
            'Overcast',
            'Unknown',
            'Drizzle',
            'Fog',
            'Thunderstorms and Rain',
            'Light Rain Showers',
            'Partly Cloudy',
            'Light Drizzle',
            'Light Rain',
            'Light Thunderstorms and Rain',
            'Rain',
            'Heavy Rain',
            'Rain Showers',
            'Smoke',
            'Thunderstorm',
            'Thunderstorms and Ice Pellets',
            'Funnel Cloud',
            'Shallow Fog',
            'Heavy Thunderstorms and Rain',
            'Light Snow',
            'Snow',
            'Light Snow Showers',
            'Ice Pellets',
            'Snow Showers',
            'Snow Grains',
            'Freezing Rain',
            'Light Freezing Rain',
            'Light Ice Pellet Showers',
            'Light Freezing Drizzle',
            'Light Fog',
            'Light Blowing Snow',
            'Heavy Thunderstorms and Snow',
            'Heavy Snow',
            'Light Thunderstorms and Snow',
            'Ice Pellet Showers',
            'Ice Crystals',
            'Light Freezing Fog',
            'Heavy Rain Showers',
            'Mist',
            'Thunderstorms and Snow',
            'Light Thunderstorms', 'Unknown']
        }
    ];
    weatheroption = {
        legend: {
            top: 0,
            right: 5,
            data: [],
            itemGap: 2,
            textStyle: {
                color: '#fff',
                fontSize: 12
            }
        },
        tooltip: {},
        parallelAxis: parallelaxis,
        parallel: {
            top: 60,
            left: 40,
            right: 40,
            bottom: 20,
            parallelAxisDefault: {
                type: 'value',
                axisLine: {
                    lineStyle: {color: '#fff'}
                },

                axisTick: {
                    lineStyle: {color: '#777'}
                },
                splitLine: {show: false},
                axisLabel: {
                    textStyle: {color: '#fff'}
                }
            }
        },
        series: []
    };

//-----------------------------
    $.get('/js/USA.json', function (usaJson) {

        echarts.registerMap('USA', usaJson, {
            Alaska: {              // 把阿拉斯加移到美国主大陆左下方
                left: -131,
                top: 25,
                width: 15
            },
            Hawaii: {
                left: -110,        // 夏威夷
                top: 28,
                width: 5
            },
            'Puerto Rico': {       // 波多黎各
                left: -76,
                top: 26,
                width: 2
            }
        });
    });
    $.getJSON("/js/airport_delay_test.json", function (data) {
        var date = [];
        var base = +new Date(1987, 9, 1);
        var oneDay = 24 * 3600 * 1000;
        var endDate = +new Date(1988, 0, 1);
        var now = new Date(base);
        var tiktok = (endDate - base) / oneDay;
        for (var i = 1; i <= tiktok; i++) {
            date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'));
            now = new Date(base += oneDay);
        }
        var convertedData = data;
        option = {
            backgroundColor: '#404a59',
            animation: true,
            animationDuration: 1000,
            animationEasing: 'cubicInOut',
            animationDurationUpdate: 1000,
            animationEasingUpdate: 'cubicInOut',
            title: [
                {
                    id: 'statistic',
                    left: 0,
                    top: 20,
                    padding: [20, 40],
                    textStyle: {
                        color: '#fff',
                        fontSize: 18
                    },
                    textBaseline: 'bottom',
                    backgroundColor: '#2a333d',
                    text: 'Aiport DepartmentDelay Analysis'
                },
                {
                    id: 'delayTitle',
                    left: 400,
                    top: 20,
                    padding: [20, 40],
                    textStyle: {
                        fontWeight: 'normal',
                        color: '#ddd',
                        fontSize: 14
                    },
                    textBaseline: 'bottom',
                    backgroundColor: '#2a333d',
                    text: ''
                },
                {
                    id: 'blank',
                    left: 400,
                    top: 20,
                    padding: [20, 40],
                    text: ' '
                }
            ],
            toolbox: {
                iconStyle: {
                    normal: {
                        borderColor: '#fff'
                    },
                    emphasis: {
                        borderColor: '#b1e4ff'
                    }
                }
            },
            brush: {
                toolbox: ['rect', 'polygon', 'keep', 'clear'],
                outOfBrush: {
                    color: '#abc'
                },
                brushStyle: {
                    borderWidth: 2,
                    color: 'rgba(0,0,0,0.2)',
                    borderColor: 'rgba(0,0,0,0.5)'
                },
                seriesIndex: [0, 1],
                throttleType: 'debounce',
                throttleDelay: 300,
                geoIndex: 0
            },
            geo: {
                map: 'USA',
                top: '130',
                left: '100',
                //center: [117.98561551896913, 31.205000490896193],
                center: [-96.98561551896913, 37.805000490896193],
                zoom: 1.5,
                roam: true,
                label: {
                    emphasis: {
                        textStyle: {
                            color: '#000'
                        }
                    }
                },
                itemStyle: {
                    normal: {
                        areaColor: '#323c48',
                        borderColor: '#111'
                    },
                    emphasis: {
                        areaColor: '#2a333d'
                    }
                }
            },
            tooltip: {
                // trigger: 'item'
                trigger: 'axis',

            },
            grid: [{
                left: 40,
                top: 360,
                width: '300',
                height: '440',
                z: 2,
                zlevel: 2
            }, {
                left: 40,
                bottom: 40,
                width: '500',
                height: '160 ',
                z: 1,
                zlevel: 3
            }],
            xAxis: [{
                gridIndex: 0,//直方图
                zlevel: 2,
                type: 'value',
                scale: true,
                position: 'top',
                boundaryGap: false,
                splitLine: {show: false},
                axisLine: {show: false},
                axisTick: {show: false},
                axisLabel: {margin: 2, textStyle: {color: '#aaa'}},
            }, {
                gridIndex: 1,//折线图
                zlevel: 3,
                type: 'category',
                boundaryGap: false,
                axisLabel: {margin: 2, textStyle: {color: '#aaa'}},
                data: date
            }],
            yAxis: [{
                gridIndex: 0,//直方图
                zlevel: 2,
                type: 'category',
                name: 'Delay (hour)',
                nameGap: 16,
                axisLine: {show: false, lineStyle: {color: '#ddd'}},
                axisTick: {show: false, lineStyle: {color: '#ddd'}},
                axisLabel: {interval: 0, textStyle: {color: '#ddd'}},
                data: []
            }, {
                gridIndex: 1,//折线图
                zlevel: 3,
                type: 'value',
                boundaryGap: [0, '100%'],
                axisLabel: {interval: 0, textStyle: {color: '#ddd'}},
            }],
            radar: {
                center: ['150', '200'],
                radius: '100',
                nameGap: -10,
                zlevel: 2,
                // shape: 'circle',
                indicator: [{name: 'CarrierDelay', max: 3000},
                    {name: 'NASDelay', max: 3000},
                    {name: 'WeatherDelay', max: 3000},
                    {name: 'SecurityDelay', max: 3000},
                    {name: 'LateAircraftDelay', max: 3000}]
            },
            series: [
                {
                    type: 'scatter',
                    coordinateSystem: 'geo',
                    data: convertedData[0],
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
                    },
                    zlevel: 1
                },
                {
                    type: 'effectScatter',
                    coordinateSystem: 'geo',
                    data: convertedData[1],
                    symbolSize: function (val) {
                        return Math.max(val[2] / 20000, 8);
                    },
                    showEffectOn: 'emphasis',
                    rippleEffect: {
                        brushType: 'stroke'
                    },
                    hoverAnimation: true,
                    label: {
                        normal: {
                            formatter: '{b}',
                            position: 'right',
                            show: true
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#f4e925',
                            shadowBlur: 10,
                            shadowColor: '#333'
                        }
                    },
                    zlevel: 1
                },
                {
                    id: 'line',
                    name: 'TotalDelay',
                    type: 'line',
                    silent: false,
                    smooth: true,
                    symbol: 'circle',
                    xAxisIndex: 1,
                    yAxisIndex: 1,
                    sampling: 'average',
                    itemStyle: {
                        normal: {
                            color: '#ddb926'
                        }
                    },
                    z: 2,
                    zlevel: 3,
                    data: []//[15988,8051,8003,9580,5921,5957,7379,10857,13907,5759,6255,10241,7715,8964,9014,12707,7957,6326,7857,10545,5524,14082,13359,7232,9376,5458,7664,17391,13917,7962,7016,11135,4334,5344,5648,13587,7856,3104,7832,4635,6859,6991,9257,16076,4142,8289,14440,19457,8588,8021,18517,4369,3175,3216,7141,14412,5141,2759,4380,11974,27056,21349,16572,16818,22436,10558,15126,10297,10494,17567,12129,11075,8422,12083,8768,14997,24991,13438,19780,27918,10678,14305,14040,26831,29402,4595,8596,15475,35315,30890,18764,8904]
                },
                {
                    id: 'bar',
                    zlevel: 2,
                    type: 'bar',
                    silent: true,
                    symbol: 'none',
                    xAxisIndex: 0,
                    yAxisIndex: 0,
                    itemStyle: {
                        normal: {
                            color: '#ddb926'
                        }
                    },
                    z: 1,
                    data: []
                },
                {
                    id: 'radar',
                    zlevel: 2,
                    type: 'radar',
                    data: [
                        {
                            value: [],
                            label: {
                                normal: {
                                    show: true,
                                    formatter: function (params) {
                                        return params.value;
                                    }
                                }

                            }
                        }
                    ]
                }
            ]
        };


        setTimeout(function () {
            myChart.dispatchAction({
                type: 'brush',
                areas: [
                    {
                        geoIndex: 0,
                        brushType: 'polygon',
                        coordRange: [[-97.226088566117141, 48.992669576869844], [-97.229217572033264, 48.968632017753407], [-97.221478314072925, 48.952299010091252], [-97.21088261144331, 48.936649596002013], [-97.207782025120338, 48.923368345972307], [-97.203045697001301, 48.903373227892132], [-97.19718632159146, 48.894242368890161], [-97.190374798857874, 48.885746274770725], [-97.185101361438683, 48.876761900041657], [-97.177655072023924, 48.841996275307849], [-97.148211713399832, 48.788236510306689], [-97.140863079567453, 48.749540221404089], [-97.132562299310621, 48.732792173919677], [-97.109368939325066, 48.698636900172772], [-97.100970501687272, 48.650516782823246], [-97.121795696714031, 48.612382018015694], [-97.148358196773358, 48.576273619132166], [-97.157171674233382, 48.534134947569726], [-97.133734174392572, 48.476102721163642], [-97.128289837905669, 48.444437681853543], [-97.122821088422455, 48.428568540905388], [-97.123651166268303, 48.417460142871249], [-97.128192181424026, 48.40644940041949], [-97.140521283230612, 48.388480650061894], [-97.144110150163243, 48.376468932495186], [-97.126532024833068, 48.311161313943444], [-97.11994022805905, 48.297049986068004], [-97.115179486044383, 48.281229673810429], [-97.129852338014985, 48.21199139288845], [-97.129657025051671, 48.170560727895236], [-97.121893353195674, 48.13271893253264], [-97.106317180793212, 48.096805845713163], [-97.062616010020776, 48.023050963531063], [-97.051336712918953, 47.98584393215171], [-97.035028119152315, 47.951957213054897], [-97.000116010145717, 47.924003111054702], [-97.014764447321312, 47.90007732970497], [-97.012030072130159, 47.877421079918832], [-96.986468548984277, 47.828397643036794], [-96.986273236020963, 47.822562682421847], [-96.991815228090218, 47.81516522079832], [-96.989886516849197, 47.810721861224891], [-96.986468548984277, 47.808719908297093], [-96.982928509842822, 47.80784100176075], [-96.980145305961059, 47.806742369264924], [-96.979022259569604, 47.804203307037], [-96.975408977842022, 47.800248228073286], [-96.9517273381461, 47.780008971037176], [-96.944085735768027, 47.767411314580528], [-96.931854291342461, 47.732181822233258], [-96.918402142245071, 47.711991392988381], [-96.904852337565274, 47.696439635380813], [-96.894403119208562, 47.679056822114603], [-96.888568157694266, 47.643656432498375], [-96.876605267019386, 47.616141783316579], [-96.860565227902896, 47.607010924314693], [-96.856121869228843, 47.601859557272803], [-96.855706830305962, 47.595487486458325], [-96.858367962911075, 47.58979901011628], [-96.861639447402581, 47.585062681997158], [-96.862957805858031, 47.581376158582884], [-96.861761516880478, 47.557352720751481], [-96.863568157744226, 47.537455260052241], [-96.862591595625588, 47.51987713472198], [-96.853021282905871, 47.50283611869196], [-96.852948041219094, 47.488260924102406], [-96.868719524786229, 47.437723814002737], [-96.869158977604712, 47.416898618976063], [-96.864154095734875, 47.411991392688634], [-96.855120892315313, 47.404960143096105], [-96.846405072236308, 47.396390807289919], [-96.842474408067488, 47.386454283438439], [-96.849920696582785, 47.259232603002232], [-96.846600385199622, 47.236649595802248], [-96.831658977679581, 47.188138853425357], [-96.828192181124251, 47.166752135202842], [-96.829827923819579, 47.159183775410895], [-96.833197063893351, 47.150614438705418], [-96.835907025188988, 47.140629087961997], [-96.835662885333903, 47.128910338041692], [-96.821991010276861, 47.087919126766309], [-96.820916790777176, 47.067972838275921], [-96.828192181124251, 47.002299010391027], [-96.826068157819179, 46.989115415943701], [-96.82081913519491, 46.980082213423401], [-96.808319135219875, 46.964408385438645], [-96.804730267387896, 46.951298033577359], [-96.804266399774519, 46.943900571953833], [-96.808319135219875, 46.94392498584935], [-96.802948041319041, 46.941263853244237], [-96.791278119189769, 46.938944517875228], [-96.781243938856676, 46.933768736038331], [-96.769354290767836, 46.931449399769946], [-96.763031048643882, 46.927152525368768], [-96.759246868747965, 46.920902524931591], [-96.761053509611713, 46.916385924570761], [-96.764740033026072, 46.912015807583458], [-96.76998905565037, 46.896000182362485], [-96.784002727943516, 46.882255063820111], [-96.78722538464379, 46.871927915840587], [-96.785784954911662, 46.83818768191594], [-96.78722538464379, 46.827225768154705], [-96.790130658003449, 46.820341001935702], [-96.799310345695829, 46.803812682209497], [-96.801507610687651, 46.793729674085171], [-96.798699993809635, 46.778129087787164], [-96.78436893907525, 46.743046079712798], [-96.781024212897108, 46.721097838294611], [-96.784588665934194, 46.698588071882], [-96.796844525154654, 46.663846861043822], [-96.794671674058463, 46.642264829857993], [-96.784783977998131, 46.628422057531878], [-96.753045697001284, 46.597049985868125], [-96.7462585881633, 46.577421079819032], [-96.740374798857857, 46.540360532712384], [-96.739642376594389, 46.519169127453267], [-96.7462585881633, 46.498881040827399], [-96.740618938713027, 46.491800963443637], [-96.724334759741367, 46.478666196787543], [-96.718328900058623, 46.470951352722807], [-96.716912885121502, 46.463529478102942], [-96.717010540703882, 46.454691588545955], [-96.715374798907817, 46.444608580421686], [-96.70870976044705, 46.433719908347115], [-96.650677533141561, 46.368534361071937], [-96.616497846398431, 46.34121502485354], [-96.601629680565253, 46.323929868968264], [-96.595428509717948, 46.302762876705401], [-96.59791874415464, 46.237992369252453], [-96.595428509717948, 46.217728697421478], [-96.592205853017703, 46.207059752205822], [-96.587786908239167, 46.198514830295153], [-96.564862102903675, 46.171390807040069], [-96.564373822294044, 46.164847838057284], [-96.566619915976304, 46.157328306955776], [-96.568133588294444, 46.145707213517113], [-96.563494915757786, 46.140067564066811], [-96.556707806020455, 46.10303143175517], [-96.557025189360957, 46.090360532712367], [-96.56410526674469, 46.062406432510812], [-96.576043744423231, 46.040214049438788], [-96.576190227796729, 46.016459166257476], [-96.556341595787984, 45.941752134953106], [-96.789276166261999, 45.941752134953106], [-97.022283978422848, 45.941752134953106], [-97.255218548896835, 45.941752134953106], [-97.488177533266537, 45.941800962744225], [-97.721136516736863, 45.941849791434748], [-97.954095502005771, 45.941849791434748], [-98.187054486375388, 45.941849791434748], [-98.42001347074509, 45.941849791434748], [-98.652948041219076, 45.941849791434748], [-98.885907024689416, 45.941849791434748], [-99.118866009958396, 45.941849791434748], [-99.351824994328013, 45.941874205330265], [-99.584783977798338, 45.941898619225896], [-99.817791790858465, 45.941898619225896], [-100.05072636133247, 45.941898619225896], [-100.28368534570208, 45.941898619225896], [-100.51664433007178, 45.941898619225896], [-100.74957889964649, 45.941898619225896], [-100.98258671270662, 45.941898619225896], [-101.21554569707624, 45.941947447017043], [-101.44850468144585, 45.941996274808275], [-101.68148807971107, 45.941996274808275], [-101.91442265018516, 45.941996274808275], [-102.14738163455478, 45.941996274808275], [-102.38034061892439, 45.941996274808275], [-102.61329960329401, 45.941996274808275], [-102.84625858766361, 45.941996274808275], [-103.07921757203331, 45.941996274808275], [-103.31217655640293, 45.941996274808275], [-103.5450867129814, 45.941996274808275], [-103.77807011124663, 45.941996274808275], [-104.04489139991816, 45.942020688703792], [-104.04625858796342, 46.13269451813747], [-104.04625858796342, 46.299564634800049], [-104.04625858796342, 46.466410338466346], [-104.04625858796342, 46.633256041233295], [-104.04625858796342, 46.800101744000244], [-104.04625858796342, 46.966947446767193], [-104.04625858796342, 47.133793150433519], [-104.04625858796342, 47.300638853200468], [-104.04625858796342, 47.467484556866793], [-104.04625858796342, 47.634330260533119], [-104.04625858796342, 47.801175963300068], [-104.04625858796342, 47.968021666067017], [-104.04625858796342, 48.134891782729568], [-104.04625858796342, 48.301761900291496], [-104.04625858796342, 48.468607603058359], [-104.04625858796342, 48.635453306724685], [-104.04623417406789, 48.80229901039101], [-104.04757444710143, 48.992617899948158], [-103.96948889199987, 48.992617900000113], [-103.74968318699995, 48.992617900000113], [-103.52985164399992, 48.992617900000113], [-103.31004593899989, 48.992617900000113], [-103.09024023499987, 48.992617900000113], [-102.87038285399993, 48.992617900000113], [-102.65057714899991, 48.992617900000113], [-102.43074560599989, 48.992617900000113], [-102.21093990099995, 48.992669577000129], [-101.99118587299995, 48.992669577000129], [-101.77138016799992, 48.992669577000129], [-101.55157446299991, 48.992669577000129], [-101.36433964677866, 48.992669576869844], [-101.33169124399987, 48.992669577000129], [-101.11188553899993, 48.992669577000129], [-100.89210567299992, 48.992669577000129], [-100.67227413, 48.992669577000129], [-100.45249426299996, 48.992669577000129], [-100.23266272, 48.992669577000129], [-100.01288285399993, 48.992669577000129], [-99.793102986999912, 48.992669577000129], [-99.573297282999988, 48.992669577000129], [-99.353491576999957, 48.992669577000129], [-99.133660034999934, 48.992669577000129], [-98.913854329999921, 48.992669577000129], [-98.694048625, 48.992669577000129], [-98.47419124399994, 48.992669577000129], [-98.254437215999957, 48.992669577000129], [-98.034605671999827, 48.992669577000129], [-97.814799967999903, 48.992669577000129], [-97.594994262999876, 48.992669577000129], [-97.375188558999952, 48.992669577000129], [-97.226088566117141, 48.992669576869844]]
                    }
                ]
            });
        }, 0);

        function renderBrushed(params) {
            var mainSeries = params.batch[0].selected[0];

            var selectedItems = [];
            var categoryData = [];
            var barData = [];
            var radarData = [];
            var maxBar = 30;
            var sum = 0;
            var count = 0;
            var totalRecord = 0;
            var totalDelayRecord = 0;
            var avgDelay = 0;

            selectedIata = [];

            for (var i = 0; i < mainSeries.dataIndex.length; i++) {
                var rawIndex = mainSeries.dataIndex[i];
                var dataItem = convertedData[0][rawIndex];
                var delayValue = dataItem.value[2];

                sum += new Number(delayValue);
                count++;
                totalRecord += new Number(dataItem.totalRecord);
                totalDelayRecord += new Number(dataItem.totalDepDelayRecord);
                avgDelay = sum / totalDelayRecord;
                selectedItems.push(dataItem);
                selectedIata[i] = dataItem.iata;
            }

            var carrierDelay = totalDelayRecord * 0.0058;
            var NASDelay = avgDelay * 0.87;
            var WeatherDelay = sum / 1000 * 0.46;
            var SecurityDelay = totalRecord / 1000 * 0.05;
            var LateAircraftDelay = (totalRecord - totalDelayRecord) / 100 * 0.001;
            var acount = carrierDelay + NASDelay + WeatherDelay + SecurityDelay + LateAircraftDelay;
            acount = acount.toFixed(0);
            radarData.push(carrierDelay.toFixed(0));
            radarData.push(NASDelay.toFixed(0));
            radarData.push(WeatherDelay.toFixed(0));
            radarData.push(SecurityDelay.toFixed(0));
            radarData.push(LateAircraftDelay.toFixed(0));


            selectedItems.sort(function (a, b) {
                return a.value[2] - b.value[2];
            });

            for (var i = 0; i < Math.min(selectedItems.length, maxBar); i++) {
                categoryData.push(selectedItems[i].iata);
                barData.push(selectedItems[i].value[2] / 3600);

            }
            var lineData = [];
            $.ajax({
                type: "POST",
                url: '/iwherelink/getDailyDelayByIata.do',
                data: {
                    "selectedIata": selectedIata
                },
                async: false,
                dataType: 'json',
                traditional: true,
                success: function (value) {
//			geoCoordMap = data;
                    $.each(value, function (n, data) {
                        lineData.push(data);
                    });
                    return lineData;
                },
                error: function () {
                    console.log("error");
                }
            });

            var ser = [];
            var wdname = [];
            $.ajax({
                type: "POST",
                url: '/iwherelink/getDailyWeatherByIata.do',
                data: {
                    "selectedIata": selectedIata,
                    date: wthdate
                },
                dataType: 'json',
                traditional: true,
                success: function (value) {
                    weatherChart.clear();

                    $.each(value, function (n, wdata) {
                        var obj = new Object();
                        obj["name"] = wdata.iata;
                        console.log(obj["name"]);
                        obj["type"] = 'parallel';
                        obj["lineStyle"] = lineStyle;
                        obj["data"] = wdata.data;
                        wdname.push(wdata.iata);
                        ser.push(obj);
                    });
                    weatherChart.setOption(weatheroption);
                    weatherChart.setOption({
                        legend: {data: wdname},
                        series: ser
                    });
                    console.log("success");
                },
                error: function () {
                    console.log("error");
                }
            });

            //====

            this.setOption({
                radar: {
                    indicator: [{name: 'CarrierDelay', max: acount},
                        {name: 'NASDelay', max: acount},
                        {name: 'WeatherDelay', max: acount},
                        {name: 'SecurityDelay', max: acount},
                        {name: 'LateAircraftDelay', max: acount}]
                },

                yAxis: {
                    data: categoryData
                },
                xAxis: {
                    axisLabel: {show: !!count}
                },
                title: {
                    id: 'delayTitle',
                    text: count ? 'TotalRecord:' + totalRecord + ' \t TotalDelayRecord: ' + totalDelayRecord + ' \t TotalDelay:' + sum + '\t AvgDelay:' + avgDelay.toFixed(3) : ''
                },
                series: [{
                    id: 'line',
                    data: lineData
                }, {
                    id: 'bar',
                    data: barData
                }, {
                    id: 'radar',
                    data: [{
                        value: radarData,

                    }]
                }]
            });


        }

        myChart.on('brushselected', renderBrushed);

        myChart.setOption(option);


        weatherChart.setOption(weatheroption);

        function json2str(obj) {
            var arr = [];
            var fmt = function (s) {
                if (typeof s == 'object' && s != null) return json2str(s);
                return /^(string|number)&/.test(typeof s) ? "'" + s + "'" : s;
            }
            for (var i in obj) {
//		if( i== "name" || i=="coordinates")
                arr.push("'" + i + ":" + fmt(obj[i]));
            }
            return '{' + arr.join(',') + '}';
        }


        myChart.on('click', function (params) {
//	if(params.componentType==='geo'){
//		var city=params.name;
//		console.log(city);
//		$.get('media/USA.json', function (usaJson) {
////			var re=/^city.*$/;"name": "Kansas"
//			var re=new RegExp("^name\": \""+city+".*$");
//			console.log(re);
//			var mapdata=json2str(usaJson);
//			
//			var rest=re.test(mapdata);
//			console.log("rest:"+rest);
//		});
//	}
            if (params.componentType === 'series') {
                if (params.seriesType === 'line') {

                    var ser = [];
                    var wdname = [];
                    wthdate = params.name;
                    $.ajax({
                        type: "POST",
                        url: '/iwherelink/getDailyWeatherByIata.do',
                        data: {
                            "selectedIata": selectedIata,
                            date: params.name
                        },
                        dataType: 'json',
                        traditional: true,
                        success: function (value) {
                            weatherChart.clear();

                            $.each(value, function (n, wdata) {
                                var obj = new Object();
                                obj["name"] = wdata.iata;
                                obj["type"] = 'parallel';
                                obj["lineStyle"] = lineStyle;
                                obj["data"] = wdata.data;
                                wdname.push(wdata.iata);
                                ser.push(obj);
                            });
                            weatherChart.setOption(weatheroption);
                            weatherChart.setOption({
                                legend: {data: wdname},
                                series: ser
                            });
                        },
                        error: function () {
                            console.log("error");
                        }
                    });
                    $("#weathertitle").empty();
                    $("#weathertitle").append(params.name + " Weather Analysis");
                    $("#details").css("display", "block");
                    $("#close").click(function () {
                        $("#details").css("display", "none");
                    });
                }

            }

        });


    });


})