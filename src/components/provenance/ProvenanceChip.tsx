'use client';

import { useState } from 'react';
import Icon from '@/components/ui/Icon';

interface ProvenanceChipProps {
  assetKey: string;
  onOpenDrawer: (assetKey: string) => void;
}

export function ProvenanceChip({ assetKey, onOpenDrawer }: ProvenanceChipProps) {
  const handleClick = () => {
    onOpenDrawer(assetKey);
  };

  return (
    <button
      onClick={handleClick}
      className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-medium rounded-full border border-blue-200 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
      aria-label={`View provenance for asset ${assetKey}`}
    >
      <Icon name="link" className="w-3 h-3" />
      <span>Provenance</span>
    </button>
  );
}
