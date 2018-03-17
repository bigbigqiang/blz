/**
 * Created by Administrator on 2016/1/7.
 */
L.Control.LatlingControl=L.Control.extend({
    statics:{
      TITLE:'点击查看位置'
    },
    options:{
        position:'topleft'
    },
    initialize:function(options){
        L.Util.extend(this.options,options);
    },
    toggle:function(){
       if(this._onOff){
            L.DomUtil.addClass(this._container,'enabled');
            this._onOff=false;
            map.on('click',this.onMapClick);
       }
        else{
            L.DomUtil.removeClass(this._container,'enabled');
            this._onOff=true;
            map.closePopup();
            map.off('click',this.onMapClick);
           if(!map.hasLayer(this.marker)){
               map.removeLayer(this.marker);
           }
        }
    },
    onMapClick:function(e){
        this._dotIcon= L.icon({
                iconUrl:'media/image/latlng_dot.png',
                iconSize:[8,8],
                popupAnchor:[0,0]
            });
        var popup= L.popup()
            .setLatLng(e.latlng)
            .setContent('该点的经纬是：'+ e.latlng)
            .openOn(map);
        var latLng = e.latlng;
        if(map.hasLayer(this.marker)){
            map.removeLayer(this.marker);
            this.marker= L.marker([latLng.lat,latLng.lng],{icon:this._dotIcon}).addTo(map);
        }
        else{
            this.marker= L.marker([latLng.lat,latLng.lng],{icon:this._dotIcon}).addTo(map);
        }
    },
    onAdd:function(map){
        this._container= L.DomUtil.create('div','leaflet-control-latling');

        var linkbtn= L.DomUtil.create('a','leaflet-control-latling-linkbtn',this._container);
        linkbtn.href='#';
        linkbtn.title= L.Control.LatlingControl.TITLE;

        this._onOff=true;
        L.DomEvent.addListener(linkbtn,'click',L.DomEvent.stopPropagation)
                  .addListener(linkbtn,'click',L.DomEvent.preventDefault)
                  .addListener(linkbtn,'click',this.toggle,this);

        return this._container;
    }
});
L.Control.latlngControl=function(option){
    return new L.Control.LatlingControl(option);
};