-- MySQL dump 10.13  Distrib 8.0.44, for Win64 (x86_64)
--
-- Host: localhost    Database: locdata
-- ------------------------------------------------------
-- Server version	8.0.44

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
INSERT INTO `divisiondata` VALUES (1,'Orion Arts','stuff program','Paul Metevier','Christie Gilliland','Monica Bowen','pen_contact_0@college.edu','2025-06-30','ME','Yes','No','TEST'),(2,'Humanities','Communication Studies','Katie Cunnion','Jamie Fitzgerald','Lisa Luengo','pen_contact_1@college.edu','2024-06-30','','No','No','test'),(3,'Social Science','Anthropology','Mark Thomason','Christie Gilliland','Joy Crawford','pen_contact_2@college.edu','2023-06-30','','No','No','test3'),(4,'Division 7','History','Dr. David Lee','Dr. Frank Davis','Dr. Helen Davis','pen_contact_3@college.edu','2022-06-30','','No','No','change 2'),(5,'Division 4','Political Science','Dr. Jane Lee','Dr. Helen Brown','Dr. Frank Smith','pen_contact_4@college.edu','2021-06-30','','No','No','hey'),(6,'Division 7','Psychology','Dr. Helen Davis','Dr. Carol Smith','Dr. Grace Johnson','pen_contact_5@college.edu','2020-06-30','','No','No','change'),(7,'English','English','Ian Sherman','Jamie Fitzgerald','Jake Frye','pen_contact_6@college.edu','2019-06-30','','No','No',''),(8,'Science','Anatomy and Physiology','Katy Shaw and Danny Najera','Miebeth Bustillo-Booth','Nicole Feider','pen_contact_7@college.edu','2018-06-30','','No','No',''),(9,'Division 4','Biology/Environmental Science','Dr. Carol Lee','Dr. David Lee','Dr. Alice Smith','pen_contact_8@college.edu','2017-06-30','','No','No',''),(10,'Division 6','Geology/Oceanography','Dr. Bob Brown','Dr. Emily Johnson','Dr. Jane Lee','pen_contact_9@college.edu','2016-06-30','','No','No',''),(11,'Business, Law, and Education','Accounting','Lea Ann Simpson','Lea Ann Simpson','Jane Swenson','pen_contact_10@college.edu','2015-06-30','','No','No',''),(12,'Division 8','Business Management','Dr. Helen Lee','Dr. Alice Davis','Dr. Emily Brown','pen_contact_11@college.edu','2014-06-30','','No','No',''),(13,'Division 7','Business Marketing/Entrepreneu','Dr. Grace Johnson','Dr. David Davis','Dr. Jane Lee','pen_contact_12@college.edu','2013-06-30','','No','No',''),(14,'Technology','Aviation','Michael Wood','Lea Ann Simpson','Josh Archer','pen_contact_13@college.edu','2012-06-30','','No','No',''),(15,'Division 7','CAD Design and Engineering Tec','Dr. Carol Davis','Dr. Emily Davis','Dr. Grace Smith','pen_contact_14@college.edu','2011-06-30','','No','No',''),(16,'Division 8','Natural Resources','Dr. Bob Johnson','Dr. Alice Brown','Dr. Frank Davis','pen_contact_15@college.edu','2010-06-30','','No','No',''),(17,'Health Science','Practical Nursing','Leslie Kessler','Lionel Candido Flores','Thom Jackson','pen_contact_16@college.edu','2009-06-30','','No','No',''),(18,'Division 3','Physical Therapist Assistant','Dr. Alice Smith','Dr. Helen Brown','Dr. Helen Davis','pen_contact_17@college.edu','2008-06-30','','No','No',''),(19,'Trades','Automotive Technology','David Lewis','Lea Ann Simpson','Ben Orr','pen_contact_18@college.edu','2007-06-30','','No','No',''),(20,'Division 2','Manufacturing','Dr. Ian Davis','Dr. Frank Johnson','Dr. Bob Johnson','pen_contact_19@college.edu','2006-06-30','','No','No',''),(21,'Transitional Studies','Health and Physical Education','Dr. Grace Lee','Lionel Candido Flores','Thom Jackson','pen_contact_20@college.edu','2005-06-30','','No','No',''),(22,'Fine Arts','Music','Paul Metevier','Christie Gilliland','Monica Bowen','pen_contact_21@college.edu','2004-06-30','','No','No',''),(23,'Humanities','Communication Studies','Katie Cunnion','Jamie Fitzgerald','Lisa Luengo','pen_contact_22@college.edu','2003-06-30','','No','No',''),(24,'Social Science','Anthropology','Mark Thomason','Christie Gilliland','Joy Crawford','pen_contact_23@college.edu','2002-06-30','','No','No',''),(25,'Division 4','History','Dr. Jane Davis','Dr. Frank Smith','Dr. Frank Davis','pen_contact_24@college.edu','2001-06-30','','No','No',''),(26,'Division 8','Political Science','Dr. Ian Brown','Dr. Jane Johnson','Dr. Bob Davis','pen_contact_25@college.edu','2000-06-30','','No','No',''),(27,'Division 5','Psychology','Dr. Alice Brown','Dr. Grace Smith','Dr. Alice Davis','pen_contact_26@college.edu','1999-06-30','','No','No',''),(28,'English','English','Ian Sherman','Jamie Fitzgerald','Jake Frye','pen_contact_27@college.edu','1998-06-30','','No','No',''),(29,'Science','Anatomy and Physiology','Katy Shaw and Danny Najera','Miebeth Bustillo-Booth','Nicole Feider','pen_contact_28@college.edu','1997-06-30','','No','No',''),(30,'Division 7','Biology/Environmental Science','Dr. Frank Brown','Dr. Jane Lee','Dr. Emily Lee','pen_contact_29@college.edu','1996-06-30','','No','No',''),(31,'Division 1','Geology/Oceanography','Dr. Helen Brown','Dr. Ian Lee','Dr. Ian Davis','pen_contact_30@college.edu','1995-06-30','','No','No',''),(32,'Business, Law, and Education','Accounting','Lea Ann Simpson','Lea Ann Simpson','Jane Swenson','pen_contact_31@college.edu','1994-06-30','','No','No',''),(33,'Division 5','Business Management','Dr. David Davis','Dr. David Johnson','Dr. Emily Davis','pen_contact_32@college.edu','1993-06-30','','No','No',''),(34,'Division 2','Business Marketing/Entrepreneu','Dr. David Lee','Dr. Frank Johnson','Dr. Grace Brown','pen_contact_33@college.edu','1992-06-30','','No','No',''),(35,'Technology','Aviation','Michael Wood','Lea Ann Simpson','Josh Archer','pen_contact_34@college.edu','1991-06-30','','No','No',''),(36,'Division 1','CAD Design and Engineering Tec','Dr. Jane Smith','Dr. Frank Brown','Dr. Carol Brown','pen_contact_35@college.edu','1990-06-30','','No','No',''),(37,'Division 9','Natural Resources','Dr. Bob Smith','Dr. Ian Smith','Dr. Helen Johnson','pen_contact_36@college.edu','1989-06-30','','No','No',''),(38,'Health Science','Practical Nursing','Leslie Kessler','Lionel Candido Flores','Thom Jackson','pen_contact_37@college.edu','1988-06-30','','No','No',''),(39,'Division 10','Physical Therapist Assistant','Dr. Grace Johnson','Dr. Helen Smith','Dr. Alice Smith','pen_contact_38@college.edu','1987-06-30','','No','No',''),(40,'Trades','Automotive Technology','David Lewis','Lea Ann Simpson','Ben Orr','pen_contact_39@college.edu','1986-06-30','','No','No',''),(41,'Division 2','Manufacturing','Dr. Bob Brown','Dr. Bob Davis','Dr. Bob Johnson','pen_contact_40@college.edu','1985-06-30','','No','No',''),(42,'Transitional Studies','Health and Physical Education','Dr. Alice Smith','Lionel Candido Flores','Thom Jackson','pen_contact_41@college.edu','1984-06-30','','No','No',''),(43,'Fine Arts','Music','Paul Metevier','Christie Gilliland','Monica Bowen','pen_contact_42@college.edu','1983-06-30','','No','No',''),(44,'Humanities','Communication Studies','Katie Cunnion','Jamie Fitzgerald','Lisa Luengo','pen_contact_43@college.edu','1982-06-30','','No','No',''),(45,'Social Science','Anthropology','Mark Thomason','Christie Gilliland','Joy Crawford','pen_contact_44@college.edu','1981-06-30','','No','No',''),(46,'Division 6','History','Dr. Jane Smith','Dr. Emily Lee','Dr. Jane Lee','pen_contact_45@college.edu','1980-06-30','','No','No',''),(47,'Division 9','Political Science','Dr. Jane Brown','Dr. Helen Smith','Dr. Frank Lee','pen_contact_46@college.edu','1979-06-30','','No','No',''),(48,'Division 10','Psychology','Dr. Alice Brown','Dr. Bob Lee','Dr. Bob Davis','pen_contact_47@college.edu','1978-06-30','','No','No',''),(49,'English','English','Ian Sherman','Jamie Fitzgerald','Jake Frye','pen_contact_48@college.edu','1977-06-30','','No','No',''),(50,'Science','Anatomy and Physiology','Katy Shaw and Danny Najera','Miebeth Bustillo-Booth','Nicole Feider','pen_contact_49@college.edu','1976-06-30','','No','No','');
/*!40000 ALTER TABLE `divisiondata` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `edit_history`
--

DROP TABLE IF EXISTS `edit_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `edit_history` (
  `id` int NOT NULL AUTO_INCREMENT,
  `division` varchar(255) DEFAULT NULL,
  `summary` varchar(255) DEFAULT NULL,
  `details` text,
  `timestamp` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `edit_history`
--

LOCK TABLES `edit_history` WRITE;
/*!40000 ALTER TABLE `edit_history` DISABLE KEYS */;
INSERT INTO `edit_history` VALUES (1,'Division 7','Division 7 (Psychology) updated','{\"changes\":{\"payees\":{\"from\":\"me\",\"to\":\"\"},\"notes\":{\"from\":\"this is another change 2356\",\"to\":\"change\"}},\"newValues\":{\"division\":\"Division 7\",\"academicProgram\":\"Psychology\",\"payees\":\"\",\"hasBeenPaid\":\"No\",\"reportSubmitted\":\"No\",\"notes\":\"change\"}}','2025-11-18 04:54:55');
/*!40000 ALTER TABLE `edit_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `program_reviews`
--

DROP TABLE IF EXISTS `program_reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `program_reviews` (
  `id` int NOT NULL AUTO_INCREMENT,
  `program_id` int NOT NULL,
  `review_year` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_program_year` (`program_id`,`review_year`),
  KEY `idx_program_id` (`program_id`),
  KEY `idx_review_year` (`review_year`)
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `program_reviews`
--

LOCK TABLES `program_reviews` WRITE;
/*!40000 ALTER TABLE `program_reviews` DISABLE KEYS */;
INSERT INTO `program_reviews` VALUES (50,1,2032),(49,2,2031),(48,3,2030),(47,4,2029),(46,5,2028),(45,6,2027),(44,7,2026),(43,8,2025),(42,9,2024),(41,10,2023),(40,11,2022),(64,11,2026),(39,12,2021),(38,13,2020),(37,14,2019),(36,15,2018),(35,16,2017),(34,17,2016),(33,18,2015),(32,19,2014),(31,20,2013),(30,21,2012),(29,22,2011),(28,23,2010),(27,24,2009),(26,25,2008),(25,26,2007),(24,27,2006),(23,28,2005),(22,29,2004),(21,30,2003),(20,31,2002),(19,32,2001),(18,33,2000),(17,34,1999),(16,35,1998),(15,36,1997),(14,37,1996),(13,38,1995),(12,39,1994),(11,40,1993),(10,41,1992),(9,42,1991),(8,43,1990),(7,44,1989),(6,45,1988),(5,46,1987),(4,47,1986),(3,48,1985),(2,49,1984),(1,50,1983);
/*!40000 ALTER TABLE `program_reviews` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-11-30  3:30:14


USE loc_db;
INSERT INTO divisiondata (division, academic_program, division_chair, dean, loc_rep, pen_contact, has_been_paid, report_submitted) VALUES ('Social Science', 'History', 'Mark Thomason', 'Christie Gilliland', 'Joy Crawford', 'Liz Peterson', 'No', 'No');
INSERT INTO divisiondata (division, academic_program, division_chair, dean, loc_rep, pen_contact, has_been_paid, report_submitted) VALUES ('Social Science', 'Political Science', 'Mark Thomason', 'Christie Gilliland', 'Joy Crawford', 'Liz Peterson', 'No', 'No');
INSERT INTO divisiondata (division, academic_program, division_chair, dean, loc_rep, pen_contact, has_been_paid, report_submitted) VALUES ('Social Science', 'Psychology', 'Mark Thomason', 'Christie Gilliland', 'Joy Crawford', 'Liz Peterson', 'No', 'No');
INSERT INTO divisiondata (division, academic_program, division_chair, dean, loc_rep, pen_contact, has_been_paid, report_submitted) VALUES ('Science', 'Biology/Environmental Science', 'Katy Shaw and Danny Najera', 'Christie Gilliland', 'Joy Crawford', 'Liz Peterson', 'No', 'No');
INSERT INTO divisiondata (division, academic_program, division_chair, dean, loc_rep, pen_contact, has_been_paid, report_submitted) VALUES ('Science', 'Geology/Oceanography', 'Katy Shaw and Danny Najera', 'Christie Gilliland', 'Joy Crawford', 'Liz Peterson', 'No', 'No');
INSERT INTO divisiondata (division, academic_program, division_chair, dean, loc_rep, pen_contact, has_been_paid, report_submitted) VALUES ('Business, Law, and Education', 'Business Management', 'Lea Ann Simpson', 'Christie Gilliland', 'Joy Crawford', 'Liz Peterson', 'No', 'No');
INSERT INTO divisiondata (division, academic_program, division_chair, dean, loc_rep, pen_contact, has_been_paid, report_submitted) VALUES ('Business, Law, and Education', 'Business Marketing/Entrepreneurship ', 'Lea Ann Simpson', 'Christie Gilliland', 'Joy Crawford', 'Liz Peterson', 'No', 'No');
INSERT INTO divisiondata (division, academic_program, division_chair, dean, loc_rep, pen_contact, has_been_paid, report_submitted) VALUES ('Technology', 'CAD Design and Engineering Tech.', 'Michael Wood', 'Christie Gilliland', 'Joy Crawford', 'Liz Peterson', 'No', 'No');
INSERT INTO divisiondata (division, academic_program, division_chair, dean, loc_rep, pen_contact, has_been_paid, report_submitted) VALUES ('Technology', 'Natural Resources', 'Michael Wood', 'Christie Gilliland', 'Joy Crawford', 'Liz Peterson', 'No', 'No');
INSERT INTO divisiondata (division, academic_program, division_chair, dean, loc_rep, pen_contact, has_been_paid, report_submitted) VALUES ('Health Science', 'Practical Nursing', 'Leslie Kessler', 'Christie Gilliland', 'Joy Crawford', 'Liz Peterson', 'No', 'No');
INSERT INTO divisiondata (division, academic_program, division_chair, dean, loc_rep, pen_contact, has_been_paid, report_submitted) VALUES ('Health Science', 'Physical Therapist Assistant', 'Leslie Kessler', 'Christie Gilliland', 'Joy Crawford', 'Liz Peterson', 'No', 'No');
INSERT INTO divisiondata (division, academic_program, division_chair, dean, loc_rep, pen_contact, has_been_paid, report_submitted) VALUES ('Trades', 'Manufacturing', 'David Lewis', 'Christie Gilliland', 'Joy Crawford', 'Liz Peterson', 'No', 'No');