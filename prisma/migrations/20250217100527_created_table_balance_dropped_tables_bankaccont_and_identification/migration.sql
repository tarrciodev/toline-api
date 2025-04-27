/*
  Warnings:

  - You are about to drop the column `identificationId` on the `freelancers` table. All the data in the column will be lost.
  - You are about to drop the `bank_accounts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `identifications` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `portifolio_assets` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `assets` to the `portifolios` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "bank_accounts" DROP CONSTRAINT "bank_accounts_freelancerId_fkey";

-- DropForeignKey
ALTER TABLE "identifications" DROP CONSTRAINT "identifications_freelancerId_fkey";

-- DropForeignKey
ALTER TABLE "portifolio_assets" DROP CONSTRAINT "portifolio_assets_portifolioId_fkey";

-- AlterTable
ALTER TABLE "freelancers" DROP COLUMN "identificationId";

-- AlterTable
ALTER TABLE "portifolios" ADD COLUMN     "assets" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "bank_account" JSONB,
ADD COLUMN     "identification" JSONB;

-- DropTable
DROP TABLE "bank_accounts";

-- DropTable
DROP TABLE "identifications";

-- DropTable
DROP TABLE "portifolio_assets";

-- CreateTable
CREATE TABLE "Balance" (
    "id" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Balance_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Balance_userId_key" ON "Balance"("userId");

-- AddForeignKey
ALTER TABLE "Balance" ADD CONSTRAINT "Balance_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
