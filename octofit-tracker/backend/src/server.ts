import express, { Express, Request, Response } from 'express';
import mongoose from 'mongoose';

const app: Express = express();
const PORT: number = 8000;
const MONGODB_URI: string = 'mongodb://localhost:27017/octofit-tracker';

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✓ MongoDB connected successfully');
  } catch (error) {
    console.error('✗ MongoDB connection error:', error);
    process.exit(1);
  }
};

// Routes
app.get('/', (req: Request, res: Response): void => {
  res.json({ message: 'OctoFit Tracker API - Backend Server' });
});

app.get('/health', (req: Request, res: Response): void => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Start Server
const startServer = async (): Promise<void> => {
  await connectDB();
  app.listen(PORT, (): void => {
    console.log(`✓ Server running on http://localhost:${PORT}`);
  });
};

startServer().catch((error: Error) => {
  console.error('Server startup error:', error);
  process.exit(1);
});

export default app;
