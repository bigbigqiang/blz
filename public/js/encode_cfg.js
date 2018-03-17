/**
 * Created by Administrator on 2016/7/29.
 */
$(function () {

    function getEncodeTable(self) {
        var databaseId = $(self).val();
        var databaseType = $("#" + databaseId).text().split(":")[0];
        var databaseName = $("#" + databaseId).text().split(":")[1];
        $(".encodeTable option").remove();
        $.ajax({
            type: "post",
            url: "/iwherelink/getEncodeTable.do",
            data: {
                databaseId: databaseId,
                databaseType: databaseType,
                databaseName: databaseName
            },
            dataType: 'json',
            success: function (data) {
                if (data.code == 0) {
                    var option = '<option value="0">选择数据表</option>';
                    for (var i = 0; i < data.data.length; i++) {
                        option += '<option>' + data.data[i] + '</option>';
                    }
                    $(".encodeTable").append(option);
                }
                else {
                    alert('请求结果错误，请重新请求，');
                }
            }
        });
    }

    function getEncodeColumn(self) {
        var databaseId = $(".database-type").val();
        var databaseName = $("#" + databaseId).text().split(":")[1];
        var databaseType = $("#" + databaseId).text().split(":")[0];
        var tableName = $(self).val();
        $.ajax({
            type: "post",
            url: "/iwherelink/getEncodeColumn.do",
            dataType: "json",
            data: {
                databaseId: databaseId,
                databaseName: databaseName,
                databaseType: databaseType,
                tableName: tableName
            },
            success: function (data) {
                if (data.code == 0) {
                    var option = '<option value="0">选择列</option>';
                    for (var i = 0; i < data.data.length; i++) {
                        option += '<option>' + data.data[i] + '</option>';
                    }
                    $(".encodeColumn").append(option);
                    $(".encodeColumn").trigger("liszt:updated");
                }
                else {
                    alert('返回代码为0，请重新请求，');
                }
            },
            error: function () {
                alert("请求出错，请重新请求");
            }
        });
    }
    //��������У��
    function codeTypeCheck(codeTypeId, columnLists, codeTypeName) {
        var columnlength = columnLists.length;
        if (codeTypeId != "5" && codeTypeId != "6") {
            alert("暂时不支持编码类型");
            return false;
        }
        else if (codeTypeId == "5" && columnlength != 4) {
            alert(codeTypeName + "所选列必须大于等于4");
            return false;
        }
        else if (codeTypeId == "6" && columnlength != 2) {
            alert(codeTypeName + "所选列必须大于等于2");
            return false;
        } else {
            return true;
        }
    }

    //选择数据源
    $('.select-dbsource').change(function () {
        getEncodeTable($(this).get(0));
    });
    //选择列
    $('.encodeTable').change(function () {
        $(".encodeColumn option").remove();
        getEncodeColumn($(this).get(0));
    });
    //请求编码类型
    $.ajax({
        type: "post",
        url: "/iwherelink/getCodeTypes.do",
        dataType: "json",
        success: function (data) {
            if (data.code == 0) {
                var option = '<option value="0">选择编码类型</option>';
                for (var i = 0; i < data.data.length; i++) {
                    option += '<option value="' + data.data[i].id + '">' + data.data[i].codeTypeName + '</option>';
                }
                $(".code-type").append(option);
            }
            else {
                alert('返回代码为0，请重新请求，');
            }
        },
        error: function () {
            alert("请求出错，请重新请求");
        }
    });
    //生成编码
    $("#generateCode").click(function () {
        var databaseId = $(".database-type").val();
        var databaseType = $("#" + databaseId).text().split(":")[0];
        var databaseName = $("#" + databaseId).text().split(":")[1];
        var tableName = $(".encodeTable").val() + "";
        var columnLists = $(".encodeColumn").val() + "";//join by ,
        var columnObjs = $(".encodeColumn").val();
        var codeTypeId = $(".code-type").val() + "";
        var codeTypeName = $("#" + codeTypeId).text();
        if (!codeTypeCheck(codeTypeId, columnObjs, codeTypeName)) {
            return;
        }
        $.ajax({
            type: "post",
            url: "/iwherelink/encodeData.do",
            data: {
                databaseId: databaseId,
                databaseType: databaseType,
                tableName: tableName,
                columnLists: columnLists,
                codeTypeName: codeTypeName,
                codeTypeId: codeTypeId
            },
            dataType: 'json',
            success: function (data) {
                if (data.code == 1) {
                    alert("编码成功！！");
                }
            }
        });

    });
});