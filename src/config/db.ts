import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const MONGODB_URI = process.env.MONGODB_URI;
    
    if (!MONGODB_URI) {
      throw new Error('Please define MONGODB_URI in your .env file');
    }

    await mongoose.connect(MONGODB_URI);
    console.log(' MongoDB Atlas connected successfully');
  } catch (error) {
    console.error(' MongoDB connection error:', error);
    process.exit(1);
  }
};

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB error:', err);
});
