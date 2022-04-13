const dbURI = process.env.DB_URI;
const mongoose = require("mongoose");

const connectToDatabase = async () => {
  try {
    const response = await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB connected successfully");
  } catch (err) {
    console.error("Mongoose connection failed", err);
  }
};

module.exports = connectToDatabase;