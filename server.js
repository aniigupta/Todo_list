const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const TaskRoutes = require('./routes/TaskRoutes');
const userRoutes = require('./routes/userRoutes');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
// require('./connectDb');
require('dotenv').config();

const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cookieParser());


const mongoURI = "mongodb+srv://aniket_1234:aniket%401234@cluster0.ta8lnc3.mongodb.net/Todo_List?retryWrites=true&w=majority"

mongoose.connect(mongoURI)
    .then(() => console.log('✅ Connected to MongoDB Atlas'))
    .catch(err => {
        console.error('MongoDB connection error: ', err);
        process.exit(1);
    });

app.use('/api/task', TaskRoutes);
app.use('/api/user', userRoutes);

app.listen(PORT, () => {
    console.log(`✅ Server is running ${PORT}`);
});
