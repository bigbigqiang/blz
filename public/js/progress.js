$(function(){
    var isDown = false;
    var barWidth = $(".content_bar").width();
    var stepWidth = barWidth/10;
    var prog = $(".prograss");
    var progbar = $(".prograss i");
    var btn_width = progbar.width();
    //进度条左右按钮
     function addbtn(e){
         e.stopPropagation();
         var pro_width = prog.width();
         if(pro_width<=stepWidth){prog.width(0); progbar.css("left",0)}
         else{prog.width(pro_width-stepWidth);progbar.css("left",pro_width-stepWidth)}
     }
    function cutbtn(e){
        e.stopPropagation();
        var pro_width = prog.width();
        if(pro_width>=(barWidth-stepWidth)){prog.width(barWidth);progbar.css("left",barWidth-btn_width)}
        else{prog.width(pro_width+stepWidth);progbar.css("left",pro_width+stepWidth)}
    }
    /*$(".control:first").click(addbtn);
    $(".control:eq(1)").click(cutbtn);
    $(".control:eq(2)").click(addbtn);
    $(".control:eq(3)").click(cutbtn);*/

    var down = function (e){
        isDown = true;
        var objx = e.pageX;
        var progLeft =objx- 80-btn_width/2;
		var maxWith = 190 - btn_width;
		 progLeft<=0&&(progLeft=0);
            progLeft>=maxWith&&(progLeft= maxWith);
        prog.width(progLeft);
        progbar.css("left",progLeft);
        e.stopPropagation();
		$('.right_bar').html(Math.floor(progLeft*(100/182)));
    };
    function move(e){
        if(isDown == true){
            var objx = e.pageX;
            var progLeft =objx- 80-btn_width/2;
            var maxWith = 190 - btn_width;
            progLeft<=0&&(progLeft=0);
            progLeft>=maxWith&&(progLeft= maxWith);
            progbar.css("left",progLeft);
            prog.width(progLeft);
            $('.right_bar').html(Math.floor(progLeft*(100/182)));
        }
        e.preventDefault();
    }
    function up(){
        isDown = false;
    }
    progbar.on({
        mousedown:down,
        mouseup:up,
        mousemove:move
    });
    $(".content_bar").on({
        mousedown:down,
        mouseup:up,
        mousemove:move
    });
    prog.on({
        mousedown:down,
        mouseup:up,
        mousemove:move
    });

    $("body").on({
        mouseup:up,
        mousemove:move,
    });

});/**
 * Created by Administrator on 2015/12/24 0024.
 */
