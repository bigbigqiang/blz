$(function () {
    var stepOneContainer = $("#viewStepOne");
    var stepTwoContainer = $("#viewStepTwo");
    var stepThreeContainer = $("#viewStepThree");
    var query_condition = $("#query_condition");
    var sort_condition = $("#sort_condition");
    var condition = $(".condition");
    var conditions = $(".conditions");
    var condition_left = $(".condition_left");
    var condition_right = $(".condition_right");
    //模拟树数据
    var testTree = {
        data: [
            {
                id: 1,
                text: '父节点1',
                children: [
                    {
                        id: 11,
                        text: '子节点1'
                    },
                    {
                        id: 12,
                        text: '子节点2'
                    }
                ]
            },
            {
                id: 2,
                text: '父节点2',
                children: [
                    {
                        id: 21,
                        text: '子节点1'
                    },
                    {
                        id: 22,
                        text: '子节点2'
                    }
                ]
            }
        ],
        code: 0
    };


    var selectJson = {
        data: []
    };
    var settings = {
        checkable: true
    };
    //异步加载数据库树
    /* $.ajax({
     url: '/iwherelink/getAllDatabase.do',
     type: 'get',
     dataType: 'json',
     data: {
     icon: ''
     },
     success: function (data) {
     if (data.code == 0) {
     var treeJson = data.data;
     var dbTree = initTree($('#tree1'), treeJson);
     var dbCurrentNode = clickNode(dbTree);
     }
     else {
     layer.msg("数据加载失败");
     }
     },
     error: function () {
     layer.msg("异步获取数据库信息错误");
     }
     });
     //异步加载服务树
     $.ajax({
     url: '/iwherelink/getAllWebService.do',
     type: 'get',
     dataType: 'json',
     data: {
     icon: ''
     },
     success: function (data) {
     if (data.code == 0) {
     var treeJson = data.data;
     var wsTree = initTree($('#tree3'), treeJson);
     var wsCurrentNode = clickNode(wsTree);
     }
     else {
     layer.msg("数据加载失败");
     }
     },
     error: function () {
     layer.msg("异步获取数据库信息错误");
     }
     });
     */
    //初始化树并默认所有节点展开
    function initTree(treeObj, data) {
        var treeInstance = treeObj.jstree({
            'core': {
                'data': data.data
            }
        });

        treeInstance.on("loaded.jstree", function (e, data) {
            data.instance.open_all();
            data.instance.hide_icons();
        })
        return treeInstance;
    }

    //树选中事件
    function clickNode(ins) {
        var currentNodeObj = {};
        ins.on("changed.jstree", function (e, data) {
            var selectNodes = [];
            // selectJson.data = [];
            var currentNodeObj = data.node;
            selectJson.data.push(makeTreeNode(currentNodeObj));
            var parentId = currentNodeObj.parent;
            var parentObj = data.instance.get_node(parentId);
            selectJson.data.push(makeTreeNode(parentObj));
            var children = currentNodeObj.children;
            for (var i = 0; i < children.length; i++) {
                var childrenObj = data.instance.get_node(children[i]);
                selectJson.data.push(makeTreeNode(childrenObj));
            }
            return selectJson;
        });
    }

    //拼接新树节点
    function makeTreeNode(obj) {
        var singleNode = {
            id: '',
            text: '',
            parent: ''
        };
        singleNode = {
            id: obj.id,
            text: obj.text,
            parent: obj.parent
        };
        return singleNode;
    }

    //数据库树
    var dbTree = initTree($('#tree1'), testTree);
    // var dbCurrentNode = clickNode(dbTree);

    //服务树
    var wsTree = initTree($('#tree3'), testTree);
    // var wsCurrentNode = clickNode(wsTree);

    //初始化已选列表树
    var selectedTree = $("#tree2").jstree({
        'core': {
            'data': []
        }
    });

    //添加按钮
    // $(".btn-add").click(function () {
    //     if (selectJson.data.length == 0) {
    //         layer.msg("请先选择数据库或服务");
    //     }
    //     else {
    //         console.log(JSON.stringify(selectJson));
    //         $("#tree2").jstree().settings.core.data = selectJson.data;
    //         console.log($("#tree2").jstree());
    //         $("#tree2").jstree().refresh(true);
    //     }
    // });
    //添加按钮
    $(".btn-add").click(function () {
        moveTreeNode($("#tree1").jstree(), $("#tree2").jstree());
    });
    //左右移动
    function moveTreeNode(tree1, tree2) {
        var nodes = tree1.get_selected();
        for (var i = 0; i < nodes.length; i++) {
            var node = tree1.get_node(nodes[i]);
            var nodeObj = {};
            nodeObj.id = node.id;
            nodeObj.text = node.text;
            nodeObj.parent = node.parent;

            treeAddNodes(nodeObj, tree2);
            return;
            treeDeleteNodes(nodes[nodes.length - (i + 1)], tree1);

            tree2, refresh();
            tree1, refresh();
        }
    }

    //添加节点
    function treeAddNodes(nodeObj, tree) {
        var nodes = tree.get_node($("#tree2"));
        console.log(nodes);
        if (nodes.length > 0) {
            var isadd = true;


        }
    }

    //删除节点
    function treeDeleteNodes(node, tree) {
        if (tree.is_parent(node)) {
            if (node.nodes.length > 0) {
                var parentNodes = node.nodes;
                for (var i = 0; i < parentNodes.length; i++) {
                    if (!tree.is_parent(parentNodex[i])) {
                        tree.delete_node(parentNodex[i]);
                    }
                    else if (tree.is_parent(parentNodex[i])) {
                        treeDeleteNodes(parentNodex[i])
                    }
                }
            }
            else {
                tree.delete_node(node);
            }
        }
        else {
            tree.delete_node(node);
        }
    }

    //下一步
    var btnNext = $(".btn-abled");
    var btnPrev = $(".btn-prev");
    var stepLi = $(".processStep").find("li");
    btnNext.eq(0).click(function () {
        stepOneContainer.hide();
        stepTwoContainer.show();
        stepThreeContainer.hide();
        stepLi.removeClass("activeStep");
        stepLi.eq(1).addClass("activeStep");

    });
    btnNext.eq(1).click(function () {
        stepOneContainer.hide();
        stepTwoContainer.hide();
        stepThreeContainer.show();
        stepLi.removeClass("activeStep");
        stepLi.eq(2).addClass("activeStep");
    });
    btnPrev.eq(0).click(function () {
        stepOneContainer.show();
        stepTwoContainer.hide();
        stepThreeContainer.hide();
        stepLi.removeClass("activeStep");
        stepLi.eq(0).addClass("activeStep");
    });
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



    //////////////////////////////////////////////
    //移动节点
    function moveTreeNode(tree1, tree2) {
        var node = tree1.getSelectedNodes();    //当前选中的所有节点
        if(node.length>0){
            currentAllNodes=[];
            var strs={
                id:node[0].id,
                name:node[0].name,
                mid:node[0].mId,
                pId:node[0].pId
            };
            currentAllNodes.push(strs);
            var parentNode=node[0].getParentNode();  //当前节点的父节点
            getAllParentNodes(parentNode);
            //for(var i=currentAllNodes.length-1;i>=0;i--){
            //    addTreeNode(currentAllNodes[i], tree2);
            //
            //    //removeTreeNode(currentAllNodes[i], tree1);
            //}

            tree2.refresh();
            tree1.refresh();
        }
        else{
            layer.msg("请选中要移动的节点",{time:2000});
        }


    }
    //获取当前节点的所有父节点
    function getAllParentNodes(parentNode){
        var prevParentNode;
        if(parentNode!=null){
            var strs={
                id:parentNode.id,
                name:parentNode.name,
                mId:parentNode.mId,
                pId:parentNode.pId
            };
            currentAllNodes.push(strs);
            prevParentNode=parentNode.getParentNode();
            getAllParentNodes(prevParentNode,parentNode);
        }
    }

    //添加节点
    function addTreeNode(node, tree) {
        var selectTreeNodes = tree.transformToArray(tree.getNodes());
        //console.log('正在获取选中的树上节点');
        //console.log(selectTreeNodes);
        if (selectTreeNodes.length > 0) {
            var isAdd = true;
            for(var i=0;i<selectTreeNodes.length;i++){
                if(node.id==selectTreeNodes[i].id){
                    isAdd=false;
                    break;
                }
            }
            if(isAdd){
                console.log(node);
                var aaa=tree.addNodes(null,node);
                console.log(aaa);
            }
        }
        else{
            console.log(node);
            var aaa= tree.addNodes(null,node);
            console.log(aaa);
        }
    }


});

$(function () {
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
    var dbTree;
    var wsTree;
    var selectAllNode = [];  //选中的所有节点
    var needDeleteNode = [];  //需要删除的节点

    //获取树节点数据并初始化树
    function getTreeNode(url, obj) {
        $.ajax({
            type: "get",
            url: url,
            dataType: 'json',
            success: function (data) {
                if (data.code == 0) {
                    var tree = $.fn.zTree.init(obj, settings, data.data);
                    tree.expandAll(true);

                }
                else {
                    layer.alert(data.messages);
                }
            },
            error: function () {
                layer.alert("加载树节点数据失败，请刷新");
            }
        });
    }

    //初始化树设置参数
    var settings = {
        checkable: true,
        view: {
            showIcon: false
        },
        data: {
            simpleData: {
                enable: true
            }
        }
    };

    getTreeNode('/testData/tree.json', $("#tree1"));
    getTreeNode('/testData/tree2.json', $("#tree3"));

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


    //移动节点
    function moveTreeNode(tree1, tree2) {
        var node = tree1.getSelectedNodes();    //当前选中的所有节点
        if (node.length > 0) {
            currentAllNodes = [];
            var strs = {
                id: node[0].id,
                name: node[0].name,
                mId: node[0].mId,
                pId: node[0].pId,
                isParent: node[0].isParent
            };
            currentAllNodes.push(strs);
            selectAllNode.push(strs);
            var parentNode = node[0].getParentNode();   //当前节点的父节点
            getAllParentNodes(parentNode);

            //如果当前节点是父节点，就把子节点也全部添加进去，否则只查找当前节点的父节点
            if (node[0].isParent) {
                var children = node[0].children;
                for (var i = 0; i < children.length; i++) {
                    selectAllNode.push(children[i]);
                }
            }

            //var newSelectAllNode=selectAllNode.concat([]);
            var noRepeatedArr = deleteRepeat(selectAllNode);
            refreshTree('tree2', noRepeatedArr);
            //console.log(noRepeatedArr);

            console.log(currentAllNodes);

            removeTreeNode(tree1, currentAllNodes);

        }
        else {
            layer.msg("请先选中要移动的节点", {time: 2000});
        }


    }

    //获取当前节点的所有父节点
    function getAllParentNodes(parentNode) {
        var prevParentNode;
        if (parentNode != null) {
            var strs = {
                id: parentNode.id,
                name: parentNode.name,
                mId: parentNode.mId,
                pId: parentNode.pId,
                isParent: parentNode.isParent
            };
            currentAllNodes.push(strs);
            selectAllNode.push(strs);
            prevParentNode = parentNode.getParentNode();
            getAllParentNodes(prevParentNode, parentNode);
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

    //删除已经选中的节点
    function deleteSelectedNode(arr1, arr2) {
        for (var i = 0; i < arr2.length; i++) {
            for (var j = 0; j < arr1.length; j++) {
                if (arr1[j].id == arr2[i].id) {
                    arr1.splice(j, 1);
                    j--;
                }
            }
        }
        return arr1;
    }

    //刷新树
    function refreshTree(id, data) {
        $.fn.zTree.destroy(id);
        tree = $.fn.zTree.init($("#" + id), settings, data);
        tree.expandAll(true);
    }

    //移除节点
    function removeTreeNode(tree, arr) {
        var nodes = tree.transformToArray(tree.getNodes());
        console.log(arr);
        selectNeedDeleteNodes(arr);
        var leftNodes=deleteRepeat(needDeleteNode);
        console.log(leftNodes);
        //console.log(arr);
        //var treeId=tree.setting.treeId;
        //refreshTree(treeId,leftNodes);
    }


    //从选中的节点中筛选出需要删除的节点
    function selectNeedDeleteNodes(arr) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].isParent) {
                var curNode = tree.getNodeByParam("id", arr[i].id);
                var curNodeChildren = curNode.children;
                if (curNodeChildren.length > 0) {
                    selectNeedDeleteNodes(curNodeChildren);
                }
            }
            else {
                for (var m = 0; m < arr.length; m++) {
                    if (arr[i].id == arr[m].id) {
                        needDeleteNode.push(arr[i].name);
                    }
                }
            }
        }
    }


    //下一步
    var btnNext = $(".btn-abled");
    var btnPrev = $(".btn-prev");
    var stepLi = $(".processStep").find("li");
    btnNext.eq(0).click(function () {
        stepOneContainer.hide();
        stepTwoContainer.show();
        stepThreeContainer.hide();
        stepLi.removeClass("activeStep");
        stepLi.eq(1).addClass("activeStep");

    });
    btnNext.eq(1).click(function () {
        stepOneContainer.hide();
        stepTwoContainer.hide();
        stepThreeContainer.show();
        stepLi.removeClass("activeStep");
        stepLi.eq(2).addClass("activeStep");
    });
    btnPrev.eq(0).click(function () {
        stepOneContainer.show();
        stepTwoContainer.hide();
        stepThreeContainer.hide();
        stepLi.removeClass("activeStep");
        stepLi.eq(0).addClass("activeStep");
    });
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


})
;