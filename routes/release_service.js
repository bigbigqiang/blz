/**
 * Created by Administrator on 2017/5/10.
 */
var http = require('http');
var express = require('express');
var router = express.Router();
router.get('/', function (req, res, next) {
    res.render('release_service', {
        layout: "layouts/back_layout",
        title: "发布服务",
        role: req.session.username.split(',')[1] == '超级管理员'
    });
});
module.exports = router;