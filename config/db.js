const mongoose = require("mongoose");
// const { DB_URL } = require('./database');

const connectDB = async () => {
  try {
    const connect = await mongoose.connect("mongosb url");
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
