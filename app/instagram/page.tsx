export default function InstagramPage() {
  return (
    <main style={{ minHeight: '100vh', background: '#08090B', paddingTop: '80px', paddingBottom: '60px' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '0 16px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="white"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
          </div>
          <h1 style={{ color: '#EDEEF0', fontSize: '32px', fontFamily: 'Georgia, serif', margin: '0 0 8px' }}>BTV LIVE on Instagram</h1>
          <p style={{ color: '#7A7D85', fontSize: '14px', margin: '0 0 24px' }}>@btvlive</p>
          <a href="https://www.instagram.com/reel/DbGnjyWk0HY/" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'linear-gradient(45deg, #f09433, #dc2743, #bc1888)', color: 'white', fontWeight: '600', fontSize: '15px', padding: '12px 28px', borderRadius: '999px', textDecoration: 'none' }}>
            Follow on Instagram
          </a>
        </div>

        {/* Latest Reel */}
        <div style={{ borderRadius: '16px', overflow: 'hidden', background: '#141619', border: '1px solid #252830', marginBottom: '20px' }}>
          <div style={{ padding: '16px', borderBottom: '1px solid #252830' }}>
            <p style={{ color: '#D4A832', fontFamily: 'monospace', fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', margin: 0 }}>Latest Reel</p>
          </div>
          <div style={{ position: 'relative', paddingBottom: '177.78%', height: 0 }}>
            <iframe
              src="https://www.instagram.com/reel/DbGnjyWk0HY/embed/"
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
              allowFullScreen
              scrolling="no"
            />
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <a href="https://www.instagram.com/reel/DbGnjyWk0HY/" target="_blank" rel="noopener noreferrer" style={{ color: '#D4A832', fontSize: '14px', fontWeight: '600', textDecoration: 'none' }}>
            View on Instagram →
          </a>
        </div>
      </div>
    </main>
  );
}
