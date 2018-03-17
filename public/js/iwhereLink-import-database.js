/**
 * Created by renxiaolu on 2015/9/29.
 */
//    初始化表格字段
function initTableItem() {
    $('#source-table-field').load('iwhereLink-sourcetablefield.html');
    $('#target-table-field').load('iwhereLink-targettablefield.html');
}
//提交表名到对应的path
function exportTableName() {
    var path = "#";
    $('#submit_form').attr("action", path).submit();
}
//当数据表选择变化时，提交表单，并重新加载数据项页面
$("#source-table-name").change(function () {
    exportTableName();
    $('#source-table-field').load('iwhereLink-sourcetablefield.html');
})
$("#target-table-name").change(function () {
    exportTableName();
    $('#target-table-field').load('iwhereLink-targettablefield.html');
})
