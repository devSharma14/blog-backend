import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import postRoutes from './routes/posts.js';
import userRouter from './routes/user.js';

const app = express();

// 🌐 CORS setup - allows requests from anywhere (for testing)
// ⚠️ For production, replace '*' with your frontend domain


app.use(cors({
  origin: 'https://memories-project-blog.vercel.app', // OR: 'https://your-frontend.vercel.app'
  credentials: true,
}));

app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));

// Routes
app.get('/', (req, res) => {
  res.send('✅ Backend is deployed and running!');
});

app.use('/posts', postRoutes);
app.use('/user', userRouter);

// MongoDB connection
const CONNECTION_URL = process.env.MONGO_URI || 'mongodb+srv://devs140124:ASzB9bbAmFYkfxpV@cluster0.cy5ubvu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const PORT = process.env.PORT || 8000;

mongoose.connect(CONNECTION_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port: ${PORT}`);
  });
}).catch((error) => {
  console.error('❌ MongoDB connection error:', error.message);
});
