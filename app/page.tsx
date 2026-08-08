import { prisma } from "@/lib/prisma";
import HeroBanner from "@/components/home/HeroBanner";
import CategoryCarousel from "@/components/home/CategoryCarousel";
import FeaturedStories from "@/components/home/FeaturedStories";
import LiveEventsBanner from "@/components/home/LiveEventsBanner";
import ImpactCounter from "@/components/home/ImpactCounter";
import NominateCTA from "@/components/home/NominateCTA";
import NewsletterBar from "@/components/home/NewsletterBar";
import WelcomeSection from "@/components/home/WelcomeSection";
import SocialMediaSection from "@/components/home/SocialMediaSection";

export const revalidate = 0;

async function getFeaturedInterview() {
  return prisma.interview.findFirst({
    where: { status: "PUBLISHED", featured: true },
    include: { guest: true, category: true },
    orderBy: { publishedAt: "desc" },
  });
}

async function getFeaturedStories() {
  return prisma.interview.findMany({
    where: { status: "PUBLISHED" },
    include: { guest: true, category: true, tags: true },
    orderBy: [{ featured: "desc" }, { publishedAt: "desc" }],
    take: 8,
  });
}

async function getUpcomingEvents() {
  return prisma.event.findMany({
    where: { status: { in: ["UPCOMING", "LIVE"] } },
    orderBy: { scheduledAt: "asc" },
    take: 3,
  });
}

async function getSiteStats() {
  const stats = await prisma.siteStat.findMany();
  return Object.fromEntries(stats.map((s) => [s.key, s.value]));
}

async function getMorningDigest() {
  return prisma.morningDigest.findFirst({
    where: { published: true },
    orderBy: { date: 'desc' },
  });
}

async function getCategories() {
  return prisma.category.findMany({
    orderBy: { sortOrder: "asc" },
    include: { _count: { select: { interviews: true } } },
  });
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'BTV LIVE',
  url: 'https://www.btvlive.net',
  logo: 'https://www.btvlive.net/btv-logo.jpg',
  description: "India's premier business and lifestyle media platform",
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+91-9885126368',
    email: 'btvliveindia@gmail.com',
    contactType: 'customer service',
  },
  sameAs: [
    'https://www.youtube.com/@Btvlive-b2b',
    'https://www.instagram.com/reel/DbGnjyWk0HY/',
  ],
};

export default async function HomePage() {
  const [featuredInterview, stories, events, stats, categories, morningDigest] =
    await Promise.all([
      getFeaturedInterview(),
      getFeaturedStories(),
      getUpcomingEvents(),
      getSiteStats(),
      getCategories(),
      getMorningDigest(),
    ]);

  return (
    <>
    <main className="min-h-screen" style={{ background: "#08090B" }}>
      <HeroBanner interview={featuredInterview} />

      <WelcomeSection />

      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="flex items-baseline justify-between mb-10">
          <div>
            <p className="text-gold-500 font-mono text-xs tracking-[0.2em] uppercase mb-2">
              Explore by Industry
            </p>
            <h2
              className="text-3xl md:text-4xl text-platinum-50"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Every Field. Every Story.
            </h2>
          </div>
          <a href="/shows" className="text-sm text-gold-400 hover:text-gold-300 transition-colors hidden md:block">
            View All Shows
          </a>
        </div>
        <CategoryCarousel categories={categories} />
      </section>

      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="flex items-baseline justify-between mb-10">
          <div>
            <p className="text-gold-500 font-mono text-xs tracking-[0.2em] uppercase mb-2">
              Zero to Hero
            </p>
            <h2
              className="text-3xl md:text-4xl text-platinum-50"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Featured Stories
            </h2>
          </div>
          <a href="/shows" className="text-sm text-gold-400 hover:text-gold-300 transition-colors hidden md:block">
            All Interviews
          </a>
        </div>
        <FeaturedStories stories={stories} />
      </section>


      <ImpactCounter />

      <NominateCTA />

      <SocialMediaSection />

      <NewsletterBar />
    </main>
    </>
  );
}
