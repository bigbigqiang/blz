// JavaScript Document
L.Control.Layers = L.Control.extend({
    options: {
        collapsed: true,
        position: 'topright',
        autoZIndex: true,
        hideSingleBase: false
    },

    initialize: function (baseLayers, overlays, options) {
        //交通图
        var trafficUrl = 'http://192.168.0.199:9999/mapbox-studio-streets-basic/{z}/{x}/{y}' + (L.Browser.retina ? '@2x' : '') + '.png';
        //地势图
        var terrainUrl = 'http://a.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiamVzc2llYW5kbWUiLCJhIjoiY2lqMHVybDlyMDAzdnVobTVxd2xhcWp1aiJ9.GkCNZy2xktXWCo2UC5O4_w';
        // 影像图
        var imageUrl = 'http://a.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiamVzc2llYW5kbWUiLCJhIjoiY2lqMHVybDlyMDAzdnVobTVxd2xhcWp1aiJ9.GkCNZy2xktXWCo2UC5O4_w';

        var traffic = L.tileLayer(trafficUrl),
            terrain = L.tileLayer(terrainUrl, {id: 'mapbox.mapbox-terrain-v2'}),
            image = L.tileLayer(imageUrl, {id: 'mapbox.satellite'});
        //添加图层
        baseLayers = {
            "交通图": traffic,
            "影像图": image,
            "地势图": terrain
        };
        //覆盖物
        overlays = {};
        L.setOptions(this, options);
        this._layers = {};
        this._lastZIndex = 0;
        this._handlingClick = false;
        for (var i in baseLayers) {
            this._addLayer(baseLayers[i], i);
        }

        for (i in overlays) {
            this._addLayer(overlays[i], i, true);
        }
    },

    onAdd: function (map) {
        this._initLayout();
        this._update();

        this._map = map;
        map.on('zoomend', this._checkDisabledLayers, this);

        return this._container;
    },

    onRemove: function () {
        this._map.off('zoomend', this._checkDisabledLayers, this);
    },

    addBaseLayer: function (layer, name) {
        this._addLayer(layer, name);
        return this._update();
    },

    addOverlay: function (layer, name) {
        this._addLayer(layer, name, true);
        return this._update();
    },

    removeLayer: function (layer) {
        layer.off('add remove', this._onLayerChange, this);

        delete this._layers[L.stamp(layer)];
        return this._update();
    },

    _initLayout: function () {
        var className = 'leaflet-control-layers',
            container = this._container = L.DomUtil.create('div', className);

        // makes this work on IE touch devices by stopping it from firing a mouseout event when the touch is released
        container.setAttribute('aria-haspopup', true);

        L.DomEvent.disableClickPropagation(container);
        if (!L.Browser.touch) {
            L.DomEvent.disableScrollPropagation(container);
        }

        var form = this._form = L.DomUtil.create('form', className + '-list');

        this._baseLayersList = L.DomUtil.create('div', className + '-base', form);
        this._separator = L.DomUtil.create('div', className + '-separator', form);//划分线
        this._overlayersList = L.DomUtil.create('div', className + '-overlays', form);
        container.appendChild(form);

    },

    _addLayer: function (layer, name, overlay) {
        layer.on('add remove', this._onLayerChange, this);

        var id = L.stamp(layer);

        this._layers[id] = {
            layer: layer,
            name: name,
            overlay: overlay
        };

        if (this.options.autoZIndex && layer.setZIndex) {
            this._lastZIndex++;
            layer.setZIndex(this._lastZIndex);
        }
    },

    _update: function () {
        if (!this._container) {
            return this;
        }

        this._baseLayersList.innerHTML = '';
        this._overlayersList.innerHTML = '';

        var baseLayersPresent, overlaysPresent, i, obj, baseLayersCount = 0;

        for (i in this._layers) {
            obj = this._layers[i];
            this._addItem(obj);
            overlayersPresent = overlaysPresent || obj.overlay;
            baseLayersPresent = baseLayersPresent || !obj.overlay;
            baseLayersCount += !obj.overlay ? 1 : 0;
        }

        // Hide base layers section if there's only one layer.
        if (this.options.hideSingleBase) {
            baseLayersPresent = baseLayersPresent && baseLayersCount > 1;
            this._baseLayersList.style.display = baseLayersPresent ? '' : 'none';
        }

        this._separator.style.display = overlaysPresent && baseLayersPresent ? '' : 'none';
//查找dom节点
        this._labels = this._form.getElementsByTagName('label');
        this._labels[0].style.display='block';

        var labelLen=this._labels.length;
        for(var i=0;i<labelLen;i++){
            this._labels[i].childNodes[0].childNodes[1].style.backgroundPositionX=-i * 66+'px';
            this._labels[i].childNodes[0].childNodes[1].style.backgroundPositionY=0;

            //给label添加点击事件
            var that=this;
            L.DomEvent.on(this._labels[i], 'click',function(){
                that._baseLayersList.insertBefore(this,that._baseLayersList.childNodes[0]);
                for(var i=1;i<that._labels.length;i++){
                    that._labels[i].style.display='none';
                }
            });
        }
//给base添加hover事件
        L.DomEvent.on(this._baseLayersList, 'mouseover', this._onBaselMouseover, this);
        L.DomEvent.on(this._baseLayersList, 'mouseout', this._onBaseMouseout, this);

        return this;
    },

    _onLayerChange: function (e) {
        if (!this._handlingClick) {
            this._update();
        }

        var obj = this._layers[L.stamp(e.target)];

        var type = obj.overlay ?
            (e.type === 'add' ? 'overlayadd' : 'overlayremove') :
            (e.type === 'add' ? 'baselayerchange' : null);

        if (type) {
            this._map.fire(type, obj);
        }
    },

    // IE7 bugs out if you create a radio dynamically, so you have to do it this hacky way (see http://bit.ly/PqYLBe)
    _createRadioElement: function (name, checked) {
        var radioHtml = '<input type="radio"  class="leaflet-change-layers-selector" name=" "' + (checked ? ' checked="checked"' : '') + '/>';

        var radioFragment = document.createElement('div');
        radioFragment.innerHTML = radioHtml;

        return radioFragment.firstChild;
    },

    _addItem: function (obj) {
        var label = document.createElement('label'),
            checked = this._map.hasLayer(obj.layer),
            input;
        if (obj.overlay) {
            input = document.createElement('input');
            input.type = 'checkbox';
            input.className = 'leaflet-control-layers-selector';
            input.defaultChecked = checked;
        } else {
            input = this._createRadioElement('leaflet-base-layers', checked);
        }

        input.layerId = L.stamp(obj.layer);

        L.DomEvent.on(input, 'click', this._onInputClick, this);

        var name = document.createElement('p');
        name.innerHTML = ' ' + obj.name;

        var img = document.createElement('div');
        //img.className = 'leaflet-control-layers-img';
        // Helps from preventing layer control flicker when checkboxes are disabled
        // https://github.com/Leaflet/Leaflet/issues/2771
        var holder = document.createElement('div');

        label.appendChild(holder);
        holder.appendChild(input);
        holder.appendChild(img);
        holder.appendChild(name);

        var container = obj.overlay ? this._overlaysList : this._baseLayersList;
        container.appendChild(label);
        this._checkDisabledLayers();
        //return label;
    },
    _onBaselMouseover:function(){
        for(var i=0;i<this._labels.length;i++){
            this._labels[i].style.display='block';
        }
    },

    _onBaseMouseout:function(){
        for(var i=0;i<this._labels.length;i++){
            this._labels[i].style.display='none';
        }
        this._labels[0].style.display='block';
    },
    _onInputClick: function () {
        var inputs = this._form.getElementsByTagName('input'),
            input, layer, hasLayer;
        var addedLayers = [],
            removedLayers = [];

        this._handlingClick = true;

        for (var i = inputs.length - 1; i >= 0; i--) {
            input = inputs[i];
            layer = this._layers[input.layerId].layer;
            hasLayer = this._map.hasLayer(layer);

            if (input.checked && !hasLayer) {
                addedLayers.push(layer);

            } else if (!input.checked && hasLayer) {
                removedLayers.push(layer);
            }
        }

        // Bugfix issue 2318: Should remove all old layers before readding new ones
        for (i = 0; i < removedLayers.length; i++) {
            this._map.removeLayer(removedLayers[i]);
        }
        for (i = 0; i < addedLayers.length; i++) {
            this._map.addLayer(addedLayers[i]);
        }

        this._handlingClick = false;

        this._refocusOnMap();
    },
    _checkDisabledLayers: function () {
        var inputs = this._form.getElementsByTagName('input'),
            input,
            layer,
            zoom = this._map.getZoom();

        for (var i = inputs.length - 1; i >= 0; i--) {
            input = inputs[i];
            layer = this._layers[input.layerId].layer;
            input.disabled = (layer.options.minZoom !== undefined && zoom < layer.options.minZoom) ||
                (layer.options.maxZoom !== undefined && zoom > layer.options.maxZoom);

        }
    }

});

L.control.layers = function (baseLayers, overlays, options) {
    return new L.Control.Layers(baseLayers, overlays, options);
};
