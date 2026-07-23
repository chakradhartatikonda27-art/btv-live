"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Radio } from "lucide-react";

const NAV_LINKS = [
  { href: "/shows", label: "Interviews" },
  { href: "/events", label: "Events & Awards" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-obsidian-950/95 backdrop-blur-md border-b border-obsidian-700/60"
          : "bg-transparent"
      }`}
    >
      {/* Gold top line */}
      <div className="h-[2px] bg-gold-gradient" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 bg-gold-gradient rounded-sm flex items-center justify-center">
            <Radio size={16} className="text-obsidian-950" />
          </div>
          <div className="flex flex-col leading-none">
            <span
              className="font-bold text-xl text-white tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              BTV
            </span>
            <span className="text-gold-500 font-mono text-[9px] tracking-[0.25em] uppercase -mt-0.5">
              LIVE
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors relative pb-1 ${
                pathname.startsWith(link.href)
                  ? "text-gold-400"
                  : "text-platinum-300 hover:text-platinum-50"
              }`}
            >
              {link.label}
              {pathname.startsWith(link.href) && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute -bottom-0.5 left-0 right-0 h-[2px] bg-gold-500"
                />
              )}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/apply"
            className="bg-gold-500 hover:bg-gold-400 text-obsidian-950 font-semibold text-sm px-5 py-2.5 rounded-full transition-colors shadow-gold"
          >
            Nominate a Leader
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-platinum-300 hover:text-white transition-colors p-1"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-obsidian-900/98 backdrop-blur-md border-t border-obsidian-700 overflow-hidden"
          >
            <nav className="px-4 py-6 flex flex-col gap-5">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-platinum-200 hover:text-gold-400 font-medium text-lg transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/apply"
                onClick={() => setMobileOpen(false)}
                className="inline-flex bg-gold-500 hover:bg-gold-400 text-obsidian-950 font-semibold text-sm px-5 py-3 rounded-full transition-colors w-fit mt-2"
              >
                Nominate a Leader
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
