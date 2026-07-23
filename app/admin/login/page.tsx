'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
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
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push('/admin');
      router.refresh();
    } else {
      setError('Invalid password. Please try again.');
      setLoading(false);
    }
  }

  return (
    <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#08090B' }}>
      <div style={{ width: '100%', maxWidth: '400px', padding: '0 16px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ width: '48px', height: '48px', background: 'linear-gradient(135deg, #D4A832, #F5D98A)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            <span style={{ color: '#08090B', fontWeight: 'bold', fontSize: '20px' }}>B</span>
          </div>
          <h1 style={{ color: 'white', fontSize: '28px', fontFamily: 'Georgia, serif', margin: '0 0 8px' }}>
            BTV LIVE Admin
          </h1>
          <p style={{ color: '#9A9DA5', fontSize: '14px', margin: 0 }}>
            Enter your admin password to continue
          </p>
        </div>

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', color: '#D4D6DA', fontSize: '13px', fontWeight: '500', marginBottom: '6px' }}>
              Password
            </label>
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Enter admin password'
              required
              style={{
                width: '100%',
                padding: '12px 16px',
                background: '#141619',
                border: '1px solid #252830',
                borderRadius: '10px',
                color: '#EDEEF0',
                fontSize: '14px',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          </div>

          {error && (
            <p style={{ color: '#E0304F', fontSize: '13px', marginBottom: '16px' }}>{error}</p>
          )}

          <button
            type='submit'
            disabled={loading}
            style={{
              width: '100%',
              padding: '12px',
              background: loading ? '#8C6510' : '#D4A832',
              color: '#08090B',
              border: 'none',
              borderRadius: '999px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer',
            }}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p style={{ textAlign: 'center', color: '#5C6070', fontSize: '12px', marginTop: '24px' }}>
          BTV LIVE Admin Panel — Restricted Access
        </p>
      </div>
    </main>
  );
}
