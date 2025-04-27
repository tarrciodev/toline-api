/*
  Warnings:

  - You are about to drop the `validation_codes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "validation_codes";

-- CreateTable
CREATE TABLE "verification_code" (
    "id" TEXT NOT NULL,
    "userEmail" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "verification_code_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "verification_code_userEmail_key" ON "verification_code"("userEmail");
