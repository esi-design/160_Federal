<?php 
require 'config.php';
$db->query('SELECT * FROM tenants');
$db_rows = $db->get();
$count = count($db_rows);
for ($i = 0; $i < $count; $i++) {
	if($db_rows[$i]['people'] === '') {
		$companies = array(
			array($db_rows[$i]['id']),
			array($db_rows[$i]['company']),
			array($db_rows[$i]['floor'])
		);
	}
	else {

	}
}

echo json_encode($companies);
?>