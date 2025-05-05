-- CreateTable
CREATE TABLE "Balance" (
    "id" TEXT NOT NULL,
    "ammount" DOUBLE PRECISION NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "tolinerId" TEXT NOT NULL,

    CONSTRAINT "Balance_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Balance_tolinerId_key" ON "Balance"("tolinerId");

-- AddForeignKey
ALTER TABLE "Balance" ADD CONSTRAINT "Balance_tolinerId_fkey" FOREIGN KEY ("tolinerId") REFERENCES "toliners"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
