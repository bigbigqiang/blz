/**
 * Created by Administrator on 2016/7/20.
 */
$(function () {
    //初始化侧边栏的点击事件
    $('.sub-menu a[href="./serviceManager.do"]').addClass('current_page').parents('.third-level').show().parent().addClass('open');

    var M_box = $('.M-box');
    var totalpage = parseInt(M_box.attr("totalpage"));
    var page = parseInt(M_box.attr("page"));
    var modelState = 0;
    var orderState='';
    M_box.pagination({
        pageCount: totalpage,
        current: page,
        coping: true,
        callback: function (index) {
            if(orderState==''){
                orderState=$('.table th').eq(2).attr('cond');
            }
            getDatabaseInfoPage(index,orderState, modelState);
        }
    });
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
        }
        orderState = $(this).parents("th").attr("cond");

        $(".databaseInfo").find("tbody").empty();
        getDatabaseInfoPage(Number(page), orderState, modelState);
    });
    //排序
    function getDatabaseInfoPage(page, order, mode) {
        $.ajax({
            //url: '/testData/showPublishedServices.json',
            url:'/iwherelink/showPublishedServices.do',
            type: 'get',
            dataType: 'json',
            data: {
                page: page,
                order: order,
                mode: mode
            },
            success: function (data) {
                $(".listNum span").text(data.data.totalNum);
                if (data.code == 0) {
                    console.log(data);
                    if (data.data.totalPage > 0) {
                        var tr = showDatabaseInfoPage(data.data.data);
                        $(".databaseInfo").find("tbody").append(tr);
                        $('.M-box').attr({"totalnum": data.data.totalNum});

                        $(".missList  span").text(data.data.totalNum);
                        M_box.pagination({
                                pageCount: data.data.totalPage,
                                current: data.data.page,
                                coping: true,
                                callback: function (index) {
                                    if(orderState==''){
                                        orderState=$('.table th').eq(2).attr('cond');
                                    }
                                    getDatabaseInfoPage(index, orderState, modelState);
                                }
                            }
                        );
                    } else {
                        $(".databaseInfo").find("tbody").empty();
                        $(".databaseInfo").find("tbody").append("<tr><td colspan='11' class='text-center'>暂无数据</td></tr>");
                    }
                }
                else {
                    layer.msg(data.message);
                }
            },
            error: function () {
                layer.msg('请求表格数据出错', {time: 2000});
            }
        });
    }

    //动态生成表格数据
    function showDatabaseInfoPage(value) {
        $(".databaseInfo").find("tbody").empty();
        var tr = "";
        //var allDBtypeObj = JSON.parse(allDBtype.substring(2));
        $.each(value, function (n, data) {
            var span = '';
            var btns = '';
            if (data.status == 0) {
                span = '<span style="background:green;"></span>';
                btns = "<span class='non_active_status addService' >开启</span>" +
                    "| <a class='active_status removeService' status='0'>停止</a>";
            }
            else {
                span = '<span style="background:red;"></span>';
                btns = "<a class='active_status addService'  status='1'>开启</a>" +
                    "| <span class='non_active_status removeService' >停止</span> ";
            }
            tr += "<tr>";
            var td = '<td class="text-center"><input type="checkbox" value=' + data.serviceId + ' /></td>';
            td += "<td class='text-center linkStatus'>" + span + "</td>";
            td += "<td class='text-center'>" + data.serviceType + "</td>";
            td += "<td class='text-center' value='" + data.serviceName + "'>" + data.serviceName + "</td>";
            td += "<td class='text-center'>" + data.serviceComment + "</td>";
            td += "<td class='text-center'>" + data.permissionName + "</td>";
            td += "<td class='text-center'>" + data.starttime + "</td>";
            td += "<td class='text-center'>" + btns + "</td>";
            td += "<td class='text-center'><a class='delete'  href='javascript:;'>删除</a></td>";
            td += "<td class='text-center'><a class='checkDetails' href='javascript:;' >查看详情</a></td>";
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
        $(".databaseInfo").find("tbody").empty();
        getDatabaseInfoPage(1, condition, 0);
    });

    //删除
    function deleteDatabaseInfo(ids) {
        var databaseInfoId = ids;
        var len=ids.length;
        var tr = '';
        $.ajax({
            //type: "post",
            type: "get",
            url: "/iwherelink/logoutOrBatchDeleteService.do",
            //url: "/testData/delete.json",
            data: {
                ids: databaseInfoId
            },
            dataType: 'json',
            traditional: true,
            success: function (data) {
                if (data.code == 0) {
                    var totalNum = $(".M-box").attr('totalNum');
                    var totalPage = $(".M-box").attr('totalPage');
                    var curPage=$(".M-box").find('.active').text();
                    var num = Math.ceil((totalNum-len) /10);
                    var nowPage;
                    if(curPage==totalPage){
                        if(curPage==num){
                            nowPage=curPage;
                        }
                        else{
                            nowPage=num;
                        }
                    }
                    else{
                        nowPage=curPage;
                    }
                    layerHide();
                    layer.msg("删除成功!", {time: 2000});
                    $('#select_all').attr('checked',false);
                    setTimeout(function(){
                        if(orderState==''){
                            orderState=$('.table th').eq(2).attr('cond');
                        }
                        getDatabaseInfoPage(nowPage,orderState, modelState);
                        staticsData();
                    },2000);

                } else {
                    layer.alert(data.message);
                }
            },
            error: function () {
                alert("删除失败");
                return;
            }
        });
    }
    $('.databaseInfo').on('click', '.delete', function () {
        var id = $(this).parents('td').siblings().eq(0).find('input').val();
        layer.alert("确定删除？", function (index) {
            layer.close(index);
            deleteDatabaseInfo([id]);
        });
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
    //检查连接状态
    function connectionCheck(obj) {
        var databaseinfoid = $(obj).parent().siblings().eq(0).find("input").val();
        //console.log(databaseinfoid);
        $.ajax({
            type: "get",
            url: "/iwherelink/checkServiceConnect.do",
            //url: "/testData/delete.json",
            dataType: "json",
            data: {
                "id": databaseinfoid
            },
            success: function (data) {
                if (data.code == 0) {
                    var html='';
                    if(data.data.length!==0){
                        var tr='';
                        for(var i=0;i<data.data.length;i++){
                            tr+='<tr><td>'+data.data[i]+'</td></tr>';
                        }
                        html='<div><table class="table table-bordered table-hover table-responsive"><thead><th>字段</th></thead><tbody>'+tr+'</tbody></table></div>';
                    }
                    else{
                        html='暂无数据';
                    }
                    layer.open({
                        type: 1,
                        content: html,
                        title: ['测试结果', 'background:#4b8df8;color:white;font-size:16px;'],
                        maxmin: true,
                        area: ['500px', '400px'],
                        btn: ['关闭'],
                        yes: function (index, layerO) {
                            layer.close(index);
                        }
                    });
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
    //开启或停止
    $('.databaseInfo').on('click', '.active_status', function () {
        var curTd = $(this).parent();
        var curObj = $(this);
        var id = curTd.siblings().eq(0).find('input').val();
        var status = curObj.attr('status');
        $.ajax({
            type: "get",
            url: "/iwherelink/updateServiceStatus.do",
            //url: "/testData/changeWsStatusById.json",
            dataType: "json",
            data: {
                "ids": [id],
                status: Number(status)
            },
            traditional:true,
            success: function (data) {
                if (data.code == 0) {
                    if (status == "1") {
                        curTd.siblings().eq(1).find('span').css("background", "green");
                        curTd.empty().html("<span class='non_active_status addService status' >开启</span>" +
                            "| <a class='active_status removeService status' status='0'>停止</a>");
                    }
                    else {
                        curTd.siblings().eq(1).find('span').css("background", "red");
                        curTd.empty().html("<a class='active_status addService status' status='1'>开启</a>" +
                            "| <span class='non_active_status  removeService status'>停止</span>");
                    }
                }
                else {
                    layer.alert(data.message);
                }
            },
            error: function () {
                alert("请求失败！")
            }
        });
    });
    //统计状态
    function staticsData() {
        $.ajax({
            type: "get",
            url: "/iwherelink/service/statistics/all.do",
            //url: "/testData/changeWsStatusById.json",
            dataType: "json",
            success: function (data) {
                if (data.code == 0) {
                    var text = '';
                    for (var i = 0; i < data.data.length; i++) {
                            text += '<p class="statistics">'+data.data[i].name+'<span>' + data.data[i].count + '</span></p>';
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
    //查看详情 checkDetails
    $('.databaseInfo').on('click', '.checkDetails', function () {
        var id = $(this).parent().siblings().eq(0).find('input').val();
        $.ajax({
            type: "get",
            url: "/iwherelink/showServiceDetail.do",
            //url: "/testData/showServiceDetail.json",
            dataType: "json",
            data: {
                id: Number(id)
            },
            success: function (data) {
                if (data.code == 0) {
                    var interfaceName;
                    var reqParamsHtml;
                    var resParamsHtml;
                    var errorParamsHtml;
                    if (data.data.baseInfo.contentType == "视图") {
                        interfaceName = '视图名称：';
                    }
                    else {
                        interfaceName = '字典名称：';
                    }
                    if (data.data.reqParamInfos.length == 0) {
                        reqParamsHtml = "";
                    }
                    else {
                        var tr = '';
                        for (var i = 0; i < data.data.reqParamInfos.length; i++) {
                            var isRequired;
                            if (data.data.reqParamInfos[i].isNecessary == 0) {
                                isRequired = '是';
                            }
                            else {
                                isRequired = '否';
                            }
                            tr += '<tr id="' + data.data.reqParamInfos[i].id + '"><td>' + data.data.reqParamInfos[i].oldName + '</td><td>' + data.data.reqParamInfos[i].newName + '</td><td>' + data.data.reqParamInfos[i].type + '</td><td>' + data.data.reqParamInfos[i].mappingMode + '</td><td>' + isRequired + '</td></tr>';
                        }
                        reqParamsHtml = '<div class="row-fluid">' +
                            '<div class="span11 offset1">' +
                            '<div class="service-head clearfix">' +
                            '<h3 class="pull-left">请求参数</h3>' +
                            '</div>' +
                            '<div class="service-content detailReq" id="service-params-req">' +
                            '<table class="table">' +
                            '<thead>' +
                            '<tr>' +
                            '<th>请求参数名称</th>' +
                            '<th>响应参数名称</th>' +
                            '<th>参数类型</th>' +
                            '<th>映射方式</th>' +
                            '<th>必须</th>' +
                            '</tr>' +
                            '</thead>' +
                            '<tbody>' +
                            tr +
                            '</tbody>' +
                            '</table>' +
                            '</div>' +
                            '</div>' +
                            '</div>';
                    }
                    if (data.data.resParamInfos.length == 0) {
                        resParamsHtml = "";
                    }
                    else {
                        var tr = '';
                        for (var j = 0; j < data.data.resParamInfos.length; j++) {
                            tr += '<tr id="' + data.data.resParamInfos[j].id + '"><td>' + data.data.resParamInfos[j].oldName + '</td><td>' + data.data.resParamInfos[j].newName + '</td><td>' + data.data.resParamInfos[j].type + '</td></tr>';
                        }
                        resParamsHtml = '<div class="row-fluid">' +
                            '<div class="span11 offset1">' +
                            '<div class="service-head clearfix">' +
                            '<h3 class="pull-left">响应参数</h3>' +
                            '</div>' +
                            '<div class="service-content id="service-params-res">' +
                            '<table class="table">' +
                            '<thead>' +
                            '<tr>' +
                            '<th>请求参数名称</th>' +
                            '<th>响应参数名称</th>' +
                            '<th>参数类型</th>' +
                            '</tr>' +
                            '</thead>' +
                            '<tbody>' +
                            tr +
                            '</tbody>' +
                            '</table>' +
                            '</div>' +
                            '</div>' +
                            '</div>';
                    }
                    if (data.data.errorInfos.length == 0) {
                        errorParamsHtml = "";
                    }
                    else {
                        var tr = '';
                        for (var k = 0; k < data.data.errorInfos.length; k++) {
                            tr += '<tr id="' + data.data.errorInfos[k].id + '"><td>' + data.data.errorInfos[k].name + '</td><td>' + data.data.errorInfos[k].error_suggest + '</td><td>' + data.data.errorInfos[k].error_explain + '</td></tr>';
                        }
                        errorParamsHtml = '<div class="row-fluid">' +
                            '<div class="span11 offset1">' +
                            '<div class="service-head clearfix">' +
                            '<h3 class="pull-left">错误代码</h3>' +
                            '</div>' +
                            '<div class="service-content" id="service-params-error">' +
                            '<table class="table">' +
                            '<thead>' +
                            '<tr>' +
                            '<th>错误代码</th>' +
                            '<th>处置建议</th>' +
                            '<th>说明</th>' +
                            '</tr>' +
                            '</thead>' +
                            '<tbody>' +
                            tr +
                            '</table>' +
                            '</div>' +
                            '</div>' +
                            '</div>';
                    }

                    var html = '<div class="row-fluid">' +
                        '<div class="span12">' +
                        '<div class="service-head clearfix">' +
                        '<h3 class="pull-left">服务基本信息</h3>' +
                        '</div>' +
                        '<div class="service-content" id="service-base-info">' +
                        '<div class=" span11 offset1"><p class="span4"><label class="span5">服务类型：</label><span>' + data.data.baseInfo.serviceType + '</span></p>' +
                        '<p class="span4">    <label class="span5">服务名称：</label><span>' + data.data.baseInfo.serviceName + '</span></p>' +
                        '<p class="span4">   <label class="span5">服务内容类型：</label><span>' + data.data.baseInfo.contentType + '</span></p>' +
                        '<p class="span4" style="margin-left: 0"><label class="span5">' + interfaceName + '</label><span>' + data.data.baseInfo.interfaceName + '</span></p>' +
                        '<p class="span4">    <label class="span5">权限：</label><span>' + data.data.baseInfo.permissionName + '</span></p>' +
                        '<p class="span4">    <label class="span5">服务说明：</label><span>' + data.data.baseInfo.comment + '</span></p>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '<div class="row-fluid">' +
                        '<div class="span12">' +
                        '<div class="service-head clearfix">' +
                        '<h3 class="pull-left">服务参数信息</h3>' +
                        '</div>' +
                        '<div class="service-content" id="service-params-info">' +
                        reqParamsHtml +
                        resParamsHtml +
                        errorParamsHtml +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>';

                    layer.open({
                        type: 1,
                        content: html,
                        title: ['服务详情', 'background:#4b8df8;color:white;font-size:16px;'],
                        maxmin: true,
                        area: ['900px', '600px'],
                        btn: ['关闭'],
                        yes: function (index, layerO) {
                            layer.close(index);


                        }
                    });
                    $('.layui-layer-content').mCustomScrollbar({axis:'yx'});
                }
                else {
                    layer.alert(data.message);
                }
            },
            error: function () {
                alert("请求失败！")
            }
        });
    });

});