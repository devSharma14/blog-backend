import express from 'express';
import serverless from 'serverless-http';
import mongoose from 'mongoose';
import cors from 'cors';
import postRoutes from './routes/posts.js';
import userRouter from './routes/user.js';

// Initialize app
const app = express();

// Middleware
app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

// Routes
app.get('/', (req, res) => {
  res.send('Hello from Vercel!');
});
app.use('/posts', postRoutes);
app.use('/user', userRouter);

const PORT = 8000;
// MongoDB Connection
const CONNECTION_URL = 'mongodb+srv://devs140124:24uRXg8pXEfPTRp9@cluster0.cy5ubvu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(CONNECTION_URL)
  .then(() => {
    // Start the server
    app.listen(PORT, () => console.log(`Server is listening on port: ${PORT}`));
  })
  .catch((error) => console.log(error.message));

// Export the app as a serverless function
export const handler = serverless(app);
