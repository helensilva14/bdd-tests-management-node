<?php
    // include database connection file 
    include("../db-connection.php");

    if (isset($_POST['submit']) && $con) {
        
	    $description = $_POST['description'];
	    $project_id = $_POST['project'];
	    
	    $con->query("SET CHARACTER SET utf8;");
        $con->query("SET collation_connection = utf8_unicode_ci;"); 
	  
	    $sql = "INSERT INTO story(description, idproject) values ('$description', '$project_id');";
	    $rs = mysqli_query($con, $sql);
	    
		if ($rs) {
			header("Location: ../../stories-page.php?msg=add_success");
		}
		else {
			header("Location: ../../stories-page.php?msg=add_error");
		}		
	}
?>