/*
  Warnings:

  - You are about to drop the column `token` on the `verification_code` table. All the data in the column will be lost.
  - Added the required column `code` to the `verification_code` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "verification_code" DROP COLUMN "token",
ADD COLUMN     "code" TEXT NOT NULL;
