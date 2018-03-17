var http = require('http');
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    var url = '/iwherelink/getFuseViewList.do?page=1&order=name&mode=0';
    var tableData;
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
                    console.log(tableData);
                    resolve(tableData);

                });
                res1.on('error', function (err) {
                    console.log(err);
                })
            });
        })
    }

    getTableData().then(function () {
             res.render('viewManager', {
                 layout: "layouts/back_layout",
                 title: "视图列表",
                 viewName: tableData.data.data,
                 totalPage: tableData.data.totalPage,
                 page: tableData.data.page,
                 totalNum: tableData.data.totalNum,
                 off:tableData.data.off,
                 on:tableData.data.on,
                 role: req.session.username.split(',')[1] == '超级管理员'
             });
         })
        .catch(function () {
            res.render('viewManager', {
                layout: "layouts/back_layout",
                title: "视图列表",
                role: req.session.username.split(',')[1] == '超级管理员'
            });
        });
});

module.exports = router;
