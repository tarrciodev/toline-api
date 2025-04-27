-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_clientId_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_freelancerId_fkey";

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_freelancerId_fkey" FOREIGN KEY ("freelancerId") REFERENCES "freelancers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clientes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
