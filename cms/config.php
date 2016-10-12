<?php 
require 'libs/mysqli.php';

$config = array();
$config['host'] = 'esidesign.com';
$config['user'] = 'esidesign';
$config['pass'] = 'Z7895123';
$config['table'] = '160federal-cms';


// Then simply connect to your DB this way:
$db = new DB($config);
?>