import { Router } from 'express';
import { Team } from '../models/team.js';

export const teamsRouter = Router();

teamsRouter.get('/', async (_request, response, next) => {
  try {
    const teams = await Team.find().populate('members').sort({ createdAt: -1 });
    response.json(teams);
  } catch (error) {
    next(error);
  }
});

teamsRouter.post('/', async (request, response, next) => {
  try {
    const team = await Team.create(request.body);
    response.status(201).json(team);
  } catch (error) {
    next(error);
  }
});
