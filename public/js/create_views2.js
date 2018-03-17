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
                //console.log(data);
                if (data.code == 0) {
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
                    var tree = $.fn.zTree.init(obj, settings, data.data);
                    tree.expandAll(true);
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


    //getTreeNode('/iwherelink/getAllDatabase.do', $("#tree1"),"db");
    //getTreeNode('/iwherelink/getAllWebService.do', $("#tree3"),"ws");
    getTreeNode('/testData/tree.json', $("#tree1"), "db");
    getTreeNode('/testData/tree2.json', $("#tree3"), "ws");

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
        removeTreeNode(selectedTree, dbTree);
    });
    //移除已经选中的树节点
    removeNodeBtn.eq(1).click(function () {
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
            if (originalSingleNode[m].getParentNode()) {
                for (var j = 0; j < originalSingleNode[m].getParentNode().children.length; j++) {
                    if (originalSingleNode[m].getParentNode().children[j].chkDisabled == false) {
                        flag = false;
                        break;
                    }
                }
                if (flag) {
                    setStatus(originalSingleNode[m].getParentNode(), tree);
                }
            }
        }
    }

    //设置节点为灰色，复选框不可点击
    function setStatus(node, tree) {
        var treeId = tree.setting.treeId;
        var tId=node.tId;
        console.log(node);
        console.log(tId);
        var nodeDom = $("#" + treeId).find("#"+tId+"_a");
        nodeDom.addClass('disabledSelectedNode');
        tree.setChkDisabled(node, true);
    }

    //设置节点为黑色，复选框可点击
    function resetStatus(node, tree) {
        var treeId = tree.setting.treeId;
        var tId=node.tId;
        var nodeDom = $("#" + treeId).find("#"+tId+"_a");
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
    var btnNext = $(".btn-abled");
    var btnPrev = $(".btn-prev");
    var stepLi = $(".processStep").find("li");
    //第一步的下一步
    btnNext.eq(0).click(function () {
        var tree = $.fn.zTree.getZTreeObj('tree2');
        var nodes = tree.getNodes();
        if (nodes.length <= 0) {
            layer.alert('请选择数据源');
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
                beforeClick: disableClick,
                onClick: ajaxConnectWin  //点击节点，加载连线窗口
            }
        }, selectAllNode);
        mixTree.expandAll(true);
        //清空连接器
        var groupContainer=$('.group-container');
        if(groupContainer.length>0){
            for(var i=0;i<groupContainer.length;i++){
                var group = groupContainer.eq(i).attr("group");
                instance.removeGroup(group);
            }
        }
        conditions.hide();
    });
    //第二步的下一步
    btnNext.eq(1).click(function () {
        stepOneContainer.hide();
        stepTwoContainer.hide();
        stepThreeContainer.show();
        stepLi.removeClass("activeStep");
        stepLi.eq(2).addClass("activeStep");
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
//"查询条件"输入框是否显示
    query_condition.change(function () {
        var this_checked = $(this).prop("checked");
        if (this_checked) {
            conditions.show();
            condition_left.show();
            condition_left.find('.condition').last().find('.delete_condition').on('click', function () {
                $(this).parent().remove();
            });
            updateSelect();
            if (sort_condition.prop('checked')) {
                condition_left.width('49%');
                condition_right.width('50%');
            } else {
                condition_left.width('100%');
            }
        } else {
            condition_left.hide();
            if (sort_condition.prop('checked')) {
                condition_right.width('100%');
            } else {
                conditions.hide();
            }
        }
    });
    function updateSelect() {//重新获取字段添加到select里面
        var selects = $('.select_field');
        for (var i = 0; i < selects.length; i++) {
            var v = selects.eq(i).val();
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

    function getSelect() {//获取表的字段
        var table = $('.ligatureTable');
        if (table.length) {
            var select = '<option value="0">请选择字段..</option>';
            for (var i = 0; i < table.length; i++) {
                var tableTitleName = table.eq(i).find('div.ligature-title').find("span").text();
                var tHeader = tableTitleName;
                var tBody = table.eq(i).find('ul li');
                select += '<optgroup label=' + tHeader + '>';
                if (tBody.length) {
                    for (var n = 0; n < tBody.length; n++) {
                        var listName = tBody.eq(n).find("span").text();
                        var listNameArr = getOriginalNameAndNewName(listName);
                        var listOriginalName = listNameArr[0];
                        var listNewName = listNameArr[1];
                        select += '<option value=' + tHeader + '.' + listOriginalName + '>' + tHeader + "." + listName + '</option>';
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
            conditions.show();
            condition_right.show();
            condition_right.find('.condition').last().find('.delete_condition').on('click', function () {
                $(this).parent().remove();
            });
            condition_right.find('.condition').last().find('.condition_switch').on('click', addSwitchListen);
            if (query_condition.prop('checked')) {
                condition_right.width('50%');
                condition_left.width('49%');
            } else {
                condition_right.width('100%');
            }
        } else {
            condition_right.hide();
            if (query_condition.prop('checked')) {
                condition_left.width('100%');
            } else {
                conditions.hide();
            }

        }
    });

    function addSwitchListen() {//排序按钮事件
        if ($(this).attr('name') == "ASC") {
            $(this).find('.switch_bar').animate({"left": 0});
            $(this).attr({'name': 'DESC'});
        } else {
            $(this).find('.switch_bar').animate({"left": "40px"});
            $(this).attr({'name': 'ASC'});
        }
    }

    //点击节点加载连接器窗口
    function ajaxConnectWin(e, treeId, treeNode, clickFlag) {
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
                    nodeId:treeNode.id
                };
                addTable(parents[1].mId, treeNode.name, obj);
            }
            //如果是服务表
            else {
                var wsType;
                if(parents.length>2){
                    wsType= parents[1].mId;

                }
                else{
                    wsType=1;
                }
                var wsObj = {
                    type: wsType,
                    mId: treeNode.mId,
                    nodeId:treeNode.id
                };
                addWsTable(parents[parents.length-1].mId, treeNode.name, wsObj);
            }
        }
    }


    //加载数据库表内字段
    function addTable(id, name, obj) {//向右边空白处添加div列表
        $.ajax({
            //url: '/iwherelink/getColumnByTable.do',
            url: '/testData/table2.json',
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
                    var tree = $.fn.zTree.getZTreeObj('mixTree');
                    var node = tree.getSelectedNodes();
                    tree.cancelSelectedNode();
                    setStatus(node[0], tree);
                    var tHeader = '<div id=' + name + '  nodeId=' + obj.nodeId + '    type=' + obj.type + ' mId=' + obj.mId + ' class="ligatureTable group-container" style="top:' + rearrange().top + 'px;left:' + rearrange().left + 'px"  group='+ obj.nodeId.substring(2) +'> ' +
                        '<div class="ligature-title"><input type="checkbox" class="pull-left ligature-select-all" style="margin-top:6px;margin-right:5px;" checked=true /><span name="' + name + '">' + name + '</span><i class="icon-edit" title="添加别名" style="margin-left: 10px"></i><img class="pull-right ligatureRemove" src="image/portlet-remove-icon-white.png" style="margin:3px 0 0 4px;"></div>';
                    var tBody = '<ul>';
                    for (var i = 0; i < data.data.length; i++) {
                        var id = name + "_" + i;
                        tBody += ' <li class="t" id=' + id + '><div class="ep" action=""></div><input name=' + name + ' value=' + data.data[i] + ' type="checkbox" class="pull-left" style="margin-top:3px;" checked=true /><span>' + data.data[i] + '</span><i class="icon-edit pull-left" title="添加别名" style="margin: 4px 0 0 1px"></i></li> ';
                    }
                    var tFoot = '</ul> </div>';
                    stepContent.append(tHeader + tBody + tFoot);
                    drop();
                }
            },
            error: function () {
                layer.alert('请求表内字段出错，请刷新');
            }
        });
    }

    //加载服务表内字段
    function addWsTable(id, name, obj){
        $.ajax({
            //url: '/iwherelink/getDataService.do',
            url: '/testData/table2.json',
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
                    var tree = $.fn.zTree.getZTreeObj('mixTree');
                    var node = tree.getSelectedNodes();
                    tree.cancelSelectedNode();
                    setStatus(node[0], tree);
                    var tHeader = '<div id=' + name + '  nodeId=' + obj.nodeId + '    type=' + obj.type + ' mId=' + obj.mId + ' class="ligatureTable group-container" style="top:' + rearrange().top + 'px;left:' + rearrange().left + 'px"  group='+ obj.nodeId.substring(2) +'> ' +
                        '<div class="ligature-title"><input type="checkbox" class="pull-left ligature-select-all" style="margin-top:6px;margin-right:5px;" checked=true /><span name='+name+'>'+name+'</span><i class="icon-edit" title="添加别名" style="margin-left: 10px"></i><img class="pull-right ligatureRemove" src="image/portlet-remove-icon-white.png" style="margin:3px 0 0 4px;"></div>';
                    var tBody = '<ul>';
                    for (var i = 0; i < data.data.length; i++) {
                        var id = name + "_" + i;
                        tBody += ' <li class="t" id=' + id + '><div class="ep" action=""></div><input name=' + name + ' value=' + data.data[i] + ' type="checkbox" class="pull-left" style="margin-top:3px;" checked=true /><span>' + data.data[i] + '</span><i class="icon-edit pull-left" title="添加别名" style="margin: 4px 0 0 1px"></i></li> ';
                    }
                    var tFoot = '</ul> </div>';
                    stepContent.append(tHeader + tBody + tFoot);
                    drop();
                }
            },
            error: function () {
                layer.alert('请求表内字段出错，请刷新');
            }
        });
    }
    function drop() {//给列表div添加连线事件
        var table = $('.ligatureTable');
        var lastTable = table.eq(table.length - 1);
        var windows = lastTable;
        var ligatureRemove = windows.find("div.ligature-title>img");
        var editIcon = lastTable.find("i.icon-edit");
        ligatureRemove.on("click", function () {
            var group = $(this).parent().parent().attr("group");
            instance.removeGroup(group);

            var tree= $.fn.zTree.getZTreeObj('mixTree');
            var nodeId=$(this).parent().parent().attr("nodeId");
            var disabledNode=tree.getNodesByParam('chkDisabled',true);
            for(var i=0;i<disabledNode.length;i++){
                if(disabledNode[i].id==nodeId){
                    resetStatus(disabledNode[i],tree);
                }
            }
        });
        editIcon.on("click", function () {
            var _this = $(this);
            var originalName = _this.parent();
            var originVal = originalName.find('span').text();
            var originNameArr = getOriginalNameAndNewName(originVal);
            renameLayer(function (index, layerO) {
                var alias = $(layerO).find("#addAlias").val();
                if (alias.match(/^\s+$/) || alias == "") {
                    originalName.find('span').text(originNameArr[0]);
                } else {
                    originalName.find('span').text(originNameArr[0] + "(" + alias + ")");
                }
                layer.close(index);
            }, originVal);
            // layer.open({
            //     type: 1,
            //     content: '<label style="margin-left: 50px;margin-top: 10px">添加别名：<input id="addAlias" type="text"></label>',
            //     title: "重命名",
            //     area: ["400px", "150px"],
            //     offset: "250px",
            //     btn: ["确定", "取消"],
            //     yes: function (index, layerO) {
            //         var alias = $(layerO).find("#addAlias").val();
            //         if (alias.match(/^\s+$/) || alias == "") {
            //             originalName.find('span').text(originVal);
            //         } else {
            //             originalName.find('span').text(originVal + "(" + alias + ")");
            //         }
            //         layer.close(index);
            //     }
            // });

        });

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
                    anchor: "Continuous",
                    proxied:true
                });
            }
            for (var j = 0; j < item.length; j++) {
                initNode(item[j], false);
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
        arrName.push(originalName, newName);
        return arrName;
    }

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
            connectorStyle: {stroke: "#5c96bc", strokeWidth: 2, outlineStroke: "transparent", outlineWidth: 4},
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
            allowLoopback: true
        });
        instance.fire("jsPlumbDemoNodeAdded", el);
    };
    //连接器窗口的位置
    function rearrange() {
        var table = $('.ligatureTable');
        var dataDisplayWidth = parseInt(dataDisplay.width());
        var l, t;
        if (table.length > 0) {
            var lastTable = table.eq(table.length - 1);
            var left = parseInt(lastTable.css('left'));
            var top = parseInt(lastTable.css('top'));
            var w = parseInt(lastTable.width());
            var h = parseInt(lastTable.height());
            if ((dataDisplayWidth - left) < (w + 20)) {
                l = 20;
                t = top + h + 20;
            } else {
                l = left + w + 150;
                t = top;
            }
        } else {
            l = 20;
            t = 50;
        }
        return {
            left: l,
            top: t
        }
    }

    //重命名弹窗
    function renameLayer(fn, originVal) {
        layer.open({
            type: 1,
            content: '<label style="margin-left: 50px;margin-top: 10px">添加别名：<input id="addAlias" type="text" value="' + originVal + '"></label>',
            title: "重命名",
            area: ["400px", "150px"],
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
            currentObj.parent().css({ "color": "#667178" });
        }
        else {
            currentObj.parent().css({ "color": "black" });
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
    });
    //查询测试
    var colums = {};
    queryTest.on('click', function () {
        colums = {};
        var froms = [], wheres = [], orders = [];
        var tableWin = $(".group-container");
        var allConn = instance.getAllConnections();
        var noneConnecService = selectSingleNoneConnService();

        ////单个窗口构造forms
        //for (var i = 0; i < noneConnecService.length; i++) {
        //    var singleForm = {
        //        "source": {},
        //        "target": "",
        //        "label": ""
        //    };
        //    var titleName = noneConnecService[i];
        //    var typeId;
        //    var titleNameDom=tableWin.find('.ligature-title').find('span[name="'+titleName+'"]');
        //    var typeStr=titleNameDom.parent().parent().attr("nodeid").substring(0,2);
        //    if(typeStr=='db'){
        //        typeId=1;
        //    }
        //    else{
        //        typeId=0;
        //    }
        //    var groupTitle = tableWin.find(".ligature-title span:contains('" + titleName + "')");
        //    var databaseTypeId = groupTitle.parent().parent().attr("type");
        //    var databaseNameId = groupTitle.parent().parent().attr("mId");
        //    var titleNameArr = getOriginalNameAndNewName(titleName);
        //    var originalName = typeId+"."+databaseTypeId + "." + databaseNameId + "." + titleNameArr[0];
        //    var newName = titleNameArr[1];
        //    singleForm.source[originalName] = newName;
        //    froms.push(JSON.stringify(singleForm));
        //}

        //单个窗口构造forms
        for (var i = 0; i < noneConnecService.length; i++) {
            var singleForm = {
                "source": {},
                "target": "",
                "label": ""
            };
            var winId = noneConnecService[i];
            var typeId;
            var typeStr=winId.substring(0,2);
            if(typeStr=='db'){
                typeId=1;
            }
            else{
                typeId=0;
            }
            var group =$(".group-container[nodeid='"+winId+"']") ;
            var databaseTypeId = group.attr("type");
            var databaseNameId = group.attr("mId");
            var titleName=group.find('.ligature-title>span').text();
            var titleNameArr = getOriginalNameAndNewName(titleName);
            var originalName = typeId+"."+databaseTypeId + "." + databaseNameId + "." + titleNameArr[0];
            var newName = titleNameArr[1];
            singleForm.source[originalName] = newName;
            froms.push(JSON.stringify(singleForm));
        }
        //遍历连线
        for (var x in allConn) {
            var conn = allConn[x];
            var sourceListNode = $(conn.source);
            var sourceParams = getObjParam(sourceListNode);
            var targetListNode = $(conn.target);
            var targetParams = getObjParam(targetListNode);
            var lebel = conn.getOverlay("label").getLabel();
            var singleForm = {
                "source": sourceParams,
                "target": targetParams,
                "label": lebel
            };
            froms.push(JSON.stringify(singleForm));
        }

        //遍历表中的列
        for (var m = 0; m < tableWin.length; m++) {
            var groupTitleName = tableWin.eq(m).find(".ligature-title span").text();
            var databaseTypeId = tableWin.eq(m).attr("type");
            var databaseNameId = tableWin.eq(m).attr("mId");
            var groupTitleNameArr = getOriginalNameAndNewName(groupTitleName);
            var groupTitleNewName = groupTitleNameArr[1];
            var groupTitleOriginalName = databaseTypeId + "." + databaseNameId + "." + groupTitleNameArr[0];
            colums = getColumnParam(groupTitleName, groupTitleNewName, groupTitleOriginalName);
        }

        var whereDom = condition_left.find(".condition:visible");
        for (var j = 0; j < whereDom.length; j++) {//获取条件
            var field = whereDom.eq(j).find('.input_content');
            var field_source = field.eq(0).val();
            var field_target = field.eq(1).val();
            var field_lable = whereDom.eq(j).find('.select_relationship').val();
            if (field_source == "0" || field_target == "0") {
                continue;
            } else {
                var obj = {};
                obj.source = field_source;
                obj.target = field_target;
                obj.lable = field_lable;
                wheres.push(JSON.stringify(obj));
            }
        }

        // console.log(whereDom);
        // console.log(wheres);

        var ordersDom = condition_right.find(".condition:visible");
        for (var g = 0; g < ordersDom.length; g++) {//获取排序
            var order = ordersDom.eq(g).find('.select_field');
            var order_source = order.eq(0).val();
            var order_lable = ordersDom.eq(g).find('.condition_switch').attr("name");
            if (order_source == "0") {
                continue;
            } else {
                var obj = {};
                obj[order_source] = order_lable;
                orders.push(JSON.stringify(obj));
            }
        }
        // console.log(JSON.stringify(wheres));
        // console.log(orders);

        $.ajax({
            type: 'get',
            //type: 'POST',
            //url: '/iwherelink/doSearchTest.do',
            url: '/testData/searchResult.json',
            dataType: 'json',
            data: {
                colums: JSON.stringify(colums),
                froms: froms,
                wheres: wheres,
                orders: orders
            },
            traditional: true,
            success: function (data) {
                stepContent.hide();
                queryTestTableShow(data.data);

            }, error: function (e) {
                console.log(e);
            }
        });
    });

    //筛选出没有连接的单个的服务
    function selectSingleNoneConnService() {
        var tableTitleName = [];
        var singleTable = []; //独立无连线的服务窗口
        var allConn = instance.getAllConnections();
        var tableWin = $(".group-container");
        var tableWinTitle = tableWin.find(".ligature-title>span");
        var winIds=[];
        //取所有窗口的服务名称（表名）
        for (var i = 0; i < tableWin.length; i++) {
            var tableWinId=tableWin.eq(i).attr('nodeid');
            winIds.push(tableWinId);
        }
        //取所有连线source 和target 所在服务的名称
        for (var j = 0; j < allConn.length; j++) {
            var sourceTableName = $(allConn[j].source).parent().parent().attr('nodeid');
            var targetTableName = $(allConn[j].target).parent().parent().attr('nodeid');
            if ($.inArray(sourceTableName, winIds) >= 0) {
                winIds.splice(sourceTableName, 1);
            }
            if ($.inArray(targetTableName, winIds) >= 0) {
                winIds.splice(targetTableName, 1);
            }
        }
        return winIds;



        ////取所有窗口的服务名称（表名）
        //for (var i = 0; i < tableWinTitle.length; i++) {
        //    tableTitleName.push(tableWinTitle.eq(i).text());
        //}
        ////取所有连线source 和target 所在服务的名称
        //for (var j = 0; j < allConn.length; j++) {
        //    var sourceTableName = $(allConn[j].source).parent().prev().find('span').text();
        //    var targetTableName = $(allConn[j].target).parent().prev().find('span').text();
        //    if ($.inArray(sourceTableName, tableTitleName) >= 0) {
        //        tableTitleName.splice(sourceTableName, 1);
        //    }
        //    if ($.inArray(targetTableName, tableTitleName) >= 0) {
        //        tableTitleName.splice(targetTableName, 1);
        //    }
        //}
        //return tableTitleName;
    }
//通过连线的source和target封装froms参数
    function getObjParam(node) {
        var databaseTypeId = node.parent().parent().attr("type");
        var databaseNameId = node.parent().parent().attr("mId");
        //列名
        var params = {};
        var sourceListName = node.find("span").text();
        var sourceListNameArr = getOriginalNameAndNewName(sourceListName);
        var sourceOriginalListName = sourceListNameArr[0];
        var sourceNewListName = sourceListNameArr[1];
        //表名
        var typeId;
        var typeStr=node.parent().parent().attr("nodeid").substring(0,2);
        if(typeStr=='db'){
            typeId=1;
        }
        else{
            typeId=0;
        }
        var sourceTableName = node.parent().prev().find('span').text();
        var sourceTableNameArr = getOriginalNameAndNewName(sourceTableName);
        var sourceOriginalTableName = typeId+"."+databaseTypeId + "." + databaseNameId + "." + sourceTableNameArr[0];
        var sourceNewTableName = sourceTableNameArr[1];
        var sourceKey = sourceOriginalTableName + "." + sourceOriginalListName;
        if (sourceNewTableName == "") {
            params[sourceKey] = sourceNewTableName;
        }
        else {
            params[sourceKey] = sourceNewTableName + "." + sourceOriginalListName;
        }
        return params;
    }
//遍历表中的列
    function getColumnParam(titleName, newTitleName, originalName) {
        var tableWin = $(".group-container");
        var groupTitle = tableWin.find(".ligature-title span:contains('" + titleName + "')");
        var groupInputs = groupTitle.parent().next().find('input[checked=true]');
        for (var j = 0; j < groupInputs.length; j++) {
            var currentInput = groupInputs.eq(j);
            if (currentInput.prop("checked") == true) {
                var listName = currentInput.next().text();
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
        return colums;
    }
    //显示测试结果表格
    function queryTestTableShow(data) {
        queryTestContent.show();
        queryTestContent.find('table').empty();
        if (data) {
            var tHead = '<thead><tr class="table-title">';
            var tBody = '<tbody>';
            for (x in data) {
                tBody += '<tr>';
                for (g in data[x]) {
                    x == 0 && (tHead += '<th>' + g + '</th>');
                    tBody += '<td class="text-center">' + data[x][g] + '</td>';
                }
                x == 0 && (tHead += '</tr></thead>');
                tBody += '</tr>';
            }
            tBody += '</tbody>';
            queryTestContent.find('table').append(tHead + tBody);
        } else {
            queryTestContent.find('table').append('<tr><td>无测试数据</td></tr>');
        }
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
        selectCondiModel.css({ "left": x + 'px', "top": y - 120 + 'px' });
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
            if (selectCondi.hasClass("select_field")) {
                selectCondiVal = selectCondi.find('option:selected').val();
            }
            else {
                selectCondiVal = selectCondi.val();
            }
            $(".condition>.input_content_active").val(selectCondiVal);
        }
        else {
            $(".condition>.input_content_active").val("")
        }
        selectCondiModel.hide();
    });
    //点击筛选条件输入框的“取消”按钮，筛选条件输入框隐藏
    $('#cancelSelectCondi').click(function () {
        selectCondiModel.hide();
    });
    addInquire.on('click', function () {
        var queryOption = '<div class="condition">' +
            '<label class="condition_label">条件' + (condition_left.find('.condition').length + 1) + '：</label> ' +
            '<input type="text" class="input_content pull-left">' +
            '<select class="select_relationship pull-left" > ' +
            '<option>=</option> ' +
            '<option>></option> ' +
            '<option><</option> ' +
            '<option>><</option> ' +
            '<option>IN</option> </select> ' +
            '<input type="text" class="input_content pull-left">' +
            '<button type="button" class="btn red delete_condition" >X</button> </div>';
        condition_left.append(queryOption);
        condition_left.find('.condition').last().find('.delete_condition').on('click', function () {
            $(this).parent().remove();
        });
        updateSelect();
    });

    //添加排序条件
    addSort.on('click', function () {
        var sortOption = '<div class="condition"> ' +
            '<label class="condition_label">条件' + (condition_right.find('.condition').length + 1) + '：</label> ' +
            '<select class="select_field pull-left"> ' +
            '</select><div name="ASC" class="condition_switch"> ' +
            '<span>ASC</span> <span>DESC</span> <div class="switch_bar"></div> ' +
            '</div> <button type="button" class=" btn red delete_condition">X</button> </div>';
        condition_right.append(sortOption);
        var sortCondition = condition_right.find('.condition');
        var lastCondition = sortCondition.last();
        lastCondition.find('.delete_condition').on('click', function () { $(this).parent().remove(); });
        lastCondition.find('.condition_switch').on('click', addSwitchListen);
        updateSelect();
    });
    //保存视图
    $(".btn-complete").click(function(){
        var viewName=$("#viewName").val().trim();
        var viewVersion=$("#viewVersion").val().trim();
        var viewAuth=$("#viewAuth").find('option:selected').attr("value");
        return;
        $.ajax({
            url:'',
            type:'get',
            dataType:'json',
            data:{

            },
            success:function(data){

            },
            error:function(){

            }
        });
    });



})
;