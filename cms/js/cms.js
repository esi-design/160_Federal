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
        "processing": true,
        "serverSide": true,
        "ajax": "./tenant-processing.php",
//         "order": [[ 4, "desc" ]],
        "lengthMenu": [[20, 50, -1], [20, 50, "All"]],
        "responsive": true
    });

});