$(function () {
    //初始化侧边栏的点击事件
    $('.sub-menu a[href="./indexLargeManager.do"]').addClass('current_page').parents('.third-level').show().parent().addClass('open');

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
                orderState=$('.table th').eq(5).attr('cond');
                console.log(orderState);
            }
            getViewInfoPage(index,orderState, modelState);
        }
    });
    //点击排序按钮，排序
    $(".view_manager").find("i").click(function () {
        var page = $(".M-box .active").text();
        if ($(this).is(".icon-chevron-up")) {
            //变成降序 DESC
            modelState = 1;
            $(".view_manager").find("i").removeClass("icon-chevron-down").addClass("icon-chevron-up");
            $(this).removeClass("icon-chevron-up").addClass("icon-chevron-down");
        } else {    //变成升序 ASC
            modelState = 0;
            $(".view_manager").find("i").removeClass("icon-chevron-down").addClass("icon-chevron-up");
        }
        orderState = $(this).parents("th").attr("cond");
        console.log(orderState);
        $(".view_manager").find("tbody").empty();
        console.log(page);
        getViewInfoPage(Number(page), orderState, modelState);
    });

    //点击排序，发送请求，并给分页添加事件
    function getViewInfoPage(page, order, mode) {
        $.post('/iwherelink/indexBigTable/getAll.do',
        //$.get('/testData/indexManage/getAllLarge.json',
            {
                page: page,
                order: order,
                mode: mode
            },
            function (data) {
                if (data.code == 0) {
                    if (data.data.page > 0) {
                        var tr = showViewInfoPage(data.data.data);
                        $(".view_manager").find("tbody").append(tr);
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
                                    order=$('.table th').eq(5).attr('cond');
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
                        $(".view_manager").find("tbody").empty();
                        $(".view_manager").find("tbody").append("<tr><td colspan='8' class='text-center'>暂无数据</td></tr>");
                    }
                }
                else {
                    layer.msg("获取分页数据出错");
                }
            }, 'json')
    }

    //动态生成表格数据
    function showViewInfoPage(value) {
        $(".view_manager").find("tbody").empty();
        var tr = "";
        var sourceType;
        var codeType;
        $.each(value, function (n, data) {
            if(data.sourceType=='db'){
                sourceType='数据库';
            }
            else{
                sourceType='服务';
            }
            if(data.codeType==1){
                codeType='点编码';
            }
            else{
                codeType='矩形编码';
            }
            tr += "<tr>";
            var td = '<td class="text-center"><input type="checkbox" value=' + data.id + ' /></td>';
            //td += "<td class='text-center linkStatus'>" + sourceType + "</td>";
            td += "<td class='text-center linkStatus'>" + sourceType + "</td>";
            td += "<td class='text-center'>" + data.tableName + "</td>";
            td += "<td class='text-center'>" + data.tableid + "</td>";
            td += "<td class='text-center'>" +codeType + "</td>";
            td += "<td class='text-center'>" + data.code + "</td>";
            td += "<td class='text-center'>" + data.layer + "</td>";


            td += "<td class='text-center'><a class='checkDetails' href='javascript:;'>查看详情</a></td>";
            td += "<td class='text-center'><a class='delete'  href='javascript:;'>删除</a></td>";
            td += "<td class='text-center' style='display: none'>" + data.id + "</td>";
            tr += td;
            tr += "</tr>";
        });
        return tr;
    }

    function update_access_ws() {
        var newSeviceType = $("#seviceType").find("option:selected").val();
        var newName = $("#serviceName").val();
        var newUrl = $("#serviceURL").val();
        var newRequestType = $("#requestType").val();
        var newRequestData = $("#requestData").val();
        var accesskey = $("#accesskey").val();
        //if ( oldType == newSeviceType && newName == oldName && newUrl == oldUrl && newRequestType == oldRequestType && newRequestData == oldRequestData) {
        //    alert("您当前未做任何修改!");
        //    $(".change-message").hide();
        //    $(".tablebg-grey").hide();
        //    return;
        //}
        if (typeof (newName) == 'undefined' || newName == '' || newName == null) {
            alert("请填写下服务名称");
            return;
        }
        if (typeof (newUrl) != 'undefined' && newUrl != '' && newUrl != null) {
            if (newUrl.indexOf(":") <= 0) {
                alert("请填写下正确的服务地址");
                return;
            }
        }
        //
        if (newName != null && newName.trim().length > 0) {
            $.post('/iwherelink/updateServiceById.do', {
                    id: newSeviceType,
                    name: newName.trim(),
                    url: newUrl.trim(),
                    requestType: newRequestType.trim(),
                    requestData: newRequestData.trim(),
                    accesskey: accesskey.trim()


                },
                function (data) {
                    if ("EXIST" == data) {
                        alert("服务名称已经存在,请确认后再做修改!");
                        return;
                    } else if ("FAIL" == data) {
                        alert("服务名称添加异常,请稍后再做修改!");
                        return;
                    } else if ("SUCCESS" == data) {
                        alert("服务修改成功!");
                        location.href = "acsServices_cfg";
                    } else if ("EXCEPTION" == data) {
                        alert("服务名称修改存在异常!");
                        return;
                    }

                }
            );
        } else {
            alert("请填写下服务名称");
            return;
        }
    }

    $('#update_save').click(update_access_ws);
    //删除
    $('table').on('click', '.delete', function () {
        var id = $(this).parents('td').siblings().last().text();
        //console.log(id);
        layer.alert("确定删除？", function (index) {
            layer.close(index);
            deleteData([id]);
        });

    });
    function deleteData(ids) {
        var len=ids.length;
        $.ajax({
            type: "post",
            //type: "get",
            url: "/iwherelink/indexBigTable/delete.do",
            //url: "/testData/indexManage/delete.json",
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
                            orderState=$('.table th').eq(5).attr('cond');
                        }
                        getViewInfoPage(nowPage,orderState, modelState);
                        staticsData();
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
            url: "/iwherelink/indexBigTable/getDataState.do",
            dataType: "json",
            success: function (data) {
                if (data.code == 0) {
                    var text = '';
                    var source='';
                    for (var i = 0; i < data.data.length; i++) {
                        switch (data.data[i].status){
                            case 'db':source='数据库';
                                break;
                            case 'ws':source='服务';
                                break;
                            default:source='其他';
                                break;
                        }
                        text += '<p class="statistics">'+source+'：<span>' + data.data[i].count + '</span></p>';
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
    $('.view_manager').on('click', '.active_status', function () {
        var curTd = $(this).parent();
        var curObj = $(this);
        var id = curTd.siblings().eq(0).find('input').val();
        var status = curObj.attr('status');
        console.log(status);
        if (status == "1") {  //开启
            $.ajax({
                type: "get",
                url: "/iwherelink/combine/startup.do",
                //url: "/testData/changeWsStatusById.json",
                dataType: "json",
                data: {
                    id: Number(id)
                },
                success: function (data) {
                    if (data.code == 0) {
                        curTd.siblings().eq(1).find('span').css("background", "green");
                        curTd.empty().html("<span class='non_active_status addService status' >开启</span>" +
                            "| <a class='active_status removeService status' status='0'>停止</a>");
                        staticsData();
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
        else {
            //检测字典关联状态
            /*$.ajax({
                type: "get",
                url: "/iwherelink/combine/check.do",
                //url: "/testData/checkDicRelations.json",
                dataType: "json",
                data: {
                    id: [id]
                },
                success: function (data) {
                    if (data.code == 0) {
                        if (data.data.totalNum == 0) {
                            $.ajax({
                                type: "get",
                                url: "/iwherelink/combine/stop.do",
                                //url: "/testData/changeWsStatusById.json",
                                dataType: "json",
                                data: {
                                    id: Number(id)
                                },
                                success: function (data) {
                                    if (data.code == 0) {
                                        curTd.siblings().eq(1).find('span').css("background", "red");
                                        curTd.empty().html("<a class='active_status addService status' status='1'>开启</a>" +
                                            "| <span class='non_active_status  removeService status'>停止</span>");
                                        staticsData();
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
                        else {
                            var tr = '';
                            for (var i = 0; i < data.data.totalNum; i++) {
                                tr += '<tr><td>' + data.data.data[i].id + '</td><td>' + data.data.data[i].name + '</td></tr>';
                            }
                            var html = '<p>仍有' + data.data.totalNum + '个字典相关联，停止后关联字典将不可用，是否继续？</p>' +
                                '<table class="table table-bordered table-responsive table-hover">' +
                                '<thead><tr><th>id</th><th>名称</th></tr></thead><tbody>' +
                                tr +
                                '</tbody>' +
                                '</table>';
                            layer.open({
                                title: '确认停止',
                                content: html,
                                btn: ['确认', '取消'],
                                area: ['500px', '340px'],
                                yes: function (index) {
                                    layer.close(index);
                                    $.ajax({
                                        type: "get",
                                        url: "/iwherelink/combine/stop.do",
                                        //url: "/testData/changeWsStatusById.json",
                                        dataType: "json",
                                        data: {
                                            id: Number(id)
                                        },
                                        success: function (data) {
                                            if (data.code == 0) {
                                                curTd.siblings().eq(1).find('span').css("background", "red");
                                                curTd.empty().html("<a class='active_status addService status' status='1'>开启</a>" +
                                                    "| <span class='non_active_status  removeService status'>停止</span>");
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
                            });
                        }
                    }
                    else {
                        layer.alert(data.message);
                    }
                },
                error: function () {
                    alert("请求失败！")
                }
            });*/
            $.ajax({
                type: "get",
                url: "/iwherelink/combine/stop.do",
                //url: "/testData/changeWsStatusById.json",
                dataType: "json",
                data: {
                    id: Number(id)
                },
                success: function (data) {
                    if (data.code == 0) {
                        curTd.siblings().eq(1).find('span').css("background", "red");
                        curTd.empty().html("<a class='active_status addService status' status='1'>开启</a>" +
                            "| <span class='non_active_status  removeService status'>停止</span>");
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
    });
    //查看详情 checkDetails
    $('.view_manager').on('click', '.checkDetails', function () {
        var id = $(this).parent().siblings().eq(0).find('input').val();
        $.ajax({
            type: "get",
            url: "/iwherelink/indexBigTable/get.do",
            //url: "/testData/indexManage/get1.json",
            dataType: "json",
            data: {
                id: Number(id)
            },
            success: function (data) {
                if (data.code == 0) {
                    var codeColumn;
                    var codeType;
                    var sourceType;
                    var codeColumnObj=(data.data.codeColumn);
                    if(data.data.codeType == 2){
                        codeType="矩形编码";
                        codeColumn="<span>左上角经度=></span>"+codeColumnObj.leftLng+"<br /><span>左上角纬度=></span>"+codeColumnObj.leftLat+"" +
                            "<br /><span>右下角经度=></span>"+codeColumnObj.rightLng +"<br /><span>右下角纬度=></span>"+codeColumnObj.rightLat;
                    }
                    else{
                        codeType="点编码";
                        codeColumn="<span>经度=></span>" + codeColumnObj.lng + "<br /><span>纬度=></span>" + codeColumnObj.lat;
                    }
                    switch (data.data.sourceType) {
                        case 'db':sourceType='数据库';
                            break;
                        case 'ws':sourceType='服务';
                            break;
                        default:sourceType='其他';
                            break;
                    }
                    var html = '<dl class="dl-horizontal">' +
                        '<dt>数据源类型：</dt><dd>' + sourceType + '</dd>' +
                        '<dt>数据库地址：</dt><dd>' + data.data.source.sourceUrl + '</dd>' +
                        '<dt>表名：</dt><dd>' + data.data.source.sourceName + '</dd>' +
                        '<dt>用户名：</dt><dd>' + data.data.source.userName + '</dd>' +
                        '<dt>数据编号：</dt><dd>' + data.data.tableid + '</dd>' +
                        '<dt>编码类型：</dt><dd>' + codeType + '</dd>' +
                        '<dt>编码字段：</dt><dd>' + codeColumn + '</dd>' +
                        '<dt>网格码：</dt><dd>'+data.data.code+'</dd>' +
                        '<dt>层级：</dt><dd>'+data.data.layer+'</dd>' +
                        '<dt>创建时间：</dt><dd>'+data.data.createTime+'</dd>' +
                        '</dl>';
                    layer.open({
                        type: 1,
                        content: html,
                        title: ['索引大表详情', 'background:#4b8df8;color:white;font-size:16px;'],
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
        var table = "<table class='table'>";
        var thead = "<thead><th>";
        var tbody = "<tbody>";

        $.each(data.data.colums, function (key, value) {
            var th = "<td>" + key + "</td>";
            thead += th;
        });
        var tr = "";
        $.each(data.data.froms, function (key, value) {
            var td = "";
            td += "<td>" + value + "</td>";
            var source = value;
            $.each(data.data.colums, function (key, value) {
                var flag = 0;
                for (var i = 0; i < value.length; i++) {
                    var prex = value[i].substring(0, source.length);
                    if (source == prex) {
                        var last = value[i].substring(source.length + 1, value[i].length);

                        if (last.length == key.length) {
                            if (last == key) {
                                td += "<td id='" + prex + "." + key + "' val='" + prex + "." + key + "'>" + key + "</td>";
                                flag = 1;
                            } else {
                                td += "<td id='" + prex + "." + last + "' val='" + prex + "." + last + "'>" + key + "(" + last + ")" + "</td>";
                                flag = 1;
                            }
                        }

                    }
                }
                if (flag == 0) {
                    td += "<td></td>";
                }
            });
            tr += "<tr>" + td + "</tr>";
        });
        tbody += tr;
        thead += "</th></thead>";
        tbody += "</tbody>";
        table += thead + tbody;
        table += "</table>";
        return table;
    }

    //检查数据库连接状态
    function connectionCheck(obj) {
        var id = $(obj).parent().siblings().eq(0).find("input").val();
        $.ajax({
            type: "get",
            url: "/iwherelink/combine/query.do",
            //url: "/testData/delete.json",
            dataType: "json",
            data: {
                id: Number(id)
            },
            success: function (data) {
                if (data.code == 0) {
                    //layer.msg("连接正常", {time: 2000});
                    showTable(data.data);
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

    $('.view_manager').on('click', '.connectionCheck', function () {
        connectionCheck(this);
    });
    //显示测试查询结果
    function showTable(data) {
        var tHeader = '';
        var tBody = '';
        var td = '';
        var tr = '';
        var tHeaderArr = [];
        var newData = [];
        //获取全部的属性
        for (var i = 0; i < data.data.length; i++) {
            var currentData = data.data[i];
            for (var attr in currentData) {
                if ($.inArray(attr, tHeaderArr) < 0) {
                    tHeaderArr.push(attr);
                }
            }
        }

        //补全数据,构造新数据
        for (var k = 0; k < data.data.length; k++) {
            var currentData = data.data[k];
            var currentDataAttr = [];
            for (var attr in currentData) {
                currentDataAttr.push(attr);
            }
            //若没有当前属性，则以“noneAttr”填充
            for (var m = 0; m < tHeaderArr.length; m++) {
                if ($.inArray(tHeaderArr[m], currentDataAttr) < 0) {
                    currentData[tHeaderArr[m]] = 'noneAttr';
                }
            }
            var newCurrentDataSort = objKeySort(currentData);
            newData.push(newCurrentDataSort);
        }

        //按照排好的序列拼头部
        var newTheaderArr = tHeaderArr.sort();
        for (var n = 0; n < newTheaderArr.length; n++) {
            tHeader += '<th>' + newTheaderArr[n] + '</th>';
        }
        //拼tbody
        for (var j = 0; j < newData.length; j++) {
            tr = '';
            td = '';
            for (var newAttr in newData[j]) {
                var currentVal = newData[j][newAttr];
                if (currentVal == 'noneAttr') {
                    td += '<td></td>';
                }
                else {
                    td += '<td>' + newData[j][newAttr] + '</td>';
                }
            }
            tr = '<tr>' + td + '</tr>';
            tBody+=tr;
        }

        var html='<p>总记录量：'+data.totalNum+'条</p><table class="table table-hover table-responsive table-bordered"><thead>'+tHeader+'</thead><tbody>'+tBody+'</tbody></table>';
        layer.open({
            type: 1,
            content: html,
            title: ['测试结果', 'background:#4b8df8;color:white;font-size:16px;'],
            maxmin: true,
            area: ['800px', '500px'],
            btn: ['关闭'],
            yes: function (index, layerO) {
                layer.close(index);
            }
        });
    }
    //按照对象的key值进行排序
    function objKeySort(obj) {
        var newKey = Object.keys(obj).sort();
        var newObj = {};
        for (var i = 0; i < newKey.length; i++) {
            newObj[newKey[i]] = obj[newKey[i]];
        }
        return newObj;
    }
    //编辑
    //编辑
    $('.view_manager').on('click', '.edit', function () {
        var dicId = $(this).parent().siblings().eq(0).find('input').val();
        $.ajax({
            type:'get',
            url:'/iwherelink/combine/get.do',
            //url:'/testData/respo.json',
            dataType:'json',
            data:{
                id:dicId
            },
            success:function(data){
                if(data.code == 0){
                    console.log(data.data);
                    layer.msg('请求字典成功',{time:1000});
                    var str = JSON.stringify(data.data);
                    $.cookie('dicData',str);

                    setTimeout(function(){
                        window.location.href='/definedDic.do';
                    },1000)
                }else{
                    layer.alert(data.message);
                }
            },
            error:function(){
                layer.msg('获取当前字典信息失败');
            }

        });

    });

    //筛选
    //$("#selectViewName").change(function () {
    //    var condition = $(".view_manager").find("th").eq(2).attr("cond");
    //    console.log(condition);
    //    $(".view_manager").find("tbody").empty();
    //    getViewInfoPage(1, condition, 0);
    //});

});
