// JavaScript Document
L.distribution = L.Control
		.extend({
			options : {
				position : 'topright'
			},
			onAdd : function(map) {
				var className = 'leaflet-control-distribution', container = this._container = L.DomUtil
						.create('div', className);

				var imgdiv = L.DomUtil.create('div', className + '-imgs',
						container);
				var slidediv = L.DomUtil.create('div', className + '-slide',
						container);
				var worddiv = L.DomUtil.create('div', className + '-word',
						container);

				var wordp = L.DomUtil.create('p', className + '-p', worddiv);
				wordp.innerHTML = "图层控制";

				var opacityimg = L.DomUtil.create('img', className + '-img',
						imgdiv);
				opacityimg.src = 'media/image/results.png';

				var distributionEmpty = L.DomUtil.create('div',
						'distributionEmpty', slidediv);
				distributionEmpty.innerHTML = '没有结果';

				L.DomEvent.disableClickPropagation(container);
				return container;
			},

			onUpdate : function(data) {
				$(".distributionEmpty").remove();
				$(".leaflet-control-distribution-slide").html("");

					
					
//					if (map.hasLayer(json.TB_COUNTYS)) {
//						map.removeLayer(json.TB_COUNTYS);
//					}
					if (map.hasLayer(drawnItems)) {
						drawnItems.clearLayers();
					}
//				for ( var key in data) {
//					var colorValue = (data[key]).features[0].properties.colorValue;//colorValue代号
//					var key1 = key.replace(/\./g, "0");
//					var key_replace = key1.replace(/\:/g, "0");
//					var distributionList = $("<div class='distributionList'></div>");
//					var distributionOpacity = $("<div class='distributionOpacity'></div>");
//					var distributionChoose = $("<div class='distributionChoose'></div>");
//					var distributionname = $("<p class='distributionname'>"
//							+ key.split(":")[3] + "</p>");
//					var distributionUncheck = $("<div class='distributionUncheck0"
//							+ key_replace + "'></div>");
//					var distributionChecked = $("<span class='distributionChecked'></span>");
//					var distribution = $("<div name='" + key_replace
//							+ "' class='distribution0" + key_replace
//							+ "'></div>");
//					$(".leaflet-control-distribution-slide").append(
//							distributionList);
//					distributionList.append(distributionChoose);
//					distributionList.append(distributionOpacity);
//					distributionChoose.append(distributionUncheck);
//					distributionChoose.append(distributionname);
//					distributionUncheck.append(distributionChecked);
//					distributionChecked.addClass('distributionShow');
//					distributionOpacity.append(distribution);
//
//					// -----------------------------
//					var table = key.split(":")[2];
//					
//					json[table] = L.geoJson(data[key], {
//						style : mapColorStyle,
//						onEachFeature : onEachFeature
//					}).addTo(map);
//					
//					
//					$(".distribution0" + key_replace).slider({
//						value : 60,
//						orientation : "horizontal",// 水平 垂直vertical,horizontal
//						range : "min",
//						animate : true
//					});// 设置初始化
//					// var json_key = new String(key_replace.substr(key_replace
//					// .lastIndexOf("_") + 1));
//
//					$(".distributionUncheck0" + key_replace)
//							.click(
//									// 点击
//									function() {
//										var newStr = $(this).attr("class")
//												.substr(
//														0,
//														$(this).attr("class")
//																.lastIndexOf(
//																		"0"));
//										var class_table = newStr.substr(newStr
//												.lastIndexOf("0") + 1);
//
//										if ($(this).children("span").hasClass(
//												"distributionShow")) {
//											$(this).children("span")
//													.removeClass(
//															"distributionShow");
//											map.removeLayer(json[class_table]);
//										} else {
//											$(this).children("span").addClass(
//													"distributionShow");
//											json[class_table].addTo(map);
//										}
//										;
//									});
//					$(".distribution0" + key_replace).slider(
//							// 滑动
//							{
//								stop : function(event, ui) {
//									var newStr = $(this).attr("class").substr(
//											0,
//											$(this).attr("class").lastIndexOf(
//													"0"));
//									var class_table = newStr.substr(newStr
//											.lastIndexOf("0") + 1);
//
//
//									var fillOpacity = $(this).slider("option",
//											"value") / 100;
//									json[class_table].setStyle(function style(
//											feature) {
//										return {
//											fillOpacity : fillOpacity,
//											opacity : fillOpacity
//										};
//									});
//								}
//							});
//				}

				if (layer > 0) {
					$(".leaflet-control-distribution-slide").show();
					$(".distributionEmpty").hide();
				} else {
					$(".distributionEmpty").show();
				}
			}
		});

L.Distribution = function(options) {
	return new L.distribution(options);
};
// ------------------------------------------------------------------------
