var http = require('http');
var express = require('express');
var router = express.Router();
/* GET users listing. */
router.get('/', function (req, res, next) {
    //初始化获取表格数据
    var url = '/iwherelink/getConditionInfoListHtml.do';
    var tableData;
    var secenData;
    var filedType;

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
    //获取字段类型数据
    function getFiledType(){
        return new Promise(function(resolve,reject){
            http.get('/iwherelink/getDType4ConditionInfo.do', function (res1) {
                res1.on('data',function(data){
                    try{
                        filedType=JSON.parse(data);
                    } catch(err){
                        console.error('Invalid tableData',err);
                    }
                });
                res1.on('end',function(){
                    resolve(filedType);
                });
                res1.on('error',function(err){
                    console.log(err);
                })
            });
        })
    }

    getTableData()
        .then(getAllSceneData)
        .then(getFiledType)
        .then(function(){
            res.render('dic_cfg', {
                layout: "layouts/back_layout",
                title: "字典配置",
                sourceType: secenData,
                filedTypeData:filedType,
                dicConditionInfo: tableData.data,
                totalPage: tableData.page,
                page: tableData.page,
                roleName:req.cookies.ROLENAME,
                userName:req.cookies.USERNAME
            });
        })
        .catch(function(){
            res.render('dic_cfg', {
                layout: "layouts/back_layout",
                title: "字典配置"
            });
        });
});
module.exports = router;
