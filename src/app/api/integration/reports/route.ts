/**
 * Integrated Reports API Route
 * 
 * This endpoint provides report generation with database integration and fallback to mock data
 */

import { NextRequest, NextResponse } from 'next/server';
import { reportIntegration } from '@/lib/integration/reportIntegration';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const useDatabase = searchParams.get('useDatabase') !== 'false';
    const reportType = searchParams.get('type') || 'system';
    const format = searchParams.get('format') || 'json';
    const filters = JSON.parse(searchParams.get('filters') || '{}');
    
    // Set integration mode
    reportIntegration.setUseDatabase(useDatabase);
    
    let result;
    
    switch (reportType) {
      case 'users':
        result = await reportIntegration.generateUserReport();
        break;
      case 'assets':
        result = await reportIntegration.generateAssetReport();
        break;
      case 'investments':
        result = await reportIntegration.generateInvestmentReport();
        case 'custom':
        result = await reportIntegration.generateCustomReport('custom', filters);
        break;
      default:
        result = await reportIntegration.generateSystemReport();
    }
    
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      );
    }

    // Handle different export formats
    if (format === 'pdf') {
      const pdfResult = await reportIntegration.exportReportToPDF(reportType, filters);
      if (pdfResult.success) {
        return NextResponse.json({
          success: true,
          data: {
            report: result.report,
            pdfUrl: pdfResult.pdfUrl,
            source: useDatabase ? 'database' : 'mock',
            type: reportType,
            format: 'pdf'
          }
        });
      }
    }

    if (format === 'csv') {
      const csvResult = await reportIntegration.exportReportToCSV(reportType, filters);
      if (csvResult.success) {
        return NextResponse.json({
          success: true,
          data: {
            report: result.report,
            csvUrl: csvResult.csvUrl,
            source: useDatabase ? 'database' : 'mock',
            type: reportType,
            format: 'csv'
          }
        });
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        report: result.report,
        source: useDatabase ? 'database' : 'mock',
        type: reportType,
        format: 'json',
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Generate report error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
