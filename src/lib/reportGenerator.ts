// Report generation utilities for PDF and CSV downloads

export interface ReportData {
  title: string;
  generatedAt: string;
  data: any[];
  summary?: {
    totalValue?: number;
    totalInvestments?: number;
    averageReturn?: number;
    riskLevel?: string;
    overallRisk?: string;
    diversificationScore?: number;
    volatilityIndex?: number;
    [key: string]: any; // Allow additional summary properties
  };
}

export class ReportGenerator {
  // Generate CSV content
  static generateCSV(data: any[], headers: string[]): string {
    const csvHeaders = headers.join(',');
    const csvRows = data.map(row => 
      headers.map(header => {
        const value = row[header.toLowerCase().replace(/\s+/g, '_')] || row[header] || '';
        // Escape commas and quotes in CSV
        return typeof value === 'string' && (value.includes(',') || value.includes('"')) 
          ? `"${value.replace(/"/g, '""')}"` 
          : value;
      }).join(',')
    );
    
    return [csvHeaders, ...csvRows].join('\n');
  }

  // Generate PDF content with enhanced formatting and charts
  static generatePDF(data: ReportData): string {
    const charts = this.generateCharts(data);
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>${data.title}</title>
        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
        <style>
          body { 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
            margin: 0; 
            padding: 40px; 
            background: #f8fafc;
            line-height: 1.6;
          }
          .container { 
            max-width: 1200px; 
            margin: 0 auto; 
            background: white; 
            padding: 40px; 
            border-radius: 12px; 
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          .header { 
            text-align: center; 
            margin-bottom: 40px; 
            border-bottom: 3px solid #0ea5e9;
            padding-bottom: 20px;
          }
          .title { 
            font-size: 32px; 
            font-weight: bold; 
            color: #1e293b; 
            margin-bottom: 8px;
          }
          .subtitle { 
            font-size: 16px; 
            color: #64748b; 
            margin-top: 5px; 
          }
          .summary { 
            background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%); 
            padding: 30px; 
            border-radius: 12px; 
            margin-bottom: 40px; 
            border-left: 5px solid #0ea5e9;
          }
          .summary-title { 
            font-size: 24px; 
            font-weight: bold; 
            margin-bottom: 20px; 
            color: #1e293b;
          }
          .summary-grid { 
            display: grid; 
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); 
            gap: 20px; 
          }
          .summary-item { 
            background: white; 
            padding: 20px; 
            border-radius: 8px; 
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            border-left: 4px solid #0ea5e9;
          }
          .summary-label { 
            font-size: 14px; 
            color: #64748b; 
            text-transform: uppercase; 
            font-weight: 600;
            letter-spacing: 0.5px;
          }
          .summary-value { 
            font-size: 28px; 
            font-weight: bold; 
            color: #1e293b; 
            margin-top: 8px; 
          }
          .charts-section {
            margin: 40px 0;
            padding: 30px;
            background: #f8fafc;
            border-radius: 12px;
          }
          .charts-title {
            font-size: 24px;
            font-weight: bold;
            color: #1e293b;
            margin-bottom: 20px;
            text-align: center;
          }
          .charts-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
            gap: 30px;
            margin-top: 20px;
          }
          .chart-container {
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
          .chart-title {
            font-size: 18px;
            font-weight: 600;
            color: #374151;
            margin-bottom: 15px;
            text-align: center;
          }
          .data-table { 
            width: 100%; 
            border-collapse: collapse; 
            margin-top: 30px; 
            background: white;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
          .data-table th, .data-table td { 
            padding: 15px; 
            text-align: left; 
            border-bottom: 1px solid #e2e8f0; 
          }
          .data-table th { 
            background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%); 
            font-weight: bold; 
            color: white; 
            text-transform: uppercase;
            font-size: 12px;
            letter-spacing: 0.5px;
          }
          .data-table tr:hover {
            background: #f8fafc;
          }
          .data-table tr:nth-child(even) {
            background: #f8fafc;
          }
          .footer { 
            margin-top: 50px; 
            text-align: center; 
            font-size: 14px; 
            color: #64748b; 
            border-top: 2px solid #e2e8f0;
            padding-top: 20px;
          }
          .footer-logo {
            font-size: 18px;
            font-weight: bold;
            color: #0ea5e9;
            margin-bottom: 10px;
          }
          .positive { color: #059669; font-weight: bold; }
          .negative { color: #dc2626; font-weight: bold; }
          .neutral { color: #6b7280; font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="title">${data.title}</div>
            <div class="subtitle">Generated on ${new Date(data.generatedAt).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}</div>
          </div>
          
          ${data.summary ? `
          <div class="summary">
            <div class="summary-title">📊 Executive Summary</div>
            <div class="summary-grid">
              ${data.summary.totalValue ? `
                <div class="summary-item">
                  <div class="summary-label">💰 Total Portfolio Value</div>
                  <div class="summary-value">$${data.summary.totalValue.toLocaleString()}</div>
                </div>
              ` : ''}
              ${data.summary.totalInvestments ? `
                <div class="summary-item">
                  <div class="summary-label">📈 Total Investments</div>
                  <div class="summary-value">${data.summary.totalInvestments}</div>
                </div>
              ` : ''}
              ${data.summary.averageReturn ? `
                <div class="summary-item">
                  <div class="summary-label">📊 Average Return</div>
                  <div class="summary-value positive">${data.summary.averageReturn}%</div>
                </div>
              ` : ''}
              ${data.summary.riskLevel ? `
                <div class="summary-item">
                  <div class="summary-label">⚠️ Risk Level</div>
                  <div class="summary-value ${data.summary.riskLevel.toLowerCase() === 'low' ? 'positive' : data.summary.riskLevel.toLowerCase() === 'high' ? 'negative' : 'neutral'}">${data.summary.riskLevel}</div>
                </div>
              ` : ''}
              ${data.summary.diversificationScore ? `
                <div class="summary-item">
                  <div class="summary-label">🎯 Diversification Score</div>
                  <div class="summary-value">${data.summary.diversificationScore}/100</div>
                </div>
              ` : ''}
              ${data.summary.volatilityIndex ? `
                <div class="summary-item">
                  <div class="summary-label">📉 Volatility Index</div>
                  <div class="summary-value">${data.summary.volatilityIndex}%</div>
                </div>
              ` : ''}
            </div>
          </div>
          ` : ''}
          
          ${charts}
          
          <table class="data-table">
            <thead>
              <tr>
                ${Object.keys(data.data[0] || {}).map(key => 
                  `<th>${key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</th>`
                ).join('')}
              </tr>
            </thead>
            <tbody>
              ${data.data.map(row => `
                <tr>
                  ${Object.values(row).map(value => {
                    const val = String(value);
                    if (val.includes('%') && val.includes('+')) {
                      return `<td class="positive">${value}</td>`;
                    } else if (val.includes('%') && val.includes('-')) {
                      return `<td class="negative">${value}</td>`;
                    } else if (val.includes('$')) {
                      return `<td class="neutral">${value}</td>`;
                    }
                    return `<td>${value}</td>`;
                  }).join('')}
                </tr>
              `).join('')}
            </tbody>
          </table>
          
          <div class="footer">
            <div class="footer-logo">🌐 Global Edge Platform</div>
            <p>This comprehensive report was generated by Global Edge Investment Platform</p>
            <p>For questions or support, contact: <strong>info@theglobaledge.io</strong></p>
            <p>© 2025 Global Edge. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;
    
    return html;
  }

  // Generate charts for the report
  private static generateCharts(data: ReportData): string {
    if (!data.data || data.data.length === 0) return '';

    const chartId1 = `chart1_${Date.now()}`;
    const chartId2 = `chart2_${Date.now()}`;
    const chartId3 = `chart3_${Date.now()}`;

    // Extract data for charts
    const labels = data.data.map(item => item.asset || item.name || 'Item');
    const values = data.data.map(item => {
      const val = item.value || item.current_value || item.amount || 0;
      return typeof val === 'string' ? parseFloat(val.replace(/[$,%]/g, '')) || 0 : val;
    });
    const returns = data.data.map(item => {
      const ret = item.return || item.gains || 0;
      return typeof ret === 'string' ? parseFloat(ret.replace(/[$,%]/g, '')) || 0 : ret;
    });

    return `
      <div class="charts-section">
        <div class="charts-title">📈 Visual Analytics</div>
        <div class="charts-grid">
          <div class="chart-container">
            <div class="chart-title">Portfolio Distribution</div>
            <canvas id="${chartId1}" width="400" height="300"></canvas>
          </div>
          <div class="chart-container">
            <div class="chart-title">Performance Comparison</div>
            <canvas id="${chartId2}" width="400" height="300"></canvas>
          </div>
          <div class="chart-container">
            <div class="chart-title">Risk vs Return</div>
            <canvas id="${chartId3}" width="400" height="300"></canvas>
          </div>
        </div>
      </div>

      <script>
        // Portfolio Distribution Pie Chart
        const ctx1 = document.getElementById('${chartId1}').getContext('2d');
        new Chart(ctx1, {
          type: 'doughnut',
          data: {
            labels: ${JSON.stringify(labels)},
            datasets: [{
              data: ${JSON.stringify(values)},
              backgroundColor: [
                '#0ea5e9', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#84cc16', '#f97316'
              ],
              borderWidth: 2,
              borderColor: '#ffffff'
            }]
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: 'bottom',
                labels: {
                  padding: 20,
                  usePointStyle: true
                }
              }
            }
          }
        });

        // Performance Bar Chart
        const ctx2 = document.getElementById('${chartId2}').getContext('2d');
        new Chart(ctx2, {
          type: 'bar',
          data: {
            labels: ${JSON.stringify(labels)},
            datasets: [{
              label: 'Performance (%)',
              data: ${JSON.stringify(returns)},
              backgroundColor: ${JSON.stringify(returns.map(r => r >= 0 ? '#10b981' : '#ef4444'))},
              borderColor: ${JSON.stringify(returns.map(r => r >= 0 ? '#059669' : '#dc2626'))},
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            scales: {
              y: {
                beginAtZero: true,
                grid: {
                  color: '#e2e8f0'
                }
              },
              x: {
                grid: {
                  display: false
                }
              }
            },
            plugins: {
              legend: {
                display: false
              }
            }
          }
        });

        // Risk vs Return Scatter Plot
        const ctx3 = document.getElementById('${chartId3}').getContext('2d');
        const riskData = ${JSON.stringify(data.data.map(item => ({
          x: item.volatility || Math.random() * 20 + 5,
          y: item.return ? parseFloat(String(item.return).replace(/[%,]/g, '')) : Math.random() * 20 - 5
        })))};
        
        new Chart(ctx3, {
          type: 'scatter',
          data: {
            datasets: [{
              label: 'Assets',
              data: riskData,
              backgroundColor: '#0ea5e9',
              borderColor: '#0284c7',
              borderWidth: 2,
              pointRadius: 8
            }]
          },
          options: {
            responsive: true,
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'Risk (Volatility %)'
                },
                grid: {
                  color: '#e2e8f0'
                }
              },
              y: {
                title: {
                  display: true,
                  text: 'Return (%)'
                },
                grid: {
                  color: '#e2e8f0'
                }
              }
            },
            plugins: {
              legend: {
                display: false
              }
            }
          }
        });
      </script>
    `;
  }

  // Download CSV file
  static downloadCSV(csvContent: string, filename: string): void {
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // Download PDF file (using HTML to PDF conversion)
  static downloadPDF(htmlContent: string, filename: string): void {
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}.html`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

// Mock data generators for different report types
export const mockReportData = {
  portfolioSummary: {
    title: 'Portfolio Summary Report',
    generatedAt: new Date().toISOString(),
    summary: {
      totalValue: 125000,
      totalInvestments: 8,
      averageReturn: 12.5,
      riskLevel: 'Medium'
    },
    data: [
      { asset: 'Shanghai-LA Container', value: 45000, return: '12.5%', risk: 'Medium', status: 'Active' },
      { asset: 'Miami Office Building', value: 35000, return: '8.2%', risk: 'Low', status: 'Active' },
      { asset: 'Electronics Inventory', value: 25000, return: '15.1%', risk: 'High', status: 'Active' },
      { asset: 'Gold Vault Storage', value: 20000, return: '6.8%', risk: 'Low', status: 'Active' }
    ]
  },

  assetPerformance: {
    title: 'Asset Performance Report',
    generatedAt: new Date().toISOString(),
    summary: {
      totalValue: 125000,
      averageReturn: 10.65,
      bestPerformer: 'Electronics Inventory',
      worstPerformer: 'Gold Vault Storage'
    },
    data: [
      { asset: 'Electronics Inventory', current_value: 25000, initial_value: 22000, return: '15.1%', period: '6 months' },
      { asset: 'Shanghai-LA Container', current_value: 45000, initial_value: 42000, return: '12.5%', period: '4 months' },
      { asset: 'Miami Office Building', current_value: 35000, initial_value: 34000, return: '8.2%', period: '8 months' },
      { asset: 'Gold Vault Storage', current_value: 20000, initial_value: 19800, return: '6.8%', period: '3 months' }
    ]
  },

  transactionHistory: {
    title: 'Transaction History Report',
    generatedAt: new Date().toISOString(),
    data: [
      { date: '2024-12-15', type: 'Investment', asset: 'Shanghai-LA Container', amount: 5000, status: 'Completed' },
      { date: '2024-12-14', type: 'Dividend', asset: 'Miami Office Building', amount: 250, status: 'Completed' },
      { date: '2024-12-13', type: 'Investment', asset: 'Electronics Inventory', amount: 3000, status: 'Completed' },
      { date: '2024-12-12', type: 'Withdrawal', asset: 'Gold Vault Storage', amount: 1000, status: 'Completed' },
      { date: '2024-12-11', type: 'Investment', asset: 'Shanghai-LA Container', amount: 2000, status: 'Completed' }
    ]
  },

  riskAnalysis: {
    title: 'Risk Analysis Report',
    generatedAt: new Date().toISOString(),
    summary: {
      overallRisk: 'Medium',
      diversificationScore: 75,
      volatilityIndex: 12.3
    },
    data: [
      { asset: 'Electronics Inventory', risk_level: 'High', volatility: 18.5, correlation: 0.7, recommendation: 'Monitor closely' },
      { asset: 'Shanghai-LA Container', risk_level: 'Medium', volatility: 12.3, correlation: 0.4, recommendation: 'Stable' },
      { asset: 'Miami Office Building', risk_level: 'Low', volatility: 6.8, correlation: 0.2, recommendation: 'Safe' },
      { asset: 'Gold Vault Storage', risk_level: 'Low', volatility: 4.2, correlation: -0.1, recommendation: 'Hedge asset' }
    ]
  },

  taxReport: {
    title: 'Tax Report',
    generatedAt: new Date().toISOString(),
    summary: {
      totalGains: 8500,
      totalLosses: 1200,
      netGains: 7300,
      estimatedTax: 1825
    },
    data: [
      { asset: 'Shanghai-LA Container', gains: 3000, losses: 0, holding_period: '4 months', tax_rate: '25%' },
      { asset: 'Miami Office Building', gains: 2800, losses: 0, holding_period: '8 months', tax_rate: '20%' },
      { asset: 'Electronics Inventory', gains: 3000, losses: 0, holding_period: '6 months', tax_rate: '25%' },
      { asset: 'Gold Vault Storage', gains: 200, losses: 0, holding_period: '3 months', tax_rate: '25%' },
      { asset: 'Failed Investment', gains: 0, losses: 1200, holding_period: '2 months', tax_rate: '25%' }
    ]
  }
};
