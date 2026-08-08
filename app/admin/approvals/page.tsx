'use client';
import { useState, useEffect } from 'react';

export default function AdminApprovalsPage() {
  const [interviews, setInterviews] = useState<any[]>([]);
  const [articles, setArticles] = useState<any[]>([]);
  const [digests, setDigests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [rejectId, setRejectId] = useState('');
  const [rejectType, setRejectType] = useState('');
  const [rejectReason, setRejectReason] = useState('');

  useEffect(() => {
    fetch('/api/admin/approvals').then(r => r.json()).then(d => {
      setInterviews(d.interviews || []);
      setArticles(d.articles || []);
      setDigests(d.digests || []);
      setLoading(false);
    });
  }, []);

  async function approve(type: string, id: string) {
    await fetch('/api/admin/approvals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, id, action: 'approve' }),
    });
    if (type === 'interview') setInterviews(p => p.filter(i => i.id !== id));
    if (type === 'article') setArticles(p => p.filter(a => a.id !== id));
    if (type === 'digest') setDigests(p => p.filter(d => d.id !== id));
  }

  async function reject() {
    if (!rejectReason.trim()) return;
    await fetch('/api/admin/approvals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: rejectType, id: rejectId, action: 'reject', reason: rejectReason }),
    });
    if (rejectType === 'interview') setInterviews(p => p.filter(i => i.id !== rejectId));
    if (rejectType === 'article') setArticles(p => p.filter(a => a.id !== rejectId));
    if (rejectType === 'digest') setDigests(p => p.filter(d => d.id !== rejectId));
    setRejectId('');
    setRejectType('');
    setRejectReason('');
  }

  const total = interviews.length + articles.length + digests.length;

  const cardStyle = { padding: '16px 20px', borderBottom: '1px solid #1C1E23', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' };
  const badgeStyle = (color: string) => ({ fontSize: '10px', fontWeight: '700' as const, color, fontFamily: 'monospace', background: color + '15', padding: '2px 8px', borderRadius: '999px', border: '1px solid ' + color + '40' });

  return (
    <div style={{ padding: '32px' }}>
      <div style={{ marginBottom: '32px' }}>
        <p style={{ color: '#D4A832', fontFamily: 'monospace', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', margin: '0 0 4px' }}>Review Queue</p>
        <h1 style={{ color: '#EDEEF0', fontSize: '28px', fontFamily: 'Georgia, serif', margin: '0 0 8px' }}>Pending Approvals</h1>
        <p style={{ color: '#7A7D85', fontSize: '14px', margin: 0 }}>{total} items waiting for review</p>
      </div>

      {loading ? (
        <div style={{ padding: '48px', textAlign: 'center' }}><p style={{ color: '#9A9DA5' }}>Loading...</p></div>
      ) : total === 0 ? (
        <div style={{ padding: '64px', textAlign: 'center', background: '#141619', borderRadius: '12px', border: '1px solid #252830' }}>
          <p style={{ fontSize: '32px', margin: '0 0 12px' }}>✅</p>
          <p style={{ color: '#EDEEF0', fontSize: '18px', fontWeight: '600', margin: '0 0 8px' }}>All caught up!</p>
          <p style={{ color: '#7A7D85', fontSize: '14px', margin: 0 }}>No pending approvals at this time.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

          {/* Interviews */}
          {interviews.length > 0 && (
            <div style={{ borderRadius: '12px', overflow: 'hidden', background: '#141619', border: '1px solid #252830' }}>
              <div style={{ padding: '14px 20px', borderBottom: '1px solid #252830', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={badgeStyle('#3B82F6')}>INTERVIEWS</span>
                <span style={{ color: '#7A7D85', fontSize: '12px' }}>{interviews.length} pending</span>
              </div>
              {interviews.map(item => (
                <div key={item.id} style={cardStyle}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ color: '#EDEEF0', fontSize: '14px', fontWeight: '500', margin: '0 0 2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.title}</p>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <p style={{ color: '#9A9DA5', fontSize: '12px', margin: 0 }}>{item.guest?.fullName}</p>
                      <span style={{ color: '#252830' }}>·</span>
                      <p style={{ color: '#7A7D85', fontSize: '12px', margin: 0 }}>{item.category?.name}</p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                    <button onClick={() => approve('interview', item.id)} style={{ background: '#22c55e', color: 'white', border: 'none', borderRadius: '6px', padding: '6px 14px', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}>Approve</button>
                    <button onClick={() => { setRejectId(item.id); setRejectType('interview'); }} style={{ background: 'rgba(239,68,68,0.1)', color: '#EF4444', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '6px', padding: '6px 14px', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}>Reject</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Articles */}
          {articles.length > 0 && (
            <div style={{ borderRadius: '12px', overflow: 'hidden', background: '#141619', border: '1px solid #252830' }}>
              <div style={{ padding: '14px 20px', borderBottom: '1px solid #252830', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={badgeStyle('#F59E0B')}>NEWSROOM</span>
                <span style={{ color: '#7A7D85', fontSize: '12px' }}>{articles.length} pending</span>
              </div>
              {articles.map(item => (
                <div key={item.id} style={cardStyle}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ color: '#EDEEF0', fontSize: '14px', fontWeight: '500', margin: '0 0 2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.title}</p>
                    <p style={{ color: '#9A9DA5', fontSize: '12px', margin: 0 }}>{item.category}</p>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                    <button onClick={() => approve('article', item.id)} style={{ background: '#22c55e', color: 'white', border: 'none', borderRadius: '6px', padding: '6px 14px', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}>Approve</button>
                    <button onClick={() => { setRejectId(item.id); setRejectType('article'); }} style={{ background: 'rgba(239,68,68,0.1)', color: '#EF4444', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '6px', padding: '6px 14px', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}>Reject</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Morning Digest */}
          {digests.length > 0 && (
            <div style={{ borderRadius: '12px', overflow: 'hidden', background: '#141619', border: '1px solid #252830' }}>
              <div style={{ padding: '14px 20px', borderBottom: '1px solid #252830', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={badgeStyle('#22C55E')}>MORNING DIGEST</span>
                <span style={{ color: '#7A7D85', fontSize: '12px' }}>{digests.length} pending</span>
              </div>
              {digests.map(item => (
                <div key={item.id} style={cardStyle}>
                  <div style={{ flex: 1 }}>
                    <p style={{ color: '#EDEEF0', fontSize: '14px', fontWeight: '500', margin: '0 0 2px' }}>{item.title}</p>
                    <p style={{ color: '#9A9DA5', fontSize: '12px', margin: 0 }}>{new Date(item.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                    <button onClick={() => approve('digest', item.id)} style={{ background: '#22c55e', color: 'white', border: 'none', borderRadius: '6px', padding: '6px 14px', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}>Approve</button>
                    <button onClick={() => { setRejectId(item.id); setRejectType('digest'); }} style={{ background: 'rgba(239,68,68,0.1)', color: '#EF4444', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '6px', padding: '6px 14px', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}>Reject</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Reject Modal */}
      {rejectId && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(8,9,11,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200, padding: '20px' }}>
          <div style={{ background: '#141619', border: '1px solid #252830', borderRadius: '16px', padding: '28px', width: '100%', maxWidth: '460px' }}>
            <h3 style={{ color: '#EDEEF0', fontSize: '18px', fontFamily: 'Georgia, serif', margin: '0 0 8px' }}>Reject Content</h3>
            <p style={{ color: '#7A7D85', fontSize: '14px', margin: '0 0 16px' }}>Provide a reason so the reporter can improve and resubmit.</p>
            <textarea
              value={rejectReason}
              onChange={e => setRejectReason(e.target.value)}
              rows={4}
              placeholder='e.g. Missing guest bio, incorrect category, needs more detail...'
              style={{ width: '100%', padding: '10px 14px', background: '#1C1E23', border: '1px solid #252830', borderRadius: '8px', color: '#EDEEF0', fontSize: '14px', outline: 'none', resize: 'none' as const, boxSizing: 'border-box' as const }}
            />
            <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
              <button onClick={reject} disabled={!rejectReason.trim()} style={{ flex: 1, padding: '10px', background: '#EF4444', color: 'white', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>Send Rejection</button>
              <button onClick={() => { setRejectId(''); setRejectReason(''); }} style={{ flex: 1, padding: '10px', background: 'transparent', color: '#9A9DA5', border: '1px solid #252830', borderRadius: '8px', fontSize: '14px', cursor: 'pointer' }}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
