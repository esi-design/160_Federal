<?php include "header.php"; ?>

<?php
if(!empty($_SESSION['LoggedIn']) && !empty($_SESSION['Username']))
{
	 ?>
    
<!--
    <h2>Member Area</h2>
  	 <p>Thanks for logging in! You are <b><?=$_SESSION['Username']?><b> and your email address is <b><?=$_SESSION['EmailAddress']?></b>.</p>
    
    <ul>
        <li><a href="logout.php">Logout.</a></li>
    </ul>
-->
	
	<?php include "visitor-table.php"; ?>
    
    <?php
}
elseif(!empty($_POST['username']) && !empty($_POST['password']))
{
	 $username = mysql_real_escape_string($_POST['username']);
    $password = md5(mysql_real_escape_string($_POST['password']));
    
	 $checklogin = mysql_query("SELECT * FROM users WHERE Username = '".$username."' AND Password = '".$password."'");
    
    if(mysql_num_rows($checklogin) == 1)
    {
    	 $row = mysql_fetch_array($checklogin);
        $email = $row['EmailAddress'];
        
        $_SESSION['Username'] = $username;
        $_SESSION['EmailAddress'] = $email;
        $_SESSION['LoggedIn'] = 1;
 
// 		echo '<h3>Logged in successfully.</h3>';
		echo '<meta http-equiv="refresh" content="1; url=visitor.php">';
    }
    else
    {
    	 echo "<h1>Error</h1>";
        echo "<p>Sorry, your account could not be found. Please <a href=\"index.php\">click here to try again</a>.</p>";
    }
}
else
{
	?>
    

<!--    <p>Thanks for visiting! Please either login below, or <a href="register.php">click here to register</a>.</p>   -->

	<div class="login">
	<form method="post" action="index.php" name="loginform" id="loginform" class="form-signin">
	<fieldset>
		<label for="username">Username:</label><input type="text" name="username" id="username" /><br />
		<label for="password">Password:</label><input type="password" name="password" id="password" /><br />
		<input type="submit" name="login" id="login" value="Login" />
	</fieldset>
	</form>
	</div>
	
   <?php
}
?>

<?php include "footer.php"; ?>