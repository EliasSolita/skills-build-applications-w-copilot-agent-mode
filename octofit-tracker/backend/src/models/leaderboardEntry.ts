import mongoose, { Schema } from 'mongoose';

const leaderboardEntrySchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    points: { type: Number, default: 0, min: 0 },
    rank: { type: Number, default: 0, min: 0 },
  },
  { timestamps: true },
);

export const LeaderboardEntry = mongoose.model('LeaderboardEntry', leaderboardEntrySchema);
