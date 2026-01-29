-- CreateTable
CREATE TABLE `tbl_post` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `postTitle` VARCHAR(191) NOT NULL,
    `postContent` VARCHAR(191) NOT NULL,
    `postStatus` VARCHAR(191) NOT NULL DEFAULT 'PUBLIC',
    `postCreateAt` DATETIME(3) NOT NULL,
    `memberId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tbl_post` ADD CONSTRAINT `tbl_post_memberId_fkey` FOREIGN KEY (`memberId`) REFERENCES `tbl_member`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
