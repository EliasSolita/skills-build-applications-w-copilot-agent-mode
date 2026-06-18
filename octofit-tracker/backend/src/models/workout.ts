import mongoose, { Schema } from 'mongoose';

const workoutSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: '', trim: true },
    level: { type: String, default: 'beginner', trim: true },
    durationMinutes: { type: Number, default: 30, min: 0 },
    activities: [{ type: String, trim: true }],
  },
  { timestamps: true },
);

export const Workout = mongoose.model('Workout', workoutSchema);
