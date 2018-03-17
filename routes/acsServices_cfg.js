var http = require('http');
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    var url = '/iwherelink/getServiceList.do?page=1&mode=0';
    var tableData;
    var allWStype;
    var statisticsData;

    //获取表格数据
    function getTableData() {
        return new Promise(function (resolve, reject) {
            http.get(url, function (res1) {
                var bufferData='';
                res1.on('data', function (data) {
                    try {
                        bufferData+=data;
                    } catch (err) {
                        console.error('Invalid tableData', err);
                    }
                });
                res1.on('end', function () {
                    tableData = JSON.parse(bufferData);
                    console.log("==========");
                    console.log(tableData);
                    resolve(tableData);
                });
                res1.on('error', function (err) {
                    console.log(err);
                })
            });
        })
    }
    //查询全部服务类型
    function getAllWStype() {
        return new Promise(function (resolve, reject) {
            http.get('/iwherelink/getAllWebServiceTypeList.do', function (res1) {
                var bufferData='';
                res1.on('data', function (data) {
                    try {
                        bufferData+=data;
                    } catch (err) {
                        console.error('Invalid  allWStype', err);
                    }
                });
                res1.on('end', function () {
                    allWStype = JSON.parse(bufferData);
                    resolve(allWStype);

                    //设置全局变量allDBtype
                    res.clearCookie("allWStype");
                    res.cookie("allWStype", allWStype, { maxAge: 60 * 1000 });
                });
                res1.on('error', function (err) {
                    console.log(err);
                })
            });
        })
    }
    //获取统计信息
    function getStatisticsData() {
        return new Promise(function (resolve, reject) {
            http.get('/iwherelink/webservice/statistics/all.do', function (res1) {
                var bufferData='';
                res1.on('data', function (data) {
                    try {
                        bufferData+=data;
                    } catch (err) {
                        console.error('Invalid tableData', err);
                    }
                });
                res1.on('end', function () {
                    statisticsData = JSON.parse(bufferData);
                    resolve(statisticsData);
                });
                res1.on('error', function (err) {
                    console.log(err);
                })
            });

        })
    }
    getAllWStype()
        .then(getTableData)
        .then(getStatisticsData)
        .then(function () {
            //设置type 与 typeName一一对应
            for (var i = 0; i < tableData.data.data.length; i++) {
                var currentData = tableData.data.data[i];
                for (var j = 0; j < allWStype.data.length; j++) {
                    var currentDBtype = allWStype.data[j];
                    if (currentData.type == currentDBtype.id) {
                        currentData.typeName = currentDBtype.name;
                    }
                }
            }

            res.render('accessServices_cfg', {
                layout: "layouts/back_layout",
                title: "服务列表",
                serviceTypeList: tableData.data.data,
                WSType: allWStype.data,
                totalPage: tableData.data.totalPage,
                page: tableData.data.page,
                status: 0,
                message: '连接异常',
                totalNum: tableData.data.totalNum,
                statistics:statisticsData.data,
                role: req.session.username.split(',')[1] == '超级管理员'
                // roleName:req.cookies.ROLENAME,
                // userName:req.cookies.USERNAME
            });
        })
        .catch(function () {
            res.render('accessServices_cfg', {
                layout: "layouts/back_layout",
                title: "服务列表",
                role: req.session.username.split(',')[1] == '超级管理员'
            });
        });


});

module.exports = router;
