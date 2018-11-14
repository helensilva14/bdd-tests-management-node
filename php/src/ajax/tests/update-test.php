<?php
    // include database connection file
    include("../db-connection.php");

    // check request
    if(isset($_POST['submit']))
    {
        // get values
        $id = $_POST['id'];
        $description = $_POST['edit_description'];    
        
        $con->query("SET CHARACTER SET utf8;");
        $con->query("SET collation_connection = utf8_unicode_ci;"); 
     
        $query = "UPDATE test SET description = '$description' WHERE idtest  = '$id'";

        $rs = mysqli_query($con, $query);
        
		if ($rs) {
			header("Location: ../../tests-page.php?msg=upd_success");
		}
		else {
			header("Location: ../../tests-page.php?msg=upd_success");
		}
    }
    
?>