//create function by hand
function toGCode1DFromGCode2D(code){
	var layer = code.layer;
	var result = int2bigInt(0,64,0);
	for(var i = 0;i < layer;i++){
		var lon = code.lonCode;
		var lat = code.latCode;
		lat = lat << i >>> 31;
		lon = lon << i >>> 31;

		var lattBig = int2bigInt(lat,64,0);
		leftShift_(lattBig,63 - 2 * i);
		var lonnBig = int2bigInt(lon,64,0);
		leftShift_(lonnBig,62 - 2 * i);
		var temp = add(lattBig,lonnBig);
		result = add(result,temp);
	}
	var r = bigInt2str(result,10);
	return new GCode1D(layer,r);
}

function toGCode2DFromGCode1D(code){
	var layer = code.layer;
	var str = code.code;
	var codeBig = str2bigInt(str,10,64,0);
	rightShift_(codeBig,64 - 2 * layer);
	var lat = parseInt(0);
	var lon = parseInt(0);
	lat = lat >>> 0;
	lon = lon >>> 0;
	for(var i = 0;i < layer;i++){
		var codeBigCopy = dup(codeBig);
		rightShift_(codeBigCopy,1);
		leftShift_(codeBigCopy,1);
		var dLBig = sub(codeBig,codeBigCopy);
		rightShift_(codeBig,1);

		codeBigCopy = dup(codeBig);
		rightShift_(codeBigCopy,1);
		leftShift_(codeBigCopy,1);
		var dBBig = sub(codeBig,codeBigCopy);
		rightShift_(codeBig,1);

		var dBBigStr = bigInt2str(dBBig,10);
		var dB = parseInt(dBBigStr);
		dB = dB >>> 0;

		var dLBigStr = bigInt2str(dLBig,10);
		var dL = parseInt(dLBigStr);
		dL = dL >>> 0;

		dB = dB << (32 - layer + i);
		dL = dL << (32 - layer + i);
		lat = dB | lat;
		lon = dL | lon;
	}
	return new GCode2D(layer,lon,lat);
}

function toGCode1DArrayFromGCode2DArray(array){
	var arr = array.array;
	var len = arr.length;
	var r = new GCode1DArray();
	for(var i = 0;i < len;i++){
		var code2 = arr[i];
		var code1 = toGCode1DFromGCode2D(code2);
		r.array.push(code1);
	}
	return r;
}

function toGCode2DArrayFromGCode1DArray(array){
	var arr = array.array;
	var len = arr.length;
	var r = new GCode2DArray();
	for(var i = 0;i < len;i++){
		var code1 = arr[i];
		var code2 = toGCode2DFromGCode1D(code1);
		r.array.push(code2);
	}
	return r;
}

function getGCode2DOfPoint(longitude,latitude,layer){
	var e = {i0:0,i1:0,i2:0};
	var n = {i0:0,d1:0,d2:0};
	n.i0 = layer;
	n.d1 = longitude;
	n.d2 = latitude;
	var a = N(e,n);
	return new GCode2D(a.i0,a.i1,a.i2);
}

function getGCode1DOfPoint(longitude,latitude,layer){
	var code = getGCode2DOfPoint(longitude,latitude,layer);
	return toGCode1DFromGCode2D(code);
}

function getGCode2DOfLine(p1,p2,layer){
	var aj = {d0:0,d1:0};
	var ah = {d0:0,d1:0};
	
	aj.d0 = p1.longitude;
	aj.d1 = p1.latitude;
	
	ah.d0 = p2.longitude;
	ah.d1 = p2.latitude;
	var result0 = bk(aj,ah,layer);
	return obj22DArray(result0);
}

function getGCode1DOfLine(p1,p2,layer){
	var r = getGCode2DOfLine(p1,p2,layer);
	return toGCode1DArrayFromGCode2DArray(r);
}

function getGCode2DOfPolyline(points,pointCount,layer){
	var arr = points2Array(points,pointCount);
	var result = bR(arr,0,pointCount,layer);
	return obj22DArray(result);
}

function getGCode1DOfPolyline(points,pointCount,layer){
	var r = getGCode2DOfPolyline(points,pointCount,layer);
	return toGCode1DArrayFromGCode2DArray(r);
}


function getGCode2DOfRectangle(leftTopLon,leftTopLat,rightBottomLon,rightBottomLat,layer){
	var result = ba(leftTopLon,leftTopLat,rightBottomLon,rightBottomLat,layer);
	return obj22DArray(result);
}

function getGCode1DOfRectangle(leftTopLon,leftTopLat,rightBottomLon,rightBottomLat,layer){
	var r = getGCode2DOfRectangle(leftTopLon,leftTopLat,rightBottomLon,rightBottomLat,layer);
	return toGCode1DArrayFromGCode2DArray(r);
}

function getGCode2DOfPolygon(points,pointCount,layer){
	return fp(points,pointCount,layer);
}

function getGCode1DOfPolygon(points,pointCount,layer){
	var r = getGCode2DOfPolygon(points,pointCount,layer);
	return toGCode1DArrayFromGCode2DArray(r);
}

function getAllLines(minValue,maxValue,layer){
	var result = bi(minValue,maxValue,layer);
	return obj2DoubleArray(result);
}

function getAdaptiveLayerByDelta(delta){
	var layer = 0;
	var gridsize = 0.0;
	var i = 0;
	delta = Math.abs(delta);
	if(delta > 320.0){
		layer = 4;
	}else if(delta > 160.0){
		layer = 5;
	}else if(delta > 80.0){
		layer = 6;
	}else if(delta > 40.0){
		layer = 7;
	}else if(delta > 20.0){
		layer = 8;
	}else if(delta > 10.0){
		layer = 9;
	}else{
		layer = 10;
		for(i = 10;i < 33;i++,layer++){
			if(i < 16){
				gridsize = a4[i] / 60.0;
			}else{
				gridsize = a4[i] / 3600.0;
			}
			if(delta > gridsize * 9)
				break;
		}
	}
	layer = layer > 32 ? 32 : layer;
	return layer;
}

function getAdaptiveAllLines(minValue,maxValue){
	var result = bi(minValue,maxValue,getAdaptiveLayerByDelta(maxValue - minValue));
	return obj2DoubleArray(result);
}

function getRealAreaCountOfSonCodeOfGCode2D(code){
	var r = {"i0":code.layer,"i1":code.lonCode,"i2":code.latCode};
	return a_(r);
}

function getRealAreaCountOfSonCodeOfGCode1D(code){
	var code2 = toGCode2DFromGCode1D(code);
	return getRealAreaCountOfSonCodeOfGCode2D(code2);
}


function displaceGCode2D(code,dispOfLon,dispOfLat){
	var b = {i0:code.layer,i1:code.latCode,i2:code.lonCode};
	var e = {i0:0,i1:0,i2:0};
	var result = an(e,b,dispOfLon,dispOfLat);
	return new GCode2D(result.i0,result.i2,result.i1);
}

function displaceGCode1D(code,dispOfLon,dispOfLat){
	var code2 = toGCode2DFromGCode1D(code);
	var r = displaceGCode2D(code,dispOfLon,dispOfLat);
	return toGCode1DFromGCode2D(r);
}

function getOnlyOneGCode2D(minLon,maxLon,minLat,maxLat){
	var h = {i0:0,i1:0,i2:0};
	aQ(h,minLon,maxLon,minLat,maxLat);
	return new GCode2D(h.i0,h.i1,h.i2);
}

function getOnlyOneGCode1D(minLon,maxLon,minLat,maxLat){
	var r = getOnlyOneGCode2D(minLon,maxLon,minLat,maxLat);
	return toGCode1DFromGCode2D(r);
}

function getGeographicRange(points,pointCount){
	var dBm = points[0].latitude;
	var dB = points[0].latitude;
	var dLm = points[0].longitude;
	var dL = points[0].longitude;
	for (var i = 1; i < pointCount; i++)
	{
		var lat = points[i].latitude;
		var lon = points[i].longitude;
		dBm = Math.max(lat,dBm);
		dB = Math.min(lat,dB);
		dL = Math.min(lon,dL);
		dLm = Math.max(lon,dLm);
	}
	return new GeoRange(dL,dB,dLm,dBm);
}

function getOnlyOneGCode2DV2(points,pointCount){
	var gr = getGeographicRange(points,pointCount);
	return getOnlyOneGCode2D(gr.minLon,gr.maxLon,gr.minLat,gr.maxLat);
}

function getOnlyOneGCode1DV2(points,pointCount){
	var r = getOnlyOneGCode2DV2(points,pointCount);
	return toGCode1DFromGCode2D(r);
}

function getUniqueGCode2D(gCode2DArray){
	var o = G2DArray2Obj(gCode2DArray);
	var r = aX(o);
	return obj22DArray(r);
}

function getUniqueGCode1D(gCode1DArray){
	var array2 = toGCode2DArrayFromGCode1DArray(gCode1DArray);
	var r = getUniqueGCode2D(array2);
	return toGCode1DArrayFromGCode2DArray(r);
}

function toGeoRangeFromGCode2D(code){
	var a = {i0:code.layer,i1:code.lonCode,i2:code.latCode};
	var b = {d0:0,d1:0,d2:0,d3:0};
	var r = ad(b,a);
	return new GeoRange(r.d0,r.d1,r.d2,r.d3);
}

function toGeoRangeFromGCode1D(code){
	var code2 = toGCode2DFromGCode1D(code);
	return toGeoRangeFromGCode2D(code2);
}

function get4NeighborOfGCode2D(code){
	var f = {i0:code.layer,i1:code.lonCode,i2:code.latCode};
	var g = bC(f);
	return  obj22DArray(g);
}

function get4NeighborOfGCode1D(code){
	var code2 = toGCode2DFromGCode1D(code);
	var r = get4NeighborOfGCode2D(code2);
	return toGCode1DArrayFromGCode2DArray(r);
}

function get8NeighborOfGCode2D(code){
	var k = {i0:code.layer,i1:code.lonCode,i2:code.latCode};
	var l = bG(k);
	return obj22DArray(l);
}

function get8NeighborOfGCode1D(code){
	var code2 = toGCode2DFromGCode1D(code);
	var r = get8NeighborOfGCode2D(code2);
	return toGCode1DArrayFromGCode2DArray(r);
}

function getSonOfGCode2D(code,generation){
	var i = {i0:code.layer,i1:code.lonCode,i2:code.latCode};
	var j = bj(i,generation);
	return obj22DArray(j);
}

function getSonOfGCode1D(code,generation){
	var code2 = toGCode2DFromGCode1D(code);
	var r = getSonOfGCode2D(code2,generation);
	return toGCode1DArrayFromGCode2DArray(r);
}

function getAreaOfGCode2D(code){
	var r = {i0:code.layer,i1:code.lonCode,i2:code.latCode};
	var t = bM(r);
	return t;
}

function getAreaOfGCode1D(code){
	var code2 = toGCode2DFromGCode1D(code);
	return getAreaOfGCode2D(code2);
}

function getFatherOfGCode2D(code,generation){
	var i = {i0:code.layer,i1:code.lonCode,i2:code.latCode};
	var g = generation;
	var r = _f(i,g);
	return new GCode2D(r.i0,r.i1,r.i2);
}

function getFatherOfGCode1D(code,generation){
	var code2 = toGCode2DFromGCode1D(code);
	var r = getFatherOfGCode2D(code2,generation);
	return toGCode1DFromGCode2D(r);
}













