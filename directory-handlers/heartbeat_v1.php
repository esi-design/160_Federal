<?php

$server = "esidesigndev.com";
$username = "esidesign";
$password = "Z7895123";
$database = "160federal-cms";

$con = mysql_connect($server, $username, $password) or die ("Could not connect: " . mysql_error());
mysql_select_db($database, $con);

$sql = "INSERT INTO analytics (status)";
$sql .= "VALUES('160 Directory Reloaded')";
$result = mysql_query($sql) or die ("Query error: " . mysql_error());

mysql_close($con);

?>