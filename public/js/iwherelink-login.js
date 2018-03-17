/**
 * Created by Administrator on 2016/9/20.
 */
$(function () {
    var userName = $("#user_name");
    var userPw = $("#user_pw");
    var nameMsg = $('.name_msg');
    var pwMsg = $('.pw_msg');
    var loginBtn = $("#login_btn");
    //点击清除输入框
    userName.one('focus', function () {
        $(this).val('');
        nameMsg.text('');
        pwMsg.text('');
    });
    userName.keydown(function () {
        nameMsg.text('');
    });
    userPw.focus(function () {
        $(this).val('');
        pwMsg.text('');
    });
    //表单验证
    userName.blur(function () {
        if($(this).val()==''|| $(this).val()==null){
            nameMsg.text('用户名不能为空！');
        }
    });
    userPw.blur(function () {
        if($(this).val()==''|| $(this).val()==null){
            pwMsg.text('密码不能为空！');
        }
    });
    loginBtn.click(function () {
        var userNameVal = $("#user_name").val().trim();
        var userPwVal = $("#user_pw").val().trim();
        nameMsg.text('');
        pwMsg.text('');
        if (typeof(userNameVal) == 'undefined' || userNameVal == '' || userNameVal == null || userNameVal=="用户名") {
            nameMsg.text('请输入用户名！');
            return false;
        }
        if (typeof(userPwVal) == 'undefined' || userPwVal == '' || userPwVal == null || userPwVal=="密码") {
            pwMsg.text('请输入密码！');
            return false;
        }

        $.ajax({
            type: 'post',
            url: '/loginIn',
            data:{
                userName:userNameVal,
                password:userPwVal
            },
            success:function(data){
                if(data=="SUCCESS"){
                    location.href='/index.do';
                }
                if(data=="FAIL"){
                    pwMsg.text('用户名或密码错误');
                    return false;
                }
            },
            error:function(){
                pwMsg.text('提交出现问题，请刷新页面重新提交！');
                return false;
            }
        });
        return false;
    });
});