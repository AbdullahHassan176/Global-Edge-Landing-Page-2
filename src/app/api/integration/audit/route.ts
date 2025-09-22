/**
 * Audit Logging API Route
 * 
 * This endpoint provides audit logging and activity tracking
 */

import { NextRequest, NextResponse } from 'next/server';
import { auditIntegration } from '@/lib/integration/auditIntegration';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const useDatabase = searchParams.get('useDatabase') !== 'false';
    const type = searchParams.get('type') || 'events'; // 'events', 'stats'
    
    // Set integration mode
    auditIntegration.setUseDatabase(useDatabase);
    
    let result;
    
    if (type === 'stats') {
      result = await auditIntegration.getAuditStats();
    } else {
      // Get audit events with filters
      const filter = {
        userId: searchParams.get('userId') || undefined,
        event: searchParams.get('event') || undefined,
        entityType: searchParams.get('entityType') || undefined,
        category: searchParams.get('category') || undefined,
        severity: searchParams.get('severity') || undefined,
        startDate: searchParams.get('startDate') || undefined,
        endDate: searchParams.get('endDate') || undefined,
        ipAddress: searchParams.get('ipAddress') || undefined,
        limit: searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined,
        offset: searchParams.get('offset') ? parseInt(searchParams.get('offset')!) : undefined
      };
      
      result = await auditIntegration.getAuditEvents(filter);
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
    console.error('Audit API error:', error);
    
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
    auditIntegration.setUseDatabase(useDatabase);
    
    let result;
    
    switch (action) {
      case 'log_event':
        const { eventData } = data;
        if (!eventData) {
          return NextResponse.json(
            { success: false, error: 'eventData is required' },
            { status: 400 }
          );
        }
        result = await auditIntegration.logEvent(eventData);
        break;
        
      case 'log_login':
        const { userId: loginUserId, ipAddress: loginIp, userAgent: loginUserAgent, success: loginSuccess } = data;
        if (!loginUserId) {
          return NextResponse.json(
            { success: false, error: 'userId is required' },
            { status: 400 }
          );
        }
        result = await auditIntegration.logLogin(loginUserId, loginIp, loginUserAgent, loginSuccess);
        break;
        
      case 'log_logout':
        const { userId: logoutUserId, ipAddress: logoutIp, userAgent: logoutUserAgent } = data;
        if (!logoutUserId) {
          return NextResponse.json(
            { success: false, error: 'userId is required' },
            { status: 400 }
          );
        }
        result = await auditIntegration.logLogout(logoutUserId, logoutIp, logoutUserAgent);
        break;
        
      case 'log_create':
        const { userId: createUserId, entityType: createEntityType, entityId: createEntityId, details: createDetails, changes: createChanges } = data;
        if (!createUserId || !createEntityType || !createEntityId || !createDetails) {
          return NextResponse.json(
            { success: false, error: 'userId, entityType, entityId, and details are required' },
            { status: 400 }
          );
        }
        result = await auditIntegration.logCreate(createUserId, createEntityType, createEntityId, createDetails, createChanges);
        break;
        
      case 'log_update':
        const { userId: updateUserId, entityType: updateEntityType, entityId: updateEntityId, details: updateDetails, changes: updateChanges } = data;
        if (!updateUserId || !updateEntityType || !updateEntityId || !updateDetails || !updateChanges) {
          return NextResponse.json(
            { success: false, error: 'userId, entityType, entityId, details, and changes are required' },
            { status: 400 }
          );
        }
        result = await auditIntegration.logUpdate(updateUserId, updateEntityType, updateEntityId, updateDetails, updateChanges);
        break;
        
      case 'log_delete':
        const { userId: deleteUserId, entityType: deleteEntityType, entityId: deleteEntityId, details: deleteDetails } = data;
        if (!deleteUserId || !deleteEntityType || !deleteEntityId || !deleteDetails) {
          return NextResponse.json(
            { success: false, error: 'userId, entityType, entityId, and details are required' },
            { status: 400 }
          );
        }
        result = await auditIntegration.logDelete(deleteUserId, deleteEntityType, deleteEntityId, deleteDetails);
        break;
        
      case 'log_read':
        const { userId: readUserId, entityType: readEntityType, entityId: readEntityId, details: readDetails } = data;
        if (!readUserId || !readEntityType) {
          return NextResponse.json(
            { success: false, error: 'userId and entityType are required' },
            { status: 400 }
          );
        }
        result = await auditIntegration.logRead(readUserId, readEntityType, readEntityId, readDetails);
        break;
        
      case 'log_system_event':
        const { event: systemEvent, details: systemDetails, severity: systemSeverity } = data;
        if (!systemEvent || !systemDetails) {
          return NextResponse.json(
            { success: false, error: 'event and details are required' },
            { status: 400 }
          );
        }
        result = await auditIntegration.logSystemEvent(systemEvent, systemDetails, systemSeverity);
        break;
        
      case 'log_security_event':
        const { event: securityEvent, details: securityDetails, userId: securityUserId, severity: securitySeverity } = data;
        if (!securityEvent || !securityDetails) {
          return NextResponse.json(
            { success: false, error: 'event and details are required' },
            { status: 400 }
          );
        }
        result = await auditIntegration.logSecurityEvent(securityEvent, securityDetails, securityUserId, securitySeverity);
        break;
        
      default:
        return NextResponse.json(
          { success: false, error: 'Invalid action. Use: log_event, log_login, log_logout, log_create, log_update, log_delete, log_read, log_system_event, or log_security_event' },
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
    console.error('Audit API error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
