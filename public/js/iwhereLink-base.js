/**
 * Created by renxiaolu on 2015/9/28.
 */
//初始化页面容器高度
function initContainer(){
    var hh = $(".header").height();
    var wh = ($(window).height());
    var h = wh - hh;
    $(".page-content").css("min-height", h);
}
$(".page-sidebar").load("iWhereLink-slide.jsp");