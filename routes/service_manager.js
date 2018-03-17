/**
 * Created by Administrator on 2016/7/20.
 */
var http = require('http');
var express = require('express');
var router = express.Router();
router.get('/', function (req, res, next) {
    var url = '/iwherelink/showPublishedServices.do?page=1&order=serviceType&mode=0';
    //var url = '/testData/showPublishedServices.json?page=1';
    var tableData;
    var allType;
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
                    resolve(tableData);
                });
                res1.on('error', function (err) {
                    console.log(err);
                })
            });

        })
    }
    //获取全部服务类型
    function getAlltype() {
        return new Promise(function (resolve, reject) {
            http.get('/iwherelink/getWebServiceType.do', function (res1) {
            //http.get('/testData/getWebServiceType.json', function (res1) {
                var bufferData='';
                res1.on('data', function (data) {
                    try {
                        bufferData+=data;
                    } catch (err) {
                        console.error('Invalid allType', err);
                    }
                });
                res1.on('end', function () {
                    allType = JSON.parse(bufferData);
                    resolve(allType);
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
            http.get('/iwherelink/service/statistics/all.do', function (res1) {
            //http.get('/iwherelink/webservice/statistics/all.do', function (res1) {
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

    getAlltype()
        .then(getTableData)
        .then(getStatisticsData)
        .then(function () {
            res.render('service_manager', {
                layout: "layouts/back_layout",
                title: "发布服务列表",
                sourceTypeList: tableData.data.data,
                DBType: allType.data,
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
            res.render('service_manager', {
                layout: "layouts/back_layout",
                title: "发布服务列表",
                role: req.session.username.split(',')[1] == '超级管理员'
            });
        });
});
module.exports = router;