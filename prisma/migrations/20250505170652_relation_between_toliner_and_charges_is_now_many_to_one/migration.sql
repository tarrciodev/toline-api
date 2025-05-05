-- DropIndex
DROP INDEX "charges_tolinerId_key";

-- CreateIndex
CREATE INDEX "charges_tolinerId_idx" ON "charges"("tolinerId");
