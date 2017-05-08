<?php
$server = "esidesigndev.com";
$username = "dmedina";
$password = "esi4321";
$database = "guestdemo";


$con = mysql_connect($server, $username, $password) or die ("Could not connect: " . mysql_error());

mysql_select_db($database, $con);

$company = $_GET["company"];
$name = $_GET["lid"];
$visitorCompany = $_GET["visitorCompany"];
$purpose = $_GET["purpose"];
$date = $_GET["date"];

$sql = "INSERT INTO visitors (company_name, visitor_name, visitor_company, purpose) ";
$sql .= "VALUES ('$company', '$name', '$visitorCompany', '$purpose')";

if (!mysql_query($sql, $con)) {
	die('Error: ' . mysql_error());
} else {
	echo "Guest Added";
}

mysql_close($con);

?>
