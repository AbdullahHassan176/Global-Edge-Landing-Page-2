import Icon from '@/components/ui/Icon';
import Link from 'next/link';

export default function WithdrawPage() {
  return (
    <div className="min-h-screen bg-soft-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-global-teal to-edge-purple text-white py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-poppins font-bold mb-6">
              Withdraw Funds
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Withdraw your earnings and available funds to your bank account securely.
            </p>
          </div>
        </div>
      </section>

      {/* Withdrawal Form */}
      <section className="py-20">
        <div className="max-w-2xl mx-auto px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-poppins font-bold text-charcoal mb-6">Withdrawal Request</h2>
            
            {/* Available Balance */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Available Balance</span>
                <span className="text-2xl font-bold text-global-teal">$15,230.00</span>
              </div>
            </div>

            {/* Withdrawal Form */}
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Withdrawal Amount
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                  <input
                    type="number"
                    placeholder="0.00"
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bank Account
                </label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-global-teal focus:border-transparent">
                  <option>**** **** **** 1234 (Primary)</option>
                  <option>**** **** **** 5678 (Savings)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Withdrawal Method
                </label>
                <div className="space-y-3">
                  <label className="flex items-center space-x-3">
                    <input type="radio" name="method" value="standard" defaultChecked className="text-global-teal" />
                    <span>Standard Transfer (3-5 business days)</span>
                  </label>
                  <label className="flex items-center space-x-3">
                    <input type="radio" name="method" value="express" className="text-global-teal" />
                    <span>Express Transfer (1-2 business days) - $25 fee</span>
                  </label>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Icon name="exclamation-triangle" className="text-yellow-600 text-sm mt-1"  />
                  <div>
                    <h4 className="font-medium text-yellow-800">Important Notice</h4>
                    <p className="text-sm text-yellow-700 mt-1">
                      Withdrawals are processed during business hours. Please ensure your bank account details are correct.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="flex-1 bg-global-teal text-white py-3 px-6 rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
                >
                  Request Withdrawal
                </button>
                <Link
                  href="/dashboard"
                  className="flex-1 bg-gray-200 text-gray-800 py-3 px-6 rounded-lg font-semibold hover:bg-gray-300 transition-colors text-center"
                >
                  Cancel
                </Link>
              </div>
            </form>
          </div>

          {/* Recent Withdrawals */}
          <div className="mt-12">
            <h3 className="text-xl font-poppins font-semibold text-charcoal mb-6">Recent Withdrawals</h3>
            <div className="space-y-4">
              <div className="bg-white rounded-lg p-4 shadow">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">$2,500.00</p>
                    <p className="text-sm text-gray-600">Completed • 3 days ago</p>
                  </div>
                  <div className="text-green-600">
                    <Icon name="check-circle" className="text-sm"  />
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">$1,000.00</p>
                    <p className="text-sm text-gray-600">Processing • 1 week ago</p>
                  </div>
                  <div className="text-yellow-600">
                    <Icon name="clock" className="text-sm"  />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
