# Admin Dashboard Implementation Guide

This document provides detailed instructions for implementing the admin dashboard in your frontend React application.

## Overview

The admin dashboard is completely separate from the user dashboard and provides comprehensive tools for managing the Local Sathi platform. It allows administrators to:

1. View key statistics
2. Verify subscription payments
3. Manage users (view and delete)
4. View and respond to contact form submissions
5. Access analytics for subscriptions and user activity

## Backend API Endpoints

All the required backend endpoints have been implemented. Here's a summary:

### Admin Dashboard Data
- `GET /api/admin/dashboard` - Get comprehensive dashboard data
- `GET /api/admin/stats` - Get key statistics

### User Management
- `GET /api/admin/users` - Get all users
- `GET /api/admin/users/:id` - Get a specific user
- `DELETE /api/admin/users/:id` - Delete a user account

### Subscription Management
- `GET /api/admin/subscriptions/analytics` - Get subscription analytics
- `GET /api/admin/pending-verifications` - Get pending subscription verifications
- `PUT /api/subscriptions/:id/verify` - Verify a subscription

### Contact Management
- `GET /api/admin/contacts/analytics` - Get contact form analytics
- `GET /api/admin/contact-submissions` - Get all contact form submissions
- `POST /api/contact/:id/reply` - Reply to a contact submission

## Frontend Implementation

To implement the admin dashboard, follow these steps:

### 1. Create Admin Layout Component

Create a dedicated layout for admin pages with a sidebar for navigation:

```jsx
// AdminLayout.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const AdminLayout = ({ children }) => {
  const location = useLocation();
  
  return (
    <div className="admin-wrapper">
      <div className="sidebar">
        <div className="logo">Local Sathi Admin</div>
        
        <Link to="/admin" className={`nav-item ${location.pathname === '/admin' ? 'active' : ''}`}>
          <i>📊</i> Dashboard
        </Link>
        
        <Link to="/admin/users" className={`nav-item ${location.pathname === '/admin/users' ? 'active' : ''}`}>
          <i>👥</i> Users
        </Link>
        
        <Link to="/admin/subscriptions" className={`nav-item ${location.pathname === '/admin/subscriptions' ? 'active' : ''}`}>
          <i>💲</i> Subscriptions
        </Link>
        
        <Link to="/admin/messages" className={`nav-item ${location.pathname === '/admin/messages' ? 'active' : ''}`}>
          <i>📬</i> Messages
        </Link>
        
        <Link to="/admin/analytics" className={`nav-item ${location.pathname === '/admin/analytics' ? 'active' : ''}`}>
          <i>📈</i> Analytics
        </Link>
        
        <Link to="/admin/settings" className={`nav-item ${location.pathname === '/admin/settings' ? 'active' : ''}`}>
          <i>⚙️</i> Settings
        </Link>
        
        <Link to="/logout" className="nav-item">
          <i>🔒</i> Logout
        </Link>
      </div>
      
      <div className="main-content">
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
```

### 2. Create Admin Dashboard Page

```jsx
// AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { formatDate, formatCurrency } from '../utils/formatters';

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const { data } = await axios.get('/api/admin/dashboard');
        setDashboardData(data.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load dashboard data');
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const verifySubscription = async (subscriptionId) => {
    try {
      await axios.put(`/api/subscriptions/${subscriptionId}/verify`);
      // Refresh data after verification
      const { data } = await axios.get('/api/admin/dashboard');
      setDashboardData(data.data);
    } catch (err) {
      console.error('Error verifying subscription:', err);
    }
  };

  if (loading) return <div>Loading dashboard data...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!dashboardData) return <div>No data available</div>;

  return (
    <div>
      <div className="page-header">
        <h1>Admin Dashboard</h1>
        <div className="admin-profile">
          <div className="admin-avatar">A</div>
          <div>
            <div>{dashboardData.user.name}</div>
            <small>Super Admin</small>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Users</h3>
          <div className="number">{dashboardData.stats.users.total}</div>
        </div>
        <div className="stat-card">
          <h3>Monthly Revenue</h3>
          <div className="number">{formatCurrency(dashboardData.stats.revenue.total)}</div>
        </div>
        <div className="stat-card">
          <h3>Active Subscriptions</h3>
          <div className="number">{dashboardData.stats.subscriptions.active}</div>
        </div>
        <div className="stat-card">
          <h3>Pending Verifications</h3>
          <div className="number">{dashboardData.stats.subscriptions.pending}</div>
        </div>
      </div>

      {/* Pending Verifications Table */}
      <div className="data-table">
        <div className="table-header">
          <h2>Pending Verifications</h2>
          <button className="action-btn" onClick={() => window.location.href = '/admin/subscriptions'}>View All</button>
        </div>
        
        {dashboardData.stats.subscriptions.pendingVerifications.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Customer</th>
                <th>Plan</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Payment Reference</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {dashboardData.stats.subscriptions.pendingVerifications.map(sub => (
                <tr key={sub._id}>
                  <td>{sub.user.name}</td>
                  <td>{sub.plan}</td>
                  <td>{formatCurrency(sub.price)}</td>
                  <td>{formatDate(sub.createdAt)}</td>
                  <td>{sub.paymentReference}</td>
                  <td>
                    <button 
                      className="action-btn btn-verify" 
                      onClick={() => verifySubscription(sub._id)}
                    >
                      Verify
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="empty-state">No pending verifications</div>
        )}
      </div>

      {/* Recent Messages */}
      <div className="data-table">
        <div className="table-header">
          <h2>Recent Contact Messages</h2>
          <button className="action-btn" onClick={() => window.location.href = '/admin/messages'}>View All</button>
        </div>
        
        {dashboardData.stats.contacts.recentSubmissions.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Message</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {dashboardData.stats.contacts.recentSubmissions.map(contact => (
                <tr key={contact._id}>
                  <td>{contact.name}</td>
                  <td>{contact.email}</td>
                  <td>{contact.message.substring(0, 50)}...</td>
                  <td>{formatDate(contact.createdAt)}</td>
                  <td>{contact.status}</td>
                  <td>
                    <button 
                      className="action-btn" 
                      onClick={() => window.location.href = `/admin/messages/${contact._id}`}
                    >
                      Reply
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="empty-state">No new messages</div>
        )}
      </div>

      {/* Recent Users */}
      <div className="data-table">
        <div className="table-header">
          <h2>Recent Users</h2>
          <button className="action-btn" onClick={() => window.location.href = '/admin/users'}>View All</button>
        </div>
        
        {dashboardData.stats.users.latest.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Business Name</th>
                <th>Joined Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {dashboardData.stats.users.latest.map(user => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.businessName}</td>
                  <td>{formatDate(user.createdAt)}</td>
                  <td>
                    <button 
                      className="action-btn" 
                      onClick={() => window.location.href = `/admin/users/${user._id}`}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="empty-state">No users found</div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
```

### 3. Create Other Admin Pages

Implement the following additional pages:

- `/admin/users` - User management page
- `/admin/subscriptions` - Subscription management page
- `/admin/messages` - Contact message management page
- `/admin/analytics` - Analytics dashboard

### 4. Create AdminRoute Component

This component will ensure only admin users can access the admin routes:

```jsx
// AdminRoute.jsx
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const AdminRoute = ({ component: Component, ...rest }) => {
  const { currentUser, loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  return (
    <Route
      {...rest}
      render={props => {
        if (!currentUser) {
          return <Redirect to="/login" />;
        }
        
        if (currentUser.role !== 'admin') {
          return <Redirect to="/dashboard" />;
        }
        
        return <Component {...props} />;
      }}
    />
  );
};

export default AdminRoute;
```

### 5. Update App Routes

Add the admin routes to your main App.js file:

```jsx
// App.jsx
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AdminRoute from './components/AdminRoute';
import AdminLayout from './components/AdminLayout';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminUsers from './pages/Admin/AdminUsers';
import AdminSubscriptions from './pages/Admin/AdminSubscriptions';
import AdminMessages from './pages/Admin/AdminMessages';
import AdminAnalytics from './pages/Admin/AdminAnalytics';

function App() {
  return (
    <Router>
      <Switch>
        {/* Public routes */}
        <Route exact path="/" component={HomePage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        
        {/* User routes */}
        <PrivateRoute path="/dashboard" component={Dashboard} />
        
        {/* Admin routes */}
        <AdminRoute exact path="/admin">
          <AdminLayout>
            <AdminDashboard />
          </AdminLayout>
        </AdminRoute>
        
        <AdminRoute path="/admin/users">
          <AdminLayout>
            <AdminUsers />
          </AdminLayout>
        </AdminRoute>
        
        <AdminRoute path="/admin/subscriptions">
          <AdminLayout>
            <AdminSubscriptions />
          </AdminLayout>
        </AdminRoute>
        
        <AdminRoute path="/admin/messages">
          <AdminLayout>
            <AdminMessages />
          </AdminLayout>
        </AdminRoute>
        
        <AdminRoute path="/admin/analytics">
          <AdminLayout>
            <AdminAnalytics />
          </AdminLayout>
        </AdminRoute>
      </Switch>
    </Router>
  );
}
```

## Styling

The admin dashboard should have a distinct look from the user dashboard. Implement the styles from the provided admin-dashboard-template.html file, or create your own custom styling.

## Features to Implement

### 1. Payment Verification

Allow admins to verify subscription payments:

```jsx
const verifyPayment = async (subscriptionId) => {
  try {
    await axios.put(`/api/subscriptions/${subscriptionId}/verify`);
    // Refresh data after verification
    fetchSubscriptions();
  } catch (err) {
    console.error('Error verifying payment:', err);
  }
};
```

### 2. User Account Management

Allow admins to view and delete user accounts:

```jsx
const deleteUser = async (userId) => {
  if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
    try {
      await axios.delete(`/api/admin/users/${userId}`);
      // Refresh user list
      fetchUsers();
    } catch (err) {
      console.error('Error deleting user:', err);
    }
  }
};
```

### 3. Contact Message Management

Allow admins to view and reply to contact messages:

```jsx
const replyToMessage = async (messageId, replyText) => {
  try {
    await axios.post(`/api/contact/${messageId}/reply`, { replyText });
    // Refresh message list
    fetchMessages();
  } catch (err) {
    console.error('Error sending reply:', err);
  }
};
```

## Testing

Test all admin functionality thoroughly, ensuring that:

1. Only admin users can access the admin dashboard
2. All API endpoints are properly authenticated
3. Data is correctly displayed and updated after actions
4. Error handling is implemented for all API calls

## Conclusion

This implementation guide covers the core functionality needed for the admin dashboard. Additional features can be added as needed to enhance the administrative capabilities of the platform.

Remember to prioritize security in all admin operations, as these operations deal with sensitive user data and system controls.

If you have any questions or need further clarification, please refer to the backend API documentation or contact the development team. 