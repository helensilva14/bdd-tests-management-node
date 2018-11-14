<?php
    // include database connection file
    include("../db-connection.php");

    // check request
    if(isset($_POST['submit']) && $con)
    {
        // get values
        $id = $_POST['id'];
        $description = $_POST['edit_description'];
     
        $query = "UPDATE story SET description = '$description' WHERE idstory  = '$id'";
                
        $con->query("SET CHARACTER SET utf8;");
        $con->query("SET collation_connection = utf8_unicode_ci;");
        
        $rs = mysqli_query($con, $query);
        
		if ($rs) {
			header("Location: ../../stories-page.php?msg=upd_success");
		}
		else {
			header("Location: ../../stories-page.php?msg=upd_error");
		}
    }
    
?>