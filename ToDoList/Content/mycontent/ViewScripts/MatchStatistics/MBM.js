
function LoadData() {
    var table = $('.table').DataTable(
        {
            "searching": false,
            "aaSorting": [],
            "serverSide": true,
            "buttons": [
                { "extend": 'excelHtml5', "title": 'Excel File', "text": '<span>Export Excel<i class="icon-file-excel"></i></span>', "className": 'dt-button buttons-print btn btn-light' },
            ],
            "order": [
                [0, "desc"]
            ],
            "ajax":
            {
                "url": "/MatchStatistics/LoadListMinutes?MatchId=" + $('#MatchId').val() ,
                "type": "Post",
                "datatype": "json",  
            },
            "columns": [
                { "data": "Minute"},  
                { "data": "Title" },  
                {
                    "mData": null,
                    "bSortable": false,
                    "mRender": function (o) {
                        return '<div class="list-icons">'
                            + '<a href="javascript:Delete(\'' + o.Id + '\');" class="fa fa-fw fa-remove" data-popup="tooltip" title="" data-container="body" data-original-title="Delete"></a></div >';
                    }
                }
           ]
       });
}
function RefreshTable() {
    var table = $('.table').DataTable();
    table.destroy();
    LoadData();
}
function Delete(id) {
    swal({ title: "", text: 'Are you sure to delete item ?', type: "warning", showCancelButton: true, confirmButtonColor: "#DD6B55", cancelButtonText: "Cancel", confirmButtonText: "Yes", closeOnCancel: true, closeOnConfirm: false },
    function (isConfirm) {
        if (isConfirm) {
            blockUI();
            $.ajax({
                url: '/MatchStatistics/DeleteMinute?Id=' + id,
                type: 'Post',
                cache: false,
                success: function (data) {
                    $.unblockUI();
                    if (data == true) {
                        swal({
                            title: '',
                            text: 'operation successed',
                            type: 'success',
                            confirmButtonText: 'Ok'
                        }, function () {
                            RefreshTable();
                        });
                    }
                    else {
                        swal({ title: '', text: data, type: "error" }, function () {
                        });
                    }
                }
            });
        }
    });
}

$(document).ready(function () {
    var table = $('.table').DataTable();
    table.destroy();
    LoadData();
});
$('#txtSearch').keypress(function (e) {
    var key = e.which;
    if (key == 13)  // the enter key code
    {
        RefreshTable();
    }
});