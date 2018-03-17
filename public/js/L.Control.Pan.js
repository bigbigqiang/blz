/*
*创建时间：2016.01.18
*创建人：刘石南
*功能：地图罗盘控件
*/
L.Control.Pan = L.Control.extend({
	options: {
		position: 'topleft',
		panOffset: 500,//移动位置的大小,超出地图大小会跳
        centerPoint: L.latLng(39.7599, 116.1015)
	},

	onAdd: function (map) {
		var className = 'leaflet-control-pan',
			container = L.DomUtil.create('div', className),
			off = this.options.panOffset;
            centerPoint=this.options.centerPoint;
		//建立div-container
		this._panButton('Up'   , className + '-up'   , container, map, new L.Point(    0 , -off));
		this._panButton('Left' , className + '-left' , container, map, new L.Point( -off ,  0));
		this._panButton('Right', className + '-right', container, map, new L.Point(  off ,  0));
		this._panButton('Down' , className + '-down' , container, map, new L.Point(    0 ,  off));
       // this._panButton('Center' , className + '-center' , container, map, new L.Point(51.505, -0.09));屏幕坐标
        this._panHomeButton('Center' , className + '-center' , container, map, centerPoint );

		return container;
	},//建立四个方向div

    _panHomeButton:function(title, className, container, map, offset){
        var wrapper = L.DomUtil.create('div', className + "-wrap", container);
        var link = L.DomUtil.create('a', className, wrapper);
        var linkimg= L.DomUtil.create('img',className+'-img',link);
        link.href='#';
        link.title = title;
        linkimg.src='/image/arrow.png';

        L.DomEvent
            .on(link, 'click', L.DomEvent.stopPropagation)
            .on(link, 'dblclick', L.DomEvent.stopPropagation)
            //.on(wrapper, 'click',function(){alert("aaa");},map)//阻止事件传递给父级
            .on(link, 'click', L.DomEvent.preventDefault)//阻止默认动作发生 e.g. a跳转#
            .on(link, 'click', function(){ map.panTo(offset); }, map)
        return link;
    },//建立回到固定地理坐标

	_panButton: function (title, className, container, map, offset) {
		var wrapper = L.DomUtil.create('div', className + "-wrap", container);
		var link = L.DomUtil.create('a', className, wrapper);
        var linkimg= L.DomUtil.create('img',className+'-img',link);
        link.href='#';
        link.title = title;
        linkimg.src='/image/arrow.png';

        L.DomEvent
			.on(link, 'click', L.DomEvent.stopPropagation)
			.on(link, 'dblclick', L.DomEvent.stopPropagation)
			//.on(wrapper, 'click',function(){alert("aaa");},map)//阻止事件传递给父级
			.on(link, 'click', L.DomEvent.preventDefault)//阻止默认动作发生 e.g. a跳转#
			.on(link, 'click', function(){ map.panBy(offset); }, map)
		return link;
	},//建立四个方向a标签
	
	_panImg:function(title, className, container,src, link){
		
	}
});

L.Map.mergeOptions({
    panControl: true//扩展属性 增加属性值 leaflet-src.js
});

L.Map.addInitHook(function () {
    if (this.options.panControl) {
		this.panControl = new L.Control.Pan();
		this.addControl(this.panControl);
	}
});//初始化插件

L.control.pan = function (options) {
    return new L.Control.Pan(options);
};//添加插件
