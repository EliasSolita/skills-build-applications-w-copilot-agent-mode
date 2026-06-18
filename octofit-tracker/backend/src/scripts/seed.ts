import dotenv from 'dotenv';
import { connectDatabase, disconnectDatabase } from '../config/database.js';
import { Activity } from '../models/activity.js';
import { LeaderboardEntry } from '../models/leaderboardEntry.js';
import { Team } from '../models/team.js';
import { User } from '../models/user.js';
import { Workout } from '../models/workout.js';

dotenv.config();

async function seedDatabase() {
  console.log('Seed the octofit_db database with test data');
  await connectDatabase();

  await Promise.all([
    Activity.deleteMany({}),
    LeaderboardEntry.deleteMany({}),
    Team.deleteMany({}),
    User.deleteMany({}),
    Workout.deleteMany({}),
  ]);

  const users = await User.insertMany([
    {
      name: 'Maya Chen',
      email: 'maya.chen@example.com',
      role: 'member',
      profile: { fitnessGoal: 'Train for a 10K', level: 'intermediate' },
    },
    {
      name: 'Andre Johnson',
      email: 'andre.johnson@example.com',
      role: 'coach',
      profile: { fitnessGoal: 'Build functional strength', level: 'advanced' },
    },
    {
      name: 'Priya Patel',
      email: 'priya.patel@example.com',
      role: 'member',
      profile: { fitnessGoal: 'Improve mobility and endurance', level: 'beginner' },
    },
    {
      name: 'Luis Martinez',
      email: 'luis.martinez@example.com',
      role: 'member',
      profile: { fitnessGoal: 'Maintain weekly activity streak', level: 'intermediate' },
    },
  ]);

  await Team.insertMany([
    {
      name: 'Morning Movers',
      description: 'Early risers focused on cardio consistency and weekly streaks.',
      members: [users[0]._id, users[2]._id],
    },
    {
      name: 'Strength Squad',
      description: 'A team for resistance training, circuits, and steady progression.',
      members: [users[1]._id, users[3]._id],
    },
  ]);

  await Activity.insertMany([
    {
      user: users[0]._id,
      type: 'Outdoor Run',
      durationMinutes: 42,
      caloriesBurned: 410,
      completedAt: new Date('2026-06-14T12:30:00.000Z'),
    },
    {
      user: users[1]._id,
      type: 'Strength Training',
      durationMinutes: 55,
      caloriesBurned: 520,
      completedAt: new Date('2026-06-15T17:45:00.000Z'),
    },
    {
      user: users[2]._id,
      type: 'Yoga Flow',
      durationMinutes: 35,
      caloriesBurned: 180,
      completedAt: new Date('2026-06-16T07:15:00.000Z'),
    },
    {
      user: users[3]._id,
      type: 'Cycling',
      durationMinutes: 48,
      caloriesBurned: 460,
      completedAt: new Date('2026-06-17T18:00:00.000Z'),
    },
  ]);

  await LeaderboardEntry.insertMany([
    { user: users[1]._id, points: 980, rank: 1 },
    { user: users[3]._id, points: 860, rank: 2 },
    { user: users[0]._id, points: 790, rank: 3 },
    { user: users[2]._id, points: 620, rank: 4 },
  ]);

  await Workout.insertMany([
    {
      title: 'Tempo Run Builder',
      description: 'A structured run session with warmup, tempo intervals, and cooldown.',
      level: 'intermediate',
      durationMinutes: 45,
      activities: ['Jog warmup', 'Tempo intervals', 'Cooldown walk'],
    },
    {
      title: 'Full Body Strength Circuit',
      description: 'A balanced resistance workout for major muscle groups.',
      level: 'advanced',
      durationMinutes: 50,
      activities: ['Squats', 'Push press', 'Rows', 'Plank holds'],
    },
    {
      title: 'Mobility Reset',
      description: 'Low-impact mobility work for recovery and range of motion.',
      level: 'beginner',
      durationMinutes: 25,
      activities: ['Hip openers', 'Thoracic rotations', 'Hamstring stretches'],
    },
  ]);

  console.log('Seed data created successfully');
}

seedDatabase()
  .catch((error) => {
    console.error('Seed failed:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await disconnectDatabase();
  });
