<?php
    // include database connection file 
    include("../db-connection.php");

    if (isset($_POST['submit']) && $con) {
        
	    $name = $_POST['name'];
	    $description = $_POST['description'];
	    
	    session_start();
	    // get logged user
	    $user_id = $_SESSION['iduser'];
	    
	    $sql = "INSERT INTO project(name, description, iduser) values ('$name', '$description', '$user_id');";
	    
	    $con->query("SET CHARACTER SET utf8;");
        $con->query("SET collation_connection = utf8_unicode_ci;"); 
	    
	    $rs = mysqli_query($con, $sql);
	    
		if ($rs) {
			header("Location: ../../projects-page.php?msg=add_success");
		}
		else {
			header("Location: ../../projects-page.php?msg=add_error");
		}
		
	}
?>