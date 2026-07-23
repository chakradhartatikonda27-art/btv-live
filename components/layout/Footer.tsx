import Link from "next/link";
import Image from "next/image";

const FOOTER_LINKS = {
  Platform: [
    { href: "/shows", label: "Interviews" },
    { href: "/events", label: "Events & Awards" },
    { href: "/apply", label: "Nominate a Leader" },
    { href: "/about", label: "About BTV LIVE" },
  ],
  Categories: [
    { href: "/shows?category=BUSINESS_LEADERS", label: "Business Leaders" },
    { href: "/shows?category=DOCTORS_HEALTHCARE", label: "Doctors & Healthcare" },
    { href: "/shows?category=INNOVATORS_TECH", label: "Innovators & Tech" },
    { href: "/shows?category=CELEBRITIES", label: "Celebrities" },
  ],
  Legal: [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Use" },
    { href: "/contact", label: "Contact Us" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-obsidian-900 border-t border-obsidian-700">
      {/* Gold top line */}
      <div className="h-[1px] bg-gold-gradient opacity-40" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
            <Image
              src="/btv-logo.jpg"
              alt="BTV LIVE"
              width={56}
              height={56}
              className="rounded-sm object-contain"
            />
          </Link>
            <p className="text-platinum-400 text-sm leading-relaxed max-w-xs mb-6">
              The Trusted Business Channel. Inspiring Success. Creating Legacy.
              India's premium media platform for entrepreneurs and leaders.
            </p>
            <p
              className="text-gold-600 text-sm italic"
              style={{ fontFamily: "var(--font-display)" }}
            >
              "Where Success Goes Live... Legacy Lives Forever."
            </p>
          </div>

          {/* Links */}
          {Object.entries(FOOTER_LINKS).map(([section, links]) => (
            <div key={section}>
              <p className="text-platinum-200 font-semibold text-sm mb-4 tracking-wide">
                {section}
              </p>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-platinum-400 hover:text-gold-400 text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-obsidian-700 flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4">
          <p className="text-platinum-500 text-xs">
            © {new Date().getFullYear()} BTV LIVE. All rights reserved.
          </p>
          <p className="text-platinum-600 text-xs">
            Powered by{" "}
            <span className="text-gold-700">SiyanTech Global Innovations</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
