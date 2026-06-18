import { Router } from 'express';
import { LeaderboardEntry } from '../models/leaderboardEntry.js';

export const leaderboardRouter = Router();

leaderboardRouter.get('/', async (_request, response, next) => {
  try {
    const leaderboard = await LeaderboardEntry.find().populate('user').sort({ points: -1, updatedAt: 1 });
    response.json(leaderboard);
  } catch (error) {
    next(error);
  }
});

leaderboardRouter.post('/', async (request, response, next) => {
  try {
    const leaderboardEntry = await LeaderboardEntry.create(request.body);
    response.status(201).json(leaderboardEntry);
  } catch (error) {
    next(error);
  }
});
