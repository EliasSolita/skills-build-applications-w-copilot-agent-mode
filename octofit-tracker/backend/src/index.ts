import express from 'express';
import dotenv from 'dotenv';
import { connectDatabase } from './database.js';
import { activitiesRouter } from './routes/activities.js';
import { leaderboardRouter } from './routes/leaderboard.js';
import { teamsRouter } from './routes/teams.js';
import { usersRouter } from './routes/users.js';
import { workoutsRouter } from './routes/workouts.js';

dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 8000;
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDatabase().catch((error) => {
  console.error('MongoDB connection error:', error);
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    apiBaseUrl,
    timestamp: new Date().toISOString(),
  });
});

app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

app.use((error: Error, _request: express.Request, response: express.Response, _next: express.NextFunction) => {
  response.status(500).json({
    message: 'Unexpected server error',
    error: error.message,
  });
});

app.listen(port, () => {
  console.log(`OctoFit Tracker API running on port ${port}`);
  console.log(`API base URL: ${apiBaseUrl}`);
});
