-- CreateEnum
CREATE TYPE "OpportunityType" AS ENUM ('JOB', 'BUSINESS_LEAD', 'TENDER', 'FRANCHISE', 'PARTNERSHIP');

-- CreateEnum
CREATE TYPE "OpportunityStatus" AS ENUM ('ACTIVE', 'CLOSED', 'EXPIRED');

-- CreateTable
CREATE TABLE "opportunities" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "type" "OpportunityType" NOT NULL,
    "status" "OpportunityStatus" NOT NULL DEFAULT 'ACTIVE',
    "company" TEXT,
    "description" TEXT NOT NULL,
    "location" TEXT,
    "city" TEXT,
    "state" TEXT,
    "salary" TEXT,
    "deadline" TIMESTAMP(3),
    "applyUrl" TEXT,
    "applyEmail" TEXT,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "opportunities_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "opportunities_type_status_idx" ON "opportunities"("type", "status");

-- CreateIndex
CREATE INDEX "opportunities_featured_idx" ON "opportunities"("featured");
