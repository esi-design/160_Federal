<?php include "header.php"; ?>

<?php 
ini_set('display_errors',1);
ini_set('display_startup_errors',1);
error_reporting(-1); 
require 'config.php';
$db->query('SELECT * FROM tenants');
$db_rows = $db->get();
$count = count($db_rows);

$id = $_GET["id"];
$people = [];
$ids = [];

if($id == 'new') {
	$text = 'New Tenant';
	$company = '';
	$floor = '';
	for ($i = 0; $i < $count; $i++) {
		array_push($ids, $db_rows[$i]['id']);
	}
	asort($ids);
	$new_id = end($ids);
	$new_id = $new_id+1;
} else {
	$text = 'Edit';
	for ($i = 0; $i < $count; $i++) {
		if($db_rows[$i]['id'] == $id) {
			$company = $db_rows[$i]['company'];
			$floor = $db_rows[$i]['floor'];
	// 	echo '<h2>Directory: Edit '.$db_rows[$i]['company'].'</h2>';
		}
		else {
	
		}
	}
	
	for ($i = 0; $i < $count; $i++) {
		if($db_rows[$i]['company'] == $company) {
			if($db_rows[$i]['person'] != '') {
				array_push($people, $db_rows[$i]['person']);	
			}
			array_push($ids, $db_rows[$i]['id']);
		}
	}	

$people_count = count($people);
$people_array = [];
if($people_count > 1) {
	for ($i = 0; $i < $people_count; $i++) {
		array_push($people_array, '<i class="material-icons remove">remove_circle</i><input type="text" name="fieldStaff" class="input" value="'.$people[$i].'" />');
	}
}
}
echo '<div class="tenant-edit">';
echo '<h2>'.$text.' '.$company.'</h2><h3>Tenant Information</h3>';
echo '<div id="form-messages"></div>';
if($id != 'new') {        
	echo '<form id="ajax-form" method="post" action="tenant-update.php?id='.$id.'">';
} else {
	echo '<form id="ajax-form" method="post" action="tenant-update.php">';
}
if($id != 'new') {        
	echo '<input type="text" style="display:none" name="fieldNew" id="fieldNew" class="input" value="update" />';
} else {
	echo '<input type="text" style="display:none" name="fieldNew" id="fieldNew" class="input" value="add" />';
}
echo '<div class="field">';
          echo '<input type="text" name="fieldCompany" id="fieldCompany" class="input" value="'.$company.'" />';           
          echo '<label for="fieldCompany" class="label">Company Name</label>
        </div>';
echo '<div class="field">
          <input type="text" name="fieldFloor" id="fieldFloor" class="input" value="'.$floor.'" />
          <label for="fieldFloor" class="label">Floor</label>
        </div>';
if($id == 'new') { 
	echo '<input type="text" name="fieldID" id="fieldID" class="input" value="'.$new_id.'" />';
} 
else {
	echo '<input type="text" name="fieldID" id="fieldID" class="input" value="'.$id.'" />';
}
if($id != 'new') {        
	echo '<input type="submit" name="update" id="update" value="Update Tenant" />';
} else {
	echo '<input type="submit" name="add" id="add" value="Add New Tenant" />';
}
echo '</form>';

if($id != 'new') {	
echo '<h3>Tenant Staff</h3><div class="staff">';
$people_array_count = count($people_array);
if($people_count > 1) {
	echo '<div class="field">';
	for ($i = 0; $i < $people_array_count; $i++) {
		echo $people_array[$i];
	}
	echo '</div>';
} else {
	echo '<p>No Staff Entered</p>';
}
	echo '</div>';
	echo '<form method="post" class="staff-add" action="staff-add.php">';
	echo '<div class="field">
          <input type="text" name="fieldStaff" id="fieldStaff" class="input" value="" />';           
          echo '<label for="fieldCompany" class="label">Staff Name</label>
        </div>';
    echo '<input type="submit" name="add" id="staff-add" value="Add New Staff" />';    
    echo '</form>';
}
if($id != 'new') {	
	echo '<a class="btn delete" href="tenant-delete.php?id='.$id.'">Delete Tenant</a>';
}
	echo '</div>';

?>
<?php if($id != 'new') {	?>
<h2>Directory</h2>
<p>Select another tenant to edit.</p>
<a class="btn" href="./tenant-edit.php?id=new">Add Tenant</a>
<div class="break"></div>
<table id="tenant" class="display" cellspacing="0" width="100%">
        <thead>
            <tr>
                <th>ID</th>
                <th>Company</th>
                <th>Location</th>
            </tr>
        </thead>
        <tfoot>
            <tr>
                <th>ID</th>
                <th>Company</th>
                <th>Location</th>
            </tr>
        </tfoot>
    </table>
<?php } ?>    
<?php include "footer.php"; ?>