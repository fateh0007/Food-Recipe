const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const connectDB = async () => {
    await mongoose.connect(process.env.CONNECTION_STRING)
    .then(()=> console.log("Connected to MongoDB successfully"))
};

module.exports = connectDB;