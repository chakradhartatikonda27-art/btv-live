export default function SocialMediaSection() {
  return (
    <section style={{ padding: '60px 16px', background: '#08090B', borderTop: '1px solid #1C1E23' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <p style={{ color: '#D4A832', fontFamily: 'monospace', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', margin: '0 0 8px' }}>Follow Us</p>
          <h2 style={{ color: '#EDEEF0', fontSize: 'clamp(24px, 4vw, 36px)', fontFamily: 'Georgia, serif', margin: '0 0 8px' }}>BTV LIVE on Social Media</h2>
          <p style={{ color: '#7A7D85', fontSize: '14px', margin: 0 }}>Subscribe and follow for daily business inspiration</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          
          {/* YouTube */}
          <div style={{ borderRadius: '16px', overflow: 'hidden', background: '#141619', border: '1px solid #252830' }}>
            <div style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '12px', borderBottom: '1px solid #252830' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#FF0000', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </div>
              <div>
                <p style={{ color: '#EDEEF0', fontSize: '14px', fontWeight: '600', margin: 0 }}>BTV LIVE YouTube</p>
                <p style={{ color: '#7A7D85', fontSize: '12px', margin: 0 }}>@Btvlive-b2b · 22 subscribers</p>
              </div>
              <a href="https://www.youtube.com/@Btvlive-b2b" target="_blank" rel="noopener noreferrer" style={{ marginLeft: 'auto', background: '#FF0000', color: 'white', fontSize: '12px', fontWeight: '600', padding: '6px 14px', borderRadius: '999px', textDecoration: 'none', flexShrink: 0 }}>
                Subscribe
              </a>
            </div>
            <div style={{ position: 'relative', paddingBottom: '80%', height: 0, overflow: 'hidden' }}>
              <iframe
                src="https://www.youtube.com/embed/dyAeSpDlluw"
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div style={{ padding: '12px 16px' }}>
              <a href="https://www.youtube.com/@Btvlive-b2b" target="_blank" rel="noopener noreferrer" style={{ color: '#D4A832', fontSize: '13px', fontWeight: '500', textDecoration: 'none' }}>
                View all videos on YouTube →
              </a>
            </div>
          </div>

          {/* Instagram */}
          <div style={{ borderRadius: '16px', overflow: 'hidden', background: '#141619', border: '1px solid #252830' }}>
            <div style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '12px', borderBottom: '1px solid #252830' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </div>
              <div>
                <p style={{ color: '#EDEEF0', fontSize: '14px', fontWeight: '600', margin: 0 }}>BTV LIVE Instagram</p>
                <p style={{ color: '#7A7D85', fontSize: '12px', margin: 0 }}>@btvlive</p>
              </div>
              <a href="https://www.instagram.com/reel/DbGnjyWk0HY/" target="_blank" rel="noopener noreferrer" style={{ marginLeft: 'auto', background: 'linear-gradient(45deg, #f09433, #dc2743, #bc1888)', color: 'white', fontSize: '12px', fontWeight: '600', padding: '6px 14px', borderRadius: '999px', textDecoration: 'none', flexShrink: 0 }}>
                Follow
              </a>
            </div>
            <div style={{ position: 'relative', paddingBottom: '80%', height: 0, overflow: 'hidden' }}>
              <iframe
                src="https://www.instagram.com/reel/DbGnjyWk0HY/embed/"
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                allowFullScreen
                scrolling="no"
              />
            </div>
            <div style={{ padding: '12px 16px' }}>
              <a href="https://www.instagram.com/reel/DbGnjyWk0HY/" target="_blank" rel="noopener noreferrer" style={{ color: '#D4A832', fontSize: '13px', fontWeight: '500', textDecoration: 'none' }}>
                View on Instagram →
              </a>
            </div>
          </div>

        </div>

        {/* Subscribe CTA */}
        <div style={{ marginTop: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <a href="https://www.youtube.com/@Btvlive-b2b" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#FF0000', color: 'white', fontWeight: '600', fontSize: '14px', padding: '12px 24px', borderRadius: '999px', textDecoration: 'none' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            Subscribe on YouTube
          </a>
          <a href="https://www.instagram.com/reel/DbGnjyWk0HY/" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'linear-gradient(45deg, #f09433, #dc2743, #bc1888)', color: 'white', fontWeight: '600', fontSize: '14px', padding: '12px 24px', borderRadius: '999px', textDecoration: 'none' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            Follow on Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
