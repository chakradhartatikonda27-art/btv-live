'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (res.ok) {
      localStorage.setItem('btv_admin_auth', data.id || 'super_admin');
      localStorage.setItem('btv_admin_role', data.role);
      localStorage.setItem('btv_admin_name', data.name);
      router.push('/admin');
      router.refresh();
    } else {
      setError(data.error || 'Invalid credentials');
      setLoading(false);
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#08090B', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div style={{ width: '100%', maxWidth: '420px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <Image src='/btv-logo.jpg' alt='BTV LIVE' width={80} height={80} style={{ borderRadius: '8px', objectFit: 'contain', margin: '0 auto 16px' }} />
          <h1 style={{ color: '#EDEEF0', fontSize: '24px', fontWeight: '700', margin: '0 0 8px', fontFamily: 'var(--font-sora, sans-serif)' }}>BTV LIVE Admin</h1>
          <p style={{ color: '#7A7D85', fontSize: '14px', margin: 0 }}>Sign in to your account</p>
        </div>
        <div style={{ background: '#141619', border: '1px solid #252830', borderRadius: '16px', padding: '28px' }}>
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', color: '#D4D6DA', fontSize: '13px', fontWeight: '500', marginBottom: '6px' }}>Email Address</label>
              <input type='email' value={email} onChange={e => setEmail(e.target.value)} placeholder='your@email.com' required style={{ width: '100%', padding: '11px 14px', background: '#1C1E23', border: '1px solid #252830', borderRadius: '8px', color: '#EDEEF0', fontSize: '14px', outline: 'none', boxSizing: 'border-box' as const }} />
            </div>
            <div>
              <label style={{ display: 'block', color: '#D4D6DA', fontSize: '13px', fontWeight: '500', marginBottom: '6px' }}>Password</label>
              <input type='password' value={password} onChange={e => setPassword(e.target.value)} placeholder='Enter password' required style={{ width: '100%', padding: '11px 14px', background: '#1C1E23', border: '1px solid #252830', borderRadius: '8px', color: '#EDEEF0', fontSize: '14px', outline: 'none', boxSizing: 'border-box' as const }} />
            </div>
            {error && <p style={{ color: '#EF4444', fontSize: '13px', margin: 0 }}>{error}</p>}
            <button type='submit' disabled={loading} style={{ padding: '12px', background: loading ? '#8C6510' : '#D4A832', color: '#08090B', border: 'none', borderRadius: '8px', fontSize: '15px', fontWeight: '700', cursor: loading ? 'not-allowed' : 'pointer' }}>
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
          <p style={{ textAlign: 'center', color: '#5C6070', fontSize: '12px', marginTop: '20px', margin: '20px 0 0' }}>BTV LIVE Admin Panel — Restricted Access</p>
        </div>
      </div>
    </div>
  );
}
