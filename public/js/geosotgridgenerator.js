/**
 * @brief GeoSOT剖分网格生成器
 * @author yuliuchuan
 * @version 1.5
 * @date 2015.12.25
 */
 
/// 图像层级与像素网格大小的关系
/// 1-9级单位是°
/// 10-15级单位是′
/// 16-32单位是″
var LAYERANDGRIDSIZE = new Array(
	512,//.
	256,
	128,
	64,
	32,
	16,//5
	8,
	4,
	2,
	1,
	32,//'10
	16,
	8,
	4,
	2,
	1,//15
	32,//''
	16,
	8,
	4,
	2,//20
	1,
	1/2.0 ,
	1/4.0 ,
	1/8.0 ,
	1/16.0 ,//25
	1/32.0 ,
	1/64.0 ,
	1/128.0 ,
	1/256.0 ,
	1/512.0 ,//30
	1/1024.0 ,
	1/2048.0);

/**
 * @brief 计算正数方向的经(纬)度线
 * @param minValue 最小经(纬)度
 * @param maxValue 最大经(纬)度
 * @param layer 层级
 * @return double型链表的指针
 */
function getPositiveLines(minValue,maxValue,layer)
{
	var result = new Array();
	var step = 0;
	var minDegree = 0;
	var maxDegree = 0;

	var minMinute = 0;
	var maxMinute = 0;

	var currentMinute = 0;
	var stepCount = 0;

	var i = 0;

	var startMinute = 0;
	var endMinute = 0;

	var startSecond = 0.0;
	var endSecond = 0.0;

	var minSecond = 0.0;
	var maxSecond = 0.0;

	var currentSecond = 0.0;

	if((minValue < 0) || (maxValue < 0)){
		return result;
	}
	step = LAYERANDGRIDSIZE[layer];
	if(layer <= 9){
		//degree
		minDegree = parseInt(minValue);
		maxDegree = parseInt(maxValue);
		if(parseFloat(minDegree) != minValue){
			minDegree += 1;
		}
		if(parseInt(minDegree) % parseInt(step) == 0){
			result.push(minDegree);
		}else{
			minDegree = minDegree + parseInt(step) - parseInt(minDegree) % parseInt(step);
			result.push(minDegree);
		}
		for(minDegree = minDegree + parseInt(step);minDegree <= maxDegree;minDegree += parseInt(step)){
			result.push(minDegree);
		}
	}else if(layer <= 15){
		//minute
		minDegree = parseInt(minValue);
		maxDegree = parseInt(maxValue);

		minMinute = (minValue - minDegree) * 60;
		maxMinute = parseInt(maxValue * 60) - parseInt(maxValue) * 60;

		stepCount = 60 / parseInt(step) + 1;

		if(parseFloat(parseInt(minMinute)) != minMinute){
			minMinute = parseFloat(parseInt(minMinute)) + 1;
		}
		currentMinute = 0.0;
		while(currentMinute < minMinute){
			currentMinute += step;
		}
		if(currentMinute > 60){
			currentMinute = 0;
			minDegree += 1;
		}
		//[minLonDegree,minLonDegree + 1)
		for(i = 0;i < stepCount;i++){
			if((i * step >= currentMinute) && ((minDegree + i * step / 60.0) <= maxValue)){
				result.push(minDegree + i * step / 60.0);
			}
		}
		//[minLonDegree +1,maxLonDegree)
		for(minDegree = minDegree + 1;minDegree < maxDegree;minDegree++){
			for(i = 0;i < stepCount;i++){
				result.push(minDegree + i * step / 60.0);
			}
		}
		//[maxLonDegree,]
		for(i = 0;i < stepCount;i++){
			if((i * step <= maxMinute) && ((minDegree + i * step / 60.0) <= maxValue)){
				result.push(minDegree + i * step / 60.0);
			}
		}
	}else if(layer <= 21){
		//second
		minDegree = parseInt(minValue);
		maxDegree = parseInt(maxValue);

		minMinute = (minValue - minDegree) * 60;
		maxMinute = parseInt(maxValue * 60) - parseInt(maxValue) * 60;

		startMinute = parseInt(minMinute) + minDegree * 60;
		endMinute = maxMinute + maxDegree * 60;

		minSecond = minValue * 3600 - startMinute * 60;
		maxSecond = parseInt(maxValue * 3600) - parseInt(maxValue) * 3600 - maxMinute * 60;

		if(parseFloat(parseInt(minSecond)) != minSecond){
			minSecond += 1;
		}
		currentSecond = 0;
		while(currentSecond < minSecond){
			currentSecond += step;
		}
		if(currentSecond > 60){
			currentSecond = 0;
			startMinute += 1;
		}

		stepCount = 60 / parseInt(step) + 1;
		//[minresultecond,startLonMinute + 1)
		for(i = 0;i < stepCount;i++){
			if((i * step >= currentSecond)&&((startMinute / 60.0 + i * step / 3600.0) <= maxValue)){
				result.push(startMinute / 60.0 + i * step / 3600.0);
			}
		}
		//[startMinute + 1,endLonMinute)
		for(startMinute = startMinute + 1;startMinute < endMinute;startMinute++){
			for(i = 0;i < stepCount;i++){
				result.push(startMinute / 60.0 + i * step / 3600.0);
			}
		}
		//[endLonMinute,maxresultecond]
		for(i = 0;i < stepCount;i++){
			if((i * step <= maxSecond)&&((startMinute / 60.0 + i * step / 3600.0) <= maxValue)){
				result.push(startMinute / 60.0 + i * step / 3600.0);
			}
		}
	}else if(layer <= 32){
		startSecond = minValue * 3600;
		endSecond = maxValue * 3600;

		minSecond = parseFloat(parseInt(startSecond));
		maxSecond = parseFloat(parseInt(endSecond) + 1);

		currentSecond = 0.0;

		while(currentSecond < (startSecond - minSecond)){
			currentSecond += step;
		}
		if(currentSecond > 1){
			currentSecond = 0;
			minSecond += 1;
		}
		for(currentSecond += minSecond;(currentSecond + step) <= endSecond;currentSecond += step){//
			result.push(currentSecond / 3600.0);
		}
	}
	return result;
}

/**
 * @brief 根据经度跨度或者纬度跨度计算自适应层级
 * @param delta 经度跨度或者纬度跨度
 * @return 层级，[4,32]
 */
function getAdaptiveLayerByDelta(delta)
{
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
				gridsize = LAYERANDGRIDSIZE[i] / 60.0;
			}else{
				gridsize = LAYERANDGRIDSIZE[i] / 3600.0;
			}
			if(delta > gridsize * 9)
				break;
		}
	}

	return (layer > 32 ? 32 : layer);
}

/**
 * @brief 计算所有的经(纬)度线
 * @param minValue 最小经(纬)度
 * @param maxValue 最大经(纬)度
 * @param layer 层级
 * @return double型链表指针
 */
function getAllLines(minValue,maxValue,layer)
{
	var minV = minValue < -180 ? -180 : minValue;
	var maxV = maxValue > 180 ? 180 : maxValue;

	var result = new Array();
	var temp = new Array();

	var tempSize = 0;
	var i = 0;
	var value = 0.0;

	//x11 x12 x21 x22
	var x11 = 0,x12 = 0,x21 = 0,x22 = 0;
	var flag;
	if(minV >= 0){
		x11 = minV;
		x12 = maxV;

		flag = 1;
	}else{
		if(maxV <= 0){
			x11 = -maxV;
			x12 = -minV;

			flag = 2;
		}else{
			x11 = 0;
			x12 = -minV;
			x21 = 0;
			x22 = maxV;

			flag = 3;
		}
	}
	switch(flag){
	case 1:
		result = getPositiveLines(x11,x12,layer);
		break;
	case 2:
		temp = getPositiveLines(x11,x12,layer);
		tempSize = temp.length;
		for(i = 0;i < tempSize;i++){
			value = temp[i];
			result.push(-value);
		}
		break;
	case 3:
		result = getPositiveLines(0,maxV,layer);
		temp = getPositiveLines(0,-minV,layer);
		tempSize = temp.length;
		for(i = 0;i < tempSize;i++){
			value = temp[i];
			if(value == 0)
				continue;
			result.push(-value);
		}
		break;
	default:
		break;
	}

	return result;
}

/**
 * @brief 计算自适应的所有的经(纬)度线
 * @param minValue 最小经(纬)度
 * @param maxValue 最大经(纬)度
 * @return double型链表指针
 */
function getAdaptivePositiveLines(minValue,maxValue)
{
    var layer = getAdaptiveLayerByDelta(maxValue - minValue);
    return getPositiveLines(minValue,maxValue,layer);
}

/**
 * @brief 计算自适应的所有的经(纬)度线
 * @param minValue 最小经(纬)度
 * @param maxValue 最大经(纬)度
 * @return double型链表指针
 */
function getAdaptiveAllLines(minValue,maxValue)
{
	var layer = getAdaptiveLayerByDelta(maxValue - minValue);
	return getAllLines(minValue,maxValue,layer);
}