//�������ѯtip��ʽ
//$.getScript("");

    

$(function()
{
    var tabs = $("#tabs").find('li');
    var list = $("#list");
    var ul = list.find("ul");
    function active(){
        $(this).addClass('active');
        $(this).siblings().removeClass('active');
        $("#list").find("ul").eq($(this).index()).addClass('active');
        $("#list").find("ul").eq($(this).index()).siblings().removeClass('active');
    }
    $("#tabs").find('li').on('click',active);
});

