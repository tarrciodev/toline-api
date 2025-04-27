/*
  Warnings:

  - You are about to drop the column `bank_account` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `identification` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "toliners" ADD COLUMN     "bank_account" JSONB,
ADD COLUMN     "identification" JSONB;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "bank_account",
DROP COLUMN "identification";
