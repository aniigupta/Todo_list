import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';  

import TaskRoutes from './routes/TaskRoutes.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true, 
}));


const mongoURI = "mongodb+srv://aniket_1234:aniket%401234@cluster0.ta8lnc3.mongodb.net/Todo_List?retryWrites=true&w=majority";


mongoose.connect(mongoURI)
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

app.use('/api/task', TaskRoutes);
app.use('/api/user', userRoutes);


app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
