var express = require('express');
var http = require('http');
var router = express.Router();

router.get('/building', function (req, res) {
    if (!req.session.username) res.redirect('/login');
    res.render('statistic_building',{
        layout: "layouts/header",
        username:req.session.username.split(',')[0],
        role:req.session.username.split(',')[1] == '超级管理员',
        manage: false,
        author: {
            id: '/statistic/building',
            name: '房屋统计'
        }
    });
});
router.get('/company', function (req, res) {
    if (!req.session.username) res.redirect('/login');
    res.render('statistic_cmp',{
        layout: "layouts/header",
        username:req.session.username.split(',')[0],
        role:req.session.username.split(',')[1] == '超级管理员',
        manage: false,
        author: {
            id: '/statistic/company',
            name: '企业统计'
        }
    });
});
router.get('/people', function (req, res) {
    if (!req.session.username) res.redirect('/login');
    res.render('statistic_people',{
        layout: "layouts/header",
        username:req.session.username.split(',')[0],
        role:req.session.username.split(',')[1] == '超级管理员',
        manage: false,
        author: {
            id: '/statistic/people',
            name: '人口统计'
        }
    });
});
router.get('/event', function (req, res) {
    if (!req.session.username) res.redirect('/login');
    res.render('statistic_event',{
        layout: "layouts/header",
        username:req.session.username.split(',')[0],
        role:req.session.username.split(',')[1] == '超级管理员',
        manage: false,
        author: {
            id: '/statistic/event',
            name: '事件统计'
        }
    });
});
module.exports = router;
