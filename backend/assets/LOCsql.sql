CREATE DATABASE  IF NOT EXISTS `locdata` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `locdata`;
-- MySQL dump 10.13  Distrib 8.0.44, for Win64 (x86_64)
--
-- Host: 143.198.71.209    Database: locdata
-- ------------------------------------------------------
-- Server version	8.0.43-0ubuntu0.24.04.2

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
-- Table structure for table `divisiondata`
--

DROP TABLE IF EXISTS `divisiondata`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `divisiondata` (
  `id` int NOT NULL AUTO_INCREMENT,
  `division` varchar(30) NOT NULL DEFAULT '0',
  `academic_program` varchar(30) DEFAULT NULL,
  `division_chair` varchar(30) DEFAULT NULL,
  `dean` varchar(30) DEFAULT NULL,
  `loc_rep` varchar(30) DEFAULT NULL,
  `pen_contact` varchar(30) DEFAULT NULL,
  `date_submitted` date DEFAULT NULL,
  `payees` varchar(30) DEFAULT NULL,
  `has_been_paid` varchar(3) DEFAULT 'No',
  `report_submitted` varchar(3) DEFAULT 'No',
  `notes` tinytext,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `divisiondata`
--

LOCK TABLES `divisiondata` WRITE;
/*!40000 ALTER TABLE `divisiondata` DISABLE KEYS */;
INSERT INTO `divisiondata` VALUES (1,'Orion Arts','stuff program','Paul Metevier','Christie Gilliland','Monica Bowen','pen_contact_0@college.edu','2025-06-30','ME','Yes','No','i love notes'),(2,'Humanities','Communication Studies','Katie Cunnion','Jamie Fitzgerald','Lisa Luengo','pen_contact_1@college.edu','2024-06-30','','No','No',''),(3,'Social Science','Anthropology','Mark Thomason','Christie Gilliland','Joy Crawford','pen_contact_2@college.edu','2023-06-30','','No','No',''),(4,'Division 7','History','Dr. David Lee','Dr. Frank Davis','Dr. Helen Davis','pen_contact_3@college.edu','2022-06-30','','No','No',''),(5,'Division 4','Political Science','Dr. Jane Lee','Dr. Helen Brown','Dr. Frank Smith','pen_contact_4@college.edu','2021-06-30','','No','No',''),(6,'Division 7','Psychology','Dr. Helen Davis','Dr. Carol Smith','Dr. Grace Johnson','pen_contact_5@college.edu','2020-06-30','','No','No',''),(7,'English','English','Ian Sherman','Jamie Fitzgerald','Jake Frye','pen_contact_6@college.edu','2019-06-30','','No','No',''),(8,'Science','BOOOOOOOORING','Katy Shaw and Danny Najera','Miebeth Bustillo-Booth','Nicole Feider','pen_contact_7@college.edu','2018-06-30','NEVER','No','No','fuick you'),(9,'Division 4','Biology/Environmental Science','Dr. Carol Lee','Dr. David Lee','Dr. Alice Smith','pen_contact_8@college.edu','2017-06-30','','No','No',''),(10,'Division 6','Geology/Oceanography','Dr. Bob Brown','Dr. Emily Johnson','Dr. Jane Lee','pen_contact_9@college.edu','2016-06-30','','No','No',''),(11,'Business, Law, and Education','Accounting','Lea Ann Simpson','Lea Ann Simpson','Jane Swenson','pen_contact_10@college.edu','2015-06-30','','No','No',''),(12,'Division 8','Business Management','Dr. Helen Lee','Dr. Alice Davis','Dr. Emily Brown','pen_contact_11@college.edu','2014-06-30','','No','No',''),(13,'Division 7','Business Marketing/Entrepreneu','Dr. Grace Johnson','Dr. David Davis','Dr. Jane Lee','pen_contact_12@college.edu','2013-06-30','','No','No',''),(14,'Technology','Aviation','Michael Wood','Lea Ann Simpson','Josh Archer','pen_contact_13@college.edu','2012-06-30','','No','No',''),(15,'Division 7','CAD Design and Engineering Tec','Dr. Carol Davis','Dr. Emily Davis','Dr. Grace Smith','pen_contact_14@college.edu','2011-06-30','','No','No',''),(16,'Division 8','Natural Resources','Dr. Bob Johnson','Dr. Alice Brown','Dr. Frank Davis','pen_contact_15@college.edu','2010-06-30','','No','No',''),(17,'Health Science','Practical Nursing','Leslie Kessler','Lionel Candido Flores','Thom Jackson','pen_contact_16@college.edu','2009-06-30','','No','No',''),(18,'Division 3','Physical Therapist Assistant','Dr. Alice Smith','Dr. Helen Brown','Dr. Helen Davis','pen_contact_17@college.edu','2008-06-30','','No','No',''),(19,'Trades','Automotive Technology','David Lewis','Lea Ann Simpson','Ben Orr','pen_contact_18@college.edu','2007-06-30','','No','No',''),(20,'Division 2','Manufacturing','Dr. Ian Davis','Dr. Frank Johnson','Dr. Bob Johnson','pen_contact_19@college.edu','2006-06-30','','No','No',''),(21,'Transitional Studies','Health and Physical Education','Dr. Grace Lee','Lionel Candido Flores','Thom Jackson','pen_contact_20@college.edu','2005-06-30','','No','No',''),(22,'Fine Arts','Music','Paul Metevier','Christie Gilliland','Monica Bowen','pen_contact_21@college.edu','2004-06-30','','No','No',''),(23,'Humanities','Communication Studies','Katie Cunnion','Jamie Fitzgerald','Lisa Luengo','pen_contact_22@college.edu','2003-06-30','','No','No',''),(24,'Social Science','Anthropology','Mark Thomason','Christie Gilliland','Joy Crawford','pen_contact_23@college.edu','2002-06-30','','No','No',''),(25,'Division 4','History','Dr. Jane Davis','Dr. Frank Smith','Dr. Frank Davis','pen_contact_24@college.edu','2001-06-30','','No','No',''),(26,'Division 8','Political Science','Dr. Ian Brown','Dr. Jane Johnson','Dr. Bob Davis','pen_contact_25@college.edu','2000-06-30','','No','No',''),(27,'Division 5','Psychology','Dr. Alice Brown','Dr. Grace Smith','Dr. Alice Davis','pen_contact_26@college.edu','1999-06-30','','No','No',''),(28,'English','English','Ian Sherman','Jamie Fitzgerald','Jake Frye','pen_contact_27@college.edu','1998-06-30','','No','No',''),(29,'Science','Anatomy and Physiology','Katy Shaw and Danny Najera','Miebeth Bustillo-Booth','Nicole Feider','pen_contact_28@college.edu','1997-06-30','','No','No',''),(30,'Division 7','Biology/Environmental Science','Dr. Frank Brown','Dr. Jane Lee','Dr. Emily Lee','pen_contact_29@college.edu','1996-06-30','','No','No',''),(31,'Division 1','Geology/Oceanography','Dr. Helen Brown','Dr. Ian Lee','Dr. Ian Davis','pen_contact_30@college.edu','1995-06-30','','No','No',''),(32,'Business, Law, and Education','Accounting','Lea Ann Simpson','Lea Ann Simpson','Jane Swenson','pen_contact_31@college.edu','1994-06-30','','No','No',''),(33,'Division 5','Business Management','Dr. David Davis','Dr. David Johnson','Dr. Emily Davis','pen_contact_32@college.edu','1993-06-30','','No','No',''),(34,'Division 2','Business Marketing/Entrepreneu','Dr. David Lee','Dr. Frank Johnson','Dr. Grace Brown','pen_contact_33@college.edu','1992-06-30','','No','No',''),(35,'Technology','Aviation','Michael Wood','Lea Ann Simpson','Josh Archer','pen_contact_34@college.edu','1991-06-30','','No','No',''),(36,'Division 1','CAD Design and Engineering Tec','Dr. Jane Smith','Dr. Frank Brown','Dr. Carol Brown','pen_contact_35@college.edu','1990-06-30','','No','No',''),(37,'Division 9','Natural Resources','Dr. Bob Smith','Dr. Ian Smith','Dr. Helen Johnson','pen_contact_36@college.edu','1989-06-30','','No','No',''),(38,'Health Science','Practical Nursing','Leslie Kessler','Lionel Candido Flores','Thom Jackson','pen_contact_37@college.edu','1988-06-30','','No','No',''),(39,'Division 10','Physical Therapist Assistant','Dr. Grace Johnson','Dr. Helen Smith','Dr. Alice Smith','pen_contact_38@college.edu','1987-06-30','','No','No',''),(40,'Trades','Automotive Technology','David Lewis','Lea Ann Simpson','Ben Orr','pen_contact_39@college.edu','1986-06-30','','No','No',''),(41,'Division 2','Manufacturing','Dr. Bob Brown','Dr. Bob Davis','Dr. Bob Johnson','pen_contact_40@college.edu','1985-06-30','','No','No',''),(42,'Transitional Studies','Health and Physical Education','Dr. Alice Smith','Lionel Candido Flores','Thom Jackson','pen_contact_41@college.edu','1984-06-30','','No','No',''),(43,'Fine Arts','Music','Paul Metevier','Christie Gilliland','Monica Bowen','pen_contact_42@college.edu','1983-06-30','','No','No',''),(44,'Humanities','Communication Studies','Katie Cunnion','Jamie Fitzgerald','Lisa Luengo','pen_contact_43@college.edu','1982-06-30','','No','No',''),(45,'Social Science','Anthropology','Mark Thomason','Christie Gilliland','Joy Crawford','pen_contact_44@college.edu','1981-06-30','','No','No',''),(46,'Division 6','History','Dr. Jane Smith','Dr. Emily Lee','Dr. Jane Lee','pen_contact_45@college.edu','1980-06-30','','No','No',''),(47,'Division 9','Political Science','Dr. Jane Brown','Dr. Helen Smith','Dr. Frank Lee','pen_contact_46@college.edu','1979-06-30','','No','No',''),(48,'Division 10','Psychology','Dr. Alice Brown','Dr. Bob Lee','Dr. Bob Davis','pen_contact_47@college.edu','1978-06-30','','No','No',''),(49,'English','English','Ian Sherman','Jamie Fitzgerald','Jake Frye','pen_contact_48@college.edu','1977-06-30','','No','No',''),(50,'Science','Anatomy and Physiology','Katy Shaw and Danny Najera','Miebeth Bustillo-Booth','Nicole Feider','pen_contact_49@college.edu','1976-06-30','','No','No','');
/*!40000 ALTER TABLE `divisiondata` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-11-15 22:22:40
