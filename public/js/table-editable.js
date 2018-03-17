var TableEditable = function () {

    return {

        //main function to initiate the module
        init: function () {
            function restoreRow(oTable, nRow) {
                var aData = oTable.fnGetData(nRow);
                var jqTds = $('>td', nRow);

                for (var i = 0, iLen = jqTds.length; i < iLen; i++) {
                    oTable.fnUpdate(aData[i], nRow, i, false);
                }

                oTable.fnDraw();
            }
//add new
            /*function editRow(oTable, nRow) {
                var aData = oTable.fnGetData(nRow);
                var jqTds = $('>td', nRow);
                jqTds[0].innerHTML = '<input type="text" class="m-wrap small" value="' + aData[0] + '">';
                jqTds[1].innerHTML = '<input type="text" class="m-wrap small" value="' + aData[1] + '">';
                jqTds[2].innerHTML = '<input type="text" class="m-wrap small" value="' + aData[2] + '">';
                jqTds[3].innerHTML = '<input type="text" class="m-wrap small" value="' + aData[3] + '">';
                jqTds[4].innerHTML = '<input type="text" class="m-wrap small" value="' + aData[4] + '">';
                jqTds[5].innerHTML = '<input type="text" class="m-wrap small" value="' + aData[5] + '">';
                jqTds[6].innerHTML = '<input type="text" class="m-wrap small" value="' + aData[6] + '">';
                jqTds[7].innerHTML = '<a class="save" href="">保存</a>';
                jqTds[8].innerHTML = '<a class="cancel" href="">取消</a>';
            }*/

            function saveRow(oTable, nRow) {
                var jqInputs = $('input', nRow);
                oTable.fnUpdate(jqInputs[0].value, nRow, 0, false);
                oTable.fnUpdate(jqInputs[1].value, nRow, 1, false);
                oTable.fnUpdate(jqInputs[2].value, nRow, 2, false);
                oTable.fnUpdate(jqInputs[3].value, nRow, 3, false);
                oTable.fnUpdate(jqInputs[4].value, nRow, 4, false);
                oTable.fnUpdate(jqInputs[5].value, nRow, 5, false);
                oTable.fnUpdate(jqInputs[6].value, nRow, 6, false);
                oTable.fnUpdate(jqInputs[7].value, nRow, 7, false);
                oTable.fnUpdate('<a class="edit" href="">修改</a>', nRow, 8, false);
                oTable.fnUpdate('<a class="delete" href="">删除</a>', nRow, 9, false);
                oTable.fnDraw();
            }

           /* function cancelEditRow(oTable, nRow) {
                var jqInputs = $('input', nRow);
                oTable.fnUpdate(jqInputs[0].value, nRow, 0, false);
                oTable.fnUpdate(jqInputs[1].value, nRow, 1, false);
                oTable.fnUpdate(jqInputs[2].value, nRow, 2, false);
                oTable.fnUpdate(jqInputs[3].value, nRow, 3, false);
                oTable.fnUpdate(jqInputs[4].value, nRow, 4, false);
                oTable.fnUpdate(jqInputs[5].value, nRow, 5, false);
                oTable.fnUpdate(jqInputs[6].value, nRow, 6, false);
                oTable.fnUpdate('<a class="edit" href="">Edit</a>', nRow, 7, false);
                oTable.fnDraw();
            }*/

 
//search psgenumber
           var oTable = $('#sample_editable_1').dataTable({
               "aLengthMenu": [
                    [5, 15, 20, -1],
                    [5, 15, 20, "所有"] // change per page values here
                ],
                // set the initial value
                "iDisplayLength": 5,
                "sDom": "<'row-fluid'<'span6'l><'span6'f>r>t<'row-fluid'<'span6'i><'span6'p>>",
                "sPaginationType": "bootstrap",
                "oLanguage": {
					//"sSearch": "搜  索",
                    //"sLengthMenu": "_MENU_ 每页显示数目",
					//"sZeroRecords": "没有匹配结果",
                    "oPaginate": {
                        "sPrevious": "上一页",
                        "sNext": "下一页",
					 }	
                   
                },
                "aoColumnDefs": [{
                        'bSortable': false,
                        'aTargets': [0]
                    }
                ]
            });
			/*search */
            jQuery('#sample_editable_1_wrapper .dataTables_filter input').addClass("m-wrap medium"); // modify table search input
            jQuery('#sample_editable_1_wrapper .dataTables_length select').addClass("m-wrap small"); // modify table per page dropdown
            jQuery('#sample_editable_1_wrapper .dataTables_length select').select2({
                showSearchInput : false //hide search box with special css class
            }); // initialzie select2 dropdown

            var nEditing = null;
//add content
            /*$('#sample_editable_1_new').click(function (e) {
                e.preventDefault();
				//alert("添加弹出框");
                var aiNew = oTable.fnAddData(['', '', '', '','', '', '',
                        '<a class="edit" href="">修改</a>', '<a class="cancel" data-mode="new" href="">删除</a>'  
                ]);
                var nRow = oTable.fnGetNodes(aiNew[0]);
                editRow(oTable, nRow);
                nEditing = nRow;
            });*/
//delete
            $('#sample_editable_1 a.delete').live('click', function (e) {
                e.preventDefault();

                if (confirm("确定删除?") == false) {
                    return;
                }

                var nRow = $(this).parents('tr')[0];
                oTable.fnDeleteRow(nRow);
                alert("数据已删除");
            });
//cancel
            $('#sample_editable_1 a.cancel').live('click', function (e) {
                e.preventDefault();
                if ($(this).attr("data-mode") == "new") {
                    var nRow = $(this).parents('tr')[0];
                    oTable.fnDeleteRow(nRow);
                } else {
                    restoreRow(oTable, nEditing);
                    nEditing = null;
                }
            });
//change  saveRow
            $('#sample_editable_1 a.edit').live('click', function (e) {
                e.preventDefault();
				//alert("修改弹出框");
                /* Get the row as a parent of the link that was clicked on */
                var nRow = $(this).parents('tr')[0];

                if (nEditing !== null && nEditing != nRow) {
                    /* Currently editing - but not this row - restore the old before continuing to edit mode */
                    restoreRow(oTable, nEditing);
                    editRow(oTable, nRow);
                    nEditing = nRow;
                } else if (nEditing == nRow && this.innerHTML == "<a class='edit' href=''>保存</a>") {
                    /* Editing this row and want to save it */
                    saveRow(oTable, nEditing);
                    nEditing = null;
                    alert("数据已保存");
                } else {
                    /* No edit in progress - let's start one */
                    editRow(oTable, nRow);
                    nEditing = nRow;
                }
            });
        }

    };

}();