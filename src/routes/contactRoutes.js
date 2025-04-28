const express = require('express');
const {
  submitContactForm,
  getContacts,
  getContact,
  updateContactStatus,
  replyToContact,
  getContactSubmissions,
  updateSubmissionStatus
} = require('../controllers/contactController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

// Public route for submitting contact form
router.post('/', submitContactForm);

// Admin-only routes
router.get('/', protect, authorize('admin'), getContacts);
router.route('/:id')
  .get(protect, authorize('admin'), getContact)
  .put(protect, authorize('admin'), updateContactStatus);

// Admin reply endpoint
router.post('/:id/reply', protect, authorize('admin'), replyToContact);

// Admin-only routes for contact submissions
router.get('/submissions', protect, authorize('admin'), getContactSubmissions);
router.put('/submissions/:id', protect, authorize('admin'), updateSubmissionStatus);

module.exports = router; 