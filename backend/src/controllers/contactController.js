const Contact = require('../models/Contact');
const ContactSubmission = require('../models/contactSubmissionModel');
const asyncHandler = require('express-async-handler');

// @desc    Submit a contact form
// @route   POST /api/contact
// @access  Public
const submitContactForm = asyncHandler(async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    res.status(400);
    throw new Error('Please fill all required fields');
  }

  const contactSubmission = await ContactSubmission.create({
    name,
    email,
    subject,
    message
  });

  if (contactSubmission) {
    res.status(201).json({
      success: true,
      message: 'Contact form submitted successfully'
    });
  } else {
    res.status(400);
    throw new Error('Invalid contact form data');
  }
});

// @desc    Get all contact submissions (admin only)
// @route   GET /api/contact
// @access  Private/Admin
const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    
    console.log(`Retrieved ${contacts.length} contact submissions`);
    
    res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts
    });
  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving contact submissions'
    });
  }
};

// @desc    Get single contact submission (admin only)
// @route   GET /api/contact/:id
// @access  Private/Admin
const getContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact submission not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: contact
    });
  } catch (error) {
    console.error('Get contact error:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving contact submission'
    });
  }
};

// @desc    Update contact status (admin only)
// @route   PUT /api/contact/:id
// @access  Private/Admin
const updateContactStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    // Check if status is valid
    if (!['new', 'read', 'responded'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status value'
      });
    }
    
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact submission not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: contact
    });
  } catch (error) {
    console.error('Update contact error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating contact submission'
    });
  }
};

// @desc    Reply to a contact submission (admin only)
// @route   POST /api/contact/:id/reply
// @access  Private/Admin
const replyToContact = async (req, res) => {
  try {
    const { replyText } = req.body;
    
    if (!replyText || replyText.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Reply text is required'
      });
    }
    
    // Find the contact
    const contact = await Contact.findById(req.params.id);
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact submission not found'
      });
    }
    
    // Update with reply details
    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.id,
      {
        reply: {
          text: replyText,
          sentAt: new Date(),
          sentBy: req.user.id
        },
        status: 'responded'
      },
      { new: true }
    );
    
    // Here you would typically implement email sending logic
    // to send the reply to the contact's email address
    // For example:
    // await sendEmail({
    //   to: contact.email,
    //   subject: 'Response to your inquiry',
    //   text: replyText
    // });
    
    res.status(200).json({
      success: true,
      message: 'Reply sent successfully',
      data: updatedContact
    });
  } catch (error) {
    console.error('Contact reply error:', error);
    res.status(500).json({
      success: false,
      message: 'Error sending reply'
    });
  }
};

// @desc    Get all contact form submissions
// @route   GET /api/admin/contact-submissions
// @access  Private/Admin
const getContactSubmissions = asyncHandler(async (req, res) => {
  const submissions = await ContactSubmission.find().sort({ createdAt: -1 });
  
  res.status(200).json({
    success: true,
    count: submissions.length,
    data: submissions
  });
});

// @desc    Update contact submission status
// @route   PUT /api/admin/contact-submissions/:id
// @access  Private/Admin
const updateSubmissionStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  
  if (!status || !['new', 'read', 'responded'].includes(status)) {
    res.status(400);
    throw new Error('Please provide a valid status');
  }

  const submission = await ContactSubmission.findById(req.params.id);

  if (!submission) {
    res.status(404);
    throw new Error('Contact submission not found');
  }

  submission.status = status;
  await submission.save();

  res.status(200).json({
    success: true,
    data: submission
  });
});

module.exports = {
  getContacts,
  getContact,
  updateContactStatus,
  replyToContact,
  submitContactForm,
  getContactSubmissions,
  updateSubmissionStatus
}; 