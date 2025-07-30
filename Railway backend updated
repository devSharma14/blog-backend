import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import postRoutes from './routes/posts.js';
import userRouter from './routes/user.js';

const app = express();

// ✅ CORS Setup
app.use(cors({
  origin: 'https://memories-project-blog.vercel.app',
  credentials: true
}));

// ✅ Middleware for parsing JSON
app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));

// ✅ Routes
app.get('/', (req, res) => {
  res.send('Hello from Railway!');
});
app.use('/posts', postRoutes);
app.use('/user', userRouter);

// ✅ MongoDB Connection
const CONNECTION_URL = 'mongodb+srv://devs140124:24uRXg8pXEfPTRp9@cluster0.cy5ubvu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const PORT = process.env.PORT || 8000;

mongoose.connect(CONNECTION_URL)
  .then(() => {
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((error) => console.log('MongoDB connection error:', error.message));
