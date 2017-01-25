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
        "lengthMenu": [[40, 50, -1], [30, 50, "All"]],
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
		$.ajax({ url: "tenant-staff-update.php", type: "POST", data: { fieldID: id, updateType: 'delete' }, success: function(data){
			console.log(data);
    	}});
		$(this).parent().fadeOut();
	} else {
		return false;
	}
});

$('.add-staff').on('click', function(){
	var id = $('.field--staff').attr('data-id');
	var person = $('.field--staff input').val();
	console.log(id);
	if(person != '') {
		console.log('going');
		$.ajax({ url: "tenant-staff-update.php", type: "POST", data: { fieldID: id, fieldPerson: person, updateType: 'add' }, success: function(data){
			console.log(data);
    	}});
		setTimeout(function(){
			location.reload(true);
		}, 400);
	} else {
		console.log('not');
		$('.field--staff label').text('Enter Staff Name Below').css('color', 'red');
		$('.field--staff .person').css('border-color', 'red');
	}
});

$('.cancel-add-staff').on('click', function(){
	console.log('cancel');
	$('.field--staff').find('input').val('');
	$('.field--staff').fadeOut();
});

$('.add-staff-field').on('click', function(){
	if($('.field--staff').is(':hidden')) {
		$('.field--staff').fadeIn();
	} else {
		$('.field--staff label').css('color', 'red');
		$('.field--staff .person').css('border-color', 'red');
	}
});

$('.delete-tenant').on('click', function(){
	var id = $(this).attr('data-id');
	var company = $(this).attr('data-company');
	console.log(id);
	if(confirm('Are you sure you want to delete '+company+'?')) {
		$.ajax({ url: "tenant-delete.php", type: "POST", data: { fieldID: id }, success: function(data){
			console.log(data);
			window.location = 'directory.php';
    	}});
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
