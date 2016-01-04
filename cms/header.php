<?php include "base.php"; ?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">  
<head>  
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />  
<title>160 Federal Directory</title>
<link rel="stylesheet" href="css/style.css" type="text/css" />
<link rel="stylesheet" href="css/datatables.css" type="text/css" />
<!--     <link href="css/bootstrap.css" rel="stylesheet"> -->
<!--     <link href="css/bootstrap-responsive.css" rel="stylesheet"> -->

</head>  
<body>  
<div id="main" class="container">
	
	<div class="nav">
	<?php if(!empty($_SESSION['LoggedIn']) && !empty($_SESSION['Username'])) { ?>
		<ul class="nav-pills pull-right">
			<li class="active"><a href="#">Visitor Log</a></li>
			<li><a href="#">Directory</a></li>
			<li><a href="logout.php">Logout</a></li>
        </ul>
    <?php } ?>
        <h1 class="logo">160 Federal</h1>
	</div>

<div class="content">