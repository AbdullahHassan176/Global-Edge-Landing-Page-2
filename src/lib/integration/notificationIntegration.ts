/**
 * Notification System Integration
 * 
 * This service integrates the notification system with the database
 * while maintaining backward compatibility with mock data.
 */

import { workingDatabaseService } from '@/lib/database/workingDatabaseService';
import { notificationService } from '@/lib/notificationService';
import { Notification } from '@/lib/database/models';

export class NotificationIntegration {
  private useDatabase = true; // Toggle between database and mock data

  /**
   * Get all notifications with database integration
   */
  async getNotifications(): Promise<{ success: boolean; notifications?: Notification[]; error?: string }> {
    try {
      if (this.useDatabase) {
        // Try database first - using users container with type field
        const dbResult = await workingDatabaseService.getUsers();
        if (dbResult.success && dbResult.data) {
          // Filter notifications from users container
          const notifications = dbResult.data.items.filter(item => item.type === 'notification');
          return { success: true, notifications: notifications as any };
        }
      }

      // Fallback to mock service
      const mockNotifications = notificationService.getAdminNotifications();
      return { success: true, notifications: mockNotifications as any };
    } catch (error) {
      console.error('Get notifications error:', error);
      return { success: false, error: 'Failed to get notifications' };
    }
  }

  /**
   * Get notifications by user ID with database integration
   */
  async getNotificationsByUserId(userId: string): Promise<{ success: boolean; notifications?: Notification[]; error?: string }> {
    try {
      if (this.useDatabase) {
        const dbResult = await workingDatabaseService.getUsers();
        if (dbResult.success && dbResult.data) {
          const userNotifications = dbResult.data.items.filter(
            item => item.type === 'notification' && item.userId === userId
          );
          return { success: true, notifications: userNotifications as any };
        }
      }

      // Fallback to mock service
      const mockNotifications = notificationService.getAdminNotifications().filter(
        notif => notif.userId === userId
      );
      return { success: true, notifications: mockNotifications as any };
    } catch (error) {
      console.error('Get notifications by user error:', error);
      return { success: false, error: 'Failed to get user notifications' };
    }
  }

  /**
   * Create notification with database integration
   */
  async createNotification(notificationData: Omit<Notification, 'id' | 'createdAt'>): Promise<{ success: boolean; notification?: Notification; error?: string }> {
    try {
      if (this.useDatabase) {
        // Create notification in database using users container
        const notification = {
          ...notificationData,
          id: `notif-${Date.now()}`,
          createdAt: new Date().toISOString(),
          type: 'notification' // Mark as notification type
        };

        const dbResult = await workingDatabaseService.createUser(notification as any);
        if (dbResult.success && dbResult.data) {
          return { success: true, notification: dbResult.data as any };
        }
      }

      // Fallback to mock service
      const mockNotification = {
        ...notificationData,
        id: `notif-${Date.now()}`,
        createdAt: new Date().toISOString()
      };
      return { success: true, notification: mockNotification };
    } catch (error) {
      console.error('Create notification error:', error);
      return { success: false, error: 'Failed to create notification' };
    }
  }

  /**
   * Update notification status with database integration
   */
  async updateNotificationStatus(id: string, status: 'unread' | 'read' | 'sent' | 'failed' | 'processed' | 'reviewed'): Promise<{ success: boolean; notification?: Notification; error?: string }> {
    try {
      if (this.useDatabase) {
        // Update notification in database
        const dbResult = await workingDatabaseService.updateUser(id, { status } as any);
        if (dbResult.success && dbResult.data) {
          return { success: true, notification: dbResult.data as any };
        }
      }

      // Fallback to mock service
      const mockNotifications = notificationService.getAdminNotifications();
      const notification = mockNotifications.find(notif => notif.id === id);
      if (notification) {
        notification.status = status as any;
        return { success: true, notification: notification as any };
      }

      return { success: false, error: 'Notification not found' };
    } catch (error) {
      console.error('Update notification error:', error);
      return { success: false, error: 'Failed to update notification' };
    }
  }

  /**
   * Get email notifications with database integration
   */
  async getEmailNotifications(): Promise<{ success: boolean; notifications?: any[]; error?: string }> {
    try {
      if (this.useDatabase) {
        // Try to get email notifications from database
        const dbResult = await workingDatabaseService.getUsers();
        if (dbResult.success && dbResult.data) {
          const emailNotifications = dbResult.data.items.filter(
            item => item.type === 'email_notification'
          );
          return { success: true, notifications: emailNotifications };
        }
      }

      // Fallback to mock service
      const mockEmailNotifications = notificationService.getEmailNotifications();
      return { success: true, notifications: mockEmailNotifications };
    } catch (error) {
      console.error('Get email notifications error:', error);
      return { success: false, error: 'Failed to get email notifications' };
    }
  }

  /**
   * Get webhook notifications with database integration
   */
  async getWebhookNotifications(): Promise<{ success: boolean; notifications?: any[]; error?: string }> {
    try {
      if (this.useDatabase) {
        // Try to get webhook notifications from database
        const dbResult = await workingDatabaseService.getUsers();
        if (dbResult.success && dbResult.data) {
          const webhookNotifications = dbResult.data.items.filter(
            item => item.type === 'webhook_notification'
          );
          return { success: true, notifications: webhookNotifications };
        }
      }

      // Fallback to mock service
      const mockWebhookNotifications = notificationService.getWebhookNotifications();
      return { success: true, notifications: mockWebhookNotifications };
    } catch (error) {
      console.error('Get webhook notifications error:', error);
      return { success: false, error: 'Failed to get webhook notifications' };
    }
  }

  /**
   * Get notification statistics with database integration
   */
  async getNotificationStats(): Promise<{ success: boolean; stats?: any; error?: string }> {
    try {
      const result = await this.getNotifications();
      if (!result.success || !result.notifications) {
        return { success: false, error: 'Failed to get notifications for stats' };
      }

      const notifications = result.notifications;
      const stats = {
        total: notifications.length,
        unread: notifications.filter(notif => notif.status === 'unread').length,
        read: notifications.filter(notif => notif.status === 'read').length,
        sent: notifications.filter(notif => notif.status === 'sent').length,
        failed: notifications.filter(notif => notif.status === 'failed').length,
        byType: {
          system: notifications.filter(notif => notif.type === 'system').length,
          email: notifications.filter(notif => notif.type === 'email').length,
          webhook: notifications.filter(notif => notif.type === 'webhook').length,
          admin: notifications.filter(notif => notif.type === 'admin').length
        }
      };

      return { success: true, stats };
    } catch (error) {
      console.error('Get notification stats error:', error);
      return { success: false, error: 'Failed to get notification statistics' };
    }
  }

  /**
   * Toggle between database and mock data
   */
  setUseDatabase(useDatabase: boolean): void {
    this.useDatabase = useDatabase;
    console.log(`NotificationIntegration: ${useDatabase ? 'Using database' : 'Using mock data'}`);
  }

  /**
   * Get current mode
   */
  isUsingDatabase(): boolean {
    return this.useDatabase;
  }
}

// Export singleton instance
export const notificationIntegration = new NotificationIntegration();
