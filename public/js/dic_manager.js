$(function () {
    //初始化侧边栏的点击事件
    $('.sub-menu a[href="./dicManager.do"]').addClass('current_page').parents('.third-level').show().parent().addClass('open');

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
        $.post('/iwherelink/combine/getAll.do',
            {
                page: page,
                order: order,
                mode: mode
            },
            function (data) {
                $(".listNum span").text(data.data.totalNum);
                if (data.code == 0) {
                    if (data.data.totalPage > 0) {
                        var tr = showViewInfoPage(data.data.data);
                        $(".view_manager").find("tbody").append(tr);
                        $('.M-box').attr({"totalnum": data.data.totalNum});

                        $(".missList  span").text(data.data.totalNum);
                        M_box.pagination({
                            pageCount: data.data.totalPage,
                            current: data.data.page,
                            //coping: true,
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
                        $(".view_manager").find("tbody").append("<tr><td colspan='10' class='text-center'>暂无数据</td></tr>");
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
            if (data.status == 0) {
                span = '<span style="background:green;"></span>';
                btns = "<span class='non_active_status addService' >开启</span>" +
                    "| <a class='active_status removeService' status='0' >停止</a>";
            }
            else {
                span = '<span style="background:red;"></span>';
                btns = "<a class='active_status addService' status='1'>开启</a>" +
                    "| <span class='non_active_status removeService' >停止</span> ";
            }
            tr += "<tr>";
            var td = '<td class="text-center"><input type="checkbox" value=' + data.id + ' /></td>';
            td += "<td class='text-center linkStatus'>" + span + "</td>";
            td += "<td class='text-center' value='" + data.name + "'>" + data.name + "</td>";
            td += "<td class='text-center'>" + data.froms + "</td>";
            td += "<td class='text-center'>" + data.lasttime + "</td>";
            td += "<td class='text-center'>" + btns + "</td>";
            td += "<td class='text-center'><a class='checkDetails' href='javascript:;'>查看详情</a></td>";
            //td += "<td class='text-center'><a class='edit' href='javascript:;' >编辑</a></td>";
            td += "<td class='text-center'><a class='delete'  href='javascript:;'>删除</a></td>";
            td += "<td class='text-center'><a class='connectionCheck'  href='javascript:;'>测试连接</a></td>";
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
        layer.alert('确认删除？', function (index) {
            layer.close(index);
            checkLink(id, function () {
                deleteData([id]);
            });
        });
    });
    function deleteData(ids) {
        var len = ids.length;
        $.ajax({
            type: "post",
            url: "/iwherelink/combine/delete.do",
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
        layer.alert('确认删除？', function (index) {
            layer.close(index);
            checkLink(viewTypeIds, function () {
                deleteData(viewTypeIds);
            });
        });
    });
    //统计状态
    function staticsData() {
        $.ajax({
            type: "get",
            url: "/iwherelink/combine/statistic.do",
            //url: "/testData/changeWsStatusById.json",
            dataType: "json",
            success: function (data) {
                if (data.code == 0) {
                    var text = '';
                    for (var i = 0; i < data.data.length; i++) {
                        if (data.data[i].status == 1) {
                            text += '<p class="statistics" status=' + data.data[i].status + '>已停用：<span style="">' + data.data[i].count + '</span></p>';
                        }
                        else {   //正常
                            text += '<p class="statistics" status=' + data.data[i].status + '>已启用：<span  style="">' + data.data[i].count + '</span></p>';
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
        var status = $(this).text();
        var id = curTd.siblings().eq(0).find('input').val();
        //var status = curObj.attr('status');
        console.log(status);
        if (status == "开启") {  //开启
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
            checkLink(id, function () {
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
            });
            /*$.ajax({
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
             });*/
        }
    });
    //检测字典关联状态
    function checkLink(id, fn) {
        $.ajax({
            type: "post",
            url: "/iwherelink/checkViewDictRelatedServices.do ",
            //url: "/testData/relation/dicRelation.json",
            dataType: "json",
            data: {
                checkedIds: [id],
                type: 2
            },
            traditional: true,
            success: function (data) {
                if (data.code == 0) {
                    if (data.data.length == 0) {
                        fn && fn();
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
                                fn && fn();
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

    //查看详情 checkDetails
    $('.view_manager').on('click', '.checkDetails', function () {
        var id = $(this).parent().siblings().eq(0).find('input').val();
        //console.log(id);
        $.ajax({
            type: "get",
            url: "/iwherelink/combine/get.do",
            //url: "/testData/showServiceDetail.json",
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
                    var table = makeDetailTable(data);
                    var html = '<dl class="dl-horizontal">' +
                        '<dt>名称：</dt><dd>' + data.data.name + '</dd>' +
                        '<dt>状态：</dt><dd>' + status + '</dd>' +
                        '<dt>最后修改时间：</dt><dd>' + data.data.lasttime + '</dd>' +
                        '</dl>' +table;
                    layer.open({
                        type: 1,
                        content: html,
                        title: ['字典详情', 'background:#4b8df8;color:white;font-size:16px;'],
                        maxmin: true,
                        area: ['600px', '400px'],
                        btn: ['关闭'],
                        yes: function (index, layerO) {
                            layer.close(index);
                        }
                    })
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
        var table = "<table class='table detailTable'>";
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
            $.each(data.data.colums, function (key1, value) {
                console.log(key1);
                var flag = 0;
                for (var i = 0; i < value.length; i++) {
                    var valueArr=value[i].split('.');
                    var prex =[valueArr[0],valueArr[1],valueArr[2],valueArr[3]].join('.') ;
                    if (source == prex) {
                        var last =valueArr[4];
                            if (last == key1) {
                                td += "<td id='" + prex + "." + key1 + "' val='" + prex + "." + key1 + "'>" + key1 + "</td>";
                                flag = 1;
                            } else {
                                td += "<td id='" + prex + "." + last + "' val='" + prex + "." + last + "'>" + key1 + "(" + last + ")" + "</td>";
                                flag = 1;
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
            tBody += tr;
        }

        var html = '<p>总记录量：' + data.totalNum + '条</p><table class="table table-hover table-responsive table-bordered"><thead>' + tHeader + '</thead><tbody>' + tBody + '</tbody></table>';
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
    $('.view_manager').on('click', '.edit', function () {
        var dicId = $(this).parent().siblings().eq(0).find('input').val();
        checkLink(dicId, function () {
            $.ajax({
                type: 'get',
                url: '/iwherelink/combine/get.do',
                //url:'/testData/respo.json',
                dataType: 'json',
                data: {
                    id: dicId
                },
                success: function (data) {
                    if (data.code == 0) {
                        console.log(data.data);
                        layer.msg('请求字典成功', {time: 1000});
                        var str = JSON.stringify(data.data);
                        $.cookie('dicData', str);

                        setTimeout(function () {
                            window.location.href = '/definedDic.do';
                        }, 1000)
                    } else {
                        layer.alert(data.message);
                    }
                },
                error: function () {
                    layer.msg('获取当前字典信息失败');
                }

            });
        });
        /* $.ajax({
         type: 'get',
         url: '/iwherelink/combine/get.do',
         //url:'/testData/respo.json',
         dataType: 'json',
         data: {
         id: dicId
         },
         success: function (data) {
         if (data.code == 0) {
         console.log(data.data);
         layer.msg('请求字典成功', {time: 1000});
         var str = JSON.stringify(data.data);
         $.cookie('dicData', str);

         setTimeout(function () {
         window.location.href = '/definedDic.do';
         }, 1000)
         } else {
         layer.alert(data.message);
         }
         },
         error: function () {
         layer.msg('获取当前字典信息失败');
         }

         });
         */

    });

    //筛选
    //$("#selectViewName").change(function () {
    //    var condition = $(".view_manager").find("th").eq(2).attr("cond");
    //    console.log(condition);
    //    $(".view_manager").find("tbody").empty();
    //    getViewInfoPage(1, condition, 0);
    //});

});
