/**
 * Created by Administrator on 2016/7/21.
 */
$(function () {
    //初始化侧边栏的点击事件
    $('.sub-menu a[href="./back_cfg"]').addClass('current_page');
    var M_box=$('.M-box');
    var totalpage = parseInt(M_box.attr("totalpage"));
    var page = parseInt(M_box.attr("page"));

    M_box.pagination({
        pageCount:totalpage,
        current:page,
        coping:true,
        callback:function(index){
            getDatabaseTypePage('', '', index);
        }
    });
    //点击排序，发送请求，并给分页添加事件
    function getDatabaseTypePage(condition, sort, page) {
        $.post('/iwherelink/getDatabaseTypeSorted.do',
            {
                condition: condition,
                sort: sort,
                page: page
            },
            function (data) {
                if (data.page > 0) {
                    var tr = showDatabaseTypePage(data.data);
                    $(".databaseType").find("tbody").append(tr);
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
                        getDatabaseTypePage(condition, sort, page);
                    });

                    $(".pagination ul").find("li").removeClass("active").eq(page).addClass("active");*/
                } else {
                    $(".databaseType").find("tbody").empty();
                    //$(".pagination ul").empty();
                    $(".databaseType").find("tbody").append("<tr><td colspan='8' class='text-center'>暂无数据</td></tr>");
                }
            })
    }

    //动态生成表格数据
    function showDatabaseTypePage(value) {
        $(".databaseType").find("tbody").empty();
        var tr = "";

        $.each(value, function (n, data) {
            tr += "<tr>";
            //var td = '<td class="text-center">' + data.databaseType + '<input type="hidden" id='+ data.id +' name="databaseTypeId" value=' + data.id +' /></td>';
            var td = '<td class="text-center"><input type="checkbox" value='+data.id+' /></td>';
            td += "<td class='text-center'>" + data.databaseType + "</td>";
            td += "<td class='text-center'>" + data.databaseURL + "</td>";
            td += "<td class='text-center'><a class='edit' href='javascript:;'>编辑</a></td>";
            td += "<td class='text-center'><a class='delete' href='javascript:;'>删除</a></td>";
            tr += td;
            tr += "</tr>";
        });
        return tr;
    }

    //点击排序，进行排序
    $(".databaseType").find("i").click(function () {
        var sort = "";
        var condition = $(".databaseType").find("th").eq(1).attr("cond");
        if ($(this).is(".icon-chevron-up")) {
            //降序 DESC
            sort = "DESC";
            $(this).removeClass("icon-chevron-up").addClass("icon-chevron-down");

        } else {//升序 ASC
            sort = "ASC";
            $(this).removeClass("icon-chevron-down").addClass("icon-chevron-up");
        }
        $(".databaseType").find("tbody").empty();
        getDatabaseTypePage(condition, sort, 1);
    });
    //保存数据库类型
    function add_database_type() {
        // 添加数据源
        var databasetype = $("#databasetype").val();
        var databaseURL = $("#databaseURL").val();
        if (typeof(databasetype) == 'undefined' || databasetype == '' || databasetype == null) {
            alert("请填写下数据库类型");
            return;
        }
        if (typeof(databaseURL) == 'undefined' || databaseURL == '' || databaseURL == null) {
            alert("请填写连接地址");
            return;
        }
        if (typeof(databaseURL) != 'undefined' && databaseURL != '' && databasetype != null) {
            if (databaseURL.indexOf(":") <= 0) {
                alert("请填写下正确的url");
                return;
            }
        }
        if (databasetype != null && databasetype.trim().length > 0) {
            $.post('/iwherelink/addDBType.do', {
                    databasetype: databasetype.trim(),
                    databaseURL: databaseURL.trim()
                },
                function (data) {
                    if ("EXIST" == data) {
                        alert("数据库类型已经存在,请确认后再做添加!");
                        return;
                    } else if ("FAIL" == data) {
                        alert("数据库类型添加异常,请稍后再做添加!");
                        return;
                    } else if ("SUCCESS" == data) {
                        alert("数据库类型添加成功!");
                        location.href = "/getAllDBTypePage.do";
                    }
                }
            );
        } else {
            alert("请填写下数据源名称");
            return;
        }}
    //点击添加数据库弹窗里的"保存"按钮
    $('.add-new').find('#save').click(add_database_type);

    //编辑
    function update_database_type() {
        // 添加数据源
        var newType = $("#databasetype1").val();
        var oldType = $("#originalData").val();
        var newURL = $("#databaseURL1").val();
        var oldURL = $("#originalURL").val();
        if(newType == oldType && newURL == oldURL){
            alert("您当前未做任何修改!");
            $(".change-message").hide();
            $(".tablebg-grey").hide();
            return;
        }
        if(typeof(newType) == 'undefined' || newType == '' || newType == null){
            alert("请填写下数据源名称");
            return;
        }
        if(typeof(newURL) != 'undefined' && newURL != '' && newURL != null){
            if(newURL.indexOf(":") <= 0){
                alert("请填写下正确的url");
                return;
            }
        }

        if (newType != null && newType.trim().length > 0) {
            $.post('/iwherelink/updateDBType.do',{
                    newType : newType.trim(),
                    oldType : oldType.trim(),
                    newURL : newURL.trim(),
                    oldURL : oldURL.trim()
                },
                function(data) {
                    if ("EXIST" == data) {
                        alert("数据库类型已经存在,请确认后再做修改!");
                        return;
                    } else if ("FAIL" == data) {
                        alert("数据库类型添加异常,请稍后再做修改!");
                        return;
                    } else if ("SUCCESS" == data) {
                        alert("数据库类型修改成功!");
                        location.href = "getAllDBTypePage.do";
                    }
                }
            );
        } else {
            alert("请填写下数据源名称");
            return;
        }
    }
    $('#update_save').click(update_database_type);
    //删除
    $('table').on('click','.delete',function(){
        del($(this).get(0));
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
                url: '/iwherelink/deleteDBType.do',
                data: {
                    "databaseTypeId":databaseTypeIds
                },
                traditional:true,
                success: function (data) {
                    if ("SUCCESS" == data) {
                        alert("删除成功!");
                        location.href = "getAllDBTypePage.do";
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