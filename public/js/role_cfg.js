/**
 * Created by Administrator on 2016/7/21.
 */
$(function () {
    var roleTable = $(".role_table");
    //初始化侧边栏的点击事件
    $('.sub-menu a[href="./role_cfg"]').addClass('current_page');
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
        getRoleListPage('', '', page);
    });
    //点击排序，发送请求，并给分页添加事件
    function getRoleListPage(condition, sort, page) {
        $.get('/js/mockResultData.json',            //要改成post
            {
                condition: condition,
                sort: sort,
                page: page
            },
            function (data) {
                if (data.page > 0) {
                    var tr = showRolePage(data.data);
                    roleTable.find("tbody").append(tr);
                    $('#select_all').prop("checked", false);
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
                        getRoleListPage(condition, sort, page);
                    });

                    $(".pagination ul").find("li").removeClass("active").eq(page).addClass("active");
                } else {
                    roleTable.find("tbody").empty();
                    $(".pagination ul").empty();
                    roleTable.find("tbody").append("<tr><td colspan='4' class='text-center'>暂无数据</td></tr>");
                }
            })
    }

    //动态生成表格数据
    function showRolePage(value) {
        roleTable.find("tbody").empty();
        var tr = "";

        $.each(value, function (n, data) {
            tr += "<tr>";
            var td = '<td class="text-center">' +
                ' <input  type="checkbox" value=' + data.id + '>' +
                '</td>';
            td += "<td style='display: none;'>" + data.id + "</td>";
            td += "<td class='text-center'>" + data.role + "</td>";
            td += "<td class='text-center'>" + data.roleName + "</td>";
            td += "<td class='text-center'><a class='check_auth' href='javascript:;'>查看</a></td>";
            td += "<td class='text-center'><a class='edit' href='javascript:;'>编辑</a></td>";
            td += "<td class='text-center'><a class='delete' href='javascript:;'>删除</a></td>";
            tr += td;
            tr += "</tr>";
        });
        return tr;
    }

    //点击排序，进行排序
    roleTable.find("i").click(function () {
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
        roleTable.find("tbody").empty();
        getRoleListPage(condition, sort, 1);
    });
    //保存数据库类型
    function add_role() {
        // 添加角色
        var role = $("#role").val();
        var roleName = $("#roleName").val();
        if (typeof(role) == 'undefined' || role == '' || role == null) {
            alert("请填写下角色的英文名称");
            return;
        }
        if (typeof(roleName) == 'undefined' || roleName == '' || roleName == null) {
            alert("请填写角色名");
            return;
        }
        $.post('/iwherelink/addRole.do', {
                eName: role.trim(),
                cName: roleName.trim()
            },
            function (data) {
                if ("EXIST" == data) {
                    alert("此角色已经存在,请确认后再做添加!");     //是按照role还是rolename判断的？
                    return;
                } else if ("FAIL" == data) {
                    alert("数据库类型添加异常,请稍后再做添加!");
                    return;
                } else if ("SUCCESS" == data) {
                    alert("添加成功!");
                    location.href = "/role_cfg";
                }
            })
    }

    //点击添加弹窗里的"保存"按钮
    $('.add-new').find('#save').click(add_role);

    //查看权限
    var allPermission = []; //系统所有权限
    var rolePermission = []; //每个角色对应的权限
    roleTable.on('click', '.check_auth', function () {
        var roleId = $(this).parent().siblings().eq(1).text();
        $("#roleId1").val(roleId);
        allPermission = [];
        $("#allPermission").val('');
        $('#auth_modal').show();
        $(".tablebg-grey").show();
        $.ajax({
            type: 'get',
            url: '/iwherelink/showAllPermission.do',
            dataType: "json",
            success: function (data) {
                var li = "";
                $(".auth_list-item").empty();
                $.each(data, function (n, value) {
                    li += '<li><input type="checkbox" value="' + value.id + '"/><span>' + value.permissionName + '</span></li>';
                    allPermission.push(value.id);
                });
                $("#allPermission").val(allPermission);
                $(".auth_list-item").append(li);
                $.ajax({
                    type: 'post',
                    url: '/iwherelink/showPermissionOfRole.do',
                    data: {
                        roleId: roleId
                    },
                    dataType: "json",
                    success: function (data) {
                        rolePermission = [];
                        $(".auth_list-item").find("input[type='checkbox']").prop("checked", false);
                        $.each(data, function (n, value) {
                            rolePermission.push(value.id);
                            $(".auth_list-item").find("input[value='" + value.id + "']").prop("checked", "checked");
                        });
                        $("#rolePermission").val(rolePermission);

                    },
                    error: function () {
                        alert("初始化角色权限失败，请刷新页面");
                    }
                });
            },
            error: function () {
                alert("初始化权限列表失败，请重新刷新页面后再操作");
                return;
            }
        });

    });

    //隐藏权限弹窗
    $("#auth_modal").on('click', '.cancel', function () {
        $('#auth_modal').hide();
        $(".tablebg-grey").hide();
    });
    $("#auth_modal").on('click', 'img', function () {
        $('#auth_modal').hide();
        $(".tablebg-grey").hide();
    });

    //修改权限
    $("#update_auth").click(function () {
        var newPermissionId = [];
        var oldPermissionId = $("#rolePermission").val().split(",");

        var newCheckedbox = $(".auth_list-item").find("input[type='checkbox']");
        var roleId = $("#roleId1").val();

        for (var i = 0; i < newCheckedbox.length; i++) {
            if ($(newCheckedbox[i]).prop("checked") == true) {
                newPermissionId.push($(newCheckedbox[i]).val());
            }
        }

        console.log(newPermissionId.sort());
        console.log(oldPermissionId);

        if(newPermissionId.sort().toString()==oldPermissionId.sort().toString()){
                alert("您并未进行任何修改");
                $('#auth_modal').hide();
                $(".tablebg-grey").hide();
        }
        $.ajax({
            type: 'post',
            url: '/iwherelink/managePermission.do',
            data: {
                roleId: roleId,
                "permissionId": newPermissionId
            },
            traditional: true,
            success: function () {
                alert("修改权限成功！");
                location.href = "role_cfg";
            },
            error: function () {
                alert("添加权限失败，请刷新页面重新添加");
            }
        });

    });

    //编辑
    var editModal = $(".change-message");
    roleTable.on('click', '.edit', function () {
        var id = $(this).parent().siblings().eq(1).text();
        editModal.find("form input:eq(0)").val(
            $(this).parents("tr").find("td:eq(2)")
                .text());
        editModal.find("form input:eq(1)").val(
            $(this).parents("tr").find("td:eq(3)")
                .text());
        $("#roleId").val(id);
        $("#originaleName").val($(this).parents("tr").find("td:eq(2)")
            .text());
        $("#originalcName").val($(this).parents("tr").find("td:eq(3)")
            .text());
    });

    //保存编辑
    function update_role() {
        // 添加数据源
        var eName = $("#role1").val();
        var oldeName = $("#originaleName").val();
        var cName = $("#roleName1").val();
        var oldcName = $("#originalcName").val();
        var roleId = $("#roleId").val();
        if (eName == oldeName && cName == oldcName) {
            alert("您当前未做任何修改!");
            $(".change-message").hide();
            $(".tablebg-grey").hide();
            return;
        }
        if (typeof(cName) == 'undefined' || cName == '' || cName == null) {
            alert("请填写下角色的中文名");
            return;
        }
        $.post('/iwherelink/updateRole.do', {
                roleId: roleId,
                eName: eName,
                cName: cName
            },
            function (data) {
                if ("EXIST" == data) {
                    alert("此角色已经存在,请确认后再做修改!");
                    return;
                } else if ("FAIL" == data) {
                    alert("编辑角色异常,请稍后再做修改!");
                    return;
                } else if ("SUCCESS" == data) {
                    alert("角色修改成功!");
                    location.href = "role_cfg";
                }
            }
        );
    }

    $('#update_save').click(update_role);
    //删除
    $('table').on('click', '.delete', function () {
        var roleListIds = [];
        var roleListId = $(this).parent().siblings().eq(1).text();
        roleListIds.push(roleListId);
        if (confirm('确认删除？') == true) {
            $.ajax({
                type: 'post',
                url: '/iwherelink/deleteRole.do',
                data: {
                    "roleId": roleListIds
                },
                traditional: true,
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
        var allCheckBox = $("tbody").find("input[type='checkbox']");
        var checkedIds = [];
        var roleListIds = [];
        for (var i = 0; i < allCheckBox.length; i++) {
            if (allCheckBox.eq(i).prop("checked") == true) {
                checkedIds.push(allCheckBox.eq(i).val());
            }
        }
        for (var j = 0; j < checkedIds.length; j++) {
            roleListIds[j] = checkedIds[j];
        }

        if (checkedIds.length == 0) {
            alert('请先选择要删除的数据');
            return;
        }
        if (confirm('确认删除？') == true) {
            $.ajax({
                type: 'post',
                url: '/iwherelink/deleteRole.do',
                data: {
                    "roleId": roleListIds
                },
                traditional: true,
                success: function (data) {
                    if ("SUCCESS" == data) {
                        alert("删除成功!");
                        location.href = "role_cfg";
                    } else if ("FAIL" == data) {
                        alert("删除失败,请先刷新，再做操作!");
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