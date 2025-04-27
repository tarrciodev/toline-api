/*
  Warnings:

  - You are about to drop the column `bio` on the `clientes` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "clientes" DROP COLUMN "bio";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "userId";
