<?php 
ini_set('display_errors',1);
ini_set('display_startup_errors',1);
error_reporting(-1); 
require 'config.php';

$table = 'tenants';

$db->query("SELECT * FROM $table");
$db_rows = $db->get();
$count = count($db_rows);


//Delete Staff DB
if(!empty($_POST['fieldID']) && $_POST['updateType'] == 'delete') {
	$fieldID = $_POST['fieldID'];
	
	$db->query("DELETE FROM $table WHERE `id` = '$fieldID'");
	echo $fieldID.' deleted';	
	} else {
		echo 'no person deleted';	
	}

if(!empty($_POST['fieldID']) && $_POST['updateType'] == 'add') {
	$fieldID = $_POST['fieldID'];
	$fieldPerson = $_POST['fieldPerson'];
	$db->query("SELECT `company` FROM $table WHERE `id` = '$fieldID'");
	$originalCompany = $db->get('company');
	$db->query("SELECT `floor` FROM $table WHERE `id` = '$fieldID'");
	$originalFloor = $db->get('floor');
	$db->query("INSERT INTO $table SET `company` = '$originalCompany', `floor` = '$originalFloor', `person` = '$fieldPerson'");
	echo $fieldPerson.' added';	
	} else {
		echo 'no person added';	
	}

?>
