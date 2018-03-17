var express = require('express');
var http = require('http');
var router = express.Router();

router.get('/', function (req, res) {
    if(req.session.username){
        res.render('index',{
            username:req.session.username.split(',')[0],
            role:req.session.username.split(',')[1] == '超级管理员',
            layout: "layouts/header",
            manage: true
        });
    }else
        res.redirect("/login");
});
module.exports = router;
