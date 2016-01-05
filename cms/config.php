<?php 
require 'libs/mysqli.php';

$config = array();
$config['host'] = 'esidesigndev.com';
$config['user'] = 'esidesign';
$config['pass'] = 'Z7895123';
$config['table'] = 'myDemo';


// Then simply connect to your DB this way:
$db = new DB($config);
?>