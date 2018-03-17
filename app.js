var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var hbs = require('hbs');
var fs = require('fs');
var qs = require('qs');
var http = require('http');
var querystring = require('querystring');
var jexcel = require('json2excel');
var session = require('express-session');
var domain = require('domain');


var login = require('./routes/login');
var index = require('./routes/index');
// 详情
var detail = require('./routes/detail');
// 统计
var statistic = require('./routes/statistic');
// 用户管理
var userManager = require('./routes/user_manager');
// var backCfg = require('./routes/back_cfg');
var dbSource = require('./routes/dbsource_cfg');
var createViews = require('./routes/create_views');
var definedDic = require('./routes/defined_dic');
var serviceManager = require('./routes/service_manager');
var viewManager = require('./routes/view_manager');
var dataSpective = require('./routes/data_perspective');
var perspectiveManager = require('./routes/perspectiveManager');
var dataClean = require('./routes/dataClean');
var dataCleanManager = require('./routes/dataClean_manager');
var dicManage = require('./routes/dic_manager');
 var acsServices_cfg = require('./routes/acsServices_cfg');
 var releaseService = require('./routes/release_service');
var createMigrate = require('./routes/createMigrate');
 var createIndexTask = require('./routes/create_index_task');
 var indexManager = require('./routes/index_manager');
 var indexLargeManager = require('./routes/index_large_manager');
var migrate_assignments = require('./routes/migrate_assignments');

var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');
//段落
hbs.registerHelper('section', function (name,options) {
    if(!this._sections) this._sections={};
    this._sections[name]=options.fn(this);
    return null;
});
//连接状态
hbs.registerHelper('linkStatus', function (status) {
    var span='';
    if(status==0){
        span='<span style="background:green;" value=""0"></span>';
    }
    else{
        span='<span style="background:red;" value="1"></span>';
    }
    return span;
});
//字典状态统计
hbs.registerHelper('statisticsStatus', function (statistics,arr) {
    var text = '';
    for(var i=0;i<statistics.length;i++){
        if (statistics[i].status == 1) {
            text += '<p class="statistics" status='+statistics[i].status+'>'+arr[0]+'：<span >'+statistics[i].count+'</span></p>';
        }
       else{   //正常
            text += '<p class="statistics" status='+statistics[i].status+'>'+arr[1]+'：<span >'+statistics[i].count+'</span></p>';
        }
    }
    return text;
});
//判断数据源类型
hbs.registerHelper('isSourceType', function (sourceType) {
    var text = '';
    if(sourceType){
        switch (sourceType){
            case "db": text = "数据库";
                break;
            case "ws":text = "服务";
                break;
            default :text = "其他";
                break;
        }
    }
    else{
        text='数据库';
    }
    return text;
});

//判断索引任务类型
hbs.registerHelper('isIndexType', function (indexType) {
    var text = '';
    switch (indexType){
        case 0: text = "原表索引";
            break;
        case 1:text = "索引大表";
            layerText='-';
            break;
        default :text = "其他";
            break;
    }
    return text;
});
//判断是否有层级
hbs.registerHelper('isLayer', function (layer) {
    var layerText='';
    if(layer){
        layerText=layer;
    }
    else{
        layerText='-';
    }
    return layerText;
});
//判断编码类型
hbs.registerHelper('isCodeType', function (codeType) {
    var text = '';
    switch (codeType){
        case 1: text = "点编码";
            break;
        case 2:text = "矩形编码";
            break;
        default :text = "其他";
            break;
    }
    return text;
});

//是否启动索引任务
hbs.registerHelper('startTask', function (status) {
    var text = '';
    switch (status){
        case 0: text = "<span class='non_active_status addService status' >已开启</span>";
         break;
        case 1: text = "<a class='active_status addService status' status='1'>开启</a>";
            break;
        default :text = "<a class='active_status addService status' status='1'>开启</a>";
            break;
    }
    return text;
});

hbs.registerHelper('startTaskMigrate', function (status) {
    var text = '';
    if (status == 1){
        text = "<span class='non_active_status ' >已开启</span>";
    }
    if(status == 0){
        text = "<a class='active_status status'>开启</a>"
    }
    return text;
});

//开启或停止字典
hbs.registerHelper('status', function (status) {
    var text = '';
    if (status == 1) {
        text = "<a class='active_status addService status' status='1'>开启</a>" +
            "| <span class='non_active_status  removeService status'>停止</span>";
    }
    if (status == 0) {  //正常
        text = "<span class='non_active_status addService status' >开启</span>" +
            "| <a class='active_status removeService status' status='0'>停止</a>";
    }
    return text;
});

//开启和停止视图
hbs.registerHelper('Viewstatus', function (status) {
    var text = '';
    if (status == 1) {
        text = "<a class='active_status addService status'>开启</a>" +
            "| <a class='non_active_status  removeService status'>停止</a>";
    }
    if (status == 0) { //正常
        text = "<a class='non_active_status addService status' >开启</a>" +
            "| <a class='active_status removeService status'>停止</a>";
    }
    return text;
});
hbs.registerHelper('Perspectivestatus', function (status) {
    var text = '';
    if (status == 1) {
        text = "<a class='active_status addService status'>开启</a>" +
            "| <a class='update'>更新</a>"+
            "| <a class='non_active_status  removeService status'>停止</a>";
    }
    if (status == 0) { //正常
        text = "<a class='non_active_status addService status' >开启</a>" +
            "| <a class='update'>更新</a>"+
            "| <a class='active_status removeService status'>停止</a>";
    }
    return text;
});

//字典展示类型文本设置
hbs.registerHelper('textShow', function (conditionType) {
    var text = '';
    switch (conditionType) {
        case '11':
            text = '文本类型';
            break;
        case '12':
            text = '时间类型';
            break;
        case '13':
            text = '滑片类型';
            break;
        default :
            text = '下拉框';
    }
    return text;
});
//字典是否展示
hbs.registerHelper('weatherShow', function (isShow) {
    var text = '';
    switch (isShow) {
        case '1':
            text = '显示';
            break;
        case '0':
            text = '不显示';
            break;
    }
    return text;
});
//因为字段类型数据是json，而不是数组，所以遍历json
hbs.registerHelper('filedType', function (filedTypeData) {
    var option = '';
    for (var attr in filedTypeData) {
        option += '<option value=' + attr + '>' + filedTypeData[attr] + '</option>';
    }
    return new hbs.SafeString(option);
});


app.enable('trust proxy');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 实例化session
app.use(session({
    secret: 'sdkfjd',
    name: 'username',
    cookie: {maxAge: 1000 * 60 * 60 * 24},
    resave: true,
    saveUninitialized: true
}));

app.use(function(req,res,next){
    var reqDomain = domain.create();
    reqDomain.on('error',function(err){
        console.log('捕获到错误');
        res.send(500,err.stack)
    });
    reqDomain.run(next);
});

/*登陆页面*/
app.use('/login',login);
/*主页面*/
app.use('/',index);
/*详情页面*/
app.use('/detail',detail);
/*统计页面*/
app.use('/statistic',statistic);
//身份管理
app.use('/userManager.do', userManager);
//后台配置页面--begin
// app.use('/getAllDBTypePage.do', backCfg);
app.use('/acsServices_cfg', acsServices_cfg);
app.use('/getAllDatabasePage.do', dbSource);
app.use('/createView.do', createViews);
app.use('/definedDic.do', definedDic);
app.use('/dicManager.do', dicManage);
app.use('/viewManager.do', viewManager);
app.use('/dataPerspective.do', dataSpective);
app.use('/perspectiveManager.do', perspectiveManager);

app.use('/dataClean.do', dataClean);
app.use('/dataCleanManager.do', dataCleanManager);
app.use('/releaseService.do', releaseService);
app.use('/serviceManager.do', serviceManager);

app.use('/createMigration.do',createMigrate);
app.use('/createIndexTask.do', createIndexTask);
app.use('/indexManager.do', indexManager);
app.use('/indexLargeManager.do', indexLargeManager);

app.use('/migrate_assignments.do', migrate_assignments);

//global.IP = '192.168.0.19';// 内网
global.IP = '127.0.0.1';// 外网
global.PORT = 8082;

//登录
app.post('/loginIn', function (req, res) {
    var postData=qs.stringify({
        "name":req.body.name,
        "password":req.body.password
    });
    var option={
        method:"POST",
        hostname:IP,
        port:PORT,
        path:'/blz/login.do',
        headers:{
            "Content-Type":'application/x-www-form-urlencoded',
            "Content-Length":postData.length
        }
    };

    var req1=http.request(option, function (res1) {
        var resJsonData;
        var bufferData='';
        res1.on('data', function (data) {
            try {
                bufferData+=data;
            } catch (err) {
                console.error(err);
            }
        });
        res1.on('end', function () {
            resJsonData=JSON.parse(bufferData);
            req.session.username = req.body.name + ',' + resJsonData.role;
            res.send(resJsonData);
        });
    }).on('error', function (err) {
        res.send(err);
    });
    req1.write(postData);
    req1.end();
});

//退出登录
app.get("/logout",function(req,res){
    req.session.destroy(function (){
        res.redirect('/login');
    });
    // var postData=qs.stringify({
    //     "name":req.body.name
    // });
    // var option={
    //     hostname:IP,
    //     port:PORT,
    //     method:"POST",
    //     path:'/blz/logout.do',
    //     headers:{
    //         "Content-Type":'application/x-www-form-urlencoded',
    //         "Content-Length":postData.length
    //     }
    // };

    // var req1=http.request(option, function (res1) {
    //     res1.on('data', function (data) {
    //         try {
    //             bufferData+=data;
    //         } catch (err) {
    //             console.error('登录失败，请重新登录', err);
    //         }
    //     });
    //     res1.on('end', function () {
    //         resJsonData=JSON.parse(bufferData);
    //         req.session.destroy(function (){
    //         res.redirect('/login');
    //         });
    //         res.send(resJsonData);
    //     });
    // }).on('error', function (err) {
    //     console.error(err);
    // });
    // req1.write(postData);
    // req1.end();
});
//测试treed
app.get("/testTree",function(req,res){
    res.writeHead(200,{"Content-Type":'test/plain','charset':'utf-8','Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'PUT,POST,GET,DELETE,OPTIONS'});
    var str = fs.readFileSync("./public/js/jdsl.json");
    res.write(str);
    res.end();
});
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.redirect('/login');
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.redirect('/login');
});

module.exports = app;
