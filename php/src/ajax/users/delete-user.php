<?php
    // check request
    if(isset($_POST['id']))
    {
        // include Database connection file
        include("db-connection.php");
     
        // get user id
        $user_id = $_POST['id'];
     
        $query = "DELETE FROM user WHERE iduser = '$user_id'";
        
        if (!$result = mysqli_query($con, $query)) {
            exit(mysqli_error($con));
        }
    }
?>