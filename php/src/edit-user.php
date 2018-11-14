<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <title>Editar conta - BDD-TM</title>
        <!-- Font Awesome -->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
        <!-- Bootstrap core CSS -->
        <link href="css/bootstrap.min.css" rel="stylesheet">
        <!-- Material Design Bootstrap -->
        <link href="css/mdb.min.css" rel="stylesheet">
        <!-- Your custom styles (optional) -->
        <link href="css/style.min.css" rel="stylesheet">
        <!-- Custom styles for this template -->
        <link href="css/custom/signin.css" rel="stylesheet">
    </head>

    <body class="text-center">
      <!-- Material form register -->
      <div class="card">
        <!--Heading-->
        <h5 class="card-header info-color white-text text-center py-4">
            <strong>Editar conta</strong>
        </h5>
        <!--Card content-->
        <?php 
        
          session_start();
        
          if((isset($_GET['msg'])) && ($_GET['msg'] == 'error')){
            echo '
            <div class="alert alert-danger">
              <center><strong>As senhas não conferem!</strong></center>
            </div>';
          }
          
         ?>

        <div class="card-body px-lg-5 pt-0">
          <!-- Form -->
          <form class="text-left" style="color: #757575;" action="ajax/users/update-user.php" method="post">
  
            <div class="form-row">
              <div class="col">
                <!-- First name -->
                <br>
                <div class="form-group">
                  <label><strong>Nome</strong></label>
                  <input type="text" id="name" name="name" class="form-control" <?php echo 'value="'. $_SESSION['name'] .'"' ?> required>
                </div>
              </div>
              <div class="col">
                <!-- Last name -->
                <br>
                <div class="form-group">
                  <label><strong>Sobrenome</strong></label>
                  <input type="text" id="last_name" name="last_name" class="form-control" <?php echo 'value="'. $_SESSION['lastname'] .'"' ?> required>
                </div>
              </div>
            </div>
            
            <!-- E-mail -->
            <div class="form-group mt-0">
              <label><strong>E-mail</strong></label>
              <input type="email" id="email" name="email" class="form-control" <?php echo 'value="'. $_SESSION['email'] .'"' ?> required>
            </div>

            <!-- Password -->
            <div class="form-group">
              <label><strong>Senha</strong></label>
              <input type="password" id="password" name="password" class="form-control" required minlength="8">
              <small class="form-text text-muted mb-4">Digite pelo menos 8 caracteres</small>
            </div>

            <!-- Confirm Password -->
            <div class="form-group">
              <label><strong>Confirmar Senha</strong></label>
              <input type="password" id="confirmPassword" name="confirmPassword" class="form-control" required minlength="8">
            </div>
            
            <div class="form-row">
              <div class="col">
                <a href="home.php" class="btn btn-outline-info btn-rounded btn-block my-4 waves-effect z-depth-0" type="submit" name="submit">Voltar</a>
              </div>
              <div class="col">
                <button class="btn btn-outline-success btn-rounded btn-block my-4 waves-effect z-depth-0" type="submit" name="submit">Salvar</button>
              </div>
            </div>
            
          </form>
          <!-- Form -->
          
        </div>
      </div>
      <!-- Material form register -->
    </body>
</html>