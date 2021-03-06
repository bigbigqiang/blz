/**
 * Created by Administrator on 2016/7/21.
 */
$(function () {
    var authManagerTable = $(".auth_manager_table");
    //初始化侧边栏的点击事件
    $('.sub-menu a[href="./auth_manager"]').addClass('current_page');
    //初始化分页
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
        getAuthManagerListPage('', '', page);
    });
    //点击排序，发送请求，并给分页添加事件
    function getAuthManagerListPage(condition, sort, page) {
        $.get('/js/mockResultData2.json',                    //要改成post
            {
                condition: condition,
                sort: sort,
                page: page
            },
            function (data) {
                if (data.page > 0) {
                    var tr = showDatabaseTypePage(data.data);
                    authManagerTable.find("tbody").append(tr);
                    $('#select_all').prop("checked",false);
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
                        getAuthManagerListPage(condition, sort, page);
                    });

                    $(".pagination ul").find("li").removeClass("active").eq(page).addClass("active");
                } else {
                    authManagerTable.find("tbody").empty();
                    $(".pagination ul").empty();
                    authManagerTable.find("tbody").append("<tr><td colspan='4' class='text-center'>暂无数据</td></tr>");
                }
            })
    }

    //动态生成表格数据
    function showDatabaseTypePage(value) {
        authManagerTable.find("tbody").empty();
        var tr = "";
        $.each(value, function (n, data) {
            tr += "<tr>";
            var td = '<td class="text-center"><input  type="checkbox" value=' + data.id + '></td>';
            td += "<td style='display: none;'>" + data.id + "</td>";
            td += "<td class='text-center'>" + data.authName + "</td>";
            td += "<td class='text-center'>" + data.authUrl + "</td>";
            td += "<td class='text-center'>" + data.authClass + "</td>";
            td += "<td class='text-center'><a class='edit' href='javascript:;'>编辑</a></td>";
            td += "<td class='text-center'><a class='delete' href='javascript:;'>删除</a></td>";
            tr += td;
            tr += "</tr>";
        });
        return tr;
    }

    //点击排序，进行排序
    authManagerTable.find("i").click(function () {
        var sort = "";
        var condition = $(this).parents("th").attr("cond");
        if ($(this).is(".icon-chevron-up")) {
            //降序 DESC
            sort = "DESC";
            $(this).removeClass("icon-chevron-up").addClass("icon-chevron-down");

        } else {//升序 ASC
            sort = "ASC";
            $(this).removeClass("icon-chevron-down").addClass("icon-chevron-up");
        }
        authManagerTable.find("tbody").empty();
        getAuthManagerListPage(condition, sort, 1);
    });
    //保存添加
    function add_auth() {
        var authName = $("#auth_name").val();
        var authUrl = $("#auth_url").val();
        var authClass = $("#auth_class").find("option:selected").val();
        if (typeof(authName) == 'undefined' || authName == '' || authName == null) {
            alert("请填写权限名");
            return;
        }
        if (typeof(authUrl) == 'undefined' || authUrl == '' || authUrl == null) {
            alert("请填写权限url");
            return;
        }
        if (typeof(authClass) == 'undefined' || authClass == '' || authClass == null || authClass ==0) {
            alert("请选择权限所属类别");
            return;
        }
        $.post('/iwherelink/addDBType.do', {
                authName: authName.trim(),
                authUrl: authUrl.trim(),
                authClass: authClass.trim()
            },
            function (data) {
                if ("EXIST" == data) {
                    alert("此角色已经存在,请确认后再做添加!");     //是按照role还是rolename判断的？
                    return;
                } else if ("FAIL" == data) {
                    alert("数据库类型添加异常,请稍后再做添加!");
                    return;
                } else if ("SUCCESS" == data) {
                    alert("数据库类型添加成功!");
                    location.href = "/auth_manager";
                }
            })
    }

    //点击添加数据库弹窗里的"保存"按钮
    $('.add-new').find('#save').click(add_auth);

    //编辑
    var editModal=$(".change-message");
    authManagerTable.on('click','.edit',function(){
        var id=$(this).parent().siblings().eq(1).val();
        editModal.find("form input:eq(0)").val(
            $(this).parents("tr").find("td:eq(2)")
                .text());
        editModal.find("form input:eq(1)").val(
            $(this).parents("tr").find("td:eq(3)")
                .text());
        editModal.find("#originalAuthName").val(
            $(this).parents("tr").find("td:eq(2)")
                .text());
        editModal.find("#originalAuthUrl").val(
            $(this).parents("tr").find("td:eq(3)")
                .text());
        editModal.find("#originalAuthClass").val(
            $(this).parents("tr").find("td:eq(4)")
                .text());
    });

    //保存编辑
    function update_database_type() {
        var newAuthName = $("#auth_name1").val().trim();
        var oldAuthName = $("#originalRole").val();
        var newName = $("#auth_name1").val().trim();
        var oldName = $("#originalRole").val();
        var newName = $("#auth_name1").val().trim();
        var oldName = $("#originalRole").val();
        if (newName == oldName) {
            alert("您当前未做任何修改!");
            $(".change-message").hide();
            $(".tablebg-grey").hide();
            return;
        }
        $.post('/iwherelink/updateDBType.do', {
                newName: newName,
                oldName: oldName
            },
            function (data) {
                if ("EXIST" == data) {
                    alert("此权限分类已经存在,请确认后再做修改!");
                    return;
                } else if ("FAIL" == data) {
                    alert("编辑异常,请稍后再做修改!");
                    return;
                } else if ("SUCCESS" == data) {
                    alert("修改成功!");
                    location.href = "auth_class";
                }
            }
        );
    }

    $('#update_save').click(update_database_type);
    //删除
    $('table').on('click', '.delete', function () {
        var authClassId=$(this).parents('td').eq(1).val();
        if (confirm('确认删除？') == true ) {
            $.ajax({
                type: 'post',
                url: '/iwherelink/delConditionInfo.do',
                data: {
                    "sourceTypeId":authClassId
                },
                traditional:true,
                success: function (data) {
                    if ("SUCCESS" == data) {
                        alert("删除成功!");
                        location.href = "role_cfg";
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
    //批量删除
    $('#batch_del').click(function () {
        var allCheckBox=$("tbody").find("input[type='checkbox']");
        var checkedIds=[];
        var authClassId=[];
        for(var i=0;i<allCheckBox.length;i++){
            if(allCheckBox.eq(i).prop("checked")==true){
                checkedIds.push(allCheckBox.eq(i).val());
            }
        }
        for(var j=0;j<checkedIds.length;j++){
            authClassId[j]=checkedIds[j];
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
                    "sourceTypeId":authClassId
                },
                traditional:true,
                success: function (data) {
                    if ("SUCCESS" == data) {
                        alert("删除成功!");
                        location.href = "scene_cfg";
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