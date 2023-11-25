async function DbConnect():Promise<boolean> {
    const mongoose = require('mongoose');
    const DB_URL = require('./dataConnection');

    try {
        await mongoose.connect(DB_URL, {dbName: 'finsweetDB'});
        console.log('MongoDB Connected');
        return true;
    } catch (e) {
        console.log('MongoDB Connect Error');
        return false;
    }
}

module.exports = DbConnect;