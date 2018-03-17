//alert("Ready.");
//Define class
//GeoPoint
function GeoPoint(longitude,latitude){
	this.longitude = longitude;
	this.latitude = latitude;
}
//GCode2D
function GCode2D(layer,lonCode,latCode){
	this.layer = layer;
	this.lonCode = lonCode;
	this.latCode = latCode;
}
//GCode1D
function GCode1D(layer,code){
	this.layer = layer;
	this.code = code;
}
//GCodeColRow
function GCodeColRow(layer,row,col){
	this.layer = layer;
	this.row = row;
	this.col = col;
}
//GCodePoint
function GCodePoint(layer,longitude,latitude){
	this.layer = layer;
	this.longitude = longitude;
	this.latitude = latitude;
}
//GeoRange;
function GeoRange(minLon,minLat,maxLon,maxLat){
	this.minLon = minLon;
	this.minLat = minLat;
	this.maxLon = maxLon;
	this.maxLat = maxLat;
}
//GCode2DArray
function GCode2DArray(){
	this.array = new Array();
}
//GCode1DArray
function GCode1DArray(){
	this.array = new Array();
}
//Object22DArray
function obj22DArray(object)
{
	var a1 = object["a1"];
	var result1 = new GCode2DArray();
	while(a1 != null){
		result1.array.push(new GCode2D(a1["a0"]["i0"],a1["a0"]["i1"],a1["a0"]["i2"]));
		a1 = a1["a1"];
	}
	return result1;
}

//G2DArray2Obj(gCode2DArray)
function G2DArray2Obj(gCode2DArray){
	var arr = gCode2DArray.array;
	var len = arr.length;
	
	var temp = {a0:{i0:arr[0].layer,i1:arr[0].lonCode,i2:arr[0].latCode},a1:null};
	for(var i = 1;i < len;i++){
		temp = {a0:{i0:arr[i].layer,i1:arr[i].lonCode,i2:arr[i].latCode},a1:temp};
	}
	var result = {a1:temp};
	return result;
}
//GeoPoint2Array
function points2Array(points,pointCount)
{
	var arr = new Array();
	for(i = 0;i < pointCount;i++){
		//arr[i].d1 = points[i].latitude;
		//arr[i].d0 = points[i].longitude;
		arr.push({"d0":points[i].longitude,"d1" : points[i].latitude});
	}
	return arr;
}
//array2points
function array2Points(arr,start,count){
	var r = new Array();
	for(var i = 0;i < count;i++){
		r.push(new GeoPoint(arr[i + start].d0,arr[i + start].d1));
	}
	return r;
}
function DoubleArray(){
	this.array = new Array();
}
//Object2DoubleArray
function obj2DoubleArray(object)
{
	var result = new DoubleArray();
	var value = object["a1"];
	while(value != null){
		result.array.push(value["d0"]);
		value = value["a1"];
	}
	return result;
}

function fp(points,pointCount,layer){
	//var aSlot=null;var nullArray=[null];var nullObj={d:nullArray,o:0};
	var q = pointCount;
	var o = {i1:q,a0:0,a2:0};
	var arr = [];
	for(var i = 0;i < q;i++){
		arr.push({d1:points[i].longitude,d0:points[i].latitude});
	}
	var f={a0:[null],a1:{d:nullArray,o:0},a2:{a0:{d:nullArray,o:0}}};
	o.a0 = {a0:arr,a1:{d:arr,o:q},a2:{a0:{d:arr,o:q}}};
	o.a2 = {i0:0,i1:0,i2:0};
	var F = [0];
	var l = layer;
	b7(o,l,f,F,0);
	var c = F[0];
	function toG2CArray(obj,count){
		var a0 = obj.a0;
		var codes = new GCode2DArray();
		for(var i = 0;i < count;i++){
			codes.array.push(new GCode2D(a0[i].i0,a0[i].i1,a0[i].i2));
		}
		return codes;
	}
	var r = toG2CArray(f,c);
	return r;
}

function G2DArray2ak(gCode2DArray){
	var arr = gCode2DArray.array;
	var len = arr.length;
	var last = arr[len - 1];
	var r = {i0:len,a1:0,a2:0,a3:0};//a1:head a2:last a3:list
	var a3 = {a0:{i0:last.layer,i1:last.lonCode,i2:last.latCode},a1:null};
	var t = 0;
	for(var i = len - 2;i >0;i--){
		t = arr[i];
		a3 = {a0:{i0:t.layer,i1:t.lonCode,i2:t.latCode},a1:a3};
	}
	var a1 = a3;
	var a2 = {a0:{i0:last.layer,i1:last.lonCode,i2:last.latCode},a1:null};
	r.a1 = a1;
	r.a2 = a2;
	r.a3 = a3;
	
	return r;
}

function aK2(K,M,O,I){
	var ps = array2Points(K,M,O);
	var obj = fp(ps,O,I);
	return G2DArray2ak(obj);
}

//getFatherOfGCode2D
function _f(c,l){
	var g = l;
	var u = {i0:c.i0 - g,i1:0,i2:0};
	u.i2=(c.i2>>(32-u.i0))<<(32-u.i0);
	u.i1=(c.i1>>(32-u.i0))<<(32-u.i0);
	return u;
}













