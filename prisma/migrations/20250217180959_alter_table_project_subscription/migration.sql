-- AlterTable
ALTER TABLE "project_subscriptions" ALTER COLUMN "required_informations" DROP NOT NULL,
ALTER COLUMN "similar_experiences" DROP NOT NULL,
ALTER COLUMN "quotation" DROP NOT NULL,
ALTER COLUMN "estimated_time" DROP NOT NULL;
