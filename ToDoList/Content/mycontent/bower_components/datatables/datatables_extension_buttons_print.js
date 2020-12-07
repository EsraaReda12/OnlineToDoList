/* ------------------------------------------------------------------------------
 *
 *  # Buttons extension for Datatables. Print examples
 *
 *  Demo JS code for datatable_extension_buttons_print.html page
 *
 * ---------------------------------------------------------------------------- */


// Setup module
// ------------------------------

var DatatableButtonsPrint = function() {


    //
    // Setup module components
    //

    // Basic Datatable examples
    var _componentDatatableButtonsPrint = function() {
        if (!$().DataTable) {
            console.warn('Warning - datatables.min.js is not loaded.');
            return;
        }

        // Setting datatable defaults
        $.extend( $.fn.dataTable.defaults, {
            autoWidth: false,
            dom: '<"datatable-header"fBl><"datatable-scroll-wrap"t><"datatable-footer"ip>',
            language: {
                search: '<span>بحث:</span> _INPUT_',
                searchPlaceholder: ' كلمة البحث ...',
                lengthMenu: '<span>عرض:</span> _MENU_',
                paginate: { 'first': 'First', 'last': 'Last', 'next': $('html').attr('dir') == 'rtl' ? '&larr;' : '&rarr;', 'previous': $('html').attr('dir') == 'rtl' ? '&rarr;' : '&larr;' },
				info:'إظهار _START_ إلى _END_ من أصل _TOTAL_ مدخل',
				Processing:   "جارٍ التحميل...",
				LengthMen:   "أظهر _MENU_ مدخلات",
				ZeroRecords:  "لم يعثر على أية سجلات",
				InfoEmpty:    "يعرض 0 إلى 0 من أصل 0 سجل",
				InfoFiltered: "(منتقاة من مجموع _MAX_ مُدخل)",
				
            }
        });


        // Basic initialization
        $('.datatable-button-print-basic').DataTable({
            buttons: [
                {
                    extend: 'print',
                    text: '<i class="icon-printer mr-2"></i> Print table',
                    className: 'btn bg-info-800'
                }
            ]
        });


        // Disable auto print
        $('.datatable-button-print-disable').DataTable({
            buttons: [
                {
                    extend: 'print',
                    text: '<i class="icon-printer mr-2"></i> Print table',
                    className: 'btn bg-info-800',
                    autoPrint: false
                }
            ]
        });


        // Export options - column selector
        $('.datatable-button-print-columns').DataTable({
            columnDefs: [{
                targets: -1, // Hide actions column
                visible: false
            }],
            buttons: [
                {
                    extend: 'print',
                    text: '<i class="icon-printer mr-2"></i> Print table',
                    className: 'btn btn-light',
                    exportOptions: {
                        columns: ':visible'
                    }
                },
                {
                    extend: 'colvis',
                    text: '<i class="icon-three-bars"></i>',
                    className: 'btn btn-light btn-icon dropdown-toggle'
                }
            ]
        });


        // Export options - row selector
        $('.datatable-button-print-rows').DataTable({
            buttons: {
                buttons: [
                    {
                        extend: 'print',
                        className: 'btn btn-light',
                        text: '<i class="icon-printer mr-2"></i>  طباعة الكل'
                    },
                    {
                        extend: 'print',
                        className: 'btn btn-light',
                        text: '<i class="icon-checkmark3 mr-2"></i> طباعة المحدد',
                        exportOptions: {
                            modifier: {
                                selected: true
                            }
                        }
                    },
					{
						extend: 'colvis',
						text: '<i class="icon-three-bars"></i>',
						className: 'btn btn-light btn-icon dropdown-toggle'
					}
                ],
            },
            select: true
        });
    };

    // Select2 for length menu styling
    var _componentSelect2 = function() {
        if (!$().select2) {
            console.warn('Warning - select2.min.js is not loaded.');
            return;
        }

        // Initialize
        $('.dataTables_length select').select2({
            minimumResultsForSearch: Infinity,
            dropdownAutoWidth: true,
            width: 'auto'
        });
    };


    //
    // Return objects assigned to module
    //

    return {
        init: function() {
            _componentDatatableButtonsPrint();
            _componentSelect2();
        }
    }
}();


// Initialize module
// ------------------------------

document.addEventListener('DOMContentLoaded', function() {
    DatatableButtonsPrint.init();
});
