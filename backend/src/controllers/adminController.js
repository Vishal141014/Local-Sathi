const User = require('../models/User');
const Subscription = require('../models/Subscription');
const Contact = require('../models/Contact');

// @desc    Get admin dashboard stats
// @route   GET /api/admin/stats
// @access  Private/Admin
exports.getDashboardStats = async (req, res) => {
  try {
    // Count total users
    const userCount = await User.countDocuments({ role: 'user' });
    
    // Count subscriptions by status
    const pendingSubscriptions = await Subscription.countDocuments({ status: 'pending' });
    const activeSubscriptions = await Subscription.countDocuments({ status: 'active' });
    const expiredSubscriptions = await Subscription.countDocuments({ status: 'expired' });
    
    // Count new contact messages
    const newMessages = await Contact.countDocuments({ status: 'new' });
    
    // Get pending subscriptions for verification
    const pendingVerifications = await Subscription.find({ 
      status: 'pending',
      isVerified: false 
    }).populate({
      path: 'user',
      select: 'name email businessName'
    }).sort({ createdAt: -1 }).limit(5);
    
    // Get revenue data
    const subscriptions = await Subscription.find({ 
      status: 'active',
      isVerified: true
    });
    
    const totalRevenue = subscriptions.reduce((acc, sub) => acc + sub.price, 0);
    
    // Get latest users
    const latestUsers = await User.find({ role: 'user' })
      .select('name email businessName createdAt')
      .sort({ createdAt: -1 })
      .limit(5);
    
    res.status(200).json({
      success: true,
      data: {
        users: {
          total: userCount,
          latest: latestUsers
        },
        subscriptions: {
          pending: pendingSubscriptions,
          active: activeSubscriptions,
          expired: expiredSubscriptions,
          pendingVerifications: pendingVerifications
        },
        contacts: {
          new: newMessages
        },
        revenue: {
          total: totalRevenue
        }
      }
    });
  } catch (error) {
    console.error('Admin stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving admin dashboard statistics'
    });
  }
};

// @desc    Get all users (admin only)
// @route   GET /api/admin/users
// @access  Private/Admin
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving users'
    });
  }
};

// @desc    Get single user (admin only)
// @route   GET /api/admin/users/:id
// @access  Private/Admin
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    // Get user's subscriptions
    const subscriptions = await Subscription.find({ user: req.params.id }).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      data: {
        user,
        subscriptions
      }
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving user'
    });
  }
};

// @desc    Get subscription analytics
// @route   GET /api/admin/subscriptions/analytics
// @access  Private/Admin
exports.getSubscriptionAnalytics = async (req, res) => {
  try {
    // Get subscription counts by plan type
    const basicPlans = await Subscription.countDocuments({ plan: 'basic', status: 'active' });
    const businessPlans = await Subscription.countDocuments({ plan: 'business', status: 'active' });
    const premiumPlans = await Subscription.countDocuments({ plan: 'premium', status: 'active' });
    const enterprisePlans = await Subscription.countDocuments({ plan: 'enterprise', status: 'active' });
    
    // Get subscription revenue by plan
    const allSubscriptions = await Subscription.find({ status: 'active' });
    
    const revenueByPlan = {
      basic: 0,
      business: 0,
      premium: 0,
      enterprise: 0
    };
    
    allSubscriptions.forEach(sub => {
      revenueByPlan[sub.plan] += sub.price;
    });
    
    // Get pending subscription verifications
    const pendingVerifications = await Subscription.find({
      status: 'pending',
      isVerified: false
    }).populate({
      path: 'user',
      select: 'name email businessName'
    }).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      data: {
        counts: {
          basic: basicPlans,
          business: businessPlans,
          premium: premiumPlans,
          enterprise: enterprisePlans,
          total: basicPlans + businessPlans + premiumPlans + enterprisePlans
        },
        revenue: revenueByPlan,
        pendingVerifications
      }
    });
  } catch (error) {
    console.error('Subscription analytics error:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving subscription analytics'
    });
  }
};

// @desc    Get contact message analytics
// @route   GET /api/admin/contacts/analytics
// @access  Private/Admin
exports.getContactAnalytics = async (req, res) => {
  try {
    // Get contact counts by status
    const newContacts = await Contact.countDocuments({ status: 'new' });
    const readContacts = await Contact.countDocuments({ status: 'read' });
    const respondedContacts = await Contact.countDocuments({ status: 'responded' });
    
    // Get recent contact submissions
    const recentContacts = await Contact.find()
      .sort({ createdAt: -1 })
      .limit(20);
    
    // Get contacts needing attention
    const needAttention = await Contact.find({ status: 'new' })
      .sort({ createdAt: 1 }) // Oldest first
      .limit(10);
    
    res.status(200).json({
      success: true,
      data: {
        counts: {
          new: newContacts,
          read: readContacts,
          responded: respondedContacts,
          total: newContacts + readContacts + respondedContacts
        },
        recentContacts,
        needAttention
      }
    });
  } catch (error) {
    console.error('Contact analytics error:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving contact analytics'
    });
  }
};

// @desc    Delete a user account (admin only)
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
exports.deleteUser = async (req, res) => {
  try {
    // Find the user
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    // Don't allow deletion of other admin accounts
    if (user.role === 'admin' && user._id.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Admin cannot delete another admin account'
      });
    }
    
    // Delete user's subscriptions
    await Subscription.deleteMany({ user: req.params.id });
    
    // Delete the user
    await User.findByIdAndDelete(req.params.id);
    
    res.status(200).json({
      success: true,
      message: 'User account and all associated data deleted successfully'
    });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting user account'
    });
  }
};

// @desc    Get all recent contact submissions with details
// @route   GET /api/admin/contact-submissions
// @access  Private/Admin
exports.getContactSubmissions = async (req, res) => {
  try {
    // Get all contact submissions, newest first
    const contacts = await Contact.find()
      .sort({ createdAt: -1 })
      .limit(50);
    
    res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts
    });
  } catch (error) {
    console.error('Get contact submissions error:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving contact submissions'
    });
  }
};

// @desc    Get all pending payment verifications
// @route   GET /api/admin/pending-verifications
// @access  Private/Admin
exports.getPendingVerifications = async (req, res) => {
  try {
    // Find all pending subscriptions
    const pendingSubscriptions = await Subscription.find({
      status: 'pending',
      isVerified: false
    }).populate({
      path: 'user',
      select: 'name email phone businessName'
    }).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: pendingSubscriptions.length,
      data: pendingSubscriptions
    });
  } catch (error) {
    console.error('Get pending verifications error:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving pending verifications'
    });
  }
};

// @desc    Get admin dashboard full data
// @route   GET /api/admin/dashboard
// @access  Private/Admin
exports.getFullDashboard = async (req, res) => {
  try {
    // User statistics
    const totalUsers = await User.countDocuments({ role: 'user' });
    const newUsers = await User.find({ role: 'user' })
      .sort({ createdAt: -1 })
      .limit(10)
      .select('name email businessName createdAt');
    
    // Subscription statistics
    const pendingSubscriptions = await Subscription.countDocuments({ status: 'pending', isVerified: false });
    const activeSubscriptions = await Subscription.countDocuments({ status: 'active', isVerified: true });
    const pendingVerificationsList = await Subscription.find({ 
      status: 'pending', 
      isVerified: false 
    })
      .populate({
        path: 'user',
        select: 'name email businessName'
      })
      .sort({ createdAt: -1 })
      .limit(7);
    
    // Revenue calculation
    const allSubscriptions = await Subscription.find({ status: 'active', isVerified: true });
    const totalRevenue = allSubscriptions.reduce((sum, sub) => sum + sub.price, 0);
    
    // Contact form submissions
    const newMessages = await Contact.countDocuments({ status: 'new' });
    const recentMessages = await Contact.find()
      .sort({ createdAt: -1 })
      .limit(7);
    
    // Comprehensive stats for the admin dashboard
    res.status(200).json({
      success: true,
      data: {
        users: {
          total: totalUsers,
          newUsers
        },
        subscriptions: {
          pending: pendingSubscriptions,
          active: activeSubscriptions,
          pendingList: pendingVerificationsList
        },
        contacts: {
          newCount: newMessages,
          recentMessages
        },
        revenue: {
          total: totalRevenue
        }
      }
    });
  } catch (error) {
    console.error('Admin dashboard error:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving admin dashboard data'
    });
  }
}; 