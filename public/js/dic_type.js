/**
 * Created by Administrator on 2016/7/25.
 */
$(function(){
    //初始化侧边栏的点击事件
    $('.sub-menu a[href="./dic_type"]').addClass('current_page');
    //初始化分页的点击事件
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
        getDictionaryType('','',page);
    });*/
    var M_box=$('.M-box');
    var totalpage = parseInt(M_box.attr("totalpage"));
    var page = parseInt(M_box.attr("page"));
    M_box.pagination({
        pageCount:totalpage,
        current:page,
        coping:true,
        callback:function(index){
            getDictionaryType('','',index);
        }
    });
    //请求表格数据
    function getDictionaryType(condition,sort,page){
        $.ajax({
            type : "post",
            url : "/iwherelink/getDictionaryTypeListSorted.do",
            data : {
                condition:condition,
                sort:sort,
                page:page
            },
            success : function(data){
                if(data.page>0){
                    var tr=showDictionaryType(data.data);
                    $(".ConditionInfoByDictionaryType").find("tbody").append(tr);
                   /* showPagination(data.page);*/

                    /*$(".pagination ul").find("li:eq(1)").addClass("active");*/
                    /*$(".pagination ul").find("li").click(function(){
                        var page=parseInt($(this).text().trim());
                        var pageSize=parseInt($(".pagination ul").find("li").size()-2);
                        if($(this).find("i").is("i.icon-long-arrow-left")){
                            page=parseInt($(".pagination ul").find("li.active").text().trim());
                            if(page>1){page=page-1;}
                        }else if($(this).find("i").is("i.icon-long-arrow-right")){
                            page=parseInt($(".pagination ul").find("li.active").text().trim());
                            if(page<pageSize){page=page+1;}
                        }
                        getDictionaryType(condition,sort,page);
                    });*/

                    /*$(".pagination ul").find("li").removeClass("active").eq(page).addClass("active");*/
                }else{
                    $(".ConditionInfoByDictionaryType").find("tbody").empty();
                    //$(".pagination ul").empty();
                    $(".ConditionInfoByDictionaryType").find("tbody").append("<tr><td colspan='6' class='text-center'>暂无数据</td></tr>");
                }}
        });
    }
    //动态生成表格数据
    function showDictionaryType(value){
        $(".ConditionInfoByDictionaryType").find("tbody").empty();
        var tr="";
        $.each(value,function(n,data){
            tr+="<tr>";
            var td = '<td class="text-center"><input type="checkbox" value='+data.id+' /></td>';
            td+="<td style='display:none' id='"+data.id+"'>"+data.id+"</td>";
            td+="<td class='text-center'>"+data.sourceType+"</td>";
            td+="<td class='text-center'>"+data.typeName+"</td>";
            td+="<td class='text-center'>"+data.desc+"</td>";
            if(data.enable){
                var status="开启";
            }else{
                var status="关闭";
            }
            td+="<td class='text-center'>"+status+"</td>";
            td+="<td style='display:none' class='text-center' id="+data.sourceTypeId+">"+data.sourceTypeId+"</td>";
            td+="<td class='text-center'><a class='edit'  href='javascript:;'>编辑</a></td>";
            td+="<td class='text-center'><a class='delete'  href='javascript:;'>删除</a></td>";
            tr+=td;
            tr+="</tr>";
        });
        return tr;
    }
    //排序
    $(".ConditionInfoByDictionaryType").find("i").click(function(){
        var sort="DESC";
        if($(this).is(".icon-chevron-up")){
            //变成降序 DESC
            sort="DESC";
            $(".ConditionInfoByDictionaryType").find("i").removeClass("icon-chevron-down").addClass("icon-chevron-up");
            $(this).removeClass("icon-chevron-up").addClass("icon-chevron-down");
        }else{//变成升序 ASC
            sort="ASC";
            $(this).removeClass("icon-chevron-down").addClass("icon-chevron-up");
        }
        var	condition=$(this).parents("th").attr("cond");

        $(".ConditionInfoByDictionaryType").find("tbody").empty();
        getDictionaryType(condition,sort,1);
    });

    //添加字典聚类弹窗显示
    $("#add_dictionary_type").click(function() {
        $(".add_dictionary_type").show();
        $(".tablebg-grey").show();
        $(".input-text input").val("");
        $('.add_dictionary_type form select').find('option[value="0"]').attr('selected',true);
    });
    //添加字典聚类弹窗关闭
    function hide_addDictionaryTypeNew_grey() {
        $(".add_dictionary_type").hide();
        $(".tablebg-grey").hide();
    }
    $('.add_dictionary_type h4 img').click(function(){
        hide_addDictionaryTypeNew_grey();
    });
    //保存新添加的字典聚类
    function add_dictionary_type() {
        //数据源id
        var sourceTypeId = $("#addSourceTypeId").val();
        //获取字典类型
        var typeName = $("#addTypeName").val();
        //获取描述,可以不填写
        var desc = $("#addDesc").val();
        //是否启用,默认是启用的
        var enable = $("#addEnable").val();
        if(typeof(sourceTypeId) == 'undefined' || sourceTypeId == '' || "0" == sourceTypeId || sourceTypeId == null){
            alert("请选择业务场景后再做操作!");
            return;
        }
        if(typeof(typeName) == 'undefined' || typeName == '' || typeName == null){
            alert("请填写字典聚类名称!");
            return;
        }
        if(typeof(enable) == 'undefined' || enable == '' || enable == null){
            enable = "1";
        }

        $.ajax({
            type : "post",
            url : "/iwherelink/addDictionaryType.do",
            data : {
                typeName : typeName,
                desc : desc,
                enable : enable,
                sourceTypeId : sourceTypeId
            },
            success : function(data) {
                if("SUCCESS" == data){
                    alert("字典聚类增加成功!");
                    location.href = "/getConditionDictionaryTypePage.do";
                }else if("FAIL" == data){
                    alert("很遗憾地告诉您,字典聚类数据添加失败,请稍后再做操作!");
                    return;
                }else if("RELATION" == data){
                    alert("很遗憾地告诉您,请先删除绑定的字典聚类相关数据后,再做操作!");
                    return;
                }else if("EXCEPTION" == data){
                    alert("很遗憾地告诉您,字典聚类添加操作出现异常,请稍后再做操作!");
                    return;
                }else if("EXIST" == data){
                    alert("很遗憾地告诉您,您当前输入的字典聚类已经存在,请重新输入!");
                    return;
                }
            },
            error : function(data) {
                alert("请求操作存在错误,请刷新页面后再做操作!");
                return;
            }
        });
    }
    $('#save').click(add_dictionary_type);

    //编辑
    function dictionary_type_edit(obj) {
        $(".add_dictionary").show();
        $(".tablebg-grey").show();
        var conditionTypeId = obj;
        console.log(obj);
        if(typeof(conditionTypeId) == 'undefined' || "" == conditionTypeId || null == conditionTypeId){
            alert("当前字典聚类数据存在异常,请刷新页面后再做尝试操作!");
            return;
        }
        $.ajax({
            type : "post",
            url : "/iwherelink/getConditionTypeInfo.do",
            data : {
                conditionTypeId : conditionTypeId
            },
            dataType : "json",
            success : function(data) {
                $("#conditionTypeId").val(data[0].id);
                $("#sourceTypeId").find("option[value='"+data[0].sourceTypeId+"']").attr("selected","selected");
                $("#typeName").val(data[0].typeName);
                $("#desc").val(data[0].desc);
                $("#enable").find("option[value='"+data[0].enable+"']").attr("selected","selected");
            },
            error : function() {
                alert("当前字典聚类数据加载错误,请刷新页面后再做尝试操作!");
                return;
            }
        });



    }
    $('table').on('click','.edit',function(){
        var id=$(this).parent('td').siblings().eq(1).text();
        dictionary_type_edit(id);
    });
    // 编辑弹窗关闭
    function hide_addNew_grey() {
        $(".add_dictionary").hide();
        $(".tablebg-grey").hide();
    }
    $('.add_dictionary h4 img').click(function(){
        hide_addNew_grey();
    });
    //保存编辑后的数据
    function update_dictionary_type() {
        var typeName = $("#typeName").val();
        var desc = $("#desc").val();
        var enable = $("#enable").val();
        var id = $("#conditionTypeId").val();
        var sourceTypeId = $("#sourceTypeId").val();
        if(typeof(id) == 'undefined' || id == '' || "0" == id || id == null){
            alert("当前字典聚类数据存在异常,烦请刷新页面后再做尝试操作!");
            return;
        }

        if(typeof(sourceTypeId) == 'undefined' || sourceTypeId == '' || "0" == sourceTypeId || sourceTypeId == null){
            alert("请选择业务场景后再做操作!");
            return;
        }
        if(typeof(typeName) == 'undefined' || typeName == '' || typeName == null){
            alert("请填写字典聚类名称!");
            return;
        }
        if(typeof(enable) == 'undefined' || enable == '' || enable == null){
            enable = "1";
        }
        $.ajax({
            type : "post",
            url : "/iwherelink/updateConditionType.do",
            data : {
                typeName : typeName,
                desc : desc,
                enable : enable,
                id : id,
                sourceTypeId : sourceTypeId
            },
            success : function(data) {
                if("NOTFOUND" == data){
                    alert("很遗憾地告诉您,当前字典聚类数据已经失效,烦请刷新页面后再做尝试操作!");
                    location.href = "/getConditionDictionaryTypePage.do";
                }else if("SUCCESS" == data){
                    alert("字典聚类编辑成功!");
                    location.href = "/getConditionDictionaryTypePage.do";
                }else if("FAIL" == data){
                    alert("很遗憾地告诉您,字典聚类数据编辑失败,请稍后再做操作!");
                    return;
                }else if("RELATION" == data){
                    alert("很遗憾地告诉您,请先删除绑定的字典聚类相关数据后,再做操作!");
                    return;
                }else if("EXCEPTION" == data){
                    alert("很遗憾地告诉您,字典聚类编辑操作出现异常,请稍后再做操作!");
                    return;
                }else if("EXIST" == data){
                    alert("很遗憾地告诉您,您当前输入的字典聚类已经存在,请重新输入!");
                    return;
                }
            },
            error : function(data) {
                alert("请求操作存在错误,请刷新页面后再做操作!");
                return;
            }
        });
    }
    $('#save_edit').click(function(){
        update_dictionary_type();
    });
    //删除
    $('table').on('click','.delete',function(){
        var id=$(this).parent('td').siblings().eq(1).text();
        del(id);
    });
    $('#cancel_add').click(function(){
        hidePropLayer('add_dictionary_type');
    });
    $('#cancel_edit').click(function(){
        hidePropLayer('add_dictionary');
    });
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
                url: '/iwherelink/deleteConditionType.do',
                data: {
                    "conditionTypeIds":databaseTypeIds
                },
                traditional:true,
                success: function (data) {
                    if ("SUCCESS" == data) {
                        alert("删除成功!");
                        location.href = "/getConditionDictionaryTypePage.do";
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