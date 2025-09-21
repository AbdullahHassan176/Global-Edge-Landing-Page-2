import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

export default function StatusPage() {
  return (
    <>
      {/* COMPONENT: Status Hero */}
      <section id="status-hero" className="bg-gradient-to-br from-green-500 via-blue-500 to-purple-500 h-[300px] relative overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
          <div className="relative max-w-7xl mx-auto px-6 lg:px-8 h-full flex items-center">
              <div className="max-w-4xl text-white">
                  <h1 className="text-4xl lg:text-5xl font-poppins font-bold mb-4 leading-tight">
                      System Status
                  </h1>
                  <p className="text-xl font-inter font-light opacity-90">
                      Real-time status of all Global Edge services and systems.
                  </p>
              </div>
          </div>
      </section>

      {/* COMPONENT: Overall Status */}
      <section id="overall-status" className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <div className="flex items-center justify-between mb-8">
                      <div>
                          <h2 className="text-3xl font-poppins font-bold text-charcoal">All Systems Operational</h2>
                          <p className="text-gray-600">Last updated: December 20, 2024 at 2:30 PM EST</p>
                      </div>
                      <div className="flex items-center space-x-3">
                          <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                          <span className="text-green-600 font-semibold text-lg">Operational</span>
                      </div>
                  </div>
                  
                  <div className="grid md:grid-cols-4 gap-6">
                      <div className="text-center">
                          <div className="text-3xl font-poppins font-bold text-green-600 mb-2">99.9%</div>
                          <div className="text-sm text-gray-600">Uptime (30 days)</div>
                      </div>
                      <div className="text-center">
                          <div className="text-3xl font-poppins font-bold text-blue-600 mb-2">45ms</div>
                          <div className="text-sm text-gray-600">Avg Response Time</div>
                      </div>
                      <div className="text-center">
                          <div className="text-3xl font-poppins font-bold text-purple-600 mb-2">0</div>
                          <div className="text-sm text-gray-600">Active Incidents</div>
                      </div>
                      <div className="text-center">
                          <div className="text-3xl font-poppins font-bold text-orange-600 mb-2">12</div>
                          <div className="text-sm text-gray-600">Services Monitored</div>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      {/* COMPONENT: Service Status */}
      <section id="service-status" className="py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <h2 className="text-3xl font-poppins font-bold text-charcoal mb-12 text-center">Service Status</h2>
              
              <div className="space-y-6">
                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                      <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                  <FontAwesomeIcon icon="globe" className="text-green-600 text-xl" />
                              </div>
                              <div>
                                  <h3 className="text-xl font-poppins font-semibold text-charcoal">Website</h3>
                                  <p className="text-gray-600">Main website and user interface</p>
                              </div>
                          </div>
                          <div className="flex items-center space-x-3">
                              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                              <span className="text-green-600 font-semibold">Operational</span>
                          </div>
                      </div>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                      <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                  <FontAwesomeIcon icon="database" className="text-green-600 text-xl" />
                              </div>
                              <div>
                                  <h3 className="text-xl font-poppins font-semibold text-charcoal">API Services</h3>
                                  <p className="text-gray-600">REST API and GraphQL endpoints</p>
                              </div>
                          </div>
                          <div className="flex items-center space-x-3">
                              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                              <span className="text-green-600 font-semibold">Operational</span>
                          </div>
                      </div>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                      <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                  <FontAwesomeIcon icon="lock" className="text-green-600 text-xl" />
                              </div>
                              <div>
                                  <h3 className="text-xl font-poppins font-semibold text-charcoal">Authentication</h3>
                                  <p className="text-gray-600">User login and security services</p>
                              </div>
                          </div>
                          <div className="flex items-center space-x-3">
                              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                              <span className="text-green-600 font-semibold">Operational</span>
                          </div>
                      </div>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                      <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                  <FontAwesomeIcon icon="credit-card" className="text-green-600 text-xl" />
                              </div>
                              <div>
                                  <h3 className="text-xl font-poppins font-semibold text-charcoal">Payment Processing</h3>
                                  <p className="text-gray-600">Stripe and crypto payment services</p>
                              </div>
                          </div>
                          <div className="flex items-center space-x-3">
                              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                              <span className="text-green-600 font-semibold">Operational</span>
                          </div>
                      </div>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                      <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                  <FontAwesomeIcon icon="link" className="text-green-600 text-xl" />
                              </div>
                              <div>
                                  <h3 className="text-xl font-poppins font-semibold text-charcoal">Blockchain Services</h3>
                                  <p className="text-gray-600">Smart contracts and token management</p>
                              </div>
                          </div>
                          <div className="flex items-center space-x-3">
                              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                              <span className="text-green-600 font-semibold">Operational</span>
                          </div>
                      </div>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                      <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                  <FontAwesomeIcon icon="satellite" className="text-green-600 text-xl" />
                              </div>
                              <div>
                                  <h3 className="text-xl font-poppins font-semibold text-charcoal">Oracle Services</h3>
                                  <p className="text-gray-600">Asset monitoring and data feeds</p>
                              </div>
                          </div>
                          <div className="flex items-center space-x-3">
                              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                              <span className="text-green-600 font-semibold">Operational</span>
                          </div>
                      </div>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                      <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                  <FontAwesomeIcon icon="envelope" className="text-green-600 text-xl" />
                              </div>
                              <div>
                                  <h3 className="text-xl font-poppins font-semibold text-charcoal">Email Services</h3>
                                  <p className="text-gray-600">Notifications and communications</p>
                              </div>
                          </div>
                          <div className="flex items-center space-x-3">
                              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                              <span className="text-green-600 font-semibold">Operational</span>
                          </div>
                      </div>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                      <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                  <FontAwesomeIcon icon="comments" className="text-green-600 text-xl" />
                              </div>
                              <div>
                                  <h3 className="text-xl font-poppins font-semibold text-charcoal">Support Chat</h3>
                                  <p className="text-gray-600">Customer support and live chat</p>
                              </div>
                          </div>
                          <div className="flex items-center space-x-3">
                              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                              <span className="text-green-600 font-semibold">Operational</span>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      {/* COMPONENT: Performance Metrics */}
      <section id="performance-metrics" className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <h2 className="text-3xl font-poppins font-bold text-charcoal mb-12 text-center">Performance Metrics</h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                  <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <FontAwesomeIcon icon="tachometer-alt" className="text-blue-600 text-2xl" />
                      </div>
                      <h3 className="text-xl font-poppins font-semibold text-charcoal mb-2">Response Time</h3>
                      <div className="text-3xl font-poppins font-bold text-blue-600 mb-2">45ms</div>
                      <p className="text-sm text-gray-600">Average API response time</p>
                  </div>

                  <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <FontAwesomeIcon icon="chart-line" className="text-green-600 text-2xl" />
                      </div>
                      <h3 className="text-xl font-poppins font-semibold text-charcoal mb-2">Uptime</h3>
                      <div className="text-3xl font-poppins font-bold text-green-600 mb-2">99.9%</div>
                      <p className="text-sm text-gray-600">Last 30 days</p>
                  </div>

                  <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
                      <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <FontAwesomeIcon icon="users" className="text-purple-600 text-2xl" />
                      </div>
                      <h3 className="text-xl font-poppins font-semibold text-charcoal mb-2">Active Users</h3>
                      <div className="text-3xl font-poppins font-bold text-purple-600 mb-2">2,847</div>
                      <p className="text-sm text-gray-600">Currently online</p>
                  </div>

                  <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
                      <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <FontAwesomeIcon icon="server" className="text-orange-600 text-2xl" />
                      </div>
                      <h3 className="text-xl font-poppins font-semibold text-charcoal mb-2">Server Load</h3>
                      <div className="text-3xl font-poppins font-bold text-orange-600 mb-2">23%</div>
                      <p className="text-sm text-gray-600">Current capacity usage</p>
                  </div>
              </div>
          </div>
      </section>

      {/* COMPONENT: Recent Incidents */}
      <section id="recent-incidents" className="py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <h2 className="text-3xl font-poppins font-bold text-charcoal mb-12 text-center">Recent Incidents</h2>
              
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <div className="text-center py-12">
                      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                          <FontAwesomeIcon icon="check-circle" className="text-green-600 text-3xl" />
                      </div>
                      <h3 className="text-2xl font-poppins font-semibold text-charcoal mb-4">No Recent Incidents</h3>
                      <p className="text-gray-600 text-lg">
                          All systems have been operating normally for the past 30 days. 
                          We maintain 99.9% uptime and continuously monitor our infrastructure.
                      </p>
                  </div>
              </div>
          </div>
      </section>

      {/* COMPONENT: Maintenance Schedule */}
      <section id="maintenance-schedule" className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <h2 className="text-3xl font-poppins font-bold text-charcoal mb-12 text-center">Scheduled Maintenance</h2>
              
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <div className="text-center py-12">
                      <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                          <FontAwesomeIcon icon="calendar" className="text-blue-600 text-3xl" />
                      </div>
                      <h3 className="text-2xl font-poppins font-semibold text-charcoal mb-4">No Scheduled Maintenance</h3>
                      <p className="text-gray-600 text-lg">
                          There are no scheduled maintenance windows at this time. 
                          We will provide advance notice for any planned maintenance activities.
                      </p>
                  </div>
              </div>
          </div>
      </section>

      {/* COMPONENT: Status Updates */}
      <section id="status-updates" className="py-20">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
              <h2 className="text-3xl font-poppins font-bold text-charcoal mb-12 text-center">Stay Updated</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                          <FontAwesomeIcon icon="rss" className="text-blue-600 text-2xl" />
                      </div>
                      <h3 className="text-xl font-poppins font-semibold text-charcoal mb-4">RSS Feed</h3>
                      <p className="text-gray-600 mb-6">Subscribe to our status RSS feed for real-time updates</p>
                      <a href="/status.rss" className="text-global-teal hover:text-edge-purple font-medium">
                          Subscribe to RSS Feed
                      </a>
                  </div>

                  <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                          <FontAwesomeIcon icon="envelope" className="text-green-600 text-2xl" />
                      </div>
                      <h3 className="text-xl font-poppins font-semibold text-charcoal mb-4">Email Notifications</h3>
                      <p className="text-gray-600 mb-6">Get notified by email when incidents occur</p>
                      <button className="text-global-teal hover:text-edge-purple font-medium">
                          Subscribe to Updates
                      </button>
                  </div>
              </div>
          </div>
      </section>

      {/* COMPONENT: Contact Support */}
      <section id="status-contact" className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
              <h2 className="text-3xl font-poppins font-bold text-charcoal mb-6">Experiencing Issues?</h2>
              <p className="text-xl text-gray-600 mb-8">If you're experiencing problems not reflected in our status page, please contact our support team.</p>
              
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <div className="grid md:grid-cols-2 gap-8">
                      <div>
                          <h3 className="text-xl font-poppins font-semibold text-charcoal mb-4">Technical Support</h3>
                          <p className="text-gray-700">
                              Email: support@globaledge.com<br />
                              Phone: +1 (555) 012-3456<br />
                              Available: 24/7
                          </p>
                      </div>
                      <div>
                          <h3 className="text-xl font-poppins font-semibold text-charcoal mb-4">Status Updates</h3>
                          <p className="text-gray-700">
                              Twitter: @GlobalEdgeStatus<br />
                              Email: status@globaledge.com<br />
                              Updates: Real-time
                          </p>
                      </div>
                  </div>
              </div>
          </div>
      </section>
    </>
  );
}
