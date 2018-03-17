// JavaScript Document
 //遮罩和弹窗隐藏
    function layerHide() {
        $(".change-message").hide();
        $(".add-new").hide();
        $(".tablebg-grey").hide();
        $('.error-tipMsg').hide();
        $('.error-tipMsg').text("");
    }
$(document).ready(function (e) {
    $('.page-sidebar').mCustomScrollbar();
    //数值计算
    $(".tablebg-grey").width($(window).width());
    $(".tablebg-grey").height($(window).height() - 60);
    $(window).resize(function () {
        $(".tablebg-grey").width($(window).width());
        $(".tablebg-grey").height($(window).height() - 60);
    });
    $('.page-header-fixed').height($(window).height() - 60);
    //半透明灰色背景
    $(".tablebg-grey").hide();
    //0323 查询条件设置
    var addCriteria = '<tr class="">' +
        '<td class="tjmc">' +
        '<select>' +
        '<option>条件名称</option>' +
        '<option>条件名称</option>' +
        '</select>' +
        '</td>' +
        '<td class="text-center zdlx">' +
        '<select>' +
        '<option>字段类型</option>' +
        '<option>字段类型</option>' +
        '</select>' +
        '</td>' +
        '<td class="isShow text-center">' +
        '<select>' +
        '<option>是</option>' +
        '<option>否</option>' +
        '</select>' +
        '</td>' +
        '<td class="text-center">' +
        '<a class="criteria-edit" href="javascript:;"></a>' +
        '</td>' +
        '<td class="text-center">' +
        '<a class="delete" href="javascript:;"></a>' +
        '</td>' +
        '</tr>';
    $(".criteria-edit").click(function () {
        $(this).parent("td").siblings(".isShow").children("select").removeAttr("disabled");
    });
    $(".add-tr").delegate(".criteria-edit", "click", function () {
        $(this).parent("td").siblings(".isShow").children("select").removeAttr("disabled");
    });

    $("#keep-criteria").click(function () {
        var tjmc = $(".tjmc select").val();
        var zdlx = $(".zdlx select").val();
        $(".isShow select").attr("disabled", "disabled");
        $(".criteria-edit").text("修改");
        $(".delete").text("删除");
        $(".tjmc").text(tjmc);
        $(".zdlx").text(zdlx);
    });
    $("#add-criteria").click(function () {
        $(".add-tr").append(addCriteria);
    });
    $("#cancel-criteria").click(function () {
        $(".set-criteria").hide();
        $(".tablebg-grey").hide();
    });
    //form show
    $("#sample_editable_1_new").click(function () {

        $(".add-new").show();

        $(".add-new").find('form em').next('span').hide();
        $(".tablebg-grey").show();
        $(".input-text input").val("");
        $('.error-tipMsg').text("");
        $('.error-tipMsg').hide();
        $('.add-new form select').find('option[value="0"]').attr('selected', true);
    });
    $("#sample_editable_1_set").click(function () {
        $(".set-criteria").show();
        $(".tablebg-grey").show();
        //$(".input-text input").val("");
    });
    //-----------------------------表格判断-----------------------------
    $(".add-new h4 img").click(function () {
        $(".add-new").hide();
        $(".tablebg-grey").hide();
    });
    $(".change-message h4 img").click(function () {
        $(".change-message").hide();
        $(".tablebg-grey").hide();
    });
    $(".cancel").click(function () {

        $(".change-message").hide();
        $(".tablebg-grey").hide();

    });
    $(".addCancel").click(function () {
        $(".add-new").hide();
        $(".tablebg-grey").hide();


    });
    //form content
    $(".add-new form").submit(function () {
        var name = $(".add-new form input").val();
        if (!$.trim(name)) {
            alert('内容不能为空');
            return false;
        }
    });
    $(".add-new form input").keydown(function () {
        $(this).next().next().hide();
        $('.error-tipMsg').text("");
        $('.error-tipMsg').hide();
    });
    $(".add-new form select").focus(function () {
        $(this).next().next().hide();
        $('.error-tipMsg').text("");
        $('.error-tipMsg').hide();
    });
    $(".change-message form").submit(function () {
        var name = $(".change-message form input").val();
        if (!$.trim(name)) {
            alert('内容不能为空');
            return false;
        }
    });
    $(".change-message form input").focus(function () {
        $(this).next().next("span").hide();
        $('.error-tipMsg').text("");
        $('.error-tipMsg').hide();
    });
    $(".change-message form select").focus(function () {
        $(this).next().next().hide();
        $('.error-tipMsg').text("");
        $('.error-tipMsg').hide();
    });
    //form move
    $(".add-new h4").mousedown(function (event) {
        var isMove = true;
        var an_x = event.pageX - $(".add-new").offset().left - 350;
        var an_y = event.pageY - $(".add-new").offset().top;
        $(document).mousemove(function (event) {
            var topDis = event.pageY - an_y;
            if (isMove && topDis > 55) {
                $(".add-new").css({ 'left': event.pageX - an_x, 'top': event.pageY - an_y });
            }
        }).mouseup(function () {
            isMove = false;
        });
    });
    $(".change-message h4").mousedown(function (event) {
        var isMove = true;
        var cm_x = event.pageX - $(".change-message").offset().left - 350;
        var cm_y = event.pageY - $(".change-message").offset().top - 255;
        $(document).mousemove(function (event) {
            if (isMove) {
                $(".change-message").css({ 'left': event.pageX - cm_x, 'top': event.pageY - cm_y });
            }
        }).mouseup(function () {
            isMove = false;
        });
    });
    $(".set-criteria h4").mousedown(function (event) {
        var isMove = true;
        var cm_x = event.pageX - $(".set-criteria").offset().left - 350;
        var cm_y = event.pageY - $(".set-criteria").offset().top - 255;
        $(document).mousemove(function (event) {
            if (isMove) {
                $(".change-message").css({ 'left': event.pageX - cm_x, 'top': event.pageY - cm_y });
            }
        }).mouseup(function () {
            isMove = false;
        });
    });
    //delete
    $(".add-tr").delegate(".delete", "click", function () {
        if (confirm("确认删除？") == true) {
            $(this).parents("tr").remove();
            alert("数据已删除");
        } else {
            return;
        }
    });
    //-----------------------------表格判断-----------------------------

    //---------------------------后台返回值触发页面跳转-----------------------
    //获取url
    //window.location.href;
    //获取url中的参数
    (function ($) {//jquery扩展 jquery获取url参数  url:...?open=1
        $.getUrlParam = function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
            var r = window.location.search.substr(1).match(reg); //匹配目标参数
            if (r != null) return unescape(r[2]);
            return null;//返回参数值
        }
    })(jQuery);
    var open = $.getUrlParam('open');
    if (open == 1) {
        $(".add-new").show();
        $(".tablebg-grey").show();
    }
});
/*-------------全局函数---------*/

//显示分页
function showPagination(data) {
    $(".pagination ul").empty();
    var li = "";
    li += "<li><a ><i class='icon-long-arrow-left'> </i> </a></li>";
    for (var i = 1; i <= data; i++) {
        li += "<li><a>" + i + "</a></li>";
    }
    li += "<li><a><i class='icon-long-arrow-right'> </i> </a></li>";
    if (data > 1)
        $(".pagination ul").append(li);
}

//全选与反选
var selectAllBtn = $('#select_all');
selectAllBtn.click(function () {
    var allCheckBoxs = selectAllBtn.parents('thead').next().find('input[type="checkbox"]');
    allCheckBoxs.each(function () {
        $(this).prop("checked", selectAllBtn.prop("checked"));
    })
});
$('table').on('click', 'input[type="checkbox"]', function () {
    var allCheckBoxs = $('tbody').find('input[type="checkbox"]');
    var isSelected = true;
    for (var i = 0; i < allCheckBoxs.length; i++) {
        if (allCheckBoxs.eq(i).prop("checked") == false) {
            isSelected = false;
        }
    }
    selectAllBtn.prop("checked", isSelected);
});


//删除表格数据
function del(obj) {
    if (confirm("确认删除当前数据？") == true) {
        var flag = $("#del").val();
        var deletedatabaseid = $(obj).parents("tr").find("td:nth-child(6)").find("input").val();
        if (flag == "delDB") {
            $.ajax({
                type: "post",
                url: "/iwherelink/deleteDatabaseById.do",
                data: {
                    deletedatabaseid: deletedatabaseid,

                    databasename: $(obj).parents("tr").find("td:nth-child(2)")
                        .text(),
                    databaseurl: $(obj).parents("tr").find("td:nth-child(3)")
                        .text(),
                    databaseusername: $(obj).parents("tr").find(
                        "td:nth-child(4)").text(),
                    databaseType: $(obj).parents("tr").find("td:nth-child(4)")
                        .text(),
                    flag: "delDB"
                },
                success: function (datas) {
                    if (datas != "false") {
                        $(obj).parents("tr").remove();
                        // $.ajax({
                        // type : "post",
                        // url : "getDatabasePageBySelect.do",
                        // });
                        alert("数据库已删除！");
                    } else {
                        alert("由于存在表信息，数据库无法删除！");
                    }

                },
                error: function () {

                    alert("未知错误");
                }
            });
        }
        if (flag == "delCol") {
            if ($(".database-type").val() == "选择数据表") {
                alert("请指定所在数据库、数据表");
                return;
            }
            $.ajax({
                type: "post",
                url: "/iwherelink/deleteColumn.do",
                data: {
                    databaseinfo: $(".database-type").val(),
                    columnname: $(obj).parents("tr").find("td:nth-child(1)")
                        .text(),
                    columntype: $(obj).parents("tr").find("td:nth-child(2)")
                        .text(),
                    flag: "delCol"
                },
                success: function (data) {
                    $(obj).parents("tr").remove();
                    alert("字段已成功删除！");
                }

            });
        }
        if (flag == "delTable") {
            $.ajax({

                type: "post",
                url: "/iwherelink/deleteTableBydbType_dbName.do",
                data: {
                    tablename: $(obj).parents("tr").find("td:nth-child(1)")
                        .text(),
                    tableId: $(obj).parents("tr").find("td:nth-child(3)")
                        .text(),

                    flag: "delTable"
                },
                success: function (data) {

                    // 如果表有很多，会分页，单独删除这一行的话后边的数据会不会前移，下一页的数据会不会在本页显示相应的条数
                    if (data == "true") {
                        $(obj).parents("tr").remove();
                        alert("表已成功删除！");
                        // location.href="gpetAllDatabaseTablesPage.do?pageNo=1";
                    } else if (data == "false") {
                        alert("由于存在字段信息，表无法删除！");
                    }
                },
                error: function () {
                    alert("由于存在字段信息，表无法删除！");
                }

            });
        }
        //数据库类型的删除处理
        if (flag == "delSource") {
            var databaseTypeId = $(obj).parents("tr").find("td:nth-child(1)").find("input").val();
            if (typeof (databaseTypeId) == 'undefined' || databaseTypeId == '' || databaseTypeId == null) {
                alert("当前数据库类型存在异常,请刷新页面重新操作!");
                return;
            }
            $.ajax({
                type: "post",
                url: "/iwherelink/deleteDBType.do",
                data: {
                    databaseTypeId: databaseTypeId,
                    flag: "delSource"
                },
                success: function (data) {
                    if ("SUCCESS" == data) {
                        alert("删除成功!");
                        location.href = "getAllDBTypePage.do";
                    } else if ("FAIL" == data) {
                        alert("很遗憾地告诉您,删除失败,请稍后再做操作!");
                        return;
                    } else if ("RELATION" == data) {
                        alert("很遗憾地告诉您,请先删除绑定的数据类型相关数据后,再做删除操作!");
                        return;
                    } else if ("EXCEPTION" == data) {
                        alert("很遗憾地告诉您,删除操作出现异常,请稍后再做操作!");
                        return;
                    }
                },
                error: function () {
                    alert("数据库类型存在异常,暂时无法删除,请稍后再做操作!");
                    return;
                }
            });
        }
        if (flag == "dictionary") {
            $.ajax({
                type: "post",
                url: "/iwherelink/delColumn.do",
                data: {
                    databaseId: $(obj).parents("tr").find("td:first").text()
                },
                success: function (data) {
                    alert("成功删除！");
                    location.href = "getAllDictionaryPage.do";
                },
                error: function () {
                    alert("无法删除!");
                }
            });
        }
        //字典聚类
        if (flag == "conditionType") {
            $.ajax({
                type: "post",
                url: "/iwherelink/deleteConditionType.do",
                data: {
                    conditionTypeIds: [obj]
                },
                traditional: true,
                success: function (data) {
                    if ("NOTFOUND" == data) {
                        alert("很遗憾地告诉您,当前字典聚类数据已经失效,烦请刷新页面后再做查看!");
                        location.href = "/getConditionDictionaryTypePage.do";
                    } else if ("SUCCESS" == data) {
                        alert("删除成功!");
                        location.href = "/getConditionDictionaryTypePage.do";
                    } else if ("FAIL" == data) {
                        alert("很遗憾地告诉您,字典聚类数据删除失败,请稍后再做操作!");
                        return;
                    } else if ("RELATION" == data) {
                        alert("很遗憾地告诉您,请先删除绑定的字典聚类相关数据后,再做删除操作!");
                        return;
                    } else if ("EXCEPTION" == data) {
                        alert("很遗憾地告诉您,删除操作出现异常,请稍后再做操作!");
                        return;
                    }
                },
                error: function () {
                    alert("当前字典聚类数据存在错误,烦请稍后再做操作!");
                    return;
                }
            });
        }
        //角色
        if (flag == "delRole") {
            $.ajax({
                type: "post",
                url: "/iwherelink/deleteConditionType.do",
                data: {
                    conditionTypeId: obj
                },
                success: function (data) {
                    if ("NOTFOUND" == data) {
                        alert("很遗憾地告诉您,当前字典聚类数据已经失效,烦请刷新页面后再做查看!");
                        location.href = "/role_cfg";
                    } else if ("SUCCESS" == data) {
                        alert("删除成功!");
                        location.href = "/role_cfg";
                    } else if ("FAIL" == data) {
                        alert("很遗憾地告诉您,字典聚类数据删除失败,请稍后再做操作!");
                        return;
                    } else if ("RELATION" == data) {
                        alert("很遗憾地告诉您,请先删除绑定的字典聚类相关数据后,再做删除操作!");
                        return;
                    } else if ("EXCEPTION" == data) {
                        alert("很遗憾地告诉您,删除操作出现异常,请稍后再做操作!");
                        return;
                    }
                },
                error: function () {
                    alert("当前字典聚类数据存在错误,烦请稍后再做操作!");
                    return;
                }
            });
        }
        //服务
        if (flag == "delAccessWs") {
            var id = $(obj).parents("tr").find("td:eq(0)").find("input").val();
            $.ajax({
                type: "post",
                url: "/iwherelink/deleteAccessWS.do",
                data: {
                    "ids": [id]
                },
                traditional: true,
                success: function (data) {
                    if ("NOTFOUND" == data) {
                        alert("很遗憾地告诉您,当前字典聚类数据已经失效,烦请刷新页面后再做查看!");
                        location.href = "/acsServices_cfg";
                    } else if ("SUCCESS" == data) {
                        alert("删除成功!");
                        location.href = "/acsServices_cfg";
                    } else if ("FAIL" == data) {
                        alert("很遗憾地告诉您,字典聚类数据删除失败,请稍后再做操作!");
                        return;
                    } else if ("RELATION" == data) {
                        alert("很遗憾地告诉您,请先删除绑定的字典聚类相关数据后,再做删除操作!");
                        return;
                    } else if ("EXCEPTION" == data) {
                        alert("很遗憾地告诉您,删除操作出现异常,请稍后再做操作!");
                        return;
                    }
                },
                error: function () {
                    alert("当前字典聚类数据存在错误,烦请稍后再做操作!");
                    return;
                }
            });
        }

    } else {
        return;
    }
}
//隐藏弹窗
function hidePropLayer(clazz) {
    if (typeof (clazz) != 'undefined' && null != clazz && '' != clazz) {
        $("." + clazz).hide();//要隐藏的层
        $(".tablebg-grey").hide();//遮罩层
    }
}
/*----------------以下为字典设置和字典映射关系设置的部分公用的js------------------------*/

//切换全部业务场景，请求对应的全部字典聚类数据
$(".sourceTypeList").change(function () {
    $(".dictionaryTypeList").find("option[value!='0']").remove("option");
    var sourceTypeId = $(this).val();

    //为了能够公用对应的数据,此处加一个标识区分
    $.ajax({
        type: "post",
        url: "/iwherelink/getConditionDictionaryTypeBySourceType.do",
        dataType: "json",
        data: {
            pageNo: 1,
            id: sourceTypeId
        },
        success: function (data) {
            var option = "";
            $.each(data, function (n, value) {
                option += "<option value='" + value.id + "'>" + value.typeName + "</option>";
            });
            $(".dictionaryTypeList").append(option);
            changeDirctionaryList();
        },
        error: function () {
            alert("加载字典聚类失败！");
        }
    });
});

//切换全部字典聚类，在表格显示不同的数据
$(".dictionaryTypeList").change(function () {
    changeDirctionaryList();
});

function changeDirctionaryList(page) {
    var sourceTypeId = $("#conditionInfo_sourceType").val();
    var dictionaryTypeId = $("#conditionInfo_dictionaryType").val();
    var columnPageListFlag = $("#column_page_list_flag").val();
    if (typeof (page) == 'undefined') {
        page = 1;
    }
    if (typeof (columnPageListFlag) != 'undefined' && null != columnPageListFlag && "" != columnPageListFlag && "column" == columnPageListFlag) {
        getDictionaryMapping(sourceTypeId, dictionaryTypeId, "", "", page);
    } else {
        getDictionaryInfo(sourceTypeId, dictionaryTypeId, "", "", page);
    }
}
function getDictionaryMapping(sourceTypeId, dictionaryTypeId, condition, sort, page) {
    $.ajax({
        type: "post",
        url: "/iwherelink/getDictionaryMappingSort.do",
        data: {
            sourceTypeId: sourceTypeId,
            dictionaryTypeId: dictionaryTypeId,
            condition: condition,
            sort: sort,
            page: page
        },
        success: function (data) {
            if (data.page > 0) {
                var tr = showDictionaryMapping(data.data);
                $(".dictionaryMapping").find("tbody").append(tr);
                /*showPagination(data.page);

                $(".pagination ul").find("li:eq(1)").addClass("active");
                $(".pagination ul").find("li").click(function () {
                    var page = parseInt($(this).text().trim());
                    var pageSize = parseInt($(".pagination ul").find("li").size() - 2);
                    if ($(this).find("i").is("i.icon-long-arrow-left")) {
                        page = parseInt($(".pagination ul").find("li.active").text().trim());
                        if (page > 1) {
                            page = page - 1;
                        }
                    } else if ($(this).find("i").is("i.icon-long-arrow-right")) {
                        page = parseInt($(".pagination ul").find("li.active").text().trim());
                        if (page < pageSize) {
                            page = page + 1;
                        }
                    }
                    getDictionaryMapping(sourceTypeId, dictionaryTypeId, condition, sort, page);
                });

                $(".pagination ul").find("li").removeClass("active").eq(page).addClass("active");*/
            } else {
                $(".dictionaryMapping").find("tbody").empty();
                //$(".pagination ul").empty();
                $(".dictionaryMapping").find("tbody").append("<tr><td colspan='9' class='text-center'>暂无数据</td></tr>");
            }
        }
    });
}

function showDictionaryMapping(data) {
    $(".dictionaryMapping").find("tbody").empty();
    var tr = "";
    var td = "";
    $.each(data, function (n, value) {
        tr += "<tr>";
        td = '<td class="text-center"><input type="checkbox" value=' + value.id + ' /></td>';
        td += "<td style='display:none' class='text-center' id=" + value.id + ">" + value.id + "</td>";
        td += "<td class='text-center'>" + value.sourceType + "</td>";
        td += "<td class='text-center'>" + value.typeName + "</td>";
        td += "<td class='text-center'>" + value.chineseName + "</td>";
        td += "<td class='text-center'>" + value.realName + "</td>";
        td += "<td class='text-center'>" + value.databaseName + "</td>";
        td += "<td class='text-center'>" + value.tableName + "</td>";
        td += "<td class='text-center'>" + value.columnName + "</td>";
        //td+="<td class='text-center'><a class='edit'  onclick='dictionary_edit("+value.id+")' href='javascript:;'>编辑</a></td>";
        td += "<td class='text-center'><a class='delete'  href='javascript:;'>删除</a></td>";
        tr += td;
        tr += "</tr>";
    });
    return tr;
}
//字典配置请求排序数据
function getDictionaryInfo(sourceTypeId, dictionaryTypeId, condition, sort, page) {
    $.ajax({
        type: "post",
        url: "/iwherelink/getConditionInfoListHtml.do",
        data: {
            sourceTypeId: sourceTypeId,
            dictionaryTypeId: dictionaryTypeId,
            condition: condition,
            sort: sort,
            page: page
        },
        success: function (data) {
            if (data.page > 0) {
                showConditionInfoTbody(data.data);
                /*showPagination(data.page);

                $(".pagination ul").find("li:eq(1)").addClass("active");
                $(".pagination ul").find("li").click(function () {
                    var page = parseInt($(this).text().trim());
                    var pageSize = parseInt($(".pagination ul").find("li").size() - 2);
                    if ($(this).find("i").is("i.icon-long-arrow-left")) {
                        page = parseInt($(".pagination ul").find("li.active").text().trim());
                        if (page > 1) {
                            page = page - 1;
                        }
                    } else if ($(this).find("i").is("i.icon-long-arrow-right")) {
                        page = parseInt($(".pagination ul").find("li.active").text().trim());
                        if (page < pageSize) {
                            page = page + 1;
                        }
                    }
                    getDictionaryInfo(sourceTypeId, dictionaryTypeId, condition, sort, page);
                });

                $(".pagination ul").find("li").removeClass("active").eq(page).addClass("active");*/
            } else {
                $(".conditionInfoByDictionary").find("tbody").empty();
                //$(".pagination ul").empty();
                $(".conditionInfoByDictionary").find("tbody").append("<tr><td colspan='9' class='text-center'>暂无数据</td></tr>");
            }
        }
    });
}
//字典配置动态生成表格数据
function showConditionInfoTbody(data) {
    $("#conditionInfolist_tbody").empty();
    var tr = "";
    var td = "";
    $.each(data, function (n, value) {
        tr += "<tr>";
        td = '<td class="text-center"><input type="checkbox" value=' + value.id + ' /></td>';
        td += "<td style='display:none' class='text-center' id=" + value.id + ">" + value.id + "</td>";
        td += "<td class='text-center'>" + value.sourceType + "</td>";
        td += "<td class='text-center'>" + value.typeName + "</td>";
        td += "<td class='text-center'>" + value.chineseName + "</td>";
        td += "<td class='text-center'>" + value.keyWord + "</td>";
        switch (value.conditionType) {
            case "11":
                td += "<td class='text-center'>文本类型</td>";
                break;
            case "12":
                td += "<td class='text-center'>时间类型</td>";
                break;
            case "13":
                td += "<td class='text-center'>滑片类型</td>";
                break;
            case "14":
                td += "<td class='text-center'>下拉框</td>";
                break;
            default:
                td += "<td class='text-center errormsg'>错误类型</td>";
                break;
        }
        switch (value.isShow) {
            case "1":
                td += "<td class='text-center'>显示</td>";
                break;
            default:
                td += "<td class='text-center'>不显示</td>";
                break;
        }
        td += "<td class='text-center'><a class='edit' href='javascript:;'>编辑</a></td>";
        td += "<td class='text-center'><a class='del' href='javascript:;'>删除</a></td>";

        tr += td;
        tr += "</tr>";
    });
    $("#conditionInfolist_tbody").append(tr);
    clickTR();
}
//设置字典的下拉框选项
$("select#dictionary_display_type").change(function () {

    var type = $(this).val();
    if (type == '14') {
        var ul = showSubList("");
        var li = "<li class='list-group-item input-append'><input type='text' class='span'/><button type='button' class='minus-btn'>×</button></li>";

        $(this).parent().after(ul);

        //		$("button.minus-btn").click(function(){
        //			alert($(this));
        ////			$(this).parent().remove("li");
        //		});
        $(".add-btn").click(function () {
            $("ul.list-group li:first").before(li);

            $("button.minus-btn").click(function () {
                if ($(this).parent("li").siblings().size() != 1) {
                    $(this).parent().remove("li");
                }

            });
        });
    } else {
        $(this).parent().next().remove("span.input-text");
    }
});
function showSubList(data) {
    var ul = "<span class='input-text'><label style='width:150px'>下拉选项</label><ul class='list-group'>";
    var btn = "<button type='button' class='add-btn'>+</button>";
    var li = "";
    if (data != "" && data != null && data.length != 0) {
        $.each(data, function (n, value) {
            li += "<li class='list-group-item input-append'><input type='text' class='span' value='" + value + "'/><button type='button' class='minus-btn'>×</button></li>";
        });
    } else {
        li = "<li class='list-group-item input-append'><input type='text' class='span'/><button type='button' class='minus-btn'>×</button></li>";
    }
    ul += btn;
    ul += li;
    ul += "</ul><p></p></span>";
    return ul;
}

//点击相应的列，显示下拉菜单的信息
function clickTR() {
    $("#conditionInfolist_tbody tr").click(function () {
        var conditionInfoDisplayType = $(this).find("td:eq(6)").text().trim();
        $(".sublist h4").html("");
        if (conditionInfoDisplayType == "下拉框") {
            var conditionName = $(this).find("td:eq(4)").text().trim();
            var conditionKW = $(this).find("td:eq(5)").text().trim();
            $(".sublist").removeClass("hidden").find("ul").empty();
            $(".sublist h4").append(conditionName + "(" + conditionKW + ")的下拉选项");
            var conditionInfoId = $(this).find("td:eq(1)").text().trim();

            var li = "<li class='list-group-item'>test</li>";
            $.ajax({
                type: "post",
                url: "/iwherelink/getAllDictInfoBycondInfoId.do",
                dataType: "json",
                data: {
                    conditionInfoId: conditionInfoId
                },
                success: function (data) {
                    if (data != "") {
                        var li = "";
                        if (data != "" && data != null && data.length != 0) {
                            $.each(data, function (n, value) {

                                li += "<li class='list-group-item'>" + value + "</li>";
                            });
                        } else {
                            li = "暂无数据";
                        }
                        $(".sublist").find("ul").append(li);
                        //可以增加单个选项的修改和删除
                        //				$(".add-btn").click(function(){
                        //					var newli="<li class='list-group-item input-append'><input type='text' class='span' /><button type='button' class='minus-btn'>×</button></li>";
                        //					$("ul.list-group li:first").before(newli);
                        //
                        //				});
                        //				$("button.minus-btn").click(function(){
                        //					if($(this).parent("li").siblings().size()!=1){
                        //						$(this).parent().remove("li");
                        //					}
                        //				});
                    } else {
                        var li = "暂无数据";
                        $(".sublist").find("ul").append(li);
                    }
                },
                error: function () {
                    //				alert("加载下拉选项失败！");
                    var li = "加载下拉选项失败！";
                    $(".sublist").find("ul").append(li);
                }
            });
        } else {
            $(".sublist").addClass("hidden");
        }
    });
}