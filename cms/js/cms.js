$(document).ready(function() {
  
    
    $('#analytics').DataTable( {
        "processing": true,
        "serverSide": true,
        "ajax": "./analytics-processing.php",
        "order": [[ 1, "desc" ]],
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

$('.remove').on('click', function(){
	var id = $(this).attr('data-id');
	var person = $(this).attr('data-person');
	console.log(id);
	if(confirm('Are you sure you want to delete '+person+'?')) {
		$.ajax({ url: "tenant-delete-person.php", type: "POST", data: { fieldID: id }, success: function(data){
			console.log(data);
    	}});
		$(this).parent().fadeOut();
	} else {
		return false;
	}
});

$('.test-update').on('click', function(){
	var id = $(this).attr('data-id');
	var company = $(this).attr('data-company');
	var floor = $(this).attr('data-floor');
	var fieldNew = $(this).attr('data-new');
	console.log(id);
		$.ajax({ url: "tenant-update.php", type: "POST", data: { fieldID: id, fieldCompany: company, fieldFloor: floor, fieldNew: fieldNew }, success: function(data){
			console.log(data);
    	}});
});

});

$(function() {

	// Get the form.
	var form = $('#ajax-form');

	// Get the messages div.
	var formMessages = $('#form-messages');

	// Set up an event listener for the contact form.
	$(form).submit(function(e) {
		console.log(e);
		console.log("SEND");
		// Stop the browser from submitting the form.
		e.preventDefault();

		// Serialize the form data.
		var formData = $(form).serialize();

		// Submit the form using AJAX.
		$.ajax({
			type: 'POST',
			url: $(form).attr('action'),
			data: formData
		})
		.done(function(response) {
			// Make sure that the formMessages div has the 'success' class.
			$(formMessages).removeClass('error');
			$(formMessages).addClass('success');

			// Set the message text.
			$(formMessages).text(response);

			// Clear the form.
// 			$('#name').val('');
// 			$('#email').val('');
// 			$('#message').val('');
		})
		.fail(function(data) {
			// Make sure that the formMessages div has the 'error' class.
			$(formMessages).removeClass('success');
			$(formMessages).addClass('error');

			// Set the message text.
			if (data.responseText !== '') {
				$(formMessages).text(data.responseText);
			} else {
				$(formMessages).text('Oops! An error occured and your message could not be sent.');
			}
		});

	});

});
