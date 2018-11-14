<?php
        
    include("../db-connection.php");

    if($_POST['password'] !== $_POST['confirmPassword']){
     
        header('Location: ../../register-user.php?msg=error');   
     
    } else if (isset($_POST['submit'])) {
        
        $name = $_POST['name'];
        $last_name = $_POST['last_name'];
        $email = $_POST['email'];
        $password = $_POST['password'];
        
        $sql = "INSERT INTO user(name, lastname, email, password) VALUES ('$name', '$last_name', '$email', '$password');";
        $rs = mysqli_query($con, $sql);
        
        if ($rs) {
            echo "<center><h3>Usuário cadastrado com sucesso!</h3></center>";
            
            header('Location: ../../login-page.php?msg=success');
        }
        else {
            echo "<center><h3>Erro de inclusão: </h3></center> " . mysqli_error($con);
            
            header('Location: ../../register-user.php?msg=add_error');
        }
    }
    
?>