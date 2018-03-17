var http = require('http');
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    var url = '/iwherelink/getAllSourceType.do';
    var sceneData;
    http.get(url, function (res1) {
        var bufferData='';
        res1.on('data', function (data) {
            try {
                bufferData+=data;
            } catch (err) {
                console.error('获取业务场景数据失败', err);
            }
        });
        res1.on('end', function () {
            sceneData = JSON.parse(bufferData);
            res.render('fusion_cfg', {
                layout: "layouts/service_layout",
                sourceType: sceneData,
                roleName:req.cookies.ROLENAME,
                userName:req.cookies.USERNAME
            });
        });
        res1.on('error', function (err) {
            console.error(err);
        });
    });
});
module.exports = router;
