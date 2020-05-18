-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema world_bank_data
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema world_bank_data
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `world_bank_data` DEFAULT CHARACTER SET utf8 ;
USE `world_bank_data` ;

-- -----------------------------------------------------
-- Table `world_bank_data`.`data`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `world_bank_data`.`data` (
  `country_code` VARCHAR(3) NOT NULL,
  `AG.LND.FRST.ZS` FLOAT NULL,
  `SH.XPD.CHEX.GD.ZS` FLOAT NULL,
  `EG.ELC.ACCS.ZS` FLOAT NULL,
  `SE.PRM.UNER.MA.ZS` FLOAT NULL,
  `SE.PRM.UNER.FE.ZS` FLOAT NULL,
  `TM.VAL.FUEL.ZS.UN` FLOAT NULL,
  `TX.VAL.FUEL.ZS.UN` FLOAT NULL,
  `MS.MIL.XPND.GD.ZS` FLOAT NULL,
  `IP.JRN.ARTC.SC` FLOAT NULL,
  `SL.UEM.1524.MA.NE.ZS` FLOAT NULL,
  `SL.UEM.1524.FE.NE.ZS` FLOAT NULL,
  `ST.INT.ARVL` INT NULL,
  `year` INT NOT NULL,
  `id` INT NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
