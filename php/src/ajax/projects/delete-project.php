<?php
    // include database connection file
    include("../db-connection.php");
     
    // check request
    if(isset($_POST['project']))
    {
        $id = $_POST['project'];
     
        $query = "DELETE FROM project WHERE idproject = '$id'";
        $rs = mysqli_query($con, $query);
        
		if ($rs) {
			header("Location: ../../projects-page.php?del_success");
		}
		else {
			header("Location: ../../projects-page.php?del_error");
		}		
    }
?>