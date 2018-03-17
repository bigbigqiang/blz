/**
 * Created by Administrator on 2017/7/4.
 */
$(function () {
    var allSelects = $('select');
    var taskNameDom = $('#taskName');
    var indexTypeDom = $('#indexType');
    var sourceTypeDom = $('.sourceTypeDom');
    var sourceTypeSelect = $('#sourceType');
    var dbSource = $('#dbSource');
    var dbTypeSelect = $('#dbType');
    var dbUrlSelect = $('#dbUrl');
    var userNameDom = $('.userNameDom');
    var userNameSelect = $('#userName');
    var tableNameSelect = $('#tableName');
    var columnNameDom = $('.columnNameDom');
    var columnNameInput = $('#columnName');
    var codeTypeSelect = $('#codeType');
    var coordinateTypeSelect = $('#coordinateType');
    var codeZoomDom = $('.codeZoomDom');
    var codeZoomSelect = $('#codeZoom');
    var leftSelect = $('#multiselect');
    var rightSelect = $('#multiselect_to');
    var rightMenu = $('#contextmenu');//右键菜单
    var totalNum = $('#totalNum'); //总数据量
    var codeTime = $('#codeTime'); //预计编码时长
    $('.sub-menu a[href="./createIndexTask.do"]').addClass('current_page').parents('.third-level').show().parent().addClass('open');

    //初始化页面
    function init() {
        initSwitch();
        initMultiSelect();
        ajaxDbType();
    }

    init();
    //初始化开关控件
    function initSwitch() {
        indexTypeDom.bootstrapSwitch({
            onText: 'YES',
            offText: 'NO',
            onColor: 'primary',
            offColor: 'warning',
            onInit: function () {
                hideIndexLargeTable();
            },
            onSwitchChange: function (e, state) {
                if (state == true) {    //原表索引
                    hideIndexLargeTable();
                }
                else {      //索引大表
                    showIndexLargeTable();
                }
            }
        });
    }

    //初始化左右移动多选框
    function initMultiSelect() {
        leftSelect.multiselect({
            beforeMoveToRight: function () {
                var options = rightSelect.find('option');
                var codeType = codeTypeSelect.find('option:selected').attr('value');
                var len;
                var codeText;
                if (codeType == '1') {
                    len = 2;
                    codeText = '点编码';
                }
                else {
                    len = 4;
                    codeText = '矩形编码';
                }
                if (options.length > len - 1) {
                    layer.alert(codeText + '最多可选' + len + '列');
                    return false;
                }
                else {
                    return true;
                }
            },
            afterMoveToLeft: function () {
                var lastOption = leftSelect.find('option:last-child');
                var originalVal = lastOption.attr('original');
                lastOption.removeAttr('column').text(originalVal);
            },
            sort: false
        });
    }

    //显示索引大表
    function showIndexLargeTable() {
        sourceTypeDom.show();
        codeZoomDom.hide();
        columnNameDom.hide();
    }

    //隐藏索引大表
    function hideIndexLargeTable() {
        sourceTypeDom.hide();
        columnNameDom.show();
        codeZoomDom.show();
    }

    //加载数据库类型
    function ajaxDbType() {
        $.ajax({
            url: '/iwherelink/getAllDatabaseTypeList.do',
            type: 'get',
            dataType: 'json',
            success: function (data) {
                if (data.code == 0) {
                    var option = '';
                    for (var i = 0; i < data.data.length; i++) {
                        option += '<option value="' + data.data[i].id + '">' + data.data[i].name + '</option>';
                    }
                    dbTypeSelect.empty();
                    dbTypeSelect.append(option);
                    ajaxDbUrl();
                }
                else {
                    layer.msg(data.message);
                }
            },
            error: function () {
                layer.msg('获取数据库类型失败，请刷新页面');
            }
        });
    }

    //加载数据库地址
    function ajaxDbUrl() {
        var type = dbTypeSelect.find('option:selected').attr('value');
        $.ajax({
            url: 'iwherelink/database/type/url.do',
            //url: 'testData/indexTask/url.json',
            type: 'get',
            dataType: 'json',
            data: {
                type: type
            },
            success: function (data) {
                if (data.code == 0) {
                    var option = '';
                    var keys = Object.keys(data.data);
                    for (var i = 0; i < keys.length; i++) {
                        option += '<option value="' + keys[i] + '">' + data.data[keys[i]] + '</option>';
                    }
                    dbUrlSelect.empty();
                    dbUrlSelect.append(option);
                    ajaxUserName();
                }
                else {
                    dbUrlSelect.empty();
                    ajaxUserName();
                    layer.msg(data.message);
                }
            },
            error: function () {
                layer.msg('获取数据库地址失败，请刷新页面');
            }
        });
    }

    //加载用户名
    function ajaxUserName() {
        var type = dbTypeSelect.find('option:selected').attr('value');
        var url = dbUrlSelect.find('option:selected').attr('value');
        $.ajax({
            url: '/iwherelink/database/type/url/user.do',
            //url: 'testData/indexTask/username.json',
            //type: 'post',
            type: 'get',
            dataType: 'json',
            data: {
                type: type,
                url: url
            },
            success: function (data) {
                if (data.code == 0) {
                    var option = '';
                    var keys = Object.keys(data.data);
                    for (var i = 0; i < keys.length; i++) {
                        option += '<option value="' + keys[i] + '">' + data.data[keys[i]] + '</option>';
                    }
                    userNameSelect.empty();
                    userNameSelect.append(option);
                }
                else {
                    userNameSelect.empty();
                    layer.msg(data.message);
                }
                ajaxTableName();
            },
            error: function () {
                layer.msg('获取用户名失败，请刷新页面');
            }
        });
    }

    //加载表名
    function ajaxTableName() {
        var type = dbTypeSelect.find('option:selected').attr('value');
        var url = dbUrlSelect.find('option:selected').attr('value');
        var userName = userNameSelect.find('option:selected').attr('value');
        $.ajax({
            url: '/iwherelink/database/table/get.do',
            type: 'post',
            dataType: 'json',
            data: {
                type: type,
                url: url,
                user: userName
            },
            success: function (data) {
                if (data.code == 0) {
                    var option = '';
                    var keys = Object.keys(data.data);
                    for (var i = 0; i < keys.length; i++) {
                        for (var j = 0; j < data.data[keys[i]].length; j++) {
                            option += '<option value="' + $("#sourceType").val() +"."+ keys[i]+"."+ data.data[keys[i]][j]+'">' + data.data[keys[i]][j] + '</option>';
                        }
                    }
                    tableNameSelect.empty();
                    tableNameSelect.append(option);
                }
                else {
                    tableNameSelect.empty();
                    layer.msg(data.message);
                }
                ajaxColumn();
                ajaxTotalNumAndTime();
            },
            error: function () {
                layer.msg('获取表名失败，请刷新页面');
            }
        });
    }

    //加载待编码的列
    function ajaxColumn() {
        var type = dbTypeSelect.find('option:selected').attr('value');
        var url = dbUrlSelect.find('option:selected').attr('value');
        var userName = userNameSelect.find('option:selected').attr('value');
        var dbId = tableNameSelect.find('option:selected').attr('value');
        var tablename = tableNameSelect.find('option:selected').text();
        var codeType = codeTypeSelect.find('option:selected').val();
        var selectedColumnLen;
        var selectedColumnText;
        if (codeType == '1') {
            selectedColumnLen = 2;
            selectedColumnText = '点编码';
        }
        else {
            selectedColumnLen = 4;
            selectedColumnText = '矩形编码';
        }
        $.ajax({
            url: '/iwherelink/perspective/colum.do',
            type: 'post',
            dataType: 'json',
            data: {
                //type:type,
                //url:url,
                //userName:userName,
                source: dbId
                //tablename: tablename
            },
            success: function (data) {
                if (data.code == 0) {
                    var option = '';
                    for (var i = 0; i < data.data.length; i++) {
                        option += ' <option value="' + data.data[i] + '" original="' + data.data[i] + '">' + data.data[i] + '</option>';
                    }
                    leftSelect.empty();
                    rightSelect.empty();
                    leftSelect.append(option);

                    //备选列校验
                    if (data.data.length < selectedColumnLen) {
                        layer.alert(selectedColumnText + '类型下，备选列长度小于' + selectedColumnLen + '请重新选择表名或者编码类型');
                        return;
                    }
                }
                else {
                    leftSelect.empty();
                    layer.msg('请求表内字段出错');
                }

                $('.lefBox').mCustomScrollbar();
                $('.rightBox').mCustomScrollbar();
            },
            error: function () {
                layer.msg('获取表内字段失败，请刷新页面');
            }
        });
    }

    //加载单表数据量和时间
    function ajaxTotalNumAndTime() {
        var type = dbTypeSelect.find('option:selected').attr('value');
        var url = dbUrlSelect.find('option:selected').attr('value');
        var userName = userNameSelect.find('option:selected').attr('value');
        var tablename = tableNameSelect.find('option:selected').text();
        $.ajax({
            url: '/iwherelink/indexTable/countTableTotalAndCodeTime.do',
            type: 'post',
            dataType: 'json',
            data: {
                databaseType: type,
                url: url,
                userName: userName,
                tableName: tablename
            },
            success: function (data) {
                if (data.code == 0) {
                    totalNum.text(data.data.totalNum);
                    codeTime.text(data.data.time);
                }
                else {
                    totalNum.text("");
                    codeTime.text("");
                    layer.msg('请求总数据量和预计编码时间出错');
                }
            },
            error: function () {
                totalNum.text("");
                codeTime.text("");
                layer.msg('系统请求总数据量和预计编码时间出错，请刷新页面');
            }
        });
    }

    //数据库类型与数据库地址联动
    dbTypeSelect.change(function () {
        ajaxDbUrl();
    });

    //数据库地址与用户名联动
    dbUrlSelect.change(function () {
        ajaxUserName();
    });

    //用户名与表名联动
    userNameSelect.change(function () {
        ajaxTableName();
    });
    //表名和待编码的列联动
    tableNameSelect.change(function () {
        ajaxColumn();
        ajaxTotalNumAndTime();
    });
    //重置
    $('.resetForm').click(function () {
        taskNameDom.val('');
        $('.requiredStar').next().hide();
        init();
        indexTypeDom.bootstrapSwitch('state', true, true);
        hideIndexLargeTable();
        rightSelect.empty();
        columnNameInput.val('');
    });
    //保存
    $('.saveForm').click(function () {
        var postData = checkAllContentAndMakeData();
        if (postData == undefined) {
            return;
        }
        var totalCountVal = Number(totalNum.text());
        postData.totalNum = totalCountVal;
        $.ajax({
            url: '/iwherelink/indexTable/saveIndex.do',
            type: 'post',
            dataType: 'json',
            data: postData,
            success: function (data) {
                if (data.code == 0) {
                    layer.msg('保存成功');
                    setTimeout(function () {
                        window.location.href = '/indexManager.do';
                    }, 2000);
                }
                else {
                    layer.msg(data.data);
                }
            },
            error: function () {
                layer.msg('保存失败，请刷新页面');
            }
        });
    });
    //校验索引任务的所有内容
    function checkAllContentAndMakeData() {
        var reg = /^[\u4e00-\u9fa5a-zA-Z0-9\_]*$/;
        var reg1 = /^\S*$/;
        var taskName = taskNameDom.val().trim();
        var postData;
        //获取所有的值
        var indexType;
        var indexState = indexTypeDom.bootstrapSwitch('state');
        var sourceType = sourceTypeSelect.find('option:selected').val();
        var dbType = dbTypeSelect.find('option:selected').val();
        var dbUrl = dbUrlSelect.find('option:selected').val();
        var userName = userNameSelect.find('option:selected').val();
        var tableName = tableNameSelect.find('option:selected').text();
        var tableNameValue = tableNameSelect.find('option:selected').val();
        var codeType = codeTypeSelect.find('option:selected').val();
        var coordinateType = coordinateTypeSelect.find('option:selected').val();
        var zoom = codeZoomSelect.find('option:selected').val();
        var columnNameVal = columnNameInput.val();
        var alternativeColumn = leftSelect.find('option');
        var selectedColumn = rightSelect.find('option');
        var selectedColumnLen;
        var selectedColumnText;
        var codeColumn;
        //任务名称校验
        if (taskName == '' || taskName == ' ' || taskName == undefined) {
            taskNameDom.next().next().show().text('不能为空');
            return;
        }
        if (!reg1.test(taskName)) {
            taskNameDom.next().next().show().text('不能包含空格');
            return;
        }
        if (!reg.test(taskName)) {
            taskNameDom.next().next().show().text('不能包含特殊字符');
            return;
        }

        //下拉框校验,除最后2个左右移动下拉框
        for (var i = 0; i < allSelects.length - 2; i++) {
            var curOption = allSelects.eq(i).find('option:selected').attr('value');
            if (curOption == '0' || curOption == undefined) {
                allSelects.eq(i).next().next().show().text('不能为空');
                return;
            }
        }
        if (codeType == '1') {
            selectedColumnLen = 2;
            selectedColumnText = '点编码';
        }
        else {
            selectedColumnLen = 4;
            selectedColumnText = '矩形编码';
        }
        //已选列校验
        if (selectedColumn.length < selectedColumnLen) {
            layer.alert(selectedColumnText + '已选列要等于' + selectedColumnLen + '列');
            return;
        }
        for (var j = 0; j < selectedColumn.length; j++) {
            var curSelectedOption = selectedColumn.eq(j);
            var curSelectedAttr = curSelectedOption.attr('column');
            if (curSelectedAttr == undefined || curSelectedAttr == '' || curSelectedAttr == null) {
                layer.alert('请右键设置已选列的属性');
                return;
            }
        }
        if (selectedColumnLen == 2) {
            var lat = rightSelect.find('option[column="lat"]').attr('original');
            var lon = rightSelect.find('option[column="lon"]').attr('original');
            codeColumn = {
                lng: lon,
                lat: lat
            }
        }
        else {
            var leftTopLngColumn = rightSelect.find('option[column="leftTopLon"]').attr('original');
            var leftTopLatColumn = rightSelect.find('option[column="leftTopLat"]').attr('original');
            var rightDownLngColumn = rightSelect.find('option[column="rightBottomLon"]').attr('original');
            var rightDownLatColumn = rightSelect.find('option[column="rightBottomLat"]').attr('original');
            codeColumn = {
                leftLng: leftTopLngColumn,
                leftLat: leftTopLatColumn,
                rightLng: rightDownLngColumn,
                rightLat: rightDownLatColumn
            }
        }
        if (indexState) { //原表索引
            postData = {
                name: taskName,
                indexType: 0,
                sourceType: sourceType,
                source: tableNameValue,
                tableName: tableName,
                columnName: columnNameVal,
                codeType: Number(codeType),
                coordinateType: coordinateType,
                layer: Number(zoom),
                count:Number(totalNum.text()),
                codeColumn: JSON.stringify(codeColumn)
            }
        }
        else {   //索引大表
            postData = {
                name: taskName,
                indexType: 1,
                sourceType: sourceType,
                source: tableNameValue,
                tableName: tableName,
                columnName: columnNameVal,
                codeType: Number(codeType),
                coordinateType: coordinateType,
                layer: Number(zoom),
                count:Number(totalNum.text()),
                codeColumn: JSON.stringify(codeColumn)
            }
        }
        return postData;
    }

    //任务名称提示消失
    taskNameDom.focus(function () {
        $(this).next().next().hide();
    });
    allSelects.focus(function () {
        $(this).next().next().hide();
    });
    //预检查并启动
    $('.checkStart').click(function () {
        var postData = checkAllContentAndMakeData();
        if (postData == undefined) {
            return;
        }
        var indexType = postData.indexType;

        if (indexType == 0) { //原表索引
            checkIndexTask(postData);
        }
        else {     //索引大表
            //checkIndexTableTask(postData);
            checkIndexTask(postData);
        }
    });
    //预检查原表索引任务
    function checkIndexTask(data) {

        console.log(data);
        var html = ' <div class="progress progress-striped active progress-success">' +
            '<div class="bar" style="width:1%"></div>' +
            '<span class="barText" style="font-size: 12px;position: relative;top: -22px;left: 0;;color: white;">1%</span>' +
            '</div>' +
            '<table class="table checkStartTable">' +
            '<thead><th>检查项</th><th>检查内容</th><th>检查结果</th></thead>' +
            '<tbody>' +
            '<tr id="1"><td>目标任务名存在性检查</td><td>主要检查目标库的目标表中是否存在有同名任务名</td><td>○</td></tr>' +
            '<tr id="2"><td>目标列名存在性检查</td><td>主要检查目标库的目标表中是否存在有同名列名</td><td>○</td></tr>' +
            '<tr id="3"><td>目标数据库连接性检查</td><td>检测数据传输服务器是否能够连通需要编码目标数据库</td><td>○</td></tr>' +
            '<tr id="4"><td>目标权限检查</td><td>检查用户权限是否可以对目标编码表具有读写以及改动表结构的权限</td><td>○</td></tr>' +
            '<tr id="5"><td>目标编码字段检查</td><td>检查编码字段是否与编码类型中要求的一致</td><td>○</td></tr>' +
            '</tbody>' +
            '</table>' +
            '<p style="display:none;color: #ff3636;margin-top: 60px;" class="text-center">检查没有通过，请按照检查结果修改</p>';

        var checkDatas = {  //预检查数据
            name: data.name,
            indexType: data.indexType,
            sourceType: data.sourceType,
            source: data.source,
            tableName: data.tableName,
            columnName: data.columnName,
            codeType: data.codeType,
            coordinateType: data.coordinateType,
            layer:data.layer,
            count:data.count,
            codeColumn: data.codeColumn

        };
        var startData = {    //启动数据
            name: data.name,
            indexType: data.indexType,
            source: data.source,
            columnName: data.columnName,
            codeType: data.codeType,
            coordinateType: data.coordinateType,
            layer:data.layer,
            count:data.count,
            codeColumn: data.codeColumn
        };
        console.log(startData);
        layer.open({
            title: ['预检查', 'font-size:16px', 'font-weight:500'],
            content: html,
            btn: ['启动', '取消'],
            area: ['715px', '500px'],
            success: function (layero, index) {
                var websocket;
                var websocketData;
                websocket = new SockJS("/websocket/checkIndex/sockjs?TOKEN=db");
                websocket.onopen = function (event) {
                    console.log("onopen:");
                    console.log(checkDatas);
                    websocket.send(JSON.stringify(checkDatas));
                };
                websocket.onmessage = function (event) {
                    websocketData = JSON.parse(event.data);
                    console.log(websocketData);
                    //开始填充检测内容
                    updataAllCheckResult(websocketData);
                };

                websocket.onerror = function (event) {
                    console.log("onerror:");
                    console.log(event);
                };

                websocket.onclose = function (event) {
                    console.log("onclose:");
                };
            },
            yes: function (index) {
                var table = $('.checkStartTable');
                var errorResult = table.find('.errorRed');
                var checking=table.find('.checking');
                if(errorResult.length>0||checking.length>0){
                    table.next().show();
                }
                else{
                    startIndexTask(startData);
                }
            }
        });
    }

    //预检查索引大表任务
    function checkIndexTableTask(data) {
        console.log(data);
        var html = ' <div class="progress progress-striped active progress-success">' +
            '<div class="bar" style="width:1%"></div>' +
            '<span class="barText" style="font-size: 12px;position: relative;top: -22px;left: 0;color: white;">1%</span>' +
            '</div>' +
            '<table class="table checkStartTable">' +
            '<thead><th>检查项</th><th>检查内容</th><th>检查结果</th></thead>' +
            '<tbody>' +
            '<tr id="1"><td>目标任务名存在性检查</td><td>主要检查目标库的目标表中是否存在有同名任务名</td><td>○</td></tr>' +
            '<tr id="2"><td>源数据库连接性检查</td><td>检测数据传输服务器是否能够连通需要编码源数据数据库</td><td>○</td></tr>' +
            '<tr id="3"><td>索引大表连接性检查</td><td>检测数据传输服务器是否能够连通索引大表所在数据库</td><td>○</td></tr>' +
            '<tr id="4"><td>源数据库权限检查</td><td>检查用户权限是否可以对源数据表具有读权限</td><td>○</td></tr>' +
            '<tr id="5"><td>编码字段检查</td><td>检查编码字段是否与编码类型中要求的一致</td><td>○</td></tr>' +
            '<tr id="6"><td>索引大表重复性检查</td><td>检测源数据是否已经存在索引大表中</td><td>○</td></tr>' +
            '</tbody>' +
            '</table>' +
            '<p style="display:none;color: #ff3636;margin-top: 60px;" class="text-center">检查没有通过，请按照检查结果修改</p>';
        var checkDatas = {
            name: data.name,
            sourceType: data.sourceType,
            databaseType: data.databaseType,
            url: data.url,
            userName: data.userName,
            tableName: data.tableName,
            codeType: data.codeType,
            totalNum: Number(totalNum.text()),
            codeColumn: data.codeColumn
        };
        var startData = {
            name: data.name,
            sourceType: data.sourceType,
            databaseType: data.databaseType,
            url: data.url,
            userName: data.userName,
            tableName: data.tableName,
            codeType: data.codeType,
            totalNum: Number(totalNum.text()),
            codeColumn: data.codeColumn
        };
        layer.open({
            title: ['预检查', 'font-size:16px', 'font-weight:500'],
            content: html,
            btn: ['启动', '取消'],
            area: ['715px', '500px'],
            success: function (layero, index) {
                var websocket;
                var websocketData;
                websocket = new SockJS("/websocket/checkIndexTable/sockjs?TOKEN=db");
                websocket.onopen = function (event) {
                    console.log("onopen:");
                    websocket.send(JSON.stringify(checkDatas));
                };
                websocket.onmessage = function (event) {
                    websocketData = JSON.parse(event.data);
                    //console.log(websocketData);
                    //开始填充检测内容
                    //checkTaskNameRepeat checkConnection checkIndexConnection  checkAuthority checkColumn checkIndexRepeat
                    updataCheckResult(websocketData.data.checkTaskNameRepeat, "1", "16");
                    updataCheckResult(websocketData.data.checkConnection, "2", "32");
                    updataCheckResult(websocketData.data.checkIndexConnection, "3", "48");
                    updataCheckResult(websocketData.data.checkAuthority, "4", "64");
                    updataCheckResult(websocketData.data.checkColumn, "5", "80");
                    updataCheckResult(websocketData.data.checkIndexRepeat, "6", "100");
                };
                websocket.onerror = function (event) {
                    console.log("onerror:");
                    console.log(event);
                };

                websocket.onclose = function (event) {
                    console.log("onclose:");
                };
            },
            yes: function () {
                var table = $('.checkStartTable');
                var errorResult = table.find('.errorRed');
                var checking=table.find('.checking');
                if(errorResult.length>0||checking.length>0){
                    table.next().show();
                }
                else{
                    startIndexTableTask(startData);
                }
            }
        });
    }

    //启动原表索引任务
    function startIndexTask(data) {
        $.ajax({
            url: '/iwherelink/indexTable/runIndex.do',
            type: 'post',
            dataType: 'json',
            data: data
        });
        layer.msg('启动成功');
    }

    //启动索引大表索引任务
    function startIndexTableTask(data) {
        $.ajax({
            url: '/iwherelink/indexTable/runIndexTable.do',
            //url: 'testData/indexTask/checkAndRunIndex.json',
            type: 'post',
            //type: 'get',
            dataType: 'json',
            data: data
        });
        layer.msg('启动成功');
    }

    //一次性更新全部检查结果
    function updataAllCheckResult(data) {
        var table = $('.checkStartTable');
        var checkTaskNameRepeatTd = table.find('tr[id="1"]').find('td').last();
        var checkColumnNameRepeatTd = table.find('tr[id="2"]').find('td').last();
        var checkConnectionTd = table.find('tr[id="3"]').find('td').last();
        var checkAuthorityTd = table.find('tr[id="4"]').find('td').last();
        var checkColumnTd = table.find('tr[id="5"]').find('td').last();
        updateSingleCheckResult(data.data.checkTaskNameRepeat, checkTaskNameRepeatTd, '20');
        updateSingleCheckResult(data.data.checkColumnNameRepeat, checkColumnNameRepeatTd, '40');
        updateSingleCheckResult(data.data.checkConnection, checkConnectionTd, '60');
        updateSingleCheckResult(data.data.checkAuthority, checkAuthorityTd, '80');
        updateSingleCheckResult(data.data.checkColumn, checkColumnTd, '100');
    }

    //更新单个检查结果
    function updateSingleCheckResult(result, td, percent) {
        var table = $('.checkStartTable');
        var bar = $('.bar');
        var barText=$('.barText');
        switch (result) {
            case 0:
                td.text("√").removeClass('errorRed').removeClass('checking');
                bar.css("width", percent + '%');
                barText.text(percent+ '%').css('left', Number(percent) - 5 + '%');
                break;
            case 1:
                td.text("×").addClass('errorRed').removeClass('checking');
                bar.css("width", percent + '%');
                barText.text(percent+ '%').css('left', Number(percent) - 5 + '%');
                break;
            default:
                td.text("○").addClass('checking').removeClass('errorRed');
                bar.css("width", Number(percent) - 20 + '%');
                barText.text(percent+ '%').css('left', Number(percent) - 5 + '%');
                break;
        }
        var errorResult = table.find('.errorRed');
        console.log(errorResult);
        if (errorResult.length > 0) {
            table.next().show();
            $('.layui-layer-btn0').addClass('btn').prop('disabled',true).css('cursor','not-allowed');
            $('.progress').addClass('progress-danger').removeClass('active').removeClass('progress-striped').removeClass('progress-success');
        }
        else {
            table.next().hide();
            $('.layui-layer-btn0').removeClass('btn').prop('disabled',false).css('cursor','pointer');
            $('.progress').removeClass('active').removeClass('progress-striped').removeClass('progress-danger').addClass('progress-success');
        }

    }

    //更新检测结果
    function updataCheckResult(data, id, percent) {
        //如何让结果==2时，进度条停下来？？？
        var table = $('.checkStartTable');
        var bar = $('.bar');
        var barText = $('.barText');
        switch (data) {
            case 0:
                table.find('tr[id="' + id + '"]').find('td').last().text("√").removeClass('errorRed').removeClass('checking');
                bar.css("width", percent + '%');
                barText.text(percent+ '%').css('left',  Number(percent) - 5 + '%');
                break;
            case 1:
                table.find('tr[id="' + id + '"]').find('td').last().text("×").addClass('errorRed').removeClass('checking');
                bar.css("width", percent + '%');
                barText.text(percent+ '%').css('left',  Number(percent) - 5 + '%');
                break;
            default:
                table.find('tr[id="' + id + '"]').find('td').last().text("○").addClass('checking').removeClass('errorRed');
                bar.css("width", Number(percent) - 20 + '%');
                barText.text(percent+ '%').css('left',  Number(percent) - 5 + '%');
                break;
        }
        var errorResult = table.find('.errorRed');
        if (errorResult.length > 0) {
            table.next().show();
            $('.layui-layer-btn0').addClass('btn').prop('disabled',true).css('cursor','not-allowed');
            $('.progress').addClass('progress-danger').removeClass('active').removeClass('progress-striped').removeClass('progress-success');
        }
        else {
            table.next().hide();
            $('.layui-layer-btn0').removeClass('btn').prop('disabled',false).css('cursor','pointer');
            $('.progress').removeClass('active').removeClass('progress-striped').removeClass('progress-danger').addClass('progress-success');
        }
        //console.log(percent);
    }

    //显示自定义右键菜单
    rightSelect.on('contextmenu', 'option', function (e) {
        var optionVal = $(this).attr('value');
        var codeType = codeTypeSelect.find('option:selected').attr('value');
        var left = e.clientX - 20;
        var top = e.clientY - 40;
        var rightMenuHtml = '';
        if (codeType == '1') {
            rightMenuHtml = '<li column="lon">设为经度</li>' +
                '<li column="lat">设为纬度</li>';
        }
        else {
            rightMenuHtml = '<li column="leftTopLon">设为左上角经度</li>' +
                '<li column="leftTopLat">设为左上角纬度</li>' +
                '<li column="rightBottomLon">设为右下角经度</li>' +
                '<li column="rightBottomLat">设为右下角纬度</li>';
        }
        rightMenu.empty().html(rightMenuHtml);
        rightMenu.show().css({
            left: left,
            top: top
        });
        rightMenu.attr('value', optionVal);
        return false;      //禁用浏览器右键菜单

    });
    //隐藏自定义右键菜单
    $(document).click(function () {
        rightMenu.hide();
    });
    //设置经度或纬度
    rightMenu.on('click', 'li', function () {
        var flag = true;
        var optionVal = $(this).parent().attr('value');
        var columnAttr = $(this).attr('column');
        var columnText = $(this).text().substring(2);
        var options = rightSelect.find('option');
        var option = rightSelect.find('option[value="' + optionVal + '"]');
        var optionOriginalVal = option.attr('original');
        for (var i = 0; i < options.length; i++) {
            if (options.eq(i).attr('column') == columnAttr) {
                layer.alert(columnText + '已经设置过了');
                flag = false;
                break;
            }
        }
        if (flag) {
            option.text(optionOriginalVal + '(' + columnText + ')');
            option.attr('column', columnAttr);
        }
    });
    //切换编码类型时，已选列去掉列属性
    codeTypeSelect.change(function () {
        var options = rightSelect.find('option');
        for (var i = 0; i < options.length; i++) {
            var curOption = options.eq(i);
            var originalVal = curOption.attr('original');
            curOption.text(originalVal);
        }
    });

});