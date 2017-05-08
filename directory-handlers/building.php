<?php
ini_set('display_errors',1);
ini_set('display_startup_errors',1);
error_reporting(-1); 
header('Content-type: application/json');
header("Access-Control-Allow-Origin: *");
require 'config.php';

$db->query("SELECT id, company AS company, floor AS floor, person AS person FROM tenants ORDER BY company");
$result = $db->get();

$records = array();

if($result) {
	foreach($result as $r) {
		array_push($records, array('id' => $r['id'], 'company' => $r['company'], 'floor' => $r['floor'], 'person' => $r['person']));
	}

}

echo json_encode($records); ?>