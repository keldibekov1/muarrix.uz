-- AlterTable
ALTER TABLE "public"."TelegramUser" ADD COLUMN     "purchaseFiles" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "purchaseTests" INTEGER NOT NULL DEFAULT 0;
