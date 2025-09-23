/**
 * Real-time Updates Integration
 * 
 * This service provides real-time updates using WebSocket connections
 * while maintaining backward compatibility with polling fallback.
 */

export interface RealtimeEvent {
  id: string;
  type: 'user_update' | 'asset_update' | 'investment_update' | 'notification' | 'system_status';
  data: any;
  timestamp: string;
  userId?: string;
  broadcast?: boolean; // If true, broadcast to all connected clients
}

export interface RealtimeConnection {
  id: string;
  userId?: string;
  socket: any; // WebSocket instance
  connectedAt: string;
  lastPing: string;
  subscriptions: string[]; // Event types this connection is subscribed to
}

export class RealtimeIntegration {
  private connections: Map<string, RealtimeConnection> = new Map();
  private useWebSocket = true; // Toggle between WebSocket and polling
  private pollingInterval = 5000; // 5 seconds for polling fallback
  private heartbeatInterval = 30000; // 30 seconds for heartbeat

  /**
   * Initialize real-time integration
   */
  async initialize(): Promise<{ success: boolean; error?: string }> {
    try {
      if (this.useWebSocket) {
        // In a real implementation, you would set up WebSocket server here
        console.log('Real-time WebSocket integration enabled');
      } else {
        console.log('Real-time polling integration enabled');
      }

      // Start heartbeat for connection management
      this.startHeartbeat();

      return { success: true };
    } catch (error) {
      console.error('Real-time integration initialization error:', error);
      return { success: false, error: 'Failed to initialize real-time integration' };
    }
  }

  /**
   * Add WebSocket connection
   */
  addConnection(connectionId: string, socket: any, userId?: string): { success: boolean; error?: string } {
    try {
      const connection: RealtimeConnection = {
        id: connectionId,
        userId,
        socket,
        connectedAt: new Date().toISOString(),
        lastPing: new Date().toISOString(),
        subscriptions: ['notification', 'system_status'] // Default subscriptions
      };

      this.connections.set(connectionId, connection);
      console.log(`Real-time connection added: ${connectionId} (user: ${userId || 'anonymous'})`);

      return { success: true };
    } catch (error) {
      console.error('Add connection error:', error);
      return { success: false, error: 'Failed to add connection' };
    }
  }

  /**
   * Remove WebSocket connection
   */
  removeConnection(connectionId: string): { success: boolean; error?: string } {
    try {
      const connection = this.connections.get(connectionId);
      if (connection) {
        this.connections.delete(connectionId);
        console.log(`Real-time connection removed: ${connectionId}`);
      }

      return { success: true };
    } catch (error) {
      console.error('Remove connection error:', error);
      return { success: false, error: 'Failed to remove connection' };
    }
  }

  /**
   * Subscribe connection to event types
   */
  subscribeToEvents(connectionId: string, eventTypes: string[]): { success: boolean; error?: string } {
    try {
      const connection = this.connections.get(connectionId);
      if (!connection) {
        return { success: false, error: 'Connection not found' };
      }

      connection.subscriptions = Array.from(new Set([...connection.subscriptions, ...eventTypes]));
      console.log(`Connection ${connectionId} subscribed to: ${eventTypes.join(', ')}`);

      return { success: true };
    } catch (error) {
      console.error('Subscribe to events error:', error);
      return { success: false, error: 'Failed to subscribe to events' };
    }
  }

  /**
   * Unsubscribe connection from event types
   */
  unsubscribeFromEvents(connectionId: string, eventTypes: string[]): { success: boolean; error?: string } {
    try {
      const connection = this.connections.get(connectionId);
      if (!connection) {
        return { success: false, error: 'Connection not found' };
      }

      connection.subscriptions = connection.subscriptions.filter(type => !eventTypes.includes(type));
      console.log(`Connection ${connectionId} unsubscribed from: ${eventTypes.join(', ')}`);

      return { success: true };
    } catch (error) {
      console.error('Unsubscribe from events error:', error);
      return { success: false, error: 'Failed to unsubscribe from events' };
    }
  }

  /**
   * Broadcast event to all connected clients
   */
  broadcastEvent(event: RealtimeEvent): { success: boolean; sentTo: number; error?: string } {
    try {
      let sentTo = 0;

      for (const [connectionId, connection] of Array.from(this.connections.entries())) {
        if (this.shouldSendToConnection(connection, event)) {
          this.sendToConnectionInternal(connection, event);
          sentTo++;
        }
      }

      console.log(`Event ${event.type} broadcasted to ${sentTo} connections`);
      return { success: true, sentTo };
    } catch (error) {
      console.error('Broadcast event error:', error);
      return { success: false, sentTo: 0, error: 'Failed to broadcast event' };
    }
  }

  /**
   * Send event to specific user
   */
  sendToUser(userId: string, event: RealtimeEvent): { success: boolean; sentTo: number; error?: string } {
    try {
      let sentTo = 0;

      for (const [connectionId, connection] of Array.from(this.connections.entries())) {
        if (connection.userId === userId && this.shouldSendToConnection(connection, event)) {
          this.sendToConnectionInternal(connection, event);
          sentTo++;
        }
      }

      console.log(`Event ${event.type} sent to user ${userId} (${sentTo} connections)`);
      return { success: true, sentTo };
    } catch (error) {
      console.error('Send to user error:', error);
      return { success: false, sentTo: 0, error: 'Failed to send to user' };
    }
  }

  /**
   * Send event to specific connection
   */
  sendToConnection(connectionId: string, event: RealtimeEvent): { success: boolean; error?: string } {
    try {
      const connection = this.connections.get(connectionId);
      if (!connection) {
        return { success: false, error: 'Connection not found' };
      }

      if (this.shouldSendToConnection(connection, event)) {
        this.sendToConnectionInternal(connection, event);
        return { success: true };
      }

      return { success: false, error: 'Connection not subscribed to event type' };
    } catch (error) {
      console.error('Send to connection error:', error);
      return { success: false, error: 'Failed to send to connection' };
    }
  }

  /**
   * Get connection statistics
   */
  getConnectionStats(): { success: boolean; stats?: any; error?: string } {
    try {
      const stats = {
        totalConnections: this.connections.size,
        authenticatedConnections: Array.from(this.connections.values()).filter(c => c.userId).length,
        anonymousConnections: Array.from(this.connections.values()).filter(c => !c.userId).length,
        subscriptions: this.getSubscriptionStats(),
        averageConnectionTime: this.getAverageConnectionTime()
      };

      return { success: true, stats };
    } catch (error) {
      console.error('Get connection stats error:', error);
      return { success: false, error: 'Failed to get connection stats' };
    }
  }

  /**
   * Check if connection should receive event
   */
  private shouldSendToConnection(connection: RealtimeConnection, event: RealtimeEvent): boolean {
    // Check if connection is subscribed to this event type
    if (!connection.subscriptions.includes(event.type)) {
      return false;
    }

    // Check if event is user-specific and connection is for that user
    if (event.userId && connection.userId && event.userId !== connection.userId) {
      return false;
    }

    return true;
  }

  /**
   * Send event to connection
   */
  private sendToConnectionInternal(connection: RealtimeConnection, event: RealtimeEvent): void {
    try {
      if (this.useWebSocket && connection.socket) {
        // Send via WebSocket
        connection.socket.send(JSON.stringify(event));
      } else {
        // Fallback to polling (store event for later retrieval)
        this.storeEventForPolling(connection.id, event);
      }

      // Update last ping
      connection.lastPing = new Date().toISOString();
    } catch (error) {
      console.error('Send to connection error:', error);
    }
  }

  /**
   * Store event for polling retrieval
   */
  private storeEventForPolling(connectionId: string, event: RealtimeEvent): void {
    // In a real implementation, you would store this in a database or cache
    // For now, we'll just log it
    console.log(`Event stored for polling: ${connectionId} - ${event.type}`);
  }

  /**
   * Get events for polling
   */
  getEventsForPolling(connectionId: string, lastEventId?: string): { success: boolean; events?: RealtimeEvent[]; error?: string } {
    try {
      // In a real implementation, you would retrieve events from storage
      // For now, return empty array
      const events: RealtimeEvent[] = [];

      return { success: true, events };
    } catch (error) {
      console.error('Get events for polling error:', error);
      return { success: false, error: 'Failed to get events for polling' };
    }
  }

  /**
   * Start heartbeat for connection management
   */
  private startHeartbeat(): void {
    setInterval(() => {
      this.cleanupStaleConnections();
    }, this.heartbeatInterval);
  }

  /**
   * Clean up stale connections
   */
  private cleanupStaleConnections(): void {
    const now = new Date();
    const staleThreshold = 60000; // 1 minute

    for (const [connectionId, connection] of Array.from(this.connections.entries())) {
      const lastPing = new Date(connection.lastPing);
      const timeSinceLastPing = now.getTime() - lastPing.getTime();

      if (timeSinceLastPing > staleThreshold) {
        console.log(`Removing stale connection: ${connectionId}`);
        this.connections.delete(connectionId);
      }
    }
  }

  /**
   * Get subscription statistics
   */
  private getSubscriptionStats(): Record<string, number> {
    const stats: Record<string, number> = {};

    for (const connection of Array.from(this.connections.values())) {
      for (const subscription of connection.subscriptions) {
        stats[subscription] = (stats[subscription] || 0) + 1;
      }
    }

    return stats;
  }

  /**
   * Get average connection time
   */
  private getAverageConnectionTime(): number {
    if (this.connections.size === 0) return 0;

    const now = new Date();
    let totalTime = 0;

    for (const connection of Array.from(this.connections.values())) {
      const connectedAt = new Date(connection.connectedAt);
      totalTime += now.getTime() - connectedAt.getTime();
    }

    return Math.round(totalTime / this.connections.size / 1000); // Seconds
  }

  /**
   * Toggle between WebSocket and polling
   */
  setUseWebSocket(useWebSocket: boolean): void {
    this.useWebSocket = useWebSocket;
    console.log(`RealtimeIntegration: ${useWebSocket ? 'Using WebSocket' : 'Using polling'}`);
  }

  /**
   * Get current mode
   */
  isUsingWebSocket(): boolean {
    return this.useWebSocket;
  }
}

// Export singleton instance
export const realtimeIntegration = new RealtimeIntegration();
