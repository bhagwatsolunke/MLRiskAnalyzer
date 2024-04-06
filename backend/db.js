const mongoose = require('mongoose');

const mongoURI = `mongodb+srv://bhagwatsolunke007:9959233110@cluster0.0z3d9mr.mongodb.net/project`;

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.error('Connection error:', error.message);
  }
};

module.exports = connectToMongo;
