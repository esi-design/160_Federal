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
if(!empty($_POST['fieldCompany'])) {
	$fieldNew = $_POST['fieldNew'];
	$fieldCompany = $_POST['fieldCompany'];
	$fieldFloor = $_POST['fieldFloor'];
	$fieldID = $_POST['fieldID'];
	
	if($fieldNew == 'update') {		
		$db->query("SELECT `company` FROM $table WHERE `id` = '$fieldID'");
		$originalCompany = $db->get('company');
		$db->query("UPDATE $table SET `company` = '$fieldCompany', `floor` = '$fieldFloor' WHERE `company` = '$originalCompany'");		
		
		echo $fieldCompany.' updated';		
	} else {
		$db->query("INSERT INTO $table SET `company` = '$fieldCompany', `floor` = '$fieldFloor'");
		echo $fieldCompany.' added';
	}

} else if(empty($_POST['fieldCompany'])) {
	http_response_code(403);
	echo 'Please enter a company name.';
} else if(empty($_POST['fieldFloor'])) {
	http_response_code(403);
	echo 'Please enter a floor.';
}

?>