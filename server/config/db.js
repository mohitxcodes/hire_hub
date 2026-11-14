import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongod = null;

const connectDB = async () => {
  // First try direct connection if MONGODB_URI is provided
  if (process.env.MONGODB_URI && !process.env.MONGODB_URI.includes('localhost') && !process.env.MONGODB_URI.includes('127.0.0.1')) {
    try {
      const conn = await mongoose.connect(process.env.MONGODB_URI);
      console.log(`✅ MongoDB Connected to Atlas/Remote: ${conn.connection.host}`);
      return conn;
    } catch (err) {
      console.warn(`Could not connect to external MongoDB: ${err.message}. Falling back to in-memory MongoDB...`);
    }
  }

  // Fallback to MongoMemoryServer for instant zero-dependency execution
  try {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    const conn = await mongoose.connect(uri);
    console.log(`✅ In-Memory MongoDB Server started and connected at ${uri}`);
    return conn;
  } catch (error) {
    console.error(`❌ Failed to start in-memory MongoDB: ${error.message}`);
    // Last resort attempt local mongod
    try {
      const conn = await mongoose.connect('mongodb://127.0.0.1:27017/hirehub', {
        serverSelectionTimeoutMS: 2000,
      });
      console.log(`✅ Local MongoDB Connected: ${conn.connection.host}`);
      return conn;
    } catch (e) {
      console.error(`Fatal DB connection error: ${e.message}`);
    }
  }
};

export default connectDB;
