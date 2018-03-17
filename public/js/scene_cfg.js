/**
 * Created by Administrator on 2016/7/21.
 */
$(function(){
    //初始化侧边栏的点击事件
    $('.sub-menu a[href="./scene_cfg"]').addClass('current_page');
    //初始化时,给分页组件的每一页添加点击事件
    /*$(".pagination ul").find("li:eq(1)").addClass("active");
    $(".pagination ul").find("li").click(function(){
        var page=parseInt($(this).text().trim());
        var pageSize=parseInt($(".pagination ul").find("li").size()-2);
        if($(this).find("i").is("i.icon-long-arrow-left")){
            page=parseInt($(".pagination ul").find("li.active").text().trim());
            if(page>1){page=page-1;}
        }else if($(this).find("i").is("i.icon-long-arrow-right")){
            page=parseInt($(".pagination ul").find("li.active").text().trim());
            if(page<pageSize){page=page+1;}
        }
        getSourceTypePage('','',page);
        $(".pagination ul").find("li").removeClass("active").eq(page).addClass("active");
    });*/
    var M_box=$('.M-box');
    var totalpage = parseInt(M_box.attr("totalpage"));
    var page = parseInt(M_box.attr("page"));
    M_box.pagination({
        pageCount:totalpage,
        current:page,
        coping:true,
        callback:function(index){
            getSourceTypePage('','',index);
        }
    });


    function getSourceTypePage(condition,sort,page){
        $.ajax({
            type : "post",
            url : "/iwherelink/getSourceTypeListSorted.do",
            data : {
                condition:condition,
                sort:sort,
                page:page
            },
            success : function(data){
                if(data.page>0){
                    var tr=showSourceType(data.data);
                    $(".sourceType").find("tbody").append(tr);
                    /*showPagination(data.page);
                    $(".pagination ul").find("li:eq(1)").addClass("active");
                    $(".pagination ul").find("li").click(function(){
                        var page=parseInt($(this).text().trim());
                        var pageSize=parseInt($(".pagination ul").find("li").size()-2);
                        if($(this).find("i").is("i.icon-long-arrow-left")){
                            page=parseInt($(".pagination ul").find("li.active").text().trim());
                            if(page>1){page=page-1;}
                        }else if($(this).find("i").is("i.icon-long-arrow-right")){
                            page=parseInt($(".pagination ul").find("li.active").text().trim());
                            if(page<pageSize){page=page+1;}
                        }
                        getSourceTypePage(condition,sort,page);
                    });

                    $(".pagination ul").find("li").removeClass("active").eq(page).addClass("active");*/
                }else{
                    $(".sourceType").find("tbody").empty();
                    //$(".pagination ul").empty();
                    $(".sourceType").find("tbody").append("<tr><td colspan='3' class='text-center'>暂无数据</td></tr>");
                }}
        });
    }
    //动态生成表格数据
    function showSourceType(value){
        $(".sourceType").find("tbody").empty();
        var tr="";
        $.each(value,function(n,data){
            tr+="<tr>";
            var td = '<td class="text-center"><input type="checkbox" value='+data.id+' /></td>';
            td+="<td style='display:none'>"+data.id+"</td>";
            td+="<td class='text-center'>"+data.sourceType+"</td>";
            td+="<td class='text-center'><a class='edit'  href='javascript:;'>编辑</a></td>";
            td+="<td class='text-center'><a class='delete'  href='javascript:;'>删除</a></td>";
            tr+=td;
            tr+="</tr>";
        });
        return tr;
    }
    //排序
    $(".sourceType").find("i").click(function(){
        var sort="";
        var	condition=$(".sourceType").find("th:first").attr("cond");
        if($(this).is(".icon-chevron-up")){
            //变成降序 DESC
            sort="DESC";
            $(this).removeClass("icon-chevron-up").addClass("icon-chevron-down");
        }else{//变成升序 ASC
            sort="ASC";
            $(this).removeClass("icon-chevron-down").addClass("icon-chevron-up");
        }
        $(".sourceType").find("tbody").empty();
        getSourceTypePage(condition,sort,1);
    });
    //新增业务场景
    function save_single_sourceType(self){
        var sourceTypeName=$(self).parents("form").find("input:eq(0)").val();
        if(typeof(sourceTypeName) == 'undefined' || sourceTypeName == '' || sourceTypeName == null){
            alert("请填写下业务场景名称");
            return;
        }
        $.ajax({
            type : "post",
            url : "/iwherelink/addSourceType.do" ,
            data : {
                sourceTypeName:sourceTypeName
            },
            success : function(data) {
                if ("EXIST" == data) {
                    alert("业务场景数据已经存在,请确认后再做添加!");
                    return;
                }else if("FAIL" == data){
                    alert("业务场景数据添加失败,请稍后再做添加!");
                    return;
                }else if("SUCCESS" == data){
                    alert("业务场景数据添加成功!");
                    location.href = "getSourceTypeListByPage.do";
                }else if("EXCEPTION" == data){
                    alert("业务场景数据添加异常,请稍后再做添加!");
                    return;
                }
            },
            error : function() {
                alert("保存业务场景数据失败,请稍后再做操作!");
                return;
            }
        });
    }
    $('#save').click(function(){
        save_single_sourceType($(this));
    });

     //单个编辑
    function edit_single_sourceType(self){
        var sourceTypeId=$(self).parents("tr").find("td:eq(1)").text();
        var sourceType=$(self).parents("tr").find("td:eq(2)").text();
        $(".change-message form").find("input:eq(0)").val(sourceTypeId);
        $(".change-message form").find("input:eq(1)").val(sourceType);
        $("#originalData").val(sourceType);
    }
    $('table').on('click','.edit',function(){
        edit_single_sourceType($(this).get(0));
    });

    //保存编辑
    function saveEdit(){
        var sourceTypeId=$(".change-message form").find("input:eq(0)").val();
        var sourceTypeName=$(".change-message form").find("input:eq(1)").val();
        var originalData=$("#originalData").val();
        if(typeof(sourceTypeId) == 'undefined' || sourceTypeId == '' || sourceTypeId == null){
            alert("当前业务场景数据存在异常,烦请刷新后重新操作!");
            return;
        }
        if(typeof(sourceTypeName) == 'undefined' || sourceTypeName == '' || sourceTypeName == null){
            alert("请填写下业务请场景名称");
            return;
        }
        if(originalData==sourceTypeName){
            alert('当前未做任何修改');
            $('.change-message').hide();
            $('.tablebg-grey').hide();
            return;
        }
        $.ajax({
            type : "post",
            url : "/iwherelink/editSourceType.do" ,
            data : {
                sourceTypeId : sourceTypeId,
                sourceTypeName:sourceTypeName
            },
            success : function(data) {
                if ("EXIST" == data) {
                    alert("业务场景已经存在,请确认后再做修改!");
                    return;
                }else if("FAIL" == data){
                    alert("业务场景数据编辑失败,请稍后再做编辑!");
                    return;
                }else if("SUCCESS" == data){
                    alert("业务场景数据编辑成功!");
                    location.href = "getSourceTypeListByPage.do";
                }else if("EXCEPTION" == data){
                    alert("业务场景数据编辑存在异常,请稍后再做操作!");
                    return;
                }
            },
            error : function() {
                alert("业务场景数据编辑存在异常,请稍后再做操作!");
                return;
            }
        });
    }
    $('#updata_save').click(saveEdit);
    //删除操作
    function delete_single_sourceType(self){
        var sourceTypeId=$(self).parents("tr").find("td:eq(1)").text();
        if (confirm("确认删除当前数据?") == true) {
            if(typeof(sourceTypeId) == 'undefined' || sourceTypeId == '' || sourceTypeId == null){
                alert("当前业务场景数据存在异常,烦请刷新后重新操作!");
                return;
            }
            console.log(sourceTypeId);
            $.ajax({
                type : "post",
                url : "/iwherelink/deleteSourceType.do" ,
                data : {
                    "sourceTypeId" : sourceTypeId
                },
                success : function(data) {
                    if("SUCCESS" == data){
                        alert("业务场景数据删除成功!");
                        location.href = "getSourceTypeListByPage.do";
                    }else if("FAIL" == data){
                        alert("很遗憾地告诉您,删除失败,请稍后再做操作!");
                        return;
                    }else if("RELATION" == data){
                        alert("很遗憾地告诉您,请先删除绑定的业务场景相关数据后,再做删除操作!");
                        return;
                    }else if("EXCEPTION" == data){
                        alert("很遗憾地告诉您,删除操作出现异常,请稍后再做操作!");
                        return;
                    }
                },
                error : function() {
                    alert("业务场景数据存在异常,暂时无法删除,请稍后再做操作!");
                    return;
                }
            });
        }
    }
    $('table').on('click','.delete',function(){
        delete_single_sourceType($(this).get(0));
    });

    //批量删除
    $('#batch_del').click(function () {
        var allCheckBox=$("tbody").find("input[type='checkbox']");
        var checkedIds=[];
        var sourceTypeIds=[];
        for(var i=0;i<allCheckBox.length;i++){
            if(allCheckBox.eq(i).prop("checked")==true){
                checkedIds.push(allCheckBox.eq(i).val());
            }
        }
        for(var j=0;j<checkedIds.length;j++){
            sourceTypeIds[j]=checkedIds[j];
        }

        if(checkedIds.length==0){
            alert('请先选择要删除的数据');
            return;
        }
        if (confirm('确认删除？') == true ) {
            $.ajax({
                type: 'post',
                url: '/iwherelink/deleteSourceType.do',
                data: {
                    "sourceTypeId":sourceTypeIds
                },
                traditional:true,
                success: function (data) {
                    if ("SUCCESS" == data) {
                        alert("删除成功!");
                        location.href = "getSourceTypeListByPage.do";
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