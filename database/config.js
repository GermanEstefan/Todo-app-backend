const mongoose = require('mongoose');

const dbConnection = async () => {

    try {
        await mongoose.connect(process.env.DBSTR);
        console.log('Database is running...');

    } catch (error) {
        console.log(error);
        throw new Error(error);
    }

}

module.exports = dbConnection;