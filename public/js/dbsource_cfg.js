/**
 * Created by Administrator on 2016/7/20.
 */
$(function () {
    //初始化侧边栏的点击事件
    $('.sub-menu a[href="./getAllDatabasePage.do"]').addClass('current_page').parents('.third-level').show().parent().addClass('open');
    var M_box = $('.M-box');
    var totalpage = parseInt(M_box.attr("totalpage"));
    var page = parseInt(M_box.attr("page"));
    var modelState = 0;
    var orderState;
    var allDBtype = $.cookie('allDBtype');
    M_box.pagination({
        pageCount: totalpage,
        current: page,
        coping: true,
        callback: function (index) {
            console.log(orderState);
            if (orderState == '') {
                orderState = $('.table th').eq(2).attr('cond');
            }
            console.log(orderState);
            getDatabaseInfoPage(index, orderState, modelState);
        }
    });
    var errorTipMsg = $('.error-tipMsg');
    monitorDB();
    //更新状态
    function monitorDB() {
        var ids = [];
        var activeNum = 0;
        var missNum = 0;
        $('.databaseInfo tbody tr').each(function () {
            ids.push($(this).find('td:last').html());
        });
        $.ajax({
            type: "post",
            url: "/iwherelink/database/moniter.do",
            data: {
                "ids": ids
            },
            dataType: "json",
            traditional: true,
            success: function (data) {
                for (var i = 0; i < data.data.length; i++) {
                    if (data.data[i].code == 0) {
                        activeNum += 1;
                        $('.databaseInfo tbody tr').each(function () {
                            if ($(this).find('td:last').html() == data.data[i].id) {
                                $(this).find("td:nth-child(2)").find('span').css("background", "green");
                            }
                        });
                    } else {
                        missNum += 1;
                    }
                }
                $('.activeList span').val(activeNum);
                $('.missList span').val(missNum);
            },
            error: function () {
                alert("请求失败！")
            }
        });

    }

    //实时监控
    var websocket;
    var tableTrs = $('.databaseInfo tbody tr');
    //if('WebSocket' in window){
    //    websocket=new WebSocket("ws://"+path+"moniter?TOKEN="+token);
    //}else if('MozWebSocket' in window){
    //    websocket=new MozWebSocket("ws://"+path+"moniter?TOKEN="+token);
    //}else{
    //websocket=new SockJS("http://"+path+"database/moniter?TOKEN=");
    websocket = new SockJS("/websocket/moniter/sockjs?TOKEN=db");
    //}
    //
    websocket.onopen = function (event) {
        console.log("onopen:");
    };
    websocket.onmessage = function (event) {
        var data = JSON.parse(event.data);
        console.log(data);
        if (data.data.code) {
            var curTd = $('.databaseInfo').find('td input[value="' + data.data.id + '"]');
            if (data.data.code == "0") {
                curTd.parent().next().find('span').css("background", "green");
            }
            else {
                curTd.parent().next().find('span').css("background", "red");
            }
        }
    };

    websocket.onerror = function (event) {
        console.log("onerror:");
        console.log(event);
    };

    websocket.onclose = function (event) {
        console.log("onclose:");
    };
    //统计总数量
    function staticsData() {
        $.ajax({
            type: "get",
            url: "/iwherelink/database/statistics/all.do",
            //url: "/testData/changeWsStatusById.json",
            dataType: "json",
            success: function (data) {
                if (data.code == 0) {
                    var text = '';
                    for (var i = 0; i < data.data.length; i++) {
                        text += '<p class="statistics">' + data.data[i].name + '<span>' + data.data[i].count + '</span></p>';
                    }
                    $('.statusNum').empty().html(text);

                }
                else {
                    layer.alert(data.message);
                }
            },
            error: function () {
                alert("请求失败！")
            }
        });
    }

    //点击排序按钮，排序
    $(".databaseInfo").find("i").click(function () {
        var page = $(".M-box .active").text();
        if ($(this).is(".icon-chevron-up")) {
            //变成降序 DESC
            modelState = 1;
            $(".databaseInfo").find("i").removeClass("icon-chevron-down").addClass("icon-chevron-up");
            $(this).removeClass("icon-chevron-up").addClass("icon-chevron-down");
        } else {//变成升序 ASC
            modelState = 0;
            $(".databaseInfo").find("i").removeClass("icon-chevron-down").addClass("icon-chevron-up");
            $(this).removeClass("icon-chevron-down").addClass("icon-chevron-up");
        }
        orderState = $(this).parents("th").attr("cond");

        $(".databaseInfo").find("tbody").empty();
        getDatabaseInfoPage(Number(page), orderState, modelState);
    });
    //排序
    function getDatabaseInfoPage(page, order, mode) {
        $.post('/iwherelink/getDatabaseList.do',
            {
                page: page,
                order: order,
                mode: mode
            },
            function (data) {
                if (data.code == 0) {
                    if (data.data.page > 0) {
                        var tr = showDatabaseInfoPage(data.data.data);
                        $(".databaseInfo").find("tbody").append(tr);
                        //showPagination(data.data.page);
                        $('.M-box').attr({"totalnum": data.data.totalNum});
                        $(".listNum span").text(data.data.totalNum);
                        $(".missList  span").text(data.data.totalNum);
                        M_box.pagination({
                                pageCount: data.data.totalPage,
                                current: data.data.page,
                                coping: true,
                                callback: function (index) {
                                    if (orderState == '') {
                                        orderState = $('.table th').eq(2).attr('cond');
                                    }
                                    getDatabaseInfoPage(index, orderState, modelState);
                                }
                            }
                        );
                        monitorDB();
                    } else {
                        $(".databaseInfo").find("tbody").empty();
                        $(".databaseInfo").find("tbody").append("<tr><td colspan='10' class='text-center'>暂无数据</td></tr>");
                    }
                }
                else {
                    layer.msg(data.message);
                }

            }, 'json')
    }

    //动态生成表格数据
    function showDatabaseInfoPage(value) {
        $(".databaseInfo").find("tbody").empty();
        var tr = "";
        var allDBtypeObj = JSON.parse(allDBtype.substring(2));
        $.each(value, function (n, data) {
            var span = '';
            if (data.status == 0) {
                span = '<span style="background:green;"></span>';
            }
            else {
                span = '<span style="background:red;"></span>';
            }
            //设置type 与 typeName一一对应
            var currentData = data;
            for (var j = 0; j < allDBtypeObj.data.length; j++) {
                var currentDBtype = allDBtypeObj.data[j];
                if (currentData.type == currentDBtype.id) {
                    currentData.typeName = currentDBtype.name;
                }
            }
            tr += "<tr>";
            var td = '<td class="text-center"><input type="checkbox" value=' + data.id + ' /></td>';
            td += "<td class='text-center linkStatus' data-message='" + data.message + "'>" + span + "</td>";
            td += "<td class='text-center'>" + data.typeName + "</td>";
            td += "<td class='text-center' value='" + data.type + "'>" + data.database + "</td>";
            td += "<td class='text-center'>" + data.url + "</td>";
            td += "<td class='text-center'>" + data.userName + "</td>";
            td += "<td class='text-center'>" + data.version + "</td>";
            td += "<td class='text-center'><a class='edit' href='javascript:;' >编辑</a></td>";
            td += "<td class='text-center'><a class='delete'  href='javascript:;'>删除</a></td>";
            td += "<td class='text-center'><a class='connectionCheck'  href='javascript:;'>测试连接</a></td>";
            td += "<td class='text-center' style='display: none'>" + data.id + "</td>";
            tr += td;
            tr += "</tr>";
        });
        return tr;
    }

    //选择数据库种类筛选
    $(".database-type").change(function () {
        var condition = $(".databaseInfo").find("th").eq(2).attr("cond");
        console.log(condition);

        $(".databaseInfo").find("tbody").empty();
        getDatabaseInfoPage(1, condition, 0);
    });


    //添加数据源信息
    function addDatabaseInfo() {
        var databaseTypeId = $("#databaseSource").find("option:selected").val();
        var databaseName = $("#databaseName").val().trim();
        var databaseURL = $("#databaseURL").val().trim();
        var databasePort = $("#port").val().trim();
        var databaseUsername = $("#databaseUsername").val().trim();
        var databaseSpace = $("#dbtableSpace").val().trim();
        var databasePassword = $("#databasePassword").val().trim();
        var reg = /^((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)$/; //ip地址
        var reg1 = /^\S*$/;
        var reg2 = /^[\u4e00-\u9fa5a-zA-Z0-9\_]*$/;  //只含有汉字、数字、字母下划线
        //var reg3 = /[^\w]+[^\u4e00-\u9fa5]/;  //特殊字符不包含中划线和下划线
        var reg3 = /^[\u4e00-\u9fa5a-zA-Z0-9]*$/;  //只含有汉字、数字、字母
        if (typeof (databaseTypeId) == 'undefined' || databaseTypeId == '' || databaseTypeId == null || '0' == databaseTypeId) {
            $("#databaseSource").next().next().show();
            return;
        }
        if (typeof (databaseName) == 'undefined' || databaseName == '' || databaseName == null) {
            $("#databaseName").next().next().text("不能为空").show();
            return;
        }
        if (!reg1.test(databaseName)) {
            $("#databaseName").next().next().show().text('不能包含空格').show();
            return;
        }

        if (!reg2.test(databaseName)) {
            $("#databaseName").next().next().text("不能包含特殊字符").show();
            return;
        }
        if (typeof (databaseURL) == 'undefined' || databaseURL == '' || databaseURL == null || databaseURL == "0") {
            $("#databaseURL").next().next().text("不能为空").show();
            return;
        }
        if (databaseURL !== 'localhost' && !reg.test(databaseURL)) {
            $("#databaseURL").next().next().text("请输入正确的IP").show();
            return;
        }
        if (typeof (databaseUsername) == 'undefined' || databaseUsername == '' || databaseUsername == null) {
            $("#databaseUsername").next().next().text("不能为空").show();
            return;
        }
        if (!reg3.test(databaseUsername)) {
            $("#databaseUsername").next().next().text("不能包含特殊字符").show();
            return;
        }
        $.ajax({
            type: "post",
            url: "/iwherelink/addDatabase.do",
            dataType: 'json',
            data: {
                url: databaseURL,
                port: databasePort,
                tableSpace: databaseSpace,
                database: databaseName,
                type: databaseTypeId,
                userName: databaseUsername,
                password: databasePassword,
                databaseName: databaseName
            },
            success: function (data) {
                if (data.code == 0) {
                    var totalPage = $(".M-box ").attr("totalPage");
                    var totalNum = $(".M-box").attr('totalNum');
                    layerHide();
                    layer.msg('添加成功!', {time: 2000});
                    getDatabaseInfoPage(Number(totalPage), "", 0);
                    staticsData();

                }
                else {
                    errorTipMsg.text(data.message);
                    errorTipMsg.show();
                }
            },
            error: function () {
                errorTipMsg.text("添加失败");
                errorTipMsg.show();
                return;
            }
        });
    }

    $('#save').click(addDatabaseInfo);
    //选择数据库类型与链接地址联动
    $("#databaseSource").change(function () {
        $("#databaseURL").val($(this).find("option:selected").attr("url"));
    });
    //编辑
    var viewIds = [];
    var dictIds = [];

    function getUpdateDatabaseInfo(obj) {
        var databaseId = obj;
        var databaseInfoId = [obj];


        var tr = '';
        $.ajax({
            type: 'post',
            url: '/iwherelink/checkDatabaseViewDictRelate.do',
            data: {
                ids: databaseInfoId
            },
            traditional: true,
            dataType: 'json',
            success: function (data) {
                if (data.code == 0) {
                    for (var i = 0; i < data.data.viewIds.length; i++) {
                        viewIds.push(data.data.viewIds[i]);
                    }
                    for (var j = 0; j < data.data.dictIds.length; j++) {
                        dictIds.push(data.data.dictIds[j]);
                    }
                    if (data.data.viewIds.length == 0 && data.data.dictIds.length == 0) {
                        $(".change-message").show().find('p>span').hide();
                        $(".tablebg-grey").show();
                        $.ajax({
                            type: "post",
                            url: "/iwherelink/getDatabaseById.do",
                            data: {
                                ids: [databaseId]
                            },
                            dataType: 'json',
                            traditional: true,
                            success: function (data) {
                                if (data.code == 0) {
                                    //获取数据进行赋值操作
                                    //$("#updateViewIds").val(viewIds.join("-"));
                                    //$("#updatedicIds").val(dictIds.join("-"));
                                    $("#fillDatabaseInfoForm #updatedatabaseSource").find("option[value='" + data.data[0].type + "']").prop("selected", true);
                                    $("#fillDatabaseInfoForm #updateDatabaseName").val(data.data[0].database);
                                    $("#fillDatabaseInfoForm #updateDatabaseURL").val(data.data[0].url);
                                    $("#fillDatabaseInfoForm #updatePort").val(data.data[0].port);
                                    $("#fillDatabaseInfoForm #updatedbtableSpace").val(data.data[0].tableSpace);
                                    $("#fillDatabaseInfoForm #updateDatabaseUsername").val(data.data[0].userName);
                                    $("#fillDatabaseInfoForm #updateDatabasePassword").val(data.data[0].password);
                                    $("#fillDatabaseInfoForm #updatedatabaseid").val(data.data[0].id);
                                }
                                else {
                                    errorTipMsg.text(data.message);
                                    errorTipMsg.show();
                                    return;
                                }
                            },
                            error: function () {
                                errorTipMsg.text("请求当前数据信息出错");
                                errorTipMsg.show();
                                return;
                            }
                        });
                    }
                    else {
                        //for (var i = 0; i < data.data.length; i++) {
                        //    viewIds.push(data.data[i].id);
                        //    tr += '<tr><td>' + data.data[i].id + '</td><td>' + data.data[i].name + '</td><td>' + data.data[i].status + '</td></tr>';
                        //}
                        var html = '<p>有' + data.data.viewIds.length + '个视图' + data.data.dictIds.length + '个字典相关联，修改后它们将不可用，是否继续？</p>';
                        layer.open({
                            title: '确认修改',
                            content: html,
                            btn: ['确认', '取消'],
                            area: ['500px', '340px'],
                            yes: function (index) {
                                layer.close(index);
                                $(".change-message").show();
                                $(".tablebg-grey").show();
                                $.ajax({
                                    type: "post",
                                    url: "/iwherelink/getDatabaseById.do",
                                    data: {
                                        ids: [databaseId]
                                    },
                                    dataType: 'json',
                                    traditional: true,
                                    success: function (data) {
                                        if (data.code == 0) {
                                            //console.log(viewIds);
                                            //console.log(dictIds);
                                            //获取数据进行赋值操作
                                            //$("#updateViewIds").val(viewIds);
                                            //$("#updatedicIds").val(dictIds);
                                            $("#fillDatabaseInfoForm #updatedatabaseSource").find("option[value='" + data.data[0].type + "']").prop("selected", true);
                                            $("#fillDatabaseInfoForm #updateDatabaseName").val(data.data[0].database);
                                            $("#fillDatabaseInfoForm #updateDatabaseURL").val(data.data[0].url);
                                            $("#fillDatabaseInfoForm #updatePort").val(data.data[0].port);
                                            $("#fillDatabaseInfoForm #updateDatabaseUsername").val(data.data[0].userName);
                                            $("#fillDatabaseInfoForm #updateDatabasePassword").val(data.data[0].password);
                                            $("#fillDatabaseInfoForm #updatedatabaseid").val(data.data[0].id);
                                        }
                                        else {
                                            errorTipMsg.text(data.message);
                                            errorTipMsg.show();
                                            return;
                                        }
                                    },
                                    error: function () {
                                        errorTipMsg.text("请求当前数据信息出错");
                                        errorTipMsg.show();
                                        return;
                                    }
                                });
                            }
                        });
                    }
                }
                else {
                    layer.alert(data.message);
                }
            }
        });

    }

    $('.databaseInfo tbody').on('click', '.edit', function () {
        var id = $(this).parents('td').siblings().last().text();
        getUpdateDatabaseInfo(id);
    });
    //编辑后保存
    function save_updt_dbSource() {
        var dbtype = $("#updatedatabaseSource").find("option:selected").val();
        var databaseName = $("#updateDatabaseName").val().trim();
        var reg = /^((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)$/; //ip地址
        var reg1 = /^\S*$/;
        var reg2 = /^[\u4e00-\u9fa5a-zA-Z0-9\_]*$/;  //只含有汉字、数字、字母下划线
        var reg3 = /^[\u4e00-\u9fa5a-zA-Z0-9]*$/;  //只含有汉字、数字、字母
        var databaseURL = $("#updateDatabaseURL").val().trim();
        var port = $("#updatePort").val().trim();
        var tableSpace = $("#updatedbtableSpace").val().trim();
        var databaseUsername = $("#updateDatabaseUsername").val().trim();
        var databasePassword = $("#updateDatabasePassword").val().trim();
        var updatedatabaseid = $("#updatedatabaseid").val();

        if (typeof (dbtype) == 'undefined' || dbtype == '' || dbtype == null || dbtype == "0") {
            $("#updatedatabaseSource").next().next().show();
            return;
        }
        if (typeof (databaseName) == 'undefined' || databaseName == '' || databaseName == null) {
            $("#updateDatabaseName").next().next().show();
            return;
        }
        if (!reg1.test(databaseName)) {
            $("#updateDatabaseName").next().next().show().text('不能包含空格');
            return;
        }
        if (!reg2.test(databaseName)) {
            $("#updateDatabaseName").next().next().text("不能包含特殊字符").show();
            return;
        }
        if (typeof (databaseURL) == 'undefined' || databaseURL == '' || databaseURL == null || databaseURL == "0") {
            $("#updateDatabaseURL").next().next().text("url不能为空").show();
            return;
        }
        if (databaseURL !== 'localhost' && !reg.test(databaseURL)) {
            $("#updateDatabaseURL").next().next().text("url格式不对").show();
            return;
        }

        if (typeof (databaseUsername) == 'undefined' || databaseUsername == '' || databaseUsername == null) {
            $("#updateDatabaseUsername").next().next().show();
            return;
        }
        if (!reg1.test(databaseUsername)) {
            $("#updateDatabaseUsername").next().next().show().text('不能包含空格');
            return;
        }
        if (!reg3.test(databaseUsername)) {
            $("#updateDatabaseUsername").next().next().text("不能包含特殊字符").show();
            return;
        }

        $.ajax({
            type: "post",
            url: "/iwherelink/updateDatabaseById.do",
            data: {
                id: Number(updatedatabaseid),
                url: databaseURL,
                port: port,
                type: Number(dbtype),
                tableSpace: tableSpace,
                database: databaseName,
                userName: databaseUsername,
                password: databasePassword,
                "viewIds": viewIds,
                "dictIds": dictIds

            },
            dataType: 'json',
            traditional: true,
            success: function (data) {
                if (data.code == 0) {
                    var page = $(".M-box .active").text();
                    layerHide();
                    layer.msg("编辑成功!", {time: 2000});
                    getDatabaseInfoPage(Number(page), "", 0);
                } else {
                    errorTipMsg.text(data.message);
                    errorTipMsg.show();
                    return;
                }
            },
            error: function () {
                errorTipMsg.text("更新失败");
                errorTipMsg.show();
                return;
            }
        });
    }

    $('.save_edit').click(save_updt_dbSource);
    //激活或关闭状态
    function changeStatus(databaseInfoId, obj, status) {
        var id = databaseInfoId;
        $.ajax({
            type: "post",
            url: "/iwherelink/changeStatus.do",
            data: {
                status: status,
                id: id
            },
            success: function (data) {
                if ("SUCCESS" == data) {
                    if (status == "ACTIVE") {
                        var close = '"CLOSE"';
                        $(obj).parent().html("<span class='active' style='color:#cccccc'>已激活</span> | <a class='non_active' href='javascript:;'  style='color:#0D638F' status='CLOSE'>关闭</a>");
                    }
                    if (status == "CLOSE") {
                        var active = '"ACTIVE"';
                        $(obj).parent().html("<a class='non_active' href='javascript:;'  style='color:#0D638F' status='ACTIVE'>激活</a> | <span class='active' style='color:#cccccc'>已关闭</span>");
                    }
                } else if ("FAIL" == data) {
                    alert("修改当前数据信息状态失败,烦请刷新页面后再做操作!");
                    return;
                } else if ("NOTFOUND" == data) {
                    alert("很遗憾地告诉您,修改了不存在的数据,请稍后再做操作!");
                    return;
                } else if ("NOMODIFY" == data) {
                    alert("修改当前数据状态未做任何修改,请重新修改其状态!");
                    return;
                } else if ("RELATION" == data) {
                    alert("很遗憾地告诉您,请先删除绑定的数据库信息相关数据后,再做删除操作!");
                    return;
                } else if ("EXCEPTION" == data) {
                    alert("很遗憾地告诉您,删除操作出现异常,请稍后再做操作!");
                    return;
                }
            },
            error: function () {
                alert("修改当前数据信息状态失败,烦请刷新页面后再做操作!");
                return;
            }
        });
    }


    $('tbody').on('click', '.non_active', function () {
        var databaseInfoId = $(this).parents('td').siblings().eq(0).text();
        var obj = $(this);
        var status = $(this).attr('status');
        changeStatus(databaseInfoId, obj, status);
    });

    //删除时的关联检查
    function deleteDatabaseInfo(ids) {
        var databaseInfoId = ids;
        console.log(ids);
        console.log(typeof (ids));
        var viewIds = [];
        var dictIds = [];
        var tr = '';
        var len = ids.length;
        $.ajax({
            type: 'post',
            url: '/iwherelink/checkDatabaseViewDictRelate.do',
            data: {
                ids: databaseInfoId
            },
            dataType: 'json',
            traditional: true,
            success: function (data) {
                console.log(data.data);
                if (data.code == 0) {
                    for (var i = 0; i < data.data.viewIds.length; i++) {
                        viewIds.push(data.data.viewIds[i]);
                    }
                    for (var j = 0; j < data.data.dictIds.length; j++) {
                        dictIds.push(data.data.dictIds[j]);
                    }
                    if (data.data.viewIds.length == 0 && data.data.dictIds.length == 0) {
                        layer.open({
                            content:'确认删除?',
                            btn: ['确认', '取消'],
                            yes:function(index){
                                $.ajax({
                                    type: "post",
                                    url: "/iwherelink/deleteDatabaseById.do",
                                    data: {
                                        ids: databaseInfoId,
                                        viewIds: viewIds,
                                        dictIds: dictIds
                                    },
                                    dataType: 'json',
                                    traditional: true,
                                    success: function (data) {
                                        if (data.code == 0) {
                                            var totalNum = $(".M-box").attr('totalNum');
                                            var totalPage = $(".M-box").attr('totalPage');
                                            var curPage = $(".M-box").find('.active').text();
                                            var num = Math.ceil((totalNum - len) / 10);
                                            var nowPage;
                                            if (curPage == totalPage) {
                                                if (curPage == num) {
                                                    nowPage = curPage;
                                                }
                                                else {
                                                    nowPage = num;
                                                }
                                            }
                                            else {
                                                nowPage = curPage;
                                            }
                                            layer.msg("删除成功!", {time: 2000});
                                            $('#select_all').attr('checked', false);
                                            setTimeout(function () {
                                                if (orderState == '') {
                                                    orderState = $('.table th').eq(2).attr('cond');
                                                }
                                                getDatabaseInfoPage(nowPage, orderState, modelState);
                                                staticsData();
                                            }, 2000);
                                        } else {
                                            errorTipMsg.text(data.message);
                                            errorTipMsg.show();
                                            return;
                                        }
                                    },
                                    error: function () {
                                        alert("删除失败");
                                        return;
                                    }
                                });
                            }
                        })

                    }
                    else {
                        var html = '<p>有' + data.data.viewIds.length + '个视图' + data.data.dictIds.length + '个字典相关联，删除后它们将不可用，是否继续？</p>';
                        layer.open({
                            title: '确认删除',
                            content: html,
                            area: ['500px', '340px'],
                            btn: ['确认', '取消'],
                            yes: function (index) {
                                layer.close(index);
                                $.ajax({
                                    type: "post",
                                    url: "/iwherelink/deleteDatabaseById.do",
                                    data: {
                                        "ids": databaseInfoId,
                                        "viewIds": viewIds,
                                        "dictIds": dictIds
                                    },
                                    dataType: 'json',
                                    traditional: true,
                                    success: function (data) {
                                        console.log(data);
                                        if (data.code == 0) {
                                            var page = $(".M-box .active").text();
                                            layer.msg("删除成功!", {time: 2000});
                                            getDatabaseInfoPage(Number(page), "", 0);
                                        } else {
                                            layer.alert(data.message, {time: 3000});
                                        }
                                    },
                                    error: function () {
                                        alert("删除失败");
                                    }
                                });
                            }
                        });


                    }
                }
                else {
                    layer.alert(data.message);
                }
            }
        });
    }

    $('.databaseInfo').on('click', '.delete', function () {

        var id = $(this).parents('td').siblings().last().text();
        deleteDatabaseInfo([id]);

    });
    //批量删除
    $('#batch_del').click(function () {


        var allCheckBox = $("tbody").find("input[type='checkbox']");
        var checkedIds = [];
        var databaseTypeIds = [];
        for (var i = 0; i < allCheckBox.length; i++) {
            if (allCheckBox.eq(i).prop("checked") == true) {
                checkedIds.push(allCheckBox.eq(i).val());
            }
        }
        for (var j = 0; j < checkedIds.length; j++) {
            databaseTypeIds[j] = checkedIds[j];
        }
        if (checkedIds.length == 0) {
            layer.msg("请先选择要删除的数据");
            return;
        }
        layer.alert("确定删除？", function (index) {
            layer.close(index);
            deleteDatabaseInfo(databaseTypeIds);
        });
    });
    //检查数据库连接状态
    function connectionCheck(obj) {
        var databaseinfoid = $(obj).closest("tr").find("td:last").html();
        console.log(databaseinfoid);
        $.ajax({
            type: "get",
            url: "/iwherelink/database/test.do",
            dataType: "json",
            data: {
                "id": databaseinfoid
            },
            success: function (data) {
                if (data.code == 0) {
                    layer.msg("连接正常", {time: 2000});
                    $(obj).parents("tr").find("td:nth-child(2)").find('span').css("background", "green");
                }
                else {
                    layer.alert(data.message);
                }
            },
            error: function () {
                alert("请求失败！")
            }
        });
    }

    $('.databaseInfo').on('click', '.connectionCheck', function () {
        connectionCheck(this);
    });


});