// JavaScript Document
$("#db_type_checkbox").find("input").click(function(){
	//复选框数据库类型改变
	var dbTypes = $("#db_type_checkbox").find("input");
	var dbTypeStr = "";
	for(var i=0;i<dbTypes.length;i++){
		if(dbTypes[i].checked){
		dbTypeStr = dbTypeStr + dbTypes[i].value+",";
		}
	}	
	$.ajax({
		cache : false,
		type : "get",
		url : "dbTypeChange.do",
		data : {
			dbTypeStr:dbTypeStr
		},
		success : function(data) {
			if(data == "error"){
				alert("请选择数据库类型");
				$("#table_name_checkbox").html();
			}else{
				$("#db_name_checkbox").html(data);
			}
		},
		error : function() {
			
			alert("请选择正确的类型");
			
		}
	});
});

function dbNameChange(obj){
	//数据库复选框改变
	var dbNameCkeckbox = $(obj).parents("div").find("input[name='dbName']");
	var dbTypeNameStr = "";
	for(var i=0;i<dbNameCkeckbox.length;i++){
			if(dbNameCkeckbox[i].checked){
				var dbName = dbNameCkeckbox[i].value;
				//拿到数据库对应的数据库类型
				var dbType = $("input[name='"+dbName+"']").val();
				dbTypeNameStr = dbTypeNameStr +dbType+":"+ dbNameCkeckbox[i].value+",";
			}
		}
	$.ajax({
		cache : false,
		type : "get",
		url : "dbNameChange.do",
		data : {
			dbTypeNameStr:dbTypeNameStr
		},
		success : function(data) {
			if(data == "error"){
				alert("请选择数据库");
				$("#table_name_checkbox").html();
			}else{
				$("#table_name_checkbox").html(data);
			}
		},
		error : function() {
			
			alert("请选择正确的类型");
		}
	});
}


$(document).ready(function(e) {
	$("#popwin").height($(window).height()-55);
	$(".search-form").height($(window).height()-232);
	$("#result-table").height($(window).height()-232);
	$(".checkerright").width($("#result").width()-$(".checker").width());
	$("#result").height($(window).height()-142);
	$("#search").height($(window).height()-152);
	$(window).resize(function(){
		$("#popwin").height($(window).height()-55);
		$(".search-form").height($(window).height()-232);
		$("#result-table").height($(window).height()-232);
		$(".checkerright").width($("#result").width()-$(".checker").width());
		$("#result").height($(window).height()-142);
		$("#search").height($(window).height()-152);
	});	
	$(".page-sidebar").load("iWhereLink-slide.jsp");
//	$(".icon-chevron-down").click(function(){
//		$(this).parents(".table-content-show").next(".table-content-hide").slideToggle();	
//	});  
	$(".map-pane").height($(".map-img").height());
	$("#map-message").css("bottom",-$("#map-message").height()); 
	$(".close-message").click(function(){
		$("#map-message").animate({bottom:-$(".portlet-body").height()},"slow",function(){
			$(".map-pane").css("left","0");	
			$("#map-message").css("width","280px");
			$("#map-content").css("width","280px");
		});
	});		$(".icon-chevron-left").hide();	
	$(".icon-chevron-right").click(function(){
		$(".close-slide").animate({right:"0"},"slow");
		$("#popwin").animate({right:-$("#popwin").width()},"slow",function(){
			$(".icon-chevron-left").show();
			$(".icon-chevron-right").hide();
		});			
	});	
	$(".icon-chevron-left").click(function(){
		$(".close-slide").animate({right:$("#popwin").width()},"slow");
		$("#popwin").animate({right:"0"},"slow",function(){
			$(".icon-chevron-right").show();
			$(".icon-chevron-left").hide();	
		});
	});  
});