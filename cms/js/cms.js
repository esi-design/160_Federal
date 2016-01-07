$(document).ready(function() {
    
    
    
    
    $('#visitor').DataTable( {
        "processing": true,
        "serverSide": true,
        "ajax": "./visitor-processing.php",
        "order": [[ 4, "desc" ]],
        "lengthMenu": [[20, 50, -1], [20, 50, "All"]],
        "responsive": true
    });
    
    $('#tenant').DataTable( {
        "ajax": "./tenant-json.php",
        "order": [[ 1, "asc" ]],
        "lengthMenu": [[20, 50, -1], [20, 50, "All"]],
/*
        "columnDefs": [
            {
                "targets": [ 0 ],
                "visible": false,
                "searchable": true
            }
        ]
*/
    });
    
    $('#tenant tbody').on( 'click', 'tr', function () {
		var id = $(this).find('td:first-of-type').text();
		window.location = './tenant-edit.php?id='+id;
	});
	
	
	var url = window.location.pathname;
	console.log(url);
	var page = url.split('/').pop();
	
/*
	$('.add').on( 'click', function (e) {
		e.preventDefault();
		$('.add').fadeOut();
		$('.staff-add').slideDown();
	});
*/
$('#submit').click(function(){
   location.reload(true);
});
});