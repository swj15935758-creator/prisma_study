-- CreateTable
CREATE TABLE `tbl_post` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `postTitle` VARCHAR(191) NOT NULL,
    `postContnet` VARCHAR(191) NOT NULL,
    `postStatus` VARCHAR(191) NOT NULL,
    `postCreateAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
