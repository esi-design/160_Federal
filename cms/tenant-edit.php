<?php include "header.php"; ?>

<?php 
ini_set('display_errors',1);
ini_set('display_startup_errors',1);
error_reporting(-1); 
require 'config.php';
$table = 'tenants';
$db->query("SELECT * FROM $table");
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
				array_push($people, array('person' => $db_rows[$i]['person'], 'id' => $db_rows[$i]['id']));	
			}
// 			array_push($ids, $db_rows[$i]['id']);
		}
	}	
sort($people);
$people_count = count($people);
$people_array = [];
if($people_count >= 1) {
	for ($i = 0; $i < $people_count; $i++) {
		array_push($people_array, '<div class="person"><i class="material-icons remove '.$people[$i]['id'].'" data-id="'.$people[$i]['id'].'" data-person="'.$people[$i]['person'].'">remove_circle</i><input type="text" name="fieldStaff" class="input" value="'.$people[$i]['person'].'" readonly></div>');
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
	echo '<a class="btn delete-tenant" data-id='.$id.'" data-company='.$company.'">Delete Tenant</a>';
} else {
	echo '<input type="submit" name="add" id="add" value="Add New Tenant" />';
}
echo '</form>';

// echo '<div class="test-update" data-company="'.$company.'" data-id="'.$id.'" data-floor="'.$floor.'" data-new="update" >TEST UPDATE!</div>';

if($id != 'new') {	
echo '<h3>Tenant Staff</h3><div class="staff">';
$people_array_count = count($people_array);
echo '<div class="field">';
if($people_count >= 1) {
	for ($i = 0; $i < $people_array_count; $i++) {
		echo $people_array[$i];
	}
} else {
	echo '<p>No Staff Entered</p>';
}
echo '</div>';
	echo '<div class="field--staff" data-id="'.$id.'"><div class="person"><input class="fieldStaffNew input" type="text" name="fieldStaffNew" id="fieldStaff" value="" /><label for="fieldStaff" class="label">Staff Name</label><i class="material-icons add-staff">&#xE876;</i><i class="material-icons cancel-add-staff">&#xE5CD;</i></div></div>';
    echo '<a class="btn add-staff-field">Add New Staff</a>';
	echo '</div>';
}
?>
<?php if($id != 'new') {	?>
<a href="directory.php"><  Return to Directory</a>
<?php } ?>    

<?php include "footer.php"; ?>