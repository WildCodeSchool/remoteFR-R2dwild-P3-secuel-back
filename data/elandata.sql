-- MySQL dump 10.13  Distrib 8.0.22, for Linux (x86_64)
--
-- Host: localhost    Database: Elan
-- ------------------------------------------------------
-- Server version	8.0.23-0ubuntu0.20.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Create database `Elan` and use it
--
CREATE SCHEMA IF NOT EXISTS `Elan` DEFAULT CHARACTER SET utf8 ;
USE `Elan` ;
--
-- Table structure for table `Account`
--
DROP TABLE IF EXISTS `Account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Account` (
  `id_Compte` int NOT NULL AUTO_INCREMENT,
  `account_name` varchar(100) NOT NULL,
  `Login` varchar(255) DEFAULT NULL,
  `Password` varchar(32) NOT NULL,
  PRIMARY KEY (`id_Compte`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Account`
--

LOCK TABLES `Account` WRITE;
/*!40000 ALTER TABLE `Account` DISABLE KEYS */;
INSERT INTO `Account` VALUES (1,'Jean','jean@elan.fr','secretjean');
/*!40000 ALTER TABLE `Account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Health_insurance`
--

DROP TABLE IF EXISTS `Health_insurance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Health_insurance` (
  `id_insurance` int NOT NULL AUTO_INCREMENT,
  `insurance_name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_insurance`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Health_insurance`
--

LOCK TABLES `Health_insurance` WRITE;
/*!40000 ALTER TABLE `Health_insurance` DISABLE KEYS */;
INSERT INTO `Health_insurance` VALUES (1,'Sécurité Sociale'),(2,'GENERALI'),(3,'AON');
/*!40000 ALTER TABLE `Health_insurance` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Insured`
--

DROP TABLE IF EXISTS `Insured`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Insured` (
  `id_Insured` int NOT NULL AUTO_INCREMENT,
  `lastname` varchar(50) NOT NULL,
  `firstname` varchar(70) DEFAULT NULL,
  `social_security_num` varchar(100) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `tel` varchar(45) DEFAULT NULL,
  `Password` varchar(32) NOT NULL,
  `birth_date` date DEFAULT NULL,
  `Account_id_Compte` int NOT NULL,
  `color` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_Insured`,`Account_id_Compte`),
  KEY `fk_Insured_Account1_idx` (`Account_id_Compte`),
  CONSTRAINT `fk_Insured_Account1` FOREIGN KEY (`Account_id_Compte`) REFERENCES `Account` (`id_Compte`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Insured`
--

LOCK TABLES `Insured` WRITE;
/*!40000 ALTER TABLE `Insured` DISABLE KEYS */;
INSERT INTO `Insured` VALUES (1,'Dupont','Jean','1 76 92 100 100 01','jean@elan.fr','0602030405','secretjean','1960-01-01',1,'#348AA7'),(2,'Dupont','Lucas','1 76 92 100 100 01','lucas@elan.fr','0602030405','secretlucas','2007-01-01',1,'#FCBF49'),(3,'Dupont','Marie','2 76 92 100 100 01','marie@elan.fr','0602030405','secretmarie','1965-01-01',1,'#71B340'),(4,'Dupont','Léa','2 76 92 100 100 01','lea@elan.fr','0602030405','secretlea','2016-01-01',1,'#7EA8BE');
/*!40000 ALTER TABLE `Insured` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Medical_events`
--

DROP TABLE IF EXISTS `Medical_events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Medical_events` (
  `id_med_event` int NOT NULL AUTO_INCREMENT,
  `Date_Event` date NOT NULL,
  `amount_Event` float DEFAULT NULL,
  `secu_status` varchar(45) DEFAULT NULL,
  `insurance_status` varchar(45) DEFAULT NULL,
  `Specialities_id_speciality` int NOT NULL,
  `Insured_id_Insured` int NOT NULL,
  `Insured_Account_id_Compte` int NOT NULL,
  `Pros_pro_id` int NOT NULL,
  PRIMARY KEY (`id_med_event`,`Specialities_id_speciality`,`Insured_id_Insured`,`Insured_Account_id_Compte`,`Pros_pro_id`),
  KEY `fk_Medical_events_Specialities2_idx` (`Specialities_id_speciality`),
  KEY `fk_Medical_events_Insured1_idx` (`Insured_id_Insured`,`Insured_Account_id_Compte`),
  KEY `fk_Medical_events_Pros2_idx` (`Pros_pro_id`),
  CONSTRAINT `fk_Medical_events_Insured1` FOREIGN KEY (`Insured_id_Insured`, `Insured_Account_id_Compte`) REFERENCES `Insured` (`id_Insured`, `Account_id_Compte`),
  CONSTRAINT `fk_Medical_events_Pros2` FOREIGN KEY (`Pros_pro_id`) REFERENCES `Pros` (`pro_id`),
  CONSTRAINT `fk_Medical_events_Specialities2` FOREIGN KEY (`Specialities_id_speciality`) REFERENCES `Specialities` (`id_speciality`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Medical_events`
--

LOCK TABLES `Medical_events` WRITE;
/*!40000 ALTER TABLE `Medical_events` DISABLE KEYS */;
INSERT INTO `Medical_events` VALUES (1,'2021-02-15',23,'Traité','Traité',1,1,1,1),(2,'2020-10-12',23,'Traité','Traité',1,1,1,1),(3,'2020-02-02',23,'Traité','Traité',1,1,1,1),(4,'2020-02-02',5.83,'Traité','Traité',2,1,1,2),(5,'2020-10-12',20.41,'Traité','Traité',2,1,1,2),(6,'2021-02-15',32.5,'Traité','Traité',2,1,1,2),(7,'2020-10-12',123,'En cours de traitement','Non reçu',3,2,1,3),(8,'2021-02-02',200,'En cours de traitement','En cours de traitement',4,2,1,4),(9,'2020-12-23',150,'Traité','Traité',5,3,1,5),(10,'2021-02-15',23,'Traité','Traité',1,3,1,1),(11,'2021-02-15',13.28,'En cours de traitement','Traité',2,3,1,2),(12,'2021-03-01',23,'Traité','Traité',1,4,1,1),(13,'2020-07-07',45,'Traité','Traité',6,4,1,6),(14,'2020-11-11',45,'Traité','Traité',6,4,1,6),(15,'2021-01-01',45,'Traité','Traité',6,4,1,6);
/*!40000 ALTER TABLE `Medical_events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Notifications`
--

DROP TABLE IF EXISTS `Notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Notifications` (
  `id_Notification` int NOT NULL AUTO_INCREMENT,
  `type` varchar(45) NOT NULL,
  `Message` text,
  PRIMARY KEY (`id_Notification`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Notifications`
--

LOCK TABLES `Notifications` WRITE;
/*!40000 ALTER TABLE `Notifications` DISABLE KEYS */;
INSERT INTO `Notifications` VALUES (1,'Manque dossier d\'acceptation','Télécharger vos documents via notre application pour les envoyer à votre CPAM'),(2,'Manque ordonnance du médecin','Télécharger vos documents via notre application pour les envoyer à votre CPAM'),(3,'non reçu','Contactez à votre mutuelle via notre application pour résoudre l\'incident');
/*!40000 ALTER TABLE `Notifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Pros`
--

DROP TABLE IF EXISTS `Pros`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Pros` (
  `pro_id` int NOT NULL AUTO_INCREMENT,
  `pro_name` varchar(75) NOT NULL,
  PRIMARY KEY (`pro_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Pros`
--

LOCK TABLES `Pros` WRITE;
/*!40000 ALTER TABLE `Pros` DISABLE KEYS */;
INSERT INTO `Pros` VALUES (1,'Bigotte'),(2,'Pharmacie du Marché'),(3,'Larcher'),(4,'Mobacher'),(5,'Hôpital Antony'),(6,'Plessis');
/*!40000 ALTER TABLE `Pros` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Pros_Speciality`
--

DROP TABLE IF EXISTS `Pros_Speciality`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Pros_Speciality` (
  `id_Pros_Speciality` int NOT NULL AUTO_INCREMENT,
  `pros_pro_id` int NOT NULL,
  `specialities_id_speciality` int NOT NULL,
  `Status` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`id_Pros_Speciality`),
  KEY `fk_pros_has_specialities_specialities1_idx` (`specialities_id_speciality`),
  KEY `fk_pros_has_specialities_pros1_idx` (`pros_pro_id`),
  CONSTRAINT `fk_pros_has_specialities_pros1` FOREIGN KEY (`pros_pro_id`) REFERENCES `Pros` (`pro_id`),
  CONSTRAINT `fk_pros_has_specialities_specialities1` FOREIGN KEY (`specialities_id_speciality`) REFERENCES `Specialities` (`id_speciality`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Pros_Speciality`
--

LOCK TABLES `Pros_Speciality` WRITE;
/*!40000 ALTER TABLE `Pros_Speciality` DISABLE KEYS */;
INSERT INTO `Pros_Speciality` VALUES (1,1,1,1),(2,2,2,1),(3,3,3,1),(4,4,4,1),(5,5,5,1),(6,6,6,1);
/*!40000 ALTER TABLE `Pros_Speciality` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Specialities`
--

DROP TABLE IF EXISTS `Specialities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Specialities` (
  `id_speciality` int NOT NULL AUTO_INCREMENT,
  `speciality_name` varchar(75) NOT NULL,
  PRIMARY KEY (`id_speciality`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Specialities`
--

LOCK TABLES `Specialities` WRITE;
/*!40000 ALTER TABLE `Specialities` DISABLE KEYS */;
INSERT INTO `Specialities` VALUES (1,'Généraliste'),(2,'Pharmacie'),(3,'Podologue'),(4,'Orthodontiste'),(5,'Imagerie médicale'),(6,'Dermatologue');
/*!40000 ALTER TABLE `Specialities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notif_insured`
--

DROP TABLE IF EXISTS `notif_insured`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notif_insured` (
  `id_notif_insured` int NOT NULL AUTO_INCREMENT,
  `notifications_id_Notification` int NOT NULL,
  `insured_id_Insured` int NOT NULL,
  `insured_Account_id_Compte` int NOT NULL,
  `Status` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`id_notif_insured`),
  KEY `fk_notifications_has_insured_insured1_idx` (`insured_id_Insured`,`insured_Account_id_Compte`),
  KEY `fk_notifications_has_insured_notifications1_idx` (`notifications_id_Notification`),
  CONSTRAINT `fk_notifications_has_insured_insured1` FOREIGN KEY (`insured_id_Insured`, `insured_Account_id_Compte`) REFERENCES `Insured` (`id_Insured`, `Account_id_Compte`),
  CONSTRAINT `fk_notifications_has_insured_notifications1` FOREIGN KEY (`notifications_id_Notification`) REFERENCES `Notifications` (`id_Notification`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notif_insured`
--

LOCK TABLES `notif_insured` WRITE;
/*!40000 ALTER TABLE `notif_insured` DISABLE KEYS */;
INSERT INTO `notif_insured` VALUES (1,1,2,1,0),(2,2,3,1,0),(3,3,2,1,0);
/*!40000 ALTER TABLE `notif_insured` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `refund`
--

DROP TABLE IF EXISTS `refund`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `refund` (
  `id_refund` int NOT NULL AUTO_INCREMENT,
  `Amount_Refund` float DEFAULT NULL,
  `Date_Refund` date DEFAULT NULL,
  `Health_insurance_id_Mutuelle` int NOT NULL,
  `Medical_events_id_Actes` int NOT NULL,
  PRIMARY KEY (`id_refund`,`Health_insurance_id_Mutuelle`,`Medical_events_id_Actes`),
  KEY `fk_Remboursement_Health_insurance1_idx` (`Health_insurance_id_Mutuelle`),
  KEY `fk_Remboursement_Medical_events1_idx` (`Medical_events_id_Actes`),
  CONSTRAINT `fk_Remboursement_Health_insurance1` FOREIGN KEY (`Health_insurance_id_Mutuelle`) REFERENCES `Health_insurance` (`id_insurance`),
  CONSTRAINT `fk_Remboursement_Medical_events1` FOREIGN KEY (`Medical_events_id_Actes`) REFERENCES `Medical_events` (`id_med_event`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `refund`
--

LOCK TABLES `refund` WRITE;
/*!40000 ALTER TABLE `refund` DISABLE KEYS */;
INSERT INTO `refund` VALUES (1,20,'2021-02-18',1,1),(2,3,'2021-02-18',2,1),(3,20,'2020-10-15',1,2),(4,3,'2020-10-15',2,2),(5,20,'2020-02-05',1,3),(6,3,'2020-02-05',2,3),(7,28.88,'2021-02-18',1,4),(8,3.62,'2021-02-18',2,4),(9,15.56,'2020-10-15',1,5),(10,4.85,'2020-10-15',2,5),(11,3.64,'2020-02-05',1,6),(12,2.19,'2020-02-05',2,6),(13,120,'2020-12-26',1,9),(14,30,'2020-12-27',3,9),(15,20,'2021-02-18',1,10),(16,3,'2021-02-19',3,10),(17,0,'2021-04-12',1,11),(18,20,'2021-03-04',1,12),(19,3,'2021-03-05',3,12),(20,37.5,'2020-07-10',1,13),(21,7.5,'2020-07-11',3,13),(22,37.5,'2020-11-14',1,14),(23,7.5,'2020-11-15',3,14),(24,37.5,'2021-01-06',1,15),(25,7.5,'2021-01-07',3,15),(26,0,'2021-04-12',1,7),(27,0,'2021-04-12',2,8),(28,3.28,'2021-02-19',3,11),(29,0,'2021-04-12',1,8),(30,0,'2021-04-12',2,7);
/*!40000 ALTER TABLE `refund` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-04-14 10:10:14
