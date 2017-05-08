<?php
	ini_set('display_errors',1);
ini_set('display_startup_errors',1);
error_reporting(-1); 
header('Content-type: application/json');
header("Access-Control-Allow-Origin: *");
require 'config.php';
$server = "esidesign.com";
$username = "esidesign";
$password = "Z7895123";
$database = "160federal-cms";

$con = mysql_connect($server, $username, $password) or die ("Could not connect: " . mysql_error());
mysql_select_db($database, $con);

$sql = "SELECT id, side AS side, company AS company, floor AS floor, person AS person FROM tenants ORDER BY side";
$result = mysql_query($sql) or die ("Query error: " . mysql_error());

$records = array();

while($row = mysql_fetch_assoc($result)) {
	$records[] = $row;
}

mysql_close($con);

echo $_GET['jsoncallback'] . json_encode($records) . ';';
?>