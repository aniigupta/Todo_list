const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const TaskRoutes = require('./routes/TaskRoutes');
const mongoose = require('./connectdb');

const PORT = process.env.PORT || 5000;
app.use(bodyparser.json());

app.use('/api/task', TaskRoutes);

app.listen(PORT, () => {
    console.log(`✅ Server is running ${PORT}`);
});
