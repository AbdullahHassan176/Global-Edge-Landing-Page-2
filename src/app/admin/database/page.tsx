'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/Icon';

interface DatabaseStats {
  connection: string;
  timestamp: string;
  stats: {
    databaseId: string;
    containerCount: number;
    containers: Array<{
      id: string;
      partitionKey: string;
    }>;
  };
}

export default function DatabasePage() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DatabaseStats | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [testResults, setTestResults] = useState<any[]>([]);

  useEffect(() => {
    testDatabaseConnection();
  }, []);

  const testDatabaseConnection = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/database/test');
      const data = await response.json();
      
      if (data.success) {
        setStats(data.data);
        setTestResults(prev => [...prev, {
          timestamp: new Date().toISOString(),
          status: 'success',
          message: 'Database connection successful'
        }]);
      } else {
        setError(data.error);
        setTestResults(prev => [...prev, {
          timestamp: new Date().toISOString(),
          status: 'error',
          message: data.error
        }]);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      setTestResults(prev => [...prev, {
        timestamp: new Date().toISOString(),
        status: 'error',
        message: errorMessage
      }]);
    } finally {
      setLoading(false);
    }
  };

  const runSampleQueries = async () => {
    setLoading(true);
    const queries = [
      { name: 'Get Users', url: '/api/users' },
      { name: 'Get Assets', url: '/api/assets' },
      { name: 'Get Investments', url: '/api/investments' }
    ];

    // Initialize results array with proper TypeScript typing
    const results: Array<{query: string, success: boolean, data?: any, error?: string, count?: number}> = [];
    for (const query of queries) {
      try {
        const response = await fetch(query.url);
        const data = await response.json();
        results.push({
          query: query.name,
          success: data.success,
          count: data.data?.items?.length || 0,
          error: data.error
        });
      } catch (err) {
        results.push({
          query: query.name,
          success: false,
          count: 0,
          error: err instanceof Error ? err.message : 'Unknown error'
        });
      }
    }

    setTestResults(prev => [...prev, ...results.map(r => ({
      timestamp: new Date().toISOString(),
      status: r.success ? 'success' : 'error',
      message: `${r.query}: ${r.success ? `${r.count} items` : r.error}`
    }))]);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Database Management</h1>
          <p className="mt-2 text-gray-600">Monitor and manage your Azure Cosmos DB connection</p>
        </div>

        {/* Connection Status */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Connection Status</h2>
            <button
              onClick={testDatabaseConnection}
              disabled={loading}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-global-teal hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-global-teal disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Icon name="arrow-path" className="animate-spin -ml-1 mr-2 h-4 w-4" />
                  Testing...
                </>
              ) : (
                <>
                  <Icon name="arrow-path" className="-ml-1 mr-2 h-4 w-4" />
                  Test Connection
                </>
              )}
            </button>
          </div>

          {stats && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center">
                  <Icon name="check-circle" className="h-5 w-5 text-green-600 mr-2" />
                  <span className="text-sm font-medium text-green-800">Connection</span>
                </div>
                <p className="text-lg font-semibold text-green-900 mt-1">{stats.connection}</p>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center">
                  <Icon name="server" className="h-5 w-5 text-blue-600 mr-2" />
                  <span className="text-sm font-medium text-blue-800">Database</span>
                </div>
                <p className="text-lg font-semibold text-blue-900 mt-1">{stats.stats.databaseId}</p>
              </div>
              
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <div className="flex items-center">
                  <Icon name="cube" className="h-5 w-5 text-purple-600 mr-2" />
                  <span className="text-sm font-medium text-purple-800">Containers</span>
                </div>
                <p className="text-lg font-semibold text-purple-900 mt-1">{stats.stats.containerCount}</p>
              </div>
            </div>
          )}

          {error && (
            <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center">
                <Icon name="exclamation-triangle" className="h-5 w-5 text-red-600 mr-2" />
                <span className="text-sm font-medium text-red-800">Connection Error</span>
              </div>
              <p className="text-red-700 mt-1">{error}</p>
            </div>
          )}
        </div>

        {/* Database Statistics */}
        {stats && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Database Statistics</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Container
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Partition Key
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {stats.stats.containers.map((container) => (
                    <tr key={container.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {container.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {container.partitionKey}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <Icon name="check-circle" className="h-3 w-3 mr-1" />
                          Active
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Test Operations */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Test Operations</h2>
            <button
              onClick={runSampleQueries}
              disabled={loading}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Icon name="arrow-path" className="animate-spin -ml-1 mr-2 h-4 w-4" />
                  Running...
                </>
              ) : (
                <>
                  <Icon name="play" className="-ml-1 mr-2 h-4 w-4" />
                  Run Sample Queries
                </>
              )}
            </button>
          </div>
          
          <p className="text-gray-600 mb-4">
            Test basic CRUD operations on your database collections.
          </p>
        </div>

        {/* Test Results */}
        {testResults.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Test Results</h2>
            <div className="space-y-2">
              {testResults.map((result, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-3 rounded-lg ${
                    result.status === 'success'
                      ? 'bg-green-50 border border-green-200'
                      : 'bg-red-50 border border-red-200'
                  }`}
                >
                  <div className="flex items-center">
                    <Icon
                      name={result.status === 'success' ? 'check-circle' : 'exclamation-triangle'}
                      className={`h-4 w-4 mr-2 ${
                        result.status === 'success' ? 'text-green-600' : 'text-red-600'
                      }`}
                    />
                    <span className="text-sm font-medium text-gray-900">{result.message}</span>
                  </div>
                  <span className="text-xs text-gray-500">
                    {new Date(result.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
