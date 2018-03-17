/**
 * Created by Administrator on 2016/7/20.
 */
var http = require('http');
var express = require('express');
var router = express.Router();
router.get('/', function (req, res, next) {
    res.render('create_views', {
        layout: "layouts/back_layout",
        title: "新建视图",
        role: req.session.username.split(',')[1] == '超级管理员'
    });
});
module.exports = router;