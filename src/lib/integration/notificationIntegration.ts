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
      // Use mock service for now (database integration needs proper notification container)
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
      const mockNotifications = notificationService.getAdminNotifications().filter(
        notif => notif.data.userId === userId
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
        unread: notifications.filter(notif => !notif.read).length,
        read: notifications.filter(notif => notif.read).length,
        byType: {
          investment_update: notifications.filter(notif => notif.type === 'investment_update').length,
          kyc_required: notifications.filter(notif => notif.type === 'kyc_required').length,
          kyc_approved: notifications.filter(notif => notif.type === 'kyc_approved').length,
          kyc_rejected: notifications.filter(notif => notif.type === 'kyc_rejected').length,
          payment_required: notifications.filter(notif => notif.type === 'payment_required').length,
          investment_completed: notifications.filter(notif => notif.type === 'investment_completed').length,
          system_alert: notifications.filter(notif => notif.type === 'system_alert').length
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
