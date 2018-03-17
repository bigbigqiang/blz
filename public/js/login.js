$(window).resize(function(){
	if ($(window).height() < 700) {
		$('.footer').css('z-index',-1);
	} else {
		$('.footer').css('z-index',10);
	}
});
$('body').css('min-height', '768px!important');
//点击登录
function ajaxData () {
	var username = $("input[name='username']").val();
	var password = $("input[name='password']").val();
	if(username == "") {$(".wrong").show().html("不能为空");return;}
	if(password == "") {$(".pwd .msg").show().html("不能为空");return;}
	$.ajax({
		type: "POST",
		url: "/loginIn",
		data: {
			name: username,
			password: password
		},
		dataType: "json",
		success: function (data) {
			if(data.code == 2){
				$(".correct").show();
				$(".pwd span").show().html("密码错误");
			}else if(data.code == 1){
				$(".wrong").show().html("登录名错误");
			}else{
				window.location.href = "/";
			}
		},
		error: function () {
			alert("登录失败，请稍后重试！")
		}
	});
}
$("button").click(ajaxData);
$(window).on('keydown',function (e) {
	if (e.keyCode == 13) ajaxData();
});
//清除输入内容
$(".login b").click(function () {
	$(this).parent().find("input").val("");
});
//显示清除图标
$("input").on("focus",function () {
	$(this).next().show();
	$(this).siblings(".msg").hide();
	$(this).addClass("active");
});
//隐藏清除图标
$("input").on("blur",function () {
	$(this).next().hide();
	$(this).removeClass("active");
});
