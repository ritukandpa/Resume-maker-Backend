const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://ayushkothari:1ysmatui5u@clusterresumebuilder.vlevg.mongodb.net/?retryWrites=true&w=majority&appName=ClusterResumeBuilder", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};



module.exports = connectDB;
