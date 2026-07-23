'use client';

import { useEffect } from 'react';

export default function SignInPage() {
  useEffect(() => {
    window.location.href = 'https://big-wildcat-37.accounts.dev/sign-in';
  }, []);

  return (
    <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#08090B' }}>
      <p style={{ color: '#9A9DA5', fontFamily: 'monospace', fontSize: '12px' }}>Redirecting to sign in...</p>
    </main>
  );
}
