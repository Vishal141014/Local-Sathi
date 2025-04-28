const express = require('express');
const {
  getDashboardStats,
  getUsers,
  getUser,
  deleteUser,
  getSubscriptionAnalytics,
  getContactAnalytics,
  getContactSubmissions,
  getPendingVerifications,
  getFullDashboard
} = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/authMiddleware');
const User = require('../models/User');
const Subscription = require('../models/Subscription');
const Contact = require('../models/Contact');
const Message = require('../models/Message');
const ContactSubmission = require('../models/contactSubmissionModel');

const router = express.Router();

// Apply authentication and admin authorization to all routes
router.use(protect);
router.use(authorize('admin'));

// Admin dashboard
router.get('/dashboard', getFullDashboard);
router.get('/stats', getDashboardStats);

// User management
router.get('/users', getUsers);
router.route('/users/:id')
  .get(getUser)
  .delete(deleteUser);

// Subscription management
router.get('/subscriptions/analytics', getSubscriptionAnalytics);
router.get('/pending-verifications', getPendingVerifications);

// Contact management
router.get('/contacts/analytics', getContactAnalytics);
router.get('/contact-submissions', getContactSubmissions);

// Admin Dashboard Data
router.get('/dashboard-data', async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const latestUsers = await User.find().sort({ createdAt: -1 }).limit(5);
    
    const activeSubscriptions = await Subscription.countDocuments({ status: 'active' });
    const pendingSubscriptions = await Subscription.countDocuments({ status: 'pending' });
    const pendingVerifications = await Subscription.find({ status: 'pending', isVerified: false })
      .populate('user', 'name email')
      .sort({ createdAt: -1 })
      .limit(5);
    
    const totalRevenue = await Subscription.aggregate([
      { $match: { status: 'active' } },
      { $group: { _id: null, total: { $sum: '$price' } } }
    ]);
    
    const recentContacts = await Contact.find()
      .sort({ createdAt: -1 })
      .limit(5);
    
    res.status(200).json({
      success: true,
      data: {
        user: {
          name: req.user.name,
          email: req.user.email
        },
        stats: {
          users: {
            total: totalUsers,
            latest: latestUsers
          },
          subscriptions: {
            active: activeSubscriptions,
            pending: pendingSubscriptions,
            pendingVerifications
          },
          revenue: {
            total: totalRevenue.length > 0 ? totalRevenue[0].total : 0
          },
          contacts: {
            recentSubmissions: recentContacts
          }
        }
      }
    });
  } catch (error) {
    console.error('Error fetching admin dashboard data:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch dashboard data',
      error: error.message
    });
  }
});

// Get all users
router.get('/all-users', async (req, res) => {
  try {
    const users = await User.find().select('-password');
    
    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch users',
      error: error.message
    });
  }
});

// Get user by ID
router.get('/user/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user',
      error: error.message
    });
  }
});

// Delete user
router.delete('/user/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    // Delete associated data (subscriptions, messages, etc.)
    await Subscription.deleteMany({ user: user._id });
    await Message.deleteMany({ $or: [{ sender: user._id }, { receiver: user._id }] });
    
    // Delete the user
    await User.findByIdAndDelete(req.params.id);
    
    res.status(200).json({
      success: true,
      message: 'User account deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete user account',
      error: error.message
    });
  }
});

// Get all subscriptions
router.get('/all-subscriptions', async (req, res) => {
  try {
    const subscriptions = await Subscription.find()
      .populate('user', 'name email')
      .sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      data: subscriptions
    });
  } catch (error) {
    console.error('Error fetching subscriptions:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch subscriptions',
      error: error.message
    });
  }
});

// Get pending verifications
router.get('/pending-verifications-list', async (req, res) => {
  try {
    const pendingVerifications = await Subscription.find({ 
      status: 'pending', 
      isVerified: false 
    })
      .populate('user', 'name email')
      .sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      data: pendingVerifications
    });
  } catch (error) {
    console.error('Error fetching pending verifications:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch pending verifications',
      error: error.message
    });
  }
});

// Get all messages
router.get('/messages', async (req, res) => {
  try {
    const messages = await Message.find()
      .populate('sender', 'name email')
      .populate('receiver', 'name email')
      .sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: messages.length,
      data: messages
    });
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch messages',
      error: error.message
    });
  }
});

// Get all contact form submissions
router.get('/all-contact-submissions', async (req, res) => {
  try {
    const submissions = await ContactSubmission.find().sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: submissions.length,
      data: submissions
    });
  } catch (error) {
    console.error('Error fetching contact submissions:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch contact submissions',
      error: error.message
    });
  }
});

// Get subscription analytics
router.get('/subscriptions-analytics', async (req, res) => {
  try {
    const totalSubscriptions = await Subscription.countDocuments();
    const activeSubscriptions = await Subscription.countDocuments({ status: 'active' });
    const pendingVerifications = await Subscription.countDocuments({ status: 'pending', isVerified: false });
    const expiredSubscriptions = await Subscription.countDocuments({ status: 'expired' });
    
    // Monthly revenue
    const currentMonth = new Date();
    currentMonth.setDate(1);
    currentMonth.setHours(0, 0, 0, 0);
    
    const monthlyRevenue = await Subscription.aggregate([
      { 
        $match: { 
          status: 'active',
          createdAt: { $gte: currentMonth }
        } 
      },
      { $group: { _id: null, total: { $sum: '$price' } } }
    ]);
    
    // Subscription plan distribution
    const planDistribution = await Subscription.aggregate([
      { $match: { status: 'active' } },
      { $group: { _id: '$plan', count: { $sum: 1 } } }
    ]);
    
    res.status(200).json({
      success: true,
      data: {
        totalSubscriptions,
        activeSubscriptions,
        pendingVerifications,
        expiredSubscriptions,
        monthlyRevenue: monthlyRevenue.length > 0 ? monthlyRevenue[0].total : 0,
        planDistribution
      }
    });
  } catch (error) {
    console.error('Error fetching subscription analytics:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch subscription analytics',
      error: error.message
    });
  }
});

// Get contact analytics
router.get('/contacts-analytics', async (req, res) => {
  try {
    const totalContacts = await Contact.countDocuments();
    
    // Monthly contacts
    const currentMonth = new Date();
    currentMonth.setDate(1);
    currentMonth.setHours(0, 0, 0, 0);
    
    const monthlyContacts = await Contact.countDocuments({
      createdAt: { $gte: currentMonth }
    });
    
    // Status distribution
    const statusDistribution = await Contact.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);
    
    res.status(200).json({
      success: true,
      data: {
        totalContacts,
        monthlyContacts,
        statusDistribution
      }
    });
  } catch (error) {
    console.error('Error fetching contact analytics:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch contact analytics',
      error: error.message
    });
  }
});

// Verify a subscription payment
router.put('/subscriptions/:id/verify', async (req, res) => {
  try {
    const subscription = await Subscription.findById(req.params.id);
    
    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: 'Subscription not found'
      });
    }
    
    if (subscription.status !== 'pending') {
      return res.status(400).json({
        success: false,
        message: 'This subscription is not pending verification'
      });
    }
    
    // Update subscription status
    subscription.status = 'active';
    subscription.isVerified = true;
    subscription.verifiedAt = Date.now();
    
    // Set start and end dates
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 30); // 30 days subscription
    
    subscription.startDate = startDate;
    subscription.endDate = endDate;
    
    await subscription.save();
    
    // Update user subscription status if needed
    const user = await User.findById(subscription.user);
    if (user) {
      user.hasActiveSubscription = true;
      await user.save();
    }
    
    res.status(200).json({
      success: true,
      message: 'Subscription verified successfully',
      data: subscription
    });
  } catch (error) {
    console.error('Error verifying subscription:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to verify subscription',
      error: error.message
    });
  }
});

// Reject a subscription payment
router.put('/subscriptions/:id/reject', async (req, res) => {
  try {
    const subscription = await Subscription.findById(req.params.id);
    
    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: 'Subscription not found'
      });
    }
    
    if (subscription.status !== 'pending') {
      return res.status(400).json({
        success: false,
        message: 'This subscription is not pending verification'
      });
    }
    
    // Update subscription status
    subscription.status = 'rejected';
    subscription.rejectedAt = Date.now();
    subscription.rejectionReason = req.body.reason || 'Payment verification failed';
    
    await subscription.save();
    
    res.status(200).json({
      success: true,
      message: 'Subscription rejected successfully',
      data: subscription
    });
  } catch (error) {
    console.error('Error rejecting subscription:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to reject subscription',
      error: error.message
    });
  }
});

module.exports = router; 