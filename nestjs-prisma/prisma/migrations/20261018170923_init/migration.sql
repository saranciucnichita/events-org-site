-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `role` VARCHAR(191) NULL,
    `password` VARCHAR(191) NOT NULL,
    `locationId` INTEGER NULL,

    UNIQUE INDEX `user_username_key`(`username`),
    UNIQUE INDEX `user_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `location` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,

    UNIQUE INDEX `location_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `user_locationId_fkey` FOREIGN KEY (`locationId`) REFERENCES `location`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- Insert
INSERT INTO `location` (`name`) VALUES ('mun. Chișinău');
INSERT INTO `location` (`name`) VALUES ('mun. Bălți');
INSERT INTO `location` (`name`) VALUES ('mun. Comrat');
INSERT INTO `location` (`name`) VALUES ('reg. Nord');
INSERT INTO `location` (`name`) VALUES ('reg. Centru');
INSERT INTO `location` (`name`) VALUES ('reg. Sud');
INSERT INTO `location` (`name`) VALUES ('UTA Găgăuzia');
