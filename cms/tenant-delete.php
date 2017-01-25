<?php 
ini_set('display_errors',1);
ini_set('display_startup_errors',1);
error_reporting(-1); 
require 'config.php';

$table = 'tenants';

$db->query("SELECT * FROM $table");
$db_rows = $db->get();
$count = count($db_rows);


//Update DB
if(!empty($_POST['fieldID'])) {
	$fieldID = $_POST['fieldID'];
	$db->query("SELECT `company` FROM $table WHERE `id` = '$fieldID'");
	$originalCompany = $db->get('company');
	$db->query("DELETE FROM $table WHERE `company` = '$originalCompany'");
	echo $fieldID.' deleted';	
	} else {
		echo 'error';	
	}

?>
