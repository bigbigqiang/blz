jsPlumb.ready(function () {
    var stepContent = $('.fusion-content');
    var queryTestContent = $('.queryTest-content');//测试栏容器
    var leftTree = $(".left_tree");
    var fluidHeight = $(".page-content").height();
    var sceneSelect = $(".sceneSelect");
    var addInquire = $("#addInquire");
    var addSort = $("#addSort");
    var condition = $(".condition");
    var conditions = $(".conditions");
    var condition_left = $(".condition_left");
    var condition_right = $(".condition_right");
    var condition_switch = $(".condition_switch");
    var switch_bar = $(".switch_bar");
    var dataDisplay = $(".dataDisplay");
    var query_condition = $("#query_condition");
    var sort_condition = $("#sort_condition");
    var queryTest = $("#queryTest");//测试按钮
    var queryTestBack = $("#queryTestBack");//返回按钮
    var instance = jsPlumb.getInstance({
        Endpoint: ["Dot", { radius: 2 }],
        Connector: "StateMachine",
        HoverPaintStyle: { stroke: "#d4b25a", strokeWidth: 2 },
        ConnectionOverlays: [
            ["Arrow", {
                location: 1,
                id: "arrow",
                length: 14,
                foldback: 0.8
            }],
            ["Label", { label: "CROSSJOIN", id: "label", cssClass: "aLabel" }]
        ],
        Container: "canvas"
    });
    var changeLabel = $('.changeLabel');
    var selectNodes = [];
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

    var initWindow = function (el) {
        instance.draggable(el, {
            containment: true
        });
        instance.fire("jsPlumbDemoLoaded", el);
    };

    var initNode = function (el) {
        instance.makeSource(el, {
            filter: ".ep",
            anchor: "Continuous",
            connectorStyle: { stroke: "#d4b25a", strokeWidth: 2, outlineStroke: "transparent", outlineWidth: 4 },
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
            dropOptions: { hoverClass: "dragHover" },
            anchor: "Continuous",
            allowLoopback: true
        });
        instance.fire("jsPlumbDemoNodeAdded", el);
    };

    function drop() {//给列表div添加连线事件
        var table = $('.ligatureTable');
        var lastTable = table.eq(table.length - 1);
        var windows = lastTable;
        var ligatureRemove = windows.find("div.ligature-title>img");
        var editIcon = lastTable.find("i.icon-edit");
        ligatureRemove.on("click", function () {
            $(this).parent().parent().remove();
            var header = $(this).parent().find("span").first().html();
            for (n in selectNodes) {
                if (selectNodes[n].tableName == header) {
                    selectNodes.splice(n, 1);
                }
            }
            var _Connections = instance.getAllConnections();
            var g = _Connections.length;
            while (_Connections.length && g) {
                if (_Connections[0].sourceId.slice(0, header.length) == header || _Connections[0].targetId.slice(0, header.length) == header) {
                    instance.detach(_Connections[0]);
                }
                g--;
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
            }
            for (var i = 0; i < item.length; i++) {
                initNode(item[i], false);
            }
        });
    }
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
            $(this).find('.switch_bar').animate({ "left": 0 });
            $(this).attr({ 'name': 'DESC' });
        } else {
            $(this).find('.switch_bar').animate({ "left": "40px" });
            $(this).attr({ 'name': 'ASC' });
        }
    }
    leftTree.height(fluidHeight - 90);
    stepContent.height(fluidHeight - 90);
    sceneSelect.change(function () {//选择场景触发事件
        $('.ligatureTable').remove();
        var _Connections = instance.getAllConnections();
        var g = _Connections.length;
        while (_Connections.length && g) {
            instance.detach(_Connections[0]);
            g--;
        }
        var id = parseInt($(this).val());
        $.ajax({
            type: 'GET',
            url: './iwherelink/getDatabaseBySourceType.do',
            dataType: 'json',
            data: {
                id: id,
                icon: "jstree-file"
            },
            traditional: true,
            success: function (data) {
                leftTree.empty();
                var databaseTree = '<div class="treeHeader">数据库结构</div><div class="database-tree"><div id="databaseTree" class="treeContent"></div></div>';
                leftTree.append(databaseTree);
                $('#databaseTree').jstree({
                    'core': {
                        'data': data.data
                    }
                }).on("changed.jstree", function (e, data) {
                    var self = data.node;
                    var children = self.children;
                    if (!children.length) {
                        var parents = self.parents;
                        var obj = {
                            databaseNameId: parents[0],
                            databaseTypeId: parents[1],
                            tableName: self.text
                        };
                        selectNodes.push(obj);
                        addTable(data.selected, self.text, obj);
                    }
                });
            }, error: function (e) {
                console.log(e);
            }
        });

    });
    queryTestBack.on("click", function () {
        queryTestContent.hide();
        stepContent.show();
    });
    var colums = {};
    queryTest.on('click', function () {
        colums = {};
        var froms = [], wheres = [], orders = [];
        var tableWin = $(".group-container");
        var allConn = instance.getAllConnections();
        var noneConnecService = selectSingleNoneConnService();
        //单个服务构造forms
        for (var i = 0; i < noneConnecService.length; i++) {
            var singleForm = {
                "source": {},
                "target": "",
                "label": ""
            };
            var titleName = noneConnecService[i];
            var groupTitle = tableWin.find(".ligature-title span:contains('" + titleName + "')");
            var databaseTypeId = groupTitle.parent().parent().attr("databasetypeid");
            var databaseNameId = groupTitle.parent().parent().attr("databasenameid");
            var titleNameArr = getOriginalNameAndNewName(titleName);
            var originalName = databaseTypeId + "." + databaseNameId + "." + titleNameArr[0];
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
        var groupTitleName = tableWin.find(".ligature-title span");
        for (var m = 0; m < groupTitleName.length; m++) {
            var currentGroupTitleName = groupTitleName.eq(m).text();
            var databaseTypeId = groupTitleName.eq(m).parent().parent().attr("databasetypeid");
            var databaseNameId = groupTitleName.eq(m).parent().parent().attr("databasenameid");
            var groupTitleNameArr = getOriginalNameAndNewName(currentGroupTitleName);
            var groupTitleNewName = groupTitleNameArr[1];
            var groupTitleOriginalName = databaseTypeId + "." + databaseNameId + "." + groupTitleNameArr[0];
            colums = getColumnParam(currentGroupTitleName, groupTitleNewName, groupTitleOriginalName);
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
        // console.log(JSON.stringify(colums));
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

        // return;
        $.ajax({
            type: 'POST',
            url: './iwherelink/doSearchTest.do',
            dataType: 'json',
            data: {
                colums: colums,
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
        //取所有窗口的服务名称（表名）
        for (var i = 0; i < tableWinTitle.length; i++) {
            tableTitleName.push(tableWinTitle.eq(i).text());
        }
        //取所有连线source 和target 所在服务的名称
        for (var j = 0; j < allConn.length; j++) {
            var sourceTableName = $(allConn[j].source).parent().prev().find('span').text();
            var targetTableName = $(allConn[j].target).parent().prev().find('span').text();
            if ($.inArray(sourceTableName, tableTitleName) >= 0) {
                tableTitleName.splice(sourceTableName, 1);
            }
            if ($.inArray(targetTableName, tableTitleName) >= 0) {
                tableTitleName.splice(targetTableName, 1);
            }
        }
        return tableTitleName;
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
    //通过连线的source和target封装froms参数
    function getObjParam(node) {
        var databaseTypeId = node.parent().parent().attr("databasetypeid");
        var databaseNameId = node.parent().parent().attr("databasenameid");
        //列名
        var params = {};
        var sourceListName = node.find("span").text();
        var sourceListNameArr = getOriginalNameAndNewName(sourceListName);
        var sourceOriginalListName = sourceListNameArr[0];
        var sourceNewListName = sourceListNameArr[1];
        //表名
        var sourceTableName = node.parent().prev().find('span').text();
        var sourceTableNameArr = getOriginalNameAndNewName(sourceTableName);
        var sourceOriginalTableName = databaseTypeId + "." + databaseNameId + "." + sourceTableNameArr[0];
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



    function queryTestTableShow(data) {//显示测试结果表格
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
    function addTable(id, header, obj) {//向右边空白处添加div列表
        $.get('/iwherelink/getColumnByTable.do?tableId=' + id,
            function (data) {
                /*stepContent.empty();*/
                data = JSON.parse(data);
                var tHeader = '<div id=' + header + ' databaseTypeId=' + obj.databaseTypeId + ' databaseNameId=' + obj.databaseNameId + ' class="ligatureTable group-container" style="top:' + rearrange().top + 'px;left:' + rearrange().left + 'px"> ' +
                    '<div class="ligature-title"><input type="checkbox" class="pull-left ligature-select-all" style="margin-top:6px;margin-right:5px;" checked=true /><span name="' + header + '">' + header + '</span><i class="icon-edit" title="添加别名" style="margin-left: 10px"></i><img class="pull-right ligatureRemove" src="image/portlet-remove-icon-white.png" style="margin:3px 0 0 4px;"></div>';
                var tBody = '<ul>';
                for (var i = 0; i < data.data.length; i++) {
                    var id = header + "_" + i;
                    tBody += ' <li class="t" id=' + id + '><div class="ep" action=""></div><input name=' + header + ' value=' + data.data[i] + ' type="checkbox" class="pull-left" style="margin-top:3px;" checked=true /><span>' + data.data[i] + '</span><i class="icon-edit pull-left" title="添加别名" style="margin: 4px 0 0 1px"></i></li> ';
                }
                var tFoot = '</ul> </div>';
                stepContent.append(tHeader + tBody + tFoot);
                drop();
            }
        );
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

});
