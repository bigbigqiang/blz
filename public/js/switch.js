$(function(){
    (function timeLine(){
        var switchBtn = $('.switch');
        switchBtn.on('click',function(e){
            e.stopPropagation();
            if($(this).hasClass('off')){
                $(this).removeClass('off');
                $(this).find('span').animate({left:'25px'},"fast");

            }else{
                $(this).addClass('off');
                $(this).find('span').animate({left:'1px'},"fast");
            }
        });
    })();
});