/**
 * Created by Administrator on 2016/10/17.
 */
var express = require('express');
var http = require('http');
var router = express.Router();

router.get('/', function (req, res) {
    if(req.session.username)
        res.redirect('/');
    else
        res.render('login');
});
module.exports = router;
