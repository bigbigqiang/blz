/**
 * Created by Administrator on 2016/9/21.
 */
var express = require('express');
var http = require('http');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('userManager', {
        layout: "layouts/back_layout",
        title: "用户管理",
        userList: [],
        totalPage: 5,
        page: 1,
        role: req.session.username.split(',')[1] == '超级管理员'
    });
});
module.exports = router;