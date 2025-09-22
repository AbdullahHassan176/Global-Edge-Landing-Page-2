# Admin Login Credentials

## 🔐 Admin Access Information

The Global Edge platform now has a secure admin authentication system. All admin pages are protected and require proper authentication.

### 📍 Admin Login URL
```
/admin/login
```

### 👤 Admin Credentials

#### Super Admin Account
- **Username:** `admin`
- **Password:** `GlobalEdge2025!`
- **Role:** Super Admin
- **Permissions:** All permissions (full access)

#### Moderator Account
- **Username:** `moderator`
- **Password:** `Moderator123!`
- **Role:** Moderator
- **Permissions:** View users, notifications, and analytics

### 🛡️ Security Features

#### Authentication System
- **Session Management:** 8-hour session timeout
- **Auto-Logout:** Sessions expire automatically
- **Permission-Based Access:** Role-based access control
- **Activity Tracking:** Session extension on activity

#### Protected Admin Pages
- `/admin` - Main admin dashboard
- `/admin/notifications` - Notification management
- `/admin/users` - User management
- `/admin/analytics` - Analytics dashboard
- `/admin/content` - Content management
- `/admin/security` - Security center
- `/admin/settings` - System settings

### 🔑 Permission System

#### Super Admin Permissions
- `all` - Full access to everything

#### Moderator Permissions
- `view_users` - View user management
- `view_notifications` - View notifications
- `view_analytics` - View analytics

### 🚀 How to Access Admin Panel

1. **Navigate to Admin Login:**
   ```
   https://your-domain.com/admin/login
   ```

2. **Enter Credentials:**
   - Use either admin or moderator credentials above

3. **Access Admin Dashboard:**
   - After successful login, you'll be redirected to `/admin`
   - All admin features will be available based on your role

### ⚠️ Security Notes

#### Development Environment
- Credentials are stored in code for development purposes
- Mock authentication system for testing

#### Production Environment
- **IMPORTANT:** Change default passwords before production deployment
- Implement proper database storage for user credentials
- Use environment variables for sensitive data
- Consider implementing two-factor authentication (2FA)

### 🔄 Session Management

#### Automatic Features
- **Session Extension:** Sessions extend on user activity
- **Auto-Logout:** Sessions expire after 8 hours of inactivity
- **Security Headers:** Admin pages include security notices

#### Manual Logout
- Click the "Logout" button in the admin header
- Sessions are immediately cleared from localStorage

### 📱 Admin Interface Features

#### Admin Header
- **User Info:** Displays current user role and email
- **Logout Button:** Secure logout functionality
- **Session Status:** Shows current authentication state

#### Permission-Based UI
- **Dynamic Access:** UI elements show/hide based on permissions
- **Role Indicators:** Clear role and permission display
- **Access Denied:** Proper error messages for insufficient permissions

### 🛠️ Technical Implementation

#### Files Created/Modified
- `src/lib/adminAuthService.ts` - Authentication service
- `src/app/admin/login/page.tsx` - Admin login page
- `src/components/admin/AdminAuthGuard.tsx` - Authentication middleware
- All admin pages updated with authentication guards

#### Authentication Flow
1. User visits admin page
2. `AdminAuthGuard` checks authentication
3. If not authenticated, redirect to `/admin/login`
4. User enters credentials
5. `adminAuthService.login()` validates credentials
6. Session stored in localStorage
7. User redirected to requested admin page

### 🔧 Customization

#### Adding New Admin Users
Edit `src/lib/adminAuthService.ts`:
```typescript
const ADMIN_USERS: AdminUser[] = [
  // Add new admin users here
];

const ADMIN_PASSWORDS: Record<string, string> = {
  // Add new passwords here
};
```

#### Adding New Permissions
1. Update permission arrays in `ADMIN_USERS`
2. Add permission checks in `AdminAuthGuard` components
3. Update UI elements to respect new permissions

### 📞 Support

For admin access issues or security concerns:
- **Email:** info@globalnext.rocks
- **Security Notice:** All admin access attempts are logged

---

**⚠️ IMPORTANT SECURITY REMINDER:**
- Change default passwords before production deployment
- Implement proper database storage for production
- Consider additional security measures like 2FA
- Regularly audit admin access logs
