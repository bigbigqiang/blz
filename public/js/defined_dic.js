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
    //显示字段
    var from = [];
    var dicObj = {};
    var treeObj = {};
    var tdName = [];
    var tableAllNode = [];
    var ajaxTableCount = 0;
    var allDicColumns = [];
    var allDicColumnsObj = [];
    var noRepeatAllColumns=[];
    var mixTreeAllNodes;
    //从cookie中拿出数据
    $.cookie.json = true;
    var dicCookieData = $.cookie('dicData');
    console.log(dicCookieData);
    $.removeCookie('dicData');
    console.log(dicCookieData);
    //初始化侧边栏的点击事件
    $('.sub-menu a[href="./definedDic.do"]').addClass('current_page').parents('.third-level').show().parent().addClass('open');

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
                    //给不同的数据id添加不同的标志
                    for (var i = 0; i < data.data.length; i++) {
                        data.data[i].id = str + data.data[i].id;
                        data.data[i].pId = str + data.data[i].pId;
                    }
                    var tree = $.fn.zTree.init(obj, settings, data.data);
                    tree.expandAll(true);
                    var nodesWsTree = $.fn.zTree.getZTreeObj("tree3");
                    var nodesDbTree = $.fn.zTree.getZTreeObj("tree1");
                    treeObj[str] = data.data;
                    if (treeObj.db && treeObj.ws && dicCookieData) {
                        updateDic(treeObj, nodesDbTree, nodesWsTree, dicCookieData);

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
        $.removeCookie('dicData');
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
        HoverPaintStyle: {stroke: "#1e8151", strokeWidth: 2},
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
                //onClick: ajaxColumn  //点击节点，加载字典字段
            }
        }, selectAllNode);
        mixTree.expandAll(true);

        //清空字典
        from = [];
        $('#dicResult').find('table thead').empty();
        $('#dicResult').find('table tbody').empty();
        stepContent.show();
        queryTestContent.hide();
        //所有节点设为不可用状态,同时加载所有选中的连接器
        mixTreeAllNodes = mixTree.transformToArray(mixTree.getNodes());
        tdName = [];
        tableAllNode = [];
        ajaxTableCount = 0;
        allDicColumns = [];
        allDicColumnsObj = [];
        for (var n = 0; n < mixTreeAllNodes.length; n++) {
            setStatus(mixTreeAllNodes[n], mixTree);
            if (mixTreeAllNodes[n].isParent == false) {
                tdName.push(mixTreeAllNodes[n].name);
                tableAllNode.push(mixTreeAllNodes[n]);
            }
        }
        //判断是否是修改操作
        if (dicCookieData) { //修改字典
            //判断是否修改数据源
            var selectedAllForms = remakeForm(tableAllNode);
            //console.log(selectedAllForms);
            //console.log(dicCookieData.froms);
            if (selectedAllForms.sort().toString() == dicCookieData.froms.sort().toString()) {   //没有修改数据源
                if (dicCookieData.isdistinct == 1) {
                    $("#removeRepeat").attr("checked", true);
                }
                for (var j = 0; j < tableAllNode.length; j++) {
                    ajaxColumn(tableAllNode[j], tableAllNode.length);
                }
                check(dicCookieData.colums,dicCookieData.pk);
                getHeadByEdit(dicCookieData.colums, dicCookieData.pk);
                //getBodyByEdit(dicCookieData);
            }else{
                for (var j = 0; j < tableAllNode.length; j++) {
                    ajaxColumn(tableAllNode[j], tableAllNode.length);
                }
            }

        }
        else {   //新增字典
            for (var j = 0; j < tableAllNode.length; j++) {
                ajaxColumn(tableAllNode[j], tableAllNode.length);
            }
        }
    });
    //根据选中的节点重组form
    function remakeForm(tableAllNode) {
        var allForms = [];
        for (var j = 0; j < tableAllNode.length; j++) {
            var type = tableAllNode[j].id.substring(0, 2);
            var formName = tableAllNode[j].name;
            if (type == 'db') {
                //console.log(tableAllNode[j].getParentNode());
                var dbName = tableAllNode[j].getParentNode().name.split('/')[1];
                var dbType = tableAllNode[j].getParentNode().getParentNode().name;
                var form = type + '.' + dbType + '.' + dbName + '.' + formName;
                allForms.push(form);
            }
            else {
                console.log('服务');
            }
        }
        return allForms;
    }

    //修改字典，根据后台传过来的数据拼接thead
    function check(columns,pk){
        var columnsKeys = Object.keys(columns);
        console.log(columnsKeys);
        var columnsInput = $('#dicResult thead th input[type="checkbox"]');
        console.log(columnsInput.length);
        for( var m = 0;m <columnsKeys.length;m++){
            $('#dicResult thead th input[value="'+columnsKeys[m]+'"]').attr("checked",true);
            //columnsInput.each(function(){
            //    console.log(this.val());
            //
            //})
            //for(var i = 0;i<columnsInput.length;i++){
            //    if(columnsInput[i].val() == columnsKeys[m]){
            //        columnsInput[i].attr('checked',true);
            //    }
            //}
        }
        $('#dicResult thead th input[type="radio"][value="'+pk+'"]').attr("checked",true);


    }
    function getHeadByEdit(columns, pk) {
        var columnsKeys = Object.keys(columns);

        var tr = '<th>表名</th>';
        var tHead = '';
        for (var m = 0; m < columnsKeys.length; m++) {
            tr += '<th>' +
                '<label class="btn btn-default">'+'<input type="checkbox" id="'+columnsKeys[m]+'">'
                '<input type="radio" name="thead" autocomplete="off" id="' + columnsKeys[m] + '">' + columnsKeys[m] + '</label>' +
                '</th>';
        }
        tHead = '<tr>' + tr + '</tr>';
        $('#dicResult').find('thead').empty().append(tHead).find('input:first').attr('checked', true);
    }

    //修改字典，根据后台传过来的数据拼接tbody
    function getBodyByEdit(data) {
        var forms = data.froms;
        var columns = data.colums;
        var columnsKeys = Object.keys(columns);
        for (var m = 0; m < forms.length; m++) {
            var curForm = forms[m];
            var curFormArr=curForm.split('.');
            var curFormName = curFormArr[3];
            var tr = '';
            var td = '<td>' + curFormName + '</td>';
            for (var n = 0; n < columnsKeys.length; n++) {
                var curKey = columnsKeys[n];
                var curKeyArr = columns[curKey];
                var field = curForm + '.' + curKey;
                var fieldNum=transTypeName2Num(field);
                var newField;
                if ($.inArray(field, curKeyArr) >= 0) {
                    newField=[curFormArr[0],fieldNum,curFormName,curKey].join('.');
                    td += '<td id="' + newField + '">' + curKey + '</td>';
                }
                else {
                    for (var t = 0; t < curKeyArr.length; t++) {
                        var curKeyColumn = curKeyArr[t];
                        var curKeyColumnArr = curKeyColumn.split('.');
                        var fourField = [curKeyColumnArr[0], curKeyColumnArr[1], curKeyColumnArr[2], curKeyColumnArr[3]].join('.');
                        if (fourField == curForm) { //重命名
                            var originalName = curKeyColumnArr[4];
                            newField=[curFormArr[0],fieldNum,curFormName,originalName].join('.');
                            td += '<td id="' + newField + '" name="'+curKey+'">' + originalName + '(' + curKey + ')</td>';
                            break;
                        }
                        else {
                            if (t == curKeyArr.length - 1) { //遍历完还没找到
                                td += '<td></td>';
                            }
                        }
                    }
                }
            }
            tr = '<tr>' + td + '</tr>';
            var tbodyDom=$('#dicResult tbody');
            tbodyDom.append(tr);
            //设置表名和tr的id属性值
            var allTr=tbodyDom.find('tr');
            for(var r=0;r<allTr.length;r++){
                var newFormField=allTr.eq(r).find('td[id]').eq(1).attr('id');
                var newFormFieldArr=newFormField.split('.');
                var newFormName=[newFormFieldArr[0],newFormFieldArr[1],newFormFieldArr[2]].join('.');
                allTr.eq(r).find('td').eq(0).attr('id',newFormName);
                allTr.eq(r).attr('id',newFormName);
            }
        }
    }

    //把类型和名称转换成数字
    function transTypeName2Num(field) {
        var fieldArr = field.split('.');
        var nodes = $.fn.zTree.getZTreeObj("tree1").getNodesByParam('name', fieldArr[3]);
        for (var j = 0; j < nodes.length; j++) {
            var parentNode = nodes[j].getPath();
            var str = parentNode[0].id.substring(0, 2);
            var type = parentNode[0].name;
            var form = parentNode[1].name.split('/')[1];
            if (str == fieldArr[0] && type == fieldArr[1] && form == fieldArr[2]) {
                var num = parentNode[1].mId;
            }
        }
        return num;
    }

    //第二步的下一步
    btnNext.eq(1).click(function () {
        var tr = $('#dicResult').find('table tbody tr');
        if (tr.length <= 0) {
            layer.msg('请先定义字典', {time: 2000});
            return;
        }
        stepOneContainer.hide();
        stepTwoContainer.hide();
        stepThreeContainer.show();
        stepLi.removeClass("activeStep");
        stepLi.eq(2).addClass("activeStep");
        $("#viewName").val("");
        $("#viewVersion").val("");
        if (dicCookieData) {
            $("#viewName").val(dicCookieData.name);
            $("#viewVersion").val(dicCookieData.comments);
        }
    });
    //第二步的上一步
    btnPrev.eq(0).click(function () {
        stepOneContainer.show();
        stepTwoContainer.hide();
        stepThreeContainer.hide();
        stepLi.removeClass("activeStep");
        stepLi.eq(0).addClass("activeStep");

    });
    //第三步的上一步
    btnPrev.eq(1).click(function () {
        stepOneContainer.hide();
        stepTwoContainer.show();
        stepThreeContainer.hide();
        stepLi.removeClass("activeStep");
        stepLi.eq(1).addClass("activeStep");
    });


    //点击节点加载字典字段
    function ajaxColumn(treeNode, count) {
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
                getDBColume(parents[1].mId, treeNode.name, obj, count);
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

                getWSColume(parents[parents.length - 1].mId, treeNode.name, wsObj, count);
            }
        }
    }


    //加载数据库表内字段
    function getDBColume(id, name, obj, count) {//向右边空白处添加div列表
        $.ajax({
            url: '/iwherelink/getColumnByTable.do',
            //url: '/testData/define_dic/columns.json',
            type: 'get',
            data: {
                databaseId: Number(id),
                tablename: name
            },
            dataType: 'json',
            success: function (data) {
                if (data.code == 1) {
                    layer.alert('请求表内字段出错，请刷新');
                }
                else {
                    ajaxTableCount++;
                    //重新构造数据
                    var dicData = {
                        "id": id,
                        "name": name,
                        "data": data.data
                    };
                    allDicColumns.push(...(data.data));
                    allDicColumnsObj.push(dicData);
                    if (ajaxTableCount === count) {
                        noRepeatAllColumns=Array.from(new Set(allDicColumns));
                        //补全数据,构造新数据
                        for (var r = 0; r < allDicColumnsObj.length; r++) {
                            var curObj = allDicColumnsObj[r];
                            var curObjData = curObj.data;
                            var newData = [];
                            for (var s = 0; s < noRepeatAllColumns.length; s++) {
                                var curVal = noRepeatAllColumns[s];
                                if ($.inArray(curVal, curObjData) >= 0) {
                                    newData.push(curVal);
                                }
                                else {
                                    newData.push('noneVal');
                                }
                            }
                            curObj.data = newData;
                        }
                        var tHead = getHead(noRepeatAllColumns);
                        var tBody = getBody('db', allDicColumnsObj);

                    }
                }
            },
            error: function () {
                layer.alert('请求表内字段出错，请刷新');
            }
        });
    }

    //拼thead
    function getHead(noRepeatAllColumns) {
        var tr = '<th>表名</th>';
        var tHead = '';
        for (var m = 0; m < noRepeatAllColumns.length; m++) {
            tr += '<th>' +
                '<label class="btn btn-default">' +'<input type="checkbox" value="' + noRepeatAllColumns[m] + '"  id="' + noRepeatAllColumns[m] + '" >'+
                '<input type="radio" name="thead" autocomplete="off" value="' + noRepeatAllColumns[m] + '" id="' + noRepeatAllColumns[m] + '" >' + noRepeatAllColumns[m] + '</label>' +
                '</th>';
        }
        tHead = '<tr>' + tr + '</tr>';
        $('#dicResult').find('thead').empty().append(tHead).find('#id').attr('checked', true);
        return tHead;
    }

    //拼tbody
    function getBody(type, allDicColumnsObj) {
        // 拼tbody
        var tBody = '';
        for (var n = 0; n < allDicColumnsObj.length; n++) {
            var curTr = '';
            var curTable = allDicColumnsObj[n];
            /*if (type == 'db') {
             var curTrInfo = 'db.' + curTable.id + '.' + curTable.name;
             var curTd = '';
             var curTableName = '<td id="' + curTrInfo + '">' + curTable.name + '</td>';
             for (var t = 0; t < curTable.data.length; t++) {
             if (curTable.data[t] !== 'noneVal') {
             var curTdInfo = 'db.' + curTable.id + '.' + curTable.name + '.' + curTable.data[t];
             curTd += '<td id="' + curTdInfo + '">' + curTable.data[t] + '</td>';
             }
             else {
             curTd += '<td></td>';
             }
             }
             curTr = '<tr id="' + curTrInfo + '">' + curTableName + curTd + '</tr>';
             tBody += curTr;
             }*/
            var curTrInfo = type + '.' + curTable.id + '.' + curTable.name;
            var curTd = '';
            var curTableName = '<td id="' + curTrInfo + '">' + curTable.name + '</td>';
            for (var t = 0; t < curTable.data.length; t++) {
                if (curTable.data[t] !== 'noneVal') {
                    console.log(curTable.data[t]);
                    var curTdInfo = type + '.' + curTable.id + '.' + curTable.name + '.' + curTable.data[t];
                    curTd += '<td id="' + curTdInfo + '" name = "'+ curTable.data[t]+'">' + curTable.data[t] + '</td>';
                }
                else {
                    curTd += '<td></td>';
                }
            }
            curTr = '<tr id="' + curTrInfo + '">' + curTableName + curTd + '</tr>';
            tBody += curTr;
        }
        $('#dicResult').find('tbody').empty().append(tBody);
        return tBody;
    }

    //加载服务表内字段
    function getWSColume(databaseId, tablename, obj, count) {
        $.ajax({
            type: 'GET',
            url: '/iwherelink/getDataService.do',
            dataType: 'json',
            data: {
                id: databaseId
            },
            traditional: true,
            success: function (data) {
                if (data.code == 0) {

                    ajaxTableCount++;
                    //重新构造数据
                    var dicData = {
                        "id": databaseId,
                        "name": tablename,
                        "data": data.data
                    };
                    allDicColumns.push(...(data.data));
                    allDicColumnsObj.push(dicData);
                    if (ajaxTableCount === count) {
                        noRepeatAllColumns=Array.from(new Set(allDicColumns));
                        //补全数据,构造新数据
                        for (var r = 0; r < allDicColumnsObj.length; r++) {
                            var curObj = allDicColumnsObj[r];
                            var curObjData = curObj.data;
                            var newData = [];
                            for (var s = 0; s < noRepeatAllColumns.length; s++) {
                                var curVal = noRepeatAllColumns[s];
                                if ($.inArray(curVal, curObjData) >= 0) {
                                    newData.push(curVal);
                                }
                                else {
                                    newData.push('noneVal');
                                }
                            }
                            curObj.data = newData;
                        }
                        var tHead = getHead(noRepeatAllColumns);
                        var tBody = getBody('ws', allDicColumnsObj);
                    }
                }
                else {
                    layer.msg('获取服务表内字段错误');
                }

            },
            error: function (e) {
            }
        });
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


    //重命名
    $('#dicResult').on('click', 'tr>td[id]', function () {
        var thead = $('#dicResult thead ');
        var tbody = $('#dicResult tbody ');
        var th = thead.find("th");
        var tr = tbody.find("tr");
        var td = $(this);
        var origianalVal = td.text();
        var originalValArr = getOriginalNameAndNewName(origianalVal);
        var tdIndex = td.index();         //当前单元格索引
        var trIndex = td.parent().index(); //当前行索引
        var elseTrTd=[];
        var formName=td.siblings().eq(0).attr('id');
        renameLayer(originalValArr, function (index, layero) {
            var rename = layero.find('#addAlias').val().trim();
            console.log(rename);
            console.log(originalValArr);
            layer.close(index);
            if(rename==''){   //当前要重命名的字段为空
                if(originalValArr.length==2){   //之前该字段已经重命名过
                    console.log(111);
                    var alRename=originalValArr[1];
                    elseTrTd=getElseTdVal(td);
                    console.log(elseTrTd);
                    var renameFieldIndex1=thead.find('input[id="'+originalValArr[0]+'"]').parents('th').index();
                    var curRenameTd1=td.parent().find('td').eq(Number(renameFieldIndex1));
                    if(elseTrTd.length==0&&renameFieldIndex1>=0){
                        if(curRenameTd1.text().trim()!==''){     //同一单元格内两个值
                            layer.alert('字段已存在，不能重复设置');
                        }
                        else{
                            thead.find('th').eq(tdIndex).remove();
                            noRepeatAllColumns.splice(noRepeatAllColumns.indexOf(alRename),1);
                            curRenameTd1.text(originalValArr[0]).attr('id',td.text('').attr('id'));
                            td.text('').removeAttr('id');
                            for (var  t= 0; t < tr.length; t++) {
                                tr.eq(t).find('td').eq(tdIndex).remove();
                            }
                        }
                    }
                    if(elseTrTd.length==0&&renameFieldIndex1<0){
                        thead.find('th').eq(tdIndex).remove();
                        noRepeatAllColumns.splice(noRepeatAllColumns.indexOf(originalValArr[1]),1);
                        thead.find('tr').append('<th><label class="btn btn-default">' +'<input type="checkbox" id="'+originalValArr[0]+'" value="'+originalValArr[0]+'">'+
                            '<input type="radio" name="thead" autocomplete="off" id="' + originalValArr[0] + '" value="'+originalValArr[0]+'">' + originalValArr[0] + '</label></th>');
                        td.text(originalValArr[0]);
                        for (var y = 0; y < tr.length; y++) {
                            if(trIndex!==y){
                                tr.eq(y).find('td').eq(tdIndex).remove();
                                tr.eq(y).append('<td></td>');
                            }
                        }
                    }
                    if(elseTrTd.length!==0&&renameFieldIndex1<0){
                        var newColumn = '<th><label class="btn btn-default">' +'<input type="checkbox" id="'+originalValArr[0]+'" value="'+originalValArr[0]+'">'+
                            '<input type="radio" name="thead" autocomplete="off" id="' + originalValArr[0] + '" value="'+originalValArr[0]+'">' + originalValArr[0] + '</label></th>';
                        thead.find('tr').append(newColumn);
                        noRepeatAllColumns.push(originalValArr[0]);
                        td.text("").removeAttr('id');
                        tr.eq(trIndex).append('<td id="' + td.attr('id') + '">'+originalValArr[0]+'</td>');
                        for (var k = 0; k < tr.length; k++) {
                            var curTrTd = tr.eq(k).find('td').eq(tdIndex);
                            var curTrTdId = curTrTd.attr('id');
                            if (trIndex !== k) {
                                tr.eq(k).append('<td></td>');
                            }
                        }
                        $("#jsplumb-canvas").mCustomScrollbar('update');
                    }
                    if(elseTrTd.length!==0&&renameFieldIndex1>=0){
                        curRenameTd1.text(originalValArr[0]).attr('id',td.text('').attr('id'));
                        td.text('').removeAttr('id');
                    }
                }
            }
            else{
                var newTdField=[formName,rename].join('.');
                console.log(newTdField);
                var renameFieldIndex=thead.find('input[id="'+rename+'"]').parents('th').index();
                var curRenameTd=td.parent().find('td').eq(Number(renameFieldIndex));
                if($.inArray(rename,noRepeatAllColumns)>=0){ //表头已经存在重命名字段
                    if(curRenameTd.text().trim()!==''){     //同一单元格内两个值
                        layer.alert(newTdField+'字段已存在，不能重复设置');
                    }
                    else{
                        td.text('').removeAttr('id');
                        curRenameTd.text(originalValArr[0]+'('+rename+')').attr('id',[formName,originalValArr[0]].join('.'));
                        elseTrTd=getElseTdVal(td);
                        if(elseTrTd.length==0){
                            thead.find('th').eq(tdIndex).remove();
                            td.remove();
                            if(originalValArr[1]==''){
                                noRepeatAllColumns.splice(noRepeatAllColumns.indexOf(originalValArr[0]),1);
                            }
                            else{
                                noRepeatAllColumns.splice(noRepeatAllColumns.indexOf(originalValArr[1]),1);
                            }

                            for (var e = 0; e < tr.length; e++) {
                                if(e!==trIndex){
                                    tr.eq(e).find('td').eq(tdIndex).remove();
                                }

                            }
                        }
                    }
                }
                else{
                    noRepeatAllColumns.push(rename);
                    td.text(originalValArr[0] + "(" + rename + ")");
                    th.eq(tdIndex).find('label').html('<input type="checkbox" id="' + rename + '" value="'+originalValArr[0]+'"><input type="radio" name="thead" autocomplete="off" id="' + rename + '" value="'+originalValArr[0]+'">' + rename + '');
                    elseTrTd=getElseTdVal(td);
                    if (elseTrTd.length !== 0) {  //其他行，当前位置td有值
                        var elseTrTdValArr=getOriginalNameAndNewName(elseTrTd[0]);
                        var elseTrTdVal;
                        var elseTrTdIdVal;
                        if(elseTrTdValArr[1]!==''){
                            elseTrTdVal=elseTrTdValArr[1];
                            elseTrTdIdVal=elseTrTdValArr[1];
                        }
                        else{
                            elseTrTdVal=elseTrTdValArr[0];
                            elseTrTdIdVal=elseTrTdValArr[0];
                        }
                        var newColumn = '<th><label class="btn btn-default">'+'<input type="checkbox" id="'+elseTrTdIdVal+'" value="'+elseTrTdValArr[0]+'">'+
                            '<input type="radio" name="thead" autocomplete="off" id="' +elseTrTdIdVal + '" value="'+elseTrTdValArr[0]+'">' + elseTrTdVal + '</label></th>';
                        thead.find('tr').append(newColumn);
                        tr.eq(trIndex).append('<td></td>');
                        for (var k = 0; k < tr.length; k++) {
                            var curTrTd = tr.eq(k).find('td').eq(tdIndex);
                            var curTrTdId = curTrTd.attr('id');
                            if (trIndex !== k && curTrTdId !== undefined) {
                                tr.eq(k).find('td').eq(tdIndex).text('').removeAttr('id');
                                tr.eq(k).append('<td id="' + curTrTdId + '">' + elseTrTd[0] + '</td>');
                            }
                            if (trIndex !== k && curTrTdId == undefined) {
                                tr.eq(k).append('<td></td>');
                            }
                        }
                        $("#jsplumb-canvas").mCustomScrollbar('update');
                    }
                }
            }
        });
    });
    //获取当前单元格所在列的其他行所有值
    function getElseTdVal(td){
        var tr=td.parents('tbody').find('tr');
        var tdIndex = td.index();         //当前单元格索引
        var trIndex = td.parent().index(); //当前行索引
        var elseTrTd = []; //其他行，当前位置td所有值
        for (var j = 0; j < tr.length; j++) {
            var curTd = tr.eq(j).find('td').eq(tdIndex);
            var curTdText = curTd.text();
            console.log(curTdText);
            if (trIndex == j || curTdText == undefined || curTdText == "") {
                continue;
            }
            else {
                elseTrTd.push(curTdText);
            }
        }
        return elseTrTd;
    }


    //重命名弹窗
    function renameLayer(originalValArr, fn) {
        var name;
        if (originalValArr[1].trim() == '') {
            name = originalValArr[0];
        }
        else {
            name = originalValArr[1];
        }
        layer.open({
            type: 1,
            content: '<label style="margin-left: 50px;margin-top: 10px">添加别名：<input id="addAlias" type="text" value="' + name + '">',
            title: "重命名",
            area: ["400px", "155"],
            offset: "250px",
            btn: ["确定", "取消"],
            yes: function (index, layerO) {
                fn && fn(index, layerO);
            }
        });
    }

    //返回按钮
    queryTestBack.on("click", function () {
        queryTestContent.hide();
        stepContent.show();
        $('#jsplumb-connect').show();
        $('#search-result').hide();
        conditions.show();
    });

    //获取数据
    function getData() {
        var pk = $("#dicResult").find('thead label input[type="radio"]:checked').parent().text();
        var removeRepeat = $('#removeRepeat').prop('checked');
        var isDistinct;
        if (removeRepeat == true) {
            isDistinct = 1;
        }
        else {
            isDistinct = 0;
        }
        var from = [];
        var columns = {};
        var columnsInput = $('#dicResult thead th input[type="checkbox"]:checked');
        columnsInput.each(function(){

                console.log($(this).val());

        })
        var tableTr = $('#dicResult tbody tr');
        for (var k = 0; k < tableTr.length; k++) {
            from.push(tableTr.eq(k).attr('id'));
        }
        for (var i = 0; i < columnsInput.length; i++) {
            var curColumnKey = columnsInput.eq(i).attr('id');
            var curColumnValue = columnsInput.eq(i).attr('value');
            console.log(curColumnKey);
            console.log(columnsInput.length);
            columns[curColumnKey] = [];
            for (var j = 0; j < tableTr.length; j++) {
                var curField = tableTr.eq(j).find('td[name="'+curColumnValue+'"]').attr('id');
                console.log(curField);
                if(columnsInput.eq(i).checked == true){
                    console.log(columnsInput.eq(i));
                }
                if (curField !== undefined) {
                    columns[curColumnKey].push(curField)

                }
                console.log(columns);

            }
        }
        dicObj = {
            pk: pk,
            "colums": JSON.stringify(columns),
            "from": from,
            isdistinct: isDistinct
        };
        console.log(dicObj);
        return dicObj;
    }

    //查询测试
    queryTest.click(function () {
        var dicObj = getData();
        $.ajax({
            type: 'POST',
            //type: 'get',
            url: '/iwherelink/combine/test.do',
            //url: '/testData/define_dic/searchResult.json',
            dataType: 'json',
            data: dicObj,
            traditional: true,
            success: function (data) {
                if (data.code == 0) {
                    $('#jsplumb-connect').hide();
                    $('#search-result').show();
                    queryTestContent.show();
                    stepContent.hide();
                    conditions.hide();
                    showTable(data.data);
                } else {
                    layer.alert(data.message);
                }
            }, error: function (e) {
                layer.msg('查询失败', {time: 2000});
            }
        });
    });

    function showTable(data) {
        var tr = "";
        var hr = "";
        var th = "";
        var ths = {};
        var trs = [];
        $.each(data.data, function (n, data) {
            var tds = {};
            $.each(data, function (key, value) {
                tds[key] = value;
                ths[key] = "";
            });
            trs.push(tds);
        });
        for (var i = 0; i < trs.length; i++) {
            var tmp = trs[i];
            var td = "";
            $.each(ths, function (key, value) {
                if (tmp[key] != null) {
                    td += "<td>" + tmp[key] + "</td>";
                } else {
                    td += "<td></td>";
                }
            });
            tr += "<tr >" + td + "</tr>";
        }
        $.each(ths, function (key, value) {
            th += "<th>" + key + "</th>";
        });
        hr = "<tr>" + th + "</tr>";
        var tbody = "<tbody>" + tr + "</tbody>";
        var thead = "<thead>" + hr + "</thead>";
        var table = thead + tbody;
        $('.queryTestTable').find('table').empty().append(table);
    }

    $("#viewName").focus(function () {
        $('.msg').hide();
    });
    //保存字典
    var isdistinct;
    $(".btn-complete").click(function () {
        var reg1 = /^\S*$/;
        var reg2 = /^[\u4e00-\u9fa5a-zA-Z0-9\_]*$/;  //只含有汉字、数字、字母下划线
        var dicData = getData();
        var dicName = $("#viewName").val().trim();
        if (dicName == '') {
            $('.msg').show();
            return false;
        }
        if (!reg1.test(dicName)) {
            $('.msg').show().text('不能包含空格');
            return;
        }
        if (!reg2.test(dicName)) {
            $('.msg').show().text("不能包含特殊字符");
            return;
        }
        var dicComment = $("#viewVersion").val().trim();
        var dicAuth = $("#viewAuth").find('option:selected').attr("value");
        dicData.name = dicName;
        dicData.comments = dicComment;
        dicData.status = dicAuth;
        if (dicCookieData) {
            dicData.id=dicCookieData.id;
            $.ajax({
                type: 'post',
                url: '/iwherelink/combine/update.do',
                dataType: 'json',
                data: dicData,
                traditional: true,
                success: function (data) {
                    if (data.code == 1) {
                        layer.msg(data.message, {time: 2000});
                    }
                    else {
                        layer.msg("修改字典成功！", {time: 2000});
                        setTimeout(function () {
                            window.location.href = "/dicManager.do";
                        }, 2000);
                    }
                },
                error: function () {
                    layer.alert("修改失败，请重新修改");
                }
            });
        } else {
            $.ajax({
                type: 'post',
                url: '/iwherelink//combine/add.do',
                dataType: 'json',
                data: dicData,
                traditional: true,
                success: function (data) {
                    if (data.code == 1) {
                        layer.msg(data.message, {time: 2000});
                    }
                    else {
                        layer.msg("保存字典成功！", {time: 2000});
                        setTimeout(function(){
                            window.location.href='/dicManager.do';
                        },2000);
                    }
                },
                error: function () {
                    layer.alert("保存失败，请重新保存");
                }
            });
        }


    });
    //字典修改加载tree2
    var arr = [];

    function updateDic(treeObj, nodesDbTree, nodesWsTree, dicCookieData) {
        for (var i = 0; i < dicCookieData.froms.length; i++) {
            var checkNodesArr = [];
            var strDicCookieData = dicCookieData.froms[i];
            var dataType = strDicCookieData.slice(0, 2);
            var tableName = strDicCookieData.slice(strDicCookieData.lastIndexOf(".") + 1);

            if (dataType == "ws") {
                for (var k = 0; k < treeObj.ws.length; k++) {
                    if (treeObj.ws[k].name == tableName) {
                        var wsNode = nodesWsTree.getNodeByParam("name", treeObj.ws[k].name);

                        nodesWsTree.checkNode(wsNode, true, true);
                        //tree2当前选中的所有节点
                        var checkWsNodes = nodesWsTree.getCheckedNodes(true);
                        var WsTree = $.fn.zTree.getZTreeObj("tree3");
                        for (var n = 0; n < checkWsNodes.length; n++) {
                            strs = {
                                id: checkWsNodes[n].id,
                                name: checkWsNodes[n].name,
                                mId: checkWsNodes[n].mId,
                                pId: checkWsNodes[n].pId,
                                isParent: checkWsNodes[n].isParent
                            };


                            checkNodesArr.push(strs);
                            selectAllNode.push(strs);

                        }
                        disableCurNode(WsTree, checkNodesArr);

                    }
                }

            }
            else if (dataType == "db") {
                for (var j = 0; j < treeObj.db.length; j++) {
                    if (treeObj.db[j].name == tableName) {
                        var dbNode = nodesDbTree.getNodeByParam("name", treeObj.db[j].name);
                        nodesDbTree.checkNode(dbNode, true, true);
                        //tree1当前选中的所有节点
                        var checkNodes = nodesDbTree.getCheckedNodes(true);
                        var DbTree = $.fn.zTree.getZTreeObj("tree1");
                        for (var m = 0; m < checkNodes.length; m++) {
                            var strs = {
                                id: checkNodes[m].id,
                                name: checkNodes[m].name,
                                mId: checkNodes[m].mId,
                                pId: checkNodes[m].pId,
                                isParent: checkNodes[m].isParent
                            };

                            checkNodesArr.push(strs);
                            selectAllNode.push(strs);
                        }
                        disableCurNode(DbTree, checkNodesArr);
                    }
                }
            }
        }
        var noRepeatedArr = deleteRepeat(selectAllNode);
        refreshTree('tree2', noRepeatedArr);
        //把tree1当前选中的所有节点放在tree2中
        var tree2 = $.fn.zTree.init($('#tree2'), settings, selectAllNode);
        tree2.expandAll(true);

    }
});