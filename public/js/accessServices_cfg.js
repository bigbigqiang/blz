/**
 * Created by Administrator on 2016/7/21.
 */
$(function () {
    //初始化侧边栏的点击事件
    $('.sub-menu a[href="./acsServices_cfg"]').addClass('current_page').parents('.third-level').show().parent().addClass('open');
    //初始化分页
    var M_box = $('.M-box');
    var totalpage = parseInt(M_box.attr("totalpage"));
    var page = parseInt(M_box.attr("page"));
    var modelState = 0;
    var orderState = '';

    var allWStype = $.cookie('allWStype');
    M_box.pagination({
        pageCount: totalpage,
        current: page,
        coping: true,
        callback: function (index) {
            if (orderState == '') {
                orderState = $('.table th').eq(2).attr('cond');
            }
            getServiceInfoPage(index, orderState, modelState);
        }
    });
    var errorTipMsg = $('.error-tipMsg');

    monitorWS();
    //监控服务链接状态
    function monitorWS() {
        var ids = [];
        var activeNum = 0;
        var missNum = 0;
        $('.serviceType tbody tr').each(function () {
            ids.push($(this).find('td:last').html());
        });
        $.ajax({
            type: "post",
            url: "/iwherelink/webservice/moniter.do",
            data: {
                "ids": ids
            },
            dataType: "json",
            traditional: true,
            success: function (data) {
                for (var i = 0; i < data.data.length; i++) {

                    if (data.data[i].code == 0) {
                        $('.serviceType tbody tr').each(function () {
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
    var tableTrs = $('.serviceType tbody tr');
    //if('WebSocket' in window){
    //    websocket=new WebSocket("ws://"+path+"moniter?TOKEN="+token);
    //}else if('MozWebSocket' in window){
    //    websocket=new MozWebSocket("ws://"+path+"moniter?TOKEN="+token);
    //}else{
    //websocket=new SockJS("http://"+path+"database/moniter?TOKEN=");
    websocket = new SockJS("/websocket/moniter/sockjs?TOKEN=ws");
    //}
    //
    websocket.onopen = function (event) {
    };
    websocket.onmessage = function (event) {
        var data = JSON.parse(event.data);
        if (data.data.code) {
            for (var i = 0; i < tableTrs.length; i++) {
                var curTr = tableTrs.eq(i);
                var curId = curTr.find('td').eq(0).find('input').val();
                if (curId == data.data.id) {
                    if (data.data.code == "0") {
                        curTr.find("td").eq(1).find('span').css("background", "green");
                    }
                    else {
                        curTr.find("td").eq(1).find('span').css("background", "red");
                    }
                }
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

    //点击排序按钮，排序
    $(".serviceType").find("i").click(function () {
        var page = $(".M-box").attr("page");
        if ($(this).is(".icon-chevron-up")) {
            //变成降序 DESC
            modelState = 1;
            $(".serviceType").find("i").removeClass("icon-chevron-down").addClass("icon-chevron-up");
            $(this).removeClass("icon-chevron-up").addClass("icon-chevron-down");
        } else {//变成升序 ASC
            modelState = 0;
            $(".serviceType").find("i").removeClass("icon-chevron-down").addClass("icon-chevron-up");
        }
        orderState = $(this).parents("th").attr("cond");
        $(".serviceType").find("tbody").empty();
        getServiceInfoPage(page, orderState, modelState);
    });

    //点击排序，发送请求，并给分页添加事件
    function getServiceInfoPage(page, order, model) {
        $.post('/iwherelink/getServiceList.do',
            {
                page: page,
                order: order,
                mode: model
            },
            function (data) {
                if (data.code == 0) {
                    if (data.data.page > 0) {
                        var tr = showServiceInfoPage(data.data.data);
                        $(".serviceType").find("tbody").append(tr);
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
                                    getServiceInfoPage(index, orderState, modelState);
                                }
                            }
                        );
                        monitorWS();
                    } else {
                        $(".serviceType").find("tbody").empty();
                        $(".serviceType").find("tbody").append("<tr><td colspan='10' class='text-center'>暂无数据</td></tr>");
                    }
                }
                else {
                    layer.msg(data.message);
                }

            }, 'json')
    }

    //动态生成表格数据
    function showServiceInfoPage(value) {
        $(".serviceType").find("tbody").empty();
        var tr = "";
        var allWStypeObj = JSON.parse(allWStype.substring(2));
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
            for (var j = 0; j < allWStypeObj.data.length; j++) {
                var currentWStype = allWStypeObj.data[j];
                if (currentData.type == currentWStype.id) {
                    currentData.typeName = currentWStype.name;
                }
            }
            tr += "<tr>";
            //var td = '<td class="text-center">' + data.databaseType + '<input type="hidden" id='+ data.id +' name="databaseTypeId" value=' + data.id +' /></td>';
            var td = '<td class="text-center"><input type="checkbox" value=' + data.id + ' /></td>';
            td += "<td class='text-center linkStatus' data-message='" + data.message + "'>" + span + "</td>";
            td += "<td class='text-center' value='" + data.type + "'>" + data.typeName + "</td>";
            td += "<td class='text-center'>" + data.name + "</td>";
            td += "<td class='text-center'>" + data.url + "</td>";
            td += "<td class='text-center'>" + data.requestType + "</td>";
            td += "<td class='text-center'>" + data.requestData + "</td>";
            td += "<td class='text-center'><a class='edit' href='javascript:;' >编辑</a></td>";
            td += "<td class='text-center'><a class='delete'  href='javascript:;'>删除</a></td>";
            td += "<td class='text-center'><a class='connectionCheck'  href='javascript:;'>测试连接</a></td>";
            td += "<td class='text-center' style='display: none'>" + data.id + "</td>";
            tr += td;
            tr += "</tr>";
        });
        return tr;
    }

    //保存服务配置
    function add_access_ws() {
        // 添加数据源
        var seviceTypeId = $("#serviceSource").find("option:selected").val();
        var serviceName = $("#serviceName").val().trim();
        var serviceURL = $("#serviceURL").val().trim();
        var requestType = $("#requestType").val().trim();
        var requestData = $("#requestData").val().trim();
        var accesskey = $("#accesskey").val().trim();
        var reg1 = /^\S*$/;
        var reg = /^([fF][tT][pP]:\/\/|[hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)([A-Za-z0-9:_.#?%=&\/]+)$/;
        var reg2 = /^[\u4e00-\u9fa5a-zA-Z0-9\_]*$/;  //只含有汉字、数字、字母下划线
        if (typeof (seviceTypeId) == 'undefined' || seviceTypeId == '' || seviceTypeId == null || '0' == seviceTypeId) {
            $("#serviceSource").next().next().show();
            return;
        }
        if (typeof (serviceName) == 'undefined' || serviceName == '' || serviceName == null) {
            $("#serviceName").next().next().text("不能为空").show();
            return;
        }
        if (!reg1.test(serviceName)) {
            $("#serviceName").next().next().show().text('不能包含空格');
            return;
        }
        if (!reg2.test(serviceName)) {
            $("#serviceName").next().next().text("不能包含特殊字符").show();
            return;
        }
        if (typeof (serviceURL) == 'undefined' || serviceURL == '' || serviceURL == null) {
            $("#serviceURL").next().next().text("不能为空").show();
            return;
        }
        if (!reg.test(serviceURL)) {
            $("#serviceURL").next().next().text("请输入正确的url").show();
            return;
        }
        if (typeof (requestType) == 'undefined' || requestType == '' || requestType == null) {
            $("#requestType").next().next().show();
            return;
        }
        if (!reg2.test(requestType)) {
            $("#requestType").next().next().text("不能包含特殊字符").show();
            return;
        }
        $.ajax({
            type: "post",
            url: "/iwherelink/addService.do",
            data: {
                url: serviceURL,
                name: serviceName,
                type: seviceTypeId,
                requestType: requestType,
                requestData: requestData,
                accesskey: accesskey

            },
            dataType: 'json',
            success: function (data) {
                if (data.code == 0) {
                    var totalPage = $(".M-box ").attr("totalPage");
                    var totalNum = $(".M-box").attr('totalNum');

                    layerHide();
                    layer.msg('添加成功!', {time: 2000});

                    getServiceInfoPage(Number(totalPage), "", 0);
                    staticsData();

                }
                else {
                    errorTipMsg.show();
                    errorTipMsg.text(data.message);

                }
            },
            error: function () {
                errorTipMsg.text("添加失败");
                errorTipMsg.show();
                return;
            }
        });

    }

    //点击添加数据库弹窗里的"保存"按钮
    $('.add-new').find('#save').click(add_access_ws);
    //选择数据库类型与链接地址联动
    $("#serviceSource").change(function () {
        $("#serviceURL").val($(this).find("option:selected").attr("url"));
    });
    //编辑
    var viewIds = [];
    var dictIds = [];

    function getUpdateWSInfo(obj) {
        var wsId = [obj];

        var tr = '';
        $.ajax({
            type: 'post',
            url: '/iwherelink/checkServiceViewDictRelate.do',
            data: {
                ids: wsId
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
                        $(".change-message").show().find('p>span').hide();;
                        $(".tablebg-grey").show();
                        viewIds = [];
                        dictIds = [];
                        $.ajax({
                            type: "post",
                            url: "/iwherelink/getServiceById.do",
                            data: {
                                ids: wsId
                            },
                            dataType: 'json',
                            traditional: true,
                            success: function (data) {
                                if (data.code == 0) {
                                    //获取数据进行赋值操作
                                    $("#updateViewIds").val(viewIds.join("-"));
                                    $("#updatedicIds").val(dictIds.join("-"));
                                    $("#fillwsInfoForm #updateseviceType").find("option[value='" + data.data[0].type + "']").prop("selected", true);
                                    $("#fillwsInfoForm #updateserviceName").val(data.data[0].name);
                                    $("#fillwsInfoForm #updateserviceURL").val(data.data[0].url);
                                    $("#fillwsInfoForm #updaterequestType").val(data.data[0].requestType);
                                    $("#fillwsInfoForm #updaterequestData").val(data.data[0].requestData);
                                    $("#fillwsInfoForm #updateaccesskey").val(data.data[0].accesskey);
                                    $("#fillwsInfoForm #updateserviceid").val(data.data[0].id);
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
                        //for (var i = 0; i <  data.data.length; i++) {
                        //    viewIds.push(data.data[i].id);
                        //    tr += '<tr><td>' + data.data[i].id + '</td><td>' + data.data[i].name + '</td><td>' + data.data[i].status + '</td></tr>';
                        //}
                        var html = '<p>有' + data.data.viewIds.length + '个视图' + data.data.dictIds.length + '个字典相关联，修改后它们将不可用，是否继续？</p>';

                        layer.open({
                            title: '确认修改',
                            content: html,
                            area: ['500px', '300px'],
                            btn: ['确认', '取消'],
                            yes: function (index) {
                                layer.close(index);
                                $(".change-message").show();
                                $(".tablebg-grey").show();
                                $.ajax({
                                    type: "post",
                                    url: "/iwherelink/getServiceById.do",
                                    data: {
                                        ids: wsId
                                    },
                                    dataType: 'json',
                                    traditional: true,
                                    success: function (data) {
                                        if (data.code == 0) {
                                            //获取数据进行赋值操作
                                            //$("#updateViewIds").val(viewIds.join("-"));
                                            $("#updateserviceid").val(wsId[0]);
                                            //$("#updatedicIds").val(dictIds.join("-"));
                                            $("#fillwsInfoForm #updateseviceType").find("option[value='" + data.data[0].type + "']").prop("selected", true);
                                            $("#fillwsInfoForm #updateserviceName").val(data.data[0].name);
                                            $("#fillwsInfoForm #updateserviceURL").val(data.data[0].url);
                                            $("#fillwsInfoForm #updaterequestType").val(data.data[0].requestType);
                                            $("#fillwsInfoForm #updaterequestData").val(data.data[0].requestData);
                                            $("#fillwsInfoForm #updateaccesskey").val(data.data[0].accesskey);
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

    $('.change-message .input-text input').focus(function () {
        $('.msg').hide();
    });
    $('.serviceType tbody').on('click', '.edit', function () {
        $('.msg').hide();
        var id = $(this).parents('td').siblings().last().text();
        getUpdateWSInfo(id);
    });
    $('#update_save').click(update_access_ws);
    //编辑后保存
    function update_access_ws() {
        console.log(1111);
        var typeId = $("#updateseviceType").find("option:selected").val();
        var name = $("#updateserviceName").val().trim();
        var wsUrl = $("#updateserviceURL").val().trim();
        var requestType = $("#updaterequestType").find("option:selected").val();
        var requestData = $("#updaterequestData").val().trim();
        var accesskey = $("#updateaccesskey").val().trim();
        var id = $("#updateserviceid").val();
        var reg = /^([fF][tT][pP]:\/\/|[hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)([A-Za-z0-9:_.#?%=&\/]+)$/;
        var reg1 = /^\S*$/;
        var reg2 = /^[\u4e00-\u9fa5a-zA-Z0-9\_]*$/;  //只含有汉字、数字、字母下划线
        //var viewIds = $("#updateViewIds").val();
        //var dictIds = $("#updatedicIds").val();
        //console.log(viewIds.length);
        //console.log(dictIds.length);
        if (typeof (typeId) == 'undefined' || typeId == '' || typeId == null || typeId == "0") {
            $("#updateseviceType").next().next().show();
            return;
        }
        if (typeof (name) == 'undefined' || name == '' || name == null) {
            $("#updateserviceName").next().show().text('不能为空');
            return;
        }
        if (!reg1.test(name)) {
            $("#updateserviceName").next().show().text('不能包含空格');
            return;
        }
        if (!reg2.test(name)) {
            $("#updateserviceName").next().text("不能包含特殊字符").show();
            return;
        }
        if (typeof (wsUrl) == 'undefined' || wsUrl == '' || wsUrl == null || wsUrl == "0") {
            $("#updateserviceURL").next().show();
            return;
        }
        if (!reg.test(wsUrl)) {
            $("#updateserviceURL").next().text("url格式不对").show();
            return;
        }
        if (typeof (requestType) == 'undefined' || requestType == '' || requestType == null) {
            $("#updaterequestType").next().show();
            return;
        }
        $.ajax({
            type: "post",
            url: "/iwherelink/updateServiceById.do",
            data: {
                id: Number(id),
                name: name,
                url: wsUrl,
                type: Number(typeId),
                requestType: requestType,
                requestData: requestData,
                accesskey: accesskey,
                "viewIds": viewIds,
                "dictIds": dictIds

            },
            traditional: true,
            dataType: 'json',
            success: function (data) {
                console.log(data);
                if (data.code == 0) {

                    var page = $(".M-box .active").text();
                    layerHide();
                    layer.msg("编辑成功!", {time: 2000});
                    getServiceInfoPage(Number(page), "", 0);
                } else {
                    errorTipMsg.show();
                    errorTipMsg.text(data.message);
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

    //删除
    $('.table').on('click', '.delete', function () {
        var id = $(this).parents('td').siblings().last().text();
        layer.alert("确定删除？", function (index) {
            layer.close(index);
            deletewsInfo([id]);
        });
    });
    //统计总数量
    function staticsData() {
        $.ajax({
            type: "get",
            url: "/iwherelink/webservice/statistics/all.do",
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

    function deletewsInfo(ids) {
        var wsId = ids;
        var viewIds = [];
        var dictIds = [];
        var tr = '';
        var len = ids.length;
        $.ajax({
            type: 'post',
            url: '/iwherelink/checkServiceViewDictRelate.do',
            data: {
                ids: wsId
            },
            traditional: true,
            dataType: 'json',
            success: function (data) {
                console.log(data.data);
                for (var i = 0; i < data.data.viewIds.length; i++) {
                    viewIds.push(data.data.viewIds[i]);
                }
                for (var j = 0; j < data.data.dictIds.length; j++) {
                    dictIds.push(data.data.dictIds[j]);
                }
                if (data.code == 0) {
                    if (data.data.viewIds.length == 0 && data.data.dictIds.length == 0) {
                        $.ajax({
                            type: "post",
                            url: "/iwherelink/deleteServiceById.do",
                            data: {
                                "ids": wsId,
                                viewIds: viewIds,
                                dictIds: dictIds
                            },
                            traditional: true,
                            dataType: 'json',
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
                                        getServiceInfoPage(nowPage, orderState, modelState);
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
                    else {
                        //for (var i = 0; i < data.data.viewIds.length; i++) {
                        //    viewIds.push(data.data.viewIds[i]);
                        //    tr += '<tr><td>视图id</td><td>' + data.data.viewIds[i] +  '</td></tr>';
                        //}
                        //for (var j = 0; j < data.data.dictIds.length; j++) {
                        //    dictIds.push(data.data.dictIds[i]);
                        //    tr += '<tr><td>字典id</td><td>' + data.data.dictIds[j] +  '</td></tr>';
                        //}
                        var html = '<p>有' + data.data.viewIds.length + '个视图' + data.data.dictIds.length + '个字典相关联，删除后它们将不可用，是否继续？</p>';
                        layer.open({
                            title: '确认删除',
                            content: html,
                            area: ['500px', '340px'],
                            btn: ['确认', '取消'],
                            yes: function (index) {
                                $.ajax({
                                    type: "post",
                                    url: "/iwherelink/deleteServiceById.do",
                                    data: {
                                        "ids": wsId,
                                        "viewIds": viewIds,
                                        "dictIds": dictIds
                                    },
                                    traditional: true,
                                    dataType: 'json',
                                    success: function (data) {
                                        if (data.code == 0) {
                                            var page = $(".M-box .active").text();
                                            layer.msg("删除成功!", {time: 2000});
                                            getServiceInfoPage(Number(page), "", 0);
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

    //批量删除
    $('#batch_del').click(function () {
        var allCheckBox = $("tbody").find("input[type='checkbox']");
        var checkedIds = [];
        var wsIds = [];
        for (var i = 0; i < allCheckBox.length; i++) {
            if (allCheckBox.eq(i).prop("checked") == true) {
                checkedIds.push(allCheckBox.eq(i).val());
            }
        }
        for (var j = 0; j < checkedIds.length; j++) {
            wsIds[j] = checkedIds[j];
        }
        if (checkedIds.length == 0) {
            layer.msg("请先选择要删除的数据");
            return;
        }
        layer.alert("确定删除？", function (index) {
            layer.close(index);
            deletewsInfo(wsIds);
        });


    });
    //选择服务种类筛选
    $("#selectWSType").change(function () {
        var condition = $(".serviceType").find("th").eq(2).attr("cond");
        $(".serviceType").find("tbody").empty();
        getServiceInfoPage(1, condition, 0);
    });
    //检查数据库连接状态
    function connectionCheck(obj) {
        var serviceinfoid = $(obj).closest("tr").find("td:last").html();
        $.ajax({
            type: "get",
            url: "/iwherelink/webservice/test.do",
            dataType: "json",
            data: {
                "id": serviceinfoid
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

    $('.serviceType').on('click', '.connectionCheck', function () {
        connectionCheck(this);
    });
});