-- CreateTable
CREATE TABLE "site_settings" (
    "id" TEXT NOT NULL,
    "youtubeUrl" TEXT NOT NULL DEFAULT 'https://www.youtube.com/@Btvlive-b2b',
    "instagramUrl" TEXT NOT NULL DEFAULT 'https://www.instagram.com/reel/DbGnjyWk0HY/',
    "whatsappNumber" TEXT NOT NULL DEFAULT '+919876543210',
    "storiesFeatured" INTEGER NOT NULL DEFAULT 500,
    "totalViewers" INTEGER NOT NULL DEFAULT 1,
    "awardCeremonies" INTEGER NOT NULL DEFAULT 50,
    "industriesCovered" INTEGER NOT NULL DEFAULT 12,
    "tickerMessages" TEXT[],
    "heroSlides" JSONB NOT NULL DEFAULT '[]',
    "welcomeTitle" TEXT NOT NULL DEFAULT 'India''s Premier Business & Lifestyle Media Platform',
    "welcomeDesc" TEXT NOT NULL DEFAULT 'BTV LIVE is a premium media platform dedicated to showcasing the inspiring journeys of entrepreneurs, business leaders, doctors, innovators, and extraordinary individuals.',
    "missionText" TEXT NOT NULL DEFAULT 'To celebrate excellence, inspire leadership, and preserve the legacies of remarkable individuals who serve as role models for future generations.',
    "footerTagline" TEXT NOT NULL DEFAULT 'Where Success Goes Live... Legacy Lives Forever.',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "site_settings_pkey" PRIMARY KEY ("id")
);
