import mongoose from 'mongoose';

export const DATABASE_NAME = 'octofit_db';
export const MONGODB_URI = process.env.MONGODB_URI || `mongodb://localhost:27017/${DATABASE_NAME}`;

export async function connectDatabase() {
  await mongoose.connect(MONGODB_URI);
  console.log(`Connected to MongoDB database: ${DATABASE_NAME}`);
}

export async function disconnectDatabase() {
  await mongoose.connection.close();
}
