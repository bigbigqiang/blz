$(function () {
    //初始化侧边栏的点击事件
    $('.sub-menu a[href="./perspectiveManager.do"]').addClass('current_page').parents('.third-level').show().parent().addClass('open');

    //初始化分页
    var M_box = $('.M-box');
    var totalpage = parseInt(M_box.attr("totalpage"));
    var page = parseInt(M_box.attr("page"));
    var allView = $.cookie('allView');
    var modelState = 0;
    var orderState;
    M_box.pagination({
        pageCount: totalpage,
        current: page,
        coping: true,
        callback: function (index) {
            //if(orderState==''){
            //    orderState=$('.table th').eq(2).attr('cond');
            //}
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
    $(".perspective_manager").find("i").click(function () {
        var page = $(".M-box .active").text();
        if ($(this).is(".icon-chevron-up")) {
            //变成降序 DESC
            modelState = 1;
            $(".perspective_manager").find("i").removeClass("icon-chevron-down").addClass("icon-chevron-up");
            $(this).removeClass("icon-chevron-up").addClass("icon-chevron-down");
        } else {    //变成升序 ASC
            modelState = 0;
            $(".perspective_manager").find("i").removeClass("icon-chevron-down").addClass("icon-chevron-up");
        }
        orderState = $(this).parents("th").attr("cond");
        $(".perspective_manager").find("tbody").empty();
        getViewInfoPage(Number(page), orderState, modelState);
    });

    //点击排序，发送请求，并给分页添加事件
    function getViewInfoPage(page, order, mode) {
        $.post('/iwherelink/perspective/getAll.do',
            {
                page: page,
                order: order,
                mode: mode
            },
            function (data) {
                if (data.code == 0) {
                    if (data.data.page > 0) {
                        var tr = showViewInfoPage(data.data.data);
                        $(".perspective_manager").find("tbody").append(tr);
                        $('.M-box').attr({"totalnum": data.data.totalNum});
                        $(".listNum span").text(data.data.totalNum);
                        $(".missList  span").text(data.data.totalNum);
                        M_box.pagination({
                            pageCount: data.data.totalPage,
                            current: data.data.page,
                            coping: true,
                            callback: function (index) {
                                getViewInfoPage(index, orderState, modelState);
                            }
                        });
                    } else {
                        $(".perspective_manager").find("tbody").empty();
                        $(".perspective_manager").find("tbody").append("<tr><td colspan='8' class='text-center'>暂无数据</td></tr>");
                    }
                }
                else {
                    layer.msg("获取分页数据出错");
                }
            }, 'json')
    }

    //动态生成表格数据
    function showViewInfoPage(value) {
        $(".perspective_manager").find("tbody").empty();
        var tr = "";
        $.each(value, function (n, data) {
            var span = '';
            var btns = '';
            if (data.status == 0) {
                span = '<span style="background:green;"></span>';
                btns = "<span class='non_active_status addService' >开启</span>" +
                    "| <a class='update'>更新</a>"+
                    "| <a class='active_status removeService'>停止</a>";
            }
            else {
                span = '<span style="background:red;"></span>';
                btns = "<span class='non_active_status addService' >开启</span>" +
                    "| <a class='update'>更新</a>"+
                    "| <a class='active_status removeService'>停止</a>";
            }
            tr += "<tr>";
            var td = '<td class="text-center"><input type="checkbox" value=' + data.id + ' /></td>';
            td += "<td class='text-center linkStatus'>" + span + "</td>";
            td += "<td class='text-center' value='" + data.name + "'>" + data.name + "</td>";
            td += "<td class='text-center'>" + data.source + "</td>";
            td += "<td class='text-center'>" + data.lasttime + "</td>";
            td += "<td class='text-center'>" + btns + "</td>";
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
        $.ajax({
            type: "post",
            url: "/iwherelink/perspective/delete.do",
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
    $('.perspective_manager').on('click', '.active_status', function () {
        var curTd = $(this).parent();
        var curObj = $(this);
        var id = curTd.siblings().eq(0).find('input').val();
        if($(this).text() == "停止"){
            status = 1;
        }else{
            status =0;
        }
        //开启
        $.ajax({
            type: "get",
            url: "/iwherelink/perspective/startstop.do",
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
                            "| <a class='active_status'>更新</a>"+
                            "| <a class='active_status removeService status' status='0'>停止</a>");

                    }else{
                        curTd.siblings().eq(1).find('span').css("background", "red");
                        curTd.empty().html("<a class='active_status addService status' status='1'>开启</a>" +
                            "| <a class='active_status'>更新</a>"+
                            "| <span class='non_active_status  removeService status'>停止</span>");

                    }
                    location.reload();

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
    //更新
    $('.perspective_manager').on('click','.update',function(){
        var id = $(this).parent().siblings().eq(0).find('input').val();
        $.ajax({
            type: "get",
            url: "/iwherelink/perspective/query.do",
            //url: "/testData/showServiceDetail.json",
            dataType: "json",
            data: {
                id: Number(id)
            },
            success: function (data) {
                if (data.code == 0) {
                    var table = queryTab(data);
                    var html = '<dl class="dl-horizontal">' +
                        '<dt>数据源：</dt><dd>' + data.data.source + '</dd>' +
                        '<dt>更新时间：</dt><dd>' + data.date + '</dd>' +
                        '</dl>' +table;
                    layer.open({
                        type: 1,
                        content: html,
                        title: ['更新结果', 'background:#4b8df8;color:white;font-size:16px;'],
                        maxmin: true,
                        area: ['600px', '500px'],
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
    //拼接更新表格
    function queryTab(data){
        var table = "<table class='table'>";
        var thead = "<thead><tr><th></th>";
        var tbody = "<tbody>";
        var th = '';
        $.each(data.data.data.colum,function(key,value){
            th = "<th>"+value+"</th>";
            thead += th;
        });
        var tr = "";
        var rowArr = data.data.data.row;
        var colArr = data.data.data.colum;
        for(var i=0;i<rowArr.length;i++){
            tr += "<tr><td>"+rowArr[i]+"</td>";
            for(var j=0;j<colArr.length;j++){
                var sumObj = data.data.data.data[rowArr[i]][colArr[j]];
                if(sumObj)
                    for(var k in sumObj)
                        tr += "<td>"+sumObj[k]+"</td>";
                else tr += "<td></td>";
            }
            tr += "</tr>";
        }
        tbody += tr;
        thead += "</tr></thead>";
        tbody += "</tbody>";
        table += thead + tbody;
        table += "</table>";
        return table;
    }
    //查看详情 checkDetails
    $('.perspective_manager').on('click', '.checkDetails', function () {
        var id = $(this).parent().siblings().eq(0).find('input').val();
        $.ajax({
            type: "get",
            url: "/iwherelink/perspective/get.do",
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
                        '<dt>透视表名称：</dt><dd>' + data.data.name + '</dd>' +
                        '<dt>数据源类型：</dt><dd>' + data.data.sourcetype + '</dd>'+dd+
                        '<dt>状态：</dt><dd>' + status + '</dd>' +
                        '<dt>最后修改时间：</dt><dd>' + data.data.lasttime + '</dd>'+
                        '</dl>';

                    layer.open({
                        type: 1,
                        content: html,
                        title: ['透视表详情', 'background:#4b8df8;color:white;font-size:16px;'],
                        maxmin: true,
                        area: ['600px', '400px'],
                        btn: ['关闭'],
                        yes: function (index, layerO) {
                            layer.close(index);
                        }
                    });
                    $('.layui-layer-content').mCustomScrollbar();
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
        if(data.data.sourcetype == "db"){
            console.log(343242);
            var dd = '<dt>数据库类型：</dt>'+"<dd>"+data.data.source.sourceType+"</dd>"+
                '<dt>数据库地址：</dt>'+"<dd>"+data.data.source.sourceUrl+"</dd>"+
                '<dt>用户名：</dt>'+"<dd>"+data.data.source.userName+"</dd>"+
                '<dt>表名：</dt>'+"<dd>"+data.data.source.sourceName+"</dd>";
        }else if(data.data.sourcetype == "ws"){
            var dd = '<dt>服务类型：</dt>'+"<dd>"+data.data.source.sourceType+"</dd>"+
                '<dt>服务地址：</dt>'+"<dd>"+data.data.source.sourceUrl+"</dd>"+
                '<dt>服务名称：</dt>'+"<dd>"+data.data.source.sourceName+"</dd>"
        }else if(data.data.sourcetype == "dic"){
            var dd = '<dt>服务名称：</dt>'+"<dd>"+data.data.source.sourceName+"</dd>"
        }else if(data.data.sourcetype == "view"){
            var dd = '<dt>服务名称：</dt>'+"<dd>"+data.data.source.sourceName+"</dd>"
        }
        if(data.data.colum == null){
            dd += '<dt>列标签：</dt>'+'<dd>无<dd>';
        }else{
            for(var i = 0;i<data.data.colum.length;i++){
                dd += '<dt>列标签：</dt>'+'<dd>'+data.data.colum[i]+'<dd>';
            }
        }
        if(data.data.filter == null){
            dd += '<dt>过滤条件：</dt>'+'<dd>无<dd>';
        }
        else{
            for(var i = 0;i<data.data.filter.length;i++){
                dd += '<dt>过滤条件：</dt>'+'<dd>'+data.data.filter[i]+'<dd>';
            }
        }
        if(data.data.row == null){
            dd += '<dt>行标签：</dt>'+'<dd>无<dd>';
        }
        else{
            for(var i = 0;i<data.data.row.length;i++){
                dd += '<dt>行标签：</dt>'+'<dd>'+data.data.row[i]+'<dd>';
            }
        }
        if(data.data.statistics == null){
            dd += '<dt>统计值：</dt>'+'<dd>无<dd>';
        }
        else{
            console.log(23424);
            for(var i = 0;i<data.data.statistics.length;i++){

                //dd += '<dt>统计值</dt>'+'<dd>'+data.data.statistics[i].count+'<dd>';
                $.each(data.data.statistics[i],function(key,value){
                    if(key == 'count'){
                        dd += '<dt>统计值：</dt>'+'<dd>'+value+'(计数)'+'<dd>';
                    }else{
                        dd += '<dt>统计值：</dt>'+'<dd>'+value+'(求和)'+'<dd>';
                    }
                })
            }
        }
        return dd;
    }

    //编辑
    $('.perspective_manager').on('click', '.edit', function () {
        var perspectiveId = $(this).parent().siblings().eq(0).find('input').val();
        $.ajax({
            type:'get',
            url:'/iwherelink/perspective/get.do',
            dataType:'json',
            data:{
                id:perspectiveId
            },
            success:function(data){
                if(data.code == 0){
                    layer.msg('请求视图列表成功',{time:1000});
                    var str = JSON.stringify(data.data);
                    $.cookie('dicData',str);
                    //console.log($.cookie("dicData"))
                    setTimeout(function(){
                        window.location.href='/dataPerspective.do';
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
