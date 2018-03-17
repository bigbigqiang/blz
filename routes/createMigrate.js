/**
 * Created by admin on 2017/7/5.
 */
var http = require('http');
var express = require('express');
var router = express.Router();
router.get('/', function (req, res, next) {
    res.render('createMigrate', {
        layout: "layouts/back_layout",
        title: "创建迁移作业",
        role: req.session.username.split(',')[1] == '超级管理员'
    });
});
module.exports = router;