/**
 * Created by admin on 2017/5/24.
 */
$(function () {
    //从cookie中取出数据
    var cookieData;
    var columnArr = [];
    if ($.cookie('cleanData')) cookieData = JSON.parse($.cookie('cleanData'));
    $.removeCookie('cleanData');
    if (cookieData) {
        console.log(cookieData);
        $(".perspectiveType").html("编辑");
        $("#perspective").val(cookieData.name);
        var sourceType = cookieData.sourcetype;
        console.log(sourceType);
        $("#sourceType").val(sourceType);
        sourceType == "db" ? dbType() :
            sourceType == "ws" ? wsType() :
                sourceType == "dic" ? dicName() :
                    sourceType == "view" ? viewName() : "";

    } else dbType();

    $('.sub-menu a[href="./dataClean.do"]').addClass('current_page').parents('.third-level').show().parent().addClass('open');

    var selectData = $('#selectData');
    var createPerspective = $('#dataClean');
    var btnPrev = $('.btn-prev');

    $("#sourceType").change(function () {
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
    function dbType() {
        $.ajax({
            type: 'post',
            url: "/iwherelink/getAllDatabaseTypeList.do",
            dataType: 'json',
            success: function (data) {
                $('.databaseName').empty();
                if (data.code == 0) {
                    var select = "<p class='con input-text control-group'><label class='control-label span4'>数据库类型：</label><select id='dbType' class='span7' style='float: left'>";
                    $.each(data.data, function (key, value) {
                        var option = "<option value='" + value.id + "'>" + value.name + "</option>";
                        select += option;
                    });
                    select += "</select></span></p>";
                    $('#switchSource').append(select);
                    cookieData && $('#switchSource').find(".con:last-child select").val(cookieData.source.sourceTypeId);
                    dbUrl();
                    $("#dbType").change(function () {
                        $("#dbUrl").parent(".con").remove();
                        $("#dbUser").parent(".con").remove();
                        $("#dbTable").parent(".con").remove();
                        dbUrl();
                    });
                } else {
                    //$('.btn-next').attr("disabled", "disabled");
                }

            },
            error: function (message) {
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
            success: function (data) {
                if (data.code == 0) {
                    var select = "<p class='con input-text control-group'><label class='control-label span4' >数据库：</label><select id='dbUrl' class='span7' style='float: left'>";
                    $.each(data.data, function (key, value) {
                        var option = "<option value='" + key + "'>" + value + "</option>";
                        select += option;
                    });
                    select += "</div></select></span></p>";
                    $("#switchSource").append(select);
                    cookieData && $('#switchSource').find(".con:last-child select").val(cookieData.source.sourceUrl);
                    dbUser();
                    $("#dbUrl").change(function () {
                        $("#dbUser").parent(".con").remove();
                        $("#dbTable").parent(".con").remove();
                        dbUser();
                    });
                } else {
                    //$(".btn-next").attr("disabled", "disabled");
                }


            },
            error: function (e) {
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
            success: function (data) {
                if (data.code == 0) {
                    var select = "<p class='con input-text control-group'><label class='control-label span4'  >用户名：</label><select id='dbUser' class='span7' style='float: left'>";
                    $.each(data.data, function (key, value) {
                        var option = "<option value='" + key + "'>" + value + "</option>";
                        select += option;
                    });
                    select += "</div></select></span></p>";
                    $("#switchSource").append(select);
                    cookieData && $('#switchSource').find(".con:last-child select").val(cookieData.source.userName);
                    dbTable();
                    $("#dbUser").change(function () {
                        $("#dbTable").parents(".con").remove();
                        dbTable();
                    });
                } else {
                    //$(".btn-next").attr("disabled", "disabled");
                }
            },
            error: function (e) {
                layer.alert("请求失败！");
            }
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
            success: function (data) {
                if (data.code == 0) {
                    var select = "<p class='con input-text control-group'><label class='control-label span4'>数据表：</label><select id='dbTable' class='span7' style='float: left'>";
                    $.each(data.data, function (n, data) {
                        var id = n;
                        $.each(data, function (key, value) {
                            var option = "<option value='" + $("#sourceType").val() + "." + id + "." + value + "'>" + value + "</option>";
                            select += option;
                        });
                    });
                    select += "</div></select></span></p>";
                    $("#switchSource").append(select);
                    cookieData && $('#switchSource').find(".con:last-child select").val(cookieData.sourcetype + "." + cookieData.source.id + "." + cookieData.source.sourceName);
                    $("#dbTable").change(function () {
                    });
                    $(".btn-next").removeAttr("disabled");

                } else {
                    //$(".btn-next").attr("disabled", "disabled");
                }
            },
            error: function (e) {
                layer.alert("请求失败！");
            }
        });
    }

    //服务类型
    function wsType() {
        $.ajax({
            type: 'post',
            url: '/iwherelink/getAllWebServiceTypeList.do',
            dataType: 'json',
            success: function (data) {

                if (data.code == 0) {
                    var select = "<p class='con input-text control-group'><label  class='control-label span4'>服务类型：</label><select id='wsType' class='span7' style='float: left'>";
                    $.each(data.data, function (key, value) {
                        var option = "<option value='" + value.id + "'>" + value.name + "</option>";
                        select += option;
                    });
                    select += "</select></span></p>";
                    $("#switchSource").append(select);
                    cookieData && $('#switchSource').find(".con:last-child select").val(cookieData.source.sourceTypeId);
                    wsUrl();
                    $("#wsType").change(function () {
                        $("#wsUrl").parents(".con").remove();
                        $("#wsName").parents(".con").remove();
                        wsUrl();
                    });
                } else {
                    //$(".btn-next").attr("disabled", "disabled");
                }


            },
            error: function (e) {
                layer.alert("请求失败！");
            }
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
            success: function (data) {
                if (data.code == 0) {
                    var select = "<p class='con input-text control-group'><label class='control-label span4'>服务地址：</label><select id='wsUrl' class='span7' style='float: left' >";
                    $.each(data.data, function (key, value) {
                        var option = "<option value='" + key + "'>" + value + "</option>";
                        select += option;
                    });
                    select += "</select></span></p>";
                    $("#switchSource").append(select);
                    cookieData && $('#switchSource').find(".con:last-child select").val(cookieData.source.sourceUrl);
                    wsName();
                    $("#wsUrl").change(function () {
                        $("#wsName").parents(".con").remove();

                        wsName();
                    });

                } else {
                    //$(".btn-next").attr("disabled", "disabled");
                }

            },
            error: function (e) {
                layer.alert("请求失败！");
            }
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
                url: $("#wsUrl").val()
            },
            success: function (data) {
                if (data.code == 0) {
                    var select = "<p class='con input-text control-group'><label class='control-label span4'>服务名称：</label><select id='wsName' class='span7' style='float: left' >";
                    $.each(data.data, function (key, value) {
                        var option = "<option value='" + $("#sourceType").val() + "." + key + "." + value + "'>" + value + "</option>";
                        select += option;
                    });
                    select += "</select></span></p>";
                    $("#switchSource").append(select);
                    cookieData && $('#switchSource').find(".con:last-child select").val(cookieData.sourcetype + "." + cookieData.source.id + "." + cookieData.source.sourceName);
                    // dbUrl();
                    $("#wsName").change(function () {
                    });
                    $(".btn-next").removeAttr("disabled");

                } else {
                    //$(".btn-next").attr("disabled", "disabled");
                }

            },
            error: function (e) {
                layer.alert("请求失败！");
            }
        });
    }

//    字典
    function dicName() {
        $.ajax({
            type: 'GET',
            url: '/iwherelink/combine/all.do',
            dataType: 'json',
            success: function (data) {
                if (data.code == 0) {
                    var select = "<p class='con input-text control-group'><label class='control-label span4'>服务名称：</label><select id='dicName' class='span7' style='float: left' >";
                    $.each(data.data, function (key, value) {
                        var option = "<option value='" + $("#sourceType").val() + "." + key + "'>" + value + "</option>";
                        select += option;
                    });
                    select += "</select></span></p>";
                    $("#switchSource").append(select);
                    cookieData && $('#switchSource').find(".con:last-child select").val(cookieData.sourcetype + "." + cookieData.source.id);
                    $(".btn-next").removeAttr("disabled");

                } else {
                    //$(".btn-next").attr("disabled", "disabled");
                }

            },
            error: function (e) {
                layer.alert("请求失败！");
            }
        });
    }

//视图
    function viewName() {
        $.ajax({
            type: 'GET',
            url: '/iwherelink/view/all.do',
            dataType: 'json',
            success: function (data) {
                if (data.code == 0) {
                    var select = "<p class='con input-text control-group'><label class='control-label span4'>服务名称：</label><select id='viewName' class='span7' style='float: left' >";
                    $.each(data.data, function (key, value) {
                        var option = "<option value='" + $("#sourceType").val() + "." + key + "'>" + value + "</option>";
                        select += option;
                    });
                    select += "</select></span></p>";
                    $("#switchSource").append(select);
                    cookieData && $('#switchSource').find(".con:last-child select").val(cookieData.sourcetype + "." + cookieData.source.id);
                    // dbUrl();
                    $("#viewName").change(function () {
                    });
                    $(".btn-next").removeAttr("disabled");

                } else {
                    //$(".btn-next").attr("disabled", "disabled");
                }

            },
            error: function (e) {
                layer.alert("请求失败！");
            }
        });
    }
    //清洗规则类型

    $('#cleanType').change(function(){
        //$('#switchType').empty();
        var current = $(this).val();
        var content = "";
        changeValue(current);


    });
    function changeValue(current){
        if ( current == "nulldispose") {

            $('.repeatType').hide();
            $('.exceptionType').hide();
            $('.nullType').show();
        }
        if (current == "errordispose") {
            $('.nullType').hide();
            $('.repeatType').hide();
            $('.exceptionType').show();
            changeColum($('#columType').val());
            $('#columType').change(function(){
                var currentColum = $(this).val();
                console.log(currentColum);
                changeColum(currentColum);
            })
        }
        if (current == "repeat") {

            $('.nullType').hide();
            $('.exceptionType').hide();


        }
    }
    function changeColum(currentColum){
        if(currentColum == "text"){
            $('.maxminbox').hide();
            $('.wenzibox').show();
        }
        if(currentColum == "digital"){
            $('.maxminbox').show();
            $('.wenzibox').hide();
        }
    }

    //获取输入框焦点隐藏提示信息
    $('#perspective').focus(function () {
        $('.msg').hide();
        $('.error').hide();
        $('.repeat').hide();
    });
    var tableColumn = $("#tableColumn");
    var source;
    //校验清洗任务名称是否重复
    function repeatName(perspective) {
        $.ajax({
            type: 'GET',
            url: '/iwherelink/dataClean/check.do',
            dataType: 'json',
            data: {
                name: perspective
            },
            success: function (data) {
                if (data.code == 1) {
                    $('.repeat').show();
                    return false;
                } else {
                    selectData.hide();
                    createPerspective.show();
                    getSourceColumn();
                    getTable();

                }

            },
            error: function (e) {
                layer.alert("请求失败！");
            }
        });
    }
    function getTable(){
        $.ajax({
            type: 'GET',
            url: '/iwherelink/dataClean/getTable.do',
            dataType: 'json',
            data: {
                source: source
            },
            success: function (data) {
                var thead = "<thead><tr><th>";
                var tbody = "<tbody>";
                var th = "";

                if (data.code == 1) {
                }
                else {
                    //tableColumn.mCustomScrollbar("destroy");
                    for(var k= 0,str='';k<data.data.length;k++) {
                        str += '<tr>';
                        for (var i = 0; i < columnArr.length; i++) {
                            str += '<td>' + data.data[k][columnArr[i]] + '</td>';
                        }
                        str += '</tr>';
                    }
                    $('#table tbody').empty();
                    $('#table tbody').html(str);

                    $('#tableBox').mCustomScrollbar({

                        axis:'yx',
                        advanced:{
                            updateOnBrowserResize:true
                        }
                    });


                }

            },

            error: function (e) {
                layer.alert("请求失败！");
            }
        });
    }

    //获取数据源字段
    function getSourceColumn() {
        $.ajax({
            type: 'GET',
            url: '/iwherelink/dataClean/column.do',
            dataType: 'json',
            data: {
                source: source
            },
            success: function (data) {
                if (data.code == 1) {
                }
                else {
                    tableColumn.mCustomScrollbar("destroy");
                    tableColumn.empty();
                    $('#table thead').empty();
                    columnArr = [];
                    data.data.forEach(function (v) {
                        tableColumn.append('<div><input type="radio"   name="cb"  value='+v+' "/><span style="color:#000;" class="'+v+'"> ' +v+'</span></div>');
                        columnArr.push(v);
                        //console.log(columnArr);
                        $('#table thead').append('<th>'+v+'</th>');

                    });

                    tableColumn.mCustomScrollbar();

                    th =  true;

                    if(th && td){
                        var thIndex;
                        $('#table thead th').each(function(k,value){
                            if(value.innerHTML == $('input:radio:checked').val() ){
                                thIndex = $(value).index();
                                return;

                            }
                        })
                        var tds = $('#table tbody tr td:nth-child('+(thIndex+1)+')');
                        tds.each(function(k,v){
                            $(v).html('<input value='+ v.innerHTML +'>');
                        });
                        th = false;
                        td = false;


                    }
                }



            },
            error: function (e) {
                layer.alert("请求失败！");
            }
        });
    }
//选择报表字段
//点击下一步
    var btnNext = $(".btn-next");
    var btnSave = $(".btn-save");
    var body = $("body");
    btnNext.click(function () {
        var perspective = $('#perspective').val();
        //校验用户输入的透视图名称
        if (perspective == '') {
            $('.msg').show().text('不能为空');
            return false;
        }
        var reg1 = /^\S*$/;
        if (!reg1.test(perspective)) {
            $('.msg').show().text('不能包含空格');
            return;
        }
        source = $("#switchSource .con:last-child :selected").val();

        //特殊字符的校验
        var regular = /^[\u4e00-\u9fa5a-zA-Z0-9\_]*$/;  //只含有汉字、数字、字母下划线
        if (!regular.test(perspective)) {
            $('.error').show();
            return false;
        }
        if(!cookieData) repeatName(perspective);
        else {

            selectData.hide();
            createPerspective.show();
            getSourceColumn();

        }
        $(".activeStep").removeClass("activeStep").siblings().addClass("activeStep");
    });


    //    点击上一步
    btnPrev.click(function () {
        $(".activeStep").removeClass("activeStep").siblings().addClass("activeStep");
        selectData.show();
        createPerspective.hide();
    });





//保存清洗规则
function dataCleanTest(){
    var rangeArr = [$('#min').val(),$('#max').val()];
    var rangeStr = rangeArr.join(",");
    var normal = $('#normal').val();
    var repeat = $('#repeatfill').val();
    //空值
    var data1  = {
        "content":$('.fill').val()
    };
    //异常值
    var data2 = {
        "content": $('#columType').val(),
        "range":rangeStr
    };
    var data3  = {
        "content": $('#columType').val(),
        "range":$('.wenzibox .fill').val()
    };
    //重复值
    var data4  = {
        "content": $('#repeaColum').val(),
        "content":repeat
    };

    //空值
    if ($('#cleanType').val() == "nulldispose") {

        dataObj2 = {
            "name": $('#perspective').val(),
            "source": source,
            "field":$('input:radio:checked').val(),
            "ruleType":0,
            "rule":JSON.stringify(data1)
        };
    }
    //异常值
    if ($('#cleanType').val() == "errordispose" && $('#columType').val() == "digital") {

        dataObj2 = {
            "name": $('#perspective').val(),
            "source": source,
            "field":$('input:radio:checked').val(),
            "ruleType":1,
            "rule":JSON.stringify(data2)
        };
    }
    if ($('#cleanType').val() == "errordispose" && $('#columType').val() == "text") {

        dataObj2 = {
            "name": $('#perspective').val(),
            "source": source,
            "field":$('input:radio:checked').val(),
            "ruleType":1,
            "rule":JSON.stringify(data3)
        };
    }
    //重复值
    if ($('#cleanType').val() == "repeat" ) {

        dataObj2 = {
            "name": $('#perspective').val(),
            "source": source,
            "field":$('input:radio:checked').val(),
            "ruleType":2,
            "rule":JSON.stringify(data4)
        };
    }
}
//更新
    var btnUpdate = $('.btn-update');
    var th = false;
    var td = false;
    btnUpdate.click(function(){
        dataCleanTest()
        $.ajax({
            type: 'post',
            url: '/iwherelink/dataClean/test.do',
            dataType: 'json',
            traditional: true,
            data: dataObj2,
            success: function (data) {
                if (data.code == 0) {

                    //tableColumn.mCustomScrollbar("destroy");
                    for(var k= 0,str='';k<data.data.length;k++) {
                        str += '<tr>';
                        for (var i = 0; i < columnArr.length; i++) {
                            str += '<td>' + data.data[k][columnArr[i]] + '</td>';
                        }
                        str += '</tr>';

                    }
                    td = true;
                    $('#table tbody').html(str);
                    //if(th && td){
                    //    var thIndex;
                    //    $('#table thead th').each(function(k,value){
                    //        if(value.innerHTML == $('input:radio:checked').val() ){
                    //            thIndex = $(value).index();
                    //            return;
                    //
                    //        }
                    //    });
                    //    var tds = $('#table tbody tr td:nth-child('+(thIndex+1)+')');
                    //    tds.each(function(k,v){
                    //        $(v).html('<input class="m-wrap" value='+ v.innerHTML +'><button class="submit">√</button>');
                    //    });
                    //    th = false;
                    //    td = false;
                    //
                    //}

                } else {
                    layer.msg(data.message, {time: 2000});
                }

            },
            error: function (e) {
                layer.alert("请求失败！");
            }
        });

    });
    //修改单个并提交
    $('#table tbody').on('click','.submit',function(){
        var inputValue = $(this).parent('td').find('input').val();
        $(this).parent('td').html(inputValue);
        $.ajax({
            type:'post',
            url:'/iwherelink/dataClean/update.do',
            dataType:'json'


        })
    });
    btnSave.click(function (){
        //cleangui();
        //修改
        if (cookieData) {

            dataObj2.id = parseInt(cookieData.id);
            $.ajax({
                type: 'post',
                url: '/iwherelink/dataClean/update.do',
                dataType: 'json',
                traditional: true,
                data: dataObj2,
                success: function (data) {
                    if (data.code == 0) {
                        layer.msg("修改成功！", {time: 2000});
                        setTimeout(function () {
                            window.location.href = "/dataCleanManager.do";
                        }, 2000);
                    } else {
                        layer.msg(data.message, {time: 2000});
                    }

                },
                error: function (e) {
                    layer.alert("请求失败！");
                }
            });
        }
        //新增
        else{
            dataCleanTest()
            $.ajax({
                type: 'post',
                url: '/iwherelink/dataClean/add.do',
                dataType: 'json',
                traditional: true,
                data: dataObj2,
                success: function (data) {
                    if (data.code == 0) {
                        layer.msg("保存成功！", {time: 2000});
                        setTimeout(function () {
                            window.location.href = "/dataCleanManager.do";
                        }, 2000);
                    } else {
                        layer.msg(data.message, {time: 2000});
                    }

                },
                error: function (e) {
                    layer.alert("请求失败！");

                }
            });
        }


    })

});
