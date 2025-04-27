/*
  Warnings:

  - You are about to drop the column `userId` on the `portifolios` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[title,tolinerId]` on the table `portifolios` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "portifolios" DROP CONSTRAINT "portifolios_userId_fkey";

-- DropIndex
DROP INDEX "portifolios_title_userId_key";

-- AlterTable
ALTER TABLE "portifolios" DROP COLUMN "userId";

-- CreateIndex
CREATE UNIQUE INDEX "portifolios_title_tolinerId_key" ON "portifolios"("title", "tolinerId");
