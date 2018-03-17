$(function () {
    //初始化侧边栏的点击事件
    $('.sub-menu a[href="./dataCleanManager.do"]').addClass('current_page').parents('.third-level').show().parent().addClass('open');
    //初始化分页
    var M_box = $('.M-box');
    var totalpage = parseInt(M_box.attr("totalpage"));
    var page = parseInt(M_box.attr("page"));
    var allView = $.cookie('allView');
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
            getViewInfoPage(index,orderState, modelState);
        }
    });
    //当总页数等于1时隐藏页码
    if(totalpage ==1){
        hidePage();
    }
    function hidePage(){
        M_box.hide();
    }
    //点击排序按钮，排序
    $("table").find("i").click(function () {
        var page = $(".M-box .active").text();
        if ($(this).is(".icon-chevron-up")) {
            //变成降序 DESC
            modelState = 1;
            $("table").find("i").removeClass("icon-chevron-down").addClass("icon-chevron-up");
            $(this).removeClass("icon-chevron-up").addClass("icon-chevron-down");
        } else {    //变成升序 ASC
            modelState = 0;
            $("table").find("i").removeClass("icon-chevron-down").addClass("icon-chevron-up");
        }
        orderState = $(this).parents("th").attr("cond");
        $("table").find("tbody").empty();
        getViewInfoPage(Number(page), orderState, modelState);
    });

    //点击排序，发送请求，并给分页添加事件
    function getViewInfoPage(page, order, mode) {
        $.post('/iwherelink/dataClean/getAll.do',
            {
                page: page,
                order: order,
                mode: mode
            },
            function (data) {
                if (data.code == 0) {

                    if (data.data.page > 0) {
                        var tr = showViewInfoPage(data.data.data);
                        $(".dataclean_manager").find("tbody").append(tr);
                        $('.M-box').attr({"totalnum": data.data.totalNum});
                        $(".listNum span").text(data.data.totalNum);
                        $(".missList  span").text(data.data.totalNum);
                        M_box.pagination({
                            pageCount: data.data.totalPage,
                            current: data.data.page,
                            coping: true,
                            callback: function (index) {
                                var condition=$('.table').find('.icon-chevron-down').parent().parent().attr('cond');
                                var order;
                                var mode;
                                if(condition==undefined){
                                    order=$('.table th').eq(2).attr('cond');
                                    mode=0;
                                }
                                else{
                                    order=condition;
                                    mode=1;
                                }
                                getViewInfoPage(index, order, mode);
                            }
                        });
                    } else {
                        $(".dataclean_manager").find("tbody").empty();
                        $(".dataclean_manager").find("tbody").append("<tr><td colspan='8' class='text-center'>暂无数据</td></tr>");
                    }
                }
                else {
                    layer.msg("获取分页数据出错");
                }
            }, 'json')
    }

    //动态生成表格数据
    function showViewInfoPage(value) {
        $(".dataclean_manager").find("tbody").empty();
        var tr = "";
        $.each(value, function (n, data) {
            if(data.sourceType=='db'){
                sourceType='数据库';
            }
            else if(data.sourceType=='dic'){
                sourceType='字典';
            }else{
                sourceType='视图';
            }

            tr += "<tr>";
            var td = '<td class="text-center"><input type="checkbox" value=' + data.id + ' /></td>';
            //td += "<td class='text-center linkStatus'>" + span + "</td>";
            td += "<td class='text-center' value='" + data.name + "'>" + data.name + "</td>";
            td += "<td class='text-center'>" + sourceType + "</td>";
            td += "<td class='text-center'>" + data.source + "</td>";
            td += "<td class='text-center'>" + data.ruleType + "</td>";
            td += "<td class='text-center'>" + data.field + "</td>";
            td += "<td class='text-center'>" + data.lasttime + "</td>";
            //td += "<td class='text-center'>" + btns + "</td>";
            td += "<td class='text-center'><a class='checkDetails' href='javascript:;'>查看详情</a></td>";
            td += "<td class='text-center'><a class='delete'  href='javascript:;'>删除</a></td>";
            td += "<td class='text-center' style='display: none'>" + data.id + "</td>";
            tr += td;
            tr += "</tr>";
        });
        return tr;
    }
    //删除
    $('table').on('click', '.delete', function () {
        console.log(11323);
        var id = $(this).parents('td').siblings().last().text();
        layer.alert("确定删除？", function (index) {
            layer.close(index);
            deleteData([id]);
        });

    });
    function deleteData(ids) {
        var len=ids.length;
        //layer.alert('删除成功');
        $.ajax({
            type: "post",
            url: "/iwherelink/dataClean/delete.do",
            //url: "/testData/table.json",
            data: {
                id: ids
            },
            dataType: 'json',
            traditional:true,
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
                    layer.msg("删除成功!", {time: 2000});
                    $('#select_all').attr('checked',false);
                    setTimeout(function(){
                        if(orderState==''){
                            orderState=$('.table th').eq(2).attr('cond');
                        }
                        getViewInfoPage(nowPage,orderState, modelState);
                        location.reload();
                    },2000);

                } else {
                    layer.alert(data.message);
                }
            },
            error: function () {
                layer.alert("删除失败");
            }
        });
    }

    //批量删除
    $('#batch_del').click(function () {
        var allCheckBox = $("tbody").find("input[type='checkbox']");
        var checkedIds = [];
        var viewTypeIds = [];
        for (var i = 0; i < allCheckBox.length; i++) {
            if (allCheckBox.eq(i).prop("checked") == true) {
                checkedIds.push(allCheckBox.eq(i).val());
            }
        }
        for (var j = 0; j < checkedIds.length; j++) {
            viewTypeIds[j] = checkedIds[j];
        }
        if (checkedIds.length == 0) {
            layer.alert('请先选择要删除的数据');
            return;
        }
        layer.alert('确认删除？',function(index,layerO){
            layer.close(index);
            layer.alert('删除成功');
            deleteData(viewTypeIds);
        });
    });
    //统计状态
    function staticsData() {
        $.ajax({
            type: "get",
            url: "/iwherelink/perspective/statistic.do",
            //url: "/testData/changeWsStatusById.json",
            dataType: "json",
            success: function (data) {
                if (data.code == 0) {
                    var text = '';
                    for (var i = 0; i < data.data.length; i++) {
                        if (data.data[i].status == 1) {
                            text += '<p class="statistics" status=' + data.data[i].status + '>已停用：<span style="background:#FF6b6b;">' + data.data[i].count + '</span></p>';
                        }
                        else {   //正常
                            text += '<p class="statistics" status=' + data.data[i].status + '>已启用：<span  style="background:#5cb85c;">' + data.data[i].count + '</span></p>';
                        }
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

    //开启或停止
    $('table').on('click', '.active_status', function () {
        var curTd = $(this).parent();
        var curObj = $(this);
        var id = curTd.siblings().eq(0).find('input').val();
        console.log($(this).text());
        if($(this).text() == "停止"){
            status = 1;
        }else{
            status =0;
        }
        //开启
        $.ajax({
            type: "get",
            url: "/iwherelink/dataClean/startstop.do",
            //url: "/testData/changeWsStatusById.json",
            dataType: "json",
            data: {
                id: Number(id),
                status:status
            },
            success: function (data) {
                if (data.code == 0) {
                    if(status == 0){
                        curTd.siblings().eq(1).find('span').css("background", "green");
                        curTd.empty().html("<span class='non_active_status addService status' >开启</span>" +
                            "| <a class='active_status removeService status' status='0'>停止</a>");

                    }else{
                        curTd.siblings().eq(1).find('span').css("background", "red");
                        curTd.empty().html("<a class='active_status addService status' status='1'>开启</a>" +
                            "| <span class='non_active_status  removeService status'>停止</span>");

                    }
                    //location.reload();

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
    //查看详情 checkDetails
    $('.table').on('click', '.checkDetails', function () {
        var id = $(this).parent().siblings().eq(0).find('input').val();
        $.ajax({
            type: "get",
            url: "/iwherelink/dataClean/get.do",
            dataType: "json",
            data: {
                id: Number(id)
            },
            success: function (data) {
                if (data.code == 0) {
                    switch (data.data.sourceType) {
                        case 'db':sourceType='数据库';
                            break;
                        case 'ws':sourceType='服务';
                            break;
                        default:sourceType='其他';
                            break;
                    }
                    var dd=makeDetailTable(data);
                    var html = '<dl class="dl-horizontal">' +
                        '<dt>名称：</dt><dd>' + data.data.name + '</dd>' +
                        '<dt>数据源类型：</dt><dd>' + sourceType + '</dd>' +
                        '<dt>数据源：</dt><dd>' + data.data.source.sourceName + '</dd>' +
                        '<dt>清洗规则类型：</dt><dd>' + data.data.ruleType + '</dd>' +
                        '<dt>清洗字段：</dt><dd>' + data.data.field + '</dd>'+dd+

                        //'<dt>空值：</dt><dd>' + data.data.nulldispose + '</dd>' +
                        //'<dt>异常值：</dt><dd>' + data.data.errordispose + '</dd>' +
                        //'<dt>重复值：</dt><dd>' + data.data.repeat + '</dd>' +
                        '<dt>最后修改时间：</dt><dd>' + data.data.lasttime + '</dd>'+
                        '</dl>';

                    layer.open({
                        type: 1,
                        content: html,
                        title: ['清洗任务详情', 'background:#4b8df8;color:white;font-size:16px;'],
                        maxmin: true,
                        area: ['600px', '400px'],
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
    });

    //拼接详情表格
    function makeDetailTable(data) {
        if( data.data.ruleType == "异常值处理"){
            var dd =  '<dt>范围：</dt><dd>' + data.data.range + '</dd>';
        }else{
            var dd = "";
        }
        return dd;
    }
    //编辑
    $('.table').on('click', '.edit', function () {
        var cleanId = $(this).parent().siblings().eq(0).find('input').val();
        $.ajax({
            type:'get',
            url:'/iwherelink/dataClean/get.do',
            dataType:'json',
            data:{
                id:cleanId
            },
            success:function(data){
                if(data.code == 0){
                    layer.msg('请求清洗任务成功',{time:1000});
                    var str = JSON.stringify(data.data);
                    console.log(str);
                    $.cookie('cleanData',str);

                    setTimeout(function(){
                        window.location.href='/dataClean.do';
                    },1000)
                }else{
                    layer.alert(data.message);
                }
            },
            error:function(){
                layer.msg('获取当前请求任务失败');
            }

        });

    });
});
