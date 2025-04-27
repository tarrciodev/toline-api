/*
  Warnings:

  - You are about to drop the column `avatar_url` on the `clientes` table. All the data in the column will be lost.
  - You are about to drop the column `avatar_url` on the `freelancers` table. All the data in the column will be lost.
  - You are about to drop the column `bio` on the `freelancers` table. All the data in the column will be lost.
  - You are about to drop the column `avatarUrl` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[freelancerId]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[clientId]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "clientes" DROP COLUMN "avatar_url";

-- AlterTable
ALTER TABLE "freelancers" DROP COLUMN "avatar_url",
DROP COLUMN "bio";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "avatarUrl",
ADD COLUMN     "avatar_url" TEXT,
ADD COLUMN     "clientId" TEXT,
ADD COLUMN     "freelancerId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "users_freelancerId_key" ON "users"("freelancerId");

-- CreateIndex
CREATE UNIQUE INDEX "users_clientId_key" ON "users"("clientId");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_freelancerId_fkey" FOREIGN KEY ("freelancerId") REFERENCES "freelancers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clientes"("id") ON DELETE SET NULL ON UPDATE CASCADE;
