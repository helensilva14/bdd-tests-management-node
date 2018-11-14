CREATE DATABASE  IF NOT EXISTS `bddtm` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `bddtm`;
-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: bddtm
-- ------------------------------------------------------
-- Server version	5.5.5-10.1.34-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `criterio`
--

DROP TABLE IF EXISTS `criterio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `criterio` (
  `idcriterio` int(11) NOT NULL AUTO_INCREMENT,
  `idstory` int(11) NOT NULL,
  `nome` varchar(200) NOT NULL,
  PRIMARY KEY (`idcriterio`),
  KEY `idstory_idx` (`idstory`),
  CONSTRAINT `idstory` FOREIGN KEY (`idstory`) REFERENCES `story` (`idstory`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `criterio`
--

LOCK TABLES `criterio` WRITE;
/*!40000 ALTER TABLE `criterio` DISABLE KEYS */;
INSERT INTO `criterio` VALUES (1,1,'O usuário deve ser capaz de ver o produto'),(2,1,'O usuário deveve ser capaz de buscar o produto'),(3,4,'O usuario fornecedor deve localizar a opção de crétido no menu'),(4,4,'O usuário deve clicar no icone de crétido e ser redirecionado para a página de crédito');
/*!40000 ALTER TABLE `criterio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projeto`
--

DROP TABLE IF EXISTS `projeto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `projeto` (
  `idprojeto` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(60) DEFAULT NULL,
  `descricao` longtext,
  `idusuario` int(11) NOT NULL,
  PRIMARY KEY (`idprojeto`),
  UNIQUE KEY `idprojeto_UNIQUE` (`idprojeto`),
  UNIQUE KEY `idusuario_UNIQUE` (`idusuario`),
  CONSTRAINT `idusuario` FOREIGN KEY (`idusuario`) REFERENCES `usuario` (`idusuario`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projeto`
--

LOCK TABLES `projeto` WRITE;
/*!40000 ALTER TABLE `projeto` DISABLE KEYS */;
INSERT INTO `projeto` VALUES (1,'CI&T','Projetos do Henrique',1),(2,'Eldorado','Projetos da Helen',2);
/*!40000 ALTER TABLE `projeto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sprint`
--

DROP TABLE IF EXISTS `sprint`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sprint` (
  `idsprint` int(11) NOT NULL AUTO_INCREMENT,
  `idprojeto` int(11) NOT NULL,
  `nome` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idsprint`),
  UNIQUE KEY `idsprint_UNIQUE` (`idsprint`),
  KEY `idprojeto_idx` (`idprojeto`),
  CONSTRAINT `idprojeto` FOREIGN KEY (`idprojeto`) REFERENCES `projeto` (`idprojeto`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sprint`
--

LOCK TABLES `sprint` WRITE;
/*!40000 ALTER TABLE `sprint` DISABLE KEYS */;
INSERT INTO `sprint` VALUES (1,1,'Sprint 1'),(2,1,'Sprint 2'),(3,1,'Sprint 3'),(4,2,'Sprint 1'),(5,2,'Sprint 2'),(6,2,'Sprint 3');
/*!40000 ALTER TABLE `sprint` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `story`
--

DROP TABLE IF EXISTS `story`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `story` (
  `idstory` int(11) NOT NULL AUTO_INCREMENT,
  `idsprint` int(11) NOT NULL,
  `nome` varchar(200) NOT NULL,
  PRIMARY KEY (`idstory`),
  KEY `idsprint_idx` (`idsprint`),
  CONSTRAINT `idsprint` FOREIGN KEY (`idsprint`) REFERENCES `sprint` (`idsprint`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `story`
--

LOCK TABLES `story` WRITE;
/*!40000 ALTER TABLE `story` DISABLE KEYS */;
INSERT INTO `story` VALUES (1,1,'Como um usuário, eu gostaria de adicionar um produto na página de usuário'),(2,1,'Como um usuário administrador, eu gostaria de traduzir páginas de conteúdo'),(3,2,'Como um usuário vendedor, eu gostaria de pesquisar produtos'),(4,4,'Como usuário fornecedor, eu gostaria de visualizar os meus débitos');
/*!40000 ALTER TABLE `story` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teste`
--

DROP TABLE IF EXISTS `teste`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `teste` (
  `idteste` int(11) NOT NULL AUTO_INCREMENT,
  `idcriterio` int(11) NOT NULL,
  `nome` longtext,
  PRIMARY KEY (`idteste`),
  UNIQUE KEY `idteste_UNIQUE` (`idteste`),
  KEY `idcriterio_idx` (`idcriterio`),
  CONSTRAINT `idcriterio` FOREIGN KEY (`idcriterio`) REFERENCES `criterio` (`idcriterio`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teste`
--

LOCK TABLES `teste` WRITE;
/*!40000 ALTER TABLE `teste` DISABLE KEYS */;
INSERT INTO `teste` VALUES (1,1,'Entra na página. Selecione o tipo de usuário.');
/*!40000 ALTER TABLE `teste` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuario` (
  `idusuario` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(60) NOT NULL,
  `sobrenome` varchar(60) NOT NULL,
  `email` varchar(120) NOT NULL,
  `senha` varchar(120) NOT NULL,
  PRIMARY KEY (`idusuario`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'Henrique','Grasso','henrique@gmail.com','1234'),(2,'Helen','Silva','helen@gmail.com','1234');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-08-13 20:24:01
