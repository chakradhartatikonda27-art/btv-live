export default function YouTubePage() {
  return (
    <main style={{ minHeight: '100vh', background: '#08090B', paddingTop: '80px', paddingBottom: '60px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 16px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#FF0000', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="white"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
          </div>
          <h1 style={{ color: '#EDEEF0', fontSize: '32px', fontFamily: 'Georgia, serif', margin: '0 0 8px' }}>BTV LIVE on YouTube</h1>
          <p style={{ color: '#7A7D85', fontSize: '14px', margin: '0 0 4px' }}>@Btvlive-b2b</p>
          <p style={{ color: '#5C6070', fontSize: '13px', margin: '0 0 24px' }}>22 subscribers · 2 videos · 1,234 views</p>
          <a href="https://www.youtube.com/@Btvlive-b2b" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#FF0000', color: 'white', fontWeight: '600', fontSize: '15px', padding: '12px 28px', borderRadius: '999px', textDecoration: 'none' }}>
            Subscribe to Channel
          </a>
        </div>

        {/* Latest Video */}
        <div style={{ borderRadius: '16px', overflow: 'hidden', background: '#141619', border: '1px solid #252830', marginBottom: '20px' }}>
          <div style={{ padding: '16px', borderBottom: '1px solid #252830' }}>
            <p style={{ color: '#D4A832', fontFamily: 'monospace', fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', margin: 0 }}>Latest Short</p>
          </div>
          <div style={{ position: 'relative', paddingBottom: '177.78%', height: 0 }}>
            <iframe
              src="https://www.youtube.com/embed/dyAeSpDlluw"
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <a href="https://www.youtube.com/@Btvlive-b2b" target="_blank" rel="noopener noreferrer" style={{ color: '#D4A832', fontSize: '14px', fontWeight: '600', textDecoration: 'none' }}>
            View All Videos on YouTube →
          </a>
        </div>
      </div>
    </main>
  );
}
