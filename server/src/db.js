const mongoose = require('mongoose');
const { MONGO_URL } = require('./config');

const connect = async() =>{
    try {
        await mongoose.connect(MONGO_URL);
        console.log("Mongoose connected");
    } catch (error) {
        console.error(`Couldn't connect to MongoDB with Mongoose: ${error}`);
    }
}

module.exports = {
    connect
}