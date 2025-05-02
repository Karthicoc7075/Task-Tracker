const mongoose = require('mongoose');

 const connectDB = async (dbUrl) => {
    try {
        await mongoose.connect(dbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
     
    }
    }

    module.exports = connectDB