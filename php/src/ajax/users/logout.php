<?php
	session_start();
	unset($_SESSION["iduser"]);
	unset($_SESSION["name"]);	
	session_destroy();
	
	if((!isset($_SESSION['iduser'])) && (!isset($_SESSION['name']))){	
		header('Location: ../../login-page.php'); 
	}

?>