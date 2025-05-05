/*
  Warnings:

  - You are about to drop the column `userId` on the `Balance` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[tolinerId]` on the table `Balance` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `invoice` to the `Balance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tolinerId` to the `Balance` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Balance" DROP CONSTRAINT "Balance_userId_fkey";

-- DropIndex
DROP INDEX "Balance_userId_key";

-- AlterTable
ALTER TABLE "Balance" DROP COLUMN "userId",
ADD COLUMN     "invoice" TEXT NOT NULL,
ADD COLUMN     "isVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "tolinerId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Balance_tolinerId_key" ON "Balance"("tolinerId");

-- AddForeignKey
ALTER TABLE "Balance" ADD CONSTRAINT "Balance_tolinerId_fkey" FOREIGN KEY ("tolinerId") REFERENCES "toliners"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
