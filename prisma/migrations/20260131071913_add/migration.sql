/*
  Warnings:

  - You are about to drop the column `number` on the `QuestionTopic` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[gradeId,sortOrder]` on the table `QuestionTopic` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "public"."QuestionTopic_gradeId_number_idx";

-- DropIndex
DROP INDEX "public"."QuestionTopic_gradeId_number_key";

-- AlterTable
ALTER TABLE "public"."QuestionTopic" DROP COLUMN "number",
ADD COLUMN     "sortOrder" INTEGER NOT NULL DEFAULT 1;

-- CreateIndex
CREATE INDEX "QuestionTopic_gradeId_sortOrder_idx" ON "public"."QuestionTopic"("gradeId", "sortOrder");

-- CreateIndex
CREATE UNIQUE INDEX "QuestionTopic_gradeId_sortOrder_key" ON "public"."QuestionTopic"("gradeId", "sortOrder");
