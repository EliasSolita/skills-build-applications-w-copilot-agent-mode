import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    role: { type: String, default: 'member', trim: true },
    profile: {
      fitnessGoal: { type: String, default: '', trim: true },
      level: { type: String, default: 'beginner', trim: true },
    },
  },
  { timestamps: true },
);

export const User = mongoose.model('User', userSchema);
