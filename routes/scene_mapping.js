var http = require('http');
var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    var url = '/iwherelink/getTableInfoListSorted.do?page=1&condition=&sort=';
    var tableData;
    var secenData;
    var dbData;
    //获取表格数据
    function getTableData(){
        return new Promise(function(resolve,reject){
            http.get(url, function (res1) {
                res1.on('data',function(data){
                    try{
                        tableData=JSON.parse(data);
                    } catch(err){
                        console.error('Invalid tableData',err);
                    }
                });
                res1.on('end',function(){
                    resolve(tableData);
                });
                res1.on('error',function(err){
                    console.log(err);
                })
            });
        })
    }
    //获取所有的业务场景数据
    function getAllSceneData(){
        return new Promise(function(resolve,reject){
            http.get('/iwherelink/getAllSourceType.do', function (res1) {
                res1.on('data',function(data){
                    try{
                        secenData=JSON.parse(data);
                    } catch(err){
                        console.error('Invalid secenData',err);
                    }
                });
                res1.on('end',function(){
                    resolve(secenData);
                });
                res1.on('error',function(err){
                    console.log(err);
                })
            });
        })
    }
    //获取添加弹窗里的数据库数据
    function getAddDBData(){
        return new Promise(function(resolve,reject){
            http.get('/iwherelink/getDatabasePageForJson.do', function (res1) {
                res1.on('data',function(data){
                    try{
                        dbData=JSON.parse(data);
                    } catch(err){
                        console.error('Invalid secenData',err);
                    }
                });
                res1.on('end',function(){
                    resolve(dbData);
                });
                res1.on('error',function(err){
                    console.log(err);
                })
            });
        })
    }
    getTableData().then(getAllSceneData).then(getAddDBData).then(function(){
        res.render('scene_mapping', {
            layout: "layouts/back_layout",
            title: "业务场景映射配置",
            sourceType: secenData,
            databaseInfo: dbData.page.datas,
            sceneList: tableData.data,
            totalPage: tableData.page,
            page: tableData.page,
            roleName:req.cookies.ROLENAME,
            userName:req.cookies.USERNAME
        });
    }).catch(function(err){
        res.render('scene_mapping', {
            layout: "layouts/back_layout",
            title: "业务场景映射配置"
        });
        console.error(err);
    });
});
module.exports = router;
