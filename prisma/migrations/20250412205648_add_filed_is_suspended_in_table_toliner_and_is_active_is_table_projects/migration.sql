-- AlterTable
ALTER TABLE "projects" ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "toliners" ADD COLUMN     "is_suspended" BOOLEAN NOT NULL DEFAULT false;
