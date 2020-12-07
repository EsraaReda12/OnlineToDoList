﻿
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
                "url": "/MatchSchadual/LoadListItems?LeagueId=" + $('#LeagueId').val() + "&TeamId=" + $('#TeamId1').val() + "&From=" + $('#date1').val() + "&To=" + $('#date2').val(),
                "type": "Post",
                "datatype": "json",  
            },
            "columns": [
                { "data": "Team1"},  
                { "data": "Team2" },  
                { "data": "DateString" },  
                { "data": "Time" },  
                { "data": "Season" },  
                { "data": "League" },  

                {
                    "mData": null,
                    "bSortable": false,
                    "mRender": function (o) {
                        if (o.IsActive) {
                            return '<span class="badge bg-light-blue">Active</span>';
                        }
                        else {
                            return '<span class="badge bg-red">Disactive</span>';
                        }
                    }
                },
                {
                    "mData": null,
                    "bSortable": false,
                    "mRender": function (o) {
                        return '<div class="list-icons">'
                            + '<a href="/MatchSchadual/AddEdit/' + o.Id + '&IsViewOnly=true" class="fa fa-fw fa-eye" data-popup="tooltip" title="" data-container="body" data-original-title="View"><i class="icon-eye"></i></a>&nbsp;'
                            + '<a href="/MatchSchadual/AddEdit/' + o.Id + '" class="fa fa-fw fa-edit" data-popup="tooltip" title="" data-container="body" data-original-title="Edit"></a>&nbsp;'
                            + (o.IsActive ? ' <a href="javascript:Status(\'' + o.Id + '\',false);" class="fa fa-fw fa-expeditedssl" data - popup="tooltip" title = "" data - container="body" tooltip="DesActive" ></a > ' : ' <a href = "javascript:Status(\'' + o.Id + '\',true);" class="fa fa-fw fa-check" tooltip="Active" ></a >&nbsp;')
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
                url: '/MatchSchadual/Delete?Id=' + id,
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

function Status(id, status) {
    swal({
        title: "Confirm ?",
        text: "Are you sure change status of item ?",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Change",
        cancelButtonText: "Cancel",
        closeOnConfirm: false,
        closeOnCancel: true
    }, function (isConfirm) {
        if (isConfirm) {
            blockUI();
            $.post('/MatchSchadual/Status?id=' + id + "&status=" + status, function (response) {
                $.unblockUI();
                if (response == true) {
                    swal({ title: '', text: 'operation successed', type: "success", confirmButtonText: "OK", timer: 1000 }, function () {
                        RefreshTable();
                    });
                }
                else {
                    swal({ title: '', text: response, type: "error" }, function () {
                    });
                }
            });
        }
    });
}
$(document).ready(function () {
    LoadData();
});
 $('#Searchbutton').click(function (e) {
     RefreshTable();
});
$('#txtSearch').keypress(function (e) {
    var key = e.which;
    if (key == 13)  // the enter key code
    {
        RefreshTable();
    }
});