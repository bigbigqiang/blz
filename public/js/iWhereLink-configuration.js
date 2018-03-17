// JavaScript Document

$("input").bind("blur", function () {
    var value = $(this).val();//字典名称
    $(this).siblings().remove(".errormsg");
    if (typeof(value) == 'undefined' || value == '' || value == null) {
        var msg = "不能为空";
        var errormsg = "<p class='errormsg'>" + msg + "</p>";
        $(this).after(errormsg);
        return;
    }
});
//$("#update_dic").change(function(){
////	$("input#add_dic").after("<p class='errormsg'>字典名重复</p>");
////	$(".change-message").remove(".errormsg");
//	uniqueCheckByChineseName();
//});
$(".dic_name").bind("blur", function () {
//	$(this).parent().remove(".errormsg");
    var chineseName = $(this).val();
    var sourceTypeId = $(this).parent().prevAll().find(".sourceTypeList").val();//数据产品
    var dictionaryType = $(this).parent().prevAll().find(".dictionaryTypeList").val();//字典类型

    uniqueCheckByChineseName(sourceTypeId, dictionaryType, chineseName);
});

function hide_pop() {
    $(".add-new").hide();
    $(".tablebg-grey").hide();
}
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

function getDatabaseTypePage(condition, sort, page) {
    $.ajax({
        type: "post",
        url: "/iwherelink_0.1/getDatabaseTypeSorted.do",
        data: {
            condition: condition,
            sort: sort,
            page: page
        },
        success: function (data) {
            if (data.page > 0) {
                var tr = showDatabaseTypePage(data.data);
                $(".databaseType").find("tbody").append(tr);
                showPagination(data.page);
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
                    getDatabaseTypePage(condition, sort, page);
                });

                $(".pagination ul").find("li").removeClass("active").eq(page).addClass("active");
            } else {
                $(".databaseType").find("tbody").empty();
                $(".pagination ul").empty();
                $(".databaseType").find("tbody").append("<tr><td colspan='4' class='text-center'>暂无数据</td></tr>");
            }
        }
    });
}

function showDatabaseTypePage(value) {
    $(".databaseType").find("tbody").empty();
    var tr = "";
    $.each(value, function (n, data) {
        tr += "<tr>";
        var td = "<td style='display:none'>" + data.id + "</td>";
        td += "<td class='text-center'>" + data.databaseType + "</td>";
        td += "<td class='text-center'>" + data.databaseURL + "</td>";
        td += "<td class='text-center'><a class='edit' href='javascript:;'>编辑</a></td>";
        td += "<td class='text-center'><a class='delete' href='javascript:;' onclick=del(this) >删除</a></td>";
        tr += td;
        tr += "</tr>";
    });
    return tr;
}
$(".databaseType").find("i").click(function () {
    var sort = "";
    var condition = $(".databaseType").find("th:first").attr("cond");
    if ($(this).is(".icon-chevron-up")) {
        //变成降序 DESC
        sort = "DESC";
        $(this).removeClass("icon-chevron-up").addClass("icon-chevron-down");

    } else {//变成升序 ASC
        sort = "ASC";
        $(this).removeClass("icon-chevron-down").addClass("icon-chevron-up");
    }
    $(".databaseType").find("tbody").empty();
    getDatabaseTypePage(condition, sort, 1);
});

function getDatabaseInfoPage(databaseTypeId, condition, sort, page) {
    $.ajax({
        type: "post",
        url: "/iwherelink_0.1/getDatabaseInfoSorted.do",
        data: {
            databaseTypeId: databaseTypeId,
            condition: condition,
            sort: sort,
            page: page
        },
        success: function (data) {
            if (data.page > 0) {
                var tr = showDatabaseInfoPage(data.data);
                $(".databaseInfo").find("tbody").append(tr);
                showPagination(data.page);
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
                    var databaseTypeId = $("#selectDBType").val();
                    getDatabaseInfoPage(databaseTypeId, condition, sort, page);
                });

                $(".pagination ul").find("li").removeClass("active").eq(page).addClass("active");
            } else {
                $(".databaseInfo").find("tbody").empty();
                $(".pagination ul").empty();
                $(".databaseInfo").find("tbody").append("<tr><td colspan='4' class='text-center'>暂无数据</td></tr>");
            }
        }
    });
}

function showDatabaseInfoPage(value) {
    $(".databaseInfo").find("tbody").empty();
    var tr = "";
    $.each(value, function (n, data) {
        tr += "<tr>";
        var td = "<td style='display:none'>" + data.id + "</td>";
        td += "<td class='text-center'>" + data.databaseType + "</td>";
        td += "<td class='text-center'>" + data.databaseName + "</td>";
        td += "<td class='text-center'>" + data.databaseURL + "</td>";
        td += "<td class='text-center'>" + data.databaseUserName + "</td>";
        td += "<td class='text-center'><a onclick='getUpdateDatabaseInfo(" + data.id + ")' class='edit' href='javascript:;' >编辑</a></td>";
        td += "<td class='text-center'><a onclick='deleteDatabaseInfo(" + data.id + ")' class='delete'  href='javascript:;'>删除</a></td>";
        if (data.status == 1) {
            td += "<td class='text-center'><span class='active' style='color:#cccccc'>已激活</span>|<a class='non_active' href='javascript:;' onclick='changeStatus(" + data.id + ",this,'CLOSE');' style='color:#0D638F' >关闭</a></td>";
        } else {
            td += "<td class='text-center'><a class='active' href='javascript:;' onclick='changeStatus(+data.id+,this,'ACTIVE');' style='color:#0D638F'>激活</a>| <span class='non_active' style='color:#cccccc'>已关闭</span></td>";
        }
        tr += td;
        tr += "</tr>";
    });
    return tr;
}

$(".databaseInfo").find("i").click(function () {
    var sort = "";
    var databaseTypeId = $("#selectDBType").val();
//	var	condition=$(".databaseInfo").find("th:first").attr("cond");
    if ($(this).is(".icon-chevron-up")) {
        //变成降序 DESC
        sort = "DESC";
        $(this).removeClass("icon-chevron-up").addClass("icon-chevron-down");

    } else {//变成升序 ASC
        sort = "ASC";
        $(this).removeClass("icon-chevron-down").addClass("icon-chevron-up");
    }
    var condition = $(this).parents("th").attr("cond");
    $(".databaseInfo").find("tbody").empty();
    getDatabaseInfoPage(databaseTypeId, condition, sort, 1);
});

$(".database-type").change(function () {
    var condition = $(".databaseInfo").find("th:first").attr("cond");
    var databaseTypeId = $(this).val();
    $(".databaseInfo").find("tbody").empty();
    getDatabaseInfoPage(databaseTypeId, "", "", 1);
});

function getSourceTypePage(condition, sort, page) {
    $.ajax({
        type: "post",
        url: "/iwherelink_0.1/getSourceTypeListSorted.do",
        data: {
            condition: condition,
            sort: sort,
            page: page
        },
        success: function (data) {
            if (data.page > 0) {
                var tr = showSourceType(data.data);
                $(".sourceType").find("tbody").append(tr);
                showPagination(data.page);
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
                    getSourceTypePage(condition, sort, page);
                });

                $(".pagination ul").find("li").removeClass("active").eq(page).addClass("active");
            } else {
                $(".sourceType").find("tbody").empty();
                $(".pagination ul").empty();
                $(".sourceType").find("tbody").append("<tr><td colspan='3' class='text-center'>暂无数据</td></tr>");
            }
        }
    });
}

function showSourceType(value) {
    $(".sourceType").find("tbody").empty();
    var tr = "";
    $.each(value, function (n, data) {
        tr += "<tr>";
        var td = "<td style='display:none'>" + data.id + "</td>";
        td += "<td class='text-center'>" + data.sourceType + "</td>";
        td += "<td class='text-center'><a class='edit' onclick='edit_single_sourceType(this)' href='javascript:;'>编辑</a></td>";
        td += "<td class='text-center'><a class='delete' onclick='delete_single_sourceType(this)' href='javascript:;'>删除</a></td>";
        tr += td;
        tr += "</tr>";
    });
    return tr;
}
$(".sourceType").find("i").click(function () {
    var sort = "";
    var condition = $(".sourceType").find("th:first").attr("cond");
    if ($(this).is(".icon-chevron-up")) {
        //变成降序 DESC
        sort = "DESC";
        $(this).removeClass("icon-chevron-up").addClass("icon-chevron-down");

    } else {//变成升序 ASC
        sort = "ASC";
        $(this).removeClass("icon-chevron-down").addClass("icon-chevron-up");
    }
    $(".sourceType").find("tbody").empty();
    getSourceTypePage(condition, sort, 1);
});


function getTableInfo(sourceType, condition, sort, page) {
    $.ajax({
        type: "post",
        url: "/iwherelink_0.1/getTableInfoListSorted.do",
        data: {
            sourceTypeId: sourceType,
            condition: condition,
            sort: sort,
            page: page
        },
        success: function (data) {
            if (data.page > 0) {
                var tr = showTableInfo(data.data);
                $(".tableInfo").find("tbody").append(tr);
                showPagination(data.page);

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
                    var sourceType = $("#tableinfo_index_sourceType").val();
                    getTableInfo(sourceType, condition, sort, page);
                });

                $(".pagination ul").find("li").removeClass("active").eq(page).addClass("active");
            } else {
                $(".tableInfo").find("tbody").empty();
                $(".pagination ul").empty();
                $(".tableInfo").find("tbody").append("<tr><td colspan='5' class='text-center'>暂无数据</td></tr>");
            }
        }
    });
}

function showTableInfo(value) {
    $(".tableInfo").find("tbody").empty();
    var tr = "";
    $.each(value, function (n, data) {
        tr += "<tr>";
        var td = "<td style='display:none'>" + data.id + "</td>";
        td += "<td class='text-center'>" + data.sourceType + "</td>";
        td += "<td class='text-center'>" + data.databaseType + "</td>";
        td += "<td class='text-center'>" + data.databaseName + "</td>";
        td += "<td class='text-center'>" + data.tableName + "</td>";
        td += "<td class='text-center'><a tableInfoId='" + data.id + "' class='delete' onclick='deleteTableInfo()' href='javascript:;'>删除</a></td>";
        tr += td;
        tr += "</tr>";
    });
    return tr;
}

$("#tableinfo_index_sourceType").change(function () {
    $(".tableInfo").find("i").removeClass("icon-chevron-down").addClass("icon-chevron-up");
    var sourceType = $(this).val();
    var sort = "DESC";
    var condition = $(".tableInfo").find("th:first").attr("cond");

    $(".tableInfo").find("tbody").empty();
    getTableInfo(sourceType, condition, sort, 1);
});

$(".tableInfo").find("i").click(function () {
    var sort = "DESC";
    var sourceType = $("#tableinfo_index_sourceType").val();
    if ($(this).is(".icon-chevron-up")) {
        //变成降序 DESC
        sort = "DESC";
        $(".tableInfo").find("i").removeClass("icon-chevron-down").addClass("icon-chevron-up");
        $(this).removeClass("icon-chevron-up").addClass("icon-chevron-down");
    } else {//变成升序 ASC
        sort = "ASC";
        $(this).removeClass("icon-chevron-down").addClass("icon-chevron-up");
    }
    var condition = $(this).parents("th").attr("cond");

    $(".tableInfo").find("tbody").empty();
    getTableInfo(sourceType, condition, sort, 1);
});

function getDictionaryType(condition, sort, page) {
    $.ajax({
        type: "post",
        url: "/iwherelink_0.1/getDictionaryTypeListSorted.do",
        data: {
            condition: condition,
            sort: sort,
            page: page
        },
        success: function (data) {
            if (data.page > 0) {
                var tr = showDictionaryType(data.data);
                $(".ConditionInfoByDictionaryType").find("tbody").append(tr);
                showPagination(data.page);

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
                    getDictionaryType(condition, sort, page);
                });

                $(".pagination ul").find("li").removeClass("active").eq(page).addClass("active");
            } else {
                $(".ConditionInfoByDictionaryType").find("tbody").empty();
                $(".pagination ul").empty();
                $(".ConditionInfoByDictionaryType").find("tbody").append("<tr><td colspan='6' class='text-center'>暂无数据</td></tr>");
            }
        }
    });
}
function showDictionaryType(value) {
    $(".ConditionInfoByDictionaryType").find("tbody").empty();
    var tr = "";
    $.each(value, function (n, data) {
        tr += "<tr>";
        var td = "<td style='display:none' id='" + data.id + "'>" + data.id + "</td>";
        td += "<td class='text-center'>" + data.sourceType + "</td>";
        td += "<td class='text-center'>" + data.typeName + "</td>";
        td += "<td class='text-center'>" + data.desc + "</td>";
        if (data.enable) {
            var status = "开启";
        } else {
            var status = "关闭";
        }
        td += "<td class='text-center'>" + status + "</td>";
        td += "<td style='display:none' class='text-center' id=" + data.sourceTypeId + ">" + data.sourceTypeId + "</td>";
        td += "<td class='text-center'><a class='edit' onclick='dictionary_type_edit(" + data.id + ")' href='javascript:;'>编辑</a></td>";
        td += "<td class='text-center'><a class='delete' onclick='del(" + data.id + ")' href='javascript:;'>删除</a></td>";
        tr += td;
        tr += "</tr>";
    });
    return tr;
}

function getDictionaryType(condition, sort, page) {
    $.ajax({
        type: "post",
        url: "/iwherelink_0.1/getDictionaryTypeListSorted.do",
        data: {
            condition: condition,
            sort: sort,
            page: page
        },
        success: function (data) {
            if (data.page > 0) {
                var tr = showDictionaryType(data.data);
                $(".ConditionInfoByDictionaryType").find("tbody").append(tr);
                showPagination(data.page);

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
                    getDictionaryType(condition, sort, page);
                });

                $(".pagination ul").find("li").removeClass("active").eq(page).addClass("active");
            } else {
                $(".ConditionInfoByDictionaryType").find("tbody").empty();
                $(".pagination ul").empty();
                $(".ConditionInfoByDictionaryType").find("tbody").append("<tr><td colspan='6' class='text-center'>暂无数据</td></tr>");
            }
        }
    });
}

$(".ConditionInfoByDictionaryType").find("i").click(function () {
    var sort = "DESC";
    if ($(this).is(".icon-chevron-up")) {
        //变成降序 DESC
        sort = "DESC";
        $(".ConditionInfoByDictionaryType").find("i").removeClass("icon-chevron-down").addClass("icon-chevron-up");
        $(this).removeClass("icon-chevron-up").addClass("icon-chevron-down");
    } else {//变成升序 ASC
        sort = "ASC";
        $(this).removeClass("icon-chevron-down").addClass("icon-chevron-up");
    }
    var condition = $(this).parents("th").attr("cond");

    $(".ConditionInfoByDictionaryType").find("tbody").empty();
    getDictionaryType(condition, sort, 1);
});

function getDictionaryInfo(sourceTypeId, dictionaryTypeId, condition, sort, page) {
    $.ajax({
        type: "post",
        url: "/iwherelink_0.1/getConditionInfoListHtml.do",
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
//				$(".conditionInfoByDictionary").find("tbody").append(tr);
                showPagination(data.page);

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

                $(".pagination ul").find("li").removeClass("active").eq(page).addClass("active");
            } else {
                $(".conditionInfoByDictionary").find("tbody").empty();
                $(".pagination ul").empty();
                $(".conditionInfoByDictionary").find("tbody").append("<tr><td colspan='8' class='text-center'>暂无数据</td></tr>");
            }
        }
    });
}

function showConditionInfoTbody(data) {
    $("#conditionInfolist_tbody").empty();
    var tr = "";
    var td = "";
    $.each(data, function (n, value) {
        tr += "<tr>";
        td = "<td style='display:none' class='text-center' id=" + value.id + ">" + value.id + "</td>";
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
        td += "<td class='text-center'><a class='edit'  onclick='dictionary_edit(" + value.id + ")' href='javascript:;'>编辑</a></td>";
        td += "<td class='text-center'><a class='del'  onclick='dictionary_del(" + value.id + ")' href='javascript:;'>删除</a></td>";

        tr += td;
        tr += "</tr>";
    });
    $("#conditionInfolist_tbody").append(tr);
    clickTR();
}

$(".conditionInfoByDictionary").find("i").click(function () {

    var sort = "DESC";
    if ($(this).is(".icon-chevron-up")) {
        //变成降序 DESC
        sort = "DESC";
        $(".conditionInfoByDictionary").find("i").removeClass("icon-chevron-down").addClass("icon-chevron-up");
        $(this).removeClass("icon-chevron-up").addClass("icon-chevron-down");
    } else {//变成升序 ASC
        sort = "ASC";
        $(this).removeClass("icon-chevron-down").addClass("icon-chevron-up");
    }
    var sourceTypeId = $("#conditionInfo_sourceType").val();
    var dictionaryTypeId = $("#conditionInfo_dictionaryType").val();
    var condition = $(this).parents("th").attr("cond");

    $(".conditionInfoByDictionary").find("tbody").empty();
    getDictionaryInfo(sourceTypeId, dictionaryTypeId, condition, sort, 1);
});

function getDictionaryMapping(sourceTypeId, dictionaryTypeId, condition, sort, page) {
    $.ajax({
        type: "post",
        url: "/iwherelink_0.1/getDictionaryMappingSort.do",
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
                showPagination(data.page);

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

                $(".pagination ul").find("li").removeClass("active").eq(page).addClass("active");
            } else {
                $(".dictionaryMapping").find("tbody").empty();
                $(".pagination ul").empty();
                $(".dictionaryMapping").find("tbody").append("<tr><td colspan='8' class='text-center'>暂无数据</td></tr>");
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
        td = "<td style='display:none' class='text-center' id=" + value.id + ">" + value.id + "</td>";
        td += "<td class='text-center'>" + value.sourceType + "</td>";
        td += "<td class='text-center'>" + value.typeName + "</td>";
        td += "<td class='text-center'>" + value.chineseName + "</td>";
        td += "<td class='text-center'>" + value.realName + "</td>";
        td += "<td class='text-center'>" + value.databaseName + "</td>";
        td += "<td class='text-center'>" + value.tableName + "</td>";
        td += "<td class='text-center'>" + value.columnName + "</td>";
        //td+="<td class='text-center'><a class='edit'  onclick='dictionary_edit("+value.id+")' href='javascript:;'>编辑</a></td>";
        td += "<td class='text-center'><a class='del'  onclick='delete_column(" + value.id + ")' href='javascript:;'>删除</a></td>";
        tr += td;
        tr += "</tr>";
    });
    return tr;
}
$(".dictionaryMapping").find("i").click(function () {

    var sort = "DESC";
    if ($(this).is(".icon-chevron-up")) {
        //变成降序 DESC
        sort = "DESC";
        $(".dictionaryMapping").find("i").removeClass("icon-chevron-down").addClass("icon-chevron-up");
        $(this).removeClass("icon-chevron-up").addClass("icon-chevron-down");
    } else {//变成升序 ASC
        sort = "ASC";
        $(this).removeClass("icon-chevron-down").addClass("icon-chevron-up");
    }
    var sourceTypeId = $("#conditionInfo_sourceType").val();
    var dictionaryTypeId = $("#conditionInfo_dictionaryType").val();
    var condition = $(this).parents("th").attr("cond");

    $(".dictionaryMapping").find("tbody").empty();
    getDictionaryMapping(sourceTypeId, dictionaryTypeId, condition, sort, 1);

});


//字典名唯一性校验
function uniqueCheckByChineseName(sourceTypeId, dictionaryType, chineseName) {
//	var sourceTypeId = $("#selectDataProducts_dictionary").val();//数据产品
//	var chineseName = $(".dic_name").val();//字典名称
//	var dictionaryType = $("#dictionaryType_dictionary").val();//字典类型
    if (typeof(chineseName) != 'undefined' && chineseName != "" && chineseName != null) {

        $.ajax({
            type: "post",
            url: "/iwherelink_0.1/uniqueCheckByChineseName.do",
            data: {
                sourceTypeId: sourceTypeId,
                dictionaryType: dictionaryType,
                chineseName: chineseName
            },
            success: function (data) {
                $(".dic_name").parent().remove(".errormsg");
                if (data != "true") {
                    $("input.dic_name").after("<p class='errormsg'>字典名重复</p>");
                }
            }, error: function (data) {
                alert("字典名称唯一性检查失败");
            }
        });
    }
}

var arrayDatabaseType = new Array();
function columnPage(page) {
    // 数据库字段配置的下拉框
    var type_database_table = $(".database-type").val();
    var del = $("#del").val();

    if (del == 'delCol') {
        $.ajax({
            type: "post",
            url: "/iwherelink_0.1/getAllColumnPageBySelect.do?page=" + page,
            dataType: "html",
            // async:false,
            data: {
                type_database_table: type_database_table
            },
            success: function (data) {

                $("#column_msg").html(data);
            }
        });
    }
}

function tablePage(page) {
    var sourceTypeOptionId = $("#sourceTypeOption").val();
    $.ajax({
        cache: false,
        type: "post",
        url: "/iwherelink_0.1/getAllDatabaseTablesPageBySelect.do",
        data: {
            page: page,
            sourceTypeOptionId: sourceTypeOptionId
        },
        success: function (data) {
            $("#table_msg").empty();
            $("#table_msg").html(data);
        }
    });

}

//切换产品类型选择的时候 会调用此方法 获取对应的字典类型
//未知原因不执行
/*function selectDataProducts() {
 var sourceTypeId = $("#selectDataProducts").val();
 alert("sourceTypeId:"+sourceTypeId);
 if(typeof(sourceTypeId) != 'undefined' && sourceTypeId != "0" && sourceTypeId != "" && sourceTypeId != null){
 $.ajax({
 type : "post",
 url : "getConditionDictionaryTypeBySourceType.do",
 dataType : "html",
 data : {
 id : sourceTypeId
 },
 success : function(data) {
 $("#addDictionaryTypeMapping").empty();
 $("#addDictionaryTypeMapping").html(data);
 },
 error : function() {
 alert("加载字典类型失败！");
 }
 });
 }else{
 $("#addDictionaryTypeMapping").empty();
 }

 }
 */

function databasechangeincolumn() {
    // 数据库字段配置 改变数据库下拉框 获得相应的字段
    var typeDbTable = $(".database-type2").val();
    if (typeof(typeDbTable) != "undefined" && typeDbTable != "" && typeDbTable != null && typeDbTable != "0") {
        $.ajax({
            type: "post",
            url: "/iwherelink_0.1/columnFormOption.do?typeDbTable=" + typeDbTable,
            dataType: "json",
            success: function (data) {
                if (data.dataMSG == "dbtype_error") {
                    alert("请选择正确的数据库类型！");
                } else {
                    $("#columnName option").remove();
                    $("#columnName").html(data.dataMSG);
                    if (data.idMSG) {
                        $("#databaseIDMSG").html(data.idMSG);
                    }
                }

            },
            error: function () {
                alert("查询失败！");
            }
        });
    } else {
        alert("请选择正确的数据表信息");
    }

}
function databasechangeindictionary() {
    // 数据库字段配置 改变数据库下拉框 获得相应的字段
    var typeDbTable = $("#ref_table_md").val();
    $.ajax({
        type: "post",
        url: "/iwherelink_0.1/columnFormOption.do?typeDbTable=" + typeDbTable,
        dataType: "json",
        success: function (data) {
            if (data.dataMSG == "dbtype_error") {
                alert("请选择正确的数据库类型！");
            } else {
                $("#ref_column_md option").remove();
                $("#ref_column_md").html(data.dataMSG);
                if (data.idMSG) {
                    $("#ref_database_id").html(data.idMSG);
                }
            }

        },
        error: function () {
            alert("333");
        }
    });
}


//2016年5月20日11:25:14  leeqingxiao
function changeConditionDictionaryType() {
    // 字典类型配置 改变字典类型设置下拉框 获得相应的字典对象
    showConditions();
}

function del_dictionary() {

    var status = confirm("删除此字典及其指定的所有字段，确认删除？");
    if (status) {
        var length = $(".del_dictionary").find("input:checkbox").length;
        var idList = "";
        for (var i = 0; i < length; i++) {
            if ($(".del_dictionary").find("input:checkbox").get(i).checked) {
                idList = idList
                    + $(".del_dictionary").find("input:checkbox").get(i).value
                    + ",";
            }
        }
        idList = idList.substring(0, idList.length - 1);
        // alert($(".del_dictionary").find("input:checkbox").get(0).value);
        $.ajax({
            type: "post",
            url: "/iwherelink_0.1/delDictionary.do",
            data: {
                idList: idList
            },
            success: function (data) {
                alert("删除成功！");
                // $(".del_dictionary").find("p").remove();
                // $(".del_dictionary").append(data);
                $(".del_dictionary").find("label").remove();
                $(".del_dictionary .clearfix").before(data);
            }
        });
    }
}

function columnChange2() {
    // 数据库字段配置 字段下拉框改变
    var typeDbTable = $("#ref_table_md").val();
    var column = $("#ref_column_md").val();
    $.ajax({
        type: "post",
        url: "/iwherelink_0.1/typeFormOption.do?typeDbTable=" + typeDbTable + "&column="
        + column,
        dataType: "json",
        success: function (data) {
            if (data.columnType) {
                if (data.columnType == "dbtype_error") {
                    alert("请选择正确的数据库类型！");
                } else if (data.columnType == "field_error") {
                    alert("请选择正确的字段！");
                } else {
                    $("#column_type_dic").val(data.columnType);
                }
            }
        }
    });

}

function savefield() {
    // 添加字段
    var type_database_table = $(".database-type").val();
    var typeDbTable = $(".database-type2").val();
    var columnName = $(".database-type3").val();
    var columnType = $("#column_type").val();
    var chineseName = $("#chineseName").val();
    alert(chineseName);
    var dbinfoId = $("#databaseId").val();
    var realName = $("#realName").val();
    $.ajax({
        type: "post",
        url: "/iwherelink_0.1/addColumn.do",
        data: {
            typeDbTable: typeDbTable,
            columnName: columnName,
            columnType: columnType,
            chineseName: chineseName,
            dbinfoId: dbinfoId,
            realName: realName,
        },
        success: function (data) {
            if (data == "true") {// 添加成功
                alert("字段添加成功!");
                $(".add-new").hide();
                $(".change-message").hide();
                $(".tablebg-grey").hide();
                $.ajax({
                    type: "post",
                    url: "/iwherelink_0.1/getAllColumnPageBySelect.do",
                    data: {
                        type_database_table: type_database_table
                    },
                    success: function (data) {

                        $("#column_msg").html(data);
                    }
                });

            } else if (data == "false") {// 添加失败：数据库中已存在该添加项
                alert("数据库中已存在该字段,请重新添加！");
            } else if (data == "") {
                alert("全部选项都不能为空(请选择正确的选项)！");
            }
        }
    });
}
// 字典页面添加
function savefield2() {
    var sourceTypeId = $("#selectDataProducts").val();//业务场景
    var dictionaryTypeId = $("#addDictionaryTypeMapping").val();//字典聚类
    var dictionaryId = $("#dictionaryList_add").val();//字典id
    var typeDbTable = $(".database-type2").val();//表
    var columnName = $(".database-type3").val();//列名
    var columnType = $("#column_type").val();//列类型
    var realName = $("#realName").val();//真正的名字

    var dataBase_table = typeDbTable.split(":");

    //form表单字段校验start

    if (typeof(sourceTypeId) == 'undefined' || sourceTypeId == '0' || sourceTypeId == '' || sourceTypeId == null) {
        alert("请选择业务场景");
        return;
    }

    if (typeof(dictionaryTypeId) == 'undefined' || dictionaryTypeId == '0' || dictionaryTypeId == '' || dictionaryTypeId == null) {
        alert("请选择字典聚类");
        return;
    }

    if (typeof(dictionaryId) == 'undefined' || dictionaryId == '0' || dictionaryId == '' || dictionaryId == null) {
        alert("请选择字典");
        return;
    }

    if (typeof(typeDbTable) == 'undefined' || typeDbTable == '0' || typeDbTable == '' || typeDbTable == null) {
        alert("请选择表");
        return;
    }

    if (typeof(columnName) == 'undefined' || columnName == '0' || columnName == '' || columnName == null) {
        alert("请选择字段");
        return;
    }

    if (typeof(columnType) == 'undefined' || columnType == '0' || columnType == '' || columnType == null) {
        alert("请选择字段类型");
        return;
    }
    if (dataBase_table.length != 3) {
        alert("数据表选择错误");
        return;
    }

    $.ajax({
        type: "post",
        url: "/iwherelink_0.1/addColumnInfo.do",
        data: {
            databaseInfoId: dataBase_table[1],
            tableInfoId: dataBase_table[2],
            conditionInfoId: dictionaryId,
            columnName: columnName,
            columnType: columnType,
            realName: realName,
        },
        success: function (data) {
            if ("FAIL" == data) {
                alert("您很遗憾地告诉您,添加当字典表映射关系失败,请稍后再做尝试操作!");
                return;
            } else if ("SUCCESS" == data) {
                alert("您太聪明了,恭喜您添加当字典表映射关系成功!");
                location.href = "getDictionaryMappingInfos.do";
            } else if ("EXIST" == data) {
                alert("您很遗憾地告诉您,要添加的当字典表映射关系已经存在,请重新操作!");
                return;
            } else if ("EXCEPTION" == data) {
                alert("很遗憾地告诉您,添加当字典表映射关系出现异常,请稍后再做操作!");
                return;
            }
        },
        error: function () {
            alert("很遗憾地告诉您,添加当字典表映射关系出现错误,请稍后再做操作!");
            return;
        }
    });
}
//数据库信息的状态改变的方法
function changeStatus(databaseInfoId, obj, status) {
    var id = databaseInfoId;
    $.ajax({
        type: "post",
        url: "/iwherelink_0.1/changeStatus.do",
        data: {
            status: status,
            id: id
        },
        success: function (data) {
            if ("SUCCESS" == data) {
                if (status == "ACTIVE") {
                    var close = '"CLOSE"';
                    $(obj).parent().html("<span class='active' style='color:#cccccc'>已激活</span> | <a class='non_active' href='javascript:;' onclick='changeStatus(" + id + ",this," + close + ");' style='color:#0D638F' >关闭</a>");
                }
                if (status == "CLOSE") {
                    var active = '"ACTIVE"';
                    $(obj).parent().html("<a class='active' href='javascript:;' onclick='changeStatus(" + id + ",this," + active + ");' style='color:#0D638F'>激活</a> | <span class='non_active' style='color:#cccccc'>已关闭</span>");
                }
            } else if ("FAIL" == data) {
                alert("修改当前数据信息状态失败,烦请刷新页面后再做操作!");
                return;
            } else if ("NOTFOUND" == data) {
                alert("很遗憾地告诉您,修改了不存在的数据,请稍后再做操作!");
                return;
            } else if ("NOMODIFY" == data) {
                alert("修改当前数据状态未做任何修改,请重新修改其状态!");
                return;
            } else if ("RELATION" == data) {
                alert("很遗憾地告诉您,请先删除绑定的数据库信息相关数据后,再做删除操作!");
                return;
            } else if ("EXCEPTION" == data) {
                alert("很遗憾地告诉您,删除操作出现异常,请稍后再做操作!");
                return;
            }
        },
        error: function () {
            alert("修改当前数据信息状态失败,烦请刷新页面后再做操作!");
            return;
        }
    });
}

//编辑数据源(数据类型绑定的数据库信息)操作
function getUpdateDatabaseInfo(obj) {
    $(".change-message").show();
    $(".tablebg-grey").show();
    var databaseId = obj;
    if (typeof(databaseId) == 'undefined' || databaseId == '' || databaseId == null) {
        alert("当前数据存在异常,烦请刷新页面后再做尝试操作!");
        return;
    }
    $.ajax({
        type: "post",
        url: "/iwherelink_0.1/getDatabaseInfo.do",
        data: {
            databaseId: databaseId
        },
        success: function (data) {
            if (null != data && "" != data) {
                //获取数据进行赋值操作
                $("#fillDatabaseInfoForm #updateDatabaseName").val(data[0].databaseName);
                $("#fillDatabaseInfoForm #updateDatabaseURL").val(data[0].databaseURL);
                $("#fillDatabaseInfoForm #updateDatabaseUsername").val(data[0].databaseUsername);
                $("#fillDatabaseInfoForm #updateDatabasePassword").val(data[0].databasePassword);
                $("#fillDatabaseInfoForm #updatedatabaseid").val(data[0].id);
            } else {
                alert("获取当前数据信息失败,烦请刷新页面后再做操作!");
                return;
            }
        },
        error: function () {
            alert("获取当前数据信息失败,烦请刷新页面后再做操作!");
            return;
        }
    });
}

//删除数据源(数据类型绑定的数据库信息)操作
function deleteDatabaseInfo(obj) {
    var databaseInfoId = obj;
    if (confirm("确认删除当前数据?") == true) {
        if (typeof(databaseInfoId) == 'undefined' || databaseInfoId == '' || databaseInfoId == null) {
            alert("当前数据存在异常,烦请刷新后重新操作!");
            return;
        }
        $.ajax({
            type: "post",
            url: "/iwherelink_0.1/deleteDatabaseInfo.do",
            data: {
                databaseInfoId: databaseInfoId,
            },
            success: function (data) {
                if ("SUCCESS" == data) {
                    alert("您太聪明了,恭喜您数据库信息删除成功!");
                    location.href = "getAllDatabasePage.do";
                } else if ("FAIL" == data) {
                    alert("很遗憾地告诉您,删除失败,请稍后再做操作!");
                    return;
                } else if ("RELATION" == data) {
                    alert("很遗憾地告诉您,请先删除绑定的数据库信息相关数据后,再做删除操作!");
                    return;
                } else if ("EXCEPTION" == data) {
                    alert("很遗憾地告诉您,删除操作出现异常,请稍后再做操作!");
                    return;
                } else if ("NOTFOUND" == data) {
                    alert("很遗憾地告诉您,删除了不存在的数据,请稍后再做操作!");
                    return;
                }
            },
            error: function () {
                alert("数据库信息存在异常,暂时无法删除,请稍后再做操作!");
                return;
            }
        });
    }
}

//修改数据源保存按钮点击后的操作
function save_updt_dbSource() {
    var databaseName = $("#updateDatabaseName").val();
    var databaseURL = $("#updateDatabaseURL").val();
    var databaseUsername = $("#updateDatabaseUsername").val();
    var databasePassword = $("#updateDatabasePassword").val();
    var updatedatabaseid = $("#updatedatabaseid").val();
    if (typeof(databaseName) == 'undefined' || databaseName == '' || databaseName == null) {
        alert("动一动您的小手,填写下数据库名称");
        return;
    }

    if (typeof(databaseURL) == 'undefined' || databaseURL == '' || databaseURL == null || databaseURL.indexOf(":") <= 0) {
        alert("动一动您的小手,填写下正确的url");
        return;
    }

    if (typeof(databaseUsername) == 'undefined' || databaseUsername == '' || databaseUsername == null) {
        alert("动一动您的小手,填写下正确的用户名");
        return;
    }

    if (typeof(databasePassword) == 'undefined' || databasePassword == '' || databasePassword == null) {
        alert("动一动您的小手,填写下正确的密码");
        return;
    }
    $.ajax({
        type: "post",
        url: "/iwherelink_0.1/updateDatabaseInfo.do",
        data: {
            databaseName: databaseName,
            databaseURL: databaseURL,
            databaseUsername: databaseUsername,
            updatedatabaseid: updatedatabaseid,
            databasePassword: databasePassword
        },
        success: function (data) {
            if (null != data && "" != data) {
                if ("SUCCESS" == data) {
                    alert("您太聪明了,恭喜您更新数据库信息成功!");
                    $(".change-message").hide();
                    $(".tablebg-grey").hide();
                    location.href = "getAllDatabasePage.do";
                } else if ("FAIL" == data) {
                    alert("更新当前数据源记录失败,烦请刷新页面后再做操作!");
                    $(".change-message").hide();
                    $(".tablebg-grey").hide();
                } else if ("EXIST" == data) {
                    alert("您要更新的数据库信息在系统中已经存在对应的记录,烦请重新编辑操作!");
                    $(".change-message").hide();
                    $(".tablebg-grey").hide();
                } else if ("NOMODIFY" == data) {
                    alert("您未做任何编辑处理,请重新编辑操作!");
                    $(".change-message").hide();
                    $(".tablebg-grey").hide();
                } else if ("EXCEPTION" == data) {
                    alert("更新当前数据源记录出现异常,烦请刷新页面后再做操作!");
                    $(".change-message").hide();
                    $(".tablebg-grey").hide();
                }
            } else {
                alert("更新当前数据源记录失败,烦请刷新页面后再做操作!");
                return;
            }
        },
        error: function () {
            alert("更新当前数据源记录失败,烦请刷新页面后再做操作!");
            return;
        }
    });
}

//数据库信息的添加
function addDatabaseInfo() {
    var databaseName = $("#databaseName").val();
    var databaseURL = $("#databaseURL").val();
    var databaseUsername = $("#databaseUsername").val();
    var databasePassword = $("#databasePassword").val();
    var databaseTypeId = $("#databaseSource").find("option:selected").val();
    if (typeof(databaseName) == 'undefined' || databaseName == '' || databaseName == null) {
        alert("动一动您的小手,填写下数据库名称");
        return;
    }
    if (typeof(databaseURL) == 'undefined' || databaseURL == '' || databaseURL == null || databaseURL.indexOf(":") <= 0) {
        alert("动一动您的小手,填写下正确的url");
        return;
    }

    if (typeof(databaseUsername) == 'undefined' || databaseUsername == '' || databaseUsername == null) {
        alert("动一动您的小手,填写下正确的用户名");
        return;
    }

    if (typeof(databasePassword) == 'undefined' || databasePassword == '' || databasePassword == null) {
        alert("动一动您的小手,填写下正确的密码");
        return;
    }
    if (typeof(databaseTypeId) == 'undefined' || databaseTypeId == '' || databaseTypeId == null || '0' == databaseTypeId) {
        alert("动一动您的小手,请选择数据库类型!");
        return;
    }
    $.ajax({
        type: "post",
        url: "/iwherelink_0.1/addDatabaseInfo.do",
        data: {
            databaseName: databaseName,
            databaseURL: databaseURL,
            databaseUsername: databaseUsername,
            databaseTypeId: databaseTypeId,
            databasePassword: databasePassword
        },
        success: function (data) {
            if (null != data && "" != data) {
                if ("SUCCESS" == data) {
                    alert("您太聪明了,恭喜您添加数据库信息成功!");
                    $(".change-message").hide();
                    $(".tablebg-grey").hide();
                    location.href = "getAllDatabasePage.do";
                } else if ("FAIL" == data) {
                    alert("添加当前数据库信息失败,烦请刷新页面后再做操作!");
                    $(".change-message").hide();
                    $(".tablebg-grey").hide();
                } else if ("EXIST" == data) {
                    alert("您要添加的数据库信息在系统中已经存在对应的记录,烦请重新编辑操作!");
                    $(".change-message").hide();
                    $(".tablebg-grey").hide();
                } else if ("NOMODIFY" == data) {
                    alert("您未做任何处理,请重新操作!");
                    $(".change-message").hide();
                    $(".tablebg-grey").hide();
                } else if ("EXCEPTION" == data) {
                    alert("添加当前数据库信息出现异常,烦请刷新页面后再做操作!");
                    $(".change-message").hide();
                    $(".tablebg-grey").hide();
                }
            } else {
                alert("添加当前数据库信息失败,烦请刷新页面后再做操作!");
                return;
            }
        },
        error: function () {
            alert("添加当前数据库信息失败,烦请刷新页面后再做操作!");
            return;
        }
    });
}

function tableOption(obj) {

    if ($(".database-type").val() == "选择数据库") {
        $.get("tableServlet");
    } else {
        $.ajax({
            type: "get",
            url: "/iwherelink_0.1/tableOptionServlet",
            dataType: "html",
            data: {
                databasename_local: $(".database-type").val(),
                pageNo: $(obj).attr("value")
            },
            success: function (data) {
                // $(".table-bordered").find("tbody").children().remove();
                // $(".table-bordered").find("tbody").append(data);

                $(".table-bordered").remove();
                $(".pagination").remove();
                $(".clearfix").after(data);

            }
        });
    }

}

$.ajax({
    type: "POST",
    url: "/iwherelink_0.1/getDType4ConditionInfo.do",
    dataType: "json",
    success: function (data) {
        var option = "";
        $.each(data, function (K, V) {
            option += "<option value=" + K + ">" + V + "</option>";
        });
        $(".fieldTypeList").append(option);
        $(".fieldTypeList").find("option[value='0']").attr("selected", true);
    }
});

function add_dictionary() {
    var subList = new Array($("ul.list-group li").size());


    $("ul.list-group li").each(function (n) {
        if ($(this).find("input").val() != "" && $(this).find("input").val() != undefined) {
            subList[n] = $(this).find("input").val();
        }
    });
//	console.log(subList);
    var sourceTypeId = $("#selectDataProducts_dictionary").val();//数据产品
    var add_dic = $("#add_dic").val();//字典名称
    var dictionaryType = $("#dictionaryType_dictionary").val();//字典类型
//	var add_kw = $("#add_kw").val();//关键字
    var dictionary_display_type = $("#dictionary_display_type").val();//字典展示类型
    var fieldType = $("#fieldTypeList_dictionary").val();
    if (typeof(sourceTypeId) == 'undefined' || sourceTypeId == '' || sourceTypeId == null || "0" == sourceTypeId) {
        alert("请选择业务场景");
        return;
    }

    if (typeof(dictionaryType) == 'undefined' || dictionaryType == '' || dictionaryType == null || "0" == dictionaryType) {
        alert("请选择字典聚类");
        return;
    }

    if (typeof(add_dic) == 'undefined' || add_dic == '' || add_dic == null) {
        alert("请输入字典名称");
        return;
    }
    if ($(".add_dictionary").children().is("errormsg")) {
        alert($(".errormsg").text());
        return
    }
//	if(typeof(add_kw) == 'undefined' || add_kw == '' || add_kw == null){
//		alert("请输入关键字");
//		return;
//	}

    if (typeof(dictionary_display_type) == 'undefined' || dictionary_display_type == '' || dictionary_display_type == null) {
        dictionary_display_type = "11";
    }
    $.ajax({
        type: "POST",
        url: "/iwherelink_0.1/addCondition.do",
        dataType: "html",
        data: {
            dictionary: add_dic,
//			keyWord : add_kw,
            sourceTypeId: sourceTypeId,
            conditionDictionaryType: dictionaryType,
            dictionary_display_type: dictionary_display_type,
            "subList": subList,
            fieldType: fieldType
        },
        traditional: true,
        success: function (data) {
            if ("SUCCESS" == data) {
                alert("添加字典成功");
                $(".add_dictionary").hide();
                $(".tablebg-grey").hide();
                location.href = "dic_cfg";
            } else {
                alert("添加字典失败");
                $(".add_dictionary").hide();
                $(".tablebg-grey").hide();
            }

        }
    });

}


function columnOption(obj) {

    $.ajax({
        type: "post",
        url: "/iwherelink_0.1/columnOptionServlet",
        dataType: "html",
        data: {
            type_database_table: $(".database-type").val(),
            pageNo: $(obj).attr("value")
        },
        success: function (data) {
            // $(".table-bordered").find("tbody").children().remove();
            // $(".table-bordered").find("tbody").append(data);

            $(".table-bordered").remove();
            $(".pagination").remove();
            $(".clearfix").after(data);

        }
    });
}
function del(obj) {
    if (confirm("确认删除当前数据？") == true) {

        var flag = $("#del").val();

        var deletedatabaseid = $(obj).parents("tr").find("td:nth-child(6)")
            .find("input").val();

        if (flag == "delDB") {
            $.ajax({
                type: "post",
                url: "/iwherelink_0.1/deleteDatabaseById.do",
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
                url: "/iwherelink_0.1/deleteColumn.do",
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
                url: "/iwherelink_0.1/deleteTableBydbType_dbName.do",
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
            if (typeof(databaseTypeId) == 'undefined' || databaseTypeId == '' || databaseTypeId == null) {
                alert("当前数据库类型存在异常,请刷新页面重新操作!");
                return;
            }
            $.ajax({
                type: "post",
                url: "/iwherelink_0.1/deleteDBType.do",
                data: {
                    databaseTypeId: databaseTypeId,
                    flag: "delSource"
                },
                success: function (data) {
                    if ("SUCCESS" == data) {
                        alert("您太聪明了,恭喜您数据库类型删除成功!");
                        location.href = "back_cfg";
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
                url: "/iwherelink_0.1/delColumn.do",
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

        if (flag == "conditionType") {
            console.log(obj);
            $.ajax({
                type: "post",
                url: "/iwherelink_0.1/deleteConditionType.do",
                data: {
                    conditionTypeIds: [obj]
                },
                traditional:true,
                success: function (data) {
                    if ("NOTFOUND" == data) {
                        alert("很遗憾地告诉您,当前字典聚类数据已经失效,烦请刷新页面后再做查看!");
                        location.href = "getConditionDictionaryTypePage.do";
                    } else if ("SUCCESS" == data) {
                        alert("您太聪明了,恭喜您字典聚类数据删除成功!");
                        location.href = "getConditionDictionaryTypePage.do";
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


function delete_column(columnId) {
    if (typeof(columnId) != 'undefined' && null != columnId && "" != columnId) {
        if (confirm("确认删除当前字典表映射记录？") == true) {
            $.ajax({
                type: "post",
                url: "/iwherelink_0.1/deleteColumnInfo.do",
                data: {
                    columnId: columnId
                },
                success: function (data) {
                    if ("NOTFOUND" == data) {
                        alert("很遗憾地告诉您,当前字典表映射数据已经失效,烦请刷新页面后再做尝试操作!");
                        location.href = "getDictionaryMappingInfos.do";
                    } else if ("SUCCESS" == data) {
                        alert("您太聪明了,恭喜您字典表映射数据删除成功!");
                        location.href = "getDictionaryMappingInfos.do";
                    } else if ("FAIL" == data) {
                        alert("很遗憾地告诉您,字典表映射数据删除失败,请稍后再做操作!");
                        return;
                    } else if ("EXCEPTION" == data) {
                        alert("很遗憾地告诉您,字典表映射数据删除操作出现异常,请稍后再做操作!");
                        return;
                    }
                },
                error: function () {
                    alert("当前字典表映射数据存在错误,请刷新页面后再做操作!");
                    return;
                }
            });
        }
    } else {
        alert("当前字典表映射数据存在异常,请刷新页面后再做操作!");
        return;
    }
}

//指定查询条件，添加，修改删除条件

$(document).ready(
    function (e) {

        $(".page-content").height($(window).height() - 42);
        $(".tablebg-grey").width($(window).width());
        $(".tablebg-grey").height($(".page-content").height());
        $(window).resize(function () {
            $(".page-content").height($(window).height() - 42);
            $(".tablebg-grey").width($(window).width());
            $(".tablebg-grey").height($(".page-content").height());
        });
        $(".tablebg-grey").hide();

        var num = 0;
        var conditionNames = "";
        var addCriteria = "";
        $.ajax({
            type: "post",
            //url : "getConditionName.do",
            url: "/iwherelink_0.1/getConditionName.do",
            dataType: "json",
            success: function (nameList) {
                for (var key in nameList) {
                    conditionNames = conditionNames + '<option value="' + nameList[key].id + '">' + nameList[key].chineseName + '</option>';
                }
                addCriteria = '<tr class="add-last">' +
                    '<td class="dataId text-center" style="display:none">' +
                    '<input type="text">' +
                    '</td>' +
                    '<td class="tjmc text-center">' +
                    '<select>' +
                    conditionNames +
                    '</select>' +
//			        '<input type="text">'+
                    '</td>' +
                    '<td class="text-center zdlx">' +
                    '<select>' +
                    '<option value="11">文本类型</option>' +
                    '<option value="12">时间类型</option>' +
                    '<option value="13">滑动条</option>' +
                    '<option value="14">下拉选框</option>' +
                    '</select>' +
                    '</td>' +
                    '<td class="isShow text-center">' +
                    '<select>' +
                    '<option value="1">是</option>' +//是否对应 1  0
                    '<option value="0">否</option>' +
                    '</select>' +
                    '</td>' +
                    '<td class="text-center">' +
                    '<a class="criteria-edit panduan" href="javascript:;">保存</a>' +
                    '</td>' +
                    '<td class="text-center">' +
                    '<a class="delete" href="javascript:;">删除</a>' +
                    '</td>' +
                    '</tr>';
            },
            error: function () {
                alert("条件的中文名获取失败！");
            }
        });

//	    $(".criteria-edit").click(function(){
//	        $(this).parent("td").siblings(".isShow").children("select").removeAttr("disabled");
//	        $(this).parent("td").siblings(".tjmc").html('<input type="text">');   
//	    });
        /*添加显示内容行*/
//	    $("#add-criteria").click(function(){
//	        $(".add-tr").append(addCriteria);
//	        var tableHeight=$(".tableBorder").get(0).scrollHeight;
//	        $(".tableBorder").scrollTop(tableHeight);
//	    });	

        $(".add-tr").delegate(".criteria-edit", "click", function () {

            num++;
            var tjmc = $(".add-tr tbody tr:last").find(".tjmc").children("input").val();
            var zdlx = $(".add-tr tbody tr:last").find(".zdlx").children("select").val();
            $("add-last").find(".criteria-edit").removeClass("panduan").text("修改");
            $("add-last").find(".isShow").children("select").attr("disabled", "disabled");
            $("add-last").find(".delete").text("删除");
            $("add-last").find(".tjmc").text(tjmc);
            $("add-last").find(".zdlx").text(zdlx);
            $(this).find(".add-last").removeClass(".add-last");
            $(this).parents("tr").removeClass().addClass("edit-tr" + num);

            var typeStr = "";//类型名称（中文显示的名称）
            if (zdlx == "11") {
                typeStr = "文本类型";
            } else if (zdlx == "12") {
                typeStr = "时间类型";
            } else if (zdlx == "13") {
                typeStr = "滑动条";
            } else if (zdlx == "14") {
                typeStr = "下拉选框";
            }

            if ($(".edit-tr" + num).find(".criteria-edit").hasClass("panduan")) {
                if (!($(this).parent("td").parent("tr").find("td:eq(0)").text().length > 0)) {//进行添加操作
                    var name = $(".tjmc").val();
                    var type = $(".zdlx select").val();
                    var isShow = $(this).parent("td").parent("tr").find("td:eq(3) select").val();

                    if (!(name.length > 0)) {
                        alert("请填写有效的字段名称！");
                        return;
                    } else if (!(type.length > 0)) {
                        alert("请选择有效的类型！");
                        return;
                    } else if (!(isShow.length > 0)) {
                        alert("请选择是否显示为查询条件！");
                        return;
                    }

                    $.ajax({
                        type: "post",
                        url: "/iwherelink_0.1/addOneCondition.do",
                        data: {
                            name: name,
                            type: type,
                            isShow: isShow
                        },
                        success: function (data) {//成功
                            if (data != "false") {
                                //点击保存
                                $(".edit-tr" + num).find(".isShow").children("select").attr("disabled", "disabled");
                                $(".edit-tr" + num).find(".delete").text("删除");
                                $(".edit-tr" + num).find(".dataId").attr("id", data);
                                $(".edit-tr" + num).find(".tjmc").text(tjmc);
                                $(".edit-tr" + num).find(".zdlx").text(typeStr);
                                $(".edit-tr" + num).removeClass("edit-tr");
                                $(".edit-tr" + num).find(".criteria-edit").text("修改").removeClass("panduan");
                                //$(".add-tr").scrollTop($(".add-tr").height());

                                alert("添加成功！");

                            } else {
                                alert("添加失败！");
                            }
                        },
                        error: function (data) {//失败
                            alert("添加失败");
                        }

                    });

                } else if ($(this).parent("td").parent("tr").find("td:eq(0)").text().length > 0) {//进行修改操作
                    var id = $(this).parent("td").parent("tr").find("td:eq(0)").text();
                    var name = $(this).parent("td").parent("tr").find("td:eq(1)").text();
                    var type = $(this).parent("td").parent("tr").find("td:eq(2) select").val();//类型代号
                    var isShow = $(this).parent("td").parent("tr").find("td:eq(3) select").val();

                    if (!(name.length > 0)) {
                        alert("请填写有效的字段名称！");
                        return;
                    } else if (!(type.length > 0)) {
                        alert("请选择有效的类型！");
                        return;
                    } else if (!(isShow.length > 0)) {
                        alert("请选择是否显示为查询条件！");
                        return;
                    }

                    var typeStr = "";//类型名称（中文显示的名称）
                    if (type == "11") {
                        typeStr = "文本类型";
                    } else if (type == "12") {
                        typeStr = "时间类型";
                    } else if (type == "13") {
                        typeStr = "滑动条";
                    } else if (type == "14") {
                        typeStr = "下拉选框";
                    }
                    $.ajax({
                        //执行修改操作
                        type: "post",
                        url: "/iwherelink_0.1/updateOneCondition.do",
                        data: {
                            id: id,
                            name: name,
                            type: type,
                            isShow: isShow
                        },
                        success: function (data) {//成功
                            if (data == "true") {
                                //点击保存
                                $(".edit-tr" + num).find(".isShow").children("select").attr("disabled", "disabled");
                                $(".edit-tr" + num).find(".delete").text("删除");
                                $(".edit-tr" + num).find(".tjmc").text(name);
                                $(".edit-tr" + num).find(".zdlx").text(typeStr);
                                $(".edit-tr" + num).removeClass("edit-tr");
                                $(".edit-tr" + num).find(".criteria-edit").text("修改").removeClass("panduan");
                                alert("修改成功！");
                            } else {
                                alert("修改失败！");
                            }
                        },
                        error: function (data) {//失败
                            alert("修改失败");
                        }

                    });
                }

            } else {
                if (!($(this).parent("td").parent("tr").find("td:eq(0)").text().length > 0)) {
                    alert("请先完成添加操作！");
                } else {
                    //点击修改
                    //赋值
                    var tempName = $(this).parent("td").parent("tr").find("td:eq(1)").text();
                    var tempType = $(this).parent("td").parent("tr").find("td:eq(2)").text();
                    var selectEdit = '';

                    if (tempType == "文本类型") {
                        selectEdit = '<select>' + '<option value="11">' + tempType + '</option>' +
                            '<option value="12">时间类型</option>' +
                            '<option value="13">滑动条</option>' +
                            '<option value="14">下拉选框</option>' +
                            '</select>';

                    } else if (tempType == "时间类型") {
                        selectEdit = '<select>' + '<option value="12">' + tempType + '</option>' +
                            '<option value="11">文本类型</option>' +
                            '<option value="13">滑动条</option>' +
                            '<option value="14">下拉选框</option>' +
                            '</select>';

                    } else if (tempType == "滑动条") {
                        selectEdit = '<select>' + '<option value="13">' + tempType + '</option>' +
                            '<option value="11">文本类型</option>' +
                            '<option value="12">时间类型</option>' +
                            '<option value="14">下拉选框</option>' +
                            '</select>';

                    } else if (tempType == "下拉选框") {
                        selectEdit = '<select>' + '<option value="14">' + tempType + '</option>' +
                            '<option value="11">文本类型</option>' +
                            '<option value="12">时间类型</option>' +
                            '<option value="13">滑动条</option>' +
                            '</select>';
                    }
                    // $(this).parents("tr").addClass("edit-tr");
                    $(".edit-tr" + num).find(".criteria-edit").text("保存").addClass("panduan");
                    $(".edit-tr" + num).find(".isShow").children("select").removeAttr("disabled");
                    $(".edit-tr" + num).find(".tjmc").html(tempName);
                    $(".edit-tr" + num).find(".zdlx").html(selectEdit);

//	 	 		       $(this).parents("tr").find("td:eq(1) input").val(tempName); 

                }
            }
        });

        $("#cancel-criteria").click(function () {
            $(".set-criteria").hide();
            $(".tablebg-grey").hide();
        });
        //form show
        $("#sample_editable_1_new").click(function () {
            $(".add-new").show();
            $(".tablebg-grey").show();
            $(".input-text input").val("");
        });
        $("#sample_editable_1_set").click(function () {
            $(".set-criteria").show();
            $(".tablebg-grey").show();
            $(".add-tr-head").width($(".add-tr").width());


            //$(".input-text input").val("");
        });
        // form show
        // $(".add-new").hide();
        //$(".add-new h4 img").click(function() {
        //	$(".add-new").hide();
        //	$(".tablebg-grey").hide();
        //});


        $('.add_dictionary_type h4 img').click(function(){
            hide_addDictionaryTypeNew_grey();
        });
        //添加字典类型
        $("#add_dictionary_type").click(function () {
            $(".add_dictionary_type").show();
            $(".tablebg-grey").show();
            $(".input-text input").val("");
        });


        $("#del_dictionary").click(function () {
            $(".del_dictionary").show();
            $(".tablebg-grey").show();
            $.ajax({
                type: "post",
                url: "/iwherelink_0.1/dictionaryList.do",
                success: function (data) {
                    $(".del_dictionary").find("label").remove();
                    $(".del_dictionary .clearfix").before(data);
                },
                error: function (data) {
                    alert("error!");
                }
            });
        });

        //delete删除条件项
        $(".add-tr").delegate(".delete", "click", function () {
            if (confirm("确认删除？") == true) {

                if ($(this).parent("td").parent("tr").find("td:eq(0)").text().length > 0) {//有ID的话就是非添加的删除
                    var id = $(this).parent("td").parent("tr").find("td:eq(0)").text();

                    $.ajax({
                        type: "post",
                        url: "/iwherelink_0.1/deleteOneCondition.do",
                        data: {
                            id: id,
                        },
                        success: function (data) {
                            if (data == "true") {
//										 $(this).parent("td").parent("tr").remove();
                                $("#" + id).parent("tr").remove();//无法移除该行
                                alert("数据已删除!");
                            } else {
                                alert("删除失败！");
                            }

                        },
                        error: function (data) {
                            alert("删除失败!");
                        }
                    });
                } else {
                    //添加的删除
                    $(this).parent("td").parent("tr").remove();
                    alert("新添加行已删除!");
                }

            } else {
                return;
            }
        });
        // $(".change-message").hide();
        $(".databaseType").on('click', '.edit',
            function () {
                $(".change-message").show();
                var flag = $("#del").val();
                if (flag == "delDB") {

                    $(".change-message").find("form input:eq(0)").val(
                        $(this).parents("tr").find("td:eq(0)")
                            .text());
                    $(".change-message").find("form input:eq(1)").val(
                        $(this).parents("tr").find("td:eq(1)")
                            .text());
                    $(".change-message").find("form input:eq(2)").val(
                        $(this).parents("tr").find("td:eq(2)")
                            .text());
                    $(".change-message").find("form input:eq(3)").val(
                        $(this).parents("tr").find("td:eq(3)")
                            .text());
                    $("#originalData").val(
                        $(this).parents("tr").find("td:eq(0)")
                            .text());
                    $("#databasetypeid_up").val(
                        $(this).parents("tr").find("td:eq(4)")
                            .text());
                    $("#updatedatabaseid").val(
                        $(this).parents("tr").find("td:eq(5)")
                            .find("input").val());

                }
                if (flag == "delSource") {
                    $(".change-message").find("form input:eq(0)").val(
                        $(this).parents("tr").find("td:eq(0)")
                            .text());
                    $("#databaseURL1").val(
                        $(this).parents("tr").find("td:eq(1)")
                            .text());
                    $("#originalData").val(
                        $(this).parents("tr").find("td:eq(0)")
                            .text());
                    $("#originalURL").val(
                        $(this).parents("tr").find("td:eq(1)")
                            .text());
                }

                if (flag == "sourceType") {
                    $(".change-message").find("form input:eq(0)").val(
                        $(this).parents("tr").find("td:eq(0)")
                            .text());
                    $("#databaseURL1").val(
                        $(this).parents("tr").find("td:eq(1)")
                            .text());
                    $("#originalData").val(
                        $(this).parents("tr").find("td:eq(0)")
                            .text());
                    $("#originalURL").val(
                        $(this).parents("tr").find("td:eq(1)")
                            .text());
                }
                // 0205修改字典
                // if (flag == "dictionary") {
                // $("#dictionary_md").val(
                // $(this).parents("tr").find("td:eq(1)")
                // .text());
                // $("#dictionary_id").val(
                // $(this).parents("tr").find("td:eq(0)")
                // .text());
                // $("#ref_table_md").val("");
                // $("#ref_column_md").val("");
                // $("#column_type_dic").val("");
                // $("#realName_dic").val("");

                // }
                $(".tablebg-grey").show();
                // $(".input-text input").val("");
            });
        $(".change-message h4 img").click(function () {
            $(".change-message").hide();
            $(".tablebg-grey").hide();
        });
        $(".set-criteria h4 img").click(function () {
            $(".set-criteria").hide();
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
        // form content
        $(".add-new form").submit(function () {
            var flag = $("#del").val();
            // if (flag == "delDB" || flag == "delSource") {
            // var name = $(".add-new form input").val();
            // if (!$.trim(name)) {
            // alert('内容不能为空');
            // return false;
            // }
            // }
            // if (flag == "delTable") {
            // var name = $("#tablename").val();
            // if (!$.trim(name)) {
            // alert('请选择数据库');
            // return false;
            // }
            // }
            if (flag == "delCol") {
                var name = $("#columnName").val();
                if (!$.trim(name) || name == "请选择字段") {
                    alert('请选择字段');
                    return false;
                }
            }

        });
        $(".add-new form input").blur(function () {
            if ($(this).val() == "") {
                $(this).next("span").show();
            } else {
                $(this).next("span").hide();
            }
        });
        $(".change-message form").submit(function () {
            var name = $(".change-message form input").val();
            if (!$.trim(name)) {
                alert('内容不能为空');
                return false;
            }
            if ($.trim(name)) {

            }
        });
        $(".change-message form input").blur(function () {
            if ($(this).val() == "") {
                $(this).next("span").show();
            } else {
                $(this).next("span").hide();
            }
        });
        // form move
        $(".add-new h4").mousedown(function (event) {
            var isMove = true;
            // alert($(".add-new").offset().left);
            var an_x = event.pageX - $(".add-new").offset().left - 330;
            var an_y = event.pageY - $(".add-new").offset().top;
            $(document).mousemove(function (event) {
                if (isMove) {
                    $(".add-new").css({
                        'left': event.pageX - an_x,
                        'top': event.pageY - an_y
                    });
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
                    $(".change-message").css({'left': event.pageX - cm_x, 'top': event.pageY - cm_y});
                }
            }).mouseup(function () {
                isMove = false;
            });
        });
        $(".change-message h4").mousedown(
            function (event) {
                var isMove = true;
                // alert($(".add-new").offset().left);
                var cm_x = event.pageX
                    - $(".change-message").offset().left - 330;
                var cm_y = event.pageY
                    - $(".change-message").offset().top - 255;
                $(document).mousemove(function (event) {
                    if (isMove) {
                        $(".change-message").css({
                            'left': event.pageX - cm_x,
                            'top': event.pageY - cm_y
                        });
                    }
                }).mouseup(function () {
                    isMove = false;
                });
            });
        // delete
        // $(".delete")
        // .click();

        // 获取url
        // window.location.href;
        // 获取url中的参数
        (function ($) {// jquery扩展 jquery获取url参数
            // url:...?open=1
            $.getUrlParam = function (name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); // 构造一个含有目标参数的正则表达式对象
                var r = window.location.search.substr(1).match(reg); // 匹配目标参数
                if (r != null)
                    return unescape(r[2]);
                return null;// 返回参数值
            };
        })(jQuery);
        var open = $.getUrlParam('open');
        if (open == 1) {
            $(".add-new").show();
            $(".tablebg-grey").show();
        }
    });

// 字典相关方法
function hide_addNew_grey() {
    $(".add_dictionary").hide();
    $(".tablebg-grey").hide();
}
function hide_delNew_grey() {
    $(".del_dictionary").hide();
    $(".tablebg-grey").hide();
}


//字典类型弹出层关闭方法
function hide_addDictionaryTypeNew_grey() {
    $(".add_dictionary_type").hide();
    $(".tablebg-grey").hide();
}

function update_dictionary_type() {
    var typeName = $("#typeName").val();
    var desc = $("#desc").val();
    var enable = $("#enable").val();
    var id = $("#conditionTypeId").val();
    var sourceTypeId = $("#sourceTypeId").val();

    if (typeof(id) == 'undefined' || id == '' || "0" == id || id == null) {
        alert("当前字典聚类数据存在异常,烦请刷新页面后再做尝试操作!");
        return;
    }

    if (typeof(sourceTypeId) == 'undefined' || sourceTypeId == '' || "0" == sourceTypeId || sourceTypeId == null) {
        alert("动一动您的小手,烦请选择业务场景后再做操作!");
        return;
    }
    if (typeof(typeName) == 'undefined' || typeName == '' || typeName == null) {
        alert("动一动您的小手,烦请填写字典聚类名称!");
        return;
    }
    if (typeof(enable) == 'undefined' || enable == '' || enable == null) {
        enable = "1";
    }

    $.ajax({
        type: "post",
        url: "/iwherelink_0.1/updateConditionType.do",
        data: {
            typeName: typeName,
            desc: desc,
            enable: enable,
            id: id,
            sourceTypeId: sourceTypeId
        },
        success: function (data) {
            if ("NOTFOUND" == data) {
                alert("很遗憾地告诉您,当前字典聚类数据已经失效,烦请刷新页面后再做尝试操作!");
                location.href = "getConditionDictionaryTypePage.do";
            } else if ("SUCCESS" == data) {
                alert("您太聪明了,恭喜您字典聚类编辑成功!");
                location.href = "getConditionDictionaryTypePage.do";
            } else if ("FAIL" == data) {
                alert("很遗憾地告诉您,字典聚类数据编辑失败,请稍后再做操作!");
                return;
            } else if ("RELATION" == data) {
                alert("很遗憾地告诉您,请先删除绑定的字典聚类相关数据后,再做操作!");
                return;
            } else if ("EXCEPTION" == data) {
                alert("很遗憾地告诉您,字典聚类编辑操作出现异常,请稍后再做操作!");
                return;
            } else if ("EXIST" == data) {
                alert("很遗憾地告诉您,您当前输入的字典聚类已经存在,请重新输入!");
                return;
            }
        },
        error: function (data) {
            alert("请求操作存在错误,请刷新页面后再做操作!");
            return;
        }
    });
}


//字典聚类的添加
function add_dictionary_type() {
    //数据源id
    var sourceTypeId = $("#addSourceTypeId").val();
    //获取字典类型
    var typeName = $("#addTypeName").val();
    //获取描述,可以不填写
    var desc = $("#addDesc").val();
    //是否启用,默认是启用的
    var enable = $("#addEnable").val();

    if (typeof(sourceTypeId) == 'undefined' || sourceTypeId == '' || "0" == sourceTypeId || sourceTypeId == null) {
        alert("动一动您的小手,烦请选择业务场景后再做操作!");
        return;
    }
    if (typeof(typeName) == 'undefined' || typeName == '' || typeName == null) {
        alert("动一动您的小手,烦请填写字典聚类名称!");
        return;
    }
    if (typeof(enable) == 'undefined' || enable == '' || enable == null) {
        enable = "1";
    }

    $.ajax({
        type: "post",
        url: "/iwherelink_0.1/addDictionaryType.do",
        data: {
            typeName: typeName,
            desc: desc,
            enable: enable,
            sourceTypeId: sourceTypeId
        },
        success: function (data) {
            if ("SUCCESS" == data) {
                alert("您太聪明了,恭喜您字典聚类增加成功!");
                location.href = "getConditionDictionaryTypePage.do";
            } else if ("FAIL" == data) {
                alert("很遗憾地告诉您,字典聚类数据添加失败,请稍后再做操作!");
                return;
            } else if ("RELATION" == data) {
                alert("很遗憾地告诉您,请先删除绑定的字典聚类相关数据后,再做操作!");
                return;
            } else if ("EXCEPTION" == data) {
                alert("很遗憾地告诉您,字典聚类添加操作出现异常,请稍后再做操作!");
                return;
            } else if ("EXIST" == data) {
                alert("很遗憾地告诉您,您当前输入的字典聚类已经存在,请重新输入!");
                return;
            }
        },
        error: function (data) {
            alert("请求操作存在错误,请刷新页面后再做操作!");
            return;
        }
    });
}

//添加字典
$("#add_dictionary").click(function () {

    $("#dictionaryType_dictionary").empty();
    $(this).find().remove("p.errormsg");
    var sourceTypeId = $("#selectDataProducts_dictionary").val();
    //为了能够公用对应的数据,此处加一个标识区分
    $.ajax({
        type: "post",
        url: "/iwherelink_0.1/getConditionDictionaryTypeBySourceType.do",
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
            $("#dictionaryType_dictionary").append(option);
        },
        error: function () {
            alert("加载字典聚类失败！");
        }
    });
    $(".add_dictionary").show();
    $(".tablebg-grey").show();
    $(".input-text input").val("");
});

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
clickTR();
function clickTR() {
//点击相应的列，显示下拉菜单的信息
    $("#conditionInfolist_tbody tr").click(function () {
        var conditionInfoDisplayType = $(this).find("td:eq(5)").text().trim();
        $(".sublist h4").html("");
        if (conditionInfoDisplayType == "下拉框") {
            var conditionName = $(this).find("td:eq(3)").text().trim();
            var conditionKW = $(this).find("td:eq(4)").text().trim();
            $(".sublist").removeClass("hidden").find("ul").empty();
            $(".sublist h4").append(conditionName + "(" + conditionKW + ")的下拉选项");
            var conditionInfoId = $(this).find("td:first").text().trim();

            var li = "<li class='list-group-item'>test</li>";
            $.ajax({
                type: "post",
                url: "/iwherelink_0.1/getAllDictInfoBycondInfoId.do",
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
function conditionInfoDisplayChange(conditionInfoId, conditionInfoDisplayType) {
    $("select#update_display_type").parent().next().find("span.input-text").empty();
    if (conditionInfoDisplayType == "14") {
        $.ajax({
            type: "post",
            url: "/iwherelink_0.1/getAllDictInfoBycondInfoId.do",
            dataType: "json",
            data: {
                conditionInfoId: conditionInfoId
            },
            success: function (data) {
                if (data != "") {
                    var ul = showSubList(data);
                    $("select#update_display_type").parent().after(ul);
                    $(".add-btn").click(function () {
                        var newli = "<li class='list-group-item input-append'><input type='text' class='span' /><button type='button' class='minus-btn'>×</button></li>";
                        $("ul.list-group li:first").before(newli);

                    });
                    $("button.minus-btn").click(function () {
                        if ($(this).parent("li").siblings().size() != 1) {
                            $(this).parent().remove("li");
                        }

                    });
                } else {
                    var ul = showSubList("");
                    var li = "<li class='list-group-item input-append'><input type='text' class='span'/><button type='button' class='minus-btn'>×</button></li>";

                    $("select#update_display_type").parent().after(ul);
                    $(".add-btn").click(function () {
                        $("ul.list-group li:first").before(li);

                        $("button.minus-btn").click(function () {
                            if ($(this).parent("li").siblings().size() != 1) {
                                $(this).parent().remove("li");
                            }

                        });
                    });
                }
            },
            error: function () {
                alert("加载下拉选项失败！");
            }
        });
    }
}

// 修改字典
function dictionary_edit(conditionInfoId) {
    $(".change-message").children().remove(".errormsg");
    $("input:radio").parent().removeClass("checked");
    $("select#update_display_type").parent().next().find("span.input-text").empty();
    $("select#update_display_type").parent().next().remove("span.input-text");

    if (typeof(conditionInfoId) != 'undefined' && conditionInfoId != "" && conditionInfoId != null) {
        $("#update_dictionary_id").val(conditionInfoId);
        $.ajax({
            type: "post",
            url: "/iwherelink_0.1/getConditionInfo.do",
            data: {
                id: conditionInfoId
            },
            dataType: "json",
            success: function (data) {
                $("#updateDataProducts_dictionary").find("option[value ='" + data.sourceTypeId + "']").attr("selected", true);
                var dictionaryType = data.dictionaryType;
                var conditionInfoDisplayType = data.conditionType;
                alert(conditionInfoDisplayType);
                var isShow = data.isShow;
                $("#update_display_type").find("option[value ='" + conditionInfoDisplayType + "']").attr("selected", true);
                //如果为下拉菜单显示下拉菜单内容，可批量修改下来
                conditionInfoDisplayChange(conditionInfoId, conditionInfoDisplayType);

                $("select#update_display_type").change(function () {
                    $("select#update_display_type").parent().next().remove("span.input-text");
                    var type = $(this).val();
                    conditionInfoDisplayChange(conditionInfoId, type);

                });
                $("input:radio[value ='" + isShow + "']").parent().addClass("checked");
                $.ajax({
                    type: "post",
                    url: "/iwherelink_0.1/getConditionDictionaryTypeBySourceType.do",
                    dataType: "json",
                    data: {
                        pageNo: 1,
                        id: data.sourceTypeId
                    },
                    success: function (data) {
                        var option = "";
                        $.each(data, function (n, value) {
                            option += "<option value='" + value.id + "'>" + value.typeName + "</option>";
                        });
                        $("#update_display_type").find("option[value ='" + dictionaryType + "']").attr("selected", true);
                        $(".dictionaryTypeList").append(option);
                        $("#update_dictionaryType_dictionary").empty();
                        $("#update_dictionaryType_dictionary").html(dictionaryType);
                    },
                    error: function () {
                        alert("加载字典聚类失败！");
                    }
                });
                $("#update_dic").val(data.chineseName);
            },
            error: function (data) {
                alert("修改字典获取数据错误");
            }
        });
    } else {
        alert("非法参数传递");
    }
    $(".change-message").show();
    $(".tablebg-grey").show();
}

// 删除字典
function dictionary_del(conditionInfoId) {


    if (typeof(conditionInfoId) != 'undefined' && conditionInfoId != "" && conditionInfoId != null) {
        $("#del_dic_id").val(conditionInfoId);
        $(".msg").empty();
        $.ajax({
            type: "post",
            url: "/iwherelink_0.1/getDetailsConditionInfoById.do",
            data: {
                id: conditionInfoId
            },
            dataType: "json",
            success: function (data) {
                if (data.count > 0) {
                    $("p#alert_msg ").find(".msg").append("仍有" + data.count + "条字典映射，");
                }
                $("p#del_chineseName ").find(".msg").append(data.chineseName);
                $("p#del_keyWord ").find(".msg").append(data.keyWord);
                $("p#del_sourceType").find(".msg").append(data.sourceType);
                $("p#del_typeName ").find(".msg").append(data.typeName);
                $(".pop #del").click(function () {
                    $.ajax({
                        type: "post",
                        url: "/iwherelink_0.1/delConditionInfo.do",
                        data: {
                            id: conditionInfoId
                        },
                        dataType: "html",
                        success: function (data) {
                            alert("字典删除成功" + data);
                            location.href = "dic_cfg";
                        },
                        error: function (data) {
                            alert("字典删除失败" + data);
                        }
                    });
                });
            },
            error: function (data) {
                alert("字典类型刷新失败" + data);
                location.href = "getConditionInfoList.do";
            }
        });
        $(".pop").show();

    } else {
        alert("非法参数传递");
    }

}

//修改字典聚类数据获取
function dictionary_type_edit(obj) {
    $(".add_dictionary").show();
    $(".tablebg-grey").show();
    var conditionTypeId = obj;
    if (typeof(conditionTypeId) == 'undefined' || "" == conditionTypeId || null == conditionTypeId) {
        alert("当前字典聚类数据存在异常,请刷新页面后再做尝试操作!");
        return;
    }
    $.ajax({
        type: "post",
        url: "/iwherelink_0.1/getConditionTypeInfo.do",
        data: {
            conditionTypeId: conditionTypeId
        },
        dataType: "json",
        success: function (data) {
            $("#conditionTypeId").val(data[0].id);
            $("#sourceTypeId").find("option[value='" + data[0].sourceTypeId + "']").attr("selected", "selected");
            $("#typeName").val(data[0].typeName);
            $("#desc").val(data[0].desc);
            $("#enable").find("option[value='" + data[0].enable + "']").attr("selected", "selected");
        },
        error: function () {
            alert("当前字典聚类数据加载错误,请刷新页面后再做尝试操作!");
            return;
        }
    });


}

// 页面切换字典下拉框
function dictionaryFilter() {
    var condition = $(".dictionaryList").val();
    var url = "";
    if (condition == "全部") {
        location.href = "getAllDictionaryPage.do";
    } else {
        url = "/iwherelink_0.1/getAllDictionaryPageByDic.do";
        $.ajax({
            type: "post",
            url: url,
            data: {
                condition: condition
            },
            dataType: "json",
            success: function (data) {
                $(".table tbody:first").html(data.table);
                $(".pagination ul:first").html(data.page);
            }
        });

    }
}


//页面切换字典类型状态下拉框
function dictionaryTypeStatusFilter() {
    var status = $("#dictionaryTypeStatusList").val();
    var url = "";
    if (typeof(status) == 'undefined' || status == '' || status == null) {
        location.href = "getConditionDictionaryTypePage.do";
    } else {
        url = "/iwherelink_0.1/getConditionDictionaryTypePage.do";
        $.ajax({
            type: "post",
            url: url,
            data: {
                status: status
            },
            //dataType : "json",
            success: function (data) {
                alert("data:" + data);
                //$(".table tbody:first").html(data.table);
                //$(".pagination ul:first").html(data.page);
            }
        });
    }
}


// 字典页面筛选后分页
function dicListByPage(condition, page) {
    $.ajax({
        type: "post",
        url: "/iwherelink_0.1/getAllDictionaryPageByDic.do",
        data: {
            condition: condition,
            page: page
        },
        dataType: "json",
        success: function (data) {
            $(".table tbody:first").html(data.table);
            $(".pagination ul:first").html(data.page);
        }
    });
}


function hidePropLayer(clazz) {
    if (typeof(clazz) != 'undefined' && null != clazz && '' != clazz) {
        $("." + clazz).hide();//要隐藏的层
        $(".tablebg-grey").hide();//遮罩层
    }
}


$(document)
    .ready(
    function (e) {

        // 展示用
        $(".page-link1")
            .click(
            function () {
                var name = $(".add-new form select");
                for (var i = 0; i < name.size(); i++) {
                    if ($.trim($(name).eq(i).val()) == "选择数据库") {
                        alert('请选择数据库！');
                        return false;
                    }
                    if ($.trim($(name).eq(i).val()) == "选择数据表") {
                        alert('请选择数据库表名！');
                        return false;
                    }
                    if ($.trim($(name).eq(i).val()) == "选择数据类型") {
                        alert('请选择选择数据类型名！');
                        return false;
                    }
                }

                // 添加表校验
                var database_type_name = $(
                    ".database-type").val();
                var databasename = $(".database-type2")
                    .val();
                var tablename = $(".database-type3")
                    .val();
                var sourceType = $("#sourceType").val();

                $
                    .ajax({
                        type: "post",
                        url: "addTableView.do",
                        data: {
                            sourceType: sourceType,
                            databasename: databasename,
                            tablename: tablename
                        },
                        success: function (data,
                                           textStatus) {
                            if (data == "true") {
                                alert("表添加成功!");
                                $(".add-new")
                                    .hide();
                                $(".tablebg-grey")
                                    .hide();
                                // 添加成功重新发送一个请求
                                location.href = "getAllDatabaseTablesPage.do?pageNo=1";

                            } else if (data == "") {
                                alert("请选择完整添加信息！");
                            } else {
                                // 表已经存在，重复添加导致添加失败
                                alert("表"
                                    + tablename
                                    + "在"
                                    + databasename
                                    + "数据库中已存在，请重新添加！");
                                $(".add-new")
                                    .show();
                                $(".tablebg-grey")
                                    .show();
                                $(".database-type2")
                                    .val(
                                    databasename);
                                $(".database-type3")
                                    .val(
                                    tablename);
                            }
                        },
                        error: function (data,
                                         textStatus) {
                            alert("未知错误。。。状态："
                                + textStatus);
                        }
                    });
                $(".add-new").trigger();
            });

        //业务场景切换时,字典聚类下拉框数据的获取
        $("#selectDataProducts").change(function () {
            var sourceTypeId = $("#selectDataProducts").val();

            //alert("sourceTypeId2:"+sourceTypeId);
            if (typeof(sourceTypeId) != 'undefined' && sourceTypeId != "0" && sourceTypeId != "" && sourceTypeId != null) {
                $.ajax({
                    type: "post",
                    url: "/iwherelink_0.1/getConditionDictionaryTypeBySourceType.do",
                    dataType: "json",
                    data: {
                        id: sourceTypeId
                    },
                    success: function (data) {
                        $("#addDictionaryTypeMapping").empty();
                        var option = "<option value ='0'>选择字典聚类</option>";
                        $.each(data, function (n, value) {
                            option += "<option value='" + value.id + "'>" + value.typeName + "</option>";
                        });
                        $("#addDictionaryTypeMapping").append(option);
                        if (data.length == 0) {
                            $("#dictionaryList_add").empty();
                            $("#database_type2").empty();
                            $("#columnName").empty();
                            $("#column_type").val("");
                        }
                    },
                    error: function () {
                        alert("加载字典类型失败！");
                    }
                });
            } else {
                $("#addDictionaryTypeMapping").empty();
                $("#addDictionaryTypeMapping").append("<option value ='0'>选择字典聚类</option>");
                $("#dictionaryList_add").empty();
                $("#dictionaryList_add").append("<option value ='0'>选择字典</option>");
                $("#database_type2").empty();
                $("#database_type2").append("<option value ='0'>选择表</option>");
                $("#columnName").empty();
                $("#columnName").append("<option value ='0'>选择字段</option>");
                $("#column_type").val("");
            }
        });


        $("#databaseSource").change(function () {
            $("#databaseURL").val($(this).find("option:selected").attr("url"));
        });


//					//添加字典的时候  切换数据产品的时候,字典类型值得获取
//					$("#selectDataProducts_dictionary").change(function(){
//						var sourceTypeId = $("#selectDataProducts_dictionary").val();
//						if(typeof(sourceTypeId) != 'undefined' && sourceTypeId != "0" && sourceTypeId != "" && sourceTypeId != null){
//							$.ajax({
//								type : "post",
//								url : "getConditionDictionaryTypeBySourceType.do",
//								dataType : "html",
//								data : {
//									id : sourceTypeId
//								},
//								success : function(data) {
//									$("#dictionaryType_dictionary").empty();
//									$("#dictionaryType_dictionary").html(data);
//									
//								},
//								error : function() {
//									alert("加载字典类型失败！");
//								}
//							});
//						}else{
//							$("#dictionaryType_dictionary").empty();
//						}
//					})

        //获取数据类型下拉列表
        $.ajax({
            type: "post",
            //url : "getAllSourceType.do",
            url: "/iwherelink_0.1/getAllSourceType.do",
            dataType: "json",
            success: function (data) {
                $(".sourceTypeList").find("option[value!='0']").remove("option");
                $(".dictionaryTypeList").find("option[value!='0']").remove("option");
                var option = "";
                $.each(data, function (n, value) {
                    option += "<option value='" + value.id + "'>" + value.sourceType + "</option>";
                });
//								$("#conditionInfo_sourceType").find("option").after(option);
                $(".sourceTypeList").append(option);
            },
            error: function (data) {
                alert("获取数据类型列表失败！");
            }
        });

        //字典列表  切换数据产品的时候,字典类型值得获取
        $(".sourceTypeList").change(function () {
            $(".dictionaryTypeList").find("option[value!='0']").remove("option");
            var sourceTypeId = $(this).val();

            //为了能够公用对应的数据,此处加一个标识区分
            $.ajax({
                type: "post",
                url: "/iwherelink_0.1/getConditionDictionaryTypeBySourceType.do",
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

//					$("#conditionInfo_sourceType").change(function(){
//						changeDirctionaryList();
//						//根据业务场景的选项填充字典聚类的下拉框
//						var sourceTypeId = $("#conditionInfo_sourceType").val();
//						$.ajax({
//							type : "post",
//							url : "getConditionDictionaryTypeBySourceType.do",
//							dataType : "json",
//							data : {
//								id : sourceTypeId
//							},
//							success : function(data) {
//								var option="<option value ='0'>选择字典聚类</option>";
//								$.each(data,function(n,value){
//									option+="<option value='"+value.id+"'>"+value.typeName+"</option>";
//								});
//								$("#conditionInfo_dictionaryType").empty();
//								$("#conditionInfo_dictionaryType").html(option);
//								$("#conditionInfo_dictionaryType").change(function(){
//									changeDirctionaryList();
//								});
//							},
//							error : function() {
//								alert("很遗憾地告诉您,加载字典聚类数据失败!");
//								return;
//							}
//						});
//					});


        //切换全部字典聚类，在表格显示不同的数据
        $(".dictionaryTypeList").change(function () {
            changeDirctionaryList();
        });

        //获取页码
//					setPageButton();
//					function setPageButton(){
        $(".pagination ul").find("li:eq(1)").addClass("active");
        $(".pagination ul").find("li").click(function () {
            var sourceTypeId = $("#conditionInfo_sourceType").val();
            var dictionaryTypeId = $("#conditionInfo_dictionaryType").val();

            var page = parseInt($(this).text().trim());
            var pageSize = parseInt($(".pagination ul").find("li").size() - 2);

            var columnPageListFlag = $("#column_page_list_flag").val();

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
            changeDirctionaryList(page);
//						if(typeof(columnPageListFlag) != 'undefined' && null != columnPageListFlag && "" != columnPageListFlag && "column" == columnPageListFlag){
////							url = "getDictionaryMappingInfosForHtml.do";//字典映射列表
//							getDictionaryMapping(sourceTypeId,dictionaryTypeId,"","",page);
//						}else{
//							getDictionaryInfo(sourceTypeId,dictionaryTypeId,"","",page);
//						}
//						$.ajax({
//							type : "post",
//							url : "getConditionInfoListHtml.do",
//							dataType : "json",
//							data : {
//								sourceTypeId : sourceTypeId,
//								dictionaryTypeId : dictionaryTypeId,
//								page :page
//							},
//							success : function(data) {
//								showConditionInfoTbody(data.data);
//								$(".pagination ul").find("li").removeClass("active").eq(page).addClass("active");},
//						error:function(data) {
////							alert("分页失败");
//						}
//						});
        });
//					}


        function changeDirctionaryList(page) {
            var sourceTypeId = $("#conditionInfo_sourceType").val();
            var dictionaryTypeId = $("#conditionInfo_dictionaryType").val();
            var columnPageListFlag = $("#column_page_list_flag").val();
            if (typeof(page) == 'undefined') {
                page = 1;
            }
//						var url = "getConditionInfoListHtml.do";//字典列表
            if (typeof(columnPageListFlag) != 'undefined' && null != columnPageListFlag && "" != columnPageListFlag && "column" == columnPageListFlag) {
//							url = "getDictionaryMappingInfosForHtml.do";//字典映射列表
                getDictionaryMapping(sourceTypeId, dictionaryTypeId, "", "", page);
            } else {
                getDictionaryInfo(sourceTypeId, dictionaryTypeId, "", "", page);
            }
//						$.ajax({
//							type : "post",
//							url : url,
//							dataType :"json",
//							data : {
//								sourceTypeId : sourceTypeId,
//								dictionaryTypeId : dictionaryTypeId,	
//							},
//							success : function(data) {
//								if(typeof(columnPageListFlag) != 'undefined' && null != columnPageListFlag && "" != columnPageListFlag && "column" == columnPageListFlag){//字典映射关系表
//									$("#columnInfoListMapping_tbody").empty();
//									$("#columnInfoListMapping_tbody").html(data.mapResult);
//									showPagination(data.page);
//									setPageButton();
////									$(".pagination ul").empty();
////									if(data.page>1){
////									$(".pagination ul").html(data.page);
////									}
//								}else{//字典列表
//									if(data.page>0){
//										showConditionInfoTbody(data.data);
//										showPagination(data.page);
//										setPageButton();
//									}else{
//										$("#conditionInfolist_tbody").empty();
//										$(".pagination ul").empty();
//										$("#conditionInfolist_tbody").append("<tr><td colspan='8' class='text-center'>暂无数据</td></tr>");
//									}
//								}
//							},
//							error : function() {
//								if(typeof(columnPageListFlag) != 'undefined' && null != columnPageListFlag && "" != columnPageListFlag && "column" == columnPageListFlag){//字典映射关系表
//									alert("很遗憾地告诉您,加载字典表映射列表数据失败,请稍后再做尝试操作!");
//									return;
//								}else{
//									alert("很遗憾地告诉您,加载字典列表数据失败,请稍后再做尝试操作!");
//									return;
//								}
//							}
//						});
        }


//					$("#conditionInfo_dictionaryType").change(function(){
//						var sourceTypeId = $("#conditionInfo_sourceType").val();
//						var dictionaryTypeId = $("#conditionInfo_dictionaryType").val();
//						var columnPageListFlag = $("#column_page_list_flag").val();
//						var url = "getConditionInfoListHtml.do";//字典列表
//						if(typeof(columnPageListFlag) != 'undefined' && null != columnPageListFlag && "" != columnPageListFlag){
//							url = "getDictionaryMappingInfosForHtml.do";//字典映射列表
//						}
//						$.ajax({
//							type : "post",
//							url : url,
//							dataType : "json",
//							data : {
//								sourceTypeId : sourceTypeId,
//								dictionaryTypeId : dictionaryTypeId,
//							},
//							success : function(resultData) {
//																if(typeof(columnPageListFlag) != 'undefined' && null != columnPageListFlag && "" != columnPageListFlag){
//									$("#columnInfoListMapping_tbody").empty();
//									$("#columnInfoListMapping_tbody").html(resultData.mapResult);
//									$(".pagination").find("ul").empty();
//									$(".pagination").find("ul").html(resultData.page);
//								}else{
//									$("#conditionInfolist_tbody").empty();
//									$("#conditionInfolist_tbody").html(resultData.result);
//								}
//							},
//							error : function() {
//								alert("加载字典列表失败！");
//							}
//						});					
//					})


        //添加业务场景映射时,业务场景下拉框切换时调用的监听事件
        $("#tableinfo_sourceType").change(function () {
            $("#tableinfo_databasename option[value='0']").attr("selected", "selected");
            $("#tableinfo_tablename").empty();
            $("#tableinfo_tablename").html("<option value = '0'>选择数据表</option>");
        });

        //添加业务场景映射时,数据库下拉框切换时调用的监听事件
        $("#tableinfo_databasename").change(function () {
            $("#tableinfo_tablename").empty();
            var databaseInfoId = $("#tableinfo_databasename").find("option:selected").val();
            $.ajax({
                type: "post",
                url: "/iwherelink_0.1/getTablesFromDatabaseInfo.do",
                data: {
                    databaseInfoId: databaseInfoId
                },
                success: function (data) {
                    $("#tableinfo_tablename").empty();
                    $("#tableinfo_tablename").html(data);
                }
            });
        });

        /*$(".pagination ul li a").each(function(){
         var url = $(this).attr("url");
         $(this).click(function(){
         var sourceTypeId = $("#conditionInfo_sourceType").val();
         var dictionaryTypeId = $("#conditionInfo_dictionaryType").val();
         if(typeof(url) != 'undefined' && null != url && "" != url){
         $.ajax({
         type : "post",
         url : url,
         dataType : "json",
         data : {
         sourceTypeId : sourceTypeId,
         dictionaryTypeId : dictionaryTypeId,
         },
         success : function(data) {
         $("#columnInfoListMapping_tbody").empty();
         $("#columnInfoListMapping_tbody").html(data.mapResult);

         },
         error : function() {
         alert("加载字典列表失败！");
         }
         });				
         }
         })
         })*/

        /*//业务场景映射tableInfo删除操作的监听事件
         $("#tableinfo_tbody tr td a").each(function(){
         $(this).click(function(){
         alert("delete......");

         })
         })*/

        //修改字典的时候  切换数据产品的时候,字典类型值得获取
//					$("#selectDataProducts_update_dictionary").change(function(){
//						var sourceTypeId = $("#selectDataProducts_update_dictionary").val();
//						if(typeof(sourceTypeId) != 'undefined' && sourceTypeId != "0" && sourceTypeId != "" && sourceTypeId != null){
//							$.ajax({
//								type : "post",
//								url : "getConditionDictionaryTypeBySourceType.do",
//								dataType : "html",
//								data : {
//									id : sourceTypeId
//								},
//								success : function(data) {
//									$("#update_dictionaryType_dictionary").empty();
//									$("#update_dictionaryType_dictionary").html(data);
//									
//								},
//								error : function() {
//									alert("加载字典类型失败！");
//								}
//							});
//						}else{
//							$("#update_dictionaryType_dictionary").empty();
//						}
//					})
//					


        $("#addDictionaryTypeMapping").change(function () {
            var dictionaryTypeId = $("#addDictionaryTypeMapping").val();
            if (typeof(dictionaryTypeId) != 'undefined' && dictionaryTypeId != "0" && dictionaryTypeId != "" && dictionaryTypeId != null) {
                $.ajax({
                    type: "post",
                    url: "/iwherelink_0.1/getDictionaryByType.do",
                    dataType: "json",
                    data: {
                        dictionaryTypeId: dictionaryTypeId
                    },
                    success: function (data) {
                        $("#dictionaryList_add").empty();
                        $("#dictionaryList_add").html(data.dictionary);
                        if (data.dictionary.length == 0) {
                            $("#database_type2").empty();
                            $("#columnName").empty();
                            $("#column_type").val("");
                        }
                        $("#database_type2").empty();
                        $("#database_type2").html(data.table);
                        if (data.table.length == 0) {
                            $("#columnName").empty();
                            $("#column_type").val("");
                        }
                    },
                    error: function () {
                        alert("加载字典失败！");
                    }
                });
            } else {
                $("#dictionaryList_add").empty();
                $("#database_type2").empty();
                $("#columnName").empty();
                $("#column_type").val("");
            }
        });


        //业务场景关系映射的添加事件监听
        $("#tableinfo_add").click(function () {
            var sourceTypeId = $("#tableinfo_sourceType").val();
            var databaseInfoId = $("#tableinfo_databasename").val();
            var tableName = $("#tableinfo_tablename").val();
            var mapType = $("#tableinfo_tableMapType").val();
            if (typeof(sourceTypeId) == 'undefined' || sourceTypeId == '0' || sourceTypeId == '' || sourceTypeId == null) {
                alert("亲,动一动您的小手,烦请选择业务场景!");
                return;
            }
            if (typeof(databaseInfoId) == 'undefined' || databaseInfoId == '0' || databaseInfoId == '' || databaseInfoId == null) {
                alert("亲,动一动您的小手,烦请选择数据库!");
                return;
            }
            if (typeof(tableName) == 'undefined' || tableName == '0' || tableName == '' || tableName == null) {
                alert("亲,动一动您的小手,烦请选择数据表!");
                return;
            }
            if (typeof(mapType) == 'undefined' || mapType == '0' || mapType == '' || mapType == null) {
                alert("亲,动一动您的小手,烦请选择数据映射类型!");
                return;
            }
            $.ajax({
                type: "post",
                url: "/iwherelink_0.1/addTableInfo.do",
                data: {
                    sourceTypeId: sourceTypeId,
                    databaseInfoId: databaseInfoId,
                    tableName: tableName,
                    tableMapType: mapType
                },
                success: function (data) {
                    if ("EXIST" == data) {
                        alert("业务场景表映射关系已经存在,请确认后再做添加!");
                        return;
                    } else if ("FAIL" == data) {
                        alert("业务场景表映射关系数据编辑失败,请稍后再做编辑!");
                        return;
                    } else if ("SUCCESS" == data) {
                        alert("您太聪明了,业务场景表映射数据添加成功!");
                        location.href = "scene_cfg";
                    } else if ("EXCEPTION" == data) {
                        alert("业务场景表映射关系数据编辑存在异常,请稍后再做操作!");
                        return;
                    }
                },
                error: function (data) {
                    alert("保存业务场景映射关系数据失败,请稍后再做操作!");
                    return;
                }
            });
        });

        //修改字典
        $("#update_dictionary_button").click(function () {
            var conditionId = $("#update_dictionary_id").val();//字典ID
//						var sourceTypeId = $("#updateDataProducts_dictionary").val();//数据类型
            var dictionaryTypeId = $("#updateDictionaryType_dictionary").val();//字典类型
            var conditionName = $("#update_dic").val();//字典名称
            var conditionaryDisplayId = $("#update_display_type").val();//字典显示类型
            var isShow = $("span.checked > input").val();//字典是否显示

            var subList = new Array($("ul.list-group li").size());

            $("ul.list-group li").each(function (n) {
                if ($(this).find("input").val() != "" && $(this).find("input").val() != undefined) {
                    subList[n] = $(this).find("input").val();
                }
            });

            if ($(".change-message").children().is("errormsg")) {
                alert($(".errormsg").text());
                return
            }
            if (typeof(dictionaryTypeId) == 'undefined' || dictionaryTypeId == '0' || dictionaryTypeId == '' || dictionaryTypeId == null) {
                alert("请选择字典聚类");
                return;
            }
            if (typeof(conditionaryDisplayId) == 'undefined' || conditionaryDisplayId == '' || conditionaryDisplayId == null) {
                alert("请填写字典展示类型");
                return;
            }

            if (typeof(conditionName) == 'undefined' || conditionName == '' || conditionName == null) {
                alert("请填写字典名称");
                return;
            }


            $.ajax({
                type: "post",
                url: "/iwherelink_0.1/updateConditionInfo.do",
                data: {
//								sourceTypeId:sourceTypeId,
                    id: conditionId,
                    conditionName: conditionName,
                    dictionaryTypeId: dictionaryTypeId,
                    conditionaryDisplayId: conditionaryDisplayId,
                    isShow: isShow,
                    "subList": subList
                },
                traditional: true,
                success: function (data) {
                    if (data == "SUCCESS") {
                        alert("修改成功！");
                    } else {
                        alert("未知原因修改失败,请第一时间联系系统管理员！");
                    }
                    $(".change-message").hide();
                    $(".tablebg-grey").hide();
                    location.href = "dic_cfg";
                },
                error: function (data) {
                    alert("未知原因修改失败,请第一时间联系系统管理员！");
                }
            });

        });

        $("#columnName").change(function () {
            // 数据库字段配置 字段下拉框改变
            var typeDbTable = $(".database-type2").val();
            var column = $(".database-type3").find("option:selected").text();
            if (typeof(typeDbTable) != "undefined" && typeDbTable != "" && typeDbTable != null && typeDbTable != "0" && column != "请选择字段") {
                $.ajax({
                    type: "post",
                    url: "/iwherelink_0.1/typeFormOption.do?typeDbTable=" + typeDbTable + "&column="
                    + column,
                    dataType: "json",
                    success: function (data) {
                        if (data.columnType) {
                            if (data.columnType == "dbtype_error") {
                                alert("请选择正确的数据库类型！");
                            } else if (data.columnType == "field_error") {
                                alert("请选择正确的字段！");
                            } else {
                                $("#column_type").val(data.columnType);
                            }
                        }
                        if (data.chineseNames) {
                            $("#chineseName").html(data.chineseNames);
                        }
                    }
                });
            } else {
                if (typeof(typeDbTable) == "undefined" || typeDbTable == "0") {
                    alert("请选择正确的数据库表和字段！");
                } else if (typeDbTable == "选择数据表") {
                    alert("请选择正确的数据库表！");
                } else if (column == "请选择字段") {
                    alert("请选择正确的字段！");
                }
            }
        })
    });


function pageClick(obj) {
    var url = $(obj).attr("url");
    var sourceTypeId = $("#conditionInfo_sourceType").val();
    var dictionaryTypeId = $("#conditionInfo_dictionaryType").val();
    $.ajax({
        type: "post",
        url: url,
        dataType: "json",
        data: {
            sourceTypeId: sourceTypeId,
            dictionaryTypeId: dictionaryTypeId,
        },
        success: function (data) {
            $("#columnInfoListMapping_tbody").empty();
            $("#columnInfoListMapping_tbody").html(data.mapResult);

            $(".pagination ul").empty();
            $(".pagination ul").html(data.page);

        },
        error: function () {
            alert("加载字典列表失败！");
        }
    });
}


function columnChange() {
    // 数据库字段配置 字段下拉框改变
    var typeDbTable = $(".database-type2").val();
    var column = $(".database-type3").text();
    if (typeof(typeDbTable) != "undefined" && typeDbTable != "" && typeDbTable != null && typeDbTable != "0" && column != "请选择字段") {
        $.ajax({
            type: "post",
            url: "/iwherelink_0.1/typeFormOption.do?typeDbTable=" + typeDbTable + "&column="
            + column,
            dataType: "json",
            success: function (data) {
                if (data.columnType) {
                    if (data.columnType == "dbtype_error") {
                        alert("请选择正确的数据库类型！");
                    } else if (data.columnType == "field_error") {
                        alert("请选择正确的字段！");
                    } else {
                        $("#column_type").val(data.columnType);
                    }
                }
                if (data.chineseNames) {
                    $("#chineseName").html(data.chineseNames);
                }
            }
        });
    } else {
        if (typeof(typeDbTable) == "undefined" || typeDbTable == "0") {
            alert("请选择正确的数据库表和字段！");
        } else if (typeDbTable == "选择数据表") {
            alert("请选择正确的数据库表！");
        } else if (column == "请选择字段") {
            alert("请选择正确的字段！");
        }
    }
}


function add_database_type() {
    // 添加数据源
    var databasetype = $("#databasetype").val();
    var databaseURL = $("#databaseURL").val();
    if (typeof(databasetype) == 'undefined' || databasetype == '' || databasetype == null) {
        alert("动一动您的小手,填写下数据源名称");
        return;
    }
    if (typeof(databaseURL) != 'undefined' && databaseURL != '' && databasetype != null) {
        if (databaseURL.indexOf(":") <= 0) {
            alert("动一动您的小手,填写下正确的url");
            return;
        }
    }
    if (databasetype != null && databasetype.trim().length > 0) {
        $.ajax({
            type: "post",
            url: "/iwherelink_0.1/addDBType.do",
            data: {
                databasetype: databasetype.trim(),
                databaseURL: databaseURL.trim()
            },
            success: function (data) {
                if ("EXIST" == data) {
                    alert("数据库类型已经存在,请确认后再做添加!");
                    return;
                } else if ("FAIL" == data) {
                    alert("数据库类型添加异常,请稍后再做添加!");
                    return;
                } else if ("SUCCESS" == data) {
                    alert("您太聪明了,数据库类型添加成功!");
                    location.href = "back_cfg";
                }
            }
        });
    } else {
        alert("动一动您的小手,填写下数据源名称");
        return;
    }

}

function update_database_type() {
    // 添加数据源
    var newType = $("#databasetype1").val();
    var oldType = $("#originalData").val();
    var newURL = $("#databaseURL1").val();
    var oldURL = $("#originalURL").val();
    if (newType == oldType && newURL == oldURL) {
        alert("您当前未做任何修改!");
        $(".change-message").hide();
        $(".tablebg-grey").hide();
        return;
    }
    if (typeof(newType) == 'undefined' || newType == '' || newType == null) {
        alert("动一动您的小手,填写下数据源名称");
        return;
    }
    if (typeof(newURL) != 'undefined' && newURL != '' && newURL != null) {
        if (newURL.indexOf(":") <= 0) {
            alert("动一动您的小手,填写下正确的url");
            return;
        }
    }

    if (newType != null && newType.trim().length > 0) {
        $.ajax({
            type: "post",
            url: "/iwherelink_0.1/updateDBType.do",
            data: {
                newType: newType.trim(),
                oldType: oldType.trim(),
                newURL: newURL.trim(),
                oldURL: oldURL.trim()
            },
            success: function (data) {
                if ("EXIST" == data) {
                    alert("数据库类型已经存在,请确认后再做修改!");
                    return;
                } else if ("FAIL" == data) {
                    alert("数据库类型添加异常,请稍后再做修改!");
                    return;
                } else if ("SUCCESS" == data) {
                    alert("您太聪明了,数据库类型修改成功!");
                    location.href = "back_cfg";
                }
            }
        });
    } else {
        alert("动一动您的小手,填写下数据源名称");
        return;
    }
}


//function dbSelectChange(url) {
//	var databaseTypeId = $(".database-type").find("option:selected").attr("value");
//	if(typeof(databaseTypeId) == 'undefined' || databaseTypeId == '' || databaseTypeId == null){
//		alert("当前操作存在异常,烦请刷新后重新选择!");
//		return;
//	}
//	var visitUrl = "getAllDatabasePageForHtml.do";
//	if(typeof(url) != 'undefined' && url != '' && url != null){
//		visitUrl = url;
//	}
//	$.ajax({
//			type : "post",
//			url : visitUrl,
//			data : {
//				databaseTypeId : databaseTypeId
//			},
//			success : function(data) {
//				$("#dbinfo_tbody").empty();
//				$("#dbinfo_tbody").html(data.mapResult);
//				$(".pagination ul").empty();
//				$(".pagination ul").html(data.page);
//			},
//			error : function(data) {
//				alert("请求操作存在异常,请稍后再做操作!");
//				return;
//			}
//		});
//}

function databasePageClick(obj) {
    var url = $(obj).attr("url");
    dbSelectChange(url);
}

function tableInfoPageClick(obj) {
    var url = $(obj).attr("url");
    tableInfoSelectChange(url);
}


//function tableInfoSelectChange(url) {
//	var sourceTypeId = $("#tableinfo_index_sourceType").val();
//	if(typeof(sourceTypeId) == 'undefined' || "" == sourceTypeId || null == sourceTypeId){
//		alert("业务场景映射关系数据记录存在异常,烦请刷新页面后重新尝试操作!");
//		return;
//	}
//	var visitUrl = "getAllDatabaseTablesPageForHtml.do";
//	if(typeof(url) != 'undefined' && url != '' && url != null){
//		visitUrl = url;
//	}
//	$.ajax({
//		type : "post",
//		url : visitUrl,
//		dataType : "json",
//		data : {
//			sourceTypeId : sourceTypeId
//		},
//		success : function(data) {
//			$("#tableinfo_tbody").empty();
//			$("#tableinfo_tbody").html(data.mapResult);
//			$(".pagination ul").empty();
//			$(".pagination ul").html(data.page);
//		},
//		error : function() {
//			alert("业务场景映射关系数据获取出现错误,烦请刷新页面后重新尝试操作!");
//			return;
//		}
//	});
//}


function deleteTableInfo() {
    var tableInfoId = $(this).attr("tableInfoId");
    if (confirm("确认删除当前数据?") == true) {
        if (typeof(tableInfoId) != 'undefined' && null != tableInfoId && "" != tableInfoId) {
            $.ajax({
                type: "post",
                url: "/iwherelink_0.1/deleteTableInfo.do",
                data: {
                    tableInfoId: tableInfoId
                },
                success: function (data) {
                    if ("SUCCESS" == data) {
                        alert("您太聪明了,恭喜您业务场景映射关系数据删除成功!");
                        location.href = "getAllDatabaseTablesPage.do";
                    } else if ("FAIL" == data) {
                        alert("很遗憾地告诉您,删除业务场景映射关系数据失败,请稍后再做操作!");
                        return;
                    } else if ("RELATION" == data) {
                        alert("很遗憾地告诉您,请先删除绑定的业务场景映射关系相关数据后,再做删除操作!");
                        return;
                    } else if ("EXCEPTION" == data) {
                        alert("很遗憾地告诉您,删除操作出现异常,请稍后再做操作!");
                        return;
                    } else if ("NOTFOUND" == data) {
                        alert("很遗憾地告诉您,当前操作的数据存在异常,请刷新页面后,再做删除操作!");
                        return;
                    }
                },
                error: function () {
                    alert("业务场景映射关系数据存在异常,暂时无法删除,请稍后再做操作!");
                    return;
                }
            });
        } else {
            alert("当前业务场景映射关系数据存在异常,烦请刷新后重新操作!");
            return;
        }
    }
}


//点击设置查询条件调用
function showConditions() {
    var conditionDictionaryType = $("#conditionDictionaryType").val();
    //alert("conditionDictionaryType:"+conditionDictionaryType);
    if (typeof(conditionDictionaryType) == 'undefined' || conditionDictionaryType == '' || "0" == conditionDictionaryType) {
        conditionDictionaryType = null;//默认的话检索所有的类型数据
    }
    //alert("conditionDictionaryType2:"+conditionDictionaryType);
    $.ajax({
        type: "post",
        url: "/iwherelink_0.1/getAllCondition.do",
        data: {
            conditionDictionaryType: conditionDictionaryType,
            timeStamp: new Date().getTime()
        },
        dataType: "html",
        success: function (data) {
            //alert("data:"+data);
            $("#showConditionsFrom tbody").remove();
            //alert($("#showConditionsFrom").html());
            $("#showConditionsFrom").append(data);
        },
        error: function (data) {
            alert("信息查询出错了！" + data);
        }
    });
    $(".set-criteria").show();
    $(".tablebg-grey").show();
}
/**
 * 数据及产品类型模块
 */
function edit_single_sourceType(self) {
    var sourceTypeId = $(self).parents("tr").find("td:eq(0)").text();
    var sourceType = $(self).parents("tr").find("td:eq(1)").text();
    $(".change-message form").find("input:eq(0)").val(sourceTypeId);
    $(".change-message form").find("input:eq(1)").val(sourceType);
    //$(self).parents("tr").find("th").val();

}
//业务场景的编辑操作
function saveEdit() {
    var sourceTypeId = $(".change-message form").find("input:eq(0)").val();
    var sourceTypeName = $(".change-message form").find("input:eq(1)").val();

    if (typeof(sourceTypeId) == 'undefined' || sourceTypeId == '' || sourceTypeId == null) {
        alert("当前业务场景数据存在异常,烦请刷新后重新操作!");
        return;
    }
    if (typeof(sourceTypeName) == 'undefined' || sourceTypeName == '' || sourceTypeName == null) {
        alert("劳驾动一动您的小手,填写下业务场景名称");
        return;
    }
    $.ajax({
        type: "post",
        url: "/iwherelink_0.1/editSourceType.do",
        data: {
            sourceTypeId: sourceTypeId,
            sourceTypeName: sourceTypeName
        },
        success: function (data) {
            if ("EXIST" == data) {
                alert("业务场景已经存在,请确认后再做修改!");
                return;
            } else if ("FAIL" == data) {
                alert("业务场景数据编辑失败,请稍后再做编辑!");
                return;
            } else if ("SUCCESS" == data) {
                alert("您太聪明了,业务场景数据编辑成功!");
                location.href = "scene_cfg";
            } else if ("EXCEPTION" == data) {
                alert("业务场景数据编辑存在异常,请稍后再做操作!");
                return;
            }
        },
        error: function () {
            alert("业务场景数据编辑存在异常,请稍后再做操作!");
            return;
        }
    });
}
//数据类型的删除操作
function delete_single_sourceType(self) {
    var sourceTypeId = $(self).parents("tr").find("td:eq(0)").text();
    if (confirm("确认删除当前数据?") == true) {
        if (typeof(sourceTypeId) == 'undefined' || sourceTypeId == '' || sourceTypeId == null) {
            alert("当前业务场景数据存在异常,烦请刷新后重新操作!");
            return;
        }
        $.ajax({
            type: "post",
            url: "/iwherelink_0.1/deleteSourceType.do",
            data: {
                sourceTypeId: sourceTypeId,
            },
            success: function (data) {
                if ("SUCCESS" == data) {
                    alert("您太聪明了,恭喜您业务场景数据删除成功!");
                    location.href = "getSourceTypeListByPage.do";
                } else if ("FAIL" == data) {
                    alert("很遗憾地告诉您,删除失败,请稍后再做操作!");
                    return;
                } else if ("RELATION" == data) {
                    alert("很遗憾地告诉您,请先删除绑定的业务场景相关数据后,再做删除操作!");
                    return;
                } else if ("EXCEPTION" == data) {
                    alert("很遗憾地告诉您,删除操作出现异常,请稍后再做操作!");
                    return;
                }
            },
            error: function () {
                alert("业务场景数据存在异常,暂时无法删除,请稍后再做操作!");
                return;
            }
        });
    }
}
function save_single_sourceType(self) {
    var sourceTypeName = $(self).parents("form").find("input:eq(0)").val();
    if (typeof(sourceTypeName) == 'undefined' || sourceTypeName == '' || sourceTypeName == null) {
        alert("劳驾动一动您的小手,填写下业务场景名称");
        return;
    }
    $.ajax({
        type: "post",
        url: "/iwherelink_0.1/addSourceType.do",
        data: {
            sourceTypeName: sourceTypeName
        },
        success: function (data) {
            if ("EXIST" == data) {
                alert("业务场景数据已经存在,请确认后再做添加!");
                return;
            } else if ("FAIL" == data) {
                alert("业务场景数据添加失败,请稍后再做添加!");
                return;
            } else if ("SUCCESS" == data) {
                alert("您太聪明了,业务场景数据添加成功!");
                location.href = "getSourceTypeListByPage.do";
            } else if ("EXCEPTION" == data) {
                alert("业务场景数据添加异常,请稍后再做添加!");
                return;
            }
        },
        error: function () {
            alert("保存业务场景数据失败,请稍后再做操作!");
            return;
        }
    });
}

/**
 *编码生成模块
 */
function simpleEncodeData() {


    var databaseId = $(".database-type").val();
    var databaseType = $("#" + databaseId).text().split(":")[0];
    var databaseName = $("#" + databaseId).text().split(":")[1];
    var tableName = $(".encodeTable").val() + "";
    var columnLists = $(".encodeColumn").val() + "";//join by ,
    var columnObjs = $(".encodeColumn").val();
    var codeTypeId = $(".code-type").val() + "";
    var codeTypeName = $("#" + codeTypeId).text();
    if (!codeTypeCheck(codeTypeId, columnObjs, codeTypeName)) {
        return;
    }
    $.ajax({
        type: "post",
        url: "/iwherelink_0.1/encodeData.do",
        data: {
            databaseId: databaseId,
            databaseType: databaseType,
            databaseName: databaseName,
            tableName: tableName,
            columnLists: columnLists,
            codeTypeName: codeTypeName,
            codeTypeId: codeTypeId
        },
        success: function (data) {
            $(".hero-unit").find("h1").text(data);
//				$(".portlet").hide();
//			    $(".hero-unit").show();

        }
    });
}

function getEncodeTable(self) {
    var databaseId = $(self).val();
    var databaseType = $("#" + databaseId).text().split(":")[0];
    var databaseName = $("#" + databaseId).text().split(":")[1];
    $.ajax({
        type: "post",
        url: "/iwherelink_0.1/getEncodeTable.do",
        data: {
            databaseId: databaseId,
            databaseType: databaseType,
            databaseName: databaseName
        },
        success: function (options) {
            $(".encodeTable option").remove();
            $(".encodeTable").append(options);
        }
    });
}

function getEncodeColumn(self) {

    var databaseId = $(".database-type").val();
    var databaseName = $("#" + databaseId).text().split(":")[1];
    var databaseType = $("#" + databaseId).text().split(":")[0];
    var tableName = $(self).val();
    $.ajax({
        type: "post",
        url: "/iwherelink_0.1/getEncodeColumn.do",
//			dataType : "json",
        data: {
            databaseId: databaseId,
            databaseName: databaseName,
            databaseType: databaseType,
            tableName: tableName
        },
        success: function (data) {
            $(".encodeColumn option").remove();

            $(".encodeColumn").append(data);

            $(".encodeColumn").trigger("liszt:updated");

        },
        error: function () {
            alert("失败！");
        }
    });
}
//编码类型校验
function codeTypeCheck(codeTypeId, columnLists, codeTypeName) {
    var columnlength = columnLists.length;
    if (codeTypeId != "5" && codeTypeId != "6") {
        alert("请选择正确编码类型！");
        return false;
    }
    else if (codeTypeId == "5" && columnlength != 4) {
        alert("【" + codeTypeName + "】需指定4列！");
        return false;
    }
    else if (codeTypeId == "6" && columnlength != 2) {
        alert("【" + codeTypeName + "】需指定2列！");
        return false;
    } else {
        return true;
    }
}
