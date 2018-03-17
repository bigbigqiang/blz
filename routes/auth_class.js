/**
 * Created by Administrator on 2016/9/21.
 */
var express=require('express');
var http=require('http');
var router=express.Router();

router.get('/',function(req,res,next){
    var url = '/js/mockResultData2.json';
    var tableData;
    http.get(url, function (res1) {
        var bufferData = '';
        res1.on('data', function (data) {
            try {
                bufferData += data;
            } catch (err) {
                console.error('Invalid JSON data', err);
            }
        });
        res1.on('end', function () {
            tableData = JSON.parse(bufferData);
            res.render('auth_class', {
                layout: "layouts/back_layout",
                title: "权限分类",
                authList: tableData.data,
                totalPage: tableData.page,
                page: tableData.page,
                roleName:req.cookies.ROLENAME,
                userName:req.cookies.USERNAME
            });
        });
        res1.on('error', function (err) {
            //res.render('role_cfg', {
            //    layout: "layouts/back_layout",
            //    title: "角色配置"
            //});
            console.log(err);
        })
    });
});
module.exports=router;