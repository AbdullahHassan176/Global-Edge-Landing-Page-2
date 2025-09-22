/**
 * Performance Monitoring Integration
 * 
 * This service provides system health metrics and performance monitoring
 * while maintaining backward compatibility with mock data.
 */

export interface PerformanceMetric {
  id: string;
  name: string;
  value: number;
  unit: string;
  timestamp: string;
  category: 'system' | 'database' | 'api' | 'user' | 'business';
  tags: Record<string, string>;
  metadata?: Record<string, any>;
}

export interface SystemHealth {
  status: 'healthy' | 'warning' | 'critical';
  timestamp: string;
  metrics: {
    cpu: number;
    memory: number;
    disk: number;
    network: number;
  };
  services: {
    database: 'up' | 'down' | 'degraded';
    api: 'up' | 'down' | 'degraded';
    email: 'up' | 'down' | 'degraded';
    storage: 'up' | 'down' | 'degraded';
  };
  alerts: Array<{
    id: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
    message: string;
    timestamp: string;
  }>;
}

export interface PerformanceStats {
  totalRequests: number;
  averageResponseTime: number;
  errorRate: number;
  activeUsers: number;
  databaseConnections: number;
  memoryUsage: number;
  cpuUsage: number;
  diskUsage: number;
  uptime: number;
  lastUpdated: string;
}

export class PerformanceIntegration {
  private useDatabase = true; // Toggle between database and mock data
  private metrics: PerformanceMetric[] = [];
  private healthChecks: SystemHealth[] = [];
  private maxMetricsInMemory = 5000; // Limit in-memory metrics

  /**
   * Initialize performance monitoring
   */
  async initialize(): Promise<{ success: boolean; error?: string }> {
    try {
      // Start performance monitoring
      this.startPerformanceMonitoring();
      
      // Start health checks
      this.startHealthChecks();

      console.log('Performance monitoring initialized');
      return { success: true };
    } catch (error) {
      console.error('Performance monitoring initialization error:', error);
      return { success: false, error: 'Failed to initialize performance monitoring' };
    }
  }

  /**
   * Record performance metric
   */
  async recordMetric(
    name: string,
    value: number,
    unit: string,
    category: 'system' | 'database' | 'api' | 'user' | 'business',
    tags: Record<string, string> = {},
    metadata?: Record<string, any>
  ): Promise<{ success: boolean; metricId?: string; error?: string }> {
    try {
      const metric: PerformanceMetric = {
        id: `metric_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        name,
        value,
        unit,
        timestamp: new Date().toISOString(),
        category,
        tags,
        metadata
      };

      // Add to in-memory storage
      this.metrics.unshift(metric);

      // Limit in-memory metrics
      if (this.metrics.length > this.maxMetricsInMemory) {
        this.metrics = this.metrics.slice(0, this.maxMetricsInMemory);
      }

      // Store in database
      if (this.useDatabase) {
        await this.storeMetricInDatabase(metric);
      }

      return { success: true, metricId: metric.id };
    } catch (error) {
      console.error('Record metric error:', error);
      return { success: false, error: 'Failed to record metric' };
    }
  }

  /**
   * Record API response time
   */
  async recordApiResponseTime(endpoint: string, method: string, responseTime: number, statusCode: number): Promise<{ success: boolean; error?: string }> {
    return await this.recordMetric(
      'api_response_time',
      responseTime,
      'ms',
      'api',
      {
        endpoint,
        method,
        status_code: statusCode.toString()
      },
      { statusCode, endpoint, method }
    );
  }

  /**
   * Record database query time
   */
  async recordDatabaseQueryTime(query: string, executionTime: number, rowsAffected: number): Promise<{ success: boolean; error?: string }> {
    return await this.recordMetric(
      'database_query_time',
      executionTime,
      'ms',
      'database',
      {
        query_type: this.getQueryType(query),
        rows_affected: rowsAffected.toString()
      },
      { query, rowsAffected }
    );
  }

  /**
   * Record user activity
   */
  async recordUserActivity(userId: string, action: string, duration?: number): Promise<{ success: boolean; error?: string }> {
    return await this.recordMetric(
      'user_activity',
      duration || 1,
      'count',
      'user',
      {
        user_id: userId,
        action
      },
      { userId, action, duration }
    );
  }

  /**
   * Record business metric
   */
  async recordBusinessMetric(name: string, value: number, unit: string, tags: Record<string, string> = {}): Promise<{ success: boolean; error?: string }> {
    return await this.recordMetric(name, value, unit, 'business', tags);
  }

  /**
   * Get performance statistics
   */
  async getPerformanceStats(timeRange: string = '1h'): Promise<{ success: boolean; stats?: PerformanceStats; error?: string }> {
    try {
      const timeRangeMs = this.parseTimeRange(timeRange);
      const cutoffTime = new Date(Date.now() - timeRangeMs).toISOString();
      
      const recentMetrics = this.metrics.filter(m => m.timestamp >= cutoffTime);
      
      const stats: PerformanceStats = {
        totalRequests: this.getMetricValue(recentMetrics, 'api_response_time', 'count') || 0,
        averageResponseTime: this.getMetricAverage(recentMetrics, 'api_response_time') || 0,
        errorRate: this.calculateErrorRate(recentMetrics),
        activeUsers: this.getUniqueUsers(recentMetrics),
        databaseConnections: this.getMetricValue(recentMetrics, 'database_connections', 'count') || 0,
        memoryUsage: this.getMetricValue(recentMetrics, 'memory_usage', 'percent') || 0,
        cpuUsage: this.getMetricValue(recentMetrics, 'cpu_usage', 'percent') || 0,
        diskUsage: this.getMetricValue(recentMetrics, 'disk_usage', 'percent') || 0,
        uptime: this.calculateUptime(),
        lastUpdated: new Date().toISOString()
      };

      return { success: true, stats };
    } catch (error) {
      console.error('Get performance stats error:', error);
      return { success: false, error: 'Failed to get performance statistics' };
    }
  }

  /**
   * Get system health
   */
  async getSystemHealth(): Promise<{ success: boolean; health?: SystemHealth; error?: string }> {
    try {
      const health: SystemHealth = {
        status: 'healthy',
        timestamp: new Date().toISOString(),
        metrics: {
          cpu: this.getCurrentCpuUsage(),
          memory: this.getCurrentMemoryUsage(),
          disk: this.getCurrentDiskUsage(),
          network: this.getCurrentNetworkUsage()
        },
        services: {
          database: this.getDatabaseStatus(),
          api: this.getApiStatus(),
          email: this.getEmailStatus(),
          storage: this.getStorageStatus()
        },
        alerts: this.getActiveAlerts()
      };

      // Determine overall status
      health.status = this.determineOverallStatus(health);

      return { success: true, health };
    } catch (error) {
      console.error('Get system health error:', error);
      return { success: false, error: 'Failed to get system health' };
    }
  }

  /**
   * Get metrics by category
   */
  async getMetricsByCategory(category: string, timeRange: string = '1h'): Promise<{ success: boolean; metrics?: PerformanceMetric[]; error?: string }> {
    try {
      const timeRangeMs = this.parseTimeRange(timeRange);
      const cutoffTime = new Date(Date.now() - timeRangeMs).toISOString();
      
      const filteredMetrics = this.metrics.filter(m => 
        m.category === category && m.timestamp >= cutoffTime
      );

      return { success: true, metrics: filteredMetrics };
    } catch (error) {
      console.error('Get metrics by category error:', error);
      return { success: false, error: 'Failed to get metrics by category' };
    }
  }

  /**
   * Start performance monitoring
   */
  private startPerformanceMonitoring(): void {
    // Monitor system metrics every 30 seconds
    setInterval(() => {
      this.recordSystemMetrics();
    }, 30000);

    // Monitor business metrics every 5 minutes
    setInterval(() => {
      this.recordBusinessMetrics();
    }, 300000);
  }

  /**
   * Start health checks
   */
  private startHealthChecks(): void {
    // Perform health checks every minute
    setInterval(() => {
      this.performHealthCheck();
    }, 60000);
  }

  /**
   * Record system metrics
   */
  private async recordSystemMetrics(): Promise<void> {
    try {
      // Record CPU usage
      await this.recordMetric('cpu_usage', this.getCurrentCpuUsage(), 'percent', 'system');
      
      // Record memory usage
      await this.recordMetric('memory_usage', this.getCurrentMemoryUsage(), 'percent', 'system');
      
      // Record disk usage
      await this.recordMetric('disk_usage', this.getCurrentDiskUsage(), 'percent', 'system');
      
      // Record network usage
      await this.recordMetric('network_usage', this.getCurrentNetworkUsage(), 'percent', 'system');
    } catch (error) {
      console.error('Record system metrics error:', error);
    }
  }

  /**
   * Record business metrics
   */
  private async recordBusinessMetrics(): Promise<void> {
    try {
      // Record active users
      const activeUsers = this.getActiveUsersCount();
      await this.recordMetric('active_users', activeUsers, 'count', 'business');
      
      // Record total investments
      const totalInvestments = this.getTotalInvestmentsCount();
      await this.recordMetric('total_investments', totalInvestments, 'count', 'business');
      
      // Record total assets
      const totalAssets = this.getTotalAssetsCount();
      await this.recordMetric('total_assets', totalAssets, 'count', 'business');
    } catch (error) {
      console.error('Record business metrics error:', error);
    }
  }

  /**
   * Perform health check
   */
  private async performHealthCheck(): Promise<void> {
    try {
      const health = await this.getSystemHealth();
      if (health.success && health.health) {
        this.healthChecks.unshift(health.health);
        
        // Limit health checks in memory
        if (this.healthChecks.length > 100) {
          this.healthChecks = this.healthChecks.slice(0, 100);
        }
      }
    } catch (error) {
      console.error('Perform health check error:', error);
    }
  }

  /**
   * Get current CPU usage (mock)
   */
  private getCurrentCpuUsage(): number {
    // In a real implementation, you would get actual CPU usage
    return Math.random() * 100;
  }

  /**
   * Get current memory usage (mock)
   */
  private getCurrentMemoryUsage(): number {
    // In a real implementation, you would get actual memory usage
    return Math.random() * 100;
  }

  /**
   * Get current disk usage (mock)
   */
  private getCurrentDiskUsage(): number {
    // In a real implementation, you would get actual disk usage
    return Math.random() * 100;
  }

  /**
   * Get current network usage (mock)
   */
  private getCurrentNetworkUsage(): number {
    // In a real implementation, you would get actual network usage
    return Math.random() * 100;
  }

  /**
   * Get database status (mock)
   */
  private getDatabaseStatus(): 'up' | 'down' | 'degraded' {
    // In a real implementation, you would check actual database status
    return 'up';
  }

  /**
   * Get API status (mock)
   */
  private getApiStatus(): 'up' | 'down' | 'degraded' {
    // In a real implementation, you would check actual API status
    return 'up';
  }

  /**
   * Get email status (mock)
   */
  private getEmailStatus(): 'up' | 'down' | 'degraded' {
    // In a real implementation, you would check actual email service status
    return 'up';
  }

  /**
   * Get storage status (mock)
   */
  private getStorageStatus(): 'up' | 'down' | 'degraded' {
    // In a real implementation, you would check actual storage status
    return 'up';
  }

  /**
   * Get active alerts
   */
  private getActiveAlerts(): Array<{ id: string; severity: 'low' | 'medium' | 'high' | 'critical'; message: string; timestamp: string }> {
    // In a real implementation, you would check for actual alerts
    return [];
  }

  /**
   * Determine overall system status
   */
  private determineOverallStatus(health: SystemHealth): 'healthy' | 'warning' | 'critical' {
    // Check for critical issues
    if (health.services.database === 'down' || health.services.api === 'down') {
      return 'critical';
    }

    // Check for warning conditions
    if (health.metrics.cpu > 80 || health.metrics.memory > 80 || health.metrics.disk > 90) {
      return 'warning';
    }

    // Check for degraded services
    if (Object.values(health.services).some(status => status === 'degraded')) {
      return 'warning';
    }

    return 'healthy';
  }

  /**
   * Parse time range string
   */
  private parseTimeRange(timeRange: string): number {
    const unit = timeRange.slice(-1);
    const value = parseInt(timeRange.slice(0, -1));

    switch (unit) {
      case 'm': return value * 60 * 1000; // minutes
      case 'h': return value * 60 * 60 * 1000; // hours
      case 'd': return value * 24 * 60 * 60 * 1000; // days
      default: return 60 * 60 * 1000; // default 1 hour
    }
  }

  /**
   * Get metric value
   */
  private getMetricValue(metrics: PerformanceMetric[], name: string, unit: string): number | null {
    const metric = metrics.find(m => m.name === name && m.unit === unit);
    return metric ? metric.value : null;
  }

  /**
   * Get metric average
   */
  private getMetricAverage(metrics: PerformanceMetric[], name: string): number | null {
    const relevantMetrics = metrics.filter(m => m.name === name);
    if (relevantMetrics.length === 0) return null;
    
    const sum = relevantMetrics.reduce((acc, m) => acc + m.value, 0);
    return sum / relevantMetrics.length;
  }

  /**
   * Calculate error rate
   */
  private calculateErrorRate(metrics: PerformanceMetric[]): number {
    const apiMetrics = metrics.filter(m => m.name === 'api_response_time');
    if (apiMetrics.length === 0) return 0;

    const errorMetrics = apiMetrics.filter(m => 
      m.tags.status_code && parseInt(m.tags.status_code) >= 400
    );

    return (errorMetrics.length / apiMetrics.length) * 100;
  }

  /**
   * Get unique users
   */
  private getUniqueUsers(metrics: PerformanceMetric[]): number {
    const userMetrics = metrics.filter(m => m.name === 'user_activity');
    const uniqueUsers = new Set(userMetrics.map(m => m.tags.user_id));
    return uniqueUsers.size;
  }

  /**
   * Calculate uptime
   */
  private calculateUptime(): number {
    // In a real implementation, you would calculate actual uptime
    return Date.now() - (Date.now() - 24 * 60 * 60 * 1000); // Mock 24 hours
  }

  /**
   * Get query type from SQL query
   */
  private getQueryType(query: string): string {
    const upperQuery = query.toUpperCase().trim();
    if (upperQuery.startsWith('SELECT')) return 'SELECT';
    if (upperQuery.startsWith('INSERT')) return 'INSERT';
    if (upperQuery.startsWith('UPDATE')) return 'UPDATE';
    if (upperQuery.startsWith('DELETE')) return 'DELETE';
    return 'OTHER';
  }

  /**
   * Get active users count (mock)
   */
  private getActiveUsersCount(): number {
    return Math.floor(Math.random() * 100) + 50;
  }

  /**
   * Get total investments count (mock)
   */
  private getTotalInvestmentsCount(): number {
    return Math.floor(Math.random() * 1000) + 500;
  }

  /**
   * Get total assets count (mock)
   */
  private getTotalAssetsCount(): number {
    return Math.floor(Math.random() * 100) + 25;
  }

  /**
   * Store metric in database
   */
  private async storeMetricInDatabase(metric: PerformanceMetric): Promise<{ success: boolean; error?: string }> {
    try {
      // In a real implementation, you would store in the database
      console.log(`Storing metric in database: ${metric.id}`);
      return { success: true };
    } catch (error) {
      console.error('Store metric in database error:', error);
      return { success: false, error: 'Failed to store metric in database' };
    }
  }

  /**
   * Toggle between database and mock data
   */
  setUseDatabase(useDatabase: boolean): void {
    this.useDatabase = useDatabase;
    console.log(`PerformanceIntegration: ${useDatabase ? 'Using database' : 'Using mock data'}`);
  }

  /**
   * Get current mode
   */
  isUsingDatabase(): boolean {
    return this.useDatabase;
  }
}

// Export singleton instance
export const performanceIntegration = new PerformanceIntegration();
