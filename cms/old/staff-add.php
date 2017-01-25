<?php include "header.php"; ?>

<?php 
ini_set('display_errors',1);
ini_set('display_startup_errors',1);
error_reporting(-1); 
require 'config.php';
$db->query('SELECT * FROM tenants');
$db_rows = $db->get();
$count = count($db_rows);


//Update DB
if(!empty($_POST['fieldCompany'])) {
	$fieldCompany = $_POST['fieldCompany'];
	$fieldFloor = $_POST['fieldFloor'];
	$fieldID = $_POST['fieldID'];
	
	$db->query("INSERT INTO tenants SET `company` = '$fieldCompany', `floor` = '$fieldFloor'");
	echo '<meta http-equiv="refresh" content="1; url=tenant-edit.php?id='.$fieldID.'">';
	}

?>


    
<?php include "footer.php"; ?>