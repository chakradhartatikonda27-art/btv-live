'use client';
import { useState } from 'react';

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    name: '', email: '', phone: '', subject: '', message: '', type: 'GENERAL',
  });

  function update(field: string, value: string) { setForm(p => ({ ...p, [field]: value })); }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (res.ok) { setSuccess(true); setForm({ name: '', email: '', phone: '', subject: '', message: '', type: 'GENERAL' }); }
    else { setError('Something went wrong. Please try again.'); }
    setLoading(false);
  }

  const inputStyle = { width: '100%', padding: '12px 16px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '10px', color: 'var(--text-primary)', fontSize: '14px', outline: 'none', boxSizing: 'border-box' as const, transition: 'border-color 0.2s' };
  const labelStyle = { display: 'block' as const, color: 'var(--text-secondary)', fontSize: '13px', fontWeight: '500' as const, marginBottom: '6px' };

  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg-primary)', paddingTop: '80px', paddingBottom: '60px' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 16px' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <p style={{ color: 'var(--accent-gold)', fontFamily: 'monospace', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', margin: '0 0 12px' }}>Get In Touch</p>
          <h1 style={{ color: 'var(--text-primary)', fontSize: 'clamp(28px, 5vw, 48px)', fontFamily: 'Georgia, serif', margin: '0 0 16px' }}>Contact BTV LIVE</h1>
          <p style={{ color: 'var(--text-subtle)', fontSize: '16px', margin: 0 }}>Have a story to share? Want to advertise? We'd love to hear from you.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
          
          {/* Contact Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ padding: '24px', borderRadius: '16px', background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
              <h3 style={{ color: 'var(--text-primary)', fontSize: '18px', fontFamily: 'Georgia, serif', margin: '0 0 20px' }}>Contact Information</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '20px', flexShrink: 0 }}>📧</span>
                  <div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '12px', margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Email</p>
                    <a href='mailto:btvliveindia@gmail.com' style={{ color: 'var(--accent-gold)', fontSize: '14px', textDecoration: 'none', fontWeight: '500' }}>btvliveindia@gmail.com</a>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '20px', flexShrink: 0 }}>📞</span>
                  <div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '12px', margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Phone</p>
                    <a href='tel:+919885126368' style={{ color: 'var(--accent-gold)', fontSize: '14px', textDecoration: 'none', fontWeight: '500' }}>+91-9885126368</a>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '20px', flexShrink: 0 }}>💬</span>
                  <div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '12px', margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>WhatsApp</p>
                    <a href='https://wa.me/919885126368' target='_blank' rel='noopener noreferrer' style={{ color: '#25D366', fontSize: '14px', textDecoration: 'none', fontWeight: '500' }}>Chat on WhatsApp</a>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ padding: '24px', borderRadius: '16px', background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
              <h3 style={{ color: 'var(--text-primary)', fontSize: '18px', fontFamily: 'Georgia, serif', margin: '0 0 16px' }}>What We Offer</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {['Business Interviews & Features', 'Award Ceremonies Coverage', 'Corporate Event Coverage', 'Advertisement & Sponsorship', 'Business Directory Listing', 'Morning Digest Sponsorship'].map(item => (
                  <div key={item} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <span style={{ color: 'var(--accent-gold)', fontSize: '12px' }}>◆</span>
                    <p style={{ color: 'var(--text-muted)', fontSize: '13px', margin: 0 }}>{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ padding: '24px', borderRadius: '16px', background: 'linear-gradient(135deg, #0D0F12, #141619)', border: '1px solid rgba(212,168,50,0.2)' }}>
              <p style={{ color: 'var(--text-muted)', fontSize: '12px', margin: '0 0 8px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Business Hours</p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px', margin: 0 }}>Monday – Saturday</p>
              <p style={{ color: 'var(--accent-gold)', fontSize: '16px', fontWeight: '600', margin: '4px 0 0' }}>9:00 AM – 6:00 PM IST</p>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            {success ? (
              <div style={{ padding: '48px 32px', borderRadius: '16px', background: 'var(--bg-card)', border: '1px solid rgba(34,197,94,0.3)', textAlign: 'center' }}>
                <p style={{ fontSize: '48px', margin: '0 0 16px' }}>✅</p>
                <h3 style={{ color: '#22c55e', fontSize: '22px', fontFamily: 'Georgia, serif', margin: '0 0 12px' }}>Message Sent!</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '14px', margin: '0 0 24px' }}>Thank you for reaching out. Our team will get back to you within 24 hours.</p>
                <button onClick={() => setSuccess(false)} style={{ background: 'var(--accent-gold)', color: '#08090B', border: 'none', borderRadius: '999px', padding: '10px 24px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '28px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <h3 style={{ color: 'var(--text-primary)', fontSize: '20px', fontFamily: 'Georgia, serif', margin: 0 }}>Send Us a Message</h3>

                  <div>
                    <label style={labelStyle}>Enquiry Type</label>
                    <select value={form.type} onChange={e => update('type', e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
                      <option value='GENERAL'>General Enquiry</option>
                      <option value='INTERVIEW'>Interview / Feature Request</option>
                      <option value='ADVERTISEMENT'>Advertisement & Sponsorship</option>
                      <option value='EVENT'>Event Coverage</option>
                      <option value='DIRECTORY'>Business Directory Listing</option>
                      <option value='CAREER'>Career / Join BTV LIVE</option>
                      <option value='OTHER'>Other</option>
                    </select>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={labelStyle}>Your Name *</label>
                      <input type='text' value={form.name} onChange={e => update('name', e.target.value)} required placeholder='John Doe' style={inputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>Phone</label>
                      <input type='tel' value={form.phone} onChange={e => update('phone', e.target.value)} placeholder='+91 98765 43210' style={inputStyle} />
                    </div>
                  </div>

                  <div>
                    <label style={labelStyle}>Email *</label>
                    <input type='email' value={form.email} onChange={e => update('email', e.target.value)} required placeholder='your@email.com' style={inputStyle} />
                  </div>

                  <div>
                    <label style={labelStyle}>Subject *</label>
                    <input type='text' value={form.subject} onChange={e => update('subject', e.target.value)} required placeholder='How can we help you?' style={inputStyle} />
                  </div>

                  <div>
                    <label style={labelStyle}>Message *</label>
                    <textarea value={form.message} onChange={e => update('message', e.target.value)} required rows={5} placeholder='Tell us more about your enquiry...' style={{ ...inputStyle, resize: 'vertical' as const }} />
                  </div>

                  {error && <p style={{ color: '#EF4444', fontSize: '13px', margin: 0 }}>{error}</p>}

                  <button type='submit' disabled={loading} style={{ padding: '14px', background: loading ? '#8C6510' : '#D4A832', color: '#08090B', border: 'none', borderRadius: '999px', fontSize: '15px', fontWeight: '700', cursor: loading ? 'not-allowed' : 'pointer', letterSpacing: '0.02em' }}>
                    {loading ? 'Sending...' : 'Send Message →'}
                  </button>

                  <p style={{ color: 'var(--text-faint)', fontSize: '12px', textAlign: 'center' as const, margin: 0 }}>
                    We respond within 24 business hours
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
