/*
  Warnings:

  - A unique constraint covering the columns `[title,freelancerId]` on the table `portifolios` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "portifolios_title_freelancerId_key" ON "portifolios"("title", "freelancerId");
