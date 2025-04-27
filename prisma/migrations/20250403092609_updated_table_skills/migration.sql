/*
  Warnings:

  - You are about to drop the column `tolinerId` on the `skills` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "skills" DROP CONSTRAINT "skills_userId_fkey";

-- AlterTable
ALTER TABLE "skills" DROP COLUMN "tolinerId",
ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "skills" ADD CONSTRAINT "skills_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
