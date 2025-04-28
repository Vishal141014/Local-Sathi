const mongoose = require('mongoose');
const colors = require('colors');

const connectDB = async () => {
  try {
    // Default to a local MongoDB instance if MONGO_URI is not provided
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/local-sathi';
    
    console.log(`Attempting to connect to MongoDB: ${mongoUri.split('@').pop()}`.cyan);
    
    const conn = await mongoose.connect(mongoUri);

    console.log(`MongoDB Connected: ${conn.connection.host}`.green.bold);
    
    // Fix subscription index issues
    await fixSubscriptionIndexes();
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`.red.bold);
    console.log('The application will continue with limited functionality'.yellow);
  }
};

// Helper function to fix subscription indexes
const fixSubscriptionIndexes = async () => {
  try {
    const db = mongoose.connection.db;
    
    // Check if subscriptions collection exists
    const collections = await db.listCollections({ name: 'subscriptions' }).toArray();
    if (collections.length === 0) {
      console.log('Subscriptions collection does not exist yet, skipping index fix'.yellow);
      return;
    }
    
    const subscriptions = db.collection('subscriptions');
    
    // Check for reference_1 index
    const indexInfo = await subscriptions.indexInformation();
    
    if (indexInfo.reference_1) {
      console.log('Found problematic reference_1 index, dropping...'.yellow);
      await subscriptions.dropIndex('reference_1');
      console.log('Index dropped successfully'.green);
    }
    
    // Update any documents with null references
    await subscriptions.updateMany(
      { reference: null },
      { $unset: { reference: "" } }
    );
    
    console.log('Subscription collection indexes verified'.green);
  } catch (error) {
    console.error(`Error fixing subscription indexes: ${error.message}`.red);
  }
};

module.exports = connectDB; 