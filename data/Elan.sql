-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema Elan
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema Elan
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `Elan` DEFAULT CHARACTER SET utf8 ;
USE `Elan` ;

-- -----------------------------------------------------
-- Table `Elan`.`Account`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Elan`.`Account` (
  `id_Compte` INT NOT NULL AUTO_INCREMENT,
  `account_name` VARCHAR(100) NOT NULL,
  `Login` VARCHAR(255) NULL DEFAULT NULL,
  `Password` VARCHAR(32) NOT NULL,
  PRIMARY KEY (`id_Compte`))
ENGINE = InnoDB
AUTO_INCREMENT = 8
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `Elan`.`Health_insurance`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Elan`.`Health_insurance` (
  `id_insurance` INT NOT NULL AUTO_INCREMENT,
  `insurance_name` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`id_insurance`))
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `Elan`.`Insured`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Elan`.`Insured` (
  `id_Insured` INT NOT NULL AUTO_INCREMENT,
  `lastname` VARCHAR(50) NOT NULL,
  `firstname` VARCHAR(70) NULL DEFAULT NULL,
  `social_security_num` VARCHAR(100) NULL DEFAULT NULL,
  `email` VARCHAR(255) NULL DEFAULT NULL,
  `tel` VARCHAR(45) NULL DEFAULT NULL,
  `Password` VARCHAR(32) NOT NULL,
  `birth_date` DATE NULL DEFAULT NULL,
  `color` VARCHAR(45) NULL,
  `Account_id_Compte` INT NOT NULL,
  PRIMARY KEY (`id_Insured`, `Account_id_Compte`),
  INDEX `fk_Insured_Account1_idx` (`Account_id_Compte` ASC) VISIBLE,
  CONSTRAINT `fk_Insured_Account1`
    FOREIGN KEY (`Account_id_Compte`)
    REFERENCES `Elan`.`Account` (`id_Compte`))
ENGINE = InnoDB
AUTO_INCREMENT = 6
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `Elan`.`Pros`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Elan`.`Pros` (
  `pro_id` INT NOT NULL AUTO_INCREMENT,
  `pro_name` VARCHAR(75) NOT NULL,
  PRIMARY KEY (`pro_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 7
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `Elan`.`Specialities`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Elan`.`Specialities` (
  `id_speciality` INT NOT NULL AUTO_INCREMENT,
  `speciality_name` VARCHAR(75) NOT NULL,
  PRIMARY KEY (`id_speciality`))
ENGINE = InnoDB
AUTO_INCREMENT = 7
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `Elan`.`Medical_events`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Elan`.`Medical_events` (
  `id_med_event` INT NOT NULL AUTO_INCREMENT,
  `Date_Event` DATE NOT NULL,
  `amount_Event` FLOAT NULL DEFAULT NULL,
  `secu_status` VARCHAR(45) NULL DEFAULT NULL,
  `insurance_status` VARCHAR(45) NULL DEFAULT NULL,
  `Specialities_id_speciality` INT NOT NULL,
  `Insured_id_Insured` INT NOT NULL,
  `Insured_Account_id_Compte` INT NOT NULL,
  `Pros_pro_id` INT NOT NULL,
  PRIMARY KEY (`id_med_event`, `Specialities_id_speciality`, `Insured_id_Insured`, `Insured_Account_id_Compte`, `Pros_pro_id`),
  INDEX `fk_Medical_events_Specialities2_idx` (`Specialities_id_speciality` ASC) VISIBLE,
  INDEX `fk_Medical_events_Insured1_idx` (`Insured_id_Insured` ASC, `Insured_Account_id_Compte` ASC) VISIBLE,
  INDEX `fk_Medical_events_Pros2_idx` (`Pros_pro_id` ASC) VISIBLE,
  CONSTRAINT `fk_Medical_events_Insured1`
    FOREIGN KEY (`Insured_id_Insured` , `Insured_Account_id_Compte`)
    REFERENCES `Elan`.`Insured` (`id_Insured` , `Account_id_Compte`),
  CONSTRAINT `fk_Medical_events_Pros2`
    FOREIGN KEY (`Pros_pro_id`)
    REFERENCES `Elan`.`Pros` (`pro_id`),
  CONSTRAINT `fk_Medical_events_Specialities2`
    FOREIGN KEY (`Specialities_id_speciality`)
    REFERENCES `Elan`.`Specialities` (`id_speciality`))
ENGINE = InnoDB
AUTO_INCREMENT = 16
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `Elan`.`Notifications`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Elan`.`Notifications` (
  `id_Notification` INT NOT NULL AUTO_INCREMENT,
  `type` VARCHAR(45) NOT NULL,
  `Message` TEXT NULL DEFAULT NULL,
  PRIMARY KEY (`id_Notification`))
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `Elan`.`Pros_Speciality`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Elan`.`Pros_Speciality` (
  `id_Pros_Speciality` INT NOT NULL AUTO_INCREMENT,
  `pros_pro_id` INT NOT NULL,
  `specialities_id_speciality` INT NOT NULL,
  `Status` TINYINT NOT NULL DEFAULT '0',
  PRIMARY KEY (`id_Pros_Speciality`),
  INDEX `fk_pros_has_specialities_specialities1_idx` (`specialities_id_speciality` ASC) VISIBLE,
  INDEX `fk_pros_has_specialities_pros1_idx` (`pros_pro_id` ASC) VISIBLE,
  CONSTRAINT `fk_pros_has_specialities_pros1`
    FOREIGN KEY (`pros_pro_id`)
    REFERENCES `Elan`.`Pros` (`pro_id`),
  CONSTRAINT `fk_pros_has_specialities_specialities1`
    FOREIGN KEY (`specialities_id_speciality`)
    REFERENCES `Elan`.`Specialities` (`id_speciality`))
ENGINE = InnoDB
AUTO_INCREMENT = 7
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `Elan`.`notif_insured`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Elan`.`notif_insured` (
  `id_notif_insured` INT NOT NULL AUTO_INCREMENT,
  `notifications_id_Notification` INT NOT NULL,
  `insured_id_Insured` INT NOT NULL,
  `insured_Account_id_Compte` INT NOT NULL,
  `Status` TINYINT NOT NULL DEFAULT '0',
  PRIMARY KEY (`id_notif_insured`),
  INDEX `fk_notifications_has_insured_insured1_idx` (`insured_id_Insured` ASC, `insured_Account_id_Compte` ASC) VISIBLE,
  INDEX `fk_notifications_has_insured_notifications1_idx` (`notifications_id_Notification` ASC) VISIBLE,
  CONSTRAINT `fk_notifications_has_insured_insured1`
    FOREIGN KEY (`insured_id_Insured` , `insured_Account_id_Compte`)
    REFERENCES `Elan`.`Insured` (`id_Insured` , `Account_id_Compte`),
  CONSTRAINT `fk_notifications_has_insured_notifications1`
    FOREIGN KEY (`notifications_id_Notification`)
    REFERENCES `Elan`.`Notifications` (`id_Notification`))
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `Elan`.`refund`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Elan`.`refund` (
  `id_refund` INT NOT NULL AUTO_INCREMENT,
  `Amount_Refund` FLOAT NULL DEFAULT NULL,
  `Date_Refund` DATE NULL DEFAULT NULL,
  `Health_insurance_id_Mutuelle` INT NOT NULL,
  `Medical_events_id_Actes` INT NOT NULL,
  PRIMARY KEY (`id_refund`, `Health_insurance_id_Mutuelle`, `Medical_events_id_Actes`),
  INDEX `fk_Remboursement_Health_insurance1_idx` (`Health_insurance_id_Mutuelle` ASC) VISIBLE,
  INDEX `fk_Remboursement_Medical_events1_idx` (`Medical_events_id_Actes` ASC) VISIBLE,
  CONSTRAINT `fk_Remboursement_Health_insurance1`
    FOREIGN KEY (`Health_insurance_id_Mutuelle`)
    REFERENCES `Elan`.`Health_insurance` (`id_insurance`),
  CONSTRAINT `fk_Remboursement_Medical_events1`
    FOREIGN KEY (`Medical_events_id_Actes`)
    REFERENCES `Elan`.`Medical_events` (`id_med_event`))
ENGINE = InnoDB
AUTO_INCREMENT = 31
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
