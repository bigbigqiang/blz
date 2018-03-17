/**
 * Created by rxl on 2015/11/17.
 */
L.PointInfo = L.Control.extend({
//    参数
    options: {
        position: 'bottomright'
    },

    onAdd: function (map) {
        var className='aero-point-info';
           this.container= L.DomUtil.create('div',className);
        L.DomEvent.on(map,'mousemove',this._update,this);
        return  this.container;
    },

    _update: function (e) {
        var over=false,
            lat = e.latlng.lat,
            lng = e.latlng.lng;
        if(lat>=90||lat<=-90||lng<=-180||lng>=180){
            over=true;
        }
        if(!over){this._updateContent(this._converse(lat),this._converse(lng));}
        else{

        }

    //    this._updateContent(lat,lng);
    },
    _updateContent:function(lat,lng){
        this.container.innerHTML = '纬度：'+lat+'经度'+lng;
    },

    _converse:function(num){
        var d=Math.floor(num),
            l1=(num-d)*60,
            f=Math.floor(l1),
            l2=(l1-f)*60,
            m=Math.floor(l2);
        return d+'°'+f+'′'+m+'″';
    }

});

L.pointInfo = function (options) {
    return new L.PointInfo(options);
};
