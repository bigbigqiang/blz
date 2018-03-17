/**
 * Created by admin on 2017/7/5.
 */
$(function() {
    $('.sub-menu a[href="./createMigration.do"]').addClass('current_page').parents('.third-level').show().parent().addClass('open');

    /*******************************请求初始显示内容start***************************/
    //从cookie中取出数据
    var cookieData;
    if($.cookie('dicData')) cookieData = JSON.parse($.cookie('dicData'));
    $.removeCookie('dicData');
    if(cookieData) {
        console.log(cookieData);
        $(".migrate-name").val(cookieData.name);
        $('#targetUrl').val(cookieData.targetUrl);
        //迁移类型
        if(cookieData.type == "全量迁移"){
            cookieData.type == 0;
        }
        if(cookieData.transferType == "全库迁移"){
            cookieData.transferType == 0;
        }

        var migrateTypeRadio = $('.migrate-type input[name="type"]');


        $.each(migrateTypeRadio,function(key,value){
             if($(this).val() == cookieData.type){
                 $(this).attr('checked',true);
             }else{
                 $('.migrate-type input[type="radio"][value="1"]').attr('checked',true);
            }
        });


        //迁移量

        $('#targetPort').val(cookieData.targetPort);
        $('#targetTableSpace').val(cookieData.targetTableSpace);
        $('#targetDatabase').val(cookieData.targetDatabase);
        $('#targetUserName').val(cookieData.targetUserName);
        $('#targetPassword').val(cookieData.targetPassword);
        var sourceType = cookieData.sourceType;
        $("#sourceType").val(sourceType);
        sourceType == "db" ? dbType() :
            sourceType == "ws" ? wsType() :
                sourceType == "dic" ? dicName() :
                    sourceType == "view" ? viewName() : "";

    }else dbType();

    var selectData = $('#selectData');
    var createPerspective = $('#createPerspective');
    var btnPrev = $('.btn-prev');

    $("#sourceType").change(function() {
        $('#switchSource').empty();
        $(this).val();
        var content = "";
        if ($(this).val() == "db") {
            dbType();
        }
        if ($(this).val() == "ws") {
            wsType();
        }
        if ($(this).val() == "dic") {
            dicName();
        }
        if ($(this).val() == "view") {
            viewName();
        }

    });
    //数据库类型
    function dbType(){
        $.ajax({
            type:'post',
            url:"/iwherelink/getAllDatabaseTypeList.do",
            dataType:'json',
            success:function(data){
                $('.databaseName').empty();
                if(data.code==0){
                    var select = '<div class="con control-group"><label class="control-label">数据库类型： </label> <select id="dbType" class="span8">';
                    var option = '';
                    $.each(data.data, function(key, value) {
                        option += "<option value='" + value.id + "'>" + value.name + "</option>";
                    });
                    select += option + '</select><em class="requiredStar">*</em></div>';
                    $("#targetDb").empty().append(option);
                    $('#switchSource').append(select);
                    cookieData && $('#switchSource').find(".con:last-child select").val(cookieData.source.sourceTypeId);
                    dbUrl();
                    $("#dbType").change(function() {
                        $("#dbUrl").parent(".con").remove();
                        $("#dbUser").parent(".con").remove();
                        $("#dbTable").parent(".con").remove();
                        $("#migrate").remove();
                        dbUrl();
                    });
                }else{
                    $('.btn-next').attr("disabled","disabled");
                }

            },
            error:function(message){
                layer.alert("请求失败！");
            }
        });

    }
    //数据库地址
    function dbUrl() {
        $.ajax({
            type: 'GET',
            url: '/iwherelink/database/type/url.do',
            dataType: 'json',
            data: {
                type: $("#dbType").val()
            },
            success: function(data) {
                if (data.code == 0) {
                    var select = '<div class="con control-group"> <label class="control-label">登录地址： </label><select id="dbUrl" class="span8">';
                    $.each(data.data, function(key, value) {
                        var option = "<option value='" + key + "'>" + value + "</option>";
                        select += option;
                    });
                    select += '</select></span><em class="requiredStar">*</em></div>';
                    $("#switchSource").append(select);
                    cookieData && $('#switchSource').find(".con:last-child select").val(cookieData.source.sourceUrl);
                    dbUser();
                    $("#dbUrl").change(function() {
                        $("#dbUser").parent(".con").remove();
                        $("#dbTable").parent(".con").remove();
                        $("#migrate").remove();
                        dbUser();
                    });
                } else {
                    $(".btn-next").attr("disabled","disabled");
                }


            },
            error: function(e) {
                layer.alert("请求失败！");
            }
        });
    }
    //用户名
    function dbUser() {
        $.ajax({
            type: 'POST',
            url: '/iwherelink/database/type/url/user.do',
            dataType: 'json',
            data: {
                type: $("#dbType").val(),
                url: $("#dbUrl").val()
            },
            success: function(data) {
                if (data.code == 0) {
                    var select = '<div class="con control-group"> <label class="control-label">用户名： </label><select id="dbUser" class="span8">';
                    $.each(data.data, function(key, value) {
                        var option = "<option value='" + key + "'>" + value + "</option>";
                        select += option;
                    });
                    //select += '</select><em class="requiredStar">*</em></div>' +
                    //    '<div class="con control-group" id="migrate"><label class="control-label">迁移量：</label><div class="controls span8">' +
                    //    '<label class="sel-box"><input type="radio" checked name="transferType" value="0">全库迁移</label>' +
                    //    '<label class="sel-box"><input type="radio" name="transferType" value="1">表迁移</label></div></div>';
                    $("#switchSource").append(select);
                    cookieData && $('#switchSource').find(".con:last-child select").val(cookieData.source.userName);
                    dbTable();
                    dbPwd();
                    $("#dbUser").change(function() {
                        $("#dbTable").parents(".con").remove();
                        $("#migrate").remove();
                        dbTable();
                        dbPwd();
                    });
                    $("input[name='transferType']").change(function(){
                        var dbTableBox = $(".dbTable");
                        if($(this).val() == '1') dbTableBox.show();
                        else dbTableBox.hide();
                    })
                } else {
                    $(".btn-next").attr("disabled","disabled");
                }
                if(cookieData){
                    var migrateNumRadio = $('#migrate input[name="transferType"]');
                    var dbTableBox = $(".dbTable");
                    $.each(migrateNumRadio,function(k,v){
                        if($(this).val() == cookieData.transferType){
                            console.log(this.val());
                            $(this).attr('checked',true)
                            dbTableBox.hide();
                        }else{
                            $('#migrate input[type="radio"][value="1"]').attr('checked',true);
                            dbTableBox.show();

                        }
                    });
                }
            },
            error: function(e) {layer.alert("请求失败！");}
        });
    }
    //数据表
    function dbTable() {
        $.ajax({
            type: 'POST',
            url: '/iwherelink/database/table/get.do',
            dataType: 'json',
            data: {
                type: $("#dbType").val(),
                url: $("#dbUrl").val(),
                user: $("#dbUser").val()
            },
            success: function(data) {
                if (data.code == 0) {
                    var select = '<div class="con control-group dbTable"> <label class="control-label">选择表名： </label><select name="source" id="dbTable" class="span8">';
                    $.each(data.data, function(n, data) {
                        var id=n;
                        $.each(data, function(key, value) {
                            var option = "<option value='" + "db"+"."+id+"."+value + "'>" + value + "</option>";
                            select += option;
                        });
                    });
                    select += '</select><em class="requiredStar">*</em></div>';
                    $("#switchSource").append(select);
                    cookieData && $('#switchSource').find(".con:last-child select").val(cookieData.sourcetype + "." + cookieData.source.id + "." + cookieData.source.sourceName);
                    $("#dbTable").change(function() {

                        dbPwd();
                        //$("#migrate").remove();
                    });
                    $(".btn-next").removeAttr("disabled");

                } else {
                    $(".btn-next").attr("disabled","disabled");
                }
            },
            error: function(e) {layer.alert("请求失败！");}
        });
    }
    var sourcePassword;
    //密码
    function dbPwd() {
        $.ajax({
            type: 'POST',
            url: '/iwherelink/database/type/url/user/pwd.do',
            dataType: 'json',
            data: {
                type: $("#dbType").val(),
                url: $("#dbUrl").val(),
                user: $("#dbUser").val()
            },
            success: function(data) {
                if (data.code == 0) {
                    sourcePassword = data.data;
                } else {
                    layer.alert("请求密码失败！");
                }
            },
            error: function(e) {layer.alert("请求失败！");}
        });
    }
    //服务类型
    function wsType() {
        $.ajax({
            type: 'post',
            url: '/iwherelink/getAllWebServiceTypeList.do',
            dataType: 'json',
            success: function(data) {

                if (data.code == 0) {
                    var select = '<div class="con control-group"><label class="control-label">服务类型： </label><select id="wsType" class="span8">';
                    $.each(data.data, function(key, value) {
                        var option = "<option value='" + value.id + "'>" + value.name + "</option>";
                        select += option;
                    });
                    select += '</select><em class="requiredStar">*</em></div>';
                    $("#switchSource").append(select);
                    cookieData && $('#switchSource').find(".con:last-child select").val(cookieData.source.sourceTypeId);
                    wsUrl();
                    $("#wsType").change(function() {
                        $("#wsUrl").parents(".con").remove();
                        $("#wsName").parents(".con").remove();
                        wsUrl();
                    });
                } else {
                    $(".btn-next").attr("disabled","disabled");
                }


            },
            error: function(e) {layer.alert("请求失败！");}
        });
    }
    //服务地址
    function wsUrl() {
        $.ajax({
            type: 'GET',
            url: '/iwherelink/webservice/type/url.do',
            dataType: 'json',
            data: {
                type: $("#wsType").val()
            },
            success: function(data) {
                if (data.code == 0) {
                    var select = '<div class="con control-group"><label class="control-label">服务地址： </label><select id="wsUrl" class="span8">';
                    $.each(data.data, function(key, value) {
                        var option = "<option value='" + key + "'>" + value + "</option>";
                        select += option;
                    });
                    select += '</select><em class="requiredStar">*</em></div>';
                    $("#switchSource").append(select);
                    cookieData && $('#switchSource').find(".con:last-child select").val(cookieData.source.sourceUrl);
                    wsName();
                    $("#wsUrl").change(function() {
                        $("#wsName").parents(".con").remove();

                        wsName();
                    });

                } else {
                    $(".btn-next").attr("disabled","disabled");
                }

            },
            error: function(e) {layer.alert("请求失败！");}
        });
    }
    //服务名
    function wsName() {
        $.ajax({
            type: 'POST',
            url: '/iwherelink/webservice/name/get.do',
            dataType: 'json',
            data: {
                type: $("#wsType").val(),
                url:$("#wsUrl").val()
            },
            success: function(data) {
                if (data.code == 0) {
                    var select = '<div class="con control-group"><label class="control-label">服务名称： </label><select id="wsName" name="source" class="span8">';
                    $.each(data.data, function(key, value) {
                        var option = "<option value='" +$("#sourceType").val()+"."+ key +"."+value+ "'>" + value + "</option>";
                        select += option;
                    });
                    select += '</select><em class="requiredStar">*</em></div>';
                    $("#switchSource").append(select);
                    cookieData && $('#switchSource').find(".con:last-child select").val(cookieData.sourcetype + "." + cookieData.source.id + "." + cookieData.source.sourceName);
                    // dbUrl();
                    $("#wsName").change(function() {
                    });
                    $(".btn-next").removeAttr("disabled");

                } else {
                    $(".btn-next").attr("disabled","disabled");
                }

            },
            error: function(e) {layer.alert("请求失败！");}
        });
    }
//    字典
    function dicName() {
        $.ajax({
            type: 'GET',
            url: '/iwherelink/combine/all.do',
            dataType: 'json',
            success: function(data) {
                if (data.code == 0) {
                    var select = '<div class="con control-group"><label class="control-label">字典名称： </label><select id="dicName" name="source" class="span8">';
                    $.each(data.data, function(key, value) {
                        var option = "<option value='" +$("#sourceType").val()+"."+ key + "'>" + value + "</option>";
                        select += option;
                    });
                    select += '</select><em class="requiredStar">*</em></div>';
                    $("#switchSource").append(select);
                    cookieData && $('#switchSource').find(".con:last-child select").val(cookieData.sourcetype + "." + cookieData.source.id);
                    $(".btn-next").removeAttr("disabled");

                } else {
                    $(".btn-next").attr("disabled","disabled");
                }

            },
            error: function(e) {layer.alert("请求失败！");}
        });
    }

//视图
    function viewName() {
        $.ajax({
            type: 'GET',
            url: '/iwherelink/view/all.do',
            dataType: 'json',
            success: function(data) {
                if (data.code == 0) {
                    var select = '<div class="con control-group"><label class="control-label">视图名称： </label><select id="viewName" name="source" class="span8">';

                    $.each(data.data, function(key, value) {
                        var option = "<option value='" +$("#sourceType").val()+"."+ key + "'>" + value + "</option>";
                        select += option;
                    });
                    select += '</select><em class="requiredStar">*</em></div>';
                    $("#switchSource").append(select);
                    cookieData && $('#switchSource').find(".con:last-child select").val(cookieData.sourcetype + "." + cookieData.source.id);
                    // dbUrl();
                    $("#viewName").change(function() {
                    });
                    $(".btn-next").removeAttr("disabled");

                } else {
                    $(".btn-next").attr("disabled","disabled");
                }

            },
            error: function(e) {layer.alert("请求失败！");}
        });
    }
    /*******************************请求初始显示内容end***************************/

    /*******************************按钮点击事件start***************************/
    var checkName = $(".check-name");     //检查重命名
    var save = $(".save");                //保存
    var preCheck = $(".pre-check");       //预检查
    var modal = $("#modal");              //弹出框
    var closeModal = $(".close-modal");   //弹出框取消/关闭按钮
    var form = $(".main_content");
    var nameInput = $("input[name='name']");
    /***************作业名称获取焦点时错误提示隐藏***************/
    nameInput.on("focus",function(){
        $(this).next().next().hide();
    });
    /***************关闭弹出框***************/
    closeModal.click(function(){
        modal.fadeOut();
    });
    /***************检查数据库名是否存在***************/
    checkName.click(function(){
        var targetType = parseInt($("#targetDb").val()); // int类型，数据库类型id *
        var targetUrl = $("input[name='targetUrl']").val(); // string类型，数据库链接地址 *
        var targetPort = $("input[name='targetPort']").val(); // string类型，数据库端口号
        var targetTableSpace = $("input[name='targetTableSpace']").val(); // string类型，数据库命名空间
        var targetDatabase = $("input[name='targetDatabase']").val(); // string类型，数据库名 *
        var targetUserName = $("input[name='targetUserName']").val(); // string类型，数据库用户名 *
        var targetPassword = $("input[name='targetPassword']").val(); // string类型，数据库密码
        var targetTable = $("input[name='targetTable']").val(); // string类型，数据表
        var reg = /^([fF][tT][pP]:\/\/|[hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)?([A-Za-z0-9:_.#?%=&\/]+)$/;
        if (targetUrl == '' || targetUrl == ' ' || targetUrl == undefined) {
            layer.msg("登录地址不能为空", {time: 2000});
            return false;
        }
        if (!reg.test(targetUrl)) {
            layer.msg("请输入正确的登录地址", {time: 2000});
            return false;
        }
        if (targetPort == '' || targetPort == ' ' || targetPort == undefined) {
            layer.msg("端口号不能为空", {time: 2000});
            return false;
        }
        if (targetUserName == '' || targetUserName == ' ' || targetUserName == undefined) {
            layer.msg("用户名不能为空", {time: 2000});
            return false;
        }
        if (targetPassword == '' || targetPassword == ' ' || targetPassword == undefined) {
            layer.msg("密码不能为空", {time: 2000});
            return false;
        }
        if($("input[name='transferType']:checked").val() == '1')
            if (targetTable == '' || targetTable == ' ' || targetTable == undefined) {
                layer.msg("目标表不能为空", {time: 2000});
                return false;
            }
        $.ajax({
            type: 'POST',
            url: '/iwherelink/transfer/target/check.do',
            dataType: 'json',
            data: {
                targetType: targetType,
                targetUrl: targetUrl,
                targetPort: targetPort,
                targetTableSpace: '',
                targetDatabase: targetDatabase,
                targetUserName: targetUserName,
                targetPassword: targetPassword,
                targetTable: targetTable
            },
            success: function (data) {
                if (data.code == 0) {
                    layer.alert("检查目标库名成功！");
                } else {
                    layer.alert("检查目标库名失败！");
                }
            },
            error: function (e) {
                layer.alert("请求失败！");
            }
        });
    });
    /***************保存***************/
    save.click(function(){
        if(checkInput()){
            var name = $("input[name='name']").val();
            //名称查重
            $.ajax({
                type: 'GET',
                url: '/iwherelink/transfer/check.do',
                data: {name: name},
                dataType: 'json',
                success: function (data) {
                    if (data.code == 0) {
                        saveAll();
                    } else {
                        layer.alert('迁移作业名称重复');
                    }
                },
                error: function () {
                    layer.alert("请求失败！");
                }
            });
        }
    });
    /******保存请求*****/
    function saveAll(){
        var resultStr = form.serialize();
        var resultArr = resultStr.split("&");
        console.log(resultArr);
        resultArr.push("transferType=1");
        resultArr.push("sourceType=db");
        console.log(resultArr);
        var resultObj = {};
        for (var i = 0; i < resultArr.length; i++) {
            var arr = resultArr[i].split("=");
            resultObj[arr[0]] = decodeURIComponent(arr[1]);
        }
        console.log(resultObj);
        $.ajax({
            type: 'POST',
            url: '/iwherelink/transfer/save.do',
            data: resultObj,
            dataType: 'json',
            success: function (data) {
                if (data.code == 0) {
                    layer.msg("保存成功！", {time: 2000});
                    //setTimeout(function () {
                    //    window.location.href = "/migrate_assignments.do";
                    //}, 2000);
                } else {
                    layer.msg(data.message, {time: 2000});
                }
            },
            error: function () {
                layer.alert("请求失败！");
            }
        });
    }
    /*****输入内容校验****/
    function checkInput () {
        var reg = /^[\u4e00-\u9fa5a-zA-Z0-9\_]*$/;
        var reg1 = /^\S*$/;
        var reg2 = /^([fF][tT][pP]:\/\/|[hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)?([A-Za-z0-9:_.#?%=&\/]+)$/;
        var name = nameInput.val().trim();
        var targetUrl = $("input[name='targetUrl']").val();
        var targetPort = $("input[name='targetPort']").val();
        var targetTableSpace = $("input[name='targetTableSpace']").val();
        var targetUserName = $("input[name='targetUserName']").val();
        var targetPassword = $("input[name='targetPassword']").val();
        var targetTable = $("input[name='targetTable']").val();
        //校验
        if (name == '' || name == ' ' || name == undefined) {
            nameInput.next().next().show().text('不能为空');
            return false;
        }
        if (!reg1.test(name)) {
            nameInput.next().next().show().text('不能包含空格');
            return false;
        }
        if (!reg.test(name)) {
            nameInput.next().next().show().text('不能包含特殊字符');
            return false;
        }
        if (targetUrl == '' || targetUrl == ' ' || targetUrl == undefined) {
            layer.msg("登录地址不能为空", {time: 2000});
            return false;
        }
        if (!reg2.test(targetUrl)) {
            layer.msg("请输入正确的登录地址", {time: 2000});
            return false;
        }
        if (targetPort == '' || targetPort == ' ' || targetPort == undefined) {
            layer.msg("端口号不能为空", {time: 2000});
            return false;
        }
        if (targetUserName == '' || targetUserName == ' ' || targetUserName == undefined) {
            layer.msg("用户名不能为空", {time: 2000});
            return false;
        }
        if (targetPassword == '' || targetPassword == ' ' || targetPassword == undefined) {
            layer.msg("密码不能为空", {time: 2000});
            return false;
        }
        if($("input[name='transferType']:checked").val() == '1')
            if (targetTable == '' || targetTable == ' ' || targetTable == undefined) {
                layer.msg("目标表不能为空", {time: 2000});
                return false;
            }
        return true;
    }
    /***************预检查(共7项)***************/
    var websocket;
    var tBody = $("#modal tbody");
    var progressBar = $(".progress-bar");
    var progressNum = $(".progress-bar span");
    var num = 0;
    var err = false;
    preCheck.click(function(){
        if(checkInput()) {
            websocket = new SockJS("/websocket/transfer/sockjs?TOKEN=db");

            var resultStr = form.serialize();
            var resultArr = resultStr.split("&");
            var resultObj = {};
            for (var i = 0; i < resultArr.length; i++) {
                var arr = resultArr[i].split("=");
                resultObj[arr[0]] = arr[1];
            }
            console.log($("#dbTable").val());
            var tableArr = $("#dbTable").val().split(".");
            resultObj.type = "db";
            resultObj.sourceType = $("#dbType option[value="+$("#dbType").val()+"]").html();
            resultObj.source = $("#dbUrl").val();
            resultObj.sourceUserName = $("#dbUser").val();
            resultObj.sourcePassword = sourcePassword;
            resultObj.sourceTable = tableArr[tableArr.length-1];
            resultObj.targetType = $("#targetDb option[value="+$("#targetDb").val()+"]").html();
            resultObj.transferType = 1;
            websocket.onopen = function (event) {
                console.log('open');
                if (event.type == 'open') {
                    console.log(resultObj);
                    websocket.send(JSON.stringify(resultObj));
                    modal.fadeIn();
                    tBody.empty();
                    progressBar.css("width",'0').removeClass("error");
                    progressNum = 0;
                    num = 0;
                }
            }

            websocket.onmessage = function (event) {
                console.log('onmessage');
                num ++;
                if(num == 8) return;
                var data = JSON.parse(event.data);
                if(data.code == 1) var error = true;
                tBody.append("<tr><td class='text-center'>"+
                    data.message+"</td><td class='text-center'>"+
                        //data.data+"</td><td class='text-center'><b class='"+(data.code == 0 ? "check-right'>✔" : "check-wrong'>✘")+"</b></td></tr>");
                    data.data+"</td><td class='text-center'><b class='"+(!error ? "check-right'>✔" : "check-wrong'>✘")+"</b></td></tr>");
                if(data.code == 0 && !error){
                    progressAnimate(num);
                }
            };

            websocket.onerror = function (event) {
                console.log("onerror:" + event);
            };

            websocket.onclose = function (event) {
                console.log("onclose:" + event);
            };
        }
    });
    function progressAnimate(n){
        console.log(1111);
        var gap = 670 / 7;
        var end = gap * n;
        console.log(end);
        if(end >= 670){
            progressBar.animate({"width": '670px'}, 200);
            $(".progress-bar span").html('100');
            progressBar.removeClass('error');
            return;
        }else{
            progressBar.animate({"width":end + 'px'}, 200);
            $(".progress-bar span").html((end / 670 * 100).toFixed(2));
            progressBar.addClass('error');
        }

    }

    /*******************************按钮点击事件end***************************/
    /***************************启动***************************************/
    $('.startBtn').click(function(){
        var resultStr = form.serialize();
        var resultArr = resultStr.split("&");
        resultArr.push("transferType=1");
        var resultObj = {};
        for (var i = 0; i < resultArr.length; i++) {
            var arr = resultArr[i].split("=");
            resultObj[arr[0]] = decodeURIComponent(arr[1]);
        }
        $.ajax({
            type:'POST',
            url:'/iwherelink/transfer/startup.do',
            data:resultObj,
            dataType:'json',
            success:function(data){
                 if(data.code == 0){
                     setTimeout(function () {
                         window.location.href = "/migrate_assignments.do";
                     }, 2000);
                 }else{
                     return;
                 }

            },
            error:function(){

            }

        })
    });
    /******************启动**************************/

});