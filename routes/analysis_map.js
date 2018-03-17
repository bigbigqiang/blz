/**
 * Created by Administrator on 2016/8/10.
 */
var http = require('http');
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res) {
    res.render('analysis_map',{
        roleName:req.cookies.ROLENAME,
        userName:req.cookies.USERNAME
    });
});
module.exports = router;
