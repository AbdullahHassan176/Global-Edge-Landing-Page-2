'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function AssetDetailPage() {
  const params = useParams();
  const router = useRouter();
  const assetKey = params.assetKey as string;

  useEffect(() => {
    // Redirect to investors tab by default
    router.replace(`/issuer/assets/${assetKey}/investors`);
  }, [assetKey, router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-global-teal mx-auto"></div>
        <p className="mt-2 text-gray-600">Loading asset details...</p>
      </div>
    </div>
  );
}
