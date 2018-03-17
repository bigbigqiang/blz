/**
 * Created by guan on 2016/3/8.
 */
L.Control.MeasureControl = L.Control.extend({
    options: {
        position: "topright"
    },
    initialize: function (options) {
        L.Util.extend(this.options, options);
    },
    onAdd: function (map) {
        this._map = map;
        var className = 'leaflet-control-measure';
        this._container = L.DomUtil.create('div', className);
        //创建测量显示图片的div
        var imgDiv = L.DomUtil.create('div', className + '-img', this._container);
        this._imgI = L.DomUtil.create('i', className + '-i', imgDiv);
        this._imgDiv = imgDiv;
        //创建测点位置的div
        var latlngDiv = L.DomUtil.create('div', 'measure-latlng', this._container);
        var latlngA = L.DomUtil.create('a', 'latlng-btn', latlngDiv);
        latlngA.title = "点击查看位置";
        latlngA.href = "#";
        this._latlngDiv = latlngDiv;
        //创建测距离的div
        var distanceDiv = L.DomUtil.create('div', 'measure-distance', this._container);
        var distanceA = L.DomUtil.create('a', 'distance-btn', distanceDiv);
        distanceA.title = "点击测量距离";
        distanceA.href = "#";
        this._distanceDiv = distanceDiv;
        //创建hover时的提示语
        var worddiv = L.DomUtil.create('div', 'measure-word', this._container);
        var wordp = L.DomUtil.create('p', 'measure-p', worddiv);
        wordp.innerHTML = "测量";

        this._onOff0 = false;  //控制总的开关
        this._onOff1 = false;  //控制测点的开关
        this._onOff2 = false;  //控制测距离的开关
        //单击测距离和测点显示或隐藏,双击禁止地图缩放
        L.DomEvent.addListener(this._imgDiv, 'click', this.toggleShow, this)
            .addListener(this._imgDiv, 'dblclick', this.noZoom, this)
            .addListener(this._imgDiv, 'lclick', L.DomEvent.stop, this);
        //点击测量经纬点控件
        L.DomEvent.addListener(this._latlngDiv, 'click', this.isLatlng, this)
            .addListener(this._latlngDiv, 'dblclick', this.noZoom, this)
            .addListener(this._latlngDiv, 'click', L.DomEvent.stop);
        //点击测量距离控件
        L.DomEvent.addListener(this._distanceDiv, 'click', this.isDistance, this)
            .addListener(this._distanceDiv, 'dblclick', this.noZoom, this)
            .addListener(this._distanceDiv, 'click', L.DomEvent.stop);
        return this._container;
    },
    toggleShow: function () { //测距离和测点显示或隐藏
        //查找Dom节点
        this._measureLatlng = document.getElementsByClassName("measure-latlng")[0];
        this._measureDistance = document.getElementsByClassName("measure-distance")[0];
        this._latlngBtn = this._latlngDiv.getElementsByTagName('a')[0];
        this._distanceBtn = this._distanceDiv.getElementsByTagName('a')[0];
        this._leafletContainer = L.DomUtil.get("map");
        //circle marker的样式
        this._dotOptions = {
            className: "measure-latlng-marker",
            radius: 4,
            fillColor: '#fff',
            color: 'red',
            weight: 2,
            opacity: 1
        };
        if (this._onOff0) {
            if (this._onOff1) {
                this._onOff1 = false;
                this.stopMeasureLatlng();
                L.DomUtil.removeClass(this._latlngBtn, 'enable_measure');
            }
            else {
                if (this._onOff2) {
                    this.stopMeasureDistance();
                    this._onOff2 = false;
                    L.DomUtil.removeClass(this._distanceBtn, 'enable_measure');
                }
            }
            this.hideControl();
            this._imgI.style.background="url('/image/ruler.png')";
        }
        else {
            this.showControl();
            this._imgI.style.background="url('/image/ruler2.png')";
        }
    },
    noZoom: function () { //禁止双击地图缩放
        this._map.doubleClickZoom.disable();
    },
    showControl: function () { //显示控件
        this._measureLatlng.style.display = "block";   //测点显示
        this._measureDistance.style.display = "block"; //测距离显示
        this._onOff0 = true;
    },
    hideControl: function () { //隐藏控件
        this._measureLatlng.style.display = "none";  //测点隐藏
        this._measureDistance.style.display = "none"; //测距离隐藏
        this._onOff0 = false;
    },
    isLatlng: function () {  //判断是否点击了测经纬点的控件
        if (this._onOff1) {
            this.stopMeasureLatlng();
            this._onOff1 = false;
            L.DomUtil.removeClass(this._latlngBtn, 'enable_measure');
        }
        else {
            this._onOff1 = true;
            L.DomUtil.addClass(this._latlngBtn, 'enable_measure');  //给测点控件添加enable标志
            if (this._onOff2) {
                this.stopMeasureDistance();
                this._onOff2 = false;
                L.DomUtil.removeClass(this._distanceBtn, 'enable_measure');
            }
            this.startMeasureLatlng();
        }
    },
    isDistance: function () {   //判断是否点击了测距离的控件
        if (this._onOff2) {
            this._onOff2 = false;
            this.stopMeasureDistance();
            L.DomUtil.removeClass(this._distanceBtn, 'enable_measure');
        }
        else {
            this._onOff2 = true;
            L.DomUtil.addClass(this._distanceBtn, 'enable_measure');  //给测距离控件添加enable标志
            if (this._onOff1) {
                this.stopMeasureLatlng();
                this._onOff1 = false;
                L.DomUtil.removeClass(this._latlngBtn, 'enable_measure');
            }
            this.startMeasureDistance();
        }
    },
    startMeasureLatlng: function () { //开始测量经纬点
        this._map.on('click', this.onMapClick, this);        //给地图绑定点击事件
        this._leafletContainer.style.cursor = 'pointer';    //改变鼠标样式
    },
    onMapClick: function (e) {   //点击地图，添加marker和弹窗
        var popup = L.popup({
            className: "measure-latlng-popup"
        })     //添加弹窗
            .setLatLng(e.latlng)
            .setContent('该点的经纬是：' + e.latlng)
            .openOn(this._map);
        if (this._map.hasLayer(this._marker)) { //删除前一个marker,添加最新的marker
            this._map.removeLayer(this._marker);
            this._marker = L.circleMarker(e.latlng, this._dotOptions).addTo(this._map);
        }
        else {                                  //往地图上添加marker
            this._marker = L.circleMarker(e.latlng, this._dotOptions).addTo(this._map);
        }
    },
    stopMeasureLatlng: function () {  //停止测量经纬点
        this._map.off('click', this.onMapClick, this);       //解除地图点击事件
        this._leafletContainer.style.cursor = '-webkit-grab';
        this._map.closePopup();                              //关闭弹窗
        if (this._map.hasLayer(this._marker)) {              //删除地图上留下的marker
            this._map.removeLayer(this._marker);
        }
    },
    startMeasureDistance: function () {   //开始测量距离
        this._markerLineLayers = new L.LayerGroup();    //用来放Marker,line,还有提示的divmarker
        this._dynamicLineLayers = new L.LayerGroup();   //用来放动态变化的line
        this._line;
        this._A = [];  //用来放经纬点
        this._k = 0;
        this._pointMarker = [];  //用来放circlemarker
        this._distance = 0;
        this._dynamicDistance=0;
        this._beforeEndDistance=0;
        this._dynamicIconDistance=0;
        this._dynamicFinalDistance=0;
        this._dynamicLayer=new L.LayerGroup();
        this._leafletContainer.style.cursor = 'pointer';    //改变鼠标样式
        this._map.addLayer(this._markerLineLayers);
        this._map.addLayer(this._dynamicLineLayers);
        this._map.addLayer(this._dynamicLayer);
        this._map.on('click', this.startShape, this);
        this._map.on('mousemove', this.dynamicLine, this);
        this._map.on('dblclick', this.endShape, this);
        this.noZoom();
    },
    startShape: function (e) {  //开始在地图上添加形状
        this._A[this._k] = e.latlng;

        if (this._k == 0) {    //添加起点和起点提示
            this._markerLineLayers.clearLayers();
            this._pointMarker[this._k] = L.circleMarker(e.latlng, this._dotOptions).addTo(this._markerLineLayers);
            this._markerLineLayers.addLayer(this._pointMarker[this._k]);
            this._startTip = L.divIcon({
                className: "divTip",
                iconSize: [33, 16],
                iconAnchor: [-10, 5],
                html: "<span>起点</span>"
            });
            var startMarker = L.marker(e.latlng, {icon: this._startTip}).addTo(this._markerLineLayers);
        }
        else {
            this._beforeEndDistance += (this._A[this._k].distanceTo(this._A[this._k - 1])) / 1000;  //测当前点与前一个之间的距离（单位:千米）

            this._pointMarker[this._k] = L.circleMarker(e.latlng, this._dotOptions).addTo(this._markerLineLayers);  //在当前点创建circlemarker,并添加到markerLine图层组中
            L.polyline([this._A[this._k - 1], this._A[this._k]], {       //在当前点和前一个点之间创建polyline,并添加到markerLine图层组中
                color: '#ff6319',
                weight: 3,
                opacity: 0.8
            }).addTo(this._markerLineLayers);
            this._distanceTip = L.divIcon({
                className: "divTip",
                iconSize: [80, 17],
                iconAnchor: [-10, 5],
                html: "<span>" + this._dynamicFinalDistance + "</span>"
            });
            this._tipMarker = L.marker(e.latlng, {icon: this._distanceTip})//创建测量距离是多少的提示框marker,并添加到markerLine图层组中
                .addTo(this._markerLineLayers);

        }
        this._k++;
    },
    endShape: function (e) {     //结束绘制形状
        this._k = 0;
        this._distance = 0;
        this._dynamicLineLayers.clearLayers();
        this._dynamicLayer.clearLayers();

        this._endTip = L.divIcon({
            className: "endTip",
            iconSize: [120, 16],
            iconAnchor: [-10, 5],
            html: "<span>总共：" + this._dynamicFinalDistance + "</span>"
        });
        //this._dynamicFinalDistance=0;
        this._beforeEndDistance=0;
        var endMarker = L.marker(e.latlng, {icon: this._endTip}).addTo(this._markerLineLayers);
    },
    dynamicLine: function (e) {   //在地图上移动时，添加动态变化的line
        this._A[this._k] = e.latlng;

        //创建动态提示的icon
        var dynamicIcon = L.divIcon({
            className: "dynamicTip",
            iconSize: [120, 60],
            iconAnchor: [-20, 5],
            html: "<span>总长："+this._dynamicFinalDistance+"</span></br >" + "单击确定起点，双击结束"
        });
        this._dynamicTipMarker = L.marker(e.latlng,{
            icon: dynamicIcon
        });
        if (this._k > 0) {
            this._dynamicLineLayers.clearLayers();
            this._line = L.polyline([this._A[this._k - 1], this._A[this._k]], {   //创建活动的线，并添加到动态层中
                color: '#ff6319',
                weight: 3,
                opacity: 0.8
            }).addTo(this._dynamicLineLayers);


            this._dynamicLayer.clearLayers();
            this._dynamicDistance = (this._A[this._k].distanceTo(this._A[this._k - 1])) / 1000;  //测当前点与前一个之间的距离（单位:千米）

            this._dynamicIconDistance=parseFloat(this._dynamicDistance+this._beforeEndDistance);
            if (this._dynamicIconDistance < 1) {                                           //如果距离小于1千米，单位为米
                this._dynamicFinalDistance = Math.round(this._dynamicIconDistance * 1000) + "米";
            }
            else {
                this._dynamicFinalDistance = this._dynamicIconDistance.toFixed(2) + "千米";        //最终测量距离取小数点后两位
            }
            this._dynamicTipMarker.setLatLng(this._A[this._k]).addTo(this._dynamicLayer);
        }
    },
    stopMeasureDistance: function () {
        this._markerLineLayers.clearLayers();
        this._dynamicLineLayers.clearLayers();
        this._dynamicLayer.clearLayers();
        //this._dynamicFinalDistance =0;
        this._map.off("click", this.startShape, this);
        this._map.off("mousemove", this.dynamicLine, this);
        this._map.off("dblclick", this.endShape, this);
    }
});
L.Control.measureControl = function (option) {
    return new L.Control.MeasureControl(option);
};