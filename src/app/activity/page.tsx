import Icon from '@/components/ui/Icon';
import Link from 'next/link';

export default function ActivityPage() {
  return (
    <div className="min-h-screen bg-soft-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-global-teal to-edge-purple text-white py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-poppins font-bold mb-6">
              Investment Activity
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Track all your investment activities, transactions, and portfolio changes in real-time.
            </p>
          </div>
        </div>
      </section>

      {/* Activity Timeline */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-poppins font-bold text-charcoal mb-8 text-center">Recent Activity</h2>
          
          <div className="space-y-6">
            {/* Activity Item 1 */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Icon name="plus" className="text-green-600 text-sm"  />
                </div>
                <div className="flex-1">
                  <h3 className="font-poppins font-semibold text-charcoal">New Investment</h3>
                  <p className="text-gray-600">Invested $5,000 in CONT-SH-LA-2024-001</p>
                  <p className="text-sm text-gray-500">2 hours ago</p>
                </div>
                <div className="text-right">
                  <div className="text-green-600 font-semibold">+$5,000</div>
                </div>
              </div>
            </div>

            {/* Activity Item 2 */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Icon name="chart-line" className="text-blue-600 text-sm"  />
                </div>
                <div className="flex-1">
                  <h3 className="font-poppins font-semibold text-charcoal">Portfolio Update</h3>
                  <p className="text-gray-600">Portfolio value increased by 2.3%</p>
                  <p className="text-sm text-gray-500">1 day ago</p>
                </div>
                <div className="text-right">
                  <div className="text-green-600 font-semibold">+$1,150</div>
                </div>
              </div>
            </div>

            {/* Activity Item 3 */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Icon name="download" className="text-purple-600 text-sm"  />
                </div>
                <div className="flex-1">
                  <h3 className="font-poppins font-semibold text-charcoal">Withdrawal</h3>
                  <p className="text-gray-600">Withdrew $2,500 to bank account</p>
                  <p className="text-sm text-gray-500">3 days ago</p>
                </div>
                <div className="text-right">
                  <div className="text-red-600 font-semibold">-$2,500</div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <Link href="/dashboard" className="bg-global-teal text-white px-8 py-4 rounded-full font-poppins font-semibold text-lg hover:bg-opacity-90 transition-colors">
              Back to Dashboard
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
