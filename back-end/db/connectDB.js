import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_DB_URI);
    console.log('connected:', connection.connection.host);
  } catch (error) {
    console.log('connection error:', error.message);
    process.exit(1);
  }
};
