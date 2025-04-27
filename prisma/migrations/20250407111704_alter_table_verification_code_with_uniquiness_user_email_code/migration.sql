/*
  Warnings:

  - A unique constraint covering the columns `[userEmail,code]` on the table `verification_code` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "verification_code_userEmail_code_key" ON "verification_code"("userEmail", "code");
