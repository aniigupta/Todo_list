const mongoose = require('mongoose');

const mongoURI = "mongodb+srv://aniket_1234:aniket%401234@cluster0.ta8lnc3.mongodb.net/todo_list?retryWrites=true&w=majority";

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Connected to MongoDB Atlas'))
.catch(err => {
  console.error('❌ MongoDB connection error: ', err);
  process.exit(1); 
});

module.exports = mongoose;
