const express = require('express');
const {
  createSubscription,
  getSubscriptions,
  getSubscription,
  verifySubscription,
  cancelSubscription,
  getSubscriptionByReference,
  getActiveSubscription,
  getUserSubscriptions
} = require('../controllers/subscriptionController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

// Apply authentication to all routes
router.use(protect);

// Routes that all authenticated users can access
router.route('/')
  .get(getSubscriptions)
  .post(createSubscription);

router.get('/active', getActiveSubscription);
router.get('/reference/:reference', getSubscriptionByReference);

// Admin-only routes
router.put('/:id/verify', authorize('admin'), verifySubscription);
router.put('/:id/cancel', authorize('admin'), cancelSubscription);
router.get('/user/:userId', authorize('admin'), getUserSubscriptions);

// Route accessible by both users and admins, but with different permissions
router.get('/:id', getSubscription);

module.exports = router; 