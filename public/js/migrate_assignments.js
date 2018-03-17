$(function () {
    //初始化侧边栏的点击事件
    $('.sub-menu a[href="./migrate_assignments.do"]').addClass('current_page').parents('.third-level').show().parent().addClass('open');

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
    $(".migrate_assignments").find("i").click(function () {
        var page = $(".M-box .active").text();
        if ($(this).is(".icon-chevron-up")) {
            //变成降序 DESC
            modelState = 1;
            $(".migrate_assignments").find("i").removeClass("icon-chevron-down").addClass("icon-chevron-up");
            $(this).removeClass("icon-chevron-up").addClass("icon-chevron-down");
        } else {    //变成升序 ASC
            modelState = 0;
            $(".migrate_assignments").find("i").removeClass("icon-chevron-down").addClass("icon-chevron-up");
        }
        orderState = $(this).parents("th").attr("cond");
        $(".migrate_assignments").find("tbody").empty();
        getViewInfoPage(Number(page), orderState, modelState);
    });

    //点击排序，发送请求，并给分页添加事件
    function getViewInfoPage(page, order, mode) {
        $.post('/iwherelink/transfer/getAll.do',
            {
                page: page,
                order: order,
                mode: mode
            },
            function (data) {
                if (data.code == 0) {
                    if (data.data.page > 0) {
                        var tr = showViewInfoPage(data.data.data);
                        $(".migrate_assignments").find("tbody").append(tr);
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
                        $(".migrate_assignments").find("tbody").empty();
                        $(".migrate_assignments").find("tbody").append("<tr><td colspan='11' class='text-center'>暂无数据</td></tr>");
                    }
                }
                else {
                    layer.msg("获取分页数据出错");
                }
            }, 'json')
    }

    //动态生成表格数据
    function showViewInfoPage(value) {
        $(".migrate_assignments").find("tbody").empty();
        var tr = "";
        $.each(value, function (n, data) {

            var span = '';
            var btns = '';
            if (data.status == 0) {
                span = '<span style="background:green;" value="0"></span>';
                btns = "<a class='active_status addService status' status='1'>开启</a>";

            }
            else {
                span = '<span style="background:red;" value="1"></span>';
                btns = "<span class='non_active_status addService' >已开启</span>" ;

            }
            tr += "<tr>";
            var td = '<td class="text-center"><input type="checkbox" value=' + data.id + ' /></td>';
            td += "<td class='text-center linkStatus'>" + span + "</td>";
            td += "<td class='text-center' value='" + data.name + "'>" + data.name + "</td>";
            td += "<td class='text-center'>" + data.sourceType + "</td>";
            td += "<td class='text-center'>" + data.targetType + "</td>";
            td += "<td class='text-center'>" + data.type + "</td>";
            td += "<td class='text-center'>" + data.starttime + "</td>";
            td += "<td class='text-center'>"+btns+"</td>";
            td += "<td class='text-center'><a class='checkDetails' href='javascript:;'>查看详情</a></td>";
            td += "<td class='text-center'><a class='edit' href='javascript:;' >编辑</a></td>";
            td += "<td class='text-center'><a class='delete'  href='javascript:;'>删除</a></td>";
            td += "<td class='text-center' style='display: none'>" + data.id + "</td>";
            tr += td;
            tr += "</tr>";
        });
        return tr;
    }
    //删除
    $('table').on('click', '.delete', function () {
        var id = $(this).parents('td').siblings().last().text();
        layer.alert("确定删除？", function (index) {
            layer.close(index);
            deleteData([id]);
        });

    });
    function deleteData(ids) {
        var len=ids.length;
        layer.msg("删除成功!", {time: 2000});
        $.ajax({
            type: "post",
            url: "/iwherelink/transfer/delete.do",
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
            deleteData(viewTypeIds);
        });
    });


    //开启或停止
    $('.migrate_assignments').on('click','.status',function(){
        var curId = $(this).parent();
        var id = curId.siblings().eq(0).find('input').val();
        console.log(id);
        $.ajax({
            type:"post",
            url:'/iwherelink/transfer/start.do',
            dataType:'json',
            data:{
                id:Number(id)
            },
            success:function(data){
               if(data.code == 0){
                   $(this).parent().siblings().eq(1).find('span').css("background","green");
                   $(this).parent().empty().html("<span class='non_active_status addService' >已开启</span>" );
                   location.reload();
               }else{
                   $(this).parent().siblings().eq(1).find('span').css("background", "red");
                   $(this).parent().empty().html("<a class='active_status addService status' status='1'>开启</a>" );
               }
            },
            error:function(){
                alert("请求失败！");
            }
        })
    });

    //查看详情 checkDetails
    $('.migrate_assignments').on('click', '.checkDetails', function () {
        var id = $(this).parent().siblings().eq(0).find('input').val();
        $.ajax({
            type: "get",
            url: "/iwherelink/transfer/get.do",
            dataType: "json",
            data: {
                id: Number(id)
            },
            success: function (data) {
                if (data.code == 0) {
                    var status = '';
                    if (data.data.status == '0') {
                        status = '开启';
                    }
                    else {
                        status = '停用';
                    }
                    var dd=makeDetailTable(data);
                    var html = '<dl class="dl-horizontal">' +
                        '<dt>作业名称：</dt><dd>' + data.data.name + '</dd>' +
                        '<dt>数据源类型：</dt><dd>' + data.data.sourceType + '</dd>' +dd+
                        '<dt>端口号：</dt><dd>' + data.data.targetPort + '</dd>'+
                        '<dt>状态：</dt><dd>' + status + '</dd>' +
                        '<dt>迁移类型：</dt><dd>' + data.data.type + '</dd>' +
                        '<dt>目标数据库：</dt><dd>' + data.data.targetDatabase + '</dd>' +
                        '<dt>目标用户名：</dt><dd>' + data.data.targetUserName + '</dd>' +
                        '<dt>目标表：</dt><dd>' + data.data.targetTable + '</dd>' +
                        '<dt>目标地址：</dt><dd>' + data.data.targetUrl + '</dd>'+
                        '<dt>开始时间：</dt><dd>' + data.data.starttime + '</dd>'+
                        '</dl>';
                    layer.open({
                        type: 1,
                        content: html,
                        title: ['迁移作业详情', 'background:#4b8df8;color:white;font-size:16px;'],
                        maxmin: true,
                        area: ['600px', '400px'],
                        btn: ['关闭'],
                        yes: function (index, layerO) {
                            layer.close(index);
                        }
                    });
                    $('.layui-layer-content').mCustomScrollbar({
                        axis:'yx'
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
        var row = "";
        var statistics = "";
        if(data.data.sourceType == "db"){
            var dd = '<dt>数据库类型：</dt>'+"<dd>"+data.data.source.sourceType+"</dd>"+
                '<dt>数据库地址：</dt>'+"<dd>"+data.data.source.sourceUrl+"</dd>"+
                '<dt>用户名：</dt>'+"<dd>"+data.data.source.userName+"</dd>"+
                '<dt>表名：</dt>'+"<dd>"+data.data.source.sourceName+"</dd>";
        }
        if(data.data.sourceType == "ws"){
            var dd = '<dt>服务类型：</dt>'+"<dd>"+data.data.source.sourceType+"</dd>"+
                '<dt>服务地址：</dt>'+"<dd>"+data.data.source.sourceUrl+"</dd>"+
                '<dt>服务名称：</dt>'+"<dd>"+data.data.source.sourceName+"</dd>"

        }
        if(data.data.sourceType == "dic"){
            var dd = '<dt>服务名称：</dt>'+"<dd>"+data.data.source.sourceName+"</dd>"
        }
        if(data.data.sourceType == "view"){
            var dd = '<dt>服务名称：</dt>'+"<dd>"+data.data.source.sourceName+"</dd>"
        }


        return dd;

    }
    //编辑
    $('.migrate_assignments').on('click', '.edit', function () {
        var perspectiveId = $(this).parent().siblings().eq(0).find('input').val();
        console.log(perspectiveId);
        $.ajax({
            type:'get',
            url:'/iwherelink/transfer/get.do',
            dataType:'json',
            data:{
                id:perspectiveId
            },
            success:function(data){
                if(data.code == 0){
                    layer.msg('请求视图列表成功',{time:1000});
                    var str = JSON.stringify(data.data);
                    $.cookie('dicData',str);

                    setTimeout(function(){
                        window.location.href='/createMigration.do';
                    },1000)
                }else{
                    layer.alert(data.message);
                }
            },
            error:function(){
                layer.msg('获取当前视图信息失败');
            }

        });

    });
});

