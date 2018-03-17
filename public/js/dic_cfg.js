/**
 * Created by Administrator on 2016/7/25.
 */
$(function(){
    //初始化侧边栏的点击事件
    $('.sub-menu a[href="./dic_cfg"]').addClass('current_page');
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
        getDictionaryInfo('','','','',page);
    });*/
    var M_box=$('.M-box');
    var totalpage = parseInt(M_box.attr("totalpage"));
    var page = parseInt(M_box.attr("page"));
    M_box.pagination({
        pageCount:totalpage,
        current:page,
        coping:true,
        callback:function(index){
            getDictionaryInfo('','','','',index);
        }
    });
    //排序
    $(".conditionInfoByDictionary").find("i").click(function(){

        var sort="DESC";
        if($(this).is(".icon-chevron-up")){
            //变成降序 DESC
            sort="DESC";
            $(".conditionInfoByDictionary").find("i").removeClass("icon-chevron-down").addClass("icon-chevron-up");
            $(this).removeClass("icon-chevron-up").addClass("icon-chevron-down");
        }else{//变成升序 ASC
            sort="ASC";
            $(this).removeClass("icon-chevron-down").addClass("icon-chevron-up");
        }
        var sourceTypeId = $("#conditionInfo_sourceType").val();
        var dictionaryTypeId = $("#conditionInfo_dictionaryType").val();
        var	condition=$(this).parents("th").attr("cond");

        $(".conditionInfoByDictionary").find("tbody").empty();
        getDictionaryInfo(sourceTypeId,dictionaryTypeId,condition,sort,1);
    });

    clickTR();
    function dictionary_edit(conditionInfoId) {
        $(".change-message").children().remove(".errormsg");
        $("input:radio").parent().removeClass("checked");
        $("select#update_display_type").parent().next().find("span.input-text").empty();
        $("select#update_display_type").parent().next().remove("span.input-text");

        if(typeof(conditionInfoId) != 'undefined' && conditionInfoId != "" && conditionInfoId != null){
            $("#update_dictionary_id").val(conditionInfoId);
            $.ajax({
                type : "post",
                url : "/iwherelink/getConditionInfo.do",
                data : {
                    id : conditionInfoId
                },
                dataType : "json",
                success : function(data) {
                    $("#updateDataProducts_dictionary").find("option[value ='"+data.sourceTypeId+"']").attr("selected",true);
                    var dictionaryType = data.dictionaryType;
                    var conditionInfoDisplayType =data.conditionType;
                    var isShow=data.isShow;
                    $("#update_display_type").find("option[value ='"+conditionInfoDisplayType+"']").attr("selected",true);
                    //如果为下拉菜单显示下拉菜单内容，可批量修改下来
                    conditionInfoDisplayChange(conditionInfoId,conditionInfoDisplayType);

                    $("select#update_display_type").change(function(){
                        $("select#update_display_type").parent().next().remove("span.input-text");
                        var type=$(this).val();
                        conditionInfoDisplayChange(conditionInfoId,type);
                    });
                    $("input[type='radio']").prop("checked",false);
                    $("input:radio[value ='"+isShow+"']").prop("checked","checked");
                    $.ajax({
                        type : "post",
                        url : "/iwherelink/getConditionDictionaryTypeBySourceType.do",
                        dataType : "json",
                        data : {
                            pageNo:1,
                            id : data.sourceTypeId
                        },
                        success : function(data) {
                            var option="";
                            $.each(data,function(n,value){
                                option+="<option value='"+value.id+"'>"+value.typeName+"</option>";
                            });
                            $("#update_display_type").find("option[value ='"+dictionaryType+"']").attr("selected",true);
                            $(".dictionaryTypeList").append(option);
                            $("#update_dictionaryType_dictionary").empty();
                            $("#update_dictionaryType_dictionary").html(dictionaryType);
                        },
                        error : function() {
                            alert("加载字典聚类失败！");
                        }
                    });
                    $("#update_dic").val(data.chineseName);
                },
                error : function(data){
                    alert("修改字典获取数据错误");
                }
            });
        }else{
            alert("非法参数传递");
        }
        $(".change-message").show();
        $(".tablebg-grey").show();
    }
    function conditionInfoDisplayChange(conditionInfoId,conditionInfoDisplayType){
        $("select#update_display_type").parent().next().find("span.input-text").empty();
        if(conditionInfoDisplayType=="14"){
            $.ajax({
                type : "post",
                url : "/iwherelink/getAllDictInfoBycondInfoId.do",
                dataType : "json",
                data : {
                    conditionInfoId: conditionInfoId
                },
                success : function(data) {
                    if(data !=""){
                        var ul=showSubList(data);
                        $("select#update_display_type").parent().after(ul);
                        $(".add-btn").click(function(){
                            var newli="<li class='list-group-item input-append'><input type='text' class='span' /><button type='button' class='minus-btn'>×</button></li>";
                            $("ul.list-group li:first").before(newli);

                        });
                        $("button.minus-btn").click(function(){
                            if($(this).parent("li").siblings().size()!=1){
                                $(this).parent().remove("li");
                            }

                        });
                    }else{
                        var ul=showSubList("");
                        var li="<li class='list-group-item input-append'><input type='text' class='span'/><button type='button' class='minus-btn'>×</button></li>";

                        $("select#update_display_type").parent().after(ul);
                        $(".add-btn").click(function(){
                            $("ul.list-group li:first").before(li);

                            $("button.minus-btn").click(function(){
                                if($(this).parent("li").siblings().size()!=1){
                                    $(this).parent().remove("li");
                                }

                            });
                        });
                    }
                },
                error : function() {
                    alert("加载下拉选项失败！");
                }
            });
        }
    }
    // 点击编辑按钮，初始化编辑弹窗数据
    $('#conditionInfolist_tbody').on('click','.edit',function(){
        var id=$(this).parents('td').siblings().eq(1).text();
        dictionary_edit(id);
    });
    //保存修改后的数据
    $("#update_dictionary_button").click(function () {
        var conditionId = $("#update_dictionary_id").val();//字典ID
//						var sourceTypeId = $("#updateDataProducts_dictionary").val();//数据类型
        var dictionaryTypeId = $("#updateDictionaryType_dictionary").val();//字典类型
        var conditionName = $("#update_dic").val();//字典名称
        var conditionaryDisplayId = $("#update_display_type").val();//字典显示类型
        var isShow = $("input[type='radio']:checked").val();//字典是否显示

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
            url: "/iwherelink/updateConditionInfo.do",
            data: {
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
                    alert("修改失败,请重新修改！");
                }
                $(".change-message").hide();
                $(".tablebg-grey").hide();
                location.href = "/getConditionInfoList.do";
            },
            error: function (data) {
                alert("未知原因修改失败,请第一时间联系系统管理员！");
            }
        });
    });
    // 点击删除字典，出现弹窗
    function dictionary_del(conditionInfoId) {
        if(typeof(conditionInfoId) != 'undefined' && conditionInfoId != "" && conditionInfoId != null){
            $("#del_dic_id").val(conditionInfoId);
            $(".msg").empty();
            $.ajax({
                type : "post",
                url : "/iwherelink/getDetailsConditionInfoById.do",
                data : {
                    id : conditionInfoId
                },
                dataType : "json",
                success : function(data) {
                    if(data.count>0){
                        $("p#alert_msg ").find(".msg").append("仍有"+data.count+"条字典映射，");
                    }
                    $("p#del_chineseName ").find(".msg").append(data.chineseName);
                    $("p#del_keyWord ").find(".msg").append(data.keyWord);
                    $("p#del_sourceType").find(".msg").append(data.sourceType);
                    $("p#del_typeName ").find(".msg").append(data.typeName);

                    $(".pop").on('click','#del',function(){
                        $.ajax({
                            type : "post",
                            url : "/iwherelink/delConditionInfo.do",
                            data : {
                                ids : [conditionInfoId]
                            },
                            traditional:true,
                            dataType : "html",
                            success : function(data) {
                                alert("字典删除成功"+data);
                                location.href = "/getConditionInfoList.do";
                            },
                            error : function(data){
                                alert("字典删除失败"+data);
                            }
                        });
                    });
                },
                error : function(data){
                    alert("字典类型刷新失败"+data);
                   // location.href = "/getConditionInfoList.do";
                }
            });
            $(".pop").show();

        }else{
            alert("非法参数传递");
        }

    }
    $('#conditionInfolist_tbody').on('click','.del',function(){
        var id=$(this).parents('td').siblings().eq(1).text();
        dictionary_del(id);
    });

    //点击添加字典按钮，出现添加弹窗
    $("#add_dictionary").click(function() {

        $("#dictionaryType_dictionary").empty();
        $(this).find().remove("p.errormsg");
        var sourceTypeId = $("#selectDataProducts_dictionary").val();
        //为了能够公用对应的数据,此处加一个标识区分
        $.ajax({
            type : "post",
            url : "/iwherelink/getConditionDictionaryTypeBySourceType.do",
            dataType : "json",
            data : {
                pageNo:1,
                id : sourceTypeId
            },
            success : function(data) {
                var option="";
                $.each(data,function(n,value){
                    option+="<option value='"+value.id+"'>"+value.typeName+"</option>";
                });
                $("#dictionaryType_dictionary").append(option);
            },
            error : function() {
                alert("加载字典聚类失败！");
            }
        });
        $(".add_dictionary").show();
        $(".tablebg-grey").show();
        $(".input-text input").val("");
    });

    $('.add_dictionary h4 img').click(hide_addNew_grey);

    $(".dic_name").bind("blur",function(){
        var chineseName=$(this).val();
        var sourceTypeId = $(this).parent().prevAll().find(".sourceTypeList").val();//数据产品
        var dictionaryType =  $(this).parent().prevAll().find(".dictionaryTypeList").val();//字典类型
        uniqueCheckByChineseName(sourceTypeId,dictionaryType,chineseName);
    });
    //字典名唯一性校验
    function uniqueCheckByChineseName(sourceTypeId,dictionaryType,chineseName){
        $(".errormsg").empty();
//	var sourceTypeId = $("#selectDataProducts_dictionary").val();//数据产品
//	var chineseName = $(".dic_name").val();//字典名称
//	var dictionaryType = $("#dictionaryType_dictionary").val();//字典类型
        if(typeof(chineseName) != 'undefined' && chineseName != "" && chineseName != null){
            $.ajax({
                type : "post",
                url : "/iwherelink/uniqueCheckByChineseName.do",
                data : {
                    sourceTypeId : sourceTypeId,
                    dictionaryType:dictionaryType,
                    chineseName:chineseName
                },
                success : function(data) {
                    $(".dic_name").parent().remove(".errormsg");
                    if(data != "true"){
                        $("input.dic_name").after("<p class='errormsg'>字典名重复</p>");
                    }
                },error: function(data) {
                    alert("字典名称唯一性检查失败");
                }
            });
        }
        //return false;
    }
    //关闭添加弹窗
    function hide_addNew_grey() {
        $(".add_dictionary").hide();
        $(".tablebg-grey").hide();
    }
    //关闭删除弹窗
    function hide_delNew_grey() {
        $(".del_dictionary").hide();
        $(".tablebg-grey").hide();
    }
    //点击保存按钮，保存新添加的数据
    function add_dictionary() {
        var subList=new Array($("ul.list-group li").size());
        $("ul.list-group li").each(function(n){
            if($(this).find("input").val()!="" && $(this).find("input").val()!=undefined){
                subList[n]=$(this).find("input").val();
            }
        });
        var sourceTypeId = $("#selectDataProducts_dictionary").val();//数据产品
        var add_dic = $("#add_dic").val();//字典名称
        var dictionaryType = $("#dictionaryType_dictionary").val();//字典类型
//	var add_kw = $("#add_kw").val();//关键字
        var dictionary_display_type = $("#dictionary_display_type").val();//字典展示类型
        var fieldType=$("#fieldTypeList_dictionary").val();
        if(typeof(sourceTypeId) == 'undefined' || sourceTypeId == '' || sourceTypeId == null || "0" == sourceTypeId){
            alert("请选择业务场景");
            return;
        }

        if(typeof(dictionaryType) == 'undefined' || dictionaryType == '' || dictionaryType == null || "0" == dictionaryType){
            alert("请选择字典聚类");
            return;
        }

        if(typeof(add_dic) == 'undefined' || add_dic == '' || add_dic == null){
            alert("请输入字典名称");
            return;
        }
        if($(".add_dictionary").children().is("errormsg")){
            alert($(".errormsg").text());
            return;
        }
        console.log($('.errormsg').html());
        if($('.errormsg').html()=='字典名重复'){
            alert('请重新填写字典');
            return;
        }

        if(typeof(dictionary_display_type) == 'undefined' || dictionary_display_type == '' || dictionary_display_type == null){
            dictionary_display_type = "11";
        }
        $.ajax({
            type : "POST",
            url : "/iwherelink/addCondition.do",
            dataType : "html",
            data : {
                dictionary : add_dic,
//			keyWord : add_kw,
                sourceTypeId:sourceTypeId,
                conditionDictionaryType : dictionaryType,
                dictionary_display_type : dictionary_display_type,
                "subList":subList,
                fieldType:fieldType
            },
            traditional:true,
            success : function(data) {
                if("SUCCESS" == data){
                    alert("添加字典成功");
                    $(".add_dictionary").hide();
                    $(".tablebg-grey").hide();
                    location.href = "/getConditionInfoList.do";
                }else{
                    alert("添加字典失败");
                    $(".add_dictionary").hide();
                    $(".tablebg-grey").hide();
                }
            }
        });
    }
    $('#save').click(function(){
        add_dictionary();
    });

    //批量删除
    $('#batch_del').click(function () {
        var allCheckBox=$("tbody").find("input[type='checkbox']");
        var checkedIds=[];
        var dicIds=[];
        for(var i=0;i<allCheckBox.length;i++){
            if(allCheckBox.eq(i).prop("checked")==true){
                checkedIds.push(allCheckBox.eq(i).val());
            }
        }
        for(var j=0;j<checkedIds.length;j++){
            dicIds[j]=checkedIds[j];
        }

        if(checkedIds.length==0){
            alert('请先选择要删除的数据');
            return;
        }
        if (confirm('确认删除？') == true ) {
            $.ajax({
                type: 'post',
                url: '/iwherelink/delConditionInfo.do',
                data: {
                    "ids":dicIds
                },
                traditional:true,
                success: function (data) {
                    if ("SUCCESS" == data) {
                        alert("删除成功!");
                        location.href = "/getConditionInfoList.do";
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