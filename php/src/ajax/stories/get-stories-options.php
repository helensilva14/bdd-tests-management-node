<?php
    // include database connection file
    include("../db-connection.php");    
    
    // check request
    if(isset($_GET['project']))
    {
        $project_id = $_GET['project'];
        
        $query = "SELECT * FROM story WHERE idproject = '$project_id'";
        
        $con->query("SET CHARACTER SET utf8;");
        $con->query("SET collation_connection = utf8_unicode_ci;");
        
        $rs = mysqli_query($con, $query);
        
        while($row = mysqli_fetch_array($rs))
        {
            echo '<option value="'. $row['idstory'] .'">'. $row['description'] .'</option>';
        }
    }
?>