/*
  Warnings:

  - The values [TEST_TOPIC] on the enum `PurchaseItemType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `topicId` on the `Purchase` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[telegramUserId,testSetId]` on the table `Purchase` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."PurchaseItemType_new" AS ENUM ('FILE', 'TEST_SET');
ALTER TABLE "public"."Purchase" ALTER COLUMN "itemType" TYPE "public"."PurchaseItemType_new" USING ("itemType"::text::"public"."PurchaseItemType_new");
ALTER TYPE "public"."PurchaseItemType" RENAME TO "PurchaseItemType_old";
ALTER TYPE "public"."PurchaseItemType_new" RENAME TO "PurchaseItemType";
DROP TYPE "public"."PurchaseItemType_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "public"."Purchase" DROP CONSTRAINT "Purchase_topicId_fkey";

-- DropIndex
DROP INDEX "public"."Purchase_telegramUserId_topicId_key";

-- AlterTable
ALTER TABLE "public"."Purchase" DROP COLUMN "topicId",
ADD COLUMN     "testSetId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Purchase_telegramUserId_testSetId_key" ON "public"."Purchase"("telegramUserId", "testSetId");

-- AddForeignKey
ALTER TABLE "public"."Purchase" ADD CONSTRAINT "Purchase_testSetId_fkey" FOREIGN KEY ("testSetId") REFERENCES "public"."TestSet"("id") ON DELETE CASCADE ON UPDATE CASCADE;
