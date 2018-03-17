var http = require('http');
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    var tableData;
    var statisticsData;
    //获取表格数据
    function getTableData() {
        var url = '/iwherelink/indexBigTable/getAll.do?page=1&order=code&mode=0';
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
                    console.log(tableData);
                    resolve(tableData);
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
            http.get('/iwherelink/indexBigTable/getDataState.do', function (res1) {
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
                    console.log(statisticsData);
                    resolve(statisticsData);
                });
                res1.on('error', function (err) {
                    console.log(err);
                })
            });

        })
    }

    //获取链接状态
    getTableData(1)
        .then(getStatisticsData)
        .then(function () {
             res.render('indexLargeManager', {
                 layout: "layouts/back_layout",
                 title: "索引大表数据列表",
                 dicName: tableData.data.data,
                 totalPage: tableData.data.totalPage,
                 page: tableData.data.page,
                 message: '连接异常',
                 totalNum: tableData.data.totalNum,
                 statistics:statisticsData.data,
                 role: req.session.username.split(',')[1] == '超级管理员'
             });
         })
        .catch(function () {
            res.render('indexLargeManager', {
                layout: "layouts/back_layout",
                title: "索引大表数据列表",
                role: req.session.username.split(',')[1] == '超级管理员'
            });
        });
});

module.exports = router;
