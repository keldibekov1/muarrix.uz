-- CreateEnum
CREATE TYPE "public"."PurchaseItemType" AS ENUM ('FILE', 'TEST_TOPIC');

-- CreateTable
CREATE TABLE "public"."Purchase" (
    "id" TEXT NOT NULL,
    "telegramUserId" BIGINT NOT NULL,
    "itemType" "public"."PurchaseItemType" NOT NULL,
    "fileId" TEXT,
    "topicId" TEXT,
    "amount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Purchase_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Purchase_telegramUserId_idx" ON "public"."Purchase"("telegramUserId");

-- CreateIndex
CREATE INDEX "Purchase_itemType_idx" ON "public"."Purchase"("itemType");

-- CreateIndex
CREATE UNIQUE INDEX "Purchase_telegramUserId_fileId_key" ON "public"."Purchase"("telegramUserId", "fileId");

-- CreateIndex
CREATE UNIQUE INDEX "Purchase_telegramUserId_topicId_key" ON "public"."Purchase"("telegramUserId", "topicId");

-- AddForeignKey
ALTER TABLE "public"."Purchase" ADD CONSTRAINT "Purchase_telegramUserId_fkey" FOREIGN KEY ("telegramUserId") REFERENCES "public"."TelegramUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Purchase" ADD CONSTRAINT "Purchase_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "public"."File"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Purchase" ADD CONSTRAINT "Purchase_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "public"."TestTopic"("id") ON DELETE CASCADE ON UPDATE CASCADE;
