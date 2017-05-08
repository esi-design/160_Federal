<?php
ini_set('display_errors',1);
ini_set('display_startup_errors',1);
error_reporting(-1); 

require('config.php');

$db->query("INSERT INTO heartbeats (status) VALUES('160 Directory Reloaded')");

?>