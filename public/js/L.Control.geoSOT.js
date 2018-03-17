L.geoSOT = L.Control.extend({
    options: {
        position: 'topright'
    },
    initialize: function (options) {
        L.Util.setOptions(this, options);
    },
    onAdd: function (map) {//创建控件容器，添加事件
        this._map = map;
        this._ui = this._createUI();
        return this._ui.bar;
    },
    _createUI:function(){
        var ui={};
        var className = 'geoSOT';
        ui.bar = L.DomUtil.create('div', 'geoSOT-bar');
        ui.HOME = L.DomUtil.create('div', className + ' geoSOT-HOME',ui.bar);
        ui.HOME.innerHTML='<span class="geoIcon glyphicon glyphicon-home" title="当前地图层级网格"></span>';
        ui.OUT = L.DomUtil.create('div', className + ' geoSOT-OUT',ui.bar);
        ui.OUT.innerHTML='<span class="geoIcon glyphicon glyphicon-minus-sign" title="上一级网格"></span>';
        ui.TEXT = L.DomUtil.create('div', className + ' geoSOT-TEXT',ui.bar);
        ui.TEXT.innerHTML='<span class="geoSOT-text" title="当前网格层级">'+this._map.getZoom()+'</span>';
        ui.IN = L.DomUtil.create('div', className + ' geoSOT-IN',ui.bar);
        ui.IN.innerHTML='<span class="geoIcon glyphicon glyphicon-plus-sign" title="下一级网格"></span>';
        L.DomEvent.disableClickPropagation(ui.bar);
        L.DomEvent.on(ui.HOME, 'mouseenter', this._mouseenter, ui.HOME);
        L.DomEvent.on(ui.HOME, 'mouseleave', this._mouseleave, ui.HOME);

        L.DomEvent.on(ui.OUT, 'mouseenter', this._mouseenter, ui.OUT);
        L.DomEvent.on(ui.OUT, 'mouseleave', this._mouseleave, ui.OUT);

        L.DomEvent.on(ui.IN, 'mouseenter', this._mouseenter, ui.IN);
        L.DomEvent.on(ui.IN, 'mouseleave', this._mouseleave, ui.IN);
        return ui;
    },
    _mouseenter:function(){
         this.className = this.className+' geoSOT-hover';
    },
    _mouseleave:function(){
        this.className = this.className.replace(/geoSOT-hover/,'');
    }
});
L.control.geoSOT = function (options) {
    return new L.geoSOT(options);
};

