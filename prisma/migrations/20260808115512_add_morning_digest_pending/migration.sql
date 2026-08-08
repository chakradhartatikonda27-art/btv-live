-- AlterTable
ALTER TABLE "morning_digests" ADD COLUMN     "pending" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "rejectedReason" TEXT,
ADD COLUMN     "submittedById" TEXT;
