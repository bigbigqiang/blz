// JavaScript Document
/*
*创建时间：2016.01.18
*创建人：刘石南
*功能：图层/图层组 透明度
*/
	L.ControlOpacity=L.Control.extend({
		options: {
			opg:'ccc',
			position: 'topright',
        	num:0
		},
		initialize: function (options){
			L.Util.setOptions(this, options);
		},
		onAdd: function (map) {
			var opg=this.options.opg;
			var className = 'leaflet-control-opacity',
				container = this._container = L.DomUtil.create('div', className);
		
			var imgdiv=L.DomUtil.create('div',className+'-imgs',container);	
			var slidediv=L.DomUtil.create('div',className+'-slide',container);	
			var worddiv=L.DomUtil.create('div',className+'-word',container);
			
			var wordp=L.DomUtil.create('p',className+'-p',worddiv);
			wordp.innerHTML="透明度";
			
			var opacityimg=L.DomUtil.create('img',className+'-img',imgdiv);
			opacityimg.src='media/image/opacity.png';
					  
			var master = '<div id="master"></div>';
            slidediv.innerHTML = master;
			
			var mastername = $(slidediv).find('#master');
			mastername.slider({
			  value: 60,
			  orientation: "horizontal",
			  range: "min",
			  animate: true
			});
			
			var dom=L.DomUtil.get(this.options.layer);
			mastername.slider({
			  stop: function( event, ui) {
				var slideOpacity = $("#master").slider( "option", "value" )/100;
				if(opg instanceof L.LayerGroup){
					opg.eachLayer(function (layer) {
						layer.setOpacity(slideOpacity);	
					});	
				}else{
					opg.setOpacity(slideOpacity);		
				};
			  }
			});
			L.DomEvent.on(imgdiv, 'click',function(){
				num++;
				if(num%2==1){
					$('.leaflet-control-opacity-img').attr('src','media/image/opacity2.png');
					$(slidediv).show();
				}else{
					$('.leaflet-control-opacity-img').attr('src','media/image/opacity.png');
					$(slidediv).hide();	
				}
			});

		    L.DomEvent.disableClickPropagation(container);
			return container;
		}
		});
	L.controlOpacity = function (options) {
		return new L.ControlOpacity(options);
	};

  