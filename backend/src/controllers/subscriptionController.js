const Subscription = require('../models/Subscription');
const User = require('../models/User');

// @desc    Create a new subscription
// @route   POST /api/subscriptions
// @access  Private
exports.createSubscription = async (req, res) => {
  try {
    const { plan, price, paymentReference, paymentMethod } = req.body;

    // Ensure we have a payment reference to avoid duplicate key errors
    if (!paymentReference) {
      return res.status(400).json({
        success: false,
        message: 'Payment reference is required'
      });
    }

    // Check if a subscription with this reference already exists
    const existingSubscription = await Subscription.findOne({ paymentReference });
    if (existingSubscription) {
      return res.status(400).json({
        success: false,
        message: 'A subscription with this payment reference already exists'
      });
    }

    // Create subscription
    const subscription = await Subscription.create({
      user: req.user.id,
      plan,
      price,
      paymentReference,
      paymentMethod,
      status: 'pending',
      isVerified: false
    });

    res.status(201).json({
      success: true,
      data: subscription
    });
  } catch (error) {
    console.error('Create subscription error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating subscription'
    });
  }
};

// @desc    Get all subscriptions (admin) or user subscriptions
// @route   GET /api/subscriptions
// @access  Private
exports.getSubscriptions = async (req, res) => {
  try {
    let query;
    
    // If user is admin, get all subscriptions
    if (req.user.role === 'admin') {
      query = Subscription.find().populate({
        path: 'user',
        select: 'name email businessName'
      });
    } else {
      // If regular user, get only their subscriptions
      query = Subscription.find({ user: req.user.id });
    }

    const subscriptions = await query;

    res.status(200).json({
      success: true,
      count: subscriptions.length,
      data: subscriptions
    });
  } catch (error) {
    console.error('Get subscriptions error:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving subscriptions'
    });
  }
};

// @desc    Get single subscription
// @route   GET /api/subscriptions/:id
// @access  Private
exports.getSubscription = async (req, res) => {
  try {
    const subscription = await Subscription.findById(req.params.id).populate({
      path: 'user',
      select: 'name email businessName'
    });

    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: 'Subscription not found'
      });
    }

    // Make sure user is subscription owner or admin
    if (subscription.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this subscription'
      });
    }

    res.status(200).json({
      success: true,
      data: subscription
    });
  } catch (error) {
    console.error('Get subscription error:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving subscription'
    });
  }
};

// @desc    Verify a subscription (admin only)
// @route   PUT /api/subscriptions/:id/verify
// @access  Private/Admin
exports.verifySubscription = async (req, res) => {
  try {
    let subscription = await Subscription.findById(req.params.id);

    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: 'Subscription not found'
      });
    }

    // Set verification details
    const startDate = new Date();
    
    // Calculate end date (30 days from start)
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 30);

    // Update subscription
    subscription = await Subscription.findByIdAndUpdate(req.params.id, {
      isVerified: true,
      status: 'active',
      startDate,
      endDate
    }, { new: true });

    res.status(200).json({
      success: true,
      data: subscription
    });
  } catch (error) {
    console.error('Verify subscription error:', error);
    res.status(500).json({
      success: false,
      message: 'Error verifying subscription'
    });
  }
};

// @desc    Get subscription by reference
// @route   GET /api/subscriptions/reference/:reference
// @access  Private
exports.getSubscriptionByReference = async (req, res) => {
  try {
    const subscription = await Subscription.findOne({
      paymentReference: req.params.reference
    }).populate({
      path: 'user',
      select: 'name email businessName'
    });

    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: 'Subscription not found'
      });
    }

    // Make sure user is subscription owner or admin
    if (subscription.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this subscription'
      });
    }

    res.status(200).json({
      success: true,
      data: subscription
    });
  } catch (error) {
    console.error('Get subscription by reference error:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving subscription'
    });
  }
};

// @desc    Get user's active subscription
// @route   GET /api/subscriptions/active
// @access  Private
exports.getActiveSubscription = async (req, res) => {
  try {
    const subscription = await Subscription.findOne({
      user: req.user.id,
      status: 'active',
      isVerified: true,
      endDate: { $gte: new Date() }
    }).sort({ createdAt: -1 });

    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: 'No active subscription found'
      });
    }

    res.status(200).json({
      success: true,
      data: subscription
    });
  } catch (error) {
    console.error('Get active subscription error:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving active subscription'
    });
  }
};

// @desc    Get user's subscriptions
// @route   GET /api/subscriptions/user/:userId
// @access  Private/Admin
exports.getUserSubscriptions = async (req, res) => {
  try {
    // Verify user exists
    const user = await User.findById(req.params.userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    // Get user's subscriptions
    const subscriptions = await Subscription.find({ user: req.params.userId })
      .sort({ createdAt: -1 });
    
    // Get active subscription
    const activeSubscription = subscriptions.find(
      sub => sub.status === 'active' && sub.isVerified && new Date(sub.endDate) >= new Date()
    );
    
    res.status(200).json({
      success: true,
      data: {
        count: subscriptions.length,
        active: activeSubscription || null,
        all: subscriptions
      }
    });
  } catch (error) {
    console.error('Get user subscriptions error:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving user subscriptions'
    });
  }
};

// @desc    Cancel a subscription (admin only)
// @route   PUT /api/subscriptions/:id/cancel
// @access  Private/Admin
exports.cancelSubscription = async (req, res) => {
  try {
    let subscription = await Subscription.findById(req.params.id);

    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: 'Subscription not found'
      });
    }

    // Update subscription status to cancelled
    subscription = await Subscription.findByIdAndUpdate(req.params.id, {
      status: 'cancelled'
    }, { new: true });

    res.status(200).json({
      success: true,
      data: subscription
    });
  } catch (error) {
    console.error('Cancel subscription error:', error);
    res.status(500).json({
      success: false,
      message: 'Error cancelling subscription'
    });
  }
}; 