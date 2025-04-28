const mongoose = require('mongoose');
const colors = require('colors');

const connectDB = async () => {
  try {
    // Default to a local MongoDB instance if MONGO_URI is not provided
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/local-sathi';
    
    console.log(`Attempting to connect to MongoDB: ${mongoUri.split('@').pop()}`.cyan);
    
    const conn = await mongoose.connect(mongoUri);

    console.log(`MongoDB Connected: ${conn.connection.host}`.green.bold);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`.red.bold);
    console.log('The application will continue with limited functionality'.yellow);
  }
};

module.exports = connectDB; 