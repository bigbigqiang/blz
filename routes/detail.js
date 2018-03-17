var express = require('express');
var http = require('http');
var qs = require('qs');
var router = express.Router();

router.get('/company/:id', function (req, res) {
    if (!req.session.username) {
        res.redirect('/login');
        return;
    }
    var option={
        hostname:IP,
        port:PORT,
        method:"POST",
        path:'/blz/getCompanyInfo.do?companyId='+req.params.id,
        headers:{
            "Content-Type":'application/x-www-form-urlencoded'
        }
    };

    var req1=http.request(option, function (res1) {
        var resJsonData;
        var bufferData='';
        res1.on('data', function (data) {
            try {
                bufferData+=data;
            } catch (err) {
                console.error('获取数据失败，请重试', err);
            }
        });
        res1.on('end', function () {
            resJsonData=JSON.parse(bufferData);
            if (!resJsonData.data) {
                res.render('detail_company',{
                    layout: "layouts/detail_header",
                    legalInfo: {},
                    buildInfo: {},
                    companyInfo: {},
                    checkList: [],
                    selfCheck: [],
                    username:req.session.username.split(',')[0],
                    role:req.session.username.split(',')[1] == '超级管理员',
                    author: {
                        id: '/detail/company',
                        name: '企业详情'
                    }
                });
                return;
            }
            if (resJsonData.data.buildInfo) {
                var type = resJsonData.data.buildInfo.buildType;
                var rentType = resJsonData.data.buildInfo.isRent;
                resJsonData.data.buildInfo.buildType = type == 0 ? '居民楼' :
                        type == 1 ? '商住' :
                        type == 2 ? '写字楼' :
                        type == 3 ? '单位楼' : '平房' ;
                resJsonData.data.buildInfo.isRent = rentType == 0 ? '空置' :
                        rentType == 1 ? '自住' :
                        rentType == 2 ? '租住' :
                        rentType == 3 ? '租办' :
                        rentType == 4 ? '自办' : '借住' ;
            }
            if (resJsonData.data.selfCheck) {
                for (var i=0;i<resJsonData.data.selfCheck.length;i++) {
                    var type = resJsonData.data.selfCheck[i].zhuangtai;
                    resJsonData.data.selfCheck[i].zhuangtai = type == 1 ? '未完成' : '已完成';
                }
            }
            if (resJsonData.data.checkList) {
                for (var i=0;i<resJsonData.data.checkList.length;i++) {
                    var type = resJsonData.data.checkList[i].zhuangtai;
                    var urgent = resJsonData.data.checkList[i].zhongyaox;
                    resJsonData.data.checkList[i].zhuangtai = type == 1 ? '未完成' : '已完成';
                    resJsonData.data.checkList[i].zhongyaox = urgent == 1 ? '红' :
                                                            urgent == 2 ? '橙' :
                                                            urgent == 3 ? '黄' :
                                                            urgent == 4 ? '蓝' :
                                                                '无';
                }
            }
            if (resJsonData.data.companyInfo) {
                var bq = resJsonData.data.companyInfo.biaoqian[0];
                if (bq == '红') resJsonData.data.companyInfo.red = true;
                else if (bq == '橙') resJsonData.data.companyInfo.orange = true;
                else if (bq == '黄') resJsonData.data.companyInfo.yellow = true;
                else if (bq == '蓝') resJsonData.data.companyInfo.blue = true;
            }
            res.render('detail_company',{
                layout: "layouts/detail_header",
                legalInfo: resJsonData.data.legalInfo || {},
                buildInfo: resJsonData.data.buildInfo || {},
                companyInfo: resJsonData.data.companyInfo || {},
                checkList: resJsonData.data.checkList || [],
                selfCheck: resJsonData.data.selfCheck || [],
                username:req.session.username.split(',')[0],
                role:req.session.username.split(',')[1] == '超级管理员',
                author: {
                    id: '/detail/company',
                    name: '企业详情'
                }
            });
        });
    }).on('error', function (err) {
        console.error(err);
    });
    req1.end();
});
router.get('/people/:id', function (req, res) {
    if (!req.session.username) {
        res.redirect('/login');
        return;
    }
    var option={
        hostname:IP,
        port:PORT,
        method:"POST",
        path:'/blz/getPeopleInfo.do?peopleId='+req.params.id,
        headers:{
            "Content-Type":'application/x-www-form-urlencoded'
        }
    };

    var req1=http.request(option, function (res1) {
        var resJsonData;
        var bufferData='';
        res1.on('data', function (data) {
            try {
                bufferData+=data;
            } catch (err) {
                console.error('获取数据失败，请重试', err);
            }
        });
        res1.on('end', function () {
            resJsonData=JSON.parse(bufferData);
            if (!resJsonData.data) {
                res.render('detail_people',{
                    layout: "layouts/detail_header",
                    basicInfo: {},
                    buildInfo: {},
                    companyInfo: {},
                    username:req.session.username.split(',')[0],
                    role:req.session.username.split(',')[1] == '超级管理员',
                    author: {
                        id: '/detail/people',
                        name: '人口详情'
                    }
                });
                return;
            }
            res.render('detail_people',{
                layout: "layouts/detail_header",
                basicInfo: resJsonData.data.peopleBasicInfo || {},
                buildInfo: resJsonData.data.buildInfo || {},
                companyInfo: resJsonData.data.companyInfo || {},
                username:req.session.username.split(',')[0],
                role:req.session.username.split(',')[1] == '超级管理员',
                author: {
                    id: '/detail/people',
                    name: '人口详情'
                }
            });
        });
    }).on('error', function (err) {
        console.error(err);
    });
    req1.end();
});
router.get('/building/:id/:lat/:lng/:address', function (req, res) {
    if (!req.session.username) {
        res.redirect('/login');
        return;
    }
    var NUM = ['零','一','二','三','四','五','六','七','八','九'];
    function getNum(n){
        if(n < 10) return NUM[n];
        else{
            var sh = Math.ceil(n / 10);
            var yu = n % 10;
            if(yu == 0) return NUM[sh] + '十';
            else return NUM[sh] + '十' + NUM[yu];
        }
    }
    var option={
        hostname:IP,
        port:PORT,
        method:"POST",
        path:'/blz/getBuildInfo.do',
        headers:{
            "Content-Type":'application/x-www-form-urlencoded'
        }
    };
    var params = qs.stringify({
        buildId: req.params.id,
        lat: req.params.lat,
        lng: req.params.lng,
        address: req.params.address
    });
    var req1=http.request(option, function (res1) {
        var resJsonData;
        var bufferData='';
        res1.on('data', function (data) {
            try {
                bufferData+=data;
            } catch (err) {
                console.error('获取数据失败，请重试', err);
            }
        });
        res1.on('end', function () {
            resJsonData=JSON.parse(bufferData);
            if (!resJsonData.data) {
                res.render('detail_building',{
                    layout: "layouts/detail_header",
                    lat: req.params.lat,
                    lng: req.params.lng,
                    buildInfo: {},
                    floorInfo: [],
                    totlePeople: 0,
                    companyInfo: {},
                    username:req.session.username.split(',')[0],
                    role:req.session.username.split(',')[1] == '超级管理员',
                    author: {
                        id: '/detail/building',
                        name: '建筑详情'
                    }
                });
                return;
            }
            var floorInfo = [];
            if (resJsonData.data.house) {
                floorInfo = resJsonData.data.house.houseInfo;
                for(var i=0;i<floorInfo.length;i++){
                    floorInfo[i].unit = getNum(floorInfo[i].unit)
                }
            }
            if (resJsonData.data.building) {
                var buildingType = resJsonData.data.building.type;
                resJsonData.data.building.type = buildingType == '0' ? '居民楼' :
                                                buildingType == '1' ? '商住' :
                                                buildingType == '2' ? '写字楼' :
                                                buildingType == '3' ? '单位楼' :
                                                buildingType == '4' ? '平房' : '';
            }
            if (resJsonData.data.company) {
                var info = resJsonData.data.company;
                for(var i=0;i<info.length;i++){
                    info[i].safewarningTime = info[i].safewarningTime || null;
                    if (info[i].safewarningTime) {
                        if (info[i].safewarningTime[1]) info[i].safewarningTime.a = info[i].safewarningTime[1] 
                        if (info[i].safewarningTime[2]) info[i].safewarningTime.b = info[i].safewarningTime[2] 
                        if (info[i].safewarningTime[3]) info[i].safewarningTime.c = info[i].safewarningTime[3] 
                        if (info[i].safewarningTime[4]) info[i].safewarningTime.d = info[i].safewarningTime[4] 
                    }
                }
            }
            res.render('detail_building',{
                layout: "layouts/detail_header",
                lat: req.params.lat,
                lng: req.params.lng,
                floorInfo: floorInfo || [],
                buildInfo: resJsonData.data.building || {},
                totlePeople: resJsonData.data.house.totlePeople || 0,
                companyInfo: resJsonData.data.company || {},
                username:req.session.username.split(',')[0],
                role:req.session.username.split(',')[1] == '超级管理员',
                author: {
                    id: '/detail/building',
                    name: '建筑详情'
                }
            });
        });
    }).on('error', function (err) {
        console.error(err);
    });
    req1.write(params);
    req1.end();
});
router.post('/company', function (req, res) {
    res.redirect('/detail/company/'+req.body.id);
});
module.exports = router;
