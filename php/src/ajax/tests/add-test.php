<?php
    // include database connection file 
    include("../db-connection.php");

    if (isset($_POST['submit'])) {
        
	    $story_id = $_POST['select_story'];
	    $description = "Dado " . $_POST['text_dado'] . ", quando ". $_POST['text_quando'] .", então ". $_POST['text_entao'];
	    
	    $con->query("SET CHARACTER SET utf8;");
        $con->query("SET collation_connection = utf8_unicode_ci;"); 
	  
	    $sql = "INSERT INTO test(description, idstory) values ('$description', '$story_id');";
	    $rs = mysqli_query($con, $sql);
	    
		if ($rs) {
			header("Location: ../../tests-page.php?msg=add_success");
		}
		else {
			header("Location: ../../tests-page.php?msg=add_error");
		}
		
	}
?>