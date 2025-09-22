'use client';

import Link from 'next/link';
import Icon from '@/components/ui/Icon';
import AdminAuthGuard from '@/components/admin/AdminAuthGuard';

function AdminDashboard() {
  return (
    <div className="min-h-screen bg-soft-white">
      {/* Header */}
      <section className="bg-gradient-to-br from-global-teal to-edge-purple text-white py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-poppins font-bold mb-6">
              Admin Dashboard
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Manage notifications, monitor system activity, and oversee user submissions.
            </p>
          </div>
        </div>
      </section>

      {/* Admin Tools */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-poppins font-bold text-charcoal mb-4">Admin Tools</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Access all administrative functions and monitoring tools</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Notifications Dashboard */}
            <Link 
              href="/admin/notifications"
              className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-global-teal"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-global-teal to-edge-purple rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Icon name="bell" className="text-white text-2xl" />
              </div>
              <h3 className="text-2xl font-poppins font-bold text-charcoal mb-4 text-center">Notifications</h3>
              <p className="text-gray-600 text-center mb-6">
                Monitor all user submissions, email notifications, and webhook activity in real-time.
              </p>
              <div className="text-center">
                <span className="inline-flex items-center text-global-teal font-semibold group-hover:text-edge-purple transition-colors">
                  View Dashboard
                  <Icon name="arrow-right" className="ml-2" />
                </span>
              </div>
            </Link>

            {/* User Management */}
            <Link 
              href="/admin/users"
              className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-global-teal"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-global-teal to-edge-purple rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Icon name="users" className="text-white text-2xl" />
              </div>
              <h3 className="text-2xl font-poppins font-bold text-charcoal mb-4 text-center">User Management</h3>
              <p className="text-gray-600 text-center mb-6">
                Manage user accounts, permissions, and access controls across the platform.
              </p>
              <div className="text-center">
                <span className="inline-flex items-center text-global-teal font-semibold group-hover:text-edge-purple transition-colors">
                  View Dashboard
                  <Icon name="arrow-right" className="ml-2" />
                </span>
              </div>
            </Link>

            {/* System Analytics */}
            <Link 
              href="/admin/analytics"
              className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-global-teal"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-global-teal to-edge-purple rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Icon name="chart-line" className="text-white text-2xl" />
              </div>
              <h3 className="text-2xl font-poppins font-bold text-charcoal mb-4 text-center">Analytics</h3>
              <p className="text-gray-600 text-center mb-6">
                View detailed analytics, performance metrics, and system health monitoring.
              </p>
              <div className="text-center">
                <span className="inline-flex items-center text-global-teal font-semibold group-hover:text-edge-purple transition-colors">
                  View Dashboard
                  <Icon name="arrow-right" className="ml-2" />
                </span>
              </div>
            </Link>

            {/* Content Management */}
            <Link 
              href="/admin/content"
              className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-global-teal"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-global-teal to-edge-purple rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Icon name="file-alt" className="text-white text-2xl" />
              </div>
              <h3 className="text-2xl font-poppins font-bold text-charcoal mb-4 text-center">Content Management</h3>
              <p className="text-gray-600 text-center mb-6">
                Manage website content, assets, and marketing materials across the platform.
              </p>
              <div className="text-center">
                <span className="inline-flex items-center text-global-teal font-semibold group-hover:text-edge-purple transition-colors">
                  View Dashboard
                  <Icon name="arrow-right" className="ml-2" />
                </span>
              </div>
            </Link>

            {/* Security Center */}
            <Link 
              href="/admin/security"
              className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-global-teal"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-global-teal to-edge-purple rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Icon name="shield-halved" className="text-white text-2xl" />
              </div>
              <h3 className="text-2xl font-poppins font-bold text-charcoal mb-4 text-center">Security Center</h3>
              <p className="text-gray-600 text-center mb-6">
                Monitor security events, access logs, and system integrity across the platform.
              </p>
              <div className="text-center">
                <span className="inline-flex items-center text-global-teal font-semibold group-hover:text-edge-purple transition-colors">
                  View Dashboard
                  <Icon name="arrow-right" className="ml-2" />
                </span>
              </div>
            </Link>

            {/* Settings */}
            <Link 
              href="/admin/settings"
              className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-global-teal"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-global-teal to-edge-purple rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Icon name="cog" className="text-white text-2xl" />
              </div>
              <h3 className="text-2xl font-poppins font-bold text-charcoal mb-4 text-center">Settings</h3>
              <p className="text-gray-600 text-center mb-6">
                Configure system settings, integrations, and preferences across the platform.
              </p>
              <div className="text-center">
                <span className="inline-flex items-center text-global-teal font-semibold group-hover:text-edge-purple transition-colors">
                  View Dashboard
                  <Icon name="arrow-right" className="ml-2" />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-poppins font-bold text-charcoal mb-4">Quick Stats</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Overview of system activity and performance</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="user" className="text-blue-600 text-xl" />
              </div>
              <h3 className="text-2xl font-poppins font-bold text-charcoal mb-2">0</h3>
              <p className="text-gray-600">Total Users</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="check-circle" className="text-green-600 text-xl" />
              </div>
              <h3 className="text-2xl font-poppins font-bold text-charcoal mb-2">0</h3>
              <p className="text-gray-600">Active Submissions</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="paper-plane" className="text-purple-600 text-xl" />
              </div>
              <h3 className="text-2xl font-poppins font-bold text-charcoal mb-2">0</h3>
              <p className="text-gray-600">Emails Sent</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="link" className="text-orange-600 text-xl" />
              </div>
              <h3 className="text-2xl font-poppins font-bold text-charcoal mb-2">0</h3>
              <p className="text-gray-600">Webhooks Sent</p>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-poppins font-bold text-charcoal mb-8">Quick Navigation</h2>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link 
              href="/admin/notifications" 
              className="bg-global-teal text-white px-8 py-4 rounded-full font-poppins font-semibold text-lg hover:bg-opacity-90 transition-colors"
            >
              View Notifications Dashboard
            </Link>
            <Link 
              href="/" 
              className="border-2 border-global-teal text-global-teal px-8 py-4 rounded-full font-poppins font-semibold text-lg hover:bg-global-teal hover:text-white transition-colors"
            >
              Back to Homepage
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function AdminPage() {
  return (
    <AdminAuthGuard>
      <AdminDashboard />
    </AdminAuthGuard>
  );
}
