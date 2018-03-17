/**
 * Created by rxl on 2015/11/17.
 */
L.AeroScale = L.Control.extend({
//    参数
    options: {
        position: 'bottomright',
        maxWidth: 100,//比例尺的像素宽度
        metric: true,
        updateWhenIdle: false
    },

    onAdd: function (map) {
        this._map = map;

        var className = 'aero-control-scale',
            container = L.DomUtil.create('div', className),//创建容器
            options = this.options;//传递参数

        this._addScales(options, className, container);//创建div

        map.on(options.updateWhenIdle ? 'moveend' : 'move', this._update, this);//

        map.whenReady(this._update, this);//当地图初始化时调用这个函数，可传递该函数的上下文

        return container;
    },

    onRemove: function (map) {
        map.off(this.options.updateWhenIdle ? 'moveend' : 'move', this._update, this);
    },

    //创建比例尺容器
    _addScales: function (options, className, container) {
        if (options.metric) {
            this._mScale = L.DomUtil.create('div', className + '-line', container);
        }
    },

    _update: function () {
        var bounds = this._map.getBounds(),//获取视图边界
            centerLat = bounds.getCenter().lat,//获取视图中心纬度
            halfWorldMeters = 6378137 * Math.PI * Math.cos(centerLat * Math.PI / 180),
			//容器内区域的实际地理距离（宽度）
            dist = halfWorldMeters * (bounds.getNorthEast().lng - bounds.getSouthWest().lng) / 180,
            size = this._map.getSize(),//返回当前map容器的大小(px大小)
            options = this.options,//参数传递
            maxMeters = 0;//最大？？

        if (size.x > 0) {
            maxMeters = dist * (options.maxWidth / size.x);
        }

        this._updateScales(options, maxMeters);
    },
    
    _updateScales: function (options, maxMeters) {
        if (options.metric && maxMeters) {
            this._updateMetric(maxMeters);
        }

        if (options.imperial && maxMeters) {
            this._updateImperial(maxMeters);
        }
    },

//十进制比例尺
    _updateMetric: function (maxMeters) {
         meters = this._getRoundNum(maxMeters);
      
        this._mScale.style.width = this._getScaleWidth(meters / maxMeters) + 'px';
        this._mScale.innerHTML = meters < 1000 ? '<span>'+meters + ' 米'+'</span>' : '<span>'+(meters / 1000) + ' 千米'+'</span>';
    },
  
  
/*公制比例尺*/
    _getScaleWidth: function (ratio) {
        return Math.round(this.options.maxWidth * ratio) - 10;
    },

    _getRoundNum: function (num) {
        var pow10 = Math.pow(10, (Math.floor(num) + '').length - 1),
            d = num / pow10;

        d = d >= 10 ? 10 : d >= 5 ? 5 : d >= 3 ? 3 : d >= 2 ? 2 : 1;

        return pow10 * d;
    }
});

L.aeroScale = function (options) {
    return new L.AeroScale(options);
};
