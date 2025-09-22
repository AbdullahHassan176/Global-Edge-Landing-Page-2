/**
 * Email Service Integration API Route
 * 
 * This endpoint provides email sending and management capabilities
 */

import { NextRequest, NextResponse } from 'next/server';
import { emailIntegration } from '@/lib/integration/emailIntegration';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const useDatabase = searchParams.get('useDatabase') !== 'false';
    const type = searchParams.get('type'); // 'stats', 'providers', 'templates'
    
    // Set integration mode
    emailIntegration.setUseDatabase(useDatabase);
    
    let result;
    
    switch (type) {
      case 'providers':
        result = emailIntegration.getAvailableProviders();
        break;
      case 'templates':
        result = emailIntegration.getAvailableTemplates();
        break;
      default:
        result = emailIntegration.getEmailStats();
    }
    
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        ...result,
        source: useDatabase ? 'database' : 'mock',
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Email API error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { useDatabase = true, action, ...data } = body;
    
    // Set integration mode
    emailIntegration.setUseDatabase(useDatabase);
    
    let result;
    
    switch (action) {
      case 'send_template':
        const { templateId, to, variables, options } = data;
        if (!templateId || !to || !variables) {
          return NextResponse.json(
            { success: false, error: 'templateId, to, and variables are required' },
            { status: 400 }
          );
        }
        result = await emailIntegration.sendTemplateEmail(templateId, to, variables, options);
        break;
        
      case 'send_custom':
        const { to: customTo, subject, content, options: customOptions } = data;
        if (!customTo || !subject || !content) {
          return NextResponse.json(
            { success: false, error: 'to, subject, and content are required' },
            { status: 400 }
          );
        }
        result = await emailIntegration.sendCustomEmail(customTo, subject, content, customOptions);
        break;
        
      default:
        return NextResponse.json(
          { success: false, error: 'Invalid action. Use: send_template or send_custom' },
          { status: 400 }
        );
    }

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        ...result,
        source: useDatabase ? 'database' : 'mock',
        action,
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Email API error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
