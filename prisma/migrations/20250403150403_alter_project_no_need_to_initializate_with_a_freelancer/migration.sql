-- DropForeignKey
ALTER TABLE "projects" DROP CONSTRAINT "projects_freelancer_id_fkey";

-- AlterTable
ALTER TABLE "projects" ALTER COLUMN "freelancer_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_freelancer_id_fkey" FOREIGN KEY ("freelancer_id") REFERENCES "toliners"("id") ON DELETE SET NULL ON UPDATE CASCADE;
