$(function () {
    //初始化侧边栏的点击事件
    $('.sub-menu a[href="./indexManager.do"]').addClass('current_page').parents('.third-level').show().parent().addClass('open');

    //初始化分页
    var M_box = $('.M-box');
    var totalpage = parseInt(M_box.attr("totalpage"));
    var page = parseInt(M_box.attr("page"));
    var allView = $.cookie('allView');
    var modelState = 0;
    var orderState = '';
    M_box.pagination({
        pageCount: totalpage,
        current: page,
        coping: true,
        callback: function (index) {
            if (orderState == '') {
                orderState = $('.table th').eq(2).attr('cond');
            }
            getViewInfoPage(index, orderState, modelState);
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
        $(".view_manager").find("tbody").empty();
        getViewInfoPage(Number(page), orderState, modelState);
    });

    //点击排序，发送请求，并给分页添加事件
    function getViewInfoPage(page, order, mode) {
        $.post('/iwherelink/indexTable/getAll.do',
            {
                page: page,
                order: order,
                mode: mode
            },
            function (data) {
                if (data.code == 0) {
                    $(".listNum span").text(data.data.totalNum);
                    if (data.data.page > 0) {
                        var tr = showViewInfoPage(data.data.data);
                        $(".view_manager").find("tbody").append(tr);
                        $('.M-box').attr({"totalnum": data.data.totalNum});

                        $(".missList  span").text(data.data.totalNum);
                        M_box.pagination({
                            pageCount: data.data.totalPage,
                            current: data.data.page,
                            coping: true,
                            callback: function (index) {
                                var condition = $('.table').find('.icon-chevron-down').parent().parent().attr('cond');
                                var order;
                                var mode;
                                if (condition == undefined) {
                                    order = $('.table th').eq(2).attr('cond');
                                    mode = 0;
                                }
                                else {
                                    order = condition;
                                    mode = 1;
                                }
                                getViewInfoPage(index, order, mode);
                            }
                        });
                    } else {
                        $(".view_manager").find("tbody").empty();
                        $(".view_manager").find("tbody").append("<tr><td colspan='12' class='text-center'>暂无数据</td></tr>");
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
        $.each(value, function (n, data) {
            var span = '';
            var btns = '';
            var indexTypeText = '';
            var codeTypeText = '';
            var sourceTypeText = '';
            if (data.status == 0) {
                span = '<span style="background:green;"></span>';
                btns = "<span class='non_active_status addService status' >已开启</span>";
            }
            else {
                span = '<span style="background:red;"></span>';
                btns = "<a class='active_status addService status' status='1'>开启</a>";
            }
            var layerText = '';
            if (data.layer) {
                layerText = data.layer;
            }
            else {
                layerText = '-';
            }
            switch (data.indexType) {
                case 0:
                    indexTypeText = "原表索引";
                    break;
                case 1:
                    indexTypeText = "索引大表";
                    break;
                default :
                    indexTypeText = "其他";
                    break;
            }
            switch (data.codeType) {
                case 1:
                    codeTypeText = "点编码";
                    break;
                case 2:
                    codeTypeText = "矩形编码";
                    break;
                default :
                    codeTypeText = "其他";
                    break;
            }
            switch (data.sourceType) {
                case "db":
                    sourceTypeText = "数据库";
                    break;
                case "ws":
                    sourceTypeText = "服务";
                    break;
                default :
                    sourceTypeText = "其他";
                    break;
            }
            tr += "<tr>";
            var td = '<td class="text-center"><input type="checkbox" value=' + data.id + ' /></td>';
            td += "<td class='text-center linkStatus'>" + span + "</td>";
            td += "<td class='text-center'>" + indexTypeText + "</td>";
            td += "<td class='text-center' value=" + data.id + "'>" + data.name + "</td>";
            td += "<td class='text-center'>" + sourceTypeText + "</td>";
            td += "<td class='text-center'>" + data.tableName + "</td>";
            td += "<td class='text-center'>" + codeTypeText + "</td>";
            td += "<td class='text-center'>" + layerText + "</td>";
            td += "<td class='text-center'>" + data.createTime + "</td>";
            td += "<td class='text-center'>" + btns + "</td>";
            td += "<td class='text-center'><a class='update'  href='javascript:;'>更新</a></td>";
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
    $('table').on('click', '.update', function () {
        var id = $(this).parents('td').siblings().last().text();
        console.log(111);
        update(id)

    })
    function update(id){
        $.ajax({
            type: "post",
            url: "/iwherelink/indexTable/updateIndex.do",
            data: {
                id: id
            },
            dataType: 'json',
            success: function (data) {
                if (data.code == 0) {
                    layer.alert(data.message);
                }
            },
            error: function () {
                layer.alert("更新失败");
            }
        });
    }
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
        var len = ids.length;
        $.ajax({
            type: "post",
            url: "/iwherelink/indexTable/delete.do",
            data: {
                id: ids
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
                        getViewInfoPage(nowPage, orderState, modelState);
                        staticsData();
                    }, 2000);

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
        layer.alert('确认删除？', function (index, layerO) {
            layer.close(index);
            deleteData(viewTypeIds);
        });
    });
    //统计状态
    function staticsData() {
        $.ajax({
            type: "get",
            url: "/iwherelink/indexTable/getDataState.do",
            dataType: "json",
            success: function (data) {
                if (data.code == 0) {
                    var text = '';
                    for (var i = 0; i < data.data.length; i++) {
                        if (data.data[i].status == 1) {
                            text += '<p class="statistics" status=' + data.data[i].status + '>未开始：<span >' + data.data[i].count + '</span></p>';
                        }
                        else {   //正常
                            text += '<p class="statistics" status=' + data.data[i].status + '>已完成：<span >' + data.data[i].count + '</span></p>';
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
    $('.view_manager').on('click', '.active_status', function () {
        var curTd = $(this).parent();
        var curObj = $(this);
        var id = curTd.siblings().eq(0).find('input').val();
        var status = curObj.attr('status');
        var indexType=curTd.siblings().eq(2).val();
        if (status == "1") {  //开启
            if(indexType==0){   //原表索引
                checkIndexTask(id);
            }
            else{  //索引大表
                checkIndexTableTask(id);
            }
        }
    });
    //预检查原表索引任务
    function checkIndexTask(id) {
        var html = ' <div class="progress progress-striped active progress-success">' +
            '<div class="bar" style="width:1%"></div>' +
            '<span class="barText" style="font-size: 12px;position: relative;top: -22px;left: 0;;color: white;">1%</span>' +
            '</div>' +
            '<table class="table checkStartTable">' +
            '<thead><th>检查项</th><th>检查内容</th><th>检查结果</th></thead>' +
            '<tbody>' +
            '<tr id="1"><td>目标任务名存在性检查</td><td>主要检查目标库的目标表中是否存在有同名任务名</td><td>○</td></tr>' +
            '<tr id="2"><td>目标列名存在性检查</td><td>主要检查目标库的目标表中是否存在有同名列名</td><td>○</td></tr>' +
            '<tr id="3"><td>目标数据库连接性检查</td><td>检测数据传输服务器是否能够连通需要编码目标数据库</td><td>○</td></tr>' +
            '<tr id="4"><td>目标权限检查</td><td>检查用户权限是否可以对目标编码表具有读写以及改动表结构的权限</td><td>○</td></tr>' +
            '<tr id="5"><td>目标编码字段检查</td><td>检查编码字段是否与编码类型中要求的一致</td><td>○</td></tr>' +
            '</tbody>' +
            '</table>' +
            '<p style="display:none;color: #ff3636;margin-top: 60px;" class="text-center">检查没有通过，请按照检查结果修改</p>';
        var postData={
            id:id
        };
        layer.open({
            title: ['预检查', 'font-size:16px', 'font-weight:500'],
            content: html,
            btn: ['启动', '取消'],
            area: ['715px', '500px'],
            success: function (layero, index) {
                var websocket;
                var websocketData;
                websocket = new SockJS("/websocket/checkIndex/sockjs?TOKEN=db");
                websocket.onopen = function (event) {
                    console.log("onopen:");
                    websocket.send(JSON.stringify(postData));
                };
                websocket.onmessage = function (event) {
                    websocketData = JSON.parse(event.data);
                    console.log(websocketData);
                    //开始填充检测内容
                    updataAllCheckResult(websocketData);
                };

                websocket.onerror = function (event) {
                    console.log("onerror:");
                    console.log(event);
                };

                websocket.onclose = function (event) {
                    console.log("onclose:");
                };
            },
            yes: function (index) {
                var table = $('.checkStartTable');
                var errorResult = table.find('.errorRed');
                var checking=table.find('.checking');
                if(errorResult.length>0||checking.length>0){
                    table.next().show();
                }
                else{
                	console.log(id);
                    startIndexTask(id);
                }
            }
        });
    }

    //预检查索引大表任务
    function checkIndexTableTask(id) {
        var html = ' <div class="progress progress-striped active progress-success">' +
            '<div class="bar" style="width:1%"></div>' +
            '<span  class="barText" style="font-size: 12px;position: relative;top: -22px;left: 0;color: white;">1%</span>' +
            '</div>' +
            '<table class="table checkStartTable">' +
            '<thead><th>检查项</th><th>检查内容</th><th>检查结果</th></thead>' +
            '<tbody>' +
            '<tr id="1"><td>目标任务名存在性检查</td><td>主要检查目标库的目标表中是否存在有同名任务名</td><td>○</td></tr>' +
            '<tr id="2"><td>源数据库连接性检查</td><td>检测数据传输服务器是否能够连通需要编码源数据数据库</td><td>○</td></tr>' +
            '<tr id="3"><td>索引大表连接性检查</td><td>检测数据传输服务器是否能够连通索引大表所在数据库</td><td>○</td></tr>' +
            '<tr id="4"><td>源数据库权限检查</td><td>检查用户权限是否可以对源数据表具有读权限</td><td>○</td></tr>' +
            '<tr id="5"><td>编码字段检查</td><td>检查编码字段是否与编码类型中要求的一致</td><td>○</td></tr>' +
            '<tr id="6"><td>索引大表重复性检查</td><td>检测源数据是否已经存在索引大表中</td><td>○</td></tr>' +
            '</tbody>' +
            '</table>' +
            '<p style="display:none;color: #ff3636;margin-top: 60px;" class="text-center">检查没有通过，请按照检查结果修改</p>';
        var postData={
          id:id
        };
        layer.open({
            title: ['预检查', 'font-size:16px', 'font-weight:500'],
            content: html,
            btn: ['启动', '取消'],
            area: ['715px', '500px'],
            success: function (layero, index) {
                var websocket;
                var websocketData;
                websocket = new SockJS("/websocket/checkIndexTable/sockjs?TOKEN=db");
                websocket.onopen = function (event) {
                    console.log("onopen:");
                    websocket.send(JSON.stringify(postData));
                };
                websocket.onmessage = function (event) {
                    websocketData = JSON.parse(event.data);
                    //console.log(websocketData);
                    //开始填充检测内容
                    updataCheckResult(websocketData.data.checkTaskNameRepeat, "1", "16");
                    updataCheckResult(websocketData.data.checkConnection, "2", "32");
                    updataCheckResult(websocketData.data.checkIndexConnection, "3", "48");
                    updataCheckResult(websocketData.data.checkAuthority, "4", "64");
                    updataCheckResult(websocketData.data.checkColumn, "5", "80");
                    updataCheckResult(websocketData.data.checkIndexRepeat, "6", "100");
                };
                websocket.onerror = function (event) {
                    console.log("onerror:");
                    console.log(event);
                };

                websocket.onclose = function (event) {
                    console.log("onclose:");
                };
            },
            yes: function () {
                var table = $('.checkStartTable');
                var errorResult = table.find('.errorRed');
                var checking=table.find('.checking');
                if(errorResult.length>0||checking.length>0){
                    table.next().show();
                }
                else{
                    startIndexTableTask(JSON.stringify(postData));
                }
            }
        });
    }

    //启动原表索引任务
    function startIndexTask(data1) {
        $.ajax({
            url: '/iwherelink/indexTable/runIndex.do',
            type: 'post',
            dataType: 'json',
            data: {
            	id:data1
            }
        });
        layer.msg('启动成功');
    }

    //启动索引大表索引任务
    function startIndexTableTask(data) {
        $.ajax({
            url: '/iwherelink/indexTable/runIndexTable.do',
            type: 'post',
            dataType: 'json',
            data: data
        });
        layer.msg('启动成功');
    }

    //一次性更新全部检查结果
    function updataAllCheckResult(data) {
        var table = $('.checkStartTable');
        var checkTaskNameRepeatTd = table.find('tr[id="1"]').find('td').last();
        var checkColumnNameRepeatTd = table.find('tr[id="2"]').find('td').last();
        var checkConnectionTd = table.find('tr[id="3"]').find('td').last();
        var checkAuthorityTd = table.find('tr[id="4"]').find('td').last();
        var checkColumnTd = table.find('tr[id="5"]').find('td').last();
        updateSingleCheckResult(data.data.checkTaskNameRepeat, checkTaskNameRepeatTd, '20');
        updateSingleCheckResult(data.data.checkColumnNameRepeat, checkColumnNameRepeatTd, '40');
        updateSingleCheckResult(data.data.checkConnection, checkConnectionTd, '60');
        updateSingleCheckResult(data.data.checkAuthority, checkAuthorityTd, '80');
        updateSingleCheckResult(data.data.checkColumn, checkColumnTd, '100');
    }

    //更新单个检查结果
    function updateSingleCheckResult(result, td, percent) {
        var table = $('.checkStartTable');
        var bar = $('.bar');
        var barText=$('.barText');
        switch (result) {
            case 0:
                td.text("√").removeClass('errorRed').removeClass('checking');
                bar.css("width", percent + '%');
                barText.text(percent+ '%').css('left', Number(percent) - 5 + '%');
                break;
            case 1:
                td.text("×").addClass('errorRed').removeClass('checking');
                bar.css("width", percent + '%');
                barText.text(percent+ '%').css('left', Number(percent) - 5 + '%');
                break;
            default:
                td.text("○").addClass('checking').removeClass('errorRed');
                bar.css("width", Number(percent) - 20 + '%');
                barText.text(percent+ '%').css('left', Number(percent) - 5 + '%');
                break;
        }

        var errorResult = table.find('.errorRed');
        if (errorResult.length > 0) {
            table.next().show();
            $('.layui-layer-btn0').addClass('btn').prop('disabled',true).css('cursor','not-allowed');
            $('.progress').addClass('progress-danger').removeClass('active').removeClass('progress-striped').removeClass('progress-success');
        }
        else {
            table.next().hide();
            $('.layui-layer-btn0').removeClass('btn').prop('disabled',false).css('cursor','pointer');
            $('.progress').removeClass('active').removeClass('progress-striped').removeClass('progress-danger').addClass('progress-success');
        }

    }

    //更新检测结果
    function updataCheckResult(data, id, percent) {
        //如何让结果==2时，进度条停下来？？？
        var table = $('.checkStartTable');
        var bar = $('.bar');
        var barText=$('.barText');
        switch (data) {
            case 0:
                table.find('tr[id="' + id + '"]').find('td').last().text("√").removeClass('errorRed').removeClass('checking');
                bar.css("width", percent + '%');
                barText.text(percent+ '%').css('left', Number(percent) - 5 + '%');
                break;
            case 1:
                table.find('tr[id="' + id + '"]').find('td').last().text("×").addClass('errorRed').removeClass('checking');
                bar.css("width", percent + '%');
                barText.text(percent+ '%').css('left', Number(percent) - 5 + '%');
                break;
            default:
                table.find('tr[id="' + id + '"]').find('td').last().text("○").addClass('checking').removeClass('errorRed');
                bar.css("width", Number(percent) - 20 + '%');
                barText.text(percent+ '%').css('left', Number(percent) - 5 + '%');
                break;
        }
        var errorResult = table.find('.errorRed');
        if (errorResult.length > 0) {
            table.next().show();
            $('.layui-layer-btn0').addClass('btn').prop('disabled',true).css('cursor','not-allowed');
            $('.progress').addClass('progress-danger').removeClass('active').removeClass('progress-striped').removeClass('progress-success');
        }
        else {
            table.next().hide();
            $('.layui-layer-btn0').removeClass('btn').prop('disabled',false).css('cursor','pointer');
            $('.progress').removeClass('active').removeClass('progress-striped').removeClass('progress-danger').addClass('progress-success');
        }
        //console.log(percent);
    }

    //查看详情 checkDetails
    $('.view_manager').on('click', '.checkDetails', function () {
        var id = $(this).parent().siblings().eq(0).find('input').val();
        ajaxDetails(id, detailLayer);
    });
    //加载查看详情数据
    function ajaxDetails(id,fn){
        $.ajax({
            type: "get",
            url: "/iwherelink/indexTable/get.do",
            dataType: "json",
            data: {
                id: Number(id)
            },
            success: function (data) {
                fn&&fn(data);
            },
            error: function () {
                alert("请求失败！")
            }
        });
    }
    //查看详情弹窗数据拼接
    function detailLayer(data){
        if (data.code == 0) {
            var status = '';
            if (data.data.status == '0') {
                status = '已启动';
            }
            else {
                status = '未启动';
            }
            var codeColumn;
            var codeType;
            var indexTypeText;
            var layerText;
            var codeColumnObj;
            if(typeof (data.data.codeColumn)=='object'){
                codeColumnObj=data.data.codeColumn;
            }
            else{
                codeColumnObj=JSON.parse(data.data.codeColumn);
            }
            if (data.data.codeType == 2) {
                codeType = "矩形编码";
                codeColumn="<span>左上角经度=></span>"+codeColumnObj.leftLng+"<br /><span>左上角纬度=></span>"+codeColumnObj.leftLat+"" +
                    "<br /><span>右下角经度=></span>"+codeColumnObj.rightLng +"<br /><span>右下角纬度=></span>"+codeColumnObj.rightLat;
            }
            else {
                codeType = "点编码";
                codeColumn = "<span>经度=></span>" + codeColumnObj.lng + "<br /><span>纬度=></span>" + codeColumnObj.lat;
            }
            var columnName;
            switch (data.data.indexType) {
                case 0:
                    indexTypeText = "原表索引";
                    layerText = '<dt>编码层级：</dt><dd>' + data.data.layer + '</dd>';
                    break;
                case 1:
                    indexTypeText = "索引大表";
                    layerText = '';
                    break;
                default :
                    indexTypeText = "其他";
                    break;
            }
            if (data.data.columName !== undefined ) {
                if( data.data.columName !== ''){
                    columnName = '<dt>列名：</dt><dd>' + data.data.columName + '</dd>';
                }
                else{
                    columnName = '<dt>列名：</dt><dd>null</dd>';
                }
            }
            else {
                columnName = '';
            }
            var sourceType;
            if (data.data.sourceType) {
                var sourceTypeText;
                switch (data.data.sourceType) {
                    case 'db':
                        sourceTypeText = '数据库';
                        break;
                    case 'ws':
                        sourceTypeText = '服务';
                        break;
                    default:
                        sourceTypeText = '其他';
                        break;
                }
                sourceType = '<dt>数据源类型：</dt><dd>' + sourceTypeText + '</dd>';
            }
            else {
                sourceType = '';
            }
           var createTime;
            if( data.data.createTime==''){
                createTime='null';
            }
            else{
                createTime= data.data.createTime;
            }
            var html = '<dl class="dl-horizontal">' +
                '<dt>任务名称：</dt><dd>' + data.data.name + '</dd>' +
                '<dt>任务类型：</dt><dd>' + indexTypeText + '</dd>' +
                '<dt>任务状态：</dt><dd>' + status + '</dd>' +

                sourceType +
                '<dt>数据库地址：</dt><dd>' + data.data.source.sourceUrl + '</dd>' +
                '<dt>用户名：</dt><dd>' + data.data.source.userName + '</dd>' +
                '<dt>数据表名称：</dt><dd>' + data.data.tableName + '</dd>' +
                columnName +
                '<dt>编码类型：</dt><dd>' + codeType + '</dd>' +
                layerText +
                '<dt>编码字段：</dt><dd>' + codeColumn + '</dd>' +
                '<dt>数据量：</dt><dd>' + data.data.count + '</dd>' +
                '<dt>创建时间：</dt><dd>' + createTime + '</dd>' +
                '</dl>';
            layer.open({
                type: 1,
                content: html,
                title: ['索引任务详情', 'background:#4b8df8;color:white;font-size:16px;'],
                maxmin: true,
                area: ['600px', '500px'],
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
    }

    //筛选
    //$("#selectViewName").change(function () {
    //    var condition = $(".view_manager").find("th").eq(2).attr("cond");
    //    console.log(condition);
    //    $(".view_manager").find("tbody").empty();
    //    getViewInfoPage(1, condition, 0);
    //});

});
