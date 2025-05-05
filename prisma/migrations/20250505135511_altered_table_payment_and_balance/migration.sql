/*
  Warnings:

  - You are about to drop the column `updated_at` on the `Balance` table. All the data in the column will be lost.
  - You are about to drop the column `verified_from_system` on the `payments` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Balance` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Balance" DROP COLUMN "updated_at",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "payments" DROP COLUMN "verified_from_system",
ADD COLUMN     "isVerified" BOOLEAN NOT NULL DEFAULT false;
