-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_tolinerId_fkey";

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_tolinerId_fkey" FOREIGN KEY ("tolinerId") REFERENCES "toliners"("id") ON DELETE CASCADE ON UPDATE CASCADE;
