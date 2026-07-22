import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Categories
  await prisma.category.createMany({
    data: [
      { name: "Business Leaders", slug: "BUSINESS_LEADERS", sortOrder: 1 },
      { name: "Doctors & Healthcare", slug: "DOCTORS_HEALTHCARE", sortOrder: 2 },
      { name: "CAs & Legal", slug: "CAs_LEGAL", sortOrder: 3 },
      { name: "Innovators & Tech", slug: "INNOVATORS_TECH", sortOrder: 4 },
      { name: "Celebrities", slug: "CELEBRITIES", sortOrder: 5 },
      { name: "Sports & Events", slug: "SPORTS_EVENTS", sortOrder: 6 },
    ],
    skipDuplicates: true,
  });

  // Site Stats
  await prisma.siteStat.createMany({
    data: [
      { key: "stories_featured", value: 500 },
      { key: "total_viewers", value: 1 },
      { key: "award_ceremonies", value: 50 },
      { key: "industries_covered", value: 12 },
    ],
    skipDuplicates: true,
  });

  // Sample Guest
  const guest = await prisma.guest.create({
    data: {
      fullName: "Rajiv Nair",
      slug: "rajiv-nair",
      headline: "Founder & Chairman, NairTech Industries",
      company: "NairTech Industries",
      industry: "Technology",
      location: "Hyderabad",
    },
  });

  // Sample Interview
  const category = await prisma.category.findFirst({
    where: { slug: "BUSINESS_LEADERS" },
  });

  await prisma.interview.create({
    data: {
      title: "From Zero to 500 Crore Empire",
      slug: "rajiv-nair-zero-to-500-crore",
      summary: "Rajiv Nair shares how he built NairTech from a single laptop to a 500 Crore enterprise in under a decade.",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      youtubeVideoId: "dQw4w9WgXcQ",
      duration: 2280,
      featured: true,
      status: "PUBLISHED",
      publishedAt: new Date(),
      categoryId: category!.id,
      guestId: guest.id,
    },
  });

  // Sample Event
  await prisma.event.create({
    data: {
      title: "BTV Business Excellence Awards 2025",
      slug: "btv-excellence-awards-2025",
      type: "AWARD_CEREMONY",
      status: "UPCOMING",
      city: "Hyderabad",
      venue: "HICC, Novotel",
      scheduledAt: new Date("2025-09-15T18:00:00.000Z"),
    },
  });

  console.log("✓ Seed complete");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
