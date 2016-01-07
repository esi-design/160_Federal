<?php 
	 ini_set('display_errors',1);
ini_set('display_startup_errors',1);
error_reporting(-1); 
require 'config.php';
$db->query('SELECT * FROM tenants');
$db_rows = $db->get();
$count = count($db_rows);
$comp_array = [];
for ($i = 0; $i < $count; $i++) {
	if($db_rows[$i]['person'] == '') {
		$companies = array(
			$db_rows[$i]['id'],
			$db_rows[$i]['company'],
			$db_rows[$i]['floor']
		);
		array_push($comp_array, $companies);
	}
	else {

	}
}
$data = ['data'=> $comp_array];

echo json_encode($data);
?>