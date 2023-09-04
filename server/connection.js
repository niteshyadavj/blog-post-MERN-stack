const mongoose = require('mongoose');

const  MONGO_URI = 'mongodb+srv://scottdaneil000:nitesh%4026@cluster0.h848bhr.mongodb.net/?retryWrites=true&w=majority';

const connectDb = async()=>{
  const connection = await mongoose.connect(MONGO_URI);
  if(connection) console.log("Database  Connected");
  else console.log('Database Connection failed');
};  

module.exports={connectDb};