L.ControlScale = L.Control
		.extend({
			options : {
				position : 'topright'
			},
			onAdd : function(map) {
				var className = 'leaflet-control-scale', container = this._container = L.DomUtil
						.create('div', className);

				var imgdiv = L.DomUtil.create('div', className + '-imgs',
						container);
				/*var slidediv = L.DomUtil.create('div', className + '-slide',
						container);*/
				var worddiv = L.DomUtil.create('div', className + '-word',
						container);

				var wordp = L.DomUtil.create('p', className + '-p', worddiv);
				wordp.innerHTML = "层级";

				var opacityimg = L.DomUtil.create('img', className + '-img',
						imgdiv);
				opacityimg.src = '/image/scale.png';

				/*var subdiv = L.DomUtil.create('div', className + '-sub',
						slidediv);
				var sliderdiv = L.DomUtil.create('div', className + '-slider',
						slidediv);
				var adddiv = L.DomUtil.create('div', className + '-add',
						slidediv);*/

				/*var subimg = L.DomUtil
						.create('img', className + '-img', subdiv);
				var addimg = L.DomUtil
						.create('img', className + '-img', adddiv);*/
			/*	subimg.src = 'media/image/addsub.png';
				addimg.src = 'media/image/addsub.png';*/

				/*var slider = '<div id="slider-range-min"></div>';
				sliderdiv.innerHTML = slider;*/

				L.DomEvent.disableClickPropagation(container);
				return container;
			}
		});

L.Scale = function(options) {
	return new L.ControlScale(options);
};
/*------------------------------------------------------------------*/
/*var value_slider = $("#slider-range-min div").width();
var scalevalue = Math.round(value_slider / 5.3);*/
/*
$(document).ready(

		function(e) {

			var num = 0;
			$(".leaflet-control-scale-imgs").click(function() {
				num++;
				if (num % 2 == 1) {
					$(".leaflet-control-scale-slide").show();
				} else {
					$(".leaflet-control-scale-slide").hide();
				}
				;
			});

			$("#slider-range-min").slider({
				range : "min",
				value : 5,
				min : 1,
				max : 18,
				slide : function(event, ui) {
					$("#amount").val("$" + ui.value);
				}
			});
			$("#amount").val("$" + $("#slider-range-min").slider("value"));

			$("#slider-range-min").slider({
				stop : function(event, ui) {
					var value = $("#slider-range-min div").width();
					scalevalue = Math.round(value / 5.3);
				}
			});
			$(".leaflet-control-scale-sub").click(
					function() {
						var width = $("#slider-range-min div").width();
						if (width > 6) {
							$("#slider-range-min span").css("left",
									$("#slider-range-min div").width() - 5.3);
							$("#slider-range-min div").width(width - 5.3);
							scalevalue = Math.round(width / 5.3) - 1;
						}
						;

					});
			$(".leaflet-control-scale-add").click(
					function() {
						var width = $("#slider-range-min div").width();
						if (width < 91) {
							$("#slider-range-min div").width(width + 5.3);
							$("#slider-range-min span").css("left",
									$("#slider-range-min div").width() + 5.3);
							scalevalue = Math.round(width / 5.3) + 1;
						}
						;
					});
		});*/
