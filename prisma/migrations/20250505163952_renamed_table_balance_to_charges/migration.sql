/*
  Warnings:

  - You are about to drop the `Balance` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Balance" DROP CONSTRAINT "Balance_tolinerId_fkey";

-- DropTable
DROP TABLE "Balance";

-- CreateTable
CREATE TABLE "charges" (
    "id" TEXT NOT NULL,
    "ammount" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "invoice" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "tolinerId" TEXT NOT NULL,

    CONSTRAINT "charges_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "charges_tolinerId_key" ON "charges"("tolinerId");

-- AddForeignKey
ALTER TABLE "charges" ADD CONSTRAINT "charges_tolinerId_fkey" FOREIGN KEY ("tolinerId") REFERENCES "toliners"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
