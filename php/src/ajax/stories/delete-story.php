<?php
    // include database connection file
    include("../db-connection.php");
     
    // check request
    if(isset($_POST['story']))
    {
        $id = $_POST['story'];
     
        $query = "DELETE FROM story WHERE idstory = '$id'";
        $rs = mysqli_query($con, $query);
        
		if ($rs) {
			header("Location: ../../stories-page.php?msg=del_success");
		}
		else {
			header("Location: ../../stories-page.php?msg=del_error");
		}
    }
?>