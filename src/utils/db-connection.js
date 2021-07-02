const mongoose = require("mongoose");

const username = process.env.MONGO_DB_USERNAME;
const password = process.env.MONGO_DB_PASSWORD;
const database = process.env.MONGO_DB_DATABASE || "graphql-events";

async function connectDBWithRetry() {
  try {
    await mongoose.connect(
      `mongodb+srv://${username}:${password}@cluster0.najfm.mongodb.net/${database}`,
      { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }
    );
    console.log("MONGODB connected!!");
  } catch (error) {
    console.log("error connecting mongodb", error);
    setTimeout(connectDBWithRetry, 5000);
  }
}

module.exports = connectDBWithRetry;
