'use client';

import { useState } from 'react';
import { useParams, usePathname } from 'next/navigation';
import Link from 'next/link';
import Icon from '@/components/ui/Icon';
import QuickActionBar from '@/components/issuer/QuickActionBar';

interface AssetDetailLayoutProps {
  children: React.ReactNode;
}

export default function AssetDetailLayout({ children }: AssetDetailLayoutProps) {
  const params = useParams();
  const pathname = usePathname();
  const assetKey = params.assetKey as string;

  const tabs = [
    {
      id: 'investors',
      label: 'Investors',
      href: `/issuer/assets/${assetKey}/investors`,
      icon: 'users'
    },
    {
      id: 'provenance',
      label: 'Provenance',
      href: `/issuer/assets/${assetKey}/provenance`,
      icon: 'clock'
    },
    {
      id: 'admin',
      label: 'Admin',
      href: `/issuer/assets/${assetKey}/admin`,
      icon: 'cog-6-tooth'
    }
  ];

  const getCurrentTab = () => {
    if (pathname.includes('/investors')) return 'investors';
    if (pathname.includes('/provenance')) return 'provenance';
    if (pathname.includes('/admin')) return 'admin';
    return 'investors'; // default
  };

  const currentTab = getCurrentTab();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4">
            <nav className="flex" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-4">
                <li>
                  <Link href="/issuer/dashboard" className="text-gray-400 hover:text-gray-500">
                    <Icon name="home" className="h-5 w-5" />
                    <span className="sr-only">Home</span>
                  </Link>
                </li>
                <li>
                  <div className="flex items-center">
                    <Icon name="chevron-right" className="h-5 w-5 text-gray-400" />
                    <Link href="/issuer/assets" className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">
                      Assets
                    </Link>
                  </div>
                </li>
                <li>
                  <div className="flex items-center">
                    <Icon name="chevron-right" className="h-5 w-5 text-gray-400" />
                    <span className="ml-4 text-sm font-medium text-gray-900 truncate">
                      {assetKey}
                    </span>
                  </div>
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Asset Details</h1>
                <p className="mt-1 text-sm text-gray-500">
                  Manage investors, track provenance, and configure admin settings
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  <Icon name="check-circle" className="w-4 h-4 mr-1" />
                  Active
                </span>
              </div>
            </div>
            
            {/* Quick Actions Bar */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Quick Actions</h3>
                  <p className="text-xs text-gray-500">Administrative actions for this asset</p>
                </div>
                <QuickActionBar assetKey={assetKey} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              {tabs.map((tab) => (
                <Link
                  key={tab.id}
                  href={tab.href}
                  className={`${
                    currentTab === tab.id
                      ? 'border-global-teal text-global-teal'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
                >
                  <Icon name={tab.icon} className="w-5 h-5 mr-2" />
                  {tab.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </div>
    </div>
  );
}
