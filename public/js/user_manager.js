/**
 * Created by Administrator on 2016/7/21.
 */
$(function () {
    var userTable = $(".user_table");
    //初始化侧边栏的点击事件
    $('.sub-menu a[href="./userManager.do"]').addClass('current_page');

    // 请求用户列表
    function getUsers(){
        $.ajax({
            type:"get",
            dataType:"json",
            url:'/blz/manageUser.do',
            success:function(data){
                showUserPage(data)
            },
            error:function(){
                alert("获取角色列表失败，请重新获取");
            }
        });
    }
    getUsers();

    //动态生成表格数据
    function showUserPage(value) {
        var tr = "";

        $.each(value, function (n, data) {
            tr += "<tr>";
            var td = '<td class="text-center">' +
                ' <input  type="checkbox" value=' + data.id + '>' +
                '</td>';
            td += "<td style='display: none;'>" + data.id + "</td>";
            td += "<td class='text-center'>" + data.name + "</td>";
            td += "<td class='text-center'>" + data.role + "</td>";
            // td += "<td class='text-center'>" + data.create + "</td>";
            // td += "<td class='text-center'>" + data.createTime + "</td>";
            td += "<td class='text-center'><a class='edit' href='javascript:;'>编辑</a></td>";
            td += "<td class='text-center'><a class='delete' href='javascript:;'>删除</a></td>";
            tr += td;
            tr += "</tr>";
        });
        userTable.find("tbody").html(tr);}


    //添加用户
    function add_user() {
        var username = $("#username").val();
        var password = $("#password").val();
        var role = $("#role_list").val();
        if (typeof(username) == 'undefined' || username == '' || username == null) {
            alert("请填写下用户名");
            return;
        }
        if (typeof(password) == 'undefined' || password == '' || password == null) {
            alert("请填写密码");
            return;
        }
        if (typeof(role) == 'undefined' || role == '' || role == null|| role == 0) {
            alert("请选择角色");
            return;
        }
        $.post('/blz/addUser.do', {
                userName: username.trim(),
                password: password.trim(),
                roleId:role
            },
            function (data) {
                data = JSON.parse(data);
                if (data.code == 0) {
                    layer.alert("添加成功");  
                    $(".add-new").hide();
                    $(".tablebg-grey").hide(); 
                    getUsers();
                    return;
                } else {
                    layer.alert("添加失败,请重试!");
                    return;
                }
            })
    }

    //点击添加弹窗里的"保存"按钮
    $('.add-new').find('#save').click(add_user);

    //编辑
    var userId;
    $('table').on('click', '.edit', function () {
        userId = $(this).parents('tr').find("td").eq(1).text();
        $(".change-message").show();
        $(".tablebg-grey").show();
        var username = $(this).parent().siblings().eq(2).html();
        var rolename = $(this).parent().siblings().eq(3).html();
        $("#username1").val(username);
        $("#role_list1").val(rolename);
    });

    //保存编辑
    function update_user() {
        var name = $("#username1").val();
        var password = $("#password1").val();
        var role = $("#role_list1").val();
        if (name == null || name=="" ||name==" ") {
            alert("请填写用户名!");
            $(".change-message").hide();
            $(".tablebg-grey").hide();
            return;
        }
        $.post('/blz/updateUser.do', {
                username: name,
                password: password,
                userId:userId,
                role:role
            },
            function (data) {
                data = JSON.parse(data);
                if (data.code == 0) {
                    layer.alert("修改成功");
                    $(".change-message").hide();
                    $(".tablebg-grey").hide();
                    getUsers();
                } else {
                    layer.alert("修改失败，请重试");
                }
            }
        );
    }

    $('#update_save').click(update_user);
    //删除
    $('table').on('click', '.delete', function () {
        var userListId=$(this).parents('tr').find("td").eq(1).text();
        var userListIds=[];
        userListIds.push(userListId);
        if (confirm('确认删除？') == true ) {
            $.ajax({
                type: 'post',
                url: '/blz/deleteUser.do',
                data: {
                    "userId":userListIds
                },
                traditional:true,
                success: function (data) {
                    data = JSON.parse(data);
                    if (data.code == 0) {
                        layer.alert("删除成功");
                        getUsers();
                    } else {
                        layer.alert("删除失败，请重试");
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
        var userListIds=[];
        for(var i=0;i<allCheckBox.length;i++){
            if(allCheckBox.eq(i).prop("checked")==true){
                checkedIds.push(allCheckBox.eq(i).val());
            }
        }
        for(var j=0;j<checkedIds.length;j++){
            userListIds[j]=checkedIds[j];
        }

        if(checkedIds.length==0){
            alert('请先选择要删除的数据');
            return;
        }
        if (confirm('确认删除？') == true ) {
            $.ajax({
                type: 'post',
                url: '/blz/deleteUser.do',
                data: {
                    "userId":userListIds
                },
                traditional:true,
                success: function (data) {
                    console.log(data)
                    data = JSON.parse(data);
                    console.log(data)
                    if (data.code == 0) {
                        layer.alert("删除成功");
                        getUsers();
                    } else {
                        layer.alert("删除失败，请重试");
                    }
                },
                error: function () {
                    layer.alert("数据库类型存在异常,暂时无法删除,请稍后再做操作!");
                    return;
                }
            });
        }
    });
});