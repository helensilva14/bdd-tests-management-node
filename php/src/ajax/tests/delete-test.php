<?php
    // include database connection file
    include("../db-connection.php");
     
    // check request
    if(isset($_POST['test']))
    {
        $id = $_POST['test'];
     
        $query = "DELETE FROM test WHERE idtest = '$id'";
        $rs = mysqli_query($con, $query);
        
		if ($rs) {
			header("Location: ../../tests-page.php?msg=del_success");
		}
		else {
			header("Location: ../../tests-page.php?msg=del_error");
		}		
    }
?>