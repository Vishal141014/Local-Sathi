const mongoose = require('mongoose');
const dotenv = require('dotenv');
const colors = require('colors');

// Load environment variables
dotenv.config({ path: '../../.env' });

const fixSubscriptionIndex = async () => {
  try {
    // Connect to MongoDB
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/local-sathi';
    console.log(`Attempting to connect to MongoDB: ${mongoUri.split('@').pop()}`.cyan);
    
    await mongoose.connect(mongoUri);
    console.log(`MongoDB Connected`.green.bold);

    // Get the subscriptions collection
    const db = mongoose.connection.db;
    const subscriptions = db.collection('subscriptions');
    
    // Drop the reference index if it exists
    const indexInfo = await subscriptions.indexInformation();
    console.log('Current indexes:', indexInfo);
    
    if (indexInfo.reference_1) {
      console.log('Dropping reference_1 index...'.yellow);
      await subscriptions.dropIndex('reference_1');
      console.log('Index dropped successfully'.green);
    }
    
    // Rename the paymentReference field on any documents that have a null reference
    console.log('Updating documents with null references...'.yellow);
    const updateResult = await subscriptions.updateMany(
      { reference: null },
      { $unset: { reference: "" } }
    );
    console.log(`Updated ${updateResult.modifiedCount} documents`.green);
    
    console.log('All done! The subscription model should now work correctly.'.green.bold);
    process.exit(0);
  } catch (error) {
    console.error(`Error: ${error.message}`.red.bold);
    process.exit(1);
  }
};

fixSubscriptionIndex(); 