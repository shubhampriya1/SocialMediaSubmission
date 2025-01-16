import mongoose from "mongoose";
const connection = () => {
  const url = process.env.MONGODB_URI;

  mongoose.connect(url);

  mongoose.connection.on("connected", () => {
    console.log("connected with database sucessfully🚀🚀");
  });

  mongoose.connection.on("disconnected", () => {
    console.log("disconnected");
  });

  mongoose.connection.on("error", () => {
    console.log("error", error.message);
    process.exit(1);
  });
};
export default connection;
