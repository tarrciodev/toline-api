/*
  Warnings:

  - The values [verified,failed] on the enum `ChargeStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ChargeStatus_new" AS ENUM ('pending', 'resolved', 'rejected');
ALTER TABLE "charges" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "charges" ALTER COLUMN "status" TYPE "ChargeStatus_new" USING ("status"::text::"ChargeStatus_new");
ALTER TYPE "ChargeStatus" RENAME TO "ChargeStatus_old";
ALTER TYPE "ChargeStatus_new" RENAME TO "ChargeStatus";
DROP TYPE "ChargeStatus_old";
ALTER TABLE "charges" ALTER COLUMN "status" SET DEFAULT 'pending';
COMMIT;
