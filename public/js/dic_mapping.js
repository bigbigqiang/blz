/**
 * Created by Administrator on 2016/7/28.
 */
$(function(){
    //初始化侧边栏的点击事件
    $('.sub-menu a[href="./dic_mapping"]').addClass('current_page');
    //初始化分页的点击事件
    /*$(".pagination ul").find("li:eq(1)").addClass("active");
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
        getDictionaryMapping(0, 0, '', '', page);
    });*/
    var M_box=$('.M-box');
    var totalpage = parseInt(M_box.attr("totalpage"));
    var page = parseInt(M_box.attr("page"));
    M_box.pagination({
        pageCount:totalpage,
        current:page,
        coping:true,
        callback:function(index){
            getDictionaryMapping(0, 0, '', '', index);
        }
    });
    //排序
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
    //添加弹窗的联动--选择业务场景
    $("#selectDataProducts").change(function () {
        var sourceTypeId = $("#selectDataProducts").val();
        if (typeof(sourceTypeId) != 'undefined' && sourceTypeId != "0" && sourceTypeId != "" && sourceTypeId != null) {
            $.ajax({
                type: "post",
                url: "/iwherelink/getConditionDictionaryTypeBySourceType.do",
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
    //添加弹窗的联动--选择字典聚类
    $("#addDictionaryTypeMapping").change(function () {
        var dictionaryTypeId = $("#addDictionaryTypeMapping").val();
        if (typeof(dictionaryTypeId) != 'undefined' && dictionaryTypeId != "0" && dictionaryTypeId != "" && dictionaryTypeId != null) {
            $.ajax({
                type: "post",
                url: "/iwherelink/getDictionaryByType.do",
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
    function databasechangeincolumn() {
        // 数据库字段配置 改变数据库下拉框 获得相应的字段
        var typeDbTable = $(".database-type2").val();
        if (typeof(typeDbTable) != "undefined" && typeDbTable != "" && typeDbTable != null && typeDbTable != "0") {
            $.ajax({
                type: "post",
                url: "/iwherelink/columnFormOption.do?typeDbTable=" + typeDbTable,
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
    //添加弹窗的联动--指定所在表
    $('.select-table').change(databasechangeincolumn);

    //添加弹窗的联动--指定对应列
    $("#columnName").change(function () {
        // 数据库字段配置 字段下拉框改变
        var typeDbTable = $(".database-type2").val();
        var column = $(".database-type3").find("option:selected").text();
        if (typeof(typeDbTable) != "undefined" && typeDbTable != "" && typeDbTable != null && typeDbTable != "0" && column != "请选择字段") {
            $.ajax({
                type: "post",
                url: "/iwherelink/typeFormOption.do?typeDbTable=" + typeDbTable + "&column="
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
    });

    //保存添加的映射关系
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
            url: "/iwherelink/addColumnInfo.do",
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
                    alert("添加当字典表映射关系失败,请稍后再做尝试操作!");
                    return;
                } else if ("SUCCESS" == data) {
                    alert("添加当字典表映射关系成功!");
                    location.href = "getDictionaryMappingInfos.do";
                } else if ("EXIST" == data) {
                    alert("添加的当字典表映射关系已经存在,请重新操作!");
                    return;
                } else if ("EXCEPTION" == data) {
                    alert("添加当字典表映射关系出现异常,请稍后再做操作!");
                    return;
                }
            },
            error: function () {
                alert(",添加当字典表映射关系出现错误,请稍后再做操作!");
                return;
            }
        });
    }
    $('#save').click(savefield2);
    //删除字典表映射配置
    function delete_column(columnId) {
        if (typeof(columnId) != 'undefined' && null != columnId && "" != columnId) {
            if (confirm("确认删除当前字典表映射记录？") == true) {
                $.ajax({
                    type: "post",
                    url: "/iwherelink/deleteColumnInfo.do",
                    data: {
                        columnId: columnId
                    },
                    success: function (data) {
                        if ("NOTFOUND" == data) {
                            alert("当前字典表映射数据已经失效,烦请刷新页面后再做尝试操作!");
                            location.href = "getDictionaryMappingInfos.do";
                        } else if ("SUCCESS" == data) {
                            alert("字典表映射数据删除成功!");
                            location.href = "getDictionaryMappingInfos.do";
                        } else if ("FAIL" == data) {
                            alert("字典表映射数据删除失败,请稍后再做操作!");
                            return;
                        } else if ("EXCEPTION" == data) {
                            alert("字典表映射数据删除操作出现异常,请稍后再做操作!");
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
    $('#columnInfoListMapping_tbody').on('click','.delete',function(){
        var id=$(this).parents('td').siblings().eq(1).text();
        delete_column(id);
    });
    //批量删除
    $('#batch_del').click(function () {
        var allCheckBox=$("tbody").find("input[type='checkbox']");
        var checkedIds=[];
        var columnIdS=[];
        for(var i=0;i<allCheckBox.length;i++){
            if(allCheckBox.eq(i).prop("checked")==true){
                checkedIds.push(allCheckBox.eq(i).val());
            }
        }
        for(var j=0;j<checkedIds.length;j++){
            columnIdS[j]=checkedIds[j];
        }

        if(checkedIds.length==0){
            alert('请先选择要删除的数据');
            return;
        }
        if (confirm('确认删除？') == true ) {
            $.ajax({
                type: 'post',
                url: '/iwherelink/deleteColumnInfo.do',
                data: {
                    "columnId":columnIdS
                },
                traditional:true,
                success: function (data) {
                    if ("SUCCESS" == data) {
                        alert("删除成功!");
                        location.href = "getDictionaryMappingInfos.do";
                    } else if ("FAIL" == data) {
                        alert("删除失败,请刷新页面后，再做操作!");
                        return;
                    //} else if ("RELATION" == data) {
                    //    alert("很遗憾地告诉您,请先删除绑定的数据类型相关数据后,再做删除操作!");
                    //    return;
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
    });
});