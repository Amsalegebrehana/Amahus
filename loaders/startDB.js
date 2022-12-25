// Start the DB or Connect with the DB

// Mongoose
const mongoose = require("mongoose");
// Dotenv
const dotenv = require("dotenv")

dotenv.config()


const DB_URI = process.env.MONGO_URI;
// Configs


const configs = require("../configs");

// Connect with DB
mongoose
  .connect(DB_URI)
  .then((conn) => {
    console.log(`Successfully Connected`);
  })
  .catch((err) => {
    console.log(`Error while connecting to DB`);
    console.log(err);
  });

// DB Connection
const db_conn = mongoose.connection;

// Handle error after connecting
db_conn.on("error", (err) => {
  console.log(`Error while connecting to DB`);
  console.log(err);
});

db_conn.on("disconnected", () => {
  console.log(`DB is disconnected`);
});

// Export DB Connection
module.exports = db_conn;
