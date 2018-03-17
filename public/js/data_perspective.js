/**
 * Created by admin on 2017/5/24.
 */
$(function () {
    //从cookie中取出数据
    var cookieData;
    if ($.cookie('dicData')) cookieData = JSON.parse($.cookie('dicData'));
    $.removeCookie('dicData');
    if (cookieData) {
        console.log(cookieData);
        $(".perspectiveType").html("编辑");
        $("#perspective").val(cookieData.name);
        var sourceType = cookieData.sourcetype;
        $("#sourceType").val(sourceType);
        sourceType == "db" ? dbType() :
            sourceType == "ws" ? wsType() :
                sourceType == "dic" ? dicName() :
                    sourceType == "view" ? viewName() : "";
    } else dbType();

    $('.sub-menu a[href="./dataPerspective.do"]').addClass('current_page').parents('.third-level').show().parent().addClass('open');

    var selectData = $('#selectData');
    var createPerspective = $('#createPerspective');
    var btnPrev = $('.btn-prev');
    $('.scrollLabel').mCustomScrollbar();

    $("#sourceType").change(function () {
        $('#switchSource').empty();
        $(this).val();
        var content = "";
        if ($(this).val() == "db") {
            dbType();
        }
        if ($(this).val() == "ws") {
            wsType();
        }
        if ($(this).val() == "dic") {
            dicName();
        }
        if ($(this).val() == "view") {
            viewName();
        }

    });
    //数据库类型
    function dbType() {
        $.ajax({
            type: 'post',
            url: "/iwherelink/getAllDatabaseTypeList.do",
            dataType: 'json',
            success: function (data) {
                $('.databaseName').empty();
                if (data.code == 0) {
                    var select = "<p class='con input-text control-group' id='dbtype-icon'><label class='control-label span4'>数据库类型：</label><select id='dbType' class='span7' style='float: left'>";
                    $.each(data.data, function (key, value) {
                        var option = "<option value='" + value.id + "'>" + value.name + "</option>";
                        select += option;
                    });
                    //<span id='dbtype-down'><i class='icon-chevron-down'></i></span>
                    select += "</select></select></span></p>";
                    $('#switchSource').append(select);
                    cookieData && $('#switchSource').find(".con:last-child select").val(cookieData.source.sourceTypeId);
                    dbUrl();
                    $("#dbType").change(function () {
                        $("#dbUrl").parent(".con").remove();
                        $("#dbUser").parent(".con").remove();
                        $("#dbTable").parent(".con").remove();
                        dbUrl();
                    });
                } else {
                    $('.btn-next').attr("disabled", "disabled");
                }

            },
            error: function (message) {
                layer.alert("请求失败！");
            }
        });

    }

    //数据库地址
    function dbUrl() {
        $.ajax({
            type: 'GET',
            url: '/iwherelink/database/type/url.do',
            dataType: 'json',
            data: {
                type: $("#dbType").val()
            },
            success: function (data) {
                if (data.code == 0) {
                    var select = "<p class='con input-text control-group' id='db-icon'><label  class='control-label span4'>数据库：</label><select id='dbUrl' class='span7' style='float: left' >";
                    $.each(data.data, function (key, value) {
                        var option = "<option value='" + key + "'>" + value + "</option>";
                        select += option;
                    });
                    select += "</div></select></p>";
                    $("#switchSource").append(select);
                    cookieData && $('#switchSource').find(".con:last-child select").val(cookieData.source.sourceUrl);
                    dbUser();
                    $("#dbUrl").change(function () {
                        $("#dbUser").parent(".con").remove();
                        $("#dbTable").parent(".con").remove();
                        dbUser();
                    });
                } else {
                    $(".btn-next").attr("disabled", "disabled");
                }
            },
            error: function (e) {
                layer.alert("请求失败！");
            }
        });
    }

    //用户名
    function dbUser() {
        $.ajax({
            type: 'POST',
            url: '/iwherelink/database/type/url/user.do',
            dataType: 'json',
            data: {
                type: $("#dbType").val(),
                url: $("#dbUrl").val()
            },
            success: function (data) {
                if (data.code == 0) {
                    var select = "<p class='con input-text control-group' id='username-icon'><label class='control-label span4'>用户名：</label><select id='dbUser' class='span7' style='float: left' >";
                    $.each(data.data, function (key, value) {
                        var option = "<option value='" + key + "'>" + value + "</option>";
                        select += option;
                    });
                    select += "</div> </p>";
                    $("#switchSource").append(select);
                    cookieData && $('#switchSource').find(".con:last-child select").val(cookieData.source.userName);
                    dbTable();
                    $("#dbUser").change(function () {
                        $("#dbTable").parents(".con").remove();
                        dbTable();
                    });
                } else {
                    $(".btn-next").attr("disabled", "disabled");
                }
            },
            error: function (e) {
                layer.alert("请求失败！");
            }
        });
    }

    //数据表
    function dbTable() {
        $.ajax({
            type: 'POST',
            url: '/iwherelink/database/table/get.do',
            dataType: 'json',
            data: {
                type: $("#dbType").val(),
                url: $("#dbUrl").val(),
                user: $("#dbUser").val()
            },
            success: function (data) {
                if (data.code == 0) {
                    var select = "<p class='con input-text control-group' id='table-icon'><label class='control-label span4'>数据表：</label><select id='dbTable' class='span7' style='float: left'>";
                    $.each(data.data, function (n, data) {
                        var id = n;
                        $.each(data, function (key, value) {
                            var option = "<option value='" + $("#sourceType").val() + "." + id + "." + value + "'>" + value + "</option>";
                            select += option;
                        });
                    });
                    select += "</div></select></p>";
                    $("#switchSource").append(select);
                    cookieData && $('#switchSource').find(".con:last-child select").val(cookieData.sourcetype + "." + cookieData.source.id + "." + cookieData.source.sourceName);
                    $("#dbTable").change(function () {
                    });
                    $(".btn-next").removeAttr("disabled");

                } else {
                    $(".btn-next").attr("disabled", "disabled");
                }
            },
            error: function (e) {
                layer.alert("请求失败！");
            }
        });
    }

    //服务类型
    function wsType() {
        $.ajax({
            type: 'post',
            url: '/iwherelink/getAllWebServiceTypeList.do',
            dataType: 'json',
            success: function (data) {

                if (data.code == 0) {
                    var select = "<p class='con input-text control-group'><label class='control-label span4'>服务类型：</label><select id='wsType' class='span7' style='float: left'>";
                    $.each(data.data, function (key, value) {
                        var option = "<option value='" + value.id + "'>" + value.name + "</option>";
                        select += option;
                    });
                    select += "</select></p>";
                    $("#switchSource").append(select);
                    cookieData && $('#switchSource').find(".con:last-child select").val(cookieData.source.sourceTypeId);
                    wsUrl();
                    $("#wsType").change(function () {
                        $("#wsUrl").parents(".con").remove();
                        $("#wsName").parents(".con").remove();
                        wsUrl();
                    });
                } else {
                    $(".btn-next").attr("disabled", "disabled");
                }


            },
            error: function (e) {
                layer.alert("请求失败！");
            }
        });
    }

    //服务地址
    function wsUrl() {
        $.ajax({
            type: 'GET',
            url: '/iwherelink/webservice/type/url.do',
            dataType: 'json',
            data: {
                type: $("#wsType").val()
            },
            success: function (data) {
                if (data.code == 0) {
                    var select = "<p class='con input-text control-group'><label class='control-label span4'>服务地址：</label><select id='wsUrl' class='span7' style='float: left'>";
                    $.each(data.data, function (key, value) {
                        var option = "<option value='" + key + "'>" + value + "</option>";
                        select += option;
                    });
                    select += "</select></P>";
                    $("#switchSource").append(select);
                    cookieData && $('#switchSource').find(".con:last-child select").val(cookieData.source.sourceUrl);
                    wsName();
                    $("#wsUrl").change(function () {
                        $("#wsName").parents(".con").remove();

                        wsName();
                    });

                } else {
                    $(".btn-next").attr("disabled", "disabled");
                }

            },
            error: function (e) {
                layer.alert("请求失败！");
            }
        });
    }

    //服务名
    function wsName() {
        $.ajax({
            type: 'POST',
            url: '/iwherelink/webservice/name/get.do',
            dataType: 'json',
            data: {
                type: $("#wsType").val(),
                url: $("#wsUrl").val()
            },
            success: function (data) {
                if (data.code == 0) {
                    var select = "<p class='con input-text control-group'><label class='control-label span4'>服务名称：</label><select id='wsName' class='span7' style='float: left'>";
                    $.each(data.data, function (key, value) {
                        var option = "<option value='" + $("#sourceType").val() + "." + key + "." + value + "'>" + value + "</option>";
                        select += option;
                    });
                    select += "</select></p>";
                    $("#switchSource").append(select);
                    cookieData && $('#switchSource').find(".con:last-child select").val(cookieData.sourcetype + "." + cookieData.source.id + "." + cookieData.source.sourceName);
                    // dbUrl();
                    $("#wsName").change(function () {
                    });
                    $(".btn-next").removeAttr("disabled");

                } else {
                    $(".btn-next").attr("disabled", "disabled");
                }

            },
            error: function (e) {
                layer.alert("请求失败！");
            }
        });
    }

//    字典
    function dicName() {
        $.ajax({
            type: 'GET',
            url: '/iwherelink/combine/all.do',
            dataType: 'json',
            success: function (data) {
                if (data.code == 0) {
                    var select = "<p class='con input-text control-group'><label class='control-label span4'>服务名称：</label><select id='dicName' class='span7' style='float: left'>";
                    $.each(data.data, function (key, value) {
                        var option = "<option value='" + $("#sourceType").val() + "." + key + "'>" + value + "</option>";
                        select += option;
                    });
                    select += "</select></p>";
                    $("#switchSource").append(select);
                    cookieData && $('#switchSource').find(".con:last-child select").val(cookieData.sourcetype + "." + cookieData.source.id);
                    $(".btn-next").removeAttr("disabled");

                } else {
                    $(".btn-next").attr("disabled", "disabled");
                }

            },
            error: function (e) {
                layer.alert("请求失败！");
            }
        });
    }

//视图
    function viewName() {
        $.ajax({
            type: 'GET',
            url: '/iwherelink/view/all.do',
            dataType: 'json',
            success: function (data) {
                if (data.code == 0) {
                    var select = "<p class='con input-text control-group'><label class='control-label span4'>服务名称：</label><select id='viewName' class='span7' style='float: left'>";
                    $.each(data.data, function (key, value) {
                        var option = "<option value='" + $("#sourceType").val() + "." + key + "'>" + value + "</option>";
                        select += option;
                    });
                    select += "</select></p>";
                    $("#switchSource").append(select);
                    cookieData && $('#switchSource').find(".con:last-child select").val(cookieData.sourcetype + "." + cookieData.source.id);
                    // dbUrl();
                    $("#viewName").change(function () {
                    });
                    $(".btn-next").removeAttr("disabled");

                } else {
                    $(".btn-next").attr("disabled", "disabled");
                }

            },
            error: function (e) {
                layer.alert("请求失败！");
            }
        });
    }

    //获取输入框焦点隐藏提示信息
    $('#perspective').focus(function () {
        $('.msg').hide();
        $('.error').hide();
        $('.repeat').hide();
    });
    var tableColumn = $("#tableColumn");
    var source;
    //校验透视图名称是否重复
    function repeatName(perspective) {
        $.ajax({
            type: 'GET',
            url: '/iwherelink/perspective/check.do',
            dataType: 'json',
            data: {
                name: perspective
            },
            success: function (data) {
                if (data.code == 1) {
                    $('.repeat').show();
                    return false;
                } else {
                    selectData.hide();
                    createPerspective.show();
                    getSourceColumn();
                }

            },
            error: function (e) {
                layer.alert("请求失败！");
            }
        });
    }

    //获取数据源字段
    function getSourceColumn() {
        source = $("#switchSource .con:last-child select option:selected").val();
        $.ajax({
            type: 'GET',
            url: '/iwherelink/perspective/colum.do',
            dataType: 'json',
            data: {
                source: source
            },
            success: function (data) {
                tableColumn.mCustomScrollbar("destroy");
                tableColumn.empty();
                filter.empty();
                lineLabel.empty();
                columnLabel.empty();
                statistic.empty();
                if (data.code == 1) {
                }
                else {
                    data.data.forEach(function (v) {
                        tableColumn.append('<div><input type="checkbox" value="" /><span> ' + v + '</span></div>');
                    });
                    tableColumn.mCustomScrollbar();
                    var sourceName = $("#switchSource .con:last-child option[value='" + source + "']").html();
                    if (cookieData && sourceName == cookieData.source.sourceName) {
                        if (cookieData.filter)
                            cookieData.filter.forEach(function (v) {
                                filter.append('<li><b>' + v + '</b><i></i></li>');
                                tableColumn.find("span").each(function (i, val) {
                                    $(val).html().trim() == v && ($(val).prev()[0].checked = true);
                                    return;
                                });
                            });
                        if (cookieData.row)
                            cookieData.row.forEach(function (v) {
                                lineLabel.append('<li><b>' + v + '</b><i></i></li>');
                                tableColumn.find("span").each(function (i, val) {
                                    if ($(val).html().trim() == v) {
                                        $(val).prev()[0].checked = true;
                                        $(val).prev().attr("check", "yes");
                                        return;
                                    }
                                });
                            });
                        if (cookieData.colum)
                            cookieData.colum.forEach(function (v) {
                                columnLabel.append('<li><b>' + v + '</b><i></i></li>');
                                tableColumn.find("span").each(function (i, val) {
                                    if ($(val).html().trim() == v) {
                                        $(val).prev()[0].checked = true;
                                        $(val).prev().attr("check", "yes");
                                        return;
                                    }
                                });
                            });
                        if (cookieData.statistics)
                            cookieData.statistics.forEach(function (v) {
                                var typeE = Object.getOwnPropertyNames(v)[0];
                                var type = typeE == "count" ? "计数" : "求和";
                                statistic.append('<li><b>' + v[typeE] + '</b><span>(' + type + ')</span><i></i></li>');
                                tableColumn.find("span").each(function (i, val) {
                                    $(val).html().trim() == v[typeE] && ($(val).prev()[0].checked = true);
                                    return;
                                });
                            });
                    }
                }

            },
            error: function (e) {
                layer.alert("请求失败！");
            }
        });
    }

//点击下一步
    var btnNext = $(".btn-next");
    var btnSave = $(".btn-save");
    var right = $(".right");
    var body = $("body");
    var filter = $(".filter");
    var columnLabel = $(".columnLabel");
    var lineLabel = $(".lineLabel");
    var statistic = $(".statistic");
    btnNext.click(function () {
        var perspective = $('#perspective').val();
        //校验用户输入的透视图名称
        if (perspective == '') {
            $('.msg').show().text('不能为空');
            return false;
        }
        var reg1 = /^\S*$/;
        if (!reg1.test(perspective)) {
            $('.msg').show().text('不能包含空格');
            return;
        }

        //特殊字符的校验
        var regular = /^[\u4e00-\u9fa5a-zA-Z0-9\_]*$/;  //只含有汉字、数字、字母下划线
        if (!regular.test(perspective)) {
            $('.error').show();
            return false;
        }
        $(".activeStep").removeClass("activeStep").siblings().addClass("activeStep");
        source = $("#switchSource .con:last-child select option:selected").val();
        table.parents(".span8").css("visibility", "hidden");
        table.empty();
        filter.empty();
        columnLabel.empty();
        lineLabel.empty();
        statistic.empty();
        //没有coolie或者有cookie但表名改变
        if (!cookieData || (cookieData && cookieData.name != perspective)) repeatName(perspective);
        else {
            selectData.hide();
            createPerspective.show();
            getSourceColumn();
        }
    });

    //$("#createPerspective .span8").mCustomScrollbar();
    //$("#tableBox").mCustomScrollbar();
    //    点击上一步
    btnPrev.click(function () {
        $(".activeStep").removeClass("activeStep").siblings().addClass("activeStep");
        selectData.show();
        createPerspective.hide();
    });
    //重置
    $("#createPerspective .btn-reset").on("click", function () {
        tableColumn.find("input").each(function (i, v) {
            if ($(v).attr("check")) $(v).removeAttr("check");
            v.checked = false;
        });
        filter.empty();
        columnLabel.empty();
        lineLabel.empty();
        statistic.empty();
    });
    //拖动字段
    var top1;
    var left1;
    var top2;
    var left2;
    var draggable = false;
    var current;
    var test = $(".test");
    var table = $("#table");
    $(window).resize(function () {
        var scrollY = window.scrollY;
        top1 = filter[0].offsetTop + 50 + scrollY;
        left1 = filter[0].offsetLeft - 60 + scrollY;
        top2 = statistic[0].offsetTop + 50 + scrollY;
        left2 = statistic[0].offsetLeft - 60 + scrollY;
    });
    tableColumn.on("click", "input", function () {
        //var input = $(this).find("input");
        //var text = $(this).text();
        var input = $(this);
        var text = $(this).next().text();
        if (input[0].checked) {
            input.attr("check", "yes");
            lineLabel.append(('<li><b>' + text + '</b><i></i></li>'));
        } else {
            input.removeAttr("check");
            right.find("li").each(function (i, v) {
                var vText = v.innerHTML.trim();
                if ($(v).find("b").length != 0) vText = $(v).find("b").html().trim();
                if (vText == text.trim()) {
                    $(v).remove();
                    //input.attr("flag",false);
                }
            });
        }
    });
    //获取元素相对body的offsetTop,因为添加自定义滚动条，会改变父元素
    function getOffsetByBody(el) {
        var offsetTop = 0;
        var offsetLeft = 0;
        while (el && el.tagName !== 'BODY') {
            offsetTop += el.offsetTop;
            offsetLeft += el.offsetLeft;
            el = el.offsetParent;
        }
        return [offsetTop, offsetLeft];
    }

    tableColumn.on("mousedown", "span", function (e) {
        var scrollY = window.scrollY;
        top1 = getOffsetByBody(filter[0])[0] + 50;
        left1 = getOffsetByBody(filter[0])[1];
        top2 = getOffsetByBody(statistic[0])[0] + 50;
        left2 = getOffsetByBody(statistic[0])[1];
        draggable = true;
        current = $(this).siblings("input");
        var div = "<div class='dragDiv' style='top:" + (e.offset - 50 + scrollY) + "px;left:" + (e.clientX + 20) + "px'>" + this.innerHTML + "</div>";
        body.append(div);
        body.css("cursor", "move");
        right.on("mousemove", function (e) {
            e.preventDefault();
            $(".dragDiv").css({"top": e.clientY - 50 + scrollY + "px", "left": (e.clientX + 20) + "px"});
            $(".dragDiv").css({"color":"#fff"});
        });
    });
    body.on("mouseup", function (e) {
        if (!current) return;
        var checkType = current.attr("check") || null;
        if (draggable) {
            body.css("cursor", "default");
            var x = e.clientX;
            var y = e.clientY + window.scrollY;
            var text = $(".dragDiv").html().trim();
            if (y > top1 && y < top2 && x > left1 && x < left2) {
                if (checkColumn(filter, text)) return;
                filter.append('<li><b>' + text + '</b><i></i></li>');
                current[0].checked = true;
            } else if (y > top2 && y < top2 + top2 - top1 && x > left1 && x < left2) {
                if (!checkType) {
                    if (checkColumn(lineLabel, text)) return;
                    lineLabel.append('<li><b>' + text + '</b><i></i></li>');
                    current.attr("check", "yes");
                    current[0].checked = true;
                }
            } else if (y > top1 && y < top2 && x > left2 && x < left2 + left2 - left1) {
                if (!checkType) {
                    if (checkColumn(columnLabel, text)) return;
                    columnLabel.append('<li><b>' + text + '</b><i></i></li>');
                    current.attr("check", "yes");
                    current[0].checked = true;
                }
            } else if (y > top2 && y < top2 + top2 - top1 && x > left2 && x < left2 + left2 - left1) {
                if (checkColumn(statistic, text)) return;
                statistic.append('<li><b>' + text + '</b><span>(计数)</span><i></i></li>');
                current[0].checked = true;
            } else {
                $(".dragDiv").remove();
                draggable = false;
                return;
            }
            $(".dragDiv").remove();
            draggable = false;
        }
    });
    //检查是否存在该字段
    function checkColumn(el, text) {
        var flag = '';
        el.find("b").each(function (i, v) {
            v.innerHTML.trim() == text && (flag = 'yes')
        })
        if (flag == '') return false;
        else {
            $(".dragDiv").remove();
            return true;
        }
    }

    //统计类型选择
    right.on("click", ".span6 ul:not(.statistic) li", function (e) {
        var thisLI = $(this);
        if (thisLI.find("i").hasClass("active")) {
            thisLI.find("i").removeClass("active");
            $(".selList").remove();
        } else {
            thisLI.find("i").addClass("active");
            thisLI.append('<div class="selList"> <div class="selDel">删除</div> </div>');
            $(".selList").on("click", "div", function () {
                thisLI.remove();
                var text = thisLI.find("b").text();
                resetColumn(text);
            });
        }
    });
    statistic.on("click", "li", function (e) {
        var thisLI = $(this);
        if (thisLI.find("i").hasClass("active")) {
            thisLI.find("i").removeClass("active");
            $(".selList").remove();
        } else {
            thisLI.find("i").addClass("active");
            thisLI.append('<div class="selList"> <div>计数</div><div class="sum">求和</div><div class="selDel">删除</div> </div>');
            $(".selList").on("click", "div", function () {
                if ($(this).hasClass("sum"))
                    thisLI.find("span").html("(求和)");
                else if ($(this).hasClass("selDel")) {
                    thisLI.remove();
                    var text = thisLI.find("b").text();
                    resetColumn(text);
                }
                else thisLI.find("span").html("(计数)");
            });
        }
    });
    //重置字段选项
    function resetColumn(text) {
        var num = 0;
        right.find("li").each(function (i, v) {
            $(v).find("b").text() == text && num++;
        });
        var thisDiv;
        var lineNum = 0;
        var columnNum = 0;
        var staticNum = 0;
        tableColumn.find("span").each(function (i, v) {
            if ($(v).html().trim() == text.trim())  thisDiv = $(v).prev();
        });
        lineLabel.find("b").each(function (i, v) {
            if ($(v).html().trim() == text) lineNum++;
        });
        columnLabel.find("b").each(function (i, v) {
            if ($(v).html().trim() == text) columnNum++;
        });
        statistic.find("b").each(function (i, v) {
            if ($(v).html().trim() == text) staticNum++;
        });
        if (num == 0) {
            thisDiv.removeAttr("check");
            thisDiv[0].checked = false;
        } else {
            if (lineNum == 0 && columnNum == 0) {
                thisDiv.removeAttr("check");
                if (staticNum == 0) {
                    thisDiv[0].checked = false;
                }
            }
        }
    }

    var dataObj = {
        source: "",
        filter: [],
        row: [],
        colum: [],
        statistics: []
    };
    //更新表格
    test.on("click", function () {
        if (statistic.children().length == 0) {
            layer.msg("请选择统计值！", {time: 2000});
            return;
        }
        dataObj = {
            source: source,
            filter: [],
            row: [],
            colum: [],
            statistics: []
        };
        filter.find("b").each(function (i, v) {
            dataObj.filter.push(v.innerHTML.trim());
        });
        lineLabel.find("b").each(function (i, v) {
            dataObj.row.push(v.innerHTML.trim());
        });
        columnLabel.find("b").each(function (i, v) {
            dataObj.colum.push(v.innerHTML.trim());
        });
        statistic.find("b").each(function (i, v) {
            var obj = {};
            var name = v.innerHTML.trim();
            if ($(v).next().html().trim() == "(计数)")
                obj = {count: name}
            else obj = {sum: name};
            dataObj.statistics.push(JSON.stringify(obj));
        });

        $.ajax({
            type: 'GET',
            url: '/iwherelink/perspective/test.do',
            dataType: 'json',
            data: dataObj,
            traditional: true,
            success: function (data) {
                if (data.code == 0) {
                    $('#tableBox').mCustomScrollbar('destroy');

                    renderTable(data.data);

                    $('#tableBox').mCustomScrollbar({
                        axis:'yx'
                    });
                } else {
                    layer.msg(data.message, {time: 2000});
                }
            },
            error: function (e) {
                layer.alert("请求失败！");
            }
        });
    });
    //将列处理成[[列1],[列2],[列3]]格式
    var ARRAY = [];

    function getColumNum(arr) {
        arr = arr.sort();
        for (var i = 0; i < arr.length; i++) {
            var index = arr[i].indexOf("#");
            var sepa = arr[i].split("#");
            if (index != -1) {
                var str = arr[i].slice(0, index);
                if (!ARRAY[0]) ARRAY[0] = [];
                ARRAY[0].push(str);
                if (!ARRAY[1]) ARRAY[1] = [];
                formatStr(ARRAY[1], arr[i].slice(index + 1), sepa);
            } else {
                if (!ARRAY[0]) ARRAY[0] = [];
                ARRAY[0].push(arr[i]);
            }
        }
        return ARRAY;
    }

    function formatStr(obj, arr, sepa) {
        var index = arr.indexOf("#");
        if (index != -1) {
            var str = arr.slice(0, index);
            obj.push(str);
            for (var i = 0; i < sepa.length; i++) {
                var last = arr.slice(index + 1);
                if (sepa[i] == last) {
                    if (!ARRAY[i]) ARRAY[i] = [];
                    formatStr(ARRAY[i], last, sepa);
                }
            };
        } else {
            obj.push(arr);
        }
    }
    function getRowNum(arr) {
        var result = [];
        if (arr[0].indexOf('#') != -1 && !isNaN(arr[0].split('#')[0])) {
            var after = [];
            for(var k = 0;k < arr.length; k++) {
                result.push(Number(arr[k].split('#')[0]));
                after.push(arr[k].slice(arr[k].indexOf('#') + 1));
            }
            for (var m =0 ;m<result.length;m++) {
                for (var n=0;n<result.length -m;n++){
                    if(result[n] > result[n+1]){
                        var t,l;
                        t = result[n+1];
                        result[n+1] = result[n];
                        result[n] = t;
                        l = after[n+1];
                        after[n+1] = after[n];
                        after[n] = l;
                    }
                }
            }
            var list = [];
            for(var p =0 ;p<after.length;p++){
                list.push(result[p] + '#' + after[p]);
            }
            return list;
        } else if (arr[0].indexOf('#') == -1 && !isNaN(arr[0])){
            var after = [];
            for(var k = 0;k < arr.length; k++) {
                result.push(Number(arr[k]));
                after.push(arr[k].slice(arr[k].indexOf('#') + 1));
            }
            for (var m =0 ;m<result.length;m++) {
                for (var n=0;n<result.length -m;n++){
                    if(result[n] > result[n+1]){
                        var t,l;
                        t = result[n+1];
                        result[n+1] = result[n];
                        result[n] = t;
                        l = after[n+1];
                        after[n+1] = after[n];
                        after[n] = l;
                    }
                }
            }
            var list = [];
            for(var p =0 ;p<after.length;p++){
                list.push(result[p] + '#' + after[p]);
            }
            return list;
        } else {
            result = arr.sort();
            return result;
        }
    }
    //渲染表格
    function renderTable(result) {
        table.parents(".span8").css("visibility", "visible");
        table.empty();
        //统计值属性格式化
        function getStatisticType(name) {
            var index = name.indexOf("(");
            var val = name.slice(index + 1, -1);
            if (name.search('SUM') != -1) return "求和项：" + val;
            else return "计数项：" + val;
        }

        //添加表头
        var statisticNum = 1;
        var statisticVal;
        var statisticTd = '';
        var str3 = "<tr>";//计数项行
        var str = '<tr class="head">';//表头行
        var arr = getColumNum(result.colum);//列名分级别对象
        var columList = result.colum.sort();
        //var rowList = result.row.sort();
        var rowList = getRowNum(result.row);
        var rowNum = result.row[0].split("#").length;//行数
        //统计值个数及类型
        for (var n in result.data) {
            for (var h in result.data[n]) {
                statisticVal = Object.getOwnPropertyNames(result.data[n][h]);
                statisticNum = statisticVal.length;
                break;
            }
            break;
        }
        //根据行数、统计值个数确定表头初始列显示
        for (var j = 0; j < rowNum; j++) {
            str += "<td></td>";//多行添加td
            /*if(statisticNum != 1)*/
            str3 += "<td></td>";//多行添加td
        }
        //统计值表头
        for (var d = 0; d < statisticNum; d++) statisticTd += "<td>" + getStatisticType(statisticVal[d]) + "</td>";
        //根据列数组成表头标签字符串
        if (columList[0].search("#") == -1) {//单列
            for (var i = 0; i < columList.length; i++) {
                str += '<td colspan="' + statisticNum + '">' + columList[i] + '</td>';
                /*if(statisticNum != 1)*/
                str3 += statisticTd;
            }
        } else {//多列
            for (var i = 0; i < arr[0].length; i++) {
                str += '<td colspan="' + statisticNum + '">' + arr[0][i] + '</td>';
                /*if(statisticNum != 1)*/
                str3 += statisticTd;
            }
            str += "</tr>";
            for (var i = 1; i < arr.length; i++) {
                str += '<tr class="head">';
                for (var j = 0; j < rowNum; j++) str += "<td></td>";//多行添加td
                for (var j = 0; j < arr[i].length; j++) {
                    str += '<td colspan="' + statisticNum + '">' + arr[i][j] + '</td>';
                }
                str += "</tr>";
            }
        }
        /*var STR3 = statisticNum != 1 ? (str3 + "</tr>"):"";*/
        table.append(str + str3 + "</tr>");
        //添加内容
        for (var k = 0; k < rowList.length; k++) {
            var rowData = result.data[rowList[k]];
            var isSingleColumn = true;
            for (var f in rowData) {
                if (f.search("#") != -1) isSingleColumn = false;
                break;
            }
            if (rowList[k].search("#") == -1) {//单行
                var str2 = "<tr><td>" + rowList[k] + "</td>";
                if (isSingleColumn) {//单行单列
                    for (var m = 0; m < columList.length; m++) {
                        var columLabel = columList[m];
                        if (rowData[columLabel]) {
                            for (var l in statisticVal) {
                                str2 += "<td>" + rowData[columLabel][statisticVal[l]] + "</td>";
                            }
                        } else {
                            for (var g = 0; g < statisticNum; g++) {
                                str2 += "<td></td>";
                            }
                        }
                    }
                } else {//单行多列
                    for (var m = 0; m < arr[0].length; m++) {
                        var attr = '';
                        for (var n = 0; n < arr.length; n++) {
                            attr += arr[n][m] + "#";
                        }
                        attr = attr.slice(0, -1);
                        if (rowData[attr]) {
                            for (var l in statisticVal) {
                                str2 += "<td>" + rowData[attr][statisticVal[l]] + "</td>";
                            }
                        } else {
                            for (var g = 0; g < statisticNum; g++) {
                                str2 += "<td></td>";
                            }
                        }
                    }
                }
                table.append(str2 + "</tr>");
            } else {//多行
                var rowNameArr = rowList[k].split("#");
                var str2 = "<tr>";
                for (var h = 0; h < rowNameArr.length; h++) {
                    str2 += "<td>" + rowNameArr[h] + "</td>";
                }
                if (isSingleColumn) {//多行单列
                    for (var m = 0; m < columList.length; m++) {
                        var columLabel = columList[m];
                        if (rowData[columLabel]) {
                            for (var l in statisticVal) {
                                str2 += "<td>" + rowData[columLabel][statisticVal[l]] + "</td>";
                            }
                        } else {
                            for (var g = 0; g < statisticNum; g++) {
                                str2 += "<td></td>";
                            }
                        }
                    }
                } else {//多行多列
                    for (var m = 0; m < arr[0].length; m++) {
                        var attr = '';
                        for (var n = 0; n < arr.length; n++) {
                            attr += arr[n][m] + "#";
                        }
                        attr = attr.slice(0, -1);
                        if (rowData[attr]) {
                            for (var l in statisticVal) {
                                str2 += "<td>" + rowData[attr][statisticVal[l]] + "</td>";
                            }
                        } else {
                            for (var g = 0; g < statisticNum; g++) {
                                str2 += "<td></td>";
                            }
                        }
                    }
                }
                table.append(str2 + "</tr>");
            }
        }

        //合并相同列项
        var headRow = table.find(".head");
        for (var i = 0; i < headRow.length; i++) {
            var num = 0;
            var lastText = "";
            for (var j = rowNum; j < $(headRow[i]).children().length; j++) {
                var headTd = $(headRow[i]).children()[j];
                var text = headTd.innerHTML;
                if (text == "") continue;
                var tds = $(headRow[i]).children();
                if (text == lastText) {
                    num++;
                    if (j == tds.length - 1) {
                        $(tds[j - 1]).attr("colspan", num * statisticNum);
                        $(headTd).remove();
                        break;
                    }
                    $(headTd).remove();
                    j--;
                } else {
                    $(tds[j - 1]).attr("colspan", num * statisticNum);
                    num = 1;
                    lastText = text;
                }
            }
        }
        //相同行项内容改成""
        var contentRow = $("table").find("tr:not(.head)");
        for (var l = 0; l < rowNum; l++) {
            var num2 = 0;
            var lastText2 = "";
            for (var m = 1; m < contentRow.length; m++) {
                var headTd2 = $(contentRow[m]).find("td")[l];
                var text = headTd2.innerHTML;
                var tds2 = contentRow.find("td:nth-child(" + (l + 1) + ")");
                if (text == lastText2) {
                    num2++;
                    if (m == tds2.length - 1) {
                        setRowspan(lastText2, tds2, num2, m);
                        $(headTd2).html("");
                        break;
                    }
                    $(headTd2).html("");

                } else {
                    setRowspan(lastText2, tds2, num2, m);
                    num2 = 1;
                    lastText2 = text;
                }
            }
        }
        //内容为空项删除
        var rowTd = contentRow.find("td:lt(" + rowNum + ")");
        for (var g = rowNum; g < rowTd.length; g++) {
            if (rowTd[g].innerHTML == "") {
                $(rowTd[g]).remove();
            }
        }
    }

    //合并行设置rowspan
    function setRowspan(lastText, tds, val, j) {
        if (lastText != "") {
            for (var k = j - 1; k >= 0; k--) {
                var thisTd = tds[k];
                if (thisTd.innerHTML != "") {
                    $(thisTd).attr("rowspan", val);
                    break;
                }
            }
        }
    }

    //点击保存
    var dataObj2 = {
        name: "",
        source: "",
        filter: [],
        row: [],
        colum: [],
        statistics: []
    };
    btnSave.click(function () {
        dataObj2 = {
            name: $('#perspective').val(),
            source: source,
            filter: [],
            row: [],
            colum: [],
            statistics: []
        };
        filter.find("b").each(function (i, v) {
            dataObj2.filter.push(v.innerHTML.trim());
        });
        lineLabel.find("b").each(function (i, v) {
            dataObj2.row.push(v.innerHTML.trim());
        });
        columnLabel.find("b").each(function (i, v) {
            dataObj2.colum.push(v.innerHTML.trim());
        });
        statistic.find("b").each(function (i, v) {
            var obj = {};
            var name = v.innerHTML.trim();
            if ($(v).next().html() == "(计数)")
                obj = {count: name}
            else obj = {sum: name};
            dataObj2.statistics.push(JSON.stringify(obj));
        });

        //修改
        if (cookieData) {
            dataObj2.id = parseInt(cookieData.id);
            $.ajax({
                type: 'post',
                url: '/iwherelink/perspective/update.do',
                dataType: 'json',
                traditional: true,
                data: dataObj2,
                success: function (data) {
                    if (data.code == 0) {
                        layer.msg("保存成功！", {time: 2000});
                        setTimeout(function () {
                            window.location.href = "/perspectiveManager.do";
                        }, 2000);
                    } else {
                        layer.msg(data.message, {time: 2000});
                    }

                },
                error: function (e) {
                    layer.alert("请求失败！");
                }
            });
        }
        //新增
        else
            $.ajax({
                type: 'post',
                url: '/iwherelink/perspective/add.do',
                dataType: 'json',
                traditional: true,
                data: dataObj2,
                success: function (data) {
                    if (data.code == 0) {
                        layer.msg("保存成功！", {time: 2000});
                        setTimeout(function () {
                            window.location.href = "/perspectiveManager.do";
                        }, 2000);
                    } else {
                        layer.msg(data.message, {time: 2000});
                    }

                },
                error: function (e) {
                    layer.alert("请求失败！");
                }
            });

    })

});
