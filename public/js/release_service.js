/**
 * Created by Administrator on 2017/5/10.
 */
$(function () {
    //初始化侧边栏的点击事件
    $('.sub-menu a[href="./releaseService.do"]').addClass('current_page').parents('.third-level').show().parent().addClass('open');

    var stepOneContainer = $("#viewStepOne");

    var stepTwoContainer = $("#viewStepTwo");
    var firstStep = $('#firstStep');
    var stepThreeContainer = $("#viewStepThree");
    var serviceBaseInfo = [];
    var paramLists = {}; //请求参数名称
    //第三步表格
    var serviceParamsReqTbody = $('#service-params-req table tbody');
    var serviceParamsResTbody = $('#service-params-res table tbody');
    var serviceParamsErrorTbody = $('#service-params-error table tbody');
    //第二步表格
    var reqParamsTbody = $('#req-params-table table tbody');
    var resParamsTbody = $('#res-params-table table tbody');
    var errorCodeTbody = $('#error-code-table table tbody');
    //服务类型select
    $.ajax({
        type: "get",
        url: "iwherelink/getWebServiceType.do",
        //url: "testData/getWebServiceType.json",
        dataType: 'json',
        success: function (data) {
            if (data.code == 1) {
                layer.msg(data.message, {time: 2000});
            }
            else {
                $("#wsType").empty();
                var option = '<option value="0">请选择--</option>';
                for (var i = 0; i < data.data.length; i++) {
                    option += '<option value="' + data.data[i].id + '">' + data.data[i].name + '</option>';
                }
                $("#wsType").append(option);
            }
        },
        error: function () {
            layer.msg("请求数据出错。。。");
        }
    });
    //服务内容类型select
    $.ajax({
        type: "get",
        url: "iwherelink/getWebServiceContentType.do",
        //url: "testData/getWebServiceContentType.json",
        dataType: 'json',
        success: function (data) {
            if (data.code == 1) {
                layer.msg(data.message, {time: 2000});
            }
            else {
                $("#wsContentType").empty();
                var option = '<option value="0">请选择--</option>';
                for (var i = 0; i < data.data.length; i++) {
                    option += '<option value="' + data.data[i].id + '">' + data.data[i].name + '</option>';
                }
                $("#wsContentType").append(option);
                $("#wsContentType").find('option[value="1"]').prop("selected", true);
            }
        },
        error: function () {
            layer.msg("请求数据出错。。。");
        }
    });
    //服务内容类型联动
    var viewName = $('#viewName');
    var dicName = $('#dicName');
    $('#wsContentType').change(function () {
        var optionVal = $(this).find('option:selected').val();
        if (optionVal == 1) { //视图
            viewName.parent().show();
            dicName.parent().hide();
            ajaxName(viewName, "iwherelink/getWebServiceViewOrDictionary.do", optionVal);
        }
        else { //字典
            viewName.parent().hide();
            dicName.parent().show();
            ajaxName(dicName, "iwherelink/getWebServiceViewOrDictionary.do", optionVal);
        }
    });
    ajaxName(viewName, "iwherelink/getWebServiceViewOrDictionary.do", 1);
    //请求视图或字典名称
    function ajaxName(obj, url, id) {
        $.ajax({
            //type: "post",
            type: "get",
            url: url,
            dataType: 'json',
            data: {
                contentType: Number(id)
            },
            success: function (data) {
                if (data.code == 1) {
                    layer.msg(data.message, {time: 2000});
                }
                else {
                    obj.empty();
                    var option = '<option value="0">请选择--</option>';
                    for (var i = 0; i < data.data.length; i++) {
                        option += '<option value="' + data.data[i].id + '">' + data.data[i].name + '</option>';
                    }
                    obj.append(option);
                }
            },
            error: function () {
                layer.msg("请求数据出错。。。");
            }
        });
    }

    //权限
    $.ajax({
        type: "get",
        url: "iwherelink/getWebServicePermission.do",
        //url: "testData/getWebServiceType.json",
        dataType: 'json',
        success: function (data) {
            if (data.code == 1) {
                layer.msg(data.message, {time: 2000});
            }
            else {
                $("#viewAuth").empty();
                var option = '<option value="0">请选择--</option>';
                for (var i = 0; i < data.data.length; i++) {
                    option += '<option value="' + data.data[i].id + '">' + data.data[i].name + '</option>';
                }
                $("#viewAuth").append(option);
            }
        },
        error: function () {
            layer.msg("请求数据出错。。。");
        }
    });
    //请求参数的请求参数名称
    function ajaxParmsList(url, param, contentTypeId) {
        var params = {};
        if (param) {
            params.interfaceId = param
        }
        if (contentTypeId) {
            params.contentType = contentTypeId
        }
        $.ajax({
            type: "get",
            url: url,
            dataType: 'json',
            data: params,
            success: function (data) {
                if (data.code == 1) {
                    layer.msg(data.message, {time: 2000});
                }
                else {
                    paramLists[url] = data;
                }
            },
            error: function () {
                layer.msg("请求数据出错。。。");
            }
        });
    }

    //下一步
    var btnNext = $(".btn-abled");
    var btnPrev = $(".btn-prev");
    var stepLi = $(".processStep").find("li");
    //第一步的下一步
    btnNext.eq(0).click(function () {

        var wsTypeOption = $("#wsType").find('option:selected');
        var wsType = wsTypeOption.val();
        var wsTypeVal = wsTypeOption.text();
        var wsName = $("#wsName").val().trim();
        var wsContentTypeOption = $("#wsContentType").find('option:selected');
        var wsContentType = wsContentTypeOption.val();
        var wsContentTypeVal = wsContentTypeOption.text();
        var viewNameOption = $("#viewName").find('option:selected');
        var viewName = viewNameOption.val();
        var viewNameVal = viewNameOption.text();
        var dicNameOption = $("#dicName").find('option:selected');
        var dicName = dicNameOption.val();
        var dicNameVal = dicNameOption.text();
        var viewAuthOption = $("#viewAuth").find('option:selected');
        var viewAuth = viewAuthOption.val();
        var viewAuthVal = viewAuthOption.text();
        var serviceNote = $('#wsNote').val();
        var interfaceId;
        var reg1 = /^\S*$/;
        var reg2 = /^[\u4e00-\u9fa5a-zA-Z0-9\_]*$/;  //只含有汉字、数字、字母下划线
        serviceBaseInfo = [];
        if (wsType == "0" || wsType == " " || wsType == "undefined" || wsType == null) {
            layer.msg("服务类型不能为空", {time: 2000});
            return;
        }
        if (wsName == "" || wsName == " " || wsName == "undefined" || wsName == null) {
            layer.msg("服务名称不能为空", {time: 2000});
            return;
        }
        if (!reg1.test(wsName)) {
            layer.msg("服务名称不能包含空格", {time: 2000});
            return;
        }
        if (!reg2.test(wsName)) {
            layer.msg("服务名称不能包含特殊字符", {time: 2000});
            return;
        }

        if (wsContentType == "0" || wsContentType == " " || wsContentType == "undefined" || wsContentType == null) {
            layer.msg("服务内容类型不能为空", {time: 2000});
            return;
        }
        if (viewNameOption.parent().parent().css('display') == 'block' && (viewName == "0" || viewName == " " || viewName == "undefined" || viewName == null)) {
            layer.msg("视图名称不能为空", {time: 2000});
            return;
        }
        if (dicNameOption.parent().parent().css('display') == 'block' && (dicName == "0" || dicName == " " || dicName == "undefined" || dicName == null)) {
            layer.msg("字典名称不能为空", {time: 2000});
            return;
        }

        if (viewAuth == "0" || viewAuth == " " || viewAuth == "undefined" || viewAuth == null) {
            layer.msg("权限不能为空", {time: 2000});
            return;
        }
        serviceBaseInfo.push(wsType, wsTypeVal, wsName, wsContentType, wsContentTypeVal, viewAuth, viewAuthVal, serviceNote);
        if (viewNameOption.parent().parent().css('display') == 'block') {
            interfaceId = viewName;
            serviceBaseInfo.push(interfaceId);
            serviceBaseInfo.push(viewNameVal);

        }
        if (dicNameOption.parent().parent().css('display') == 'block') {
            interfaceId = dicName;
            serviceBaseInfo.push(interfaceId);
            serviceBaseInfo.push(dicNameVal);
        }
        //验证是否重名
        $.ajax({
            type: "post",
            //type: "get",
            //url: 'testData/getWebServiceType.json',
            url: 'iwherelink/checkServiceName.do',
            dataType: 'json',
            data: {
                serviceName: wsName
            },
            success: function (data) {
                if (data.code == 1) {
                    layer.msg(data.message, {time: 2000});
                    return false;
                }
                else {

                    stepOneContainer.hide();
                    }

                    stepTwoContainer.show();
                    stepThreeContainer.hide();
                    stepLi.removeClass("activeStep");
                    stepLi.eq(1).addClass("activeStep");
                    //ajaxParmsList("testData/getReqParamsInfo.json",interfaceId);
                    ajaxParmsList("/iwherelink/getRequestParameterInfo.do", interfaceId, wsContentType);
                    //ajaxParmsList("testData/getResponsParamsInfo.json",interfaceId);
                    ajaxParmsList("/iwherelink/getResponseParameterInfo.do", interfaceId, wsContentType);
                    //ajaxParmsList("testData/dealSuggestion.json");
                    ajaxParmsList("/iwherelink/getErrorCodeInfo.do");
                },

            error:function() {
                layer.msg('验证服务名称是否重复错误');
            }
        });

    });
    //第二步的下一步
    btnNext.eq(1).click(function () {
        serviceParamsReqTbody.empty().append(reqParamsTbody.html());
        removeLastTd(serviceParamsReqTbody);
        serviceParamsResTbody.empty().append(resParamsTbody.html());
        removeLastTd(serviceParamsResTbody);
        serviceParamsErrorTbody.empty().append(errorCodeTbody.html());
        removeLastTd(serviceParamsErrorTbody);


        //服务基本信息
        if (serviceBaseInfo[3] == '1') { //视图
            var mapName = '视图名称：';
        }
        else {
            var mapName = '字典名称：';
        }
        if (serviceBaseInfo[7] == '') {
            var noteText = '无';
        }
        else {
            var noteText = serviceBaseInfo[7].substring(0, 10) + '......';
        }
        var serviceBaseInfoHtml = '<div class=" span11">' +
            '<p class="span4">' +
            '<label class="span5">服务类型：</label>' +
            '<span>' + serviceBaseInfo[1] + '</span>' +
            '</p>' +
            '<p class="span4">' +
            '    <label class="span5">服务名称：</label>' +
            '<span>' + serviceBaseInfo[2] + '</span>' +
            '</p>' +
            '<p class="span4">' +
            '   <label class="span5">服务内容类型：</label>' +
            '<span>' + serviceBaseInfo[4] + '</span>' +
            '</p>' +
            '<p class="span4">' +
            '<label class="span5">' + mapName + '</label>' +
            '<span>' + serviceBaseInfo[9] + '</span>' +
            '</p>' +
            '<p class="span4">' +
            '    <label class="span5">权限：</label>' +
            '<span>' + serviceBaseInfo[6] + '</span>' +
            '</p>' +
            '<p class="span4">' +
            '    <label class="span5">服务说明：</label>' +
            '<span>' + noteText + '</span>' +
            '</p>' +
            '</div>';
        $('#service-base-info').empty().append(serviceBaseInfoHtml);
        stepOneContainer.hide();
        stepTwoContainer.hide();
        stepThreeContainer.show();
        $("#viewVersion").val("");
        stepLi.removeClass("activeStep");
        stepLi.eq(2).addClass("activeStep");
    });
    //移除最后一个td
    function removeLastTd(tbody) {
        for (var i = 0; i < tbody.find('tr').length; i++) {
            tbody.find('tr').eq(i).find('td:last').remove();
        }
    }

    //第二步的上一步

    btnPrev.eq(0).click(function () {
        firstStep.show();
        stepOneContainer.show();
        stepTwoContainer.hide();
        stepThreeContainer.hide();
        stepLi.removeClass("activeStep");
        stepLi.eq(0).addClass("activeStep");
        console.log($("#viewName").find('option:selected'));

    });
    //第三步的上一步
    btnPrev.eq(1).click(function () {
        stepOneContainer.hide();
        stepTwoContainer.show();
        stepThreeContainer.hide();
        stepLi.removeClass("activeStep");
        stepLi.eq(1).addClass("activeStep");
        console.log($("#viewName").find('option:selected'));

    });

    //不能为空提示不显示
    $('body').on('change', '.layui-layer-content select', function () {
        $(this).next().next().hide();
    });
    $('body').on('keydown', '.layui-layer-content input', function () {
        $(this).next().next().hide();
    });
    //判读弹窗内容是否为空
    function isParamsEmpty(layero) {
        var requireStar = layero.find('.requiredStar');
        var isEmpty = false;
        for (var i = 0; i < requireStar.length; i++) {
            var prevDomVal = requireStar.eq(i).prev().val();
            if (prevDomVal == "0" || prevDomVal == "" || prevDomVal == "undefined" || prevDomVal == null) {
                requireStar.eq(i).next().show();
                isEmpty = true;
                break;
            }
        }
        return isEmpty;
    }

    //添加请求参数
    $("#add-req-params").click(function () {
        var paramsArr = [];
        var allTr = $('#req-params-table tbody tr');
        for (var i = 0; i < allTr.length; i++) {
            var param = allTr.eq(i).find('td').eq(0).text();
            paramsArr.push(param);
        }
        var reqParamsHtml = '<form>' +
            '<p class="input-text">' +
            '<label>请求参数名称：</label>' +
            '<select class="req-name"  style="width:375px">' +
            '</select>' +
            '<em class="requiredStar">*</em>' +
            '<span>不能为空</span>' +
            '</p>' +
            '<p class="input-text">' +
            '<label>响应参数名称：</label>' +
            '<input type="text" class="res-name">' +
            '<em class="requiredStar">*</em>' +
            '<span>不能为空</span>' +
            '</p>' +
            '<p class="input-text">' +
            '<label>参数类型：</label>' +
            '<select class="param-type" style="width:375px">' +
            '<option value="0">选择参数类型</option>' +
            '<option value="1">字符串</option>' +
            '<option value="2">json对象</option>' +
            '<option value="3">数组</option>' +
            '<option value="4">数字</option>' +
            '</select>' +
            '<em class="requiredStar">*</em>' +
            '<span>不能为空</span>' +
            '</p>' +
            '<p class="input-text">' +
            '<label>映射方式：</label>' +
            '<select class="map-methord" style="width:375px">' +
            '<option value="0">选择映射方式</option>' +
            '<option value="1">API参数</option>' +
            '<option value="2">url参数</option>' +
            '</select>' +
            '<em class="requiredStar">*</em>' +
            '<span>不能为空</span>' +
            '</p>' +
            '<p class="input-text">' +
            '<label>必须：</label>' +
            '<select class="is-required" style="width:375px">' +
            '<option value="0">请选择--</option>' +
            '<option value="1">是</option>' +
            '<option value="2">否</option>' +
            '</select>' +
            '<em class="requiredStar">*</em>' +
            '<span>不能为空</span>' +
            '</p>' +
            '</form>';
        layer.open({
            type: 1,
            title: ['添加请求参数', 'margin-bottom:15px;background:#4b8df8;font-size:16px;color:white;'],
            area: '690px',
            content: reqParamsHtml,
            btn: ['确定', '取消'],
            btnAlign: 'center',
            success: function () {
                var reqName = $(".req-name");
                reqName.empty();
                var option = '<option value="0">请选择--</option>';
                //var paramData = paramLists['testData/getReqParamsInfo.json'].data;
                var paramData = paramLists['/iwherelink/getRequestParameterInfo.do'].data;
                for (var i = 0; i < paramData.length; i++) {
                    if (paramData[i].parameter_name == 'id') {
                        continue;
                    }
                    else {
                        option += '<option>' + paramData[i].parameter_name + '</option>';
                    }
                }
                reqName.append(option);
                var reqNameOption = reqName.find('option');
                for (var j = 0; j < paramsArr.length; j++) {
                    for (var k = 0; k < reqNameOption.length; k++) {
                        if (reqNameOption.eq(k).text() == paramsArr[j]) {
                            reqNameOption.eq(k).attr('disabled', true);
                        }
                    }
                }
            },
            yes: function (index, layero) {
                var reqName = $(".req-name");
                var resName = $(".res-name");
                var paramType = $(".param-type");
                var mapMethord = $(".map-methord");
                var isrequired = $(".is-required");
                var reqNameVal = reqName.find('option:selected').text();
                var reqNameId = reqName.find('option:selected').val();
                var resNameVal = resName.val().trim();
                var paramTypeVal = paramType.find('option:selected').text();
                var mapMethordVal = mapMethord.find('option:selected').text();
                var isrequiredVal = isrequired.find('option:selected').text();
                if (!isParamsEmpty(layero)) {
                    var tr = '<tr id="' + reqNameId + '">' +
                        '<td>' + reqNameVal + '</td>' +
                        '<td>' + resNameVal + '</td>' +
                        '<td>' + paramTypeVal + '</td>' +
                        '<td>' + mapMethordVal + '</td>' +
                        '<td>' + isrequiredVal + '</td>' +
                        '<td><a class="edit">编辑</a> |<a class="delete">删除</a></td>' +
                        '</tr>';
                    $('#req-params-table tbody').append(tr);
                    layer.close(index);
                }
            }
        });
    });
    //修改请求参数
    $('#req-params-table tbody').on('click', '.edit', function () {
        var reqParamsHtml = '<form>' +
            '<p class="input-text">' +
            '<label>请求参数名称：</label>' +
            '<select class="req-name"  style="width:375px">' + '</select>' +'</p>' +
            '<p class="input-text">' +
            '<label>响应参数名称：</label>' +
            '<input type="text" class="res-name">' +
            '<em class="requiredStar">*</em>' +
            '<span>不能为空</span>' +
            '</p>' +
            '<p class="input-text">' +
            '<label>参数类型：</label>' +
            '<select class="param-type" style="width:375px">' +
            '<option value="0">选择参数类型</option>' +
            '<option value="1">字符串</option>' +
            '<option value="2">json对象</option>' +
            '<option value="3">数组</option>' +
            '<option value="4">数字</option>' +
            '</select>' +
            '<em class="requiredStar">*</em>' +
            '<span>不能为空</span>' +
            '</p>' +
            '<p class="input-text">' +
            '<label>映射方式：</label>' +
            '<select class="map-methord" style="width:375px">' +
            '<option value="0">选择映射方式</option>' +
            '<option value="1">API参数</option>' +
            '<option value="2">url参数</option>' +
            '</select>' +
            '<em class="requiredStar">*</em>' +
            '<span>不能为空</span>' +
            '</p>' +
            '<p class="input-text">' +
            '<label>必须：</label>' +
            '<select class="is-required" style="width:375px">' +
            '<option value="0">请选择--</option>' +
            '<option value="1">是</option>' +
            '<option value="2">否</option>' +
            '</select>' +
            '<em class="requiredStar">*</em>' +
            '<span>不能为空</span>' +
            '</p>' +
            '</form>';
        var id = $(this).parent().parent().attr("id");
        var oriTd = $(this).parent().siblings();
        var oriReqName = oriTd.eq(0).text();
        var oriResName = oriTd.eq(1).text();
        var oriParamsType = oriTd.eq(2).text();
        var oriMapMethord = oriTd.eq(3).text();
        var oriIsRequired = oriTd.eq(4).text();
        layer.open({
            type: 1,
            title: ['编辑请求参数', 'margin-bottom:15px;background:#4b8df8;font-size:16px;color:white;'],
            area: '690px',
            content: reqParamsHtml,
            btn: ['确定', '取消'],
            btnAlign: 'center',
            success: function () {
                var reqName = $('.req-name');
                reqName.empty();
                var option = '<option value="0">请选择--</option>';
                //var paramData = paramLists['testData/getReqParamsInfo.json'].data;
                var paramData = paramLists['/iwherelink/getRequestParameterInfo.do'].data;
                for (var i = 0; i < paramData.length; i++) {
                    option += '<option value="' + paramData[i].id + '">' + paramData[i].parameter_name + '</option>';
                }
                reqName.append(option);
                reqName.attr('disabled', true);
                reqName.find('option:contains(' + oriReqName + ')').attr('selected', true);
                $('.res-name').val(oriResName);
                $('.param-type').find('option:contains(' + oriParamsType + ')').attr('selected', true);
                $('.map-methord').find('option:contains(' + oriMapMethord + ')').attr('selected', true);
                $('.is-required').find('option:contains(' + oriIsRequired + ')').attr('selected', true);
            },
            yes: function (index, layero) {
                var reqName = $(".req-name");
                var resName = $(".res-name");
                var paramType = $(".param-type");
                var mapMethord = $(".map-methord");
                var isrequired = $(".is-required");
                var reqNameVal = reqName.find('option:selected').text();
                var resNameVal = resName.val().trim();
                var paramTypeVal = paramType.find('option:selected').text();
                var mapMethordVal = mapMethord.find('option:selected').text();
                var isrequiredVal = isrequired.find('option:selected').text();
                if (!isParamsEmpty(layero)) {
                    var oriTr = $('#req-params-table tbody').find('tr[id=' + id + ']');
                    var tr = '<tr id="' + id + '">' +
                        '<td>' + reqNameVal + '</td>' +
                        '<td>' + resNameVal + '</td>' +
                        '<td>' + paramTypeVal + '</td>' +
                        '<td>' + mapMethordVal + '</td>' +
                        '<td>' + isrequiredVal + '</td>' +
                        '<td><a class="edit">编辑</a> |<a class="delete">删除</a></td>' +
                        '</tr>';
                    $(tr).insertBefore(oriTr);
                    oriTr.remove();
                    layer.close(index);
                }
            }
        });
    });
    //删除表格中的某一行
    function deleteTr() {
        $('.table tbody').on('click', '.delete', function () {
            var curTr = $(this).parent().parent();
            layer.alert('确认删除？', function (index) {
                curTr.remove();
                layer.close(index);
            });
        });
    }

    deleteTr();
    //添加响应参数
    $("#add-res-params").click(function () {
        var html = '<form>' +
            '<p class="input-text">' +
            '<label>请求参数名称：</label>' +
            '<select class="req-name" style="width:375px">' +
            '</select>' +
            '<em class="requiredStar">*</em>' +
            '<span>不能为空</span>' +
            '</p>' +
            '<p class="input-text">' +
            '<label>响应参数名称：</label>' +
            '<input type="text" class="res-name">' +
            '<em class="requiredStar">*</em>' +
            '<span>不能为空</span>' +
            '</p>' +
            '<p class="input-text">' +
            '<label>参数类型：</label>' +
            '<select  style="width:375px" class="param-type">' +
            '<option value="0">选择参数类型</option>' +
            '<option value="1">字符串</option>' +
            '<option value="2">json对象</option>' +
            '<option value="3">数组</option>' +
            '<option value="4">数字</option>' +
            '</select>' +
            '<em class="requiredStar">*</em>' +
            '<span>不能为空</span>' +
            '</p>' +
            '</form>';
        var paramsArr = [];
        var allTr = $('#res-params-table tbody tr');
        for (var i = 0; i < allTr.length; i++) {
            var param = allTr.eq(i).find('td').eq(0).text();
            paramsArr.push(param);
        }
        layer.open({
            type: 1,
            title: ['添加响应参数', 'margin-bottom:15px;background:#4b8df8;font-size:16px;color:white;'],
            area: '690px',
            content: html,
            btn: ['确定', '取消'],
            btnAlign: 'center',
            success: function () {
                var reqName = $(".req-name");
                reqName.empty();
                var option = '<option value="0">请选择--</option>';
                //var paramData = paramLists['testData/getResponsParamsInfo.json'].data;
                var paramData = paramLists['/iwherelink/getResponseParameterInfo.do'].data;
                for (var i = 0; i < paramData.length; i++) {
                    option += '<option value="' + (i + 1) + '">' + paramData[i] + '</option>';
                }
                reqName.append(option);
                var reqNameOption = reqName.find('option');
                for (var j = 0; j < paramsArr.length; j++) {
                    for (var k = 0; k < reqNameOption.length; k++) {
                        if (reqNameOption.eq(k).text() == paramsArr[j]) {
                            reqNameOption.eq(k).attr('disabled', true);
                        }
                    }
                }
            },
            yes: function (index, layero) {
                var reqName = $(".req-name");
                var resName = $(".res-name");
                var paramType = $(".param-type");
                var reqNameVal = reqName.find('option:selected').text();
                var reqNameId = reqName.find('option:selected').val();
                var resNameVal = resName.val().trim();
                var paramTypeVal = paramType.find('option:selected').text();
                if (!isParamsEmpty(layero)) {
                    var tr = '<tr id="' + reqNameId + '">' +
                        '<td>' + reqNameVal + '</td>' +
                        '<td>' + resNameVal + '</td>' +
                        '<td>' + paramTypeVal + '</td>' +
                        '<td><a class="edit">编辑</a> |<a class="delete">删除</a></td>' +
                        '</tr>';
                    $('#res-params-table tbody').append(tr);
                    layer.close(index);
                }
            }
        });
    });
    //修改响应参数
    $('#res-params-table tbody').on('click', '.edit', function () {
        var html = '<form>' +
            '<p class="input-text">' +
            '<label>请求参数名称：</label>' +
            '<select class="req-name" style="width:375px">' +
            '</select>' +

            '</p>' +
            '<p class="input-text">' +
            '<label>响应参数名称：</label>' +
            '<input type="text" class="res-name">' +
            '<em class="requiredStar">*</em>' +
            '<span>不能为空</span>' +
            '</p>' +
            '<p class="input-text">' +
            '<label>参数类型：</label>' +
            '<select  style="width:375px" class="param-type">' +
            '<option value="0">选择参数类型</option>' +
            '<option value="1">字符串</option>' +
            '<option value="2">json对象</option>' +
            '<option value="3">数组</option>' +
            '<option value="4">数字</option>' +
            '</select>' +
            '<em class="requiredStar">*</em>' +
            '<span>不能为空</span>' +
            '</p>' +
            '</form>';
        var id = $(this).parent().parent().attr("id");
        var oriTd = $(this).parent().siblings();
        var oriReqName = oriTd.eq(0).text();
        var oriResName = oriTd.eq(1).text();
        var oriParamsType = oriTd.eq(2).text();
        layer.open({
            type: 1,
            title: ['编辑响应参数', 'margin-bottom:15px;background:#4b8df8;font-size:16px;color:white;'],
            area: '690px',
            content: html,
            btn: ['确定', '取消'],
            btnAlign: 'center',
            success: function () {
                var reqName = $('.req-name');
                reqName.empty();
                var option = '<option value="0">请选择--</option>';
                //var paramData = paramLists['testData/getResponsParamsInfo.json'].data;
                var paramData = paramLists['/iwherelink/getResponseParameterInfo.do'].data;
                for (var i = 0; i < paramData.length; i++) {
                    option += '<option value="' + (i + 1) + '">' + paramData[i] + '</option>';
                }
                reqName.append(option);
                reqName.attr('disabled', true);
                reqName.find('option:contains(' + oriReqName + ')').attr('selected', true);
                $('.res-name').val(oriResName);
                $('.param-type').find('option:contains(' + oriParamsType + ')').attr('selected', true);
            },
            yes: function (index, layero) {
                var reqName = $(".req-name");
                var resName = $(".res-name");
                var paramType = $(".param-type");
                var reqNameVal = reqName.find('option:selected').text();
                var resNameVal = resName.val().trim();
                var paramTypeVal = paramType.find('option:selected').text();
                if (!isParamsEmpty(layero)) {
                    var oriTr = $('#res-params-table tbody').find('tr[id=' + id + ']');
                    var tr = '<tr id="' + id + '">' +
                        '<td>' + reqNameVal + '</td>' +
                        '<td>' + resNameVal + '</td>' +
                        '<td>' + paramTypeVal + '</td>' +
                        '<td><a class="edit">编辑</a> |<a class="delete">删除</a></td>' +
                        '</tr>';
                    $(tr).insertBefore(oriTr);
                    oriTr.remove();
                    layer.close(index);
                }
            }
        });
    });

    //添加错误代码
    $("#add-error-code").click(function () {
        var html = '<form>' +
            '<p class="input-text">' +
            '<label>错误代码：</label>' +
            '<input type="text" class="error-code">' +
            '<em class="requiredStar">*</em>' +
            '<span>不能为空</span>' +
            '</p>' +
            '<p class="input-text">' +
            '<label>处置建议：</label>' +
            '<select class="deal-sug" style="width:375px">' +
            '</select>' +
            '<em class="requiredStar">*</em>' +
            '<span>不能为空</span>' +
            '</p>' +
            '<p class="input-text">' +
            '<label>说明：</label>' +
            '<input type="text" class="error-ps" disabled>' +
            '<em class="requiredStar">*</em>' +
            '<span>不能为空</span>' +
            '</p>' +
            '</form>';
        var paramsArr = [];
        var allTr = $('#error-code-table tbody tr');
        for (var i = 0; i < allTr.length; i++) {
            var param = allTr.eq(i).find('td').eq(1).text();
            paramsArr.push(param);
        }
        layer.open({
            type: 1,
            title: ['添加错误代码', 'margin-bottom:15px;background:#4b8df8;font-size:16px;color:white;'],
            area: '690px',
            content: html,
            btn: ['确定', '取消'],
            btnAlign: 'center',
            success: function () {
                var dealSug = $(".deal-sug");
                dealSug.empty();
                var option = '<option value="0">请选择--</option>';
                //var paramData = paramLists['testData/dealSuggestion.json'].data;
                var paramData = paramLists['/iwherelink/getErrorCodeInfo.do'].data;
                for (var i = 0; i < paramData.length; i++) {
                    option += '<option value="' + paramData[i].id + '"  explain="' + paramData[i].error_explain + '">' + paramData[i].error_suggest + '</option>';
                }
                dealSug.append(option);
                var dealSugOption = dealSug.find('option');
                for (var j = 0; j < paramsArr.length; j++) {
                    for (var k = 0; k < dealSugOption.length; k++) {
                        if (dealSugOption.eq(k).text() == paramsArr[j]) {
                            dealSugOption.eq(k).attr('disabled', true);
                        }
                    }
                }
                //建议和说明联动
                dealSug.change(function () {
                    var curOption = $(this).find('option:selected');
                    var optionId = curOption.val();
                    var explain = curOption.attr("explain");
                    var errorPs = $('.error-ps');
                    errorPs.val('');
                    errorPs.val(explain);
                })
            },
            yes: function (index, layero) {
                var errorCode = $(".error-code");
                var dealSuggestion = $(".deal-sug");
                var errorPs = $(".error-ps");
                var errorCodeVal = errorCode.val().trim();
                var dealSuggestionVal = dealSuggestion.find('option:selected').text();
                var dealSuggestionId = dealSuggestion.find('option:selected').val();
                var errorPsVal = errorPs.val().trim();
                if (!isParamsEmpty(layero)) {
                    var tr = '<tr id="' + dealSuggestionId + '">' +
                        '<td>' + errorCodeVal + '</td>' +
                        '<td>' + dealSuggestionVal + '</td>' +
                        '<td>' + errorPsVal + '</td>' +
                        '<td><a class="edit">编辑</a> |<a class="delete">删除</a></td>' +
                        '</tr>';
                    $('#error-code-table tbody').append(tr);
                    layer.close(index);
                }
            }
        });
    });
    //修改错误代码
    $('#error-code-table tbody').on('click', '.edit', function () {
        var html = '<form>' +
            '<p class="input-text">' +
            '<label>错误代码：</label>' +
            '<input type="text" class="error-code">' +
            '<em class="requiredStar">*</em>' +
            '<span>不能为空</span>' +
            '</p>' +
            '<p class="input-text">' +
            '<label>处置建议：</label>' +
            '<select class="deal-sug" style="width:375px" disabled>' +
            '</select>' +
            '<em class="requiredStar">*</em>' +
            '<span>不能为空</span>' +
            '</p>' +
            '<p class="input-text">' +
            '<label>说明：</label>' +
            '<input type="text" class="error-ps" disabled>' +
            '<em class="requiredStar">*</em>' +
            '<span>不能为空</span>' +
            '</p>' +
            '</form>';
        var id = $(this).parent().parent().attr("id");
        var oriTd = $(this).parent().siblings();
        var oriErrorCode = oriTd.eq(0).text();
        var oriDealSug = oriTd.eq(1).text();
        var oriErrorPs = oriTd.eq(2).text();
        layer.open({
            type: 1,
            title: ['编辑错误代码', 'margin-bottom:15px;background:#4b8df8;font-size:16px;color:white;'],
            area: '690px',
            content: html,
            btn: ['确定', '取消'],
            btnAlign: 'center',
            success: function () {
                var dealSug = $(".deal-sug");
                dealSug.empty();
                var option = '<option value="0">请选择--</option>';
                //var paramData = paramLists['testData/dealSuggestion.json'].data;
                var paramData = paramLists['/iwherelink/getErrorCodeInfo.do'].data;
                for (var i = 0; i < paramData.length; i++) {
                    option += '<option value="' + paramData[i].id + '" explain="' + paramData[i].error_explain + '">' + paramData[i].error_suggest + '</option>';
                }
                dealSug.append(option);
                dealSug.attr('disabled', true);
                dealSug.find('option:contains(' + oriDealSug + ')').attr('selected', true);
                $('.error-code').val(oriErrorCode);
                $('.error-ps').val(oriErrorPs);
            },
            yes: function (index, layero) {
                var errorCode = $(".error-code");
                var dealSuggestion = $(".deal-sug");
                var errorPs = $(".error-ps");
                var errorCodeVal = errorCode.val().trim();
                var dealSuggestionVal = dealSuggestion.find('option:selected').text();
                var errorPsVal = errorPs.val().trim();
                if (!isParamsEmpty(layero)) {
                    var oriTr = $('#res-params-table tbody').find('tr[id=' + id + ']');
                    var tr = '<tr id="' + id + '">' +
                        '<td>' + errorCodeVal + '</td>' +
                        '<td>' + dealSuggestionVal + '</td>' +
                        '<td>' + errorPsVal + '</td>' +
                        '<td><a class="edit">编辑</a> |<a class="delete">删除</a></td>' +
                        '</tr>';
                    $(tr).insertBefore(oriTr);
                    oriTr.remove();
                    layer.close(index);
                }
            }
        });
    });
    //折叠
    $(".service-head>i").click(function () {
        if ($(this).hasClass('icon-chevron-up')) {
            $(this).removeClass('icon-chevron-up');
            $(this).addClass('icon-chevron-down')
        }
        else {
            $(this).addClass('icon-chevron-up');
            $(this).removeClass('icon-chevron-down')
        }
    });
    //测试查询
    $('#test-search').click(function () {
        $('#result-table').html();
        var allInfo = makeJsonData();
        console.log(allInfo);
        var params = {
            interfaceId: allInfo.interfaceId,
            contentType: Number(allInfo.serviceBaseInfo.serviceContentTypeId),
            resParamInfos: allInfo.serviceParamsInfo.resParamInfos
        };
        //console.log(JSON.stringify(allInfo));
        //console.log(JSON.stringify(params));
        //return;
        $.ajax({
            //type: 'get',
            type: 'post',
            //url: '/testData/getWebServiceType.json',
            url: '/iwherelink/searchTest.do',
            data: JSON.stringify(params),
            contentType: 'application/json',
            dataType: 'json',
            success: function (data) {

                if (data.code == 0) {
                    //$('.test-result').empty();
                    var tbody = '<tbody>';
                    var tr = "";
                    if(data.data.length < 10){
                        console.log(data.data);
                        for(var k = 0; k<data.data.length; k++){
                            tr += "<td>"+data.data[k]+"</td>";
                        }

                    }else{
                        for(var i =0;i<Math.ceil(data.data.length/10);i++){

                            tr += "<tr>";

                            for(var j=0;j<10;j++){
                                if ((i*10 + j) >= data.data.length){
                                    tr += "<td></td>";
                                }
                                else tr += "<td>"+data.data[i*10 + j]+"</td>";
                            }
                            tr += "</tr>";
                        }
                    }


                    tbody += tr;
                    $('#result-table').append(tbody);
                    //$('#test-result').mCustomScrollbar({
                    //    axis:'x'
                    //});
                }
                else {
                    layer.msg("获取说明失败", {time: 2000});
                }

            },
            error: function () {
                layer.msg("请求数据出错。。。");
            }
        });
    });
    //拼接测试查询json数据
    function makeJsonData() {
        var allInfo = {};
        var reqParamsInfo = [];
        var resParamsInfo = [];
        var errorParamsInfo = [];
        var singleReqParamsInfo = {};
        var singleResParamsInfo = {};
        var singleErrorParamsInfo = {};
        var serviceParamsInfo = {};
        var serviceBaseInfoObj = {
            serviceTypeId: serviceBaseInfo[0],
            serviceName: serviceBaseInfo[2],
            serviceContentTypeId: serviceBaseInfo[3],
            authId: serviceBaseInfo[5],
            serviceNote: serviceBaseInfo[7]
        };
        if (serviceBaseInfo[3] == "1") { //视图
            serviceBaseInfoObj.viewName = serviceBaseInfo[9];
        }
        else {
            serviceBaseInfoObj.dicName = serviceBaseInfo[9];
        }
        allInfo.interfaceId = serviceBaseInfo[8];
        allInfo.serviceBaseInfo = serviceBaseInfoObj;

        if (reqParamsTbody.find('tr').length > 0) {
            for (var i = 0; i < reqParamsTbody.find('tr').length; i++) {
                var curTr = reqParamsTbody.find('tr').eq(i);
                var curTd = curTr.find('td');
                var trId = curTr.attr('id');
                var isNecessary;
                if (curTd.eq(4).text() == "是") {
                    isNecessary = "0";
                }
                else {
                    isNecessary = "1";
                }
                singleReqParamsInfo = {};
                singleReqParamsInfo.id = trId;
                singleReqParamsInfo.oldName = curTd.eq(0).text();
                singleReqParamsInfo.newName = curTd.eq(1).text();
                singleReqParamsInfo.type = curTd.eq(2).text();
                singleReqParamsInfo.mappingMode = curTd.eq(3).text();
                singleReqParamsInfo.isNecessary = isNecessary;
                reqParamsInfo.push(singleReqParamsInfo);
            }
        }
        else {
            reqParamsInfo = [];
        }
        if (resParamsTbody.find('tr').length > 0) {
            for (var j = 0; j < resParamsTbody.find('tr').length; j++) {
                var curTr = resParamsTbody.find('tr').eq(j);
                var curTd = curTr.find('td');
                var trId = curTr.attr('id');
                singleResParamsInfo = {};
                //singleResParamsInfo.id = trId;
                singleResParamsInfo.oldName = curTd.eq(0).text();
                singleResParamsInfo.newName = curTd.eq(1).text();
                singleResParamsInfo.type = curTd.eq(2).text();
                resParamsInfo.push(singleResParamsInfo);
            }
        }
        else {
            resParamsInfo = [];
        }
        if (errorCodeTbody.find('tr').length > 0) {
            for (var k = 0; k < errorCodeTbody.find('tr').length; k++) {
                var curTr = errorCodeTbody.find('tr').eq(k);
                var curTd = curTr.find('td');
                var trId = curTr.attr('id');
                singleErrorParamsInfo = {};
                singleErrorParamsInfo.errorcodeId = trId;
                singleErrorParamsInfo.errorCode = curTd.eq(1).text();
                //singleErrorParamsInfo.errorSuggest = curTd.eq(1).text();
                //singleErrorParamsInfo.errorExplain = curTd.eq(2).text();
                errorParamsInfo.push(singleErrorParamsInfo);
            }
        }
        else {
            errorParamsInfo = [];
        }

        serviceParamsInfo.reqParamInfos = reqParamsInfo;
        serviceParamsInfo.resParamInfos = resParamsInfo;
        serviceParamsInfo.errorInfos = errorParamsInfo;
        allInfo.serviceParamsInfo = serviceParamsInfo;
        return allInfo;
    }

    //完成
    $('#viewStepThree .btn-complete').click(function () {
        var allInfo = makeJsonData();
        var params = {
            "interfaceId": allInfo.interfaceId,
            "baseInfo": {
                "permissionType": allInfo.serviceBaseInfo.authId,
                "contentType": allInfo.serviceBaseInfo.serviceContentTypeId,
                "comment": allInfo.serviceBaseInfo.serviceNote,
                "type": allInfo.serviceBaseInfo.serviceTypeId,
                "serviceName": allInfo.serviceBaseInfo.serviceName
            },
            "reqParamInfos": allInfo.serviceParamsInfo.reqParamInfos,
            "resParamInfos": allInfo.serviceParamsInfo.resParamInfos,
            "errorInfos": allInfo.serviceParamsInfo.errorInfos
        };
        //console.log(JSON.stringify(allInfo));
        //console.log(JSON.stringify(params));
        //return;
        $.ajax({
            //type: 'get',
            type: 'post',
            //url: '/testData/getWebServiceType.json',
            url: '/iwherelink/publishService.do',
            //data: JSON.stringify(params),
            data: JSON.stringify(params),
            dataType: 'json',
            contentType: 'application/json',
            success: function (data) {
                if (data.code == 0) {
                    layer.msg('发布成功', {time: 2000});
                    setTimeout(function () {
                        window.location.href = '/serviceManager.do';
                    }, 2000);
                }
                else {
                    layer.msg(data.message, {time: 2000});
                }
            },
            error: function () {
                layer.msg("请求数据出错。。。");
            }
        });
    })

});