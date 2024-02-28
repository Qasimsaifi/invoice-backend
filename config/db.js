const mongoose = require("mongoose");
// const { DB_URL } = require('./database');

const connectDB = async () => {
  try {
    const connect = await mongoose.connect("mongodb+srv://Kasimsaifi:root@cluster0.skupjdj.mongodb.net/invoices?retryWrites=true&w=majority&appName=Cluster0");
    console.log(
      "database connected: "
    );
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

connectDB()


module.exports = connectDB;
