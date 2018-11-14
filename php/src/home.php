<!DOCTYPE html>
<html lang="en">

<head>
    <title>Home</title>

<?php
    include("base/header_template.php");
?>

    <!--Main Navigation-->

    <!--Main layout-->
    <main class="mt-5 pt-5">
        <div class="container">

            <!--Section: Cards-->
            <section class="pt-4">
                <?php
                    if (isset($_GET['msg'])) {
                        if ($_GET['msg']=='edit_success') {
                            echo   '
                            <div class="alert alert-success alert-dismissible fade show">
                                <center><strong>Usuário atualizado com sucesso!</strong></center>
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>';  
                        } elseif ($_GET['msg']=='edit_error') {
                            echo '
                            <div class="alert alert-danger alert-dismissible fade show">
                                <center><strong>Houve um erro de atualização de usuário!</strong></center>
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>'; 
                        }
                    }
                ?>
                <!-- Heading & Description -->
                <div class="wow fadeIn">
                    <!--Section heading-->
                    <?php echo "<h2 class='h1 text-center mb-5'>Olá, ".$_SESSION['name']."</h2>";  ?>
                </div>
                <!-- Heading & Description -->

                <!--Grid row-->
                <div class="row wow fadeIn">

                    <!--Grid column-->
                    <div class="col-md-3 mb-4">

                    <!--Card-->
                    <div class="card mb-4">
                        
                        <div class="card-header">Itens cadastrados</div>
                        
                        <?php
                            // include Database connection file 
                            include("ajax/db-connection.php");
                            
                            // get logged user id
    	                    $user_id = $_SESSION['iduser'];
    	                    
    	                    $q1 = "SELECT COUNT(idproject) AS 'total' FROM project WHERE iduser = $user_id";
     
                            if (!$rs1 = mysqli_query($con, $q1)) {
                                exit(mysqli_error($con));
                            }
                            
                            $q2 = "SELECT COUNT(s.idstory) AS 'total' FROM story s JOIN project p ON s.idproject = p.idproject
                                   WHERE p.iduser = $user_id";
     
                            if (!$rs2 = mysqli_query($con, $q2)) {
                                exit(mysqli_error($con));
                            }
                            
                            $q3 = "SELECT COUNT(t.idtest) AS 'total' FROM test t 
                                   JOIN story s ON t.idstory = s.idstory JOIN project p ON s.idproject = p.idproject
                                   WHERE p.iduser = $user_id";
     
                            if (!$rs3 = mysqli_query($con, $q3)) {
                                exit(mysqli_error($con));
                            }
                        ?>

                        <!--Card content-->
                        <div class="card-body">
                            <br>
                            <!-- List group links -->
                            <div class="list-group list-group-flush">
                                <?php while($r1 = mysqli_fetch_array($rs1)): ?>
                                    <a href="projects-page.php" class="list-group-item list-group-item-action waves-effect">Projetos
                                        <span class="badge badge-primary badge-pill pull-right">
                                            <?php echo $r1['total']; ?>
                                        </span>
                                    </a>
                                <?php endwhile; ?>
                                
                                <?php while($r2 = mysqli_fetch_array($rs2)): ?>
                                    <a href="stories-page.php" class="list-group-item list-group-item-action waves-effect">Estórias
                                        <span class="badge badge-primary badge-pill pull-right">
                                            <?php echo $r2['total']; ?>
                                        </span>
                                    </a>
                                <?php endwhile; ?>
                                
                                <?php while($r3 = mysqli_fetch_array($rs3)): ?>
                                    <a href="tests-page.php" class="list-group-item list-group-item-action waves-effect">Casos de Teste
                                        <span class="badge badge-primary badge-pill pull-right">
                                            <?php echo $r3['total']; ?>
                                        </span>
                                    </a>
                                <?php endwhile; ?>

                            </div>
                            <!-- List group links -->
                        <br>
                        </div>

                    </div>
                    <!--/.Card-->

                </div>
                    <!--Grid column-->
                    
                    <div class="col-md-9 mb-6">

                        <!--Card-->
                        <div class="card">
                            
                            <div class="card-header">
                                Bem vindo ao BDD-TM!
                            </div>
    
                            <!--Card content-->
                            <div class="card-body">
                                
                                <div class="row">
                                    <p class="text-center">
                                        O BDD é um acrônimo para Behavior Driven Development, que é traduzido como Desenvolvimento Guiado a Comportamento e TM é um acrônimo para Test Management, que significa Gerenciamento de Testes. O BDD auxilia na criação de testes e integração de regras de negócios com a linguagem de programação, focando no comportamento do software.
                                        <br>
                                        O objetivo do BDD-TM é formatar a escrita de casos de testes já na semântica do BDD, assim, auxiliando o analista de testes com a planejamento e estruturação dos testes de seu projeto. 
                                    </p>
                                </div>
    
                                <!-- Row-->
                                <div class="row">
    
                                    <!--Column-->
                                    <div class="col-md-3">
                                        <div class="text-center">
                                            <a class="btn btn-primary btn-sm waves-effect waves-light" data-toggle="modal" data-target="#add_new_project_modal" >NOVO PROJETO</a>
                                        </div>
                                    </div>
                                    <!--Column-->
    
                                    <!--Column-->
                                    <div class="col-md-3 offset-md-1">
                                        <div class="text-center">
                                            <a class="btn btn-primary btn-sm waves-effect waves-light" data-toggle="modal" data-target="#add_new_story_modal" > NOVA ESTÓRIA</a>
                                        </div>
                                    </div>
                                    <!--Column-->
                                    
                                    <!--Column-->
                                    <div class="col-md-3 offset-md-1" >
                                        <div class="text-center">
                                            <a class="btn btn-primary btn-sm waves-effect waves-light" data-toggle="modal" data-target="#add_new_test_modal" >NOVO CASO DE TESTE</a>
                                        </div>
                                    </div>
                                    <!--Column-->
    
                                </div>
                                <!-- /.Row-->
    
                            </div>
    
                        </div>
                        <!--/.Card-->
                    </div>

                </div>
                <!--Grid row-->

            </section>
            <!--Section: Cards-->

        </div>
    </main>
    <!--Main layout-->

    <!--Footer-->
    <footer class="page-footer font-small orange pt-4">
    
        <!--Copyright-->
        <div class="footer-copyright text-center py-3">
            <div class="container-fluid">
                 Henrique Grasso e Helen Silva - 2018<br>
                 Template: <a href="https://www.MDBootstrap.com"> MDBootstrap.com </a>
            </div>
        </div>
        <!--/.Copyright-->
    
    </footer>
    <!--/.Footer-->
    
    <!-- Bootstrap Modals -->
<!-- Modal - Add New Project -->
<div class="modal fade" id="add_new_project_modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title" id="myModalLabel">Novo Projeto</h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
            </div>
            <form action="ajax/projects/add-project.php" method="post">
                <div class="modal-body">
                   <div class="form-group">
                        <label for="name">Nome</label>
                        <input type="text" id="name" name="name" class="form-control" required/>
                    </div>
                    <div class="form-group">
                        <label for="description">Descrição</label>
                        <textarea class="form-control" id="description" name="description" rows="3" required></textarea>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>
                    <button type="submit" name="submit" class="btn btn-primary">Adicionar</button>
                </div>
            </form>
        </div>
    </div>
</div>
<!-- // Modal -->

    <!-- Modal - Add New Story -->
    <div class="modal fade" id="add_new_story_modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title" id="myModalLabel">Nova Estória</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                </div>
                <form action="ajax/stories/add-story.php" method="post">
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="description">Projeto</label>
                            <select class="form-control" name="project" required>
                                <option value="">Selecione...</option>	
                                    <?php $user_id = $_SESSION['iduser']; ?>
                                    <?php if($con): ?> 
                                        <?php
                                            $sql = "select * from project where iduser = $user_id";
                                            $rs = mysqli_query($con, $sql); 
                                        ?>
                                        <?php while($row = mysqli_fetch_array($rs)): ?>
                                            <option <?php echo 'value="'.$row["idproject"].'"'?>>
                                                <?php echo $row['name']; ?>
                                            </option>
                                        <?php endwhile; ?>
                                    <?php endif; ?>
                            </select>
                        </div>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="description">Descrição</label>
                            <textarea class="form-control" id="description" name="description" rows="3" required></textarea>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>
                        <button type="submit" name="submit" class="btn btn-primary">Adicionar</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <!-- // Modal -->

    <!-- Modal - Add New Test -->
    <div class="modal fade" id="add_new_test_modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title" id="myModalLabel">Novo Caso de Teste</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                </div>
                <form action="ajax/tests/add-test.php" method="post">
                    <div class="modal-body">
                        <div class="form-group">
                            <label>Projeto</label>
                            <select class="form-control" name="select_project" onchange="FetchStories(this.value)" required>
                                <option value="">Selecione...</option>
                                    <?php $user_id = $_SESSION['iduser']; ?>
                                    <?php if($con): ?> 
                                        <?php
                                            $sql = "SELECT * FROM project WHERE iduser = '$user_id'";
                                            $rs = mysqli_query($con, $sql); 
                                        ?>
                                        <?php while($row = mysqli_fetch_array($rs)): ?>
                                            <option <?php echo 'value="'.$row["idproject"].'"'?>>
                                                <?php echo $row['name']; ?>
                                            </option>
                                        <?php endwhile; ?>
                                    <?php endif; ?>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Estória</label>
                            <select class="form-control" name="select_story" id="select_story" required></select>
                        </div>
                        <hr />
                        <div class="form-group">
                            <label for="description">Dado</label>
                            <textarea class="form-control" id="text_dado" name="text_dado" rows="2" required></textarea>
                        </div>
                        <div class="form-group">
                            <label for="description">Quando</label>
                            <textarea class="form-control" id="text_quando" name="text_quando" rows="2" required></textarea>
                        </div>
                        <div class="form-group">
                            <label for="description">Então</label>
                            <textarea class="form-control" id="text_entao" name="text_entao" rows="2" required></textarea>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>
                        <button type="submit" name="submit" class="btn btn-primary">Adicionar</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <!-- // Modal -->

    <!-- SCRIPTS -->
    <!-- JQuery -->
    <script type="text/javascript" src="js/jquery-3.3.1.min.js"></script>
    <!-- Bootstrap tooltips -->
    <script type="text/javascript" src="js/popper.min.js"></script>
    <!-- Bootstrap core JavaScript -->
    <script type="text/javascript" src="js/bootstrap.min.js"></script>
    <!-- MDB core JavaScript -->
    <script type="text/javascript" src="js/mdb.min.js"></script>
    
    <script type="text/javascript" src="js/src/tests.js"></script>
    
    <!-- Initializations -->
    <script type="text/javascript">
        // Animations initialization
        new WOW().init();
    </script>
</body>

</html>