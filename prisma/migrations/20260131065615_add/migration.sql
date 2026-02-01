-- CreateTable
CREATE TABLE "public"."QuestionGrade" (
    "id" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "QuestionGrade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."QuestionTopic" (
    "id" TEXT NOT NULL,
    "gradeId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "number" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "QuestionTopic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Question" (
    "id" TEXT NOT NULL,
    "topicId" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 1,
    "imageUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "QuestionGrade_subjectId_sortOrder_idx" ON "public"."QuestionGrade"("subjectId", "sortOrder");

-- CreateIndex
CREATE UNIQUE INDEX "QuestionGrade_subjectId_name_key" ON "public"."QuestionGrade"("subjectId", "name");

-- CreateIndex
CREATE INDEX "QuestionTopic_gradeId_number_idx" ON "public"."QuestionTopic"("gradeId", "number");

-- CreateIndex
CREATE UNIQUE INDEX "QuestionTopic_gradeId_number_key" ON "public"."QuestionTopic"("gradeId", "number");

-- CreateIndex
CREATE INDEX "Question_topicId_order_idx" ON "public"."Question"("topicId", "order");

-- CreateIndex
CREATE UNIQUE INDEX "Question_topicId_order_key" ON "public"."Question"("topicId", "order");

-- AddForeignKey
ALTER TABLE "public"."QuestionGrade" ADD CONSTRAINT "QuestionGrade_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "public"."Subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."QuestionTopic" ADD CONSTRAINT "QuestionTopic_gradeId_fkey" FOREIGN KEY ("gradeId") REFERENCES "public"."QuestionGrade"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Question" ADD CONSTRAINT "Question_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "public"."QuestionTopic"("id") ON DELETE CASCADE ON UPDATE CASCADE;
