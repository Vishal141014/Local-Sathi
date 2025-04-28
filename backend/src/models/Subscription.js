const mongoose = require('mongoose');

const SubscriptionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  plan: {
    type: String,
    enum: ['basic', 'business', 'premium', 'enterprise'],
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'active', 'expired', 'cancelled'],
    default: 'pending'
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  paymentReference: {
    type: String,
    required: true,
    unique: true
  },
  paymentMethod: {
    type: String,
    required: true
  },
  startDate: {
    type: Date
  },
  endDate: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Before saving, ensure the paymentReference is not null or empty
SubscriptionSchema.pre('save', function(next) {
  if (!this.paymentReference || this.paymentReference.trim() === '') {
    this.paymentReference = 'REF-' + Date.now() + '-' + Math.floor(1000 + Math.random() * 9000);
  }
  next();
});

// Find active subscription for a user
SubscriptionSchema.statics.findActiveForUser = async function(userId) {
  return this.findOne({
    user: userId,
    status: 'active',
    isVerified: true,
    endDate: { $gte: new Date() }
  }).sort({ createdAt: -1 });
};

module.exports = mongoose.model('Subscription', SubscriptionSchema); 