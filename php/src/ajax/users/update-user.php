<?php
    // include Database connection file
    include("../db-connection.php");

    if($_POST['password'] !== $_POST['confirmPassword']){
     
        header('Location: ../../edit-user.php?msg=error');   
     
    } else if(isset($_POST['submit'])) {
        
        session_start();
	    // get logged user
	    $id = $_SESSION['iduser'];
        
        // get values
        $first_name = $_POST['name'];
        $last_name = $_POST['last_name'];
        $email = $_POST['email'];
        $password = $_POST['password'];
     
        // Updaste User details
        $query = "UPDATE user SET name = '$first_name', lastname = '$last_name', email = '$email' ";
        
        if ($password != "") {
            $query .= ", password = '$password' ";
        }
        
        $query .= "WHERE iduser = '$id'";
        
        if (!$rs = mysqli_query($con, $query)) {
            exit(mysqli_error($con));
        }
        
        if ($rs) {

            //session_start();
            
            $_SESSION['iduser'] = $id;
			$_SESSION['name'] = $first_name;
			$_SESSION['lastname'] = $last_name;
			$_SESSION['email'] = $email;
            
            header('Location: ../../home.php?msg=edit_success');
        }
        else {
            echo "<center><h3>Erro de inclusão: </h3></center> " . mysqli_error($con);
            
            header('Location: ../../home.php?msg=edit_error');
        }
    }
?>