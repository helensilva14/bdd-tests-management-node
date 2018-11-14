    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
    <!-- Bootstrap core CSS -->
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <!-- Material Design Bootstrap -->
    <link href="css/mdb.min.css" rel="stylesheet">
    <!-- Your custom styles (optional) -->
    <link href="css/style.min.css" rel="stylesheet">
</head>

<body>

  <!--Main Navigation-->

  <?php 
      session_start();
      if((!isset($_SESSION['iduser'])) && (!isset($_SESSION['name']))) { 
            header('Location: login-page.php'); 
      }
   ?>
 
    <header>

        <!-- Navbar -->
        <nav class="navbar fixed-top navbar-expand-lg navbar-light white scrolling-navbar">
            <div class="container">

                <!-- Brand -->
                <a class="navbar-brand waves-effect" href="home.php">
                    <img src="img/logo.png" width="77" height="59"></img>
                </a>

                <!-- Collapse -->
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <!-- Links -->
                <div class="collapse navbar-collapse" id="navbarSupportedContent">

                    <!-- Left -->
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item">
                            <a class="nav-link waves-effect" href="home.php">Home</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link waves-effect" href="projects-page.php">Projetos</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link waves-effect" href="stories-page.php">Estórias</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link waves-effect" href="tests-page.php">Casos de Teste</a>
                        </li>
                    </ul>

                    <!-- Right -->
                    <ul class="navbar-nav nav-flex-icons">
                        <li class="nav-item">
                            <a href="edit-user.php" class="nav-link border border-light rounded waves-effect">
                                <i class="fa fa-user"></i>Editar conta
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="ajax/users/logout.php" class="nav-link border border-light rounded waves-effect">
                                <i class="fa fa-sign-out"></i>Sair
                            </a>
                        </li>
                    </ul>

                </div>

            </div>
        </nav>
        <!-- Navbar -->

    </header>