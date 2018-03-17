var http = require('http');
var express = require('express');
var router = express.Router();
/* GET users listing. */
router.get('/', function (req, res, next) {
    var url = '/iwherelink/getEncodeDatabases.do';
    var tableData;
    //请求表格数据和数据库类型
    function getTableData() {
        return new Promise(function (resolve, reject) {
            http.get(url, function (res1) {
                res1.on('data', function (data) {
                    try {
                        tableData = JSON.parse(data);
                    } catch (err) {
                        console.error('Invalid JSON data', err);
                    }
                });
                res1.on('end', function () {
                    resolve(tableData);
                });
                res1.on('error', function (err) {
                    console.log(err);
                })
            });
        })
    }
    getTableData()
        .then(function () {
            console.log(tableData);
            res.render('encode_cfg', {
                layout: "./layouts/back_layout",
                title: '编码配置',
                dbSource: tableData.data,
                roleName: req.cookies.ROLENAME,
                userName: req.cookies.USERNAME
            });
        })
        .catch(function (err) {
            res.render('encode_cfg', {
                layout: "./layouts/back_layout",
                title: "编码配置"
            });
        });
});
module.exports = router;
