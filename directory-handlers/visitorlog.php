<?php
header("Access-Control-Allow-Origin: *");
require('config.php');

$company = $_GET["company"];
$date = $_GET["date"];

$db->query("INSERT INTO visitors (company) VALUES ('$company')");

?>