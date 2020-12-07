
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
                "url": "/MatchStatistics/LoadListItems?LeagueId=" + $('#LeagueId').val() + "&TeamId=" + $('#TeamId1').val() + "&From=" + $('#date1').val() + "&To=" + $('#date2').val(),
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
                        if (!o.MatchFinished) {
                            return '<div class="list-icons">'
                                + '<a href="/MatchStatistics/AddEditStatistics/' + o.Id + '" class="fa fa-fw fa-edit" data-popup="tooltip" title="" data-container="body" data-original-title="Edit"></a>&nbsp;'
                                + '<a href="/MatchStatistics/AddFormation/' + o.Id + '" class="btn btn-info btn-xs" data-popup="tooltip" title="" data-container="body" data-original-title="Edit">Add / Edit formation</a>&nbsp;'
                                + '<a href="/MatchStatistics/AddMinuteByMinute/' + o.Id + '" class="btn btn-info btn-xs" data-popup="tooltip" title="" data-container="body" data-original-title="Edit">Add minute by minute</a>&nbsp;'
                                + '<a href="/MatchStatistics/AddPlayerStatistics/' + o.Id + '" class="btn btn-info btn-xs" data-popup="tooltip" title="" data-container="body" data-original-title="Edit">Add player statistic</a>&nbsp;';
                        }
                        else {
                            return '';
                        }
                      
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
function AddMBM(id) {
            $.ajax({
                url: '/MatchStatistics/AddMinuteByMinute/?Id=' + id,
                type: 'Post',
                cache: false,
                success: function (data) {
                    $.unblockUI();
                    if (data == true) {
                         RefreshTable();
                    }
                    else {
                        RefreshTable();
                    }
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