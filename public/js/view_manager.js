/**
 * Created by Administrator on 2016/7/21.
 */
$(function () {
    //初始化侧边栏的点击事件
    $('.sub-menu a[href="./viewManager.do"]').addClass('current_page').parents('.third-level').show().parent().addClass('open');

    //初始化分页
    var M_box = $('.M-box');
    var totalpage = parseInt(M_box.attr("totalpage"));
    var page = parseInt(M_box.attr("page"));
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
    //hidePage();
    //当总页数小于等于1时隐藏页码
    //function hidePage(){
    //    if(totalpage<=1){
    //        $('.pagination').hide();
    //    }
    //}
    var errorTipMsg = $('.error-tipMsg');
//点击排序按钮，排序
    $(".view_manager").find("i").click(function () {
        var page = $(".M-box .active").text();
        if ($(this).is(".icon-chevron-up")) {
            //变成降序 DESC
            modelState = 1;
            $(".view_manager").find("i").removeClass("icon-chevron-down").addClass("icon-chevron-up");
            $(this).removeClass("icon-chevron-up").addClass("icon-chevron-down");
        } else {//变成升序 ASC
            modelState = 0;
            $(this).removeClass("icon-chevron-down").addClass("icon-chevron-up");
        }
        orderState = $(this).parents("th").attr("cond");
        $(".view_manager").find("tbody").empty();
        getViewInfoPage(Number(page), orderState, modelState);
    });
    //点击排序，发送请求，并给分页添加事件
    function getViewInfoPage(page, order, mode) {
        $.post('/iwherelink/getFuseViewList.do',
            {
                page: page,
                order: order,
                mode: mode
            },

            function (data) {
                if (data.code == 0) {
                    if (data.data.totalPage > 0) {
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
                                if (orderState == '') {
                                    orderState = $('.table th').eq(2).attr('cond');
                                }
                                getViewInfoPage(index, orderState, modelState);

                            }
                        });
                        //统计信息
                        $(".statusOff").text(data.data.off);
                        $(".statusOn").text(data.data.on);
                    } else {
                        $(".view_manager").find("tbody").empty();
                        $(".view_manager").find("tbody").append("<tr><td colspan='10' class='text-center'>暂无数据</td></tr>");
                    }
                }
                else {
                    layer.msg(data.message);
                }
            }, 'json')
    }

    //动态生成表格数据
    function showViewInfoPage(value) {

        $(".view_manager").find("tbody").empty();
        var tr = "";
        $.each(value, function (n, data) {
            var span = '';
            var start = '';
            var stop = '';
            if (data.status == 0) {

                span = '<span style="background:green;"></span>';
                btns = "<a class='non_active_status addService status' >开启</a>" +
                    "| <a class='active_status removeService status'>停止</a>";
            }
            else {
                span = '<span style="background:red;"></span>';
                btns = "<a class='active_status addService status'>开启</a>" +
                    "| <a class='non_active_status removeService status' >停止</span> ";

            }

            tr += "<tr>";
            //var td = '<td class="text-center">' + data.databaseType + '<input type="hidden" id='+ data.id +' name="databaseTypeId" value=' + data.id +' /></td>';
            var td = '<td class="text-center"><input type="checkbox" value=' + data.id + ' /></td>';
            td += "<td class='text-center linkStatus' data-message='" + data.message + "'>" + span + "</td>";
            td += "<td class='text-center' value='" + data.name + "'>" + data.name + "</td>";
            td += "<td class='text-center'>" + data.froms + "</td>";
            td += "<td class='text-center'>" + data.update_date + "</td>";
            td += "<td class='text-center'>" + btns + "</td>";
            td += "<td class='text-center'><a class='lookDetail' href='javascript:;'>查看详情</a></td>";
            //td += "<td class='text-center'><a class='edit' href='javascript:;' >修改</a></td>";
            td += "<td class='text-center'><a class='delete'  href='javascript:;'>删除</a></td>";
            td += "<td class='text-center'><a class='searchTest'  href='javascript:;'>测试查询</a></td>";
            td += "<td class='text-center' style='display: none'>" + data.id + "</td>";
            tr += td;
            tr += "</tr>";
        });
        return tr;
    }

    //查看详情
    var select = "select";
    $('.view_manager').on('click', '.lookDetail', function () {
        var id = $(this).parents('td').siblings().last().text();
        console.log(id);
        lookDetail([id]);
        $(".tablebg-grey").show();
        $('.detail-content').show();
        //$('.bg').show();
    });
    $('.detail-content h4 img').click(function () {
        $(".tablebg-grey").hide();
        $('.detail-content').hide();

    });
    function lookDetail(ids) {
        var viewID = ids;
        $.ajax({
            type: 'post',
            url: '/iwherelink/getFuseViewById.do',
            data: {
                "ids": viewID,
                "mode": select
            },
            dataType:'json',
            traditional:true,
            success:function(data){
                if(data.code == 0){
                   $('.viewName').text(data.data[0].name);
                    $('.colums_source').text(data.data[0].colums);
                    $('.tab_source').text(data.data[0].froms);
                    $('.tiaojian').text(data.data[0].wheres);
                    $('.paixu').text(data.data[0].orders);
                }
            },
            error: function () {
                alert("请求失败");
                return;
            }
        })
    }

//    操作启动停止
    $('.view_manager').on('click', '.status', function () {
        var id = $(this).parents("tr").find("td:last").text();
        operateView(this);
    });
    function operateView(obj) {
        var status;
        var id = $(obj).parents("tr").find("td:last").text();
        var ids = [];
        var idView = ids.push(id);
        if ($(obj).text() == "停止") {
            status = 1;
            checkLink(id,function(){
                changeViewStatus(obj,ids,status);
            });
        } else {
            status = 0;
            changeViewStatus(obj,ids,status);
        }
    }
    //改变服务状态
    function changeViewStatus(obj,ids,status){
        $.ajax({
            type: 'post',
            url: '/iwherelink/changeFuseViewStatusById.do',
            data: {
                "ids": ids,
                "status": status
            },
            dataType: 'json',
            traditional: true,
            success: function (data) {
                if (data.code == 0) {
                    var curPage = $(".M-box").find('.active').text();
                    if (status == 0) {
                        $(obj).parents("tr").find("td:nth-child(2)").find('span').css("background", "green");
                        //$(obj).parents("tr").find("td:nth-child(6)").find('span').removeClass("non_active_status");
                        getStaticsData(curPage, "", 0);
                    } else {
                        $(obj).parents("tr").find("td:nth-child(2)").find('span').css("background", "red");
                        getStaticsData(curPage, "", 0);
                    }
                    $(obj).addClass('non_active_status');
                    $(obj).siblings().removeClass('non_active_status');
                }
            }
        })
    }

    //获取统计状态
    function getStaticsData(page, order, mode) {
        $.post('/iwherelink/getFuseViewList.do',
            {
                page: page,
                order: order,
                mode: mode
            },
            function (data) {
                if (data.code == 0) {
                    //统计信息
                    $(".statusOff").text(data.data.off);
                    $(".statusOn").text(data.data.on);
                }
                else{
                    layer.msg('获取已停用、已启用信息失败');
                }
            },'json');
    }

//查询测试
    function searchTest(obj) {
        var id = $(obj).parents('td').siblings().last().text();
        var viewId = [];
        var Id = viewId.push(id);
        $.ajax({
            type: "get",
            url: "/iwherelink/testViewById.do",
            dataType: "json",
            data: {
                "id": viewId.toString()
            },
            //traditional:true,
            success: function (data) {
                if (data.code == 0) {
                    var html = '';
                    console.log(data.data.length);
                    if (data.data.length !== 0) {
                        var tHeader = '';
                        var td = '';
                        var tr = '';
                        var tBody = '';
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
                            var currentData2 = data.data[k];
                            var currentDataAttr = [];
                            for (var attr in currentData2) {
                                currentDataAttr.push(attr);
                            }
                            //若没有当前属性，则以“noneAttr”填充
                            for (var m = 0; m < tHeaderArr.length; m++) {
                                if ($.inArray(tHeaderArr[m], currentDataAttr) < 0) {
                                    currentData2[tHeaderArr[m]] = 'noneAttr';
                                }
                            }
                            var newCurrentDataSort = objKeySort(currentData2);
                            newData.push(newCurrentDataSort);
                        }

                        //按照排好的序列拼头部
                        var newTheaderArr = tHeaderArr.sort();
                        for (var n = 0; n < newTheaderArr.length; n++) {
                            tHeader += '<th>' + newTheaderArr[n] + '</th>';
                        }
                        //拼tbody
                        tr = '';
                        for (var j = 0; j < newData.length; j++) {
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
                            tr += '<tr>' + td + '</tr>';
                        }
                        tBody = tr;
                        html = '<div><table class="table table-hover table-responsive table-bordered"><thead>' + tHeader + '</thead><tbody>' + tBody + '</tbody></table></div>';
                    }
                    else {
                        html = '暂无数据';
                    }
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
                    $('.layui-layer-content').mCustomScrollbar({
                        'axis':'xy'
                    });
                }
                else {
                    layer.alert("查询失败");
                }
            },
            error: function () {
                alert("请求失败！")
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

    $('.view_manager').on('click', '.searchTest', function () {
        searchTest(this);
    });

    //检测字典关联状态
    function checkLink(id,fn) {
        $.ajax({
            type: "post",
            url: "/iwherelink/checkViewDictRelatedServices.do",
            //url: "/testData/relation/dicRelation.json",
            dataType: "json",
            data: {
                checkedIds: [id],
                type:1
            },
            traditional:true,
            success: function (data) {
                if (data.code == 0) {
                    if (data.data.length == 0) {
                        fn&&fn();
                    }
                    else {
                        var html = '<p>仍有' + data.data.length + '个服务相关联，继续操作后关联的服务将不可用，是否继续？</p>';
                        layer.open({
                            title: '确认继续操作',
                            content: html,
                            btn: ['确认', '取消'],
                            area: ['500px', '340px'],
                            yes: function (index) {
                                layer.close(index);
                                fn&&fn();
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
        });
    }

    //删除
    $('table').on('click', '.delete', function () {
        var id = $(this).parents('td').siblings().last().text();
        layer.alert('确认删除？',function(index){
            layer.close(index);
            checkLink(id,function(){
                deleteView([id]);
            });
        });
    });
    function deleteView(ids) {
        var viewIds = ids;
        var tr = '';
        var len = ids.length;
        $.ajax({
            type: "post",
            url: "/iwherelink/deleteFuseViewById.do",
            data: {
                ids: viewIds
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

                    }, 2000);
                } else {
                    errorTipMsg.text(data.message);
                    errorTipMsg.show();
                    return;
                }
            },
            error: function () {
                alert("请求失败");
                return;
            }
        });
    }

    //批量删除
    $('#batch_del').click(function () {
        var allCheckBox = $(".view_manager tbody").find("input[type='checkbox']");
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

        layer.alert('确认删除？',function(index){
            layer.close(index);
            checkLink(viewTypeIds,function(){
                deleteMore(viewTypeIds);
            });
        });

    });
    function deleteMore(viewTypeIds) {
        var len = viewTypeIds.length;
        $.ajax({
            type: 'post',
            url: '/iwherelink/deleteFuseViewById.do',
            data: {
                "ids": viewTypeIds.toString()
            },
            //traditional: true,
            success: function (data) {
                var dataObj = JSON.parse(data);
                if (dataObj.code == 0) {
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
                        getViewInfoPage(nowPage, "", 0);
                        //staticsData();
                    }, 2000);
                } else {
                    errorTipMsg.text(data.message);
                    errorTipMsg.show();
                    return;
                }
            },
            error: function () {
                alert("请求失败");
                return;
            }
        });
    }


    //视图添加
    $('.add_view').click(function () {
        $.removeCookie('viewData');
    });
    //视图修改
    $('table').on('click', '.edit', function () {
        var id = $(this).parent().siblings().eq(0).find('input').val();
        checkLink(id,function(){
            $.ajax({
                url: '/iwherelink/getFuseViewById.do',
                //url:'/testData/viewEdit/1.json',
                //url:'/testData/viewEdit/10.json',
                //url:'/testData/viewEdit/12.json',
                //type:'post',
                type: 'get',
                dataType: 'json',
                data: {
                    ids: [id],
                    mode: 'update'
                },
                traditional: true,
                success: function (data) {
                    if (data.code == 0) {
                        $.removeCookie('viewData');
                        $.cookie.json = true;
                        $.cookie('viewData', data.data);
                        layer.msg('请求视图成功', {time: 1000});
                        setTimeout(function () {
                            window.location.href = '/createView.do';
                        }, 1000)
                    }
                    else {
                        layer.alert(data.message);
                    }
                },
                error: function () {
                    layer.msg('获取当前视图信息失败。。。');
                }
            });
        });
    });

});
