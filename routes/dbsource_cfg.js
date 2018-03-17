/**
 * Created by Administrator on 2016/7/20.
 */
var http = require('http');
var request = require('request');
var express = require('express');
var router = express.Router();
router.get('/', function (req, res, next) {
    var url = '/iwherelink/getDatabaseList.do?page=1&mode=0';
    var tableData;
    var allDBtype;
    var statisticsData;

    //获取表格数据
    function getTableData() {
        return new Promise(function (resolve, reject) {
            http.get(url, function (res1) {
                var bufferData = '';
                res1.on('data', function (data) {
                    try {
                        bufferData += data;
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

    //获取全部数据库类型
    function getAllDBtype() {
        return new Promise(function (resolve, reject) {
            http.get('/iwherelink/getAllDatabaseTypeList.do', function (res1) {
                var bufferData = '';
                res1.on('data', function (data) {
                    try {
                        bufferData += data;
                    } catch (err) {
                        console.error('Invalid allDBtype', err);
                    }
                });
                res1.on('end', function () {
                    allDBtype = JSON.parse(bufferData);
                    resolve(allDBtype);
                    //设置全局变量allDBtype
                    res.clearCookie("allDBtype");
                    res.cookie("allDBtype", allDBtype, {maxAge: 60 * 1000});

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
            http.get('/iwherelink/database/statistics/all.do', function (res1) {
                var bufferData = '';
                res1.on('data', function (data) {
                    try {
                        bufferData += data;
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

    getAllDBtype()
        .then(getTableData)
        .then(getStatisticsData)
        .then(function () {

            //设置type 与 typeName一一对应
            for (var i = 0; i < tableData.data.data.length; i++) {
                var currentData = tableData.data.data[i];
                for (var j = 0; j < allDBtype.data.length; j++) {
                    var currentDBtype = allDBtype.data[j];
                    if (currentData.type == currentDBtype.id) {
                        currentData.typeName = currentDBtype.name;
                    }
                }
            }
            res.render('dbsource_cfg', {
                layout: "layouts/back_layout",
                title: "数据库列表",
                sourceTypeList: tableData.data.data,
                DBType: allDBtype.data,
                totalPage: tableData.data.totalPage,
                page: tableData.data.page,
                status: 0,
                message: '连接异常',
                totalNum: tableData.data.totalNum,
                statistics: statisticsData.data,
                role: req.session.username.split(',')[1] == '超级管理员'
                // roleName:req.cookies.ROLENAME,
                // userName:req.cookies.USERNAME
            });
        })
        .catch(function () {
            res.render('dbsource_cfg', {
                layout: "layouts/back_layout",
                title: "数据库列表"
            });
        });
});
module.exports = router;