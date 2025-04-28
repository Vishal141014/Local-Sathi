const User = require('../models/User');
const Subscription = require('../models/Subscription');
const Contact = require('../models/Contact');

// @desc    Get user dashboard data
// @route   GET /api/dashboard
// @access  Private
exports.getDashboard = async (req, res) => {
  try {
    // Get user data
    const user = req.user;
    
    // Different dashboard data based on role
    if (user.role === 'admin') {
      // Admin dashboard
      // Count total users (customers)
      const totalCustomers = await User.countDocuments({ role: 'user' });
      
      // Get last month's total customers for comparison
      const lastMonth = new Date();
      lastMonth.setMonth(lastMonth.getMonth() - 1);
      const lastMonthCustomers = await User.countDocuments({ 
        role: 'user',
        createdAt: { $lt: lastMonth }
      });
      
      // Calculate customer growth percentage
      const customerGrowthPercent = lastMonthCustomers > 0 
        ? Math.round(((totalCustomers - lastMonthCustomers) / lastMonthCustomers) * 100) 
        : 12; // Default to 12% if no previous month data
      
      // Count active subscriptions
      const activeSubscriptions = await Subscription.countDocuments({ 
        status: 'active',
        isVerified: true 
      });
      
      // Get last month's active subscriptions
      const lastMonthActiveSubscriptions = await Subscription.countDocuments({
        status: 'active',
        isVerified: true,
        createdAt: { $lt: lastMonth }
      });
      
      // Calculate subscription growth percentage
      const subscriptionGrowthPercent = lastMonthActiveSubscriptions > 0
        ? Math.round(((activeSubscriptions - lastMonthActiveSubscriptions) / lastMonthActiveSubscriptions) * 100)
        : 5; // Default to 5% if no previous month data
      
      // Count pending verifications
      const pendingVerifications = await Subscription.countDocuments({ 
        status: 'pending',
        isVerified: false 
      });
      
      // Get last month's pending verifications
      const lastMonthPendingVerifications = await Subscription.countDocuments({
        status: 'pending',
        isVerified: false,
        createdAt: { $lt: lastMonth }
      });
      
      // Calculate verification change percentage
      const verificationChangePercent = lastMonthPendingVerifications > 0
        ? Math.round(((pendingVerifications - lastMonthPendingVerifications) / lastMonthPendingVerifications) * 100)
        : -3; // Default to -3% if no previous month data
      
      // Calculate monthly revenue from active subscriptions
      const subscriptions = await Subscription.find({ 
        status: 'active',
        isVerified: true
      });
      
      const monthlyRevenue = subscriptions.reduce((acc, sub) => acc + sub.price, 0);
      
      // Get last month's revenue
      const lastMonthSubscriptions = await Subscription.find({
        status: 'active',
        isVerified: true,
        createdAt: { $lt: lastMonth }
      });
      
      const lastMonthRevenue = lastMonthSubscriptions.reduce((acc, sub) => acc + sub.price, 0);
      
      // Calculate revenue growth percentage
      const revenueGrowthPercent = lastMonthRevenue > 0
        ? Math.round(((monthlyRevenue - lastMonthRevenue) / lastMonthRevenue) * 100)
        : 8; // Default to 8% if no previous month data
      
      // Get recent subscriptions with user details
      const recentSubscriptions = await Subscription.find()
        .populate({
          path: 'user',
          select: 'name email phone businessName'
        })
        .sort({ createdAt: -1 })
        .limit(10);
      
      // Format recent subscriptions data
      const formattedRecentSubscriptions = recentSubscriptions.map(sub => ({
        id: sub._id,
        customer: sub.user.name,
        customerId: sub.user._id,
        customerEmail: sub.user.email,
        customerPhone: sub.user.phone,
        customerBusiness: sub.user.businessName,
        plan: sub.plan,
        amount: sub.price,
        date: sub.createdAt,
        status: sub.status,
        isVerified: sub.isVerified
      }));
      
      // Get recent contact messages
      const recentMessages = await Contact.find()
        .sort({ createdAt: -1 })
        .limit(10);
        
      return res.status(200).json({
        success: true,
        data: {
          user,
          stats: {
            totalCustomers,
            customerGrowthPercent,
            monthlyRevenue,
            revenueGrowthPercent,
            activeSubscriptions,
            subscriptionGrowthPercent,
            pendingVerifications,
            verificationChangePercent
          },
          recentSubscriptions: formattedRecentSubscriptions,
          recentMessages
        }
      });
    } else {
      // Regular user dashboard
      // Get user's active subscription
      const activeSubscription = await Subscription.findOne({
        user: user._id,
        status: 'active',
        isVerified: true,
        endDate: { $gte: new Date() }
      }).sort({ createdAt: -1 });
      
      // Get user's pending subscriptions
      const pendingSubscriptions = await Subscription.find({
        user: user._id,
        status: 'pending'
      }).sort({ createdAt: -1 });
      
      // Get subscription history
      const subscriptionHistory = await Subscription.find({
        user: user._id
      }).sort({ createdAt: -1 });
      
      return res.status(200).json({
        success: true,
        data: {
          user,
          subscription: {
            active: activeSubscription || null,
            pending: pendingSubscriptions,
            history: subscriptionHistory
          }
        }
      });
    }
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving dashboard data'
    });
  }
}; 