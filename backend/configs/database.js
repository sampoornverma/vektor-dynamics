import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
	try {
		const dbUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/vektor_dynamics';
		const conn = await mongoose.connect(dbUri);
		console.log(`db connected: ${dbUri}`);
		return conn;
	} catch (error) {
		console.warn('⚠️ MongoDB connection failed. Database storage will be disabled, but mail operations will still work.');
		console.warn(error.message);
		return null;
	}
};

export default connectDB;
