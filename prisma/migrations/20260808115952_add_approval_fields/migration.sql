-- AlterTable
ALTER TABLE "articles" ADD COLUMN     "rejectedReason" TEXT,
ADD COLUMN     "submittedById" TEXT;

-- AlterTable
ALTER TABLE "interviews" ADD COLUMN     "rejectedReason" TEXT,
ADD COLUMN     "submittedById" TEXT;
