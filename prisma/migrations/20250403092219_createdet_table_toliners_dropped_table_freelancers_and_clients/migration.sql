/*
  Warnings:

  - You are about to drop the column `freelancerId` on the `freelancer_evaluations` table. All the data in the column will be lost.
  - You are about to drop the column `freelancerId` on the `portifolios` table. All the data in the column will be lost.
  - You are about to drop the column `freelancerId` on the `project_subscriptions` table. All the data in the column will be lost.
  - You are about to drop the column `freelancerId` on the `projects` table. All the data in the column will be lost.
  - You are about to drop the column `bio` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `clientId` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `freelancerId` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `_CategoryToFreelancer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_FreelancerToSkill` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `certifications` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `clientes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `freelancers` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[tolinerId,evaluatorId]` on the table `freelancer_evaluations` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[title,userId]` on the table `portifolios` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[projectId,tolinerId]` on the table `project_subscriptions` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `tolinerId` to the `freelancer_evaluations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `portifolios` table without a default value. This is not possible if the table is not empty.
  - Added the required column `proposal` to the `project_subscriptions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tolinerId` to the `project_subscriptions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `freelancer_id` to the `projects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `skills` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tolinerId` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_CategoryToFreelancer" DROP CONSTRAINT "_CategoryToFreelancer_A_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToFreelancer" DROP CONSTRAINT "_CategoryToFreelancer_B_fkey";

-- DropForeignKey
ALTER TABLE "_FreelancerToSkill" DROP CONSTRAINT "_FreelancerToSkill_A_fkey";

-- DropForeignKey
ALTER TABLE "_FreelancerToSkill" DROP CONSTRAINT "_FreelancerToSkill_B_fkey";

-- DropForeignKey
ALTER TABLE "certifications" DROP CONSTRAINT "certifications_freelancerId_fkey";

-- DropForeignKey
ALTER TABLE "freelancer_evaluations" DROP CONSTRAINT "freelancer_evaluations_evaluatorId_fkey";

-- DropForeignKey
ALTER TABLE "freelancer_evaluations" DROP CONSTRAINT "freelancer_evaluations_freelancerId_fkey";

-- DropForeignKey
ALTER TABLE "portifolios" DROP CONSTRAINT "portifolios_freelancerId_fkey";

-- DropForeignKey
ALTER TABLE "project_subscriptions" DROP CONSTRAINT "project_subscriptions_freelancerId_fkey";

-- DropForeignKey
ALTER TABLE "project_subscriptions" DROP CONSTRAINT "project_subscriptions_projectId_fkey";

-- DropForeignKey
ALTER TABLE "projects" DROP CONSTRAINT "projects_freelancerId_fkey";

-- DropForeignKey
ALTER TABLE "projects" DROP CONSTRAINT "projects_owner_id_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_clientId_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_freelancerId_fkey";

-- DropIndex
DROP INDEX "freelancer_evaluations_freelancerId_evaluatorId_key";

-- DropIndex
DROP INDEX "portifolios_title_freelancerId_key";

-- DropIndex
DROP INDEX "project_subscriptions_projectId_freelancerId_key";

-- DropIndex
DROP INDEX "users_clientId_key";

-- DropIndex
DROP INDEX "users_freelancerId_key";

-- AlterTable
ALTER TABLE "freelancer_evaluations" DROP COLUMN "freelancerId",
ADD COLUMN     "tolinerId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "portifolios" DROP COLUMN "freelancerId",
ADD COLUMN     "tolinerId" TEXT,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "project_subscriptions" DROP COLUMN "freelancerId",
ADD COLUMN     "proposal" TEXT NOT NULL,
ADD COLUMN     "tolinerId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "projects" DROP COLUMN "freelancerId",
ADD COLUMN     "freelancer_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "skills" ADD COLUMN     "tolinerId" TEXT,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "bio",
DROP COLUMN "clientId",
DROP COLUMN "freelancerId",
ADD COLUMN     "clientBio" TEXT,
ADD COLUMN     "freelancerBio" TEXT,
ADD COLUMN     "tolinerId" TEXT NOT NULL;

-- DropTable
DROP TABLE "_CategoryToFreelancer";

-- DropTable
DROP TABLE "_FreelancerToSkill";

-- DropTable
DROP TABLE "certifications";

-- DropTable
DROP TABLE "clientes";

-- DropTable
DROP TABLE "freelancers";

-- CreateTable
CREATE TABLE "toliners" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "is_verified" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "toliners_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CategoryToToliner" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_CategoryToToliner_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "toliners_email_key" ON "toliners"("email");

-- CreateIndex
CREATE INDEX "_CategoryToToliner_B_index" ON "_CategoryToToliner"("B");

-- CreateIndex
CREATE UNIQUE INDEX "freelancer_evaluations_tolinerId_evaluatorId_key" ON "freelancer_evaluations"("tolinerId", "evaluatorId");

-- CreateIndex
CREATE UNIQUE INDEX "portifolios_title_userId_key" ON "portifolios"("title", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "project_subscriptions_projectId_tolinerId_key" ON "project_subscriptions"("projectId", "tolinerId");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_tolinerId_fkey" FOREIGN KEY ("tolinerId") REFERENCES "toliners"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "toliners"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_freelancer_id_fkey" FOREIGN KEY ("freelancer_id") REFERENCES "toliners"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_subscriptions" ADD CONSTRAINT "project_subscriptions_tolinerId_fkey" FOREIGN KEY ("tolinerId") REFERENCES "toliners"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_subscriptions" ADD CONSTRAINT "project_subscriptions_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "skills" ADD CONSTRAINT "skills_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "freelancer_evaluations" ADD CONSTRAINT "freelancer_evaluations_tolinerId_fkey" FOREIGN KEY ("tolinerId") REFERENCES "toliners"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "portifolios" ADD CONSTRAINT "portifolios_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "portifolios" ADD CONSTRAINT "portifolios_tolinerId_fkey" FOREIGN KEY ("tolinerId") REFERENCES "toliners"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToToliner" ADD CONSTRAINT "_CategoryToToliner_A_fkey" FOREIGN KEY ("A") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToToliner" ADD CONSTRAINT "_CategoryToToliner_B_fkey" FOREIGN KEY ("B") REFERENCES "toliners"("id") ON DELETE CASCADE ON UPDATE CASCADE;
