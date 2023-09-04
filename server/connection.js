const mongoose = require('mongoose');

const  MONGO_URI = ''; //mongodb connect link

const connectDb = async()=>{
  const connection = await mongoose.connect(MONGO_URI);
  if(connection) console.log("Database  Connected");
  else console.log('Database Connection failed');
};  

module.exports={connectDb};