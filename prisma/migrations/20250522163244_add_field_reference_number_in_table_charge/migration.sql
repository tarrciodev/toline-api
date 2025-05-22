-- AlterTable
ALTER TABLE "charges" ADD COLUMN     "referenceNumber" TEXT;

-- AlterTable
ALTER TABLE "quotations" ALTER COLUMN "description" DROP NOT NULL;
