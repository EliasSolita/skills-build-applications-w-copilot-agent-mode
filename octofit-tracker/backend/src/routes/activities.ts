import { Router } from 'express';
import { Activity } from '../models/activity.js';

export const activitiesRouter = Router();

activitiesRouter.get('/', async (_request, response, next) => {
  try {
    const activities = await Activity.find().populate('user').sort({ completedAt: -1 });
    response.json(activities);
  } catch (error) {
    next(error);
  }
});

activitiesRouter.post('/', async (request, response, next) => {
  try {
    const activity = await Activity.create(request.body);
    response.status(201).json(activity);
  } catch (error) {
    next(error);
  }
});
