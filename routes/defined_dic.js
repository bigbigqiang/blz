/**
 * Created by Administrator on 2017/5/15.
 */
var http = require('http');
var express = require('express');
var router = express.Router();
router.get('/', function (req, res, next) {
    res.render('defined_dic', {
        layout: "layouts/back_layout",
        title: "定义字典",
        role: req.session.username.split(',')[1] == '超级管理员'
    });
});
module.exports = router;