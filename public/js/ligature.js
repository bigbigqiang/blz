jsPlumb.ready(function () {
    var ligature = $('.ligatureContennner');
    var ligatureResult = $('#ligatureResult');
    var instance = jsPlumb.getInstance({
        Endpoint: ["Dot", { radius: 2 }],
        Connector: "StateMachine",
        HoverPaintStyle: { stroke: "#1e8151", strokeWidth: 2 },
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
            connectorStyle: { stroke: "#5c96bc", strokeWidth: 2, outlineStroke: "transparent", outlineWidth: 4 },
            connectionType: "basic",
            extract: {
                "action": "the-action"
            },
            maxConnections: 2,
            onMaxConnections: function (info, e) {
                alert("Maximum connections (" + info.maxConnections + ") reached");
            },
            proxied:true
        });
        instance.makeTarget(el, {
            dropOptions: { hoverClass: "dragHover" },
            anchor: "Continuous",
            allowLoopback: true,
            proxied:true
        });
        instance.fire("jsPlumbDemoNodeAdded", el);
    };
    //添加到关系列表中
    $('table tbody').on('click', '.active_status.addService', function () {
        var currentObj = $(this);
        var header = $(this).parent('td').siblings().eq(1).text();
        var id = $(this).parent('td').siblings().eq(0).find('input').val();
        var num = id;
        $.get('/iwherelink/getDataService.do?id=' + id,
            function (data) {
                data = JSON.parse(data);
                var tHeader = '<div class="ligatureTable group-container w" group="' + num + '" id="container' + num + '" style="top:' + rearrange().top + 'px;left:' + rearrange().left + 'px"> ' +
                    '<div class="ligature-title title">' +
                    '<input type="checkbox" class="pull-left ligature-select-all" style="margin-top:6px;margin-right:5px;" checked=true /><span name="' + header + '">' + header +
                    '</span><img class="pull-right ligatureRemoveAll" src="image/portlet-remove-icon-white.png" delete-all><i class="pull-right  icon-minus collapse-group" style="margin:5px 0 0 10px;" ></i><i class="pull-right  icon-edit edit-ligature-header" style="margin:5px 0 0 10px;" ></i></div>';
                var tBody = '<ul>';
                for (var i = 0; i < data.data.length; i++) {
                    var id = header + "_" + i;
                    tBody += ' <li class="t"  ><div class="ep ep-active" action=""></div>' +
                        '<input type="checkbox"  class="pull-left"  name="' + header + '"  style="margin-top:4px; value="' + data.data[i] + '" checked=true />' +
                        '<i class="pull-left  icon-edit edit-active" style="margin-top:5px;" ></i><span>' + data.data[i] + '</span></li> ';
                }
                var tFoot = '</ul> </div>';
                ligature.append(tHeader + tBody + tFoot);
                drop();
                currentObj.removeClass("active_status").addClass("non_active_status");
                currentObj.next().removeClass('non_active_status').addClass("active_status");
            }
        );
    });
    //从关系列表中删除
    $('table tbody').on('click', '.active_status.removeService', function () {
        var id = $(this).parent().siblings().eq(1).find('input').attr('id');
        instance.removeGroup(id);
        $(this).removeClass("active_status").addClass("non_active_status");
        $(this).prev().removeClass('non_active_status').addClass("active_status");
    });

    //设置win的top和left值
    function rearrange() {
        var table = $('.ligatureTable');
        var ligatureWidth = parseInt(ligature.width());
        var l, t;
        if (table.length > 0) {
            var lastTable = table.eq(table.length - 1);
            var left = parseInt(lastTable.css('left'));
            var top = parseInt(lastTable.css('top'));
            var w = parseInt(lastTable.width());
            var h = parseInt(lastTable.height());
            if ((ligatureWidth - left) < (w + 20)) {
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
    var tHeaderContent = ligatureResult.find("table thead tr");
    var tBodyContent = ligatureResult.find("table tbody");
    var pageContent = ligatureResult.find('#ligatureResultPage ul');
    var condition = [];
    var pageNum = 1;
    var allPage;
    //初始化拖拽
    function drop() {
        var table = $('.ligatureTable');
        var lastTable = table.eq(table.length - 1);
        var windows = lastTable;
        var item = lastTable.find('.t');
        var groupId = $(windows).attr('group');
        instance.batch(function () {
            for (var i = 0; i < windows.length; i++) {
                initWindow(windows[i], false);
                instance.addGroup({
                    el: windows,
                    id: groupId,
                    constrain: true,
                    revert: false,
                    anchor: "Continuous",
                    proxied:true
                });
            }
            for (var i = 0; i < item.length; i++) {
                initNode(item[i], false);
            }
        });

    }
    function renderData(data) {
        tHeaderContent.empty();
        tBodyContent.empty();
        var tHeader = '';
        var tBody = '';
        var td = '';
        var tr = '';
        var tHeaderArr = [];
        var newData = [];
        //获取全部的属性
        for (var i = 0; i < data.data.length; i++) {
            var currentData = data.data[i];
            for (var attr in currentData) {
                if ($.inArray(attr, tHeaderArr) < 0) {
                    tHeaderArr.push(attr);
                }
            }
        }
        //补全数据,构造新数据
        for (var k = 0; k < data.data.length; k++) {
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
        tHeaderContent.append(tHeader);
        //拼tbody
        for (var i = 0; i < newData.length; i++) {
            tr = '';
            td = '';
            for (var newAttr in newData[i]) {
                var currentVal = newData[i][newAttr];
                if (currentVal == 'noneAttr') {
                    td += '<td></td>';
                }
                else {
                    td += '<td>' + newData[i][newAttr] + '</td>';
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
    function getPageData(colums, froms, page) {
        $.ajax({
            type: 'GET',
            url: '/iwherelink/getFilterData.do',
            dataType: 'json',
            data: {
                "colums": JSON.stringify(colums),
                "froms": froms,
                "page": page
            },
            traditional: true,
            success: function (data) {
                renderData(data);
            }, error: function (e) { console.log(e) }
        });
    }
    //关联后关系查询
    $('#SEARCH').click(function () {
        var colums = {}, froms = [];
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
            var titleNameArr = getOriginalNameAndNewName(titleName);
            var originalName = titleNameArr[0];
            var newName = titleNameArr[1];
            singleForm.source[originalName] = newName;
            froms.push(JSON.stringify(singleForm));
        }
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
            var groupTitleNameArr = getOriginalNameAndNewName(currentGroupTitleName);
            var groupTitleNewName = groupTitleNameArr[1];
            var groupTitleOriginalName = groupTitleNameArr[0];
            colums = getColumnParam(currentGroupTitleName, groupTitleNewName, groupTitleOriginalName);
        }
        // var data = {data:[
        //     {
        //         aaa:1
        //     },
        //     {
        //         bbb:3
        //     },
        //     {
        //         ddd:1
        //     },
        //     {
        //         ccc:1
        //     }
        // ]};
        // renderData(data);
        // return;
        $.ajax({
            type: 'post',
            url: '/iwherelink/getFilterData.do',
            dataType: 'json',
            data: {
                "colums": JSON.stringify(colums),
                "froms": froms
            },
            traditional: true,
            success: function (data) {
                renderData(data);
                allPage = data.page;
                pageContent.empty();
                var page = '<li><a href="#"><i class="icon-long-arrow-left"> </i> </a></li>';
                if (allPage > 1) {
                    for (var i = 0; i < allPage; i++) {
                        page += '<li class="pageNum"><a href="#">' + (i + 1) + '</a></li>';
                    }
                    page += '<li><a href="#"><i class="icon-long-arrow-right"> </i> </a></li>';
                    pageContent.append(page);
                    pageContent.find('li:first').click(function () {
                        pageNum = pageNum == 1 ? pageNum : --pageNum;
                        getPageData(colums, froms, pageNum);
                    });
                    pageContent.find('li.pageNum').click(function () {
                        pageNum = $(this).text();
                        getPageData(colums, froms, pageNum);
                    });
                    pageContent.find('li:last').click(function () {
                        pageNum = pageNum == allPage ? pageNum : ++pageNum;
                        getPageData(colums, froms, pageNum);
                    });
                }
                ligature.hide();
                ligatureResult.show();
            }, error: function (e) { console.log(e) }
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
        //列名
        var params = {};
        var sourceListName = node.find("span").text();
        var sourceListNameArr = getOriginalNameAndNewName(sourceListName);
        var sourceOriginalListName = sourceListNameArr[0];
        var sourceNewListName = sourceListNameArr[1];
        //表名
        var sourceTableName = node.parent().prev().find('span').text();
        var sourceTableNameArr = getOriginalNameAndNewName(sourceTableName);
        var sourceOriginalTableName = sourceTableNameArr[0];
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
    var colums = {};
    function getColumnParam(titleName, newTitleName, originalName) {
        var tableWin = $(".group-container");
        // var singleColums = {};
        var groupTitle = tableWin.find(".ligature-title span:contains('" + titleName + "')");
        var groupInputs = groupTitle.parent().next().find('input[checked=true]');
        for (var j = 0; j < groupInputs.length; j++) {
            var currentInput = groupInputs.eq(j);
            if (currentInput.prop("checked") == true) {
                var listName = currentInput.next().next().text();
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

    //返回关系列表
    $('#ligatureBack').click(function () {
        ligature.show();
        ligatureResult.hide();
    });
    //从关系列表中删除服务
    instance.on(canvas, 'click', '.ligatureRemoveAll', function () {
        var group = $(this).parents('.ligatureTable').attr("group");
        instance.removeGroup(group);
        var service = $('table.databaseType').find('td>input[value="' + group + '"]').eq(0);
        var cfgRelation = service.parent('td').siblings().last();
        cfgRelation.find('span').removeClass("active_status").addClass("non_active_status");
        cfgRelation.find('a').removeClass('non_active_status').addClass("active_status");
    });
    //折叠组
    instance.on(canvas, 'click', '.collapse-group', function () {
        var parentNode = $(this).parents('.group-container');
        var group = parentNode.attr("group");
        var isCollapsed = parentNode.hasClass("collapsed");
        if (isCollapsed) {
            parentNode.removeClass('collapsed');
            instance.expandGroup(group);
        }
        else {
            parentNode.addClass('collapsed');
            instance.collapseGroup(group);
        }

    });

    //显示连接关系弹窗
    instance.on(canvas, 'click', '.aLabel', function () {
        labelId = $(this).attr("id");
        _info = $(this).get(0)._jsPlumb;
        changeLabel.show();
        $(".tablebg-grey").show();
    });

    //删除连接线
    instance.on(canvas, 'click', 'svg', function () {
        var currentConnector = $(this).get(0)._jsPlumb; //获取当前连接器
        instance.detach(currentConnector);
    });
    //单个列重命名
    instance.on(canvas, 'click', '.icon-edit', function () {
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

    });
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
    //列的全选与反选
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
        var selectAllInput= $(this).parents('ul').prev().find(".ligature-select-all");
        for (var i = 0; i < inputs.length; i++) {
            var currentObj = inputs.eq(i);
            var currentChecked = currentObj.prop('checked');
            if (!currentChecked) {
                isAllChecked=false;
                break;
            }
            else {
                isAllChecked = true;
            }
        }
        if(isAllChecked){
            selectAllInput.prop("checked",true);
        }
        else{
             selectAllInput.prop("checked",false);
        }
    });
});
