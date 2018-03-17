var http = require('http');
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    var url = '/iwherelink/getDictionaryTypeListSorted.do';
    var tableData;
    var secenData;
    //请求表格数据和数据库类型
    function getTableData() {
        return new Promise(function(resolve,reject) {
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
    //获取所有的业务场景数据
    function getAllSceneData() {
        return new Promise(function (resolve, reject) {
            http.get('/iwherelink/getAllSourceType.do', function (res1) {
                res1.on('data', function (data) {
                    try {
                        secenData = JSON.parse(data);
                    } catch (err) {
                        console.error('Invalid secenData', err);
                    }
                });
                res1.on('end', function () {
                    resolve(secenData);
                });
                res1.on('error', function (err) {
                    console.log(err);
                })
            });
        })
    }

    getTableData()
        .then(getAllSceneData)
        .then(function () {
            res.render('dic_type', {
                layout: "layouts/back_layout",
                title: "字典聚类配置",
                dicType: tableData.data,
                sourceType: secenData,
                totalPage: tableData.page,
                page: tableData.page,
                roleName:req.cookies.ROLENAME,
                userName:req.cookies.USERNAME
            });
        })
        .catch(function (err) {
            res.render('dic_type', {
                layout: "layouts/back_layout",
                title: "字典聚类配置"
            });
        });
});
module.exports = router;
