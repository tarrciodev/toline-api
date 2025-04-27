-- AlterTable
ALTER TABLE "messages" ADD COLUMN     "fileInfo" JSONB,
ADD COLUMN     "hasFile" BOOLEAN NOT NULL DEFAULT false;
