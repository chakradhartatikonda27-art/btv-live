-- AlterTable
ALTER TABLE "site_settings" ADD COLUMN     "instagramReels" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "youtubeVideos" TEXT[] DEFAULT ARRAY[]::TEXT[];
