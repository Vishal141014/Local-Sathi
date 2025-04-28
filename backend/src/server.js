const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const subscriptionRoutes = require('./routes/subscriptionRoutes');
const contactRoutes = require('./routes/contactRoutes');
const adminRoutes = require('./routes/adminRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express
const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173', 'https://*.vercel.app'],
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging
app.use(morgan('dev'));

// Create default admin user
const createDefaultAdmin = async () => {
  try {
    const User = require('./models/User');
    
    // Check if admin already exists
    const adminExists = await User.findOne({ email: 'syntax@team.com' });
    
    if (!adminExists) {
      console.log('Creating default admin user...'.blue);
      const admin = await User.create({
        name: 'Administrator',
        email: 'syntax@team.com',
        password: '200314',
        phone: '1234567890',
        address: 'System Address',
        businessName: 'Local Sathi Admin',
        businessType: 'service',
        role: 'admin'
      });
      console.log('Default admin user created successfully!'.green);
    } else {
      console.log('Default admin user already exists'.blue);
    }
  } catch (error) {
    console.error('Error creating default admin:'.red, error);
  }
};

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to Local Sathi API',
    version: '1.0.0'
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'Local Sathi API'
  });
});

// Error handling - 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.originalUrl}`
  });
});

// Start server
const PORT = process.env.PORT || 5003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`.yellow.bold);
  
  // Try to create default admin after server starts
  setTimeout(() => {
    createDefaultAdmin();
  }, 2000);
}); 