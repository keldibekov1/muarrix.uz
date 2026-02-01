/*
  Warnings:

  - You are about to drop the column `order` on the `Question` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[topicId,sortOrder]` on the table `Question` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "public"."Question_topicId_order_idx";

-- DropIndex
DROP INDEX "public"."Question_topicId_order_key";

-- AlterTable
ALTER TABLE "public"."Question" DROP COLUMN "order",
ADD COLUMN     "sortOrder" INTEGER NOT NULL DEFAULT 1;

-- CreateIndex
CREATE INDEX "Question_topicId_sortOrder_idx" ON "public"."Question"("topicId", "sortOrder");

-- CreateIndex
CREATE UNIQUE INDEX "Question_topicId_sortOrder_key" ON "public"."Question"("topicId", "sortOrder");
