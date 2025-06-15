-- MariaDB dump 10.19  Distrib 10.4.32-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: estacionamiento_db
-- ------------------------------------------------------
-- Server version	10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `lugares`
--

DROP TABLE IF EXISTS `lugares`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `lugares` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `piso` int(11) NOT NULL,
  `numero` int(11) NOT NULL,
  `estado` enum('disponible','ocupado') DEFAULT 'disponible',
  PRIMARY KEY (`id`),
  UNIQUE KEY `piso` (`piso`,`numero`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lugares`
--

LOCK TABLES `lugares` WRITE;
/*!40000 ALTER TABLE `lugares` DISABLE KEYS */;
INSERT INTO `lugares` VALUES (10,1,1,'ocupado'),(11,1,2,'disponible'),(12,1,3,'disponible'),(13,1,4,'disponible'),(14,1,5,'disponible'),(15,1,6,'disponible'),(16,1,7,'disponible'),(17,1,8,'disponible'),(18,1,9,'disponible'),(19,1,10,'disponible'),(20,2,1,'ocupado'),(21,2,2,'disponible'),(22,2,3,'disponible'),(23,2,4,'disponible'),(24,2,5,'disponible'),(25,2,6,'disponible'),(26,2,7,'disponible'),(27,2,8,'disponible'),(28,2,9,'disponible'),(29,2,10,'disponible'),(30,3,1,'ocupado'),(31,3,2,'disponible'),(32,3,3,'disponible'),(33,3,4,'disponible'),(34,3,5,'disponible'),(35,3,6,'disponible'),(36,3,7,'disponible'),(37,3,8,'disponible'),(38,3,9,'disponible'),(39,3,10,'disponible');
/*!40000 ALTER TABLE `lugares` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ocupaciones`
--

DROP TABLE IF EXISTS `ocupaciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ocupaciones` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `patente` varchar(10) DEFAULT NULL,
  `lugar_id` int(11) DEFAULT NULL,
  `hora_entrada` datetime NOT NULL,
  `hora_salida` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `patente` (`patente`),
  KEY `lugar_id` (`lugar_id`),
  CONSTRAINT `ocupaciones_ibfk_1` FOREIGN KEY (`patente`) REFERENCES `vehiculos` (`patente`),
  CONSTRAINT `ocupaciones_ibfk_2` FOREIGN KEY (`lugar_id`) REFERENCES `lugares` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ocupaciones`
--

LOCK TABLES `ocupaciones` WRITE;
/*!40000 ALTER TABLE `ocupaciones` DISABLE KEYS */;
INSERT INTO `ocupaciones` VALUES (1,'AB123CD',10,'2025-06-15 11:58:25',NULL),(2,'CD456EF',20,'2025-06-15 11:58:25',NULL),(3,'GH789IJ',30,'2025-06-15 11:58:25',NULL);
/*!40000 ALTER TABLE `ocupaciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vehiculos`
--

DROP TABLE IF EXISTS `vehiculos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `vehiculos` (
  `patente` varchar(10) NOT NULL,
  `marca` varchar(50) NOT NULL,
  `modelo` varchar(50) NOT NULL,
  PRIMARY KEY (`patente`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vehiculos`
--

LOCK TABLES `vehiculos` WRITE;
/*!40000 ALTER TABLE `vehiculos` DISABLE KEYS */;
INSERT INTO `vehiculos` VALUES ('AB123CD','Toyota','Corolla'),('CD456EF','Ford','Fiesta'),('GH789IJ','Chevrolet','Cruze');
/*!40000 ALTER TABLE `vehiculos` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-15 12:00:27
