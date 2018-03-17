/**
 * Created by Administrator on 2016/7/25.
 */
$(function(){
    //初始化侧边栏的点击事件
    $('.sub-menu a[href="./scene_mapping"]').addClass('current_page');
    //初始化分页点击事件
    //$(".pagination ul").find("li:eq(1)").addClass("active");
    //$(".pagination ul").find("li").click(function(){
    //    var page=parseInt($(this).text().trim());
    //    var pageSize=parseInt($(".pagination ul").find("li").size()-2);
    //    if($(this).find("i").is("i.icon-long-arrow-left")){
    //        page=parseInt($(".pagination ul").find("li.active").text().trim());
    //        if(page>1){page=page-1;}
    //    }else if($(this).find("i").is("i.icon-long-arrow-right")){
    //        page=parseInt($(".pagination ul").find("li.active").text().trim());
    //        if(page<pageSize){page=page+1;}
    //    }
    //    var sourceType=$("#tableinfo_index_sourceType").val();
    //    getTableInfo(sourceType,'','',page);
    //});
    var M_box=$('.M-box');
    var totalpage = parseInt(M_box.attr("totalpage"));
    var page = parseInt(M_box.attr("page"));
    M_box.pagination({
        pageCount:totalpage,
        current:page,
        coping:true,
        callback:function(index){
            var sourceType=$("#tableinfo_index_sourceType").val();
            getTableInfo(sourceType,'','',index);
        }
    });
    //请求筛选后的数据
    function getTableInfo(sourceType,condition,sort,page){
        $.ajax({
            type : "post",
            url : "/iwherelink/getTableInfoListSorted.do",
            data : {
                sourceTypeId:sourceType,
                condition:condition,
                sort:sort,
                page:page
            },
            success : function(data){
                if(data.page>0){
                    var tr=showTableInfo(data.data);
                    $(".tableInfo").find("tbody").append(tr);
                    //showPagination(data.page);
                    //
                    //$(".pagination ul").find("li:eq(1)").addClass("active");
                    //$(".pagination ul").find("li").click(function(){
                    //    var page=parseInt($(this).text().trim());
                    //    var pageSize=parseInt($(".pagination ul").find("li").size()-2);
                    //    if($(this).find("i").is("i.icon-long-arrow-left")){
                    //        page=parseInt($(".pagination ul").find("li.active").text().trim());
                    //        if(page>1){page=page-1;}
                    //    }else if($(this).find("i").is("i.icon-long-arrow-right")){
                    //        page=parseInt($(".pagination ul").find("li.active").text().trim());
                    //        if(page<pageSize){page=page+1;}
                    //    }
                    //    var sourceType=$("#tableinfo_index_sourceType").val();
                    //    getTableInfo(sourceType,condition,sort,page);
                    //});
                    //
                    //$(".pagination ul").find("li").removeClass("active").eq(page).addClass("active");
                }else{
                    $(".tableInfo").find("tbody").empty();
                    //$(".pagination ul").empty();
                    $(".tableInfo").find("tbody").append("<tr><td colspan='6' class='text-center'>暂无数据</td></tr>");
                }}
        });
    }
    //动态生成表格数据
    function showTableInfo(value){
        $(".tableInfo").find("tbody").empty();
        var tr="";
        $.each(value,function(n,data){
            tr+="<tr>";
            var td = '<td class="text-center"><input type="checkbox" value='+data.id+' /></td>';
            td+="<td style='display:none'>"+data.id+"</td>";
            td+="<td class='text-center'>"+data.sourceType+"</td>";
            td+="<td class='text-center'>"+data.databaseType+"</td>";
            td+="<td class='text-center'>"+data.databaseName+"</td>";
            td+="<td class='text-center'>"+data.tableName+"</td>";
            td+="<td class='text-center'><a tableInfoId='"+data.id+"' class='delete' href='javascript:;'>删除</a></td>";
            tr+=td;
            tr+="</tr>";
        });
        return tr;
    }
    //筛选业务场景
    $("#tableinfo_index_sourceType").change(function(){
        $(".tableInfo").find("i").removeClass("icon-chevron-down").addClass("icon-chevron-up");
        var sourceType=$(this).val();
        var sort="DESC";
        var	condition=$(".tableInfo").find("th").eq(1).attr("cond");

        $(".tableInfo").find("tbody").empty();
        getTableInfo(sourceType,condition,sort,1);
    });
    //排序
    $(".tableInfo").find("i").click(function(){
        var sort="DESC";
        var sourceType=$("#tableinfo_index_sourceType").val();
        if($(this).is(".icon-chevron-up")){
            //变成降序 DESC
            sort="DESC";
            $(".tableInfo").find("i").removeClass("icon-chevron-down").addClass("icon-chevron-up");
            $(this).removeClass("icon-chevron-up").addClass("icon-chevron-down");
        }else{//变成升序 ASC
            sort="ASC";
            $(this).removeClass("icon-chevron-down").addClass("icon-chevron-up");
        }
        var	condition=$(this).parents("th").attr("cond");

        $(".tableInfo").find("tbody").empty();
        getTableInfo(sourceType,condition,sort,1);

    });
    //添加业务场景映射时,业务场景下拉框切换时调用的监听事件
    $("#tableinfo_sourceType").change(function(){
        $("#tableinfo_databasename option[value='0']").attr("selected","selected");
        $("#tableinfo_tablename").empty();
        $("#tableinfo_tablename").html("<option value = '0'>选择数据表</option>");
    });

    //添加业务场景映射时,数据库下拉框切换时调用的监听事件
    $("#tableinfo_databasename").change(function(){
        $("#tableinfo_tablename").empty();
        var databaseInfoId = $("#tableinfo_databasename").find("option:selected").val();
        $.ajax({
            type : "post",
            url : "/iwherelink/getTablesFromDatabaseInfo.do",
            data : {
                databaseInfoId : databaseInfoId
            },
            success : function(data) {
                $("#tableinfo_tablename").empty();
                $("#tableinfo_tablename").html(data);
            }
        });
    });

    //保存添加的业务场景关系映射
    $("#tableinfo_add").click(function(){
        var sourceTypeId = $("#tableinfo_sourceType").val();
        var databaseInfoId = $("#tableinfo_databasename").val();
        var tableName = $("#tableinfo_tablename").val();
        var mapType=$("#tableinfo_tableMapType").val();
        if(typeof(sourceTypeId) == 'undefined' || sourceTypeId == '0' || sourceTypeId == '' || sourceTypeId == null){
            alert("请选择业务场景!");
            return;
        }
        if(typeof(databaseInfoId) == 'undefined' || databaseInfoId == '0' || databaseInfoId == '' || databaseInfoId == null){
            alert("请选择数据库!");
            return;
        }
        if(typeof(tableName) == 'undefined' || tableName == '0' || tableName == '' || tableName == null){
            alert("请选择数据表!");
            return;
        }
        if(typeof(mapType) == 'undefined' || mapType == '0' || mapType == '' || mapType == null){
            alert("请选择数据映射类型!");
            return;
        }
        $.ajax({
            type : "post",
            url : "/iwherelink/addTableInfo.do",
            data : {
                sourceTypeId : sourceTypeId,
                databaseInfoId : databaseInfoId,
                tableName : tableName,
                tableMapType:mapType
            },
            success : function(data) {
                if ("EXIST" == data) {
                    alert("业务场景表映射关系已经存在,请确认后再做添加!");
                    return;
                }else if("FAIL" == data){
                    alert("业务场景表映射关系数据编辑失败,请稍后再做编辑!");
                    return;
                }else if("SUCCESS" == data){
                    alert("业务场景表映射数据添加成功!");
                    location.href = "getAllDatabaseTablesPage.do";
                }else if("EXCEPTION" == data){
                    alert("业务场景表映射关系数据编辑存在异常,请稍后再做操作!");
                    return;
                }
            },
            error : function(data){
                alert("保存业务场景映射关系数据失败,请稍后再做操作!");
                return;
            }
        });
    });

    //隐藏弹窗
    $('.cancel').click(function(){
        hidePropLayer('add-new');
    });

    //删除映射关系
    function deleteTableInfo(){
        var tableInfoId = $(this).attr("tableInfoId");
        console.log(tableInfoId);
        if (confirm("确认删除当前数据?") == true){
            if(typeof(tableInfoId) != 'undefined' && null != tableInfoId && "" != tableInfoId){
                $.ajax({
                    type : "post",
                    url : "/iwherelink/deleteTableInfo.do",
                    data : {
                        databaseInfoIds : tableInfoId
                    },
                    success : function(data) {
                        if("SUCCESS" == data){
                            alert("业务场景映射关系数据删除成功!");
                            location.href = "getAllDatabaseTablesPage.do";
                        }else if("FAIL" == data){
                            alert("很遗憾地告诉您,删除业务场景映射关系数据失败,请稍后再做操作!");
                            return;
                        }else if("RELATION" == data){
                            alert("很遗憾地告诉您,请先删除绑定的业务场景映射关系相关数据后,再做删除操作!");
                            return;
                        }else if("EXCEPTION" == data){
                            alert("很遗憾地告诉您,删除操作出现异常,请稍后再做操作!");
                            return;
                        }else if("NOTFOUND" == data){
                            alert("很遗憾地告诉您,当前操作的数据存在异常,请刷新页面后,再做删除操作!");
                            return;
                        }
                    },
                    error : function() {
                        alert("业务场景映射关系数据存在异常,暂时无法删除,请稍后再做操作!");
                        return;
                    }
                });
            }else{
                alert("当前业务场景映射关系数据存在异常,烦请刷新后重新操作!");
                return;
            }
        }
    }
    $('.tableInfo').on('click','.delete', deleteTableInfo);

    //批量删除
    $('#batch_del').click(function () {
        var allCheckBox=$("tbody").find("input[type='checkbox']");
        var checkedIds=[];
        var databaseTypeIds=[];
        for(var i=0;i<allCheckBox.length;i++){
            if(allCheckBox.eq(i).prop("checked")==true){
                checkedIds.push(allCheckBox.eq(i).val());
            }
        }
        for(var j=0;j<checkedIds.length;j++){
            databaseTypeIds[j]=checkedIds[j];
        }

        if(checkedIds.length==0){
            alert('请先选择要删除的数据');
            return;
        }
        if (confirm('确认删除？') == true ) {
            $.ajax({
                type: 'post',
                url: '/iwherelink/deleteTableInfo.do',
                data: {
                    "databaseInfoIds":databaseTypeIds
                },
                traditional:true,
                success: function (data) {
                    if ("SUCCESS" == data) {
                        alert("删除成功!");
                        location.href = "getAllDatabaseTablesPage.do";
                    } else if ("FAIL" == data) {
                        alert("删除失败,请先确认是否有绑定的数据源，再做操作!");
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
    });
});