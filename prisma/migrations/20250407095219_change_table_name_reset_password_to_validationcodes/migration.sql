/*
  Warnings:

  - You are about to drop the `password_resets` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "password_resets";

-- CreateTable
CREATE TABLE "validation_codes" (
    "id" TEXT NOT NULL,
    "userEmail" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "validation_codes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "validation_codes_userEmail_key" ON "validation_codes"("userEmail");
