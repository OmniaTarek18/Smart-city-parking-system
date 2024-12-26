-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema smartParking
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema smartParking
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `smartParking` DEFAULT CHARACTER SET utf8 ;
USE `smartParking` ;

-- -----------------------------------------------------
-- Table `smartParking`.`User`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `smartParking`.`User` (
  `id` INT NOT NULL,
  `email` VARCHAR(45) NULL,
  `password` VARCHAR(45) NULL,
  `role` ENUM('SystemAdmin', 'LotManager', 'Driver') NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `smartParking`.`LotManager`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `smartParking`.`LotManager` (
  `id` INT NOT NULL,
  `User_id` INT NOT NULL,
  `name` VARCHAR(45) NULL,
  `phone_number` VARCHAR(45) NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_LotManager_User1_idx` (`User_id` ASC) VISIBLE,
  CONSTRAINT `fk_LotManager_User1`
    FOREIGN KEY (`User_id`)
    REFERENCES `smartParking`.`User` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `smartParking`.`Driver`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `smartParking`.`Driver` (
  `id` INT NOT NULL,
  `User_id` INT NOT NULL,
  `name` VARCHAR(45) NULL,
  `phone_number` VARCHAR(45) NULL,
  `license_plate_number` VARCHAR(45) NULL,
  `card_no` VARCHAR(45) NULL,
  `cvv` VARCHAR(45) NULL,
  `card_expiry_date` DATE NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `licensePlateNumber_UNIQUE` (`license_plate_number` ASC) VISIBLE,
  INDEX `fk_Driver_User1_idx` (`User_id` ASC) VISIBLE,
  CONSTRAINT `fk_Driver_User1`
    FOREIGN KEY (`User_id`)
    REFERENCES `smartParking`.`User` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `smartParking`.`ParkingLot`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `smartParking`.`ParkingLot` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NULL,
  `location` VARCHAR(45) NULL,
  `capacity` INT ZEROFILL NULL,
  `owner_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_ParkingLot_LotManager_idx` (`owner_id` ASC) VISIBLE,
  CONSTRAINT `fk_ParkingLot_LotManager`
    FOREIGN KEY (`owner_id`)
    REFERENCES `smartParking`.`LotManager` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `smartParking`.`ParkingSpot`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `smartParking`.`ParkingSpot` (
  `id` INT NOT NULL,
  `ParkingLot_id` INT NOT NULL,
  `type` ENUM('REGULAR', 'HANDICAP', 'EV') NULL,
  `status` ENUM('AVAILABLE', 'RESERVED', 'OCCUPIED') NULL,
  PRIMARY KEY (`id`, `ParkingLot_id`),
  INDEX `fk_ParkingSpot_ParkingLot1_idx` (`ParkingLot_id` ASC) VISIBLE,
  CONSTRAINT `fk_ParkingSpot_ParkingLot1`
    FOREIGN KEY (`ParkingLot_id`)
    REFERENCES `smartParking`.`ParkingLot` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `smartParking`.`Reservation`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `smartParking`.`Reservation` (
  `id` INT NOT NULL,
  `Driver_id` INT NOT NULL,
  `ParkingSpot_id` INT NOT NULL,
  `ParkingLot_id` INT NOT NULL,
  `duration` TIME NULL,
  `start_time` DATETIME NULL,
  `status` ENUM('PENDING', 'COMPLETED', 'CANCELLED', 'ACTIVE', 'EXPIRED') NULL,
  `price` DOUBLE NULL,
  PRIMARY KEY (`id`, `Driver_id`, `ParkingSpot_id`, `ParkingLot_id`),
  INDEX `fk_Reservation_ParkingSpot1_idx` (`ParkingSpot_id` ASC, `ParkingLot_id` ASC) VISIBLE,
  INDEX `fk_Reservation_Driver1_idx` (`Driver_id` ASC) VISIBLE,
  CONSTRAINT `fk_Reservation_ParkingSpot1`
    FOREIGN KEY (`ParkingSpot_id` , `ParkingLot_id`)
    REFERENCES `smartParking`.`ParkingSpot` (`id` , `ParkingLot_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Reservation_Driver1`
    FOREIGN KEY (`Driver_id`)
    REFERENCES `smartParking`.`Driver` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `smartParking`.`ReservationRules`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `smartParking`.`ReservationRules` (
  `LotManager_id` INT NOT NULL,
  `time_limit` TIME NULL,
  PRIMARY KEY (`LotManager_id`),
  INDEX `fk_ReservationRules_LotManager1_idx` (`LotManager_id` ASC) VISIBLE,
  CONSTRAINT `fk_ReservationRules_LotManager1`
    FOREIGN KEY (`LotManager_id`)
    REFERENCES `smartParking`.`LotManager` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `smartParking`.`PenalityRules`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `smartParking`.`PenalityRules` (
  `penality_type` ENUM('OVERSTAY', 'CANCELATION', 'NOSHOWUP') NOT NULL,
  `LotManager_id` INT NOT NULL,
  `cost` DOUBLE NULL,
  `time` TIME NULL,
  PRIMARY KEY (`penality_type`, `LotManager_id`),
  INDEX `fk_table1_ReservationRules1_idx` (`LotManager_id` ASC) VISIBLE,
  CONSTRAINT `fk_table1_ReservationRules1`
    FOREIGN KEY (`LotManager_id`)
    REFERENCES `smartParking`.`ReservationRules` (`LotManager_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `smartParking`.`PricingStrategy`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `smartParking`.`PricingStrategy` (
  `spot_type` ENUM('REGULAR', 'HANDICAP', 'EV') NOT NULL,
  `ParkingLot_id` INT NOT NULL,
  `cost` DOUBLE NULL,
  `congestion_added_percent` DOUBLE NULL,
  PRIMARY KEY (`spot_type`, `ParkingLot_id`),
  CONSTRAINT `fk_PricingStrategy_ParkingLot1`
    FOREIGN KEY (`ParkingLot_id`)
    REFERENCES `smartParking`.`ParkingLot` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `smartParking`.`FaultySpots`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `smartParking`.`FaultySpots` (
  `id` INT NOT NULL,
  `ParkingSpot_id` INT NOT NULL,
  `ParkingLot_id` INT NOT NULL,
  `Driver_id` INT NOT NULL,
  `reason` ENUM('EQUIPMENT_FAILURE', 'SENSOR_FAILURE', 'CRACKED_SURFACE', 'FADED_MARKINGS') NULL,
  `time` TIME NULL,
  PRIMARY KEY (`id`, `ParkingSpot_id`, `ParkingLot_id`, `Driver_id`),
  INDEX `fk_FaultySpots_Driver1_idx` (`Driver_id` ASC) VISIBLE,
  CONSTRAINT `fk_FaultySpots_ParkingSpot1`
    FOREIGN KEY (`ParkingSpot_id` , `ParkingLot_id`)
    REFERENCES `smartParking`.`ParkingSpot` (`id` , `ParkingLot_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_FaultySpots_Driver1`
    FOREIGN KEY (`Driver_id`)
    REFERENCES `smartParking`.`Driver` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `smartParking`.`Violation`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `smartParking`.`Violation` (
  `id` INT NOT NULL,
  `Driver_id` INT NOT NULL,
  `penality_type` ENUM('OVERSTAY', 'CANCELATION', 'NOSHOWUP') NOT NULL,
  `LotManager_id` INT NOT NULL,
  `date_violated` DATETIME NULL,
  PRIMARY KEY (`id`, `Driver_id`, `penality_type`, `LotManager_id`),
  INDEX `fk_Violation_PenalityRules1_idx` (`penality_type` ASC, `LotManager_id` ASC) VISIBLE,
  INDEX `fk_Violation_Driver1_idx` (`Driver_id` ASC) VISIBLE,
  CONSTRAINT `fk_Violation_PenalityRules1`
    FOREIGN KEY (`penality_type` , `LotManager_id`)
    REFERENCES `smartParking`.`PenalityRules` (`penality_type` , `LotManager_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Violation_Driver1`
    FOREIGN KEY (`Driver_id`)
    REFERENCES `smartParking`.`Driver` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `smartParking`.`Report`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `smartParking`.`Report` (
  `id` INT NOT NULL,
  `ParkingLot_id` INT NOT NULL,
  `total_revenue` DOUBLE NULL,
  `penality_income` DOUBLE NULL,
  `num_of_violations` INT NULL,
  `occupancy` DOUBLE NULL,
  `date_generated` DATETIME NULL,
  PRIMARY KEY (`id`, `ParkingLot_id`),
  INDEX `fk_Report_ParkingLot1_idx` (`ParkingLot_id` ASC) VISIBLE,
  CONSTRAINT `fk_Report_ParkingLot1`
    FOREIGN KEY (`ParkingLot_id`)
    REFERENCES `smartParking`.`ParkingLot` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
