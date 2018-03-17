/**
 * Created by Administrator on 2016/8/30.
 */
var express=require('express');
var http=require('http');
var router=express.Router();
router.get('/',function(req,res,next){
    res.render('china_weather',{
        layout:null
    });
});
module.exports = router;