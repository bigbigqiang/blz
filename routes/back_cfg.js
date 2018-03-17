var http = require('http');
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    var url = '/iwherelink/getDatabaseTypeSorted.do';
    var tableData;
    http.get(url, function (res1) {
        res1.on('data', function (data) {
            try {
                tableData = JSON.parse(data);
            } catch (err) {
                console.error('Invalid JSON data', err);
            }
        });
        res1.on('end', function () {
            if (res1.statusCode === 200) {
                res.render('database_cfg', {
                    layout: "layouts/back_layout",
                    title: "数据库配置",
                    DBType: tableData.data,
                    totalPage: tableData.page,
                    page: tableData.page,
                    roleName:req.cookies.ROLENAME,
                    userName:req.cookies.USERNAME
                });
            }
            else {
                res.render('database_cfg', {
                    layout: "layouts/back_layout",
                    title: "数据库配置"
                });
            }
        });
        res1.on('error', function (err) {
            console.log(err);
        })
    });
    //next();
});

module.exports = router;
