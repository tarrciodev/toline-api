-- DropForeignKey
ALTER TABLE "Balance" DROP CONSTRAINT "Balance_tolinerId_fkey";

-- AlterTable
ALTER TABLE "Balance" ALTER COLUMN "tolinerId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Balance" ADD CONSTRAINT "Balance_tolinerId_fkey" FOREIGN KEY ("tolinerId") REFERENCES "toliners"("id") ON DELETE SET NULL ON UPDATE CASCADE;
