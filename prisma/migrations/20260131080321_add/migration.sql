/*
  Warnings:

  - A unique constraint covering the columns `[topicId]` on the table `Question` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[subjectId]` on the table `QuestionGrade` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[gradeId]` on the table `QuestionTopic` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "public"."Question_topicId_sortOrder_key";

-- DropIndex
DROP INDEX "public"."QuestionGrade_subjectId_name_key";

-- DropIndex
DROP INDEX "public"."QuestionTopic_gradeId_sortOrder_key";

-- CreateIndex
CREATE UNIQUE INDEX "Question_topicId_key" ON "public"."Question"("topicId");

-- CreateIndex
CREATE UNIQUE INDEX "QuestionGrade_subjectId_key" ON "public"."QuestionGrade"("subjectId");

-- CreateIndex
CREATE UNIQUE INDEX "QuestionTopic_gradeId_key" ON "public"."QuestionTopic"("gradeId");
