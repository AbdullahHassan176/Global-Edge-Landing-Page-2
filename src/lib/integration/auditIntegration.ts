/**
 * Audit Logging Integration
 * 
 * This service provides comprehensive activity tracking and audit logging
 * while maintaining backward compatibility with mock data.
 */

export interface AuditEvent {
  id: string;
  userId?: string;
  sessionId?: string;
  timestamp: string;
  event: 'create' | 'read' | 'update' | 'delete' | 'login' | 'logout' | 'access_denied' | 'system_event';
  entityType: string; // e.g., 'User', 'Asset', 'Investment', 'SystemSetting'
  entityId?: string; // ID of the entity affected
  action: string; // Human-readable description of the action
  details: string; // Detailed description of the change or action
  ipAddress?: string;
  userAgent?: string;
  location?: {
    country?: string;
    region?: string;
    city?: string;
  };
  changes?: {
    field: string;
    oldValue: any;
    newValue: any;
  }[];
  metadata?: Record<string, any>;
  severity: 'low' | 'medium' | 'high' | 'critical';
  category: 'authentication' | 'authorization' | 'data_access' | 'data_modification' | 'system' | 'security';
}

export interface AuditFilter {
  userId?: string;
  event?: string;
  entityType?: string;
  category?: string;
  severity?: string;
  startDate?: string;
  endDate?: string;
  ipAddress?: string;
  limit?: number;
  offset?: number;
}

export interface AuditStats {
  totalEvents: number;
  eventsByType: Record<string, number>;
  eventsByCategory: Record<string, number>;
  eventsBySeverity: Record<string, number>;
  eventsByUser: Record<string, number>;
  eventsByDay: Record<string, number>;
  topEntities: Array<{ entityType: string; count: number }>;
  securityEvents: number;
  failedLogins: number;
  dataModifications: number;
}

export class AuditIntegration {
  private useDatabase = true; // Toggle between database and mock data
  private auditEvents: AuditEvent[] = [];
  private maxEventsInMemory = 10000; // Limit in-memory events

  /**
   * Initialize audit integration
   */
  async initialize(): Promise<{ success: boolean; error?: string }> {
    try {
      // Load existing audit events from database
      if (this.useDatabase) {
        await this.loadAuditEventsFromDatabase();
      }

      console.log('Audit integration initialized');
      return { success: true };
    } catch (error) {
      console.error('Audit integration initialization error:', error);
      return { success: false, error: 'Failed to initialize audit integration' };
    }
  }

  /**
   * Log audit event
   */
  async logEvent(eventData: Omit<AuditEvent, 'id' | 'timestamp'>): Promise<{ success: boolean; eventId?: string; error?: string }> {
    try {
      const event: AuditEvent = {
        ...eventData,
        id: `audit_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        timestamp: new Date().toISOString()
      };

      // Add to in-memory storage
      this.auditEvents.unshift(event);

      // Limit in-memory events
      if (this.auditEvents.length > this.maxEventsInMemory) {
        this.auditEvents = this.auditEvents.slice(0, this.maxEventsInMemory);
      }

      // Store in database
      if (this.useDatabase) {
        await this.storeAuditEventInDatabase(event);
      }

      console.log(`Audit event logged: ${event.event} - ${event.entityType} - ${event.action}`);
      return { success: true, eventId: event.id };
    } catch (error) {
      console.error('Log audit event error:', error);
      return { success: false, error: 'Failed to log audit event' };
    }
  }

  /**
   * Log user login
   */
  async logLogin(userId: string, ipAddress?: string, userAgent?: string, success: boolean = true): Promise<{ success: boolean; eventId?: string; error?: string }> {
    return await this.logEvent({
      userId,
      event: success ? 'login' : 'access_denied',
      entityType: 'User',
      entityId: userId,
      action: success ? 'User logged in successfully' : 'Failed login attempt',
      details: success ? 'User successfully authenticated' : 'Authentication failed',
      ipAddress,
      userAgent,
      severity: success ? 'low' : 'medium',
      category: 'authentication',
      metadata: { success }
    });
  }

  /**
   * Log user logout
   */
  async logLogout(userId: string, ipAddress?: string, userAgent?: string): Promise<{ success: boolean; eventId?: string; error?: string }> {
    return await this.logEvent({
      userId,
      event: 'logout',
      entityType: 'User',
      entityId: userId,
      action: 'User logged out',
      details: 'User session ended',
      ipAddress,
      userAgent,
      severity: 'low',
      category: 'authentication'
    });
  }

  /**
   * Log data creation
   */
  async logCreate(userId: string, entityType: string, entityId: string, details: string, changes?: any[]): Promise<{ success: boolean; eventId?: string; error?: string }> {
    return await this.logEvent({
      userId,
      event: 'create',
      entityType,
      entityId,
      action: `Created new ${entityType}`,
      details,
      changes,
      severity: 'medium',
      category: 'data_modification'
    });
  }

  /**
   * Log data update
   */
  async logUpdate(userId: string, entityType: string, entityId: string, details: string, changes: any[]): Promise<{ success: boolean; eventId?: string; error?: string }> {
    return await this.logEvent({
      userId,
      event: 'update',
      entityType,
      entityId,
      action: `Updated ${entityType}`,
      details,
      changes,
      severity: 'medium',
      category: 'data_modification'
    });
  }

  /**
   * Log data deletion
   */
  async logDelete(userId: string, entityType: string, entityId: string, details: string): Promise<{ success: boolean; eventId?: string; error?: string }> {
    return await this.logEvent({
      userId,
      event: 'delete',
      entityType,
      entityId,
      action: `Deleted ${entityType}`,
      details,
      severity: 'high',
      category: 'data_modification'
    });
  }

  /**
   * Log data access
   */
  async logRead(userId: string, entityType: string, entityId?: string, details: string = 'Data accessed'): Promise<{ success: boolean; eventId?: string; error?: string }> {
    return await this.logEvent({
      userId,
      event: 'read',
      entityType,
      entityId,
      action: `Accessed ${entityType}`,
      details,
      severity: 'low',
      category: 'data_access'
    });
  }

  /**
   * Log system event
   */
  async logSystemEvent(event: string, details: string, severity: 'low' | 'medium' | 'high' | 'critical' = 'medium'): Promise<{ success: boolean; eventId?: string; error?: string }> {
    return await this.logEvent({
      event: 'system_event',
      entityType: 'System',
      action: event,
      details,
      severity,
      category: 'system'
    });
  }

  /**
   * Log security event
   */
  async logSecurityEvent(event: string, details: string, userId?: string, severity: 'medium' | 'high' | 'critical' = 'high'): Promise<{ success: boolean; eventId?: string; error?: string }> {
    return await this.logEvent({
      userId,
      event: 'access_denied',
      entityType: 'Security',
      action: event,
      details,
      severity,
      category: 'security'
    });
  }

  /**
   * Get audit events with filtering
   */
  async getAuditEvents(filter: AuditFilter = {}): Promise<{ success: boolean; events?: AuditEvent[]; total?: number; error?: string }> {
    try {
      let filteredEvents = [...this.auditEvents];

      // Apply filters
      if (filter.userId) {
        filteredEvents = filteredEvents.filter(e => e.userId === filter.userId);
      }
      if (filter.event) {
        filteredEvents = filteredEvents.filter(e => e.event === filter.event);
      }
      if (filter.entityType) {
        filteredEvents = filteredEvents.filter(e => e.entityType === filter.entityType);
      }
      if (filter.category) {
        filteredEvents = filteredEvents.filter(e => e.category === filter.category);
      }
      if (filter.severity) {
        filteredEvents = filteredEvents.filter(e => e.severity === filter.severity);
      }
      if (filter.startDate) {
        filteredEvents = filteredEvents.filter(e => e.timestamp >= filter.startDate!);
      }
      if (filter.endDate) {
        filteredEvents = filteredEvents.filter(e => e.timestamp <= filter.endDate!);
      }
      if (filter.ipAddress) {
        filteredEvents = filteredEvents.filter(e => e.ipAddress === filter.ipAddress);
      }

      // Apply pagination
      const total = filteredEvents.length;
      const offset = filter.offset || 0;
      const limit = filter.limit || 100;
      const paginatedEvents = filteredEvents.slice(offset, offset + limit);

      return { success: true, events: paginatedEvents, total };
    } catch (error) {
      console.error('Get audit events error:', error);
      return { success: false, error: 'Failed to get audit events' };
    }
  }

  /**
   * Get audit statistics
   */
  async getAuditStats(filter: AuditFilter = {}): Promise<{ success: boolean; stats?: AuditStats; error?: string }> {
    try {
      const eventsResult = await this.getAuditEvents(filter);
      if (!eventsResult.success || !eventsResult.events) {
        return { success: false, error: 'Failed to get events for statistics' };
      }

      const events = eventsResult.events;
      const stats: AuditStats = {
        totalEvents: events.length,
        eventsByType: this.getEventsByType(events),
        eventsByCategory: this.getEventsByCategory(events),
        eventsBySeverity: this.getEventsBySeverity(events),
        eventsByUser: this.getEventsByUser(events),
        eventsByDay: this.getEventsByDay(events),
        topEntities: this.getTopEntities(events),
        securityEvents: events.filter(e => e.category === 'security').length,
        failedLogins: events.filter(e => e.event === 'access_denied' && e.category === 'authentication').length,
        dataModifications: events.filter(e => ['create', 'update', 'delete'].includes(e.event)).length
      };

      return { success: true, stats };
    } catch (error) {
      console.error('Get audit stats error:', error);
      return { success: false, error: 'Failed to get audit statistics' };
    }
  }

  /**
   * Get events by type
   */
  private getEventsByType(events: AuditEvent[]): Record<string, number> {
    const stats: Record<string, number> = {};
    events.forEach(event => {
      stats[event.event] = (stats[event.event] || 0) + 1;
    });
    return stats;
  }

  /**
   * Get events by category
   */
  private getEventsByCategory(events: AuditEvent[]): Record<string, number> {
    const stats: Record<string, number> = {};
    events.forEach(event => {
      stats[event.category] = (stats[event.category] || 0) + 1;
    });
    return stats;
  }

  /**
   * Get events by severity
   */
  private getEventsBySeverity(events: AuditEvent[]): Record<string, number> {
    const stats: Record<string, number> = {};
    events.forEach(event => {
      stats[event.severity] = (stats[event.severity] || 0) + 1;
    });
    return stats;
  }

  /**
   * Get events by user
   */
  private getEventsByUser(events: AuditEvent[]): Record<string, number> {
    const stats: Record<string, number> = {};
    events.forEach(event => {
      if (event.userId) {
        stats[event.userId] = (stats[event.userId] || 0) + 1;
      }
    });
    return stats;
  }

  /**
   * Get events by day
   */
  private getEventsByDay(events: AuditEvent[]): Record<string, number> {
    const stats: Record<string, number> = {};
    events.forEach(event => {
      const day = event.timestamp.split('T')[0];
      stats[day] = (stats[day] || 0) + 1;
    });
    return stats;
  }

  /**
   * Get top entities
   */
  private getTopEntities(events: AuditEvent[]): Array<{ entityType: string; count: number }> {
    const entityStats: Record<string, number> = {};
    events.forEach(event => {
      entityStats[event.entityType] = (entityStats[event.entityType] || 0) + 1;
    });

    return Object.entries(entityStats)
      .map(([entityType, count]) => ({ entityType, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
  }

  /**
   * Load audit events from database
   */
  private async loadAuditEventsFromDatabase(): Promise<void> {
    try {
      // In a real implementation, you would load from the database
      // For now, we'll just initialize with some mock data
      this.initializeMockAuditEvents();
    } catch (error) {
      console.error('Load audit events from database error:', error);
    }
  }

  /**
   * Store audit event in database
   */
  private async storeAuditEventInDatabase(event: AuditEvent): Promise<{ success: boolean; error?: string }> {
    try {
      // In a real implementation, you would store in the database
      // For now, we'll just log it
      console.log(`Storing audit event in database: ${event.id}`);
      return { success: true };
    } catch (error) {
      console.error('Store audit event in database error:', error);
      return { success: false, error: 'Failed to store audit event in database' };
    }
  }

  /**
   * Initialize mock audit events
   */
  private initializeMockAuditEvents(): void {
    const mockEvents: AuditEvent[] = [
      {
        id: 'audit_1',
        userId: 'user-1',
        timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
        event: 'login',
        entityType: 'User',
        entityId: 'user-1',
        action: 'User logged in successfully',
        details: 'User successfully authenticated',
        ipAddress: '192.168.1.100',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        severity: 'low',
        category: 'authentication'
      },
      {
        id: 'audit_2',
        userId: 'user-1',
        timestamp: new Date(Date.now() - 1000 * 60 * 25).toISOString(), // 25 minutes ago
        event: 'create',
        entityType: 'Investment',
        entityId: 'inv-1',
        action: 'Created new Investment',
        details: 'User created a new investment in Dubai Marina Office Tower',
        ipAddress: '192.168.1.100',
        changes: [
          { field: 'amount', oldValue: null, newValue: 50000 },
          { field: 'assetId', oldValue: null, newValue: 'asset-1' }
        ],
        severity: 'medium',
        category: 'data_modification'
      },
      {
        id: 'audit_3',
        userId: 'admin-1',
        timestamp: new Date(Date.now() - 1000 * 60 * 20).toISOString(), // 20 minutes ago
        event: 'update',
        entityType: 'User',
        entityId: 'user-2',
        action: 'Updated User',
        details: 'Admin updated user KYC status',
        ipAddress: '192.168.1.50',
        changes: [
          { field: 'kycStatus', oldValue: 'pending', newValue: 'approved' }
        ],
        severity: 'medium',
        category: 'data_modification'
      }
    ];

    this.auditEvents = mockEvents;
  }

  /**
   * Toggle between database and mock data
   */
  setUseDatabase(useDatabase: boolean): void {
    this.useDatabase = useDatabase;
    console.log(`AuditIntegration: ${useDatabase ? 'Using database' : 'Using mock data'}`);
  }

  /**
   * Get current mode
   */
  isUsingDatabase(): boolean {
    return this.useDatabase;
  }
}

// Export singleton instance
export const auditIntegration = new AuditIntegration();
