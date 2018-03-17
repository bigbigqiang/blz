jsPlumb.ready(function () {
    //单选多远
    $('table').on('change','#select_all',function(){
        if($(this).prop('checked')){
            alert('被选中');
        }else{
            alert('被取消');
        }
    });
    $('table tbody').on('change','input[type = "checkbox"]',function(){
        if($(this).prop('checked')){
            var header = $.trim($(this).parent().next().text());
            $.get('/iwherelink/getDataService.do?id='+$(this).val(),
                function(data) {
                    data = JSON.parse(data);
                    console.log(rearrange());
                    var tHeader ='<div class="ligatureTable" style="top:'+rearrange().top+'px;left:'+rearrange().left+'px"> ' +
                        '<div class="ligature-title">'+header+'<img class="pull-right ligatureRemove" src="image/portlet-remove-icon-white.png"></div>';
                    var tBody = '<ul>';

                    for(var i=0;i<data.data.length;i++){
                        var id = header+"_"+i;
                        tBody+=' <li id='+id+'><img class="pull-left ligatureRemove" src="image/portlet-remove-icon-white.png">'+data.data[i]+'</li> ';
                    }
                    var tFoot = '</ul> </div>';
                    $('.ligatureContennner').append(tHeader+tBody+tFoot);
                    var li = $('.ligatureContennner ul li');
                    jsPlumb.deleteEveryEndpoint();
                    for(var j=0;j<li.length;j++){
                        jsPlumb.addEndpoint(li[j].id, {anchor: anchors}, exampleEndpoint1);
                    }
                    jsPlumb.draggable($('.ligatureTable'));
                }
            );
        }else{}
    });
    function rearrange(){
        var table = $('.ligatureTable');
        var ligature = $('.ligatureContennner');
        var ligatureWidth = parseInt(ligature.width());
        var l,t;
        if(table.length>0){
            var lastTable = table.eq(table.length-1);
            var left = parseInt(lastTable.css('left'));
            var top = parseInt(lastTable.css('top'));
            var w = parseInt(lastTable.width());
            var h = parseInt(lastTable.height());
            if((ligatureWidth-left)<(w+20)){
                l=20;
                t = top+h+20;
            }else{
                l = left+w+20;
                t = top;
            }

        }else{
            l=20;
            t=50;
        }
        return {
            left:l,
            top:t
        }
    }

    //首先，我们给jsPlumb设一些默认值，然后声明一个exampleDropOptions变量。
    jsPlumb.importDefaults({
        DragOptions: { cursor: 'pointer'},  //拖动时鼠标停留在该元素上显示指针，通过css控制
        PaintStyle: { strokeStyle: '#666' },//元素的默认颜色
        EndpointStyle: { width: 20, height: 16, strokeStyle: '#567567' },//连接点的默认颜色
        Endpoint: [ "Dot", { radius: 5 } ],//连接点的默认形状
        Connector: [ "Bezier", { curviness: 150 } ],
        Anchors: [ "TopCenter", "BottomCenter" ],//连接点的默认位置
        ConnectionOverlays: [//连接覆盖图
            ["Arrow", {
                location: 1,
                id: "arrow",
                length: 14,
                foldback: 1
            }],
            ["Label", {
                location: 0.5,
                id: "label",
                cssClass: "aLabel"
            }]
        ]
    });
    var exampleDropOptions = {
        hoverClass: "dropHover",//释放时指定鼠标停留在该元素上使用的css class
        activeClass: "dragActive"//可拖动到的元素使用的css class
    };

    // 绑定到连接/ connectionDetached事件,和更新的列表在屏幕上的连接。
    jsPlumb.bind("connection", function (info, originalEvent) {
        updateConnections(info.connection);
    });
    jsPlumb.bind("connectionDetached", function (info, originalEvent) {
        updateConnections(info.connection, true);
        /*$('._jsPlumb_connector').on("click",addText);*/
    });
    jsPlumb.bind("click", function (info, originalEvent) {
        /*if (confirm("Delete connection from " + info.sourceId + " to " + info.targetId + "?")){
         jsPlumb.detach(info);
         }*/
        var svg = $(info.getConnector().svg);
        info.setLabel("OUTJOIN");
        //info.connection.getOverlay("label").setLabel("OUTJOIN");

    });

    function updateConnections(info) {
        alert("连接线ID:" + info.id + "\n连接线sourceID:" + info.sourceId + "\n连接线targetID:" + info.targetId);
        alert(info.endpoints[0].getUuid().substr(info.endpoints[0].getUuid().indexOf('-') + 1));
    }


    //添加jsPlumb连接点
    var color1 = "#316b31";
    var exampleEndpoint1 = {
        endpoint: ["Dot", { radius: 5 }],//设置连接点的形状为圆形
        paintStyle: { fillStyle: color1 },//设置连接点的颜色
        isSource: true, //是否可以拖动（作为连线起点）
        scope: "green dot",//连接点的标识符，只有标识符相同的连接点才能连接
        connectorStyle: { strokeStyle: color1, lineWidth: 2 },//连线颜色、粗细
        connector: ["Bezier", { curviness: 10 } ],//设置连线为贝塞尔曲线
        maxConnections: -1,//设置连接点最多可以连接几条线
        isTarget: true, //是否可以放置（作为连线终点）
        dropOptions: exampleDropOptions//设置放置相关的css
    };

    var color2 = "rgba(229,219,61,0.5)";
    var exampleEndpoint2 = {
        endpoint: "Rectangle",  //设置连接点的形状为矩形
        paintStyle: {//设置连接点的大小、颜色、透明度
            width: 25,
            height: 21,
            fillStyle: "red",
            opacity: 0.5
        },
        anchor: "BottomLeft",   //设置连接点的位置，左下角
        isSource: true, //是否可以拖动（作为连线起点）
        scope: 'yellow dot',    //连接点的标识符，只有标识符相同的连接点才能连接
        connectorStyle: { strokeStyle: color2, lineWidth: 2},//连线颜色、粗细
        //connector: "Straight",    //设置连线为直线
        connector: "Flowchart",//设置为流程图线
        isTarget: true,//是否可以放置（作为连线终点）
        maxConnections: 3,//设置连接点最多可以连接几条线  [-1为无限制]
        dropOptions: exampleDropOptions,//设置放置相关的css
        beforeDetach: function (conn) { //绑定一个函数，在连线前弹出确认框
            return confirm("断开连接?");
        },
        onMaxConnections: function (info) {//绑定一个函数，当到达最大连接个数时弹出提示框
            alert("Cannot drop connection " + info.connection.id + " : maxConnections has been reached on Endpoint " + info.endpoint.id);
        }
    };

    var exampleEndpoint3 = {
        endpoint: "Rectangle",  //设置连接点的形状为矩形
        paintStyle: {//设置连接点的大小、颜色、透明度
            width: 100,
            height: 5,
            fillStyle: "blue",
            opacity: 0.3
        },
        anchor: "BottomLeft",   //设置连接点的位置，左下角
        isSource: true, //是否可以拖动（作为连线起点）
        scope: 'blue dot',  //连接点的标识符，只有标识符相同的连接点才能连接
        connectorStyle: { strokeStyle: color2, lineWidth: 2},//连线颜色、粗细
        //connector: "Straight",    //设置连线为直线
        connector: "Flowchart",//设置为流程图线
        isTarget: true,//是否可以放置（作为连线终点）
        maxConnections: -1,//设置连接点最多可以连接几条线  [-1为无限制]
        dropOptions: exampleDropOptions,//设置放置相关的css
        beforeDetach: function (conn) { //绑定一个函数，在连线前弹出确认框
            return confirm("断开连接?");
        },
        onMaxConnections: function (info) {//绑定一个函数，当到达最大连接个数时弹出提示框
            alert("Cannot drop connection " + info.connection.id + " : maxConnections has been reached on Endpoint " + info.endpoint.id);
        }
    };


    //将连接点绑定到html元素上
    var anchors = [
            [1, 0.5, 1, 0],
            // [0.8, 1, 0, 1],
            [0, 0.5, -1, 0]
            //[0.2, 0, 0, -1]
        ],
        maxConnectionsCallback = function (info) {
            alert("Cannot drop connection " + info.connection.id + " : maxConnections has been reached on Endpoint " + info.endpoint.id);
        };

});
