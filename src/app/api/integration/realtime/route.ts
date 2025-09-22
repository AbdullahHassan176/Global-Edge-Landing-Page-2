/**
 * Real-time Updates API Route
 * 
 * This endpoint provides real-time updates and WebSocket management
 */

import { NextRequest, NextResponse } from 'next/server';
import { realtimeIntegration } from '@/lib/integration/realtimeIntegration';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const useWebSocket = searchParams.get('useWebSocket') !== 'false';
    const action = searchParams.get('action') || 'stats';
    
    // Set integration mode
    realtimeIntegration.setUseWebSocket(useWebSocket);
    
    let result;
    
    switch (action) {
      case 'stats':
        result = realtimeIntegration.getConnectionStats();
        break;
      default:
        return NextResponse.json(
          { success: false, error: 'Invalid action. Use: stats' },
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
        source: useWebSocket ? 'websocket' : 'polling',
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Real-time API error:', error);
    
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
    const { useWebSocket = true, action, ...data } = body;
    
    // Set integration mode
    realtimeIntegration.setUseWebSocket(useWebSocket);
    
    let result;
    
    switch (action) {
      case 'add_connection':
        const { connectionId, socket, userId } = data;
        if (!connectionId) {
          return NextResponse.json(
            { success: false, error: 'connectionId is required' },
            { status: 400 }
          );
        }
        result = realtimeIntegration.addConnection(connectionId, socket, userId);
        break;
        
      case 'remove_connection':
        const { connectionId: removeId } = data;
        if (!removeId) {
          return NextResponse.json(
            { success: false, error: 'connectionId is required' },
            { status: 400 }
          );
        }
        result = realtimeIntegration.removeConnection(removeId);
        break;
        
      case 'subscribe':
        const { connectionId: subId, eventTypes } = data;
        if (!subId || !eventTypes) {
          return NextResponse.json(
            { success: false, error: 'connectionId and eventTypes are required' },
            { status: 400 }
          );
        }
        result = realtimeIntegration.subscribeToEvents(subId, eventTypes);
        break;
        
      case 'unsubscribe':
        const { connectionId: unsubId, eventTypes: unsubEventTypes } = data;
        if (!unsubId || !unsubEventTypes) {
          return NextResponse.json(
            { success: false, error: 'connectionId and eventTypes are required' },
            { status: 400 }
          );
        }
        result = realtimeIntegration.unsubscribeFromEvents(unsubId, unsubEventTypes);
        break;
        
      case 'broadcast':
        const { event } = data;
        if (!event) {
          return NextResponse.json(
            { success: false, error: 'event is required' },
            { status: 400 }
          );
        }
        result = realtimeIntegration.broadcastEvent(event);
        break;
        
      case 'send_to_user':
        const { userId: targetUserId, event: userEvent } = data;
        if (!targetUserId || !userEvent) {
          return NextResponse.json(
            { success: false, error: 'userId and event are required' },
            { status: 400 }
          );
        }
        result = realtimeIntegration.sendToUser(targetUserId, userEvent);
        break;
        
      default:
        return NextResponse.json(
          { success: false, error: 'Invalid action. Use: add_connection, remove_connection, subscribe, unsubscribe, broadcast, or send_to_user' },
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
        source: useWebSocket ? 'websocket' : 'polling',
        action,
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Real-time API error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
