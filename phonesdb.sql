/*
SQLyog Ultimate v8.55 
MySQL - 5.5.5-10.5.4-MariaDB : Database - phonesdb
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`phonesdb` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci */;

USE `phonesdb`;

/*Table structure for table `__efmigrationshistory` */

DROP TABLE IF EXISTS `__efmigrationshistory`;

CREATE TABLE `__efmigrationshistory` (
  `MigrationId` varchar(95) COLLATE utf8_unicode_ci NOT NULL,
  `ProductVersion` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`MigrationId`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Table structure for table `aspnetroleclaims` */

DROP TABLE IF EXISTS `aspnetroleclaims`;

CREATE TABLE `aspnetroleclaims` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `RoleId` varchar(100) CHARACTER SET utf8mb4 NOT NULL,
  `ClaimType` varchar(100) CHARACTER SET utf8mb4 DEFAULT NULL,
  `ClaimValue` varchar(100) CHARACTER SET utf8mb4 DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `FK_AspNetRoleClaims_AspNetRoles_RoleId` (`RoleId`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Table structure for table `aspnetroles` */

DROP TABLE IF EXISTS `aspnetroles`;

CREATE TABLE `aspnetroles` (
  `Id` varchar(100) CHARACTER SET utf8mb4 NOT NULL,
  `Name` varchar(100) CHARACTER SET utf8mb4 DEFAULT NULL,
  `NormalizedName` varchar(100) CHARACTER SET utf8mb4 DEFAULT NULL,
  `ConcurrencyStamp` varchar(100) CHARACTER SET utf8mb4 DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Table structure for table `aspnetuserclaims` */

DROP TABLE IF EXISTS `aspnetuserclaims`;

CREATE TABLE `aspnetuserclaims` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `UserId` varchar(100) CHARACTER SET utf8mb4 NOT NULL,
  `ClaimType` varchar(100) CHARACTER SET utf8mb4 DEFAULT NULL,
  `ClaimValue` varchar(100) CHARACTER SET utf8mb4 DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `FK_AspNetUserClaims_AspNetUsers_UserId` (`UserId`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Table structure for table `aspnetuserlogins` */

DROP TABLE IF EXISTS `aspnetuserlogins`;

CREATE TABLE `aspnetuserlogins` (
  `LoginProvider` varchar(100) CHARACTER SET utf8mb4 NOT NULL,
  `ProviderKey` varchar(100) CHARACTER SET utf8mb4 NOT NULL,
  `ProviderDisplayName` varchar(100) CHARACTER SET utf8mb4 DEFAULT NULL,
  `UserId` varchar(100) CHARACTER SET utf8mb4 NOT NULL,
  PRIMARY KEY (`LoginProvider`,`ProviderKey`),
  KEY `FK_AspNetUserLogins_AspNetUsers_UserId` (`UserId`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Table structure for table `aspnetuserroles` */

DROP TABLE IF EXISTS `aspnetuserroles`;

CREATE TABLE `aspnetuserroles` (
  `UserId` varchar(100) CHARACTER SET utf8mb4 NOT NULL,
  `RoleId` varchar(100) CHARACTER SET utf8mb4 NOT NULL,
  PRIMARY KEY (`UserId`,`RoleId`),
  KEY `FK_AspNetUserRoles_AspNetRoles_RoleId` (`RoleId`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Table structure for table `aspnetusers` */

DROP TABLE IF EXISTS `aspnetusers`;

CREATE TABLE `aspnetusers` (
  `Id` varchar(100) CHARACTER SET utf8mb4 NOT NULL,
  `DisplayName` varchar(100) CHARACTER SET utf8mb4 DEFAULT NULL,
  `Bio` varchar(100) CHARACTER SET utf8mb4 DEFAULT NULL,
  `UserName` varchar(100) CHARACTER SET utf8mb4 DEFAULT NULL,
  `NormalizedUserName` varchar(100) CHARACTER SET utf8mb4 DEFAULT NULL,
  `Email` varchar(100) CHARACTER SET utf8mb4 DEFAULT NULL,
  `NormalizedEmail` varchar(100) CHARACTER SET utf8mb4 DEFAULT NULL,
  `EmailConfirmed` tinyint(1) NOT NULL,
  `PasswordHash` varchar(100) CHARACTER SET utf8mb4 DEFAULT NULL,
  `SecurityStamp` varchar(100) CHARACTER SET utf8mb4 DEFAULT NULL,
  `ConcurrencyStamp` varchar(100) CHARACTER SET utf8mb4 DEFAULT NULL,
  `PhoneNumber` varchar(100) CHARACTER SET utf8mb4 DEFAULT NULL,
  `PhoneNumberConfirmed` tinyint(1) NOT NULL,
  `TwoFactorEnabled` tinyint(1) NOT NULL,
  `LockoutEnd` datetime(6) DEFAULT NULL,
  `LockoutEnabled` tinyint(1) NOT NULL,
  `AccessFailedCount` int(11) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Table structure for table `bases` */

DROP TABLE IF EXISTS `bases`;

CREATE TABLE `bases` (
  `BaseID` int(11) NOT NULL AUTO_INCREMENT,
  `fullName` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `shortName` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ImageName` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`BaseID`)
) ENGINE=MyISAM AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Table structure for table `corps` */

DROP TABLE IF EXISTS `corps`;

CREATE TABLE `corps` (
  `CorpsId` int(11) NOT NULL AUTO_INCREMENT,
  `fullName` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `shortName` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ImageName` longtext CHARACTER SET utf8mb4 DEFAULT NULL,
  `BaseID` int(11) NOT NULL,
  PRIMARY KEY (`CorpsId`),
  KEY `IX_Corps_BaseID` (`BaseID`)
) ENGINE=MyISAM AUTO_INCREMENT=56 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Table structure for table `documents` */

DROP TABLE IF EXISTS `documents`;

CREATE TABLE `documents` (
  `DocumentId` int(11) NOT NULL AUTO_INCREMENT,
  `fullName` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Contenu` text COLLATE utf8_unicode_ci DEFAULT NULL,
  `ImageName` longtext CHARACTER SET utf8mb4 DEFAULT NULL,
  PRIMARY KEY (`DocumentId`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Table structure for table `services` */

DROP TABLE IF EXISTS `services`;

CREATE TABLE `services` (
  `ServiceId` int(11) NOT NULL AUTO_INCREMENT,
  `fullName` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `shortName` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Tel` bigint(20) NOT NULL,
  `CorpsId` int(11) NOT NULL,
  PRIMARY KEY (`ServiceId`),
  KEY `IX_Services_CorpsId` (`CorpsId`)
) ENGINE=MyISAM AUTO_INCREMENT=302 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
