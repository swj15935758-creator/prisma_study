-- CreateTable
CREATE TABLE `tbl_member` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `memberEmail` VARCHAR(191) NOT NULL,
    `memberPassword` VARCHAR(191) NOT NULL,
    `memberName` VARCHAR(191) NOT NULL,
    `memberAge` INTEGER NULL,
    `memberCreateAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `tbl_member_memberEmail_key`(`memberEmail`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_post` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `postTitle` VARCHAR(191) NOT NULL,
    `postContent` VARCHAR(191) NOT NULL,
    `postStatus` VARCHAR(191) NOT NULL DEFAULT 'PUBLIC',
    `postCreateAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `memberId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tbl_post` ADD CONSTRAINT `tbl_post_memberId_fkey` FOREIGN KEY (`memberId`) REFERENCES `tbl_member`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
