import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

export default function DashboardPage() {
  return (
    <>
      {/* COMPONENT: Dashboard Hero */}
      <section id="dashboard-hero" className="bg-gradient-to-br from-global-teal via-edge-purple to-aqua-end h-[300px] relative overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
          <div className="relative max-w-7xl mx-auto px-6 lg:px-8 h-full flex items-center">
              <div className="max-w-4xl text-white">
                  <h1 className="text-4xl lg:text-5xl font-poppins font-bold mb-4 leading-tight">
                      Investor Dashboard
                  </h1>
                  <p className="text-xl font-inter font-light opacity-90">
                      Track your investments, monitor performance, and manage your tokenized asset portfolio.
                  </p>
              </div>
          </div>
      </section>

      {/* COMPONENT: Portfolio Overview */}
      <section id="portfolio-overview" className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="grid md:grid-cols-4 gap-6">
                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                      <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-poppins font-semibold text-charcoal">Total Portfolio Value</h3>
                          <FontAwesomeIcon icon="chart-line" className="text-global-teal text-xl" />
                      </div>
                      <div className="text-3xl font-poppins font-bold text-global-teal mb-2">$125,430</div>
                      <div className="text-sm text-green-600">+12.4% this month</div>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                      <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-poppins font-semibold text-charcoal">Active Investments</h3>
                          <FontAwesomeIcon icon="coins" className="text-blue-600 text-xl" />
                      </div>
                      <div className="text-3xl font-poppins font-bold text-blue-600 mb-2">8</div>
                      <div className="text-sm text-gray-600">Across 4 asset types</div>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                      <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-poppins font-semibold text-charcoal">Total Returns</h3>
                          <FontAwesomeIcon icon="trophy" className="text-green-600 text-xl" />
                      </div>
                      <div className="text-3xl font-poppins font-bold text-green-600 mb-2">$15,230</div>
                      <div className="text-sm text-gray-600">Lifetime earnings</div>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                      <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-poppins font-semibold text-charcoal">Avg. APR</h3>
                          <FontAwesomeIcon icon="percentage" className="text-purple-600 text-xl" />
                      </div>
                      <div className="text-3xl font-poppins font-bold text-purple-600 mb-2">14.2%</div>
                      <div className="text-sm text-gray-600">Weighted average</div>
                  </div>
              </div>
          </div>
      </section>

      {/* COMPONENT: Recent Activity */}
      <section id="recent-activity" className="py-12">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="flex items-center justify-between mb-8">
                  <h2 className="text-3xl font-poppins font-bold text-charcoal">Recent Activity</h2>
                  <Link href="/activity" className="text-global-teal hover:text-edge-purple font-medium">
                      View All Activity
                      <FontAwesomeIcon icon="arrow-right" className="ml-2" />
                  </Link>
              </div>

              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  <div className="overflow-x-auto">
                      <table className="w-full">
                          <thead className="bg-gray-50">
                              <tr>
                                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Date</th>
                                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Asset</th>
                                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Type</th>
                                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Amount</th>
                                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Status</th>
                              </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                              <tr>
                                  <td className="px-6 py-4 text-sm text-gray-900">Dec 20, 2024</td>
                                  <td className="px-6 py-4 text-sm text-gray-900">CONT-SH-LA-2024-001</td>
                                  <td className="px-6 py-4 text-sm text-gray-900">Investment</td>
                                  <td className="px-6 py-4 text-sm text-gray-900">$5,000</td>
                                  <td className="px-6 py-4">
                                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">Active</span>
                                  </td>
                              </tr>
                              <tr>
                                  <td className="px-6 py-4 text-sm text-gray-900">Dec 18, 2024</td>
                                  <td className="px-6 py-4 text-sm text-gray-900">PROP-NYC-2024-045</td>
                                  <td className="px-6 py-4 text-sm text-gray-900">Dividend</td>
                                  <td className="px-6 py-4 text-sm text-gray-900">$1,250</td>
                                  <td className="px-6 py-4">
                                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">Paid</span>
                                  </td>
                              </tr>
                              <tr>
                                  <td className="px-6 py-4 text-sm text-gray-900">Dec 15, 2024</td>
                                  <td className="px-6 py-4 text-sm text-gray-900">VAULT-GOLD-2024-012</td>
                                  <td className="px-6 py-4 text-sm text-gray-900">Investment</td>
                                  <td className="px-6 py-4 text-sm text-gray-900">$2,500</td>
                                  <td className="px-6 py-4">
                                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">Active</span>
                                  </td>
                              </tr>
                          </tbody>
                      </table>
                  </div>
              </div>
          </div>
      </section>

      {/* COMPONENT: Asset Portfolio */}
      <section id="asset-portfolio" className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="flex items-center justify-between mb-8">
                  <h2 className="text-3xl font-poppins font-bold text-charcoal">Your Asset Portfolio</h2>
                  <Link href="/assets" className="text-global-teal hover:text-edge-purple font-medium">
                      Browse More Assets
                      <FontAwesomeIcon icon="arrow-right" className="ml-2" />
                  </Link>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                      <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-3">
                              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                  <FontAwesomeIcon icon="ship" className="text-blue-600 text-xl" />
                              </div>
                              <div>
                                  <h3 className="font-poppins font-semibold text-charcoal">CONT-SH-LA-2024-001</h3>
                                  <p className="text-sm text-gray-600">Container • Shanghai → LA</p>
                              </div>
                          </div>
                          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">Active</span>
                      </div>
                      <div className="space-y-3">
                          <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Investment</span>
                              <span className="font-semibold">$5,000</span>
                          </div>
                          <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Current Value</span>
                              <span className="font-semibold text-green-600">$5,420</span>
                          </div>
                          <div className="flex justify-between">
                              <span className="text-sm text-gray-600">APR</span>
                              <span className="font-semibold text-global-teal">14.2%</span>
                          </div>
                          <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Maturity</span>
                              <span className="font-semibold">Jan 15, 2025</span>
                          </div>
                      </div>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                      <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-3">
                              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                  <FontAwesomeIcon icon="building" className="text-green-600 text-xl" />
                              </div>
                              <div>
                                  <h3 className="font-poppins font-semibold text-charcoal">PROP-NYC-2024-045</h3>
                                  <p className="text-sm text-gray-600">Property • New York</p>
                              </div>
                          </div>
                          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">Active</span>
                      </div>
                      <div className="space-y-3">
                          <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Investment</span>
                              <span className="font-semibold">$10,000</span>
                          </div>
                          <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Current Value</span>
                              <span className="font-semibold text-green-600">$10,850</span>
                          </div>
                          <div className="flex justify-between">
                              <span className="text-sm text-gray-600">APR</span>
                              <span className="font-semibold text-global-teal">8.5%</span>
                          </div>
                          <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Maturity</span>
                              <span className="font-semibold">Dec 15, 2025</span>
                          </div>
                      </div>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                      <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-3">
                              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                                  <FontAwesomeIcon icon="vault" className="text-orange-600 text-xl" />
                              </div>
                              <div>
                                  <h3 className="font-poppins font-semibold text-charcoal">VAULT-GOLD-2024-012</h3>
                                  <p className="text-sm text-gray-600">Vault • Gold Storage</p>
                              </div>
                          </div>
                          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">Active</span>
                      </div>
                      <div className="space-y-3">
                          <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Investment</span>
                              <span className="font-semibold">$2,500</span>
                          </div>
                          <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Current Value</span>
                              <span className="font-semibold text-green-600">$2,650</span>
                          </div>
                          <div className="flex justify-between">
                              <span className="text-sm text-gray-600">APR</span>
                              <span className="font-semibold text-global-teal">6.0%</span>
                          </div>
                          <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Maturity</span>
                              <span className="font-semibold">Jun 15, 2025</span>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      {/* COMPONENT: Quick Actions */}
      <section id="quick-actions" className="py-12">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <h2 className="text-3xl font-poppins font-bold text-charcoal mb-8">Quick Actions</h2>
              
              <div className="grid md:grid-cols-4 gap-6">
                  <Link href="/assets" className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow text-center group">
                      <div className="w-16 h-16 bg-global-teal rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-opacity-90 transition-colors">
                          <FontAwesomeIcon icon="plus" className="text-white text-2xl" />
                      </div>
                      <h3 className="font-poppins font-semibold text-charcoal mb-2">Invest in Assets</h3>
                      <p className="text-sm text-gray-600">Browse and invest in new tokenized assets</p>
                  </Link>

                  <Link href="/withdraw" className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow text-center group">
                      <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-opacity-90 transition-colors">
                          <FontAwesomeIcon icon="download" className="text-white text-2xl" />
                      </div>
                      <h3 className="font-poppins font-semibold text-charcoal mb-2">Withdraw Funds</h3>
                      <p className="text-sm text-gray-600">Withdraw your earnings to your bank account</p>
                  </Link>

                  <Link href="/reports" className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow text-center group">
                      <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-opacity-90 transition-colors">
                          <FontAwesomeIcon icon="chart-bar" className="text-white text-2xl" />
                      </div>
                      <h3 className="font-poppins font-semibold text-charcoal mb-2">View Reports</h3>
                      <p className="text-sm text-gray-600">Download detailed performance reports</p>
                  </Link>

                  <Link href="/settings" className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow text-center group">
                      <div className="w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-opacity-90 transition-colors">
                          <FontAwesomeIcon icon="cog" className="text-white text-2xl" />
                      </div>
                      <h3 className="font-poppins font-semibold text-charcoal mb-2">Account Settings</h3>
                      <p className="text-sm text-gray-600">Manage your account preferences</p>
                  </Link>
              </div>
          </div>
      </section>

      {/* COMPONENT: CTA Section */}
      <section id="dashboard-cta" className="py-20 bg-gradient-to-br from-global-teal to-edge-purple">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
              <h2 className="text-4xl lg:text-5xl font-poppins font-bold text-white mb-6">
                  Ready to Grow Your Portfolio?
              </h2>
              <p className="text-xl text-white opacity-90 mb-8">
                  Explore new investment opportunities and diversify your tokenized asset portfolio.
              </p>
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                  <Link href="/assets" className="bg-white text-global-teal px-8 py-4 rounded-full font-poppins font-semibold text-lg hover:bg-opacity-90 transition-colors">
                      Browse Assets
                  </Link>
                  <Link href="/insights" className="border-2 border-white text-white px-8 py-4 rounded-full font-poppins font-semibold text-lg hover:bg-white hover:text-global-teal transition-colors">
                      Read Insights
                  </Link>
              </div>
          </div>
      </section>
    </>
  );
}
