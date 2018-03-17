$(function () {
    var stepContent = $('.fusion-content');
    var dataDisplay = $(".dataDisplay");
    var queryTest = $("#queryTest");//测试按钮
    var queryTestBack = $("#queryTestBack");//返回按钮
    var queryTestContent = $('.queryTest-content');//测试栏容器
    var addInquire = $("#addInquire");
    var addSort = $("#addSort");
    var stepOneContainer = $("#viewStepOne");
    var stepTwoContainer = $("#viewStepTwo");
    var stepThreeContainer = $("#viewStepThree");
    var query_condition = $("#query_condition");
    var sort_condition = $("#sort_condition");
    var condition = $(".condition");
    var conditions = $(".conditions");
    var condition_left = $(".condition_left");
    var condition_right = $(".condition_right");
    var addNodeBtn = $(".btn-add");
    var removeNodeBtn = $(".btn-remove");
    var dbTree;
    var wsTree;
    var mixTree;
    var selectAllNode = [];  //选中的所有节点，合并树时用
    var selectNodes = []; //数据融合时用
    var reNameArr = []; //
    var treeJson = {};
    var viewCookieDataFroms;
    var viewCookieDataColums;
    var selectAllForms; //选中的表
    var dataSelectForms = []; //后台传过来的表
    var noRepeatDataSelectForms;
    var successFlags = []; //用来判断表是否加载完毕
    var selectedLatLng;
    var latlngArr = [];
    //初始化侧边栏的点击事件
    $('.sub-menu a[href="./createView.do"]').addClass('current_page').parents('.third-level').show().parent().addClass('open');

    //销毁cookie
    $.cookie.json = true;
    var viewCookieData = $.cookie('viewData');
    $.removeCookie('viewData');
    //console.log(JSON.stringify(viewCookieData));
    //初始化树设置参数
    var settings = {
        check: {
            enable: true
        },
        view: {
            showIcon: false
        },
        data: {
            simpleData: {
                enable: true
            }
        },
        callback: {
            beforeClick: disableClick,
            onClick: setClickChecked
        }
    };


    //获取树节点数据并初始化树
    function getTreeNode(url, obj, str) {
        $.ajax({
            type: "get",
            url: url,
            dataType: 'json',
            success: function (data) {
                if (data.code == 0) {
                    if (data.data.length == 0) {
                        $(obj).html('暂无数据');
                    }
                    else {
                        //隐藏复选框
                        //for(var i=0;i<data.data.length;i++){
                        //    data.data[i].nocheck=true;
                        //}
                        //console.log(data);
                        //给不同的数据id添加不同的标志
                        for (var i = 0; i < data.data.length; i++) {
                            data.data[i].id = str + data.data[i].id;
                            data.data[i].pId = str + data.data[i].pId;
                        }
                        $(obj).empty();
                        var tree = $.fn.zTree.init(obj, settings, data.data);
                        tree.expandAll(true);
                        treeJson[str] = data.data;
                        if (treeJson.db && treeJson.ws && viewCookieData) {  //修改视图
                            //遍历viewCookieData，加载视图数据树
                            //console.log(JSON.stringify(viewCookieData));
                            //console.log(viewCookieData);
                            var viewCookieDataFroms = JSON.parse(viewCookieData[0].froms);
                            for (var j = 0; j < viewCookieDataFroms.length; j++) {
                                var sourceForm = viewCookieDataFroms[j].source;
                                var targetForm = viewCookieDataFroms[j].target;
                                for(var t=0;t<sourceForm.length;t++){
                                    loadDataTree(sourceForm[t]);
                                    loadDataTree(targetForm[t]);
                                }

                            }
                        }
                    }
                }
                else {
                    layer.alert("加载树节点数据失败，请刷新");
                }
            },
            error: function () {
                layer.alert("加载树节点数据失败，请刷新");
            }
        });
    }


    getTreeNode('/iwherelink/getAllDatabase.do', $("#tree1"), "db");
    getTreeNode('/iwherelink/getAllWebService.do', $("#tree3"), "ws");

    //getTreeNode('/testData/createView/tree1.json', $("#tree1"), "db");
    //getTreeNode('/testData/createView/tree2.json', $("#tree3"), "ws");

    $(".sourceTree").mCustomScrollbar({
            axis: 'yx'
        }
    );
    $("#jsplumb-canvas").mCustomScrollbar({
            axis: 'yx'
        }
    );
    $(".queryTestTable").mCustomScrollbar({
            axis: 'yx'
        }
    );

    //$(".conditions").mCustomScrollbar();
    //初始化已选择的树
    var selectedTree = $.fn.zTree.init($("#tree2"), settings, []);

    //移动数据库节点
    var currentAllNodes = [];     //选中节点及所有父节点的集合
    addNodeBtn.eq(0).click(function () {
        dbTree = $.fn.zTree.getZTreeObj("tree1");
        moveTreeNode(dbTree, selectedTree);
    });
    //移动服务节点
    addNodeBtn.eq(1).click(function () {
        wsTree = $.fn.zTree.getZTreeObj("tree3");
        moveTreeNode(wsTree, selectedTree);
    });

    //移除已经选中的树节点
    removeNodeBtn.eq(0).click(function () {
        dbTree = $.fn.zTree.getZTreeObj("tree1");
        removeTreeNode(selectedTree, dbTree);
    });
    //移除已经选中的树节点
    removeNodeBtn.eq(1).click(function () {
        wsTree = $.fn.zTree.getZTreeObj("tree3");
        removeTreeNode(selectedTree, wsTree);
    });


    //设置点击和复选框联动
    function setClickChecked(e, treeId, treeNode) {
        var tree = $.fn.zTree.getZTreeObj(treeId);
        tree.checkNode(treeNode, !treeNode.checked, true);
    }

    //移动节点
    function moveTreeNode(tree1, tree2) {
        var nodes = tree1.getCheckedNodes();    //当前选中的所有节点
        var node = tree1.getSelectedNodes();    //当前点击选中的节点
        if (nodes.length <= 0) {
            layer.msg("请先选中要移动的节点", {time: 2000});
        }
        else {
            currentAllNodes = [];
            for (var m = 0; m < nodes.length; m++) {
                var strs = {
                    id: nodes[m].id,
                    name: nodes[m].name,
                    mId: nodes[m].mId,
                    pId: nodes[m].pId,
                    isParent: nodes[m].isParent
                };
                currentAllNodes.push(strs);
                selectAllNode.push(strs);
            }
            var noRepeatedArr = deleteRepeat(selectAllNode);
            refreshTree('tree2', noRepeatedArr);
            disableCurNode(tree1, currentAllNodes);
        }
    }

    //节点去重
    function deleteRepeat(arr) {
        for (var i = 0; i < arr.length - 1; i++) {
            for (var j = i + 1; j < arr.length; j++) {
                if (arr[i].id == arr[j].id) {
                    arr.splice(j, 1);
                    j--;
                }
            }
        }
        return arr;
    }

    //刷新树
    function refreshTree(id, data) {
        $.fn.zTree.destroy(id);
        //for (var i = 0; i < data.length; i++) {
        //    data[i].nocheck = true;
        //}
        tree = $.fn.zTree.init($("#" + id), settings, data);
        tree.expandAll(true);
    }

    //设置当前节点的不可用状态样式和复选框状态
    function disableCurNode(tree, node) {
        var treeId = tree.setting.treeId;
        var flag = true;
        var singleNode = filterNoChildrenNodes(node);

        var originalSingleNode = [];
        //获取拥有所有属性的节点
        for (var k = 0; k < singleNode.length; k++) {
            var id = singleNode[k].id;
            var originalNode = tree.getNodeByParam("id", id);
            originalSingleNode.push(originalNode);
        }
        tree.cancelSelectedNode();

        //设置无子节点的节点状态和复选框状态
        for (var i = 0; i < originalSingleNode.length; i++) {
            setStatus(originalSingleNode[i], tree);
        }
        //设置父节点的状态和复选框状态
        for (var m = 0; m < originalSingleNode.length; m++) {
            setParentNodeStatus(originalSingleNode[m], tree);
        }
    }

    //设置父节点的状态和复选框状态
    function setParentNodeStatus(node, tree) {
        if (node.getParentNode()) {
            if (node.getParentNode().children.length <= 1) {
                setStatus(node.getParentNode(), tree);
                setParentNodeStatus(node.getParentNode(), tree);
            }
            else {
                for (var j = 0; j < node.getParentNode().children.length; j++) {
                    var flag = true;
                    if (node.getParentNode().children[j].chkDisabled == false) {
                        flag = false;
                        break;
                    }
                }
                if (flag) {
                    setStatus(node.getParentNode(), tree);
                    setParentNodeStatus(node.getParentNode(), tree);
                }
            }
        }
    }

    //设置节点为灰色，复选框不可点击
    function setStatus(node, tree) {
        var treeId = tree.setting.treeId;
        var tId = node.tId;
        var nodeDom = $("#" + treeId).find("#" + tId + "_a");
        nodeDom.addClass('disabledSelectedNode');
        tree.setChkDisabled(node, true);
    }

    //设置节点为黑色，复选框可点击
    function resetStatus(node, tree) {
        var treeId = tree.setting.treeId;
        var tId = node.tId;
        var nodeDom = $("#" + treeId).find("#" + tId + "_a");
        nodeDom.removeClass('disabledSelectedNode');
        tree.setChkDisabled(node, false);
        tree.checkNode(node, false);
    }

    //设置选中的节点不可再次点击
    function disableClick(treeId, treeNode, clickFlag) {
        var a = $("#" + treeNode.tId + "_a");
        if (a.hasClass('disabledSelectedNode')) {
            return false;
        }
    }

    //禁用节点被选中事件
    function forbiddenClick(treeId, treeNode, clickFlag) {
        return (treeNode.id == 1);
    }

    //从选中的树中移除节点
    function removeTreeNode(sourceTree, targetTree) {
        var selectedTreeNode = sourceTree.getCheckedNodes();
        if (selectedTreeNode.length <= 0) {
            layer.msg("请先选中要移动的节点", {time: 2000});
        }
        else {
            if (!targetTree) {
                layer.msg("目标树选择错误", {time: 2000});
                return;
            }
            var noChildrenNodes = filterNoChildrenNodes(selectedTreeNode);

            var chkDisabledNode = targetTree.getNodesByParam("chkDisabled", true);
            var disabledTreeNode = targetTree.transformToArray(chkDisabledNode);
            var targetStr = disabledTreeNode[0].id.substring(0, 2);
            var isSame = true;
            for (var m = 0; m < selectedTreeNode.length; m++) {
                var eachStr = selectedTreeNode[m].id.substring(0, 2);
                if (eachStr != targetStr) {
                    isSame = false;
                    break;
                }
            }
            if (!isSame) {
                layer.msg("目标树选择错误或者只能选择一种类型（数据库或者服务）", {time: 3000});
                return;
            }
            for (var i = 0; i < noChildrenNodes.length; i++) {
                for (var j = 0; j < disabledTreeNode.length; j++) {
                    if (noChildrenNodes[i].id == disabledTreeNode[j].id) {
                        sourceTree.removeNode(noChildrenNodes[i]);
                        //从selectAllNode中删除要移除的数据
                        for (var k = 0; k < selectAllNode.length; k++) {
                            if (selectAllNode[k].id == noChildrenNodes[i].id) {
                                selectAllNode.splice(k, 1);
                                k--;
                            }
                        }
                        removeFather(noChildrenNodes[i], sourceTree);
                        resetStatus(disabledTreeNode[j], targetTree);
                        resetFatherStatus(disabledTreeNode[j], targetTree);

                    }
                }
            }
            sourceTree.refresh();
        }
    }

    //从选中的节点中筛选出没有孩子的节点
    function filterNoChildrenNodes(arr) {
        var noChildrenNodes = [];
        for (var i = 0; i < arr.length; i++) {
            if (!(arr[i].isParent)) {
                noChildrenNodes.push(arr[i]);
            }
        }
        return noChildrenNodes;
    }

    //删除父节点
    function removeFather(node, tree) {
        var fNodes = node.getParentNode();
        if (fNodes) {
            if (fNodes.children.length == 0) {
                tree.removeNode(fNodes);
                for (var k = 0; k < selectAllNode.length; k++) {
                    if (selectAllNode[k].id == fNodes.id) {
                        selectAllNode.splice(k, 1);
                        k--;
                    }
                }
                removeFather(fNodes, tree);
            }
        }
    }

    //恢复父节点的状态
    function resetFatherStatus(node, tree) {
        if (node.getParentNode()) {
            resetStatus(node.getParentNode(), tree);
            resetFatherStatus(node.getParentNode(), tree);
        }
    }

    //初始化连接器
    var instance = jsPlumb.getInstance({
        Endpoint: ["Dot", {radius: 2}],
        Connector: "StateMachine",
        HoverPaintStyle: {stroke: "#e8c260", strokeWidth: 2},
        ConnectionOverlays: [
            ["Arrow", {
                location: 1,
                id: "arrow",
                length: 14,
                foldback: 0.8
            }],
            ["Label", {label: "CROSSJOIN", id: "label", cssClass: "aLabel"}]
        ],
        Container: "canvas"
    });
    var changeLabel = $('.changeLabel');

    function hideChangeLabel() {
        changeLabel.hide();
        $(".tablebg-grey").hide();
    }

    var _info;
    var labelId;
    changeLabel.find('h4 img').on('click', hideChangeLabel);
    //设置连接查询方式
    changeLabel.find('#confirmLabel').on('click', function () {
        hideChangeLabel();
        _info.setLabel($('#labelType').val());
    });


    //下一步
    var btnNext = $(".btn-next");
    var btnPrev = $(".btn-prev");
    var stepLi = $(".processStep").find("li");
    //第一步的下一步
    btnNext.eq(0).click(function () {
        var tree = $.fn.zTree.getZTreeObj('tree2');
        var nodes = tree.getNodes();
        if (nodes.length <= 0) {
            layer.msg('请选择数据源', {time: 2000});
            return;
        }
        stepOneContainer.hide();
        stepTwoContainer.show();
        $('#jsplumb-connect').show();
        stepThreeContainer.hide();
        stepLi.removeClass("activeStep");
        stepLi.eq(1).addClass("activeStep");
        //初始化融合树
        mixTree = $.fn.zTree.init($("#mixTree"), {
            check: {
                enable: false
            },
            view: {
                showIcon: false
            },
            data: {
                simpleData: {
                    enable: true
                }
            },
            callback: {
                beforeClick: forbiddenClick
                //beforeClick: disableClick,
                //onClick: ajaxConnectWin  //点击节点，加载连线窗口
            }
        }, selectAllNode);
        mixTree.expandAll(true);
        $('#query_condition').attr('checked', false);
        $('#sort_condition').attr('checked', false);
        conditions.hide();
        condition_left.hide();
        condition_right.hide();
        $("#jsplumb-canvas").mCustomScrollbar('update');
        reNameArr = [];
        //所有节点设为不可用状态,同时加载所有选中的连接器
        var mixTreeAllNodes = mixTree.transformToArray(mixTree.getNodes());
        //console.log(mixTreeAllNodes);
        for (var n = 0; n < mixTreeAllNodes.length; n++) {
            setStatus(mixTreeAllNodes[n], mixTree);
            ajaxConnectWin(mixTreeAllNodes[n]);
        }
        if (viewCookieData) {  //修改视图

            viewCookieDataFroms = JSON.parse(viewCookieData[0].froms);
            viewCookieDataColums = JSON.parse(viewCookieData[0].colums);
            var viewCookieDataWheres = JSON.parse(viewCookieData[0].wheres);
            selectAllForms = remakeForm(selectAllNode);
            dataSelectForms = [];
            successFlags = [];
            for (var j = 0; j < viewCookieDataFroms.length; j++) {  //遍历froms
                var sourceFormObj = viewCookieDataFroms[j].source;
                var targetFormObj = viewCookieDataFroms[j].target;
                var sourceKeyName = getTableNameField(sourceFormObj);
                var sourceKeyNameArr = sourceKeyName.split(".");
                dataSelectForms.push([sourceKeyNameArr[0], sourceKeyNameArr[1], sourceKeyNameArr[2], sourceKeyNameArr[3]].join("."));
                var targetKeyName = getTableNameField(targetFormObj);
                if (targetKeyName !== 'undefine') {
                    var targetKeyNameArr = targetKeyName.split(".");
                    dataSelectForms.push([targetKeyNameArr[0], targetKeyNameArr[1], targetKeyNameArr[2], targetKeyNameArr[3]].join("."));
                }
            }
            //后台传过来的表去重
            noRepeatDataSelectForms = arrDeleteRepeat(dataSelectForms);
            if (selectAllForms.sort().toString() == noRepeatDataSelectForms.sort().toString()) {
                //如果没有修改数据源，则遍历wheres
                if (viewCookieDataWheres !== null) {
                    $('#query_condition').attr('checked', true);
                    showWhere();
                    condition_left.find('.condition').remove();
                    for (var m = 0; m < viewCookieDataWheres.length; m++) {   //遍历wheres
                        var sourceWhereField = viewCookieDataWheres[m].source;
                        var targetWhereField = viewCookieDataWheres[m].target;
                        var label = viewCookieDataWheres[m].label;
                        var sourceWhereValue = parseWhere(sourceWhereField);
                        var targetWhereValue = parseWhere(targetWhereField);
                        getMultiWhereHtml();
                        writeWhereValue(m, sourceWhereValue, label, targetWhereValue);
                    }
                }
            }
        }

    });
    //数组去重
    function arrDeleteRepeat(arr) {
        for (var i = 0; i < arr.length - 1; i++) {
            for (var j = i + 1; j < arr.length; j++) {
                if (arr[i] == arr[j]) {
                    arr.splice(j, 1);
                    j--;
                }
            }
        }
        return arr;
    }

    //第二步的下一步
    btnNext.eq(1).click(function () {
        var group = $('#canvas').find('.group-container');
        if (group.length <= 0) {
            layer.msg('请先配置融合', {time: 2000});
            return;
        }
        stepOneContainer.hide();
        stepTwoContainer.hide();
        stepThreeContainer.show();
        stepLi.removeClass("activeStep");
        stepLi.eq(2).addClass("activeStep");
        //$("#viewName").val("");
        //$("#viewVersion").val("");
        if (viewCookieData) { //修改视图
            $("#viewName").val(viewCookieData[0].name);
            $("#viewVersion").val(viewCookieData[0].comment);
        }
    });
    //第二步的上一步
    btnPrev.eq(0).click(function () {
        stepOneContainer.show();
        stepTwoContainer.hide();
        stepThreeContainer.hide();
        stepLi.removeClass("activeStep");
        stepLi.eq(0).addClass("activeStep");
        queryTestContent.hide();
        $('#canvas').show();
        //先清空连接器
        var groupContainer = $('.group-container');
        if (groupContainer.length > 0) {
            for (var i = 0; i < groupContainer.length; i++) {
                var group = groupContainer.eq(i).attr("group");
                instance.removeGroup(group);
            }
            instance.reset();
        }
    });
    //第三步的上一步
    btnPrev.eq(1).click(function () {
        stepOneContainer.hide();
        stepTwoContainer.show();
        stepThreeContainer.hide();
        stepLi.removeClass("activeStep");
        stepLi.eq(1).addClass("activeStep");
    });
    //"查询条件"输入框是否显示
    query_condition.change(function () {
        var this_checked = $(this).prop("checked");
        if (this_checked) {
            showWhere();
        } else {
            hideWhere();
        }
    });
    function updateSelect() {   //重新获取字段添加到select里面
        var selects = $('.select_field');
        for (var i = 0; i < selects.length; i++) {
            var v = selects.eq(i).find('option:selected').attr('value');
            v = v ? v : 0;
            selects.eq(i).empty().append(getSelect());
            var newSelect = selects.eq(i).find("option");
            var match = false;
            for (var n = 0; n < newSelect.length; n++) {
                if (newSelect.eq(n).attr("value") == v) {
                    match = true;
                    break;
                }
            }
            if (!match) {
                v = 0;
            }
            selects.eq(i).val(v);
        }

    }

    function getSelect() {      //获取表的字段
        var table = $('.ligatureTable');
        if (table.length) {
            var select = '<option value="0">请选择字段..</option>';
            for (var i = 0; i < table.length; i++) {
                var tableTitleName = table.eq(i).find('div.ligature-title').find("span").attr('name');
                var nodeid = table.eq(i).attr("nodeid");
                var type = table.eq(i).attr("type");
                var mid = table.eq(i).attr("mid");
                var tHeader = tableTitleName;
                var tHeaderNameArr = getOriginalNameAndNewName(tHeader);
                var tBody = table.eq(i).find('ul li');
                if (tHeaderNameArr[1] == "") {
                    select += '<optgroup label=' + tHeader + ' nodeid="' + nodeid + '" type="' + type + '" mid="' + mid + '" >';
                }
                else {
                    select += '<optgroup label=' + tHeaderNameArr[1] + ' nodeid="' + nodeid + '" type="' + type + '" mid="' + mid + '" >';
                }
                if (tBody.length) {
                    var liLen;
                    if(table.find('.btn-active').attr('name')=='none-join'){
                        liLen= tBody.length;
                    }
                    else{
                        liLen= tBody.length-1;
                    }
                    for (var n = 0; n < liLen; n++) {
                        var listName = tBody.eq(n).find("span").attr('name');
                        var listNameArr = getOriginalNameAndNewName(listName);
                        var listOriginalName = listNameArr[0];
                        var listNewName = listNameArr[1];
                        var list;

                        if (listNewName == "") {
                            list = listOriginalName;
                        }
                        else {
                            list = listNewName;
                        }
                        if (tHeaderNameArr[1] == "") {
                            select += '<option value=' + tHeader + '.' + listOriginalName + '>' + tHeader + "." + list + '</option>';
                        }
                        else {
                            select += '<option value=' + tHeaderNameArr[0] + '.' + listOriginalName + '>' + tHeaderNameArr[1] + "." + list + '</option>';

                        }
                    }
                }
                select += '</optgroup>';
            }
        }
        return select;
    }

//添加“排序”条件
    sort_condition.change(function () {
        var this_checked = $(this).prop("checked");
        if (this_checked) {
            showOrder();
        } else {
            hideOrder();
        }
    });

    function addSwitchListen() {//排序按钮事件
        if ($(this).attr('name') == "ASC") {
            $(this).find('span').last().show();
            $(this).find('span').first().hide();
            $(this).find('.switch_bar').animate({"left": '4px'});
            $(this).attr({'name': 'DESC'});
            $(this).css('background', '#82858a');
        } else {
            $(this).find('span').last().hide();
            $(this).find('span').first().show();
            $(this).find('.switch_bar').animate({"left": "40px"});
            $(this).attr({'name': 'ASC'});
            $(this).css('background', '#2196F3');
        }
    }

    //点击节点加载连接器窗口
    function ajaxConnectWin(treeNode) {
        var children = treeNode.children;
        if (!children) {
            var str = treeNode.id.substring(0, 2);
            var id = treeNode.id.substring(2);
            var parents = treeNode.getPath();
            //如果是数据库表
            if (str == 'db') {
                var obj = {
                    mId: parents[1].mId,
                    type: parents[0].mId,
                    nodeId: treeNode.id
                };
                addTable(parents[1].mId, treeNode.name, obj);
            }
            //如果是服务表
            else {
                var wsType;
                if (parents.length > 2) {
                    wsType = parents[1].mId;

                }
                else {
                    wsType = 1;
                }
                var wsObj = {
                    type: wsType,
                    mId: treeNode.mId,
                    nodeId: treeNode.id
                };
                addWsTable(parents[parents.length - 1].mId, treeNode.name, wsObj);
            }
        }
    }


    //加载数据库表内字段
    function addTable(id, name, obj) {//向右边空白处添加div列表
        $.ajax({
            url: '/iwherelink/getColumnByTable.do',
            //url: '/testData/table2.json',
            type: 'get',
            data: {
                databaseId: Number(id),
                tablename: name
            },
            dataType: 'json',
            success: function (data) {
                if (data.code == 1) {
                    layer.alert('请求' + name + '表内字段出错，请刷新');
                }
                else {
                    var newName;
                    if (name.length > 14) {
                        newName = name.substring(0, 14) + '...';
                    }
                    else {
                        newName = name;
                    }
                    var tHeader = '<div id=' + name + '  nodeId=' + obj.nodeId + '    type=' + obj.type + ' mId=' + obj.mId + ' class="ligatureTable group-container"   group=' + obj.nodeId + '> ' +
                        '<div class="ligature-title"><input type="checkbox" class="pull-left ligature-select-all"  checked=true /><span name="' + name + '">' + newName + '</span><i class="icon-edit" title="添加别名" ></i>' +
                        '<div class="btn-group"> <button class="btn btn-active"  name="none-join">无</button><button class="btn"  name="point-join">点</button><button class="btn" name="surface-join">面</button></div>' +
                        '</div>';
                    var tBody = '<div class="all-field"><ul>';
                    for (var i = 0; i < data.data.length; i++) {
                        var id = name + "_" + data.data[i];
                        var fieldName = data.data[i];
                        if (fieldName.length > 10) {
                            var fieldName1 = fieldName.substring(0, 10) + '...';
                        }
                        else {
                            fieldName1 = fieldName;
                        }
                        tBody += ' <li class="t" latLng="" id=' + id + '><div class="ep" action=""></div><input name=' + name + ' value=' + data.data[i] + ' type="checkbox" class="pull-left" style="margin-top:3px;" checked=checked /><span name="' + fieldName + '">' + fieldName1 + '</span><i class="icon-edit pull-left" title="添加别名"></i></li> ';
                    }
                    //tBody += ' <li class="t lastLigature" id=' + name + "_latlng" + '><div class="ep" action=""></div></li> ';
                    var tFoot = '</div></ul> </div>';
                    stepContent.append(tHeader + tBody + tFoot);
                    drop();
                    var allTableGroup = $('.group-container');
                    if (viewCookieData && selectAllForms.sort().toString() == noRepeatDataSelectForms.sort().toString()) {    //数据源没有变则修改视图,加载完所有的表之后再连线
                        for (var j = 0; j < viewCookieDataFroms.length; j++) {  //遍历froms
                            var sourceFormObj = viewCookieDataFroms[j].source;
                            var targetFormObj = viewCookieDataFroms[j].target;
                            var label = viewCookieDataFroms[j].label;
                            setWinData(sourceFormObj, name, obj.mId);    //加载source窗口数据，并设置窗口
                            if (targetFormObj !== "undefine") {     //两张表相连
                                setWinData(targetFormObj, name, obj.mId);     //加载target窗口数据，并设置窗口
                                if (allTableGroup.length == noRepeatDataSelectForms.length) {
                                    drawConnector(sourceFormObj, targetFormObj, label);  //连线
                                }
                            }
                        }
                    }
                }
            },
            error: function () {
                layer.alert('请求表内字段出错，请刷新');
            }
        });
    }

    //加载服务表内字段
    function addWsTable(id, name, obj) {
        $.ajax({
            url: '/iwherelink/getDataService.do',
            //url: '/testData/table2.json',
            type: 'get',
            data: {
                id: Number(id)
            },
            dataType: 'json',
            success: function (data) {
                if (data.code == 1) {
                    layer.alert('请求表内字段出错，请刷新');
                }
                else {
                    successFlags.push(1);
                    var tree = $.fn.zTree.getZTreeObj('mixTree');
                    var node = tree.getSelectedNodes();
                    tree.cancelSelectedNode();
                    //setStatus(node[0], tree);
                    var newName;
                    if (name.length > 14) {
                        newName = name.substring(0, 14) + '...';
                    }
                    else {
                        newName = name;
                    }
                    var tHeader = '<div id=' + name + '  nodeId=' + obj.nodeId + '    type=' + obj.type + ' mId=' + obj.mId + ' class="ligatureTable group-container"   group=' + obj.nodeId + '> ' +
                        '<div class="ligature-title"><input type="checkbox" class="pull-left ligature-select-all"  checked=true /><span name=' + name + '>' + newName + '</span><i class="icon-edit" title="添加别名" style="margin-left: 10px"></i>' +
                            //'<img class="pull-right ligatureRemove" src="image/portlet-remove-icon-white.png" style="margin:3px 0 0 4px;">' +
                        '</div>';
                    var tBody = '<div class="all-field"><ul>';
                    for (var i = 0; i < data.data.length; i++) {
                        var id = name + "_" + data.data[i];
                        var fieldName = data.data[i];
                        if (fieldName.length > 10) {
                            var fieldName1 = fieldName.substring(0, 10) + '...';
                        }
                        else {
                            fieldName1 = fieldName;
                        }
                        tBody += ' <li class="t" latLng="" id=' + id + '><div class="ep" action=""></div><input name=' + name + ' value=' + data.data[i] + ' type="checkbox" class="pull-left" style="margin-top:3px;" checked=checked /><span name="' + fieldName + '">' + fieldName1 + '</span><i class="icon-edit pull-left" title="添加别名" style="margin: 4px 0 0 1px"></i></li> ';
                    }
                    tBody += ' <li class="t lastLigature" id=' + name + "_latlng" + '><div class="ep" action=""></div></li> ';
                    var tFoot = '</div></ul> </div>';
                    stepContent.append(tHeader + tBody + tFoot);
                    drop();
                    if (viewCookieData && selectAllForms.sort().toString() == dataSelectForms.sort().toString()) {//数据源没有变则修改视图
                        for (var j = 0; j < viewCookieDataFroms.length; j++) {  //遍历froms
                            var sourceFormObj = viewCookieDataFroms[j].source;
                            var targetFormObj = viewCookieDataFroms[j].target;
                            var label = viewCookieDataFroms[j].label;
                            setWinData(sourceFormObj, name, obj.mId);    //加载source窗口数据，并设置窗口
                            if (targetFormObj !== "undefine") {     //两张表相连
                                setWinData(targetFormObj, name, obj.mId);     //加载target窗口数据，并设置窗口
                                if (dataSelectForms.length == successFlags.length) {
                                    drawConnector(sourceFormObj, targetFormObj, label);  //连线
                                }
                            }
                        }
                    }
                }
            },
            error: function () {
                layer.alert('请求表内字段出错，请刷新');
            }
        });
    }

    function drop() {  //给列表div添加连线事件
        var table = $('.ligatureTable');
        var lastTable = table.eq(table.length - 1);
        var windows = lastTable;
        //var ligatureRemove = windows.find("div.ligature-title>img");
        var editIcon = lastTable.find("i.icon-edit");
        $(".all-field").mCustomScrollbar({
                axis: 'yx'
            }
        );
        //删除组
        //ligatureRemove.on("click", function () {
        //    var group = $(this).parent().parent().attr("group");
        //    instance.removeGroup(group);
        //
        //    var tree = $.fn.zTree.getZTreeObj('mixTree');
        //    var nodeId = $(this).parent().parent().attr("nodeId");
        //    var disabledNode = tree.getNodesByParam('chkDisabled', true);
        //    for (var i = 0; i < disabledNode.length; i++) {
        //        if (disabledNode[i].id == nodeId) {
        //            resetStatus(disabledNode[i], tree);
        //        }
        //    }
        //});

        //添加别名和设定经纬度
        editIcon.on("click", function () {
            var _this = $(this);
            var type;
            var curLi = _this.parent();
            var curLiVal = curLi.find('span').attr('name');
            var curLiLatLng = curLi.attr("latLng");
            var curLiValArr = getOriginalNameAndNewName(curLiVal);
            var curLiReName = curLiValArr[1];
            var joinMethod = $(this).parents('.ligatureTable').find('.ligature-title .btn-active').attr('name');
            if (curLi.hasClass('ligature-title')) {
                type = "form";  //表名重命名
            }
            else {
                type = "column"; //列名重命名
            }
            renameLayer(type, joinMethod, curLiReName, curLiLatLng, function (index, layerO) {

                var newRename = $(layerO).find("#addAlias").val().trim();
                var selected = $(layerO).find("#latLng");
                selectedLatLng = $(layerO).find("#latLng option:selected").val();
                var newNameAfterRename;
                var newNameAttrAfterRename;
                (newRename == '') ? newNameAttrAfterRename = curLiValArr[0] : newNameAttrAfterRename = curLiValArr[0] + '(' + newRename + ')';
                (newNameAttrAfterRename.length > 14) ? newNameAfterRename = newNameAttrAfterRename.substring(0, 14) + '...' : newNameAfterRename = newNameAttrAfterRename;

                //表名重命名
                if (type == 'form') {
                    var curLiReNameIndex = $.inArray(curLiReName, reNameArr);
                    if (curLiReNameIndex >= 0) {  //如果之前已经重命名，则把该名从数组中删除
                        reNameArr.splice(curLiReNameIndex, 1);
                    }
                    if ($.inArray(newRename, reNameArr) >= 0) {  //表名重复
                        layer.msg('一个视图内表名不能重复', {time: 2000});
                        return;
                    }
                    reNameArr.push(newRename);
                    curLi.find('span').text(newNameAfterRename).attr({'name': newNameAttrAfterRename});
                }
                if (selected.length > 0) { //有空间关联
                    if (selectedLatLng !== '') { //设置了空间关联
                        if (curLi.attr('latLng') !== '') {  //该字段之前已经设置为空间关联
                            if (curLi.attr('latLng') !== selectedLatLng) {
                                layer.msg('该字段已经设置过空间关联');
                            }
                            else {
                                setLiValAttr(curLi, newNameAfterRename, newNameAttrAfterRename, selectedLatLng);

                                fillLatLng(curLi, newRename, curLiValArr[0], selectedLatLng);
                            }
                        }
                        else {
                            setLiValAttr(curLi, newNameAfterRename, newNameAttrAfterRename, selectedLatLng);
                            fillLatLng(curLi, newRename, curLiValArr[0], selectedLatLng);
                        }
                    }
                    else {  //未设置了空间关联
                        if (curLi.attr('latLng') !== '') {  //该字段之前已经设置为空间关联
                            curLi.find('span').text(newNameAfterRename).attr({
                                'name': newNameAttrAfterRename
                            });
                            curLi.siblings('*:last').find('.' + curLi.attr('latLng')).find('span').text(newNameAfterRename).attr('name', newNameAttrAfterRename);
                        }
                        else {
                            curLi.find('span').text(newNameAfterRename).attr({
                                'name': newNameAttrAfterRename,
                                'join': ''
                            });
                        }
                    }
                }
                else {   //无空间关联
                    curLi.find('span').text(newNameAfterRename).attr({'name': newNameAttrAfterRename, 'join': ''});
                }
                updateSelect();
                updateInput(curLi, curLiValArr[0], newRename);
                layer.close(index);

                latlngArr.push(selectedLatLng);


            });

        });

        //设置当前对象的值和属性
        function setLiValAttr(curLi, newNameAfterRename, newNameAttrAfterRename, selectedLatLng) {
            curLi.find('span').text(newNameAfterRename).attr({
                'name': newNameAttrAfterRename,
                'join': selectedLatLng
            });
            curLi.attr('latLng', selectedLatLng);
        }

        //重命名后根据名称修改where语句
        function updateInput(obj, originalName, newName) {
            var inputs = $(".input_content[original]");
            for (var i = 0; i < inputs.length; i++) {
                var curInput = inputs.eq(i);
                var curInputOriginalForm = curInput.attr('original').split('.');
                var curInputOriginalFormName = curInputOriginalForm[0];
                var curInputOriginalColumn = curInputOriginalForm[1];
                //如果是表名重命名，找到要重命名的那个input框
                if (obj.hasClass('ligature-title')) {
                    if( curInputOriginalFormName == originalName){
                        var objId = obj.parent().attr('id');
                        var objColumnName = objId + "_" + curInputOriginalColumn;
                        var objColumnLiName = obj.next().find('li[id=' + objColumnName + ']').find('span').text();
                        var objColumnLiNameArr = getOriginalNameAndNewName(objColumnLiName);
                        //判断列是否重命名
                        if (objColumnLiNameArr[1] == "") {
                            curInput.val(newName + '.' + objColumnLiNameArr[0]);
                        }
                        else {
                            curInput.val(newName + '.' + objColumnLiNameArr[1]);
                        }
                    }
                }
                //列名重命名
                else {
                    var titleFormName = obj.parents('.all-field').prev().find('span').attr('name');
                    var titleFormNameArr = getOriginalNameAndNewName(titleFormName);
                    var originalColumnField = titleFormNameArr[0] + '.' + originalName;
                    if (curInput.attr('original') == originalColumnField) {
                        //判断表名是否重命名
                        if (titleFormNameArr[1] == "") {
                            curInput.val(titleFormNameArr[0] + '.' + newName);
                        }
                        else {
                            curInput.val(titleFormNameArr[1] + '.' + newName);
                        }
                    }
                }


            }
        }

        //填充经纬度到最后一行
        function fillLatLng(curLi, newRename, originVal, selectedLatLng) {
            var methodOption = {
                lat: '纬度',
                lng: '经度',
                leftTopLat: '左上角经度',
                leftTopLng: '左上角纬度',
                rightBottomLng: '右下角经度',
                rightBottomlat: '右下角纬度'
            };
            var doc = curLi.siblings('*:last');
            var newNameAttrAfterRename;
            var newNameAfterRename;
            if (newRename == '') {
                newNameAttrAfterRename = originVal;
            }
            else {
                newNameAttrAfterRename = originVal + '(' + newRename + ')';
            }

            if (newNameAttrAfterRename.length > 14) {
                newNameAfterRename = newNameAttrAfterRename.substring(0, 14) + '...';
            }
            else {
                newNameAfterRename = newNameAttrAfterRename;
            }
            if (doc.find('.' + selectedLatLng).length > 0) { //之前未设置过了
                doc.find('.' + selectedLatLng).remove();
                curLi.parent().find('li[latlng="' + selectedLatLng + '"]').find('span').removeAttr('join');
            }
            doc.append('<div class="join ' + selectedLatLng + '">' +
                '<img class="pull-left latLngRemove" src="image/portlet-remove-icon-white.png">' +
                '<em>' + methodOption[selectedLatLng] + '：</em><span name="' + newNameAttrAfterRename + '">' + newNameAfterRename + '</span></div>');
            doc.find('.latLngRemove').unbind().click(function () {
                var curLatlng = $(this).parent().attr('class').split(' ')[1];
                $(this).parent().remove();
                curLi.parents('ul').find('li[latLng="' + curLatlng + '"]').find('span').attr('join', '');
                curLi.parents('ul').find('li[latLng="' + curLatlng + '"]').attr('latLng', '');
            });
        }

        updateSelect();
        var item = lastTable.find('.t');
        instance.batch(function () {
            for (var i = 0; i < windows.length; i++) {
                initWindow(windows[i], false);
                var groupId = $(windows).attr('group');
                instance.addGroup({
                    el: windows,
                    id: groupId,
                    constrain: true,
                    revert: false,
                    anchor: "Continuous"
                });
            }
            for (var j = 0; j < item.length; j++) {
                initNode(item[j], false);
            }
            instance.bind('connection', function (info) {
                var sourceId = info.sourceId;
                var targetId = info.targetId;
                var sourceFormName = deleteLast(sourceId.split('_')).join("_");
                var targetFormName = deleteLast(targetId.split('_')).join("_");
                if (sourceFormName == targetFormName) {
                    layer.msg('单张表内字段不能关联');
                    instance.detach(info);
                }
            });
        });
    }

    function deleteLast(arr) {
        arr.pop();
        return arr;
    }

    //通过名称获取原名称和别名
    function getOriginalNameAndNewName(name) {
        var arrName = [];
        var originalName = "";
        var newName = "";
        var nameIndex = name.indexOf("(");
        if (nameIndex > 0) {
            originalName = name.substring(0, nameIndex);
            newName = name.substring(nameIndex + 1, name.length - 1);
        }
        else {
            originalName = name;
            newName = "";
        }
        //去掉.do
        if (originalName.indexOf(".do") > 0) {
            var index = originalName.indexOf(".do");
            originalName = originalName.substring(0, index);
        }
        arrName.push(originalName, newName);
        return arrName;
    }

    instance.registerConnectionType('basic', {anchor: 'Continuous', connectors: 'StateMachine'});
    //初始化窗口
    var initWindow = function (el) {
        instance.draggable(el, {
            containment: true
        });
        instance.fire("jsPlumbDemoLoaded", el);
    };
    //初始化节点

    var initNode = function (el) {
        instance.makeSource(el, {
            filter: ".ep",
            anchor: "Continuous",
            connectorStyle: {stroke: "#e8c260", strokeWidth: 2, outlineStroke: "transparent", outlineWidth: 4},
            connectionType: "basic",
            extract: {
                "action": "the-action"
            },
            maxConnections: 2,
            onMaxConnections: function (info, e) {
                alert("Maximum connections (" + info.maxConnections + ") reached");
            }
        });
        instance.makeTarget(el, {
            dropOptions: {hoverClass: "dragHover"},
            anchor: "Continuous",
            allowLoopback: false
        });
        instance.fire("jsPlumbDemoNodeAdded", el);
    };
    //连接器窗口的位置
    function rearrange() {
        var table = $('.ligatureTable');
        var dataDisplayWidth = parseInt($('#canvas').width());
        var l, t;
        if (table.length > 0) {
            var lastTable = table.eq(table.length - 1);
            var left = parseInt(lastTable.css('left'));
            var top = parseInt(lastTable.css('top'));
            var w = parseInt(lastTable.width());
            var h = parseInt(lastTable.height());
            if ((dataDisplayWidth - left) < (w + 200)) {
                l = 20;
                t = top + h + 20;
            }
            else {
                l = left + w + 150;
                t = top;
            }
        }
        else {
            l = 20;
            t = 50;
        }
        return {
            left: l,
            top: t
        }
    }

    //重命名弹窗
    function renameLayer(type, joinMethod, newName, latLng, fn) {
        var selects = '';
        switch (joinMethod) {
            case 'none-join':
                selects = '';
                break;
            case 'point-join':
                selects = '<label style="margin-left: 50px;margin-top: 10px">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp设为：' +
                    '<select name="latLng" id="latLng">' +
                    '<option value="">请选择--</option>' +
                    '<option value="lat">纬度</option>' +
                    '<option value="lng">经度</option>' +
                    '</select></label>';
                break;
            case 'surface-join':
                selects = '<label style="margin-left: 50px;margin-top: 10px">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp设为：' +
                    '<select name="latLng" id="latLng">' +
                    '<option value="">请选择--</option>' +
                    '<option value="leftTopLat">左上角经度</option>' +
                    '<option value="leftTopLng">左上角纬度</option>' +
                    '<option value="rightBottomLng">右下角经度</option>' +
                    '<option value="rightBottomlat">右下角纬度</option>' +
                    '</select></lael>';
                break;
            default :
                selects = '';
                break;
        }
        if (type == 'form') {
            selects = '';
        }
        layer.open({
            type: 1,
            content: '<label style="margin-left: 50px;margin-top: 10px">添加别名：<input id="addAlias" type="text" lastName="' + newName + '"  value="' + newName + '"></label>' + selects,
            title: "重命名",
            area: ["400px", "200px"],
            offset: "250px",
            btn: ["确定", "取消"],
            yes: function (index, layerO) {
                fn && fn(index, layerO);
            }
        });
    }

    //全选与全不选
    instance.on(canvas, 'click', '.ligature-select-all', function () {
        var currentChecked = $(this).prop('checked');
        var inputs = $(this).parent().next().find('li>input[type="checkbox"]');
        for (var i = 0; i < inputs.length; i++) {
            var currentObj = inputs.eq(i);
            currentObj.prop('checked', currentChecked);
            toggleNodeStyle(currentObj, currentChecked);
        }
    });
    //每列选中时样式
    instance.on(canvas, 'click', '.ligatureTable>ul>li>input', function () {
        var currentChecked = $(this).prop('checked');
        toggleNodeStyle($(this), currentChecked);
    });
    //每列选中样式与不选中样式切换
    function toggleNodeStyle(currentObj, currentChecked) {
        if (!currentChecked) {
            currentObj.parent().css({"color": "#667178"});
        }
        else {
            currentObj.parent().css({"color": "black"});
        }
    }

    //只要有一个没有选中，全选就不会打钩
    var isAllChecked = false;
    instance.on(canvas, 'click', 'input[type="checkbox"]', function () {
        var inputs = $(this).parents('ul').find('input[type="checkbox"]');
        var selectAllInput = $(this).parents('ul').prev().find(".ligature-select-all");
        for (var i = 0; i < inputs.length; i++) {
            var currentObj = inputs.eq(i);
            var currentChecked = currentObj.prop('checked');
            if (!currentChecked) {
                isAllChecked = false;
                break;
            }
            else {
                isAllChecked = true;
            }
        }
        if (isAllChecked) {
            selectAllInput.prop("checked", true);
        }
        else {
            selectAllInput.prop("checked", false);
        }
    });
    //选择关联方式
    instance.on(canvas, 'click', '.ligature-title .btn', function () {
        var joinBtns = $(this).siblings();
        joinBtns.removeClass('btn-active');
        $(this).addClass('btn-active');
        var joinMethod = $(this).attr('name');
        var container = $(this).parents('.ligatureTable');
        var name = container.attr('id');
        var ul = container.find('ul');
        var lastLi = ul.find('.lastLigature');
        lastLi.remove();
        switch (joinMethod) {
            case 'none-join':
                ul.append('');
                break;
            case 'point-join':
                ul.append('<li class="t lastLigature point-connect " id=' + name + "_latlng" + '><div class="ep" ></div></li>');
                initNode($('#' + name + "_latlng"), false);
                break;
            case 'surface-join':
                ul.append('<li class="t lastLigature surface-connect" id=' + name + "_latlng" + '><div class="ep" ></div></li>');
                initNode($('#' + name + "_latlng"), false);
                break;
            default :
                break;
        }

    });
    //删除连接线
    instance.on(canvas, 'click', 'svg', function () {
        var currentConnector = $(this).get(0)._jsPlumb; //获取当前连接器
        instance.detach(currentConnector);
    });
    //显示连接关系弹窗
    instance.on(canvas, 'click', '.aLabel', function () {
        labelId = $(this).attr("id");
        _info = $(this).get(0)._jsPlumb;
        changeLabel.show();
        $(".tablebg-grey").show();
    });
    //返回按钮
    queryTestBack.on("click", function () {
        queryTestContent.hide();
        stepContent.show();
        $('#jsplumb-connect').show();
        $('#search-result').hide();
        conditions.show();

    });
    //查询测试
    var colums = {};
    queryTest.on('click', function () {
        var viewData = makeViewData();
        $.ajax({
            //type: 'get',
            type: 'POST',
            url: '/iwherelink/doSearchTest.do',
            //url: '/testData/searchResult2.json',
            dataType: 'json',
            data: viewData,
            traditional: true,
            success: function (data) {
                queryTestTableShow(data);
            }, error: function (e) {
                console.log(e);
            }
        });
    });
    //构造融合数据 
    function makeViewData() {
        colums = {};
        var froms = [], wheres = [], orders = [];
        var tableWin = $(".group-container");
        var allConn = instance.getAllConnections();
        var noneConnecService = selectSingleNoneConnService();
        //单个窗口构造forms
        for (var i = 0; i < noneConnecService.length; i++) {
            var singleForm = {
                "source": {},
                "target": {"undefine": ""},
                "label": ""
            };
            console.log(singleForm);
            var winId = noneConnecService[i];
            var typeId;
            var typeStr = winId.substring(0, 2);
            if (typeStr == 'db') {
                typeId = 1;
            }
            else {
                typeId = 0;
            }
            var group = $(".group-container[nodeid='" + winId + "']");
            var databaseTypeId = group.attr("type");
            var databaseNameId = group.attr("mId");
            var titleName = group.find('.ligature-title>span').attr('name');
            var titleNameArr = getOriginalNameAndNewName(titleName);
            var originalName = typeId + "." + databaseTypeId + "." + databaseNameId + "." + titleNameArr[0];
            var newName = titleNameArr[1];
            if (newName == "") {
                singleForm.source[originalName] = "";
            }
            else {
                singleForm.source[originalName] = typeId + "." + newName;
            }
            console.log(singleForm);
            froms.push(JSON.stringify(singleForm));
        }
        //遍历连线
        for (var x in allConn) {
            var conn = allConn[x];
            var sourceListNode = $(conn.source);
            var targetListNode = $(conn.target);
            console.log(sourceListNode);
            console.log(sourceListNode);
            var sourceParams = "", targetParams = "";
            sourceParams = getObjParam(sourceListNode);
            targetParams = getObjParam(targetListNode);
            console.log(sourceParams);
            console.log(targetParams);
            var lebel = conn.getOverlay("label").getLabel();

            var singleForm = {
                "source": sourceParams,
                "target": targetParams,
                "label": lebel
            };
            console.log(singleForm);
            froms.push(JSON.stringify(singleForm));
        }

        //遍历表中的列
        for (var m = 0; m < tableWin.length; m++) {
            var groupTitleName = tableWin.eq(m).find(".ligature-title span").attr('name');
            var typeStr1 = tableWin.eq(m).attr("nodeid").substring(0, 2);
            if (typeStr1 == 'db') {
                typeId = 1;
            }
            else {
                typeId = 0;
            }
            var databaseTypeId1 = tableWin.eq(m).attr("type");
            var databaseNameId1 = tableWin.eq(m).attr("mId");
            var groupTitleNameArr = getOriginalNameAndNewName(groupTitleName);
            var groupTitleNewName = groupTitleNameArr[1];
            var groupTitleOriginalName = typeId + "." + databaseTypeId1 + "." + databaseNameId1 + "." + groupTitleNameArr[0];
            colums = getColumnParam(groupTitleName, groupTitleNewName, groupTitleOriginalName);
            //console.log(groupTitleOriginalName);
            //console.log(colums);
        }

        if (condition_left.css('display') == 'block') {
            var whereDom = condition_left.find(".condition");
            for (var j = 0; j < whereDom.length; j++) {//获取条件
                var field = whereDom.eq(j).find('.input_content');
                var field_sourceDom = field.eq(0);
                var field_targetDom = field.eq(1);
                var field_source = field_sourceDom.val().trim();
                var field_target = field_targetDom.val().trim();
                var field_lable = whereDom.eq(j).find('.select_relationship').val();
                if (field_source == "" && field_target == "") {
                    continue;
                }
                else {
                    var obj = {};
                    var sourceWhere;
                    var targetWhere;
                    //如果选中的是节点
                    if (field_sourceDom.attr("original")) {
                        var field_source_original = field_sourceDom.attr("original");
                        var sourceType = field_sourceDom.attr('type');
                        var sourcemid = field_sourceDom.attr('mid');
                        var sourceTypeStr = field_sourceDom.attr('nodeid').substring(0, 2);
                        if (sourceTypeStr == 'db') {
                            sourceTypeStr = 1;
                        }
                        else {
                            sourceTypeStr = 0;
                        }
                        sourceWhere = sourceTypeStr + "." + sourceType + "." + sourcemid + "." + field_source_original;
                    }
                    //如果是输入的值
                    else {
                        sourceWhere = field_source;
                    }
                    if (field_targetDom.attr("original")) {
                        var field_target_original = field_targetDom.attr("original");
                        var targetType = field_targetDom.attr('type');
                        var targetmid = field_targetDom.attr('mid');
                        var targetTypeStr = field_targetDom.attr('nodeid').substring(0, 2);
                        if (targetTypeStr == 'db') {
                            targetTypeStr = 1;
                        }
                        else {
                            targetTypeStr = 0;
                        }
                        targetWhere = targetTypeStr + "." + targetType + "." + targetmid + "." + field_target_original;

                    }
                    else {
                        targetWhere = field_target;
                    }
                    obj = {
                        source: sourceWhere,
                        target: targetWhere,
                        label: field_lable
                    };
                    wheres.push(JSON.stringify(obj));
                }
            }
        }
        else {
            wheres = [];
        }
        if (condition_right.css('display') == 'block') {
            var ordersDom = condition_right.find(".condition");
            for (var g = 0; g < ordersDom.length; g++) {  //获取排序
                var order = ordersDom.eq(g).find('.select_field');
                var orderSelected = order.find('option:selected');
                var order_source = orderSelected.text();
                var order_source_original = orderSelected.val();
                if (order_source_original == "0") {
                    continue;
                } else {
                    var order_lable = ordersDom.eq(g).find('.condition_switch').attr("name");
                    var typeStr = orderSelected.parent().attr("nodeid").substring(0, 2);
                    var type = orderSelected.parent().attr("type");
                    var mid = orderSelected.parent().attr("mid");
                    var obj = {};
                    var typeId;
                    if (typeStr == "db") {
                        typeId = 1;
                    }
                    else {
                        typeId = 0;
                    }
                    var key;
                    key = typeId + "." + type + "." + mid + "." + order_source_original;
                    obj[key] = order_lable;

                    orders.push(JSON.stringify(obj));
                }
            }
        }
        else {
            orders = [];
        }


        // console.log(orders);
        viewData = {
            colums: JSON.stringify(colums),
            froms: froms,
            wheres: wheres,
            orders: orders
        };
        //console.log(JSON.stringify(viewData));
        return viewData;
    }

    //筛选出没有连接的单个的服务
    function selectSingleNoneConnService() {
        var tableTitleName = [];
        var singleTable = []; //独立无连线的服务窗口
        var allConn = instance.getAllConnections();
        var tableWin = $(".group-container");
        var tableWinTitle = tableWin.find(".ligature-title>span");
        var winIds = [];
        //取所有窗口的服务名称（表名）
        for (var i = 0; i < tableWin.length; i++) {
            var tableWinId = tableWin.eq(i).attr('nodeid');
            console.log(tableWinId);
            winIds.push(tableWinId);
        }
        console.log(winIds);
        console.log(allConn);
        //取所有连线source 和target 所在服务的名称
        for (var j = 0; j < allConn.length; j++) {
            var index;
            //console.log($(allConn[j].source));
            var sourceTableName = $(allConn[j].source).parents('.ligatureTable').attr('nodeid');
            var targetTableName = $(allConn[j].target).parents('.ligatureTable').attr('nodeid');
             console.log($.inArray(sourceTableName, winIds));
            if ($.inArray(sourceTableName, winIds) >= 0) {
                index = $.inArray(sourceTableName, winIds);
                winIds.splice(index, 1);
                console.log(winIds);
            }
            console.log( $.inArray(targetTableName, winIds));
            if ($.inArray(targetTableName, winIds) >= 0) {
                index = $.inArray(targetTableName, winIds);
                winIds.splice(index, 1);
                console.log(winIds);
            }
        }
        console.log(winIds);
        return winIds;
    }

    //通过连线的source和target封装froms参数
    function getObjParam(node) {
        //连接类型ID（服务还是数据库）
        console.log(11);
        var typeId;
        var typeStr = node.parents('.ligatureTable').attr("nodeid").substring(0, 2);
        console.log(typeStr);
        if (typeStr == 'db') {
            typeId = 1;
        }
        else {
            typeId = 0;
        }
        //数据库类型
        var databaseTypeId = node.parents('.ligatureTable').attr("type");
        //数据库名称
        var databaseNameId = node.parents('.ligatureTable').attr("mId");
        //列名
        var params = {};
        //表名
        var sourceTableName = node.parents('.all-field').prev().find('span').attr('name');
        var sourceTableNameArr = getOriginalNameAndNewName(sourceTableName);
        var sourceNewTableName = sourceTableNameArr[1];
        console.log(sourceNewTableName );
        if (node.attr('id').indexOf('latlng') > -1) {
            var latName = node.find(".lat span").text();
            var lngName = node.find(".lng span").text();
            //获取纬度字段名
            var latNameArr = getOriginalNameAndNewName(latName);
            var OriginalLatName = latNameArr[0];
            var NewLatName = latNameArr[1];
            //获取经度字段名
            var lngNameArr = getOriginalNameAndNewName(lngName);
            console.log(lngNameArr);
            var OriginalLngName = lngNameArr[0];
            var NewLngName = lngNameArr[1];

            var sourceKeyLat = typeId + "." + databaseTypeId + "." + databaseNameId + "." + sourceTableNameArr[0] + "." + OriginalLatName;
            var sourceKeyLng = typeId + "." + databaseTypeId + "." + databaseNameId + "." + sourceTableNameArr[0] + "." + OriginalLngName;
            if (sourceNewTableName == "") {
                params[sourceKeyLat] = "";
                params[sourceKeyLng] = "";
            }
            else {
                params[sourceKeyLat] = typeId + "." + sourceNewTableName + "." + OriginalLatName;
                params[sourceKeyLng] = typeId + "." + sourceNewTableName + "." + OriginalLngName;
            }
        } else {
            var sourceListName = node.find("span").prev().attr('value');
            var sourceListNameArr = getOriginalNameAndNewName(sourceListName);
            var sourceOriginalListName = sourceListNameArr[0];
            var sourceNewListName = sourceListNameArr[1];
            var sourceKey = typeId + "." + databaseTypeId + "." + databaseNameId + "." + sourceTableNameArr[0] + "." + sourceOriginalListName;
            if (sourceNewTableName == "") {//表没有别名
                params[sourceKey] = "";
            }
            else {//表有别名
                params[sourceKey] = typeId + "." + sourceNewTableName + "." + sourceOriginalListName;
            }
        }
        return params;
    }

//遍历表中的列
    function getColumnParam(titleName, newTitleName, originalName) {
        var tableWin = $(".group-container");
        var groupTitleSpans = tableWin.find(".ligature-title span");
        for (var i = 0; i < groupTitleSpans.length; i++) {
            if (groupTitleSpans.eq(i).attr('name') == titleName) {
                var groupTitle = groupTitleSpans.eq(i);
                var groupInputs = groupTitle.parent().next().find('input[checked=checked]');

                for (var j = 0; j < groupInputs.length; j++) {
                    var currentInput = groupInputs.eq(j);
                    if (currentInput.prop("checked") == true) {
                        var listName = currentInput.next().attr('name');
                        var singleColumnKey = '';
                        var listNameArr = getOriginalNameAndNewName(listName);
                        var originalListName = listNameArr[0];
                        var newListName = listNameArr[1];
                        if (newTitleName == "") {
                            singleColumnKey = originalName + "." + originalListName;
                            colums[singleColumnKey] = newListName;
                        }
                        else {
                            singleColumnKey = newTitleName + "." + originalListName;
                            colums[singleColumnKey] = newListName;
                        }
                    }
                }
            }
        }
        return colums;
    }

    //显示测试结果表格
    function queryTestTableShow(data) {
        if (data.code == 0) {
            renderData(data);
        } else {
            queryTestContent.find('table tbody').empty().append('<tr><td>无测试数据</td></tr>');
        }
    }

    function renderData(data) {
        $('#jsplumb-connect').hide();
        $('#search-result').show();
        queryTestContent.show();
        stepContent.hide();
        conditions.hide();
        queryTestContent.find('table thead').empty();
        var tHeaderContent = queryTestContent.find('.queryTestTable table thead');
        var tBodyContent = queryTestContent.find('.queryTestTable table tbody');
        tHeaderContent.empty();
        tBodyContent.empty();
        var tHeader = '';
        var td = '';
        var tr = '';
        var tHeaderArr = [];
        var newData = [];
        //获取全部的属性
        var dataLen;
        (data.data.length>100)?dataLen=100:dataLen=data.data.length;
        for (var i = 0; i < dataLen; i++) {
            for (var attr1 in data.data[i]) {
                if ($.inArray(attr1, tHeaderArr) < 0) {
                    tHeaderArr.push(attr1);
                }
            }
        }
        //补全数据,构造新数据
        for (var k = 0; k < dataLen; k++) {
            var currentData = data.data[k];
            var currentDataAttr = [];
            for (var attr in currentData) {
                currentDataAttr.push(attr);
            }
            //若没有当前属性，则以“noneAttr”填充
            for (var m = 0; m < tHeaderArr.length; m++) {
                if ($.inArray(tHeaderArr[m], currentDataAttr) < 0) {
                    currentData[tHeaderArr[m]] = 'noneAttr';
                }
            }
            var newCurrentDataSort = objKeySort(currentData);
            newData.push(newCurrentDataSort);
        }

        //按照排好的序列拼头部
        var newTheaderArr = tHeaderArr.sort();
        for (var n = 0; n < newTheaderArr.length; n++) {
            tHeader += '<th>' + newTheaderArr[n] + '</th>';
        }
        //console.log(tHeaderContent);
        tHeaderContent.append(tHeader);
        //拼tbody
        for (var t = 0; t < newData.length; t++) {
            tr = '';
            td = '';
            for (var newAttr in newData[t]) {
                var currentVal = newData[t][newAttr];
                if (currentVal == 'noneAttr') {
                    td += '<td></td>';
                }
                else {
                    td += '<td>' + newData[t][newAttr] + '</td>';
                }
            }
            tr = '<tr>' + td + '</tr>';
            tBodyContent.append(tr);
        }
    }

    //按照对象的key值进行排序
    function objKeySort(obj) {
        var newKey = Object.keys(obj).sort();
        var newObj = {};
        for (var i = 0; i < newKey.length; i++) {
            newObj[newKey[i]] = obj[newKey[i]];
        }
        return newObj;
    }

    //鼠标foucus查询条件，筛选条件输入框出现
    var selectCondiModel = $('#select_condi_model');
    $('.conditions').on('focus', '.input_content', function () {
        var x = $(this).position().left;
        var y = $(this).position().top;
        selectCondiModel.find('select>option').prop("selected", true);
        selectCondiModel.find('input').removeClass("condi_active").val("");
        $('.condition_left').find('.input_content').removeClass("input_content_active");
        selectCondiModel.find('select').removeClass("condi_active");
        selectCondiModel.show();
        selectCondiModel.css({"left": x + 'px', "top": y - 120 + 'px'});
        $(this).addClass("input_content_active");
    });
    //select和input只有一个可用
    selectCondiModel.find('select').change(function () {
        var optionVal = $(this).find("option:selected").attr('value');
        if (optionVal !== 0) {
            $(this).next().val("");
            $(this).addClass("condi_active");
            $(this).next().removeClass("condi_active");
        }
    });
    selectCondiModel.find('input').keydown(function () {
        var currentVal = $(this).val();
        if (currentVal !== "" || currentVal !== " ") {
            $(this).addClass("condi_active");
            $(this).prev().removeClass("condi_active");
            $(this).prev().find("option").eq(0).attr("selected", true);
        }
    });
    //点击筛选条件输入框的“确定”按钮，筛选条件输入框隐藏
    $('#confirmSelectCondi').click(function () {
        var selectCondi = selectCondiModel.find(".condi_active");
        var selectCondiVal = "";
        if (selectCondi.length > 0) {
            if (selectCondi.hasClass("select_field")) {    //下拉框
                selectCondi.find('option').attr('disabled', false);
                var selectedOption = selectCondi.find('option:selected').attr('disabled', true);
                var nodeid = selectedOption.parent().attr("nodeid");
                var type = selectedOption.parent().attr("type");
                var mid = selectedOption.parent().attr("mid");
                selectCondiVal = selectedOption.text();
                var selectCondiOriginal = selectedOption.val();
                $(".condition>.input_content_active").val(selectCondiVal).attr({
                    "nodeid": nodeid,
                    "type": type,
                    "mid": mid,
                    "original": selectCondiOriginal
                });
            }
            else {
                selectCondiVal = selectCondi.val();  //输入框
                $(".condition>.input_content_active").val(selectCondiVal)
                    .removeAttr('nodeid')
                    .removeAttr('type')
                    .removeAttr('mid')
                    .removeAttr('original');
            }
        }
        else {
            $(".condition>.input_content_active").val("");
        }
        selectCondiModel.hide();
    });
    //点击筛选条件输入框的“取消”按钮，筛选条件输入框隐藏
    $('#cancelSelectCondi').click(function () {
        selectCondiModel.hide();
    });
    //增加where
    addInquire.on('click', function () {
        getMultiWhereHtml();
    });

    //添加排序条件
    addSort.on('click', function () {
        getMultiOrderHtml();
    });
    $("#viewName").focus(function () {
        $(this).next().next().hide();
    });
    //保存视图
    $(".btn-complete").click(function () {
        var viewName = $("#viewName").val().trim();
        var viewComment = $("#viewVersion").val().trim();
        var viewAuth = $("#viewAuth").find('option:selected').attr("value");
        var reg = /^[\u4e00-\u9fa5a-zA-Z0-9\_]*$/;  //只含有汉字、数字、字母下划线
        var reg1 = /^\S*$/;
        if (viewName == '' || viewName == 'undefined' || viewName == null) {
            $("#viewName").next().next().text('不能为空').show();
            return;
        }
        if (!reg1.test(viewName)) {
            $("#viewName").next().next().show().text('不能包含空格');
            return;
        }

        if (!reg.test(viewName)) {
            $("#viewName").next().next().text('不能含有特殊字符').show();
            return;
        }
        var viewData = makeViewData();
        viewData.name = viewName;
        viewData.comment = viewComment;
        if (viewCookieData) { //修改
            viewData.id = Number(viewCookieData[0].id);
            viewData.detail_id = Number(viewCookieData[0].detail_id);
            $.ajax({
                //type:'get',
                type: 'post',
                url: '/iwherelink/updatFuseViewById.do',
                //url:'/testData/addFuseView.json',
                dataType: 'json',
                data: viewData,
                traditional: true,
                success: function (data) {
                    if (data.code == 1) {
                        layer.msg(data.message, {time: 2000});
                    }
                    else {
                        layer.msg("更新视图成功！", {time: 2000});
                        //setTimeout(function () {
                        //    window.location.href = '/viewManager.do';
                        //}, 2000);
                    }
                },
                error: function () {
                    layer.alert("保存失败，请重新保存");
                }
            });
        }
        else {
            $.ajax({
                //type:'get',
                type: 'post',
                url: '/iwherelink/addFuseView.do',
                //url:'/testData/addFuseView.json',
                dataType: 'json',
                data: viewData,
                traditional: true,
                success: function (data) {
                    if (data.code == 1) {
                        layer.msg(data.message, {time: 2000});
                    }
                    else {
                        layer.msg("保存视图成功！", {time: 2000});
                        setTimeout(function () {
                            window.location.href = "/viewManager.do";
                        }, 2000);
                    }
                },
                error: function () {
                    layer.alert("保存失败，请重新保存");
                }
            });
        }
    });
    //========================修改视图部分 begin============================
    //解析表名
    function parseTableName(fromName) {
        var fromArr = fromName.split('.');
        return fromArr;
    }

    //判断是哪棵树
    function isWhichTree(str) {
        var tree;
        if (str == "0") {    //服务树
            tree = $.fn.zTree.getZTreeObj("tree3");
        }
        else {       //数据库树
            tree = $.fn.zTree.getZTreeObj("tree1");
        }
        return tree;
    }

    //找到表名对应的树节点，选中节点、设置节点不可点击
    function findTreeNode(tree, tableNameArr) {
        var treeNode;
        var treeNameNodes = tree.getNodesByParam("name", tableNameArr[3]);
        console.log(treeNameNodes);
        var arr = [];
        if (treeNameNodes.length > 0) {
            if (tree.setting.treeId == 'tree3') { //服务树
                for (var j = 0; j < treeNameNodes.length; j++) {
                    var wsTreeNameParentNode = treeNameNodes[j].getParentNode();
                    if (treeNameNodes[j].mId == tableNameArr[2] && wsTreeNameParentNode.mId == tableNameArr[1]) {
                        treeNode = treeNameNodes[j];
                        tree.checkNode(treeNode, true, true);
                        moveTreeNode(tree, selectedTree);
                        setStatus(treeNode, tree);
                    }
                    else {
                        arr.push(treeNameNodes);
                    }
                }
                if (arr.length == treeNameNodes.length) {
                    layer.msg('数据源异常，找不到节点mId为' + tableNameArr[2] + '的' + tableNameArr[3], {time: 3000});
                }
            }
            else {  //数据库树
                for (var i = 0; i < treeNameNodes.length; i++) {
                    var treeNameParentNode = treeNameNodes[i].getParentNode();
                    var treeNameParentParentNode = treeNameParentNode.getParentNode();
                    if (treeNameParentNode.mId == tableNameArr[2] && treeNameParentParentNode.mId == tableNameArr[1]) {
                        treeNode = treeNameNodes[i];
                        tree.checkNode(treeNode, true, true);
                        moveTreeNode(tree, selectedTree);
                        setStatus(treeNode, tree);
                    }
                    else {
                        arr.push(treeNameNodes);
                    }
                }
                if (arr.length == treeNameNodes.length) {
                    layer.msg('数据源异常，找不到父节点mId为' + tableNameArr[2] + '的' + tableNameArr[3], {time: 3000});
                }
            }
        }
        else {
            layer.msg('找不到节点' + treeNameNodes[i].name);
        }
        return treeNode;
    }

    //取出表名key字段
    function getTableNameField(formFieldObj) {
        var tableFileNameArr = [];
        for (var attr in formFieldObj) {
            var tableFieldName = attr;
            console.log(tableFieldName);
        }
        console.log(tableFieldName);
        return tableFieldName;
    }

    //加载视图数据树
    function loadDataTree(form) {

        var formName = getTableNameField(form);

        if (formName !== 'undefine') {
            var formNametArr = parseTableName(formName);
            var formTree = isWhichTree(formName[0]);
            var formTreeNode = findTreeNode(formTree, formNametArr);
        }
    }


    //判断表名是否重命名,并返回该表原名和（或）新名
    function isRename(formFieldObj) {
        var formNameArr = [];
        var formName = getTableNameField(formFieldObj);
        formNameArr.push(formName.split(".")[3]);
        var newFormName = '';
        if (formFieldObj[formName] !== '') {  //重命名
            newFormName = formFieldObj[formName];
            formNameArr.push(newFormName.split(".")[1]);
        }
        return formNameArr;
    }

    //更改表名
    function changeFormName(mId, nameArr) {
        var tableWin = $(".group-container[id=" + nameArr[0] + "][mId=" + mId + "]");
        var tableName = nameArr[0] + "(" + nameArr[1] + ")";
        tableWin.find('.ligature-title>span').text(tableName);
    }

    //筛选出重名命的列和被选中的列
    function selectAndRenameColumns(columns, formNameArr, formNewName) {
        var selectColumns = {
            checkedColumns: [],   //选中的列
            renameColumns: []    //重命名的列
        };
        for (var attr in columns) {   //遍历colums
            var curAttrArr = attr.split(".");
            if (curAttrArr.length == 2 && curAttrArr[0] == formNewName) {  //表被重命名
                selectColumns.checkedColumns.push(curAttrArr[curAttrArr.length - 1]);
                if (columns[attr] !== "") {    //筛选出重命名的列
                    var colum = {};
                    colum[attr] = columns[attr];
                    selectColumns.renameColumns.push(colum);
                }
            }
            if (curAttrArr.length > 2 && curAttrArr[3] == formNameArr[0]) {  //表没有被重命名
                selectColumns.checkedColumns.push(curAttrArr[curAttrArr.length - 1]);
                if (columns[attr] !== "") {    //筛选出重命名的列
                    var colum = {};
                    colum[attr] = columns[attr];
                    selectColumns.renameColumns.push(colum);
                }
            }
        }
        return selectColumns;
    }

    //设置重命名和选中
    function setRenameAndChecked(formName, formMid, selectedData) {
        var tableWin = $(".group-container[id=" + formName + "][mId=" + formMid + "]");
        var checkedAll = tableWin.find('.ligature-select-all');
        var tableLis = tableWin.find('ul li');
        var checkedInput = [];
        for (var n = 0; n < tableLis.length - 1; n++) {
            var curLi = tableLis.eq(n);
            var curInput = curLi.find('input').eq(0);
            var curSpan = curLi.find('span').eq(0);
            if (selectedData.checkedColumns.indexOf(curSpan.text()) > -1) {   //设为选中
                curInput.attr('checked', true);
                checkedInput.push(checkedInput);
            }
            else {
                curInput.attr('checked', false);
            }
            for (var t = 0; t < selectedData.renameColumns.length; t++) {
                for (var key in selectedData.renameColumns[t]) {
                    var keyArr = key.split(".");
                    if (curSpan.text() == keyArr[keyArr.length - 1]) {
                        curSpan.text(curSpan.text() + "(" + selectedData.renameColumns[t][key] + ")");
                    }
                }
            }
        }
        //全选
        if (checkedInput.length == tableLis.length - 1) {
            checkedAll.attr('checked', true);
        }
        else {
            checkedAll.attr('checked', false);
        }
        latlng();
    }

    //加载窗口数据，并设置窗口
    function setWinData(formObj, formName, formMid) {
        var formKeyName = getTableNameField(formObj);   //表名key
        var formKeyNameArr = parseTableName(formKeyName);
        //如果当前加载的刚好是某张表
        if (formKeyNameArr[3] == formName && formKeyNameArr[2] == formMid) {
            var formNameArr = isRename(formObj);   //表原名和（或）新名
            if (formNameArr.length == 2) {     //有新名，即重命名
                var formNewName = formNameArr[1];
                changeFormName(formMid, formNameArr);
            }
            var selectedColumnsObj = selectAndRenameColumns(viewCookieDataColums, formNameArr, formNewName);
            setRenameAndChecked(formName, formMid, selectedColumnsObj);
        }
    }

    //连线，连线之后遍历order
    function drawConnector(sourceFormObj, targetFormObj, label) {
        var sourceKeyName = getTableNameField(sourceFormObj);   //source表名key
        var sourceKeyNameArr = parseTableName(sourceKeyName);

        var targetKeyName = getTableNameField(targetFormObj);   //source表名key
        var targetKeyNameArr = parseTableName(targetKeyName);

        var sourceColumnId = [sourceKeyNameArr[3], sourceKeyNameArr[4]].join("_");
        var targetColumnId = [targetKeyNameArr[3], targetKeyNameArr[4]].join("_");

        var sourceColumn = $("#" + sourceColumnId);
        var targetColumn = $("#" + targetColumnId);
        if (sourceColumn.length > 0 && targetColumn.length > 0) {
            instance.connect(
                {
                    source: sourceColumn,
                    target: targetColumn,
                    type: 'basic'
                }
            ).getOverlay('label').setLabel(label);
        }
        //遍历orders
        var viewCookieDataOrders = JSON.parse(viewCookieData[0].orders);
        if (viewCookieDataOrders !== null) {
            $('#sort_condition').attr('checked', true);
            showOrder();
            condition_right.find('.condition').remove();
            var len = viewCookieDataOrders.length;
            for (var k = 0; k < len; k++) {   //遍历orders
                getMultiOrderHtml();
                var curColumnField = Object.keys(viewCookieDataOrders[k])[0];
                var columnValue = parseOrder(curColumnField);
                var sort = viewCookieDataOrders[k][curColumnField];
                writeOrderValue(k, columnValue, sort);
            }
        }
    }

    //根据选中的节点重组form
    function remakeForm(data) {
        var form = '';
        var forms = [];
        var singleNode = [];
        for (var i = 0; i < data.length; i++) {
            if (!data[i].isParent) {
                singleNode.push(data[i]);
            }
        }

        for (var j = 0; j < singleNode.length; j++) {
            var name = singleNode[j].name;
            var id;
            var typeId;
            var curNode = mixTree.getNodeByParam('id', singleNode[j].id);
            var type = curNode.getParentNode().getParentNode().id.substring(0, 2);
            if (type == 'db') {
                id = curNode.getParentNode().mId;
                typeId = curNode.getParentNode().getParentNode().mId;
                form = '1.' + typeId + "." + id + "." + name;
            }
            else {
                id = curNode.mId;
                typeId = curNode.getParentNode().mId;
                form = '0.' + typeId + "." + id + "." + name;
            }
            forms.push(form);
        }
        return forms;
    }

    //根据where字段value值取出列名
    function getColumnFromWhere(fieldArr) {
        var whereColumn;
        if (fieldArr.length > 5) {     //列名有多个字段
            for (var index = 4; index < fieldArr.length - 1; index++) {
                whereColumn = fieldArr[index] + "." + fieldArr[index + 1];
            }
        }
        else {   //列名只有一个字段
            whereColumn = fieldArr[fieldArr.length - 1];
        }
        return whereColumn;
    }

    //找到where对应的表
    function findFormCorresWhere(froms, whereField) {
        var formObj;
        var whereFieldArr = whereField.split(".");
        var whereForm = [whereFieldArr[0], whereFieldArr[1], whereFieldArr[2], whereFieldArr[3]].join(".");
        for (var i = 0; i < froms.length; i++) {   //遍历froms
            var sourceFormObj = froms[i].source;
            var targetFormObj = froms[i].target;
            var sourceKey = getTableNameField(sourceFormObj);
            var sourceKeyArr = sourceKey.split('.');
            var sourceForm = [sourceKeyArr[0], sourceKeyArr[1], sourceKeyArr[2], sourceKeyArr[3]].join(".");
            if (whereForm == sourceForm) {
                formObj = sourceFormObj;
                break;
            }
            var targetKey = getTableNameField(targetFormObj);
            var targetKeyArr = targetKey.split('.');
            var targetForm = [targetKeyArr[0], targetKeyArr[1], targetKeyArr[2], targetKeyArr[3]].join(".");
            if (whereForm == targetForm) {
                formObj = targetFormObj;
                break;
            }
        }
        return formObj;
    }

    //解析where语句source或target字段
    function parseWhere(whereField) {
        var whereValue;
        if (whereField.indexOf('.') < 0) {
            whereValue = whereField;   //文本内容
        }
        else {
            var whereFieldArr = whereField.split(".");
            if (whereFieldArr.length >= 5) {  //列名，非文本
                var whereForm;
                var whereKey;
                var whereColumn = getColumnFromWhere(whereFieldArr);
                var formObj = findFormCorresWhere(viewCookieDataFroms, whereField);
                var formNameArr = isRename(formObj);
                if (formNameArr.length == 2) {     //表重命名了
                    whereForm = formNameArr[1];
                    whereKey = whereForm + "." + whereColumn;
                }
                else {       //没有重命名
                    whereForm = formNameArr[0];
                    whereKey = whereField;
                }
                if (viewCookieDataColums[whereKey] == undefined || viewCookieDataColums[whereKey] == "") {  //列没有重命名了
                    whereValue = whereKey;
                }
                else {
                    whereValue = whereForm + "." + viewCookieDataColums[whereKey];
                }
            }
            else {
                whereValue = whereField;   //文本内容
            }
        }
        return whereValue;
    }

    //显示where语句
    function showWhere() {
        conditions.show();
        condition_left.show();
        condition_left.find('.condition').last().find('.delete_condition').on('click', function () {
            $(this).parent().remove();
        });
        $(".input_content").val("");
        updateSelect();
        if (sort_condition.prop('checked')) {
            condition_left.width('49%');
            condition_right.width('50%');
        } else {
            condition_left.width('100%');
        }
    }

    //隐藏where语句
    function hideWhere() {
        condition_left.hide();
        condition_left.find('.condition:not(:first)').remove();
        $(".input_content").val("");
        if (sort_condition.prop('checked')) {
            condition_right.width('100%');
        } else {
            conditions.hide();
        }
    }

    //拼接多条件where语句html
    function getMultiWhereHtml() {
        var queryOption = '<div class="condition">' +
            '<label class="condition_label">条件' + (condition_left.find('.condition').length + 1) + '：</label> ' +
            '<input type="text" class="input_content pull-left">' +
            '<select class="select_relationship pull-left" > ' +
            '<option>=</option> ' +
            '<option>></option> ' +
            '<option><</option> ' +
            '<option>!=</option> ' +
            '<option>IN</option> </select> ' +
            '<input type="text" class="input_content pull-left">' +
            '<button type="button" class=" btn  delete_condition"><i class="icon-trash"></i></button> </div>';
        condition_left.append(queryOption);
        condition_left.find('.condition').last().find('.delete_condition').on('click', function () {
            $(this).parent().remove();
        });
        updateSelect();
    }

    //把source,label,target写入对应的where输入框中
    function writeWhereValue(index, source, label, target) {
        var curWhere = condition_left.find('.condition').eq(index);
        var inputContet = curWhere.find('.input_content');
        var labelSelect = curWhere.find('.select_relationship');
        inputContet.eq(0).val(source);
        inputContet.eq(1).val(target);
        labelSelect.eq(0).val(label);
    }

    //显示order语句
    function showOrder() {
        conditions.show();
        condition_right.show();
        condition_right.find('.condition').last().find('.delete_condition').on('click', function () {
            $(this).parent().remove();
        });
        condition_right.find('.condition').last().find('.condition_switch').on('click', addSwitchListen);
        condition_right.find(".select_field option").eq(0).attr("selected", true);
        updateSelect();
        if (query_condition.prop('checked')) {
            condition_right.width('50%');
            condition_left.width('49%');
        } else {
            condition_right.width('100%');
        }
    }

    //隐藏order语句
    function hideOrder() {
        condition_right.hide();
        condition_right.find('.condition').remove();
        condition_right.find(".select_field option").eq(0).attr("selected", true);
        if (query_condition.prop('checked')) {
            condition_left.width('100%');
        } else {
            conditions.hide();
        }
    }

    //拼接多条件order语句html
    function getMultiOrderHtml() {
        var sortOption = '<div class="condition"> ' +
            '<label class="condition_label">条件' + (condition_right.find('.condition').length + 1) + '：</label> ' +
            '<select class="select_field pull-left"> ' +
            '</select><div name="ASC" class="condition_switch"> ' +
            '<span>ASC</span> <span style="display: none;text-indent: 13px;">DESC</span> <div class="switch_bar"></div> ' +
            '</div><button type="button" class=" btn  delete_condition"><i class="icon-trash"></i></button></div>';
        condition_right.append(sortOption);
        var sortCondition = condition_right.find('.condition');
        var lastCondition = sortCondition.last();
        lastCondition.find('.delete_condition').on('click', function () {
            $(this).parent().remove();
        });
        lastCondition.find('.condition_switch').on('click', addSwitchListen);
        updateSelect();
    }

    //解析order语句
    function parseOrder(columnField) {
        var columnValue;
        var columnFieldArr = columnField.split(".");
        var orderForm;
        var orderKey;
        var orderColumn = getColumnFromWhere(columnFieldArr);
        var formObj = findFormCorresWhere(viewCookieDataFroms, columnField);
        var formNameArr = isRename(formObj);
        if (formNameArr.length == 2) {     //表重命名了
            orderForm = formNameArr[1];
            orderKey = orderForm + "." + orderColumn;
        }
        else {       //没有重命名
            orderForm = formNameArr[0];
            //orderKey = columnField;
            orderKey = orderForm + "." + orderColumn;
        }
        if (viewCookieDataColums[orderKey] == undefined || viewCookieDataColums[orderKey] == "") {  //列没重命名了
            columnValue = orderKey;
        }
        else {
            columnValue = orderForm + "." + viewCookieDataColums[orderKey];
        }
        return columnValue;
    }

    //把排序写入对应的order输入框中
    function writeOrderValue(index, columnValue, sort) {
        var curOrder = condition_right.find('.condition').eq(index);
        var sortSwitch = curOrder.find('.condition_switch');

        sortSwitch.attr('name', sort);
        if (sort == 'ASC') {
            sortSwitch.find('.switch_bar').css('left', '40px');
        }
        else {
            sortSwitch.find('.switch_bar').css('left', '4px');
        }
        curOrder.find('.select_field option:contains(' + columnValue + ')').prop('selected', true);
    }

    function latlng(){
        console.log(viewCookieData);
        viewCookieDataFroms = JSON.parse(viewCookieData[0].froms);
        viewCookieDataColums = JSON.parse(viewCookieData[0].colums);
        var sourceLen = Object.keys(viewCookieDataFroms[0].source).length;//source
        var targetLen = Object.keys(viewCookieDataFroms[0].target).length;//target
        //var pointLatLng = ['纬度','经度'];
        var pointLatLng = {lat: '纬度', lng: '经度'};
        var surfaceLatLng =  {
            leftTopLat: '左上角经度',
            leftTopLng: '左上角纬度',
            rightBottomLng: '右下角经度',
            rightBottomlat: '右下角纬度'
        };
        console.log(sourceLen);
        if(sourceLen>1 && sourceLen < 3){
            console.log(viewCookieDataFroms);
            var formName =  Object.keys(viewCookieDataFroms[0].source)[0].split('.')[3];
            console.log(formName);
            var tableTitleName =$('#'+formName).find('.ligature-title').find('button[name="point-join"]');
            tableTitleName.addClass('btn-active');
            var joinBtns = tableTitleName.siblings();
            joinBtns.removeClass('btn-active');
            var joinMethod = tableTitleName.attr('name');
            var container = tableTitleName.parents('.ligatureTable');
            var name = container.attr('id');
            var ul = container.find('ul');
            var lastLi = ul.find('.lastLigature');
            lastLi.remove();
            join(joinMethod,ul);
            viewCookieDataColums = JSON.parse(viewCookieData[0].colums);
            var originNameArr = [];
                var k = 0;
                for(var i in viewCookieDataFroms[0].source){
                var originName = i.split('.')[i.split('.').length -1];

                for(var j in viewCookieDataColums){
                    if( i == j){
                        k++;
                        var originName = i.split('.')[i.split('.').length -1];
                              $('#' + formName).find("ul li:last").append('<div class="join ' + Object.keys(pointLatLng)[k-1] + '">' +
                                  '<img class="pull-left latLngRemove" src="image/portlet-remove-icon-white.png">' +
                                  '<em>' + pointLatLng[Object.keys(pointLatLng)[k-1]] + '：</em><span name="' + viewCookieDataColums[j] + '">' + originName + "(" + viewCookieDataColums[j] + ")" + '</span></div>');

                          }
                    }

                }
            //}

            $('#'+formName).find("ul li:last").find('.latLngRemove').unbind().click(function () {
                var tableWin = $(".group-container[id=" + formName + "]");
                var checkedAll = tableWin.find('.ligature-select-all');
                var tableLis = tableWin.find('ul li');
                var curLatlng = $(this).parent().attr('class').split(' ')[1];
                $(this).parent().remove();
                for (var n = 0; n < tableLis.length - 1; n++) {
                    var curLi = tableLis.eq(n);

                }
                curLi.parents('ul').find('li[latLng="' + curLatlng + '"]').find('span').attr('join', '');
                curLi.parents('ul').find('li[latLng="' + curLatlng + '"]').attr('latLng', '');
            });
        }
        if(targetLen>1 && targetLen < 3){
            var formName =  Object.keys(viewCookieDataFroms[0].target)[0].split('.')[3];
            var tableTitleName =$('#'+formName).find('.ligature-title').find('button[name="point-join"]');
            tableTitleName.addClass('btn-active');
            var joinBtns = tableTitleName.siblings();
            joinBtns.removeClass('btn-active');
            var joinMethod = tableTitleName.attr('name');
            var container = tableTitleName.parents('.ligatureTable');
            var name = container.attr('id');
            var ul = container.find('ul');
            var lastLi = ul.find('.lastLigature');
            lastLi.remove();
            join(joinMethod,ul);
            var k = 0;
            for(var i in viewCookieDataFroms[0].target){
                for(var j in viewCookieDataColums){
                    if( i == j){
                        k++;
                        var originName = i.split('.')[i.split('.').length -1];
                             $('#'+formName).find("ul li:last").append('<div class="join ' +Object.keys(pointLatLng)[k-1] + '">' +
                                 '<img class="pull-left latLngRemove" src="image/portlet-remove-icon-white.png">' +
                                 '<em>' +pointLatLng[Object.keys(pointLatLng)[k-1]]  + '：</em><span name="' + viewCookieDataColums[j] + '">' +originName+"("+viewCookieDataColums[j]+")"  + '</span></div>');
                    }
                }
            }

            $('#'+formName).find("ul li:last").find('.latLngRemove').unbind().click(function () {
                var tableWin = $(".group-container[id=" + formName + "]");
                var checkedAll = tableWin.find('.ligature-select-all');
                var tableLis = tableWin.find('ul li');
                var curLatlng = $(this).parent().attr('class').split(' ')[1];
                $(this).parent().remove();
                for (var n = 0; n < tableLis.length - 1; n++) {
                    var curLi = tableLis.eq(n);
                }
                curLi.parents('ul').find('li[latLng="' + curLatlng + '"]').find('span').attr('join', '');
                curLi.parents('ul').find('li[latLng="' + curLatlng + '"]').attr('latLng', '');
            });
    }
        if(sourceLen > 3){
            var tableTitleName =$('#'+formName).find('.ligature-title').find('button[name="surface-join"]');
            join(joinMethod,ul);
            var k = 0;
            for(var i in viewCookieDataFroms[0].source){
                for(var j in viewCookieDataColums){
                    if( i == j){
                        k++;
                        var originName = i.split('.')[i.split('.').length -1];
                        for(var k=0; k<originNameArr.length;k++){
                            $('#'+formName).find("ul li:last").append('<div class="join ' + Object.keys(surfaceLatLng)[k-1] + '">' +
                                '<img class="pull-left latLngRemove" src="image/portlet-remove-icon-white.png">' +
                                '<em>' +surfaceLatLng[Object.keys(surfaceLatLng)[k-1]]  + '：</em><span name="' + viewCookieDataColums[j] + '">' +originName+"("+viewCookieDataColums[j]+")"  + '</span></div>');
                        }

                    }

                }
            }
        }


    }

    function join(joinMethod,ul){
        switch (joinMethod) {
            case 'none-join':
                ul.append('');
                $('#'+name).find('.surface-connect').remove();
                $('#'+name).find('.point-connect').remove();
                break;
            case 'point-join':
                ul.append('<li class="t lastLigature point-connect " id=' + name + "_latlng" + '><div class="ep" ></div></li>');

                //$('.surface-connect').remove();
                $('#'+name).find('.surface-connect').remove();
                initNode($('#' + name + "_latlng"), false);
                break;
            case 'surface-join':
                ul.append('<li class="t lastLigature surface-connect" id=' + name + "_latlng" + '><div class="ep" ></div></li>');

                $('#'+name).find('.point-connect').remove();
                initNode($('#' + name + "_latlng"), false);
                break;
            default :
                break;
        }

    }


    //========================修改视图部分 end============================


});