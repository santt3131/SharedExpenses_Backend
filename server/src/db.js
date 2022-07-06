const mongoose = require('mongoose');
const { MONGO_URL } = require('./config');

//NO ESTA PROBADO
const options ={
    server: {
        socketOptions:  {keepAlive: 1},
        readPreference: "nearest",
        strategy: "ping"
    },
    replset: {
        rs_name: 'ReplicaSet',
        socketOptions:  {keepAlive: 1},
        strategy: 'ping',
        readPreference: 'nearest',
        poolSize: 10
    }
}

const connect = async() =>{
    try {
        await mongoose.connect(MONGO_URL, options);
        console.log("Mongoose connected");
    } catch (error) {
        console.error(`Couldn't connect to MongoDB with Mongoose: ${error}`);
    }
}

module.exports = {
    connect
}