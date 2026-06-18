import { Router } from 'express';
import { Workout } from '../models/workout.js';

export const workoutsRouter = Router();

workoutsRouter.get('/', async (_request, response, next) => {
  try {
    const workouts = await Workout.find().sort({ createdAt: -1 });
    response.json(workouts);
  } catch (error) {
    next(error);
  }
});

workoutsRouter.post('/', async (request, response, next) => {
  try {
    const workout = await Workout.create(request.body);
    response.status(201).json(workout);
  } catch (error) {
    next(error);
  }
});
