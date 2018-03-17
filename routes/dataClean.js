var http = require('http');
var express = require('express');
var router = express.Router();
router.get('/', function (req, res, next) {
    res.render('dataClean', {
        layout: "layouts/back_layout",
        title: "数据清洗",
        role: req.session.username.split(',')[1] == '超级管理员'
    });
});
module.exports = router;