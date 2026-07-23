"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/", label: "Home" },
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
    <>
      <style>{`
        .btv-desktop-nav { display: none; }
        .btv-desktop-cta { display: none; }
        .btv-hamburger { display: flex !important; }
        @media (min-width: 768px) {
          .btv-desktop-nav { display: flex !important; }
          .btv-desktop-cta { display: flex !important; }
          .btv-hamburger { display: none !important; }
        }
      `}</style>

      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9999,
        background: mobileOpen ? 'rgba(8,9,11,0.99)' : scrolled ? 'rgba(8,9,11,0.95)' : 'transparent',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(28,30,35,0.4)',
        transition: 'background 0.3s',
      }}>
        <div style={{ height: '2px', background: 'linear-gradient(135deg, #D4A832, #F5D98A, #B8891A)' }} />

        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 16px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', zIndex: 10 }}>
            <Image src="/btv-logo.jpg" alt="BTV LIVE" width={52} height={52} style={{ borderRadius: '4px', objectFit: 'contain' }} />
          </Link>

          {/* Desktop nav */}
          <nav className="btv-desktop-nav" style={{ alignItems: 'center', gap: '32px' }}>
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} style={{ fontSize: '14px', fontWeight: '500', textDecoration: 'none', color: pathname.startsWith(link.href) ? '#E8C35A' : '#B0B3BB' }}>
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="btv-desktop-cta">
            <Link href="/apply" style={{ background: '#D4A832', color: '#08090B', fontWeight: '600', fontSize: '14px', padding: '10px 20px', borderRadius: '999px', textDecoration: 'none' }}>
              Nominate a Leader
            </Link>
          </div>

          {/* Hamburger */}
          <div
            className="btv-hamburger"
            onClick={() => setMobileOpen((prev) => !prev)}
            style={{
              background: 'rgba(212,168,50,0.1)',
              border: '1px solid rgba(212,168,50,0.4)',
              borderRadius: '8px',
              cursor: 'pointer',
              padding: '10px 12px',
              flexDirection: 'column',
              gap: '5px',
              zIndex: 9999,
              position: 'relative',
              userSelect: 'none',
              WebkitUserSelect: 'none',
            }}
          >
            <span style={{ display: 'block', width: '22px', height: '2px', background: '#D4A832', transition: 'all 0.3s', transform: mobileOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }} />
            <span style={{ display: 'block', width: '22px', height: '2px', background: mobileOpen ? 'transparent' : '#D4A832', transition: 'all 0.3s' }} />
            <span style={{ display: 'block', width: '22px', height: '2px', background: '#D4A832', transition: 'all 0.3s', transform: mobileOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }} />
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileOpen && (
          <div style={{
            background: 'rgba(8,9,11,0.99)',
            borderTop: '1px solid rgba(212,168,50,0.2)',
            padding: '0 20px 24px',
          }}>
            <nav style={{ display: 'flex', flexDirection: 'column' }}>
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    fontSize: '18px',
                    fontWeight: '500',
                    textDecoration: 'none',
                    color: pathname.startsWith(link.href) ? '#D4A832' : '#D4D6DA',
                    padding: '16px 0',
                    borderBottom: '1px solid rgba(37,40,48,0.8)',
                    display: 'block',
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <Link
              href="/apply"
              onClick={() => setMobileOpen(false)}
              style={{
                display: 'inline-flex',
                background: '#D4A832',
                color: '#08090B',
                fontWeight: '600',
                fontSize: '15px',
                padding: '14px 28px',
                borderRadius: '999px',
                textDecoration: 'none',
                marginTop: '20px',
              }}
            >
              Nominate a Leader
            </Link>
          </div>
        )}
      </header>
    </>
  );
}
