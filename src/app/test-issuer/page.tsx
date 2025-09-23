'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function TestIssuerPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the new test portal
    router.push('/test-portal');
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-global-teal to-edge-purple flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto"></div>
        <p className="mt-4 text-white">Redirecting to test portal...</p>
      </div>
    </div>
  );
}
