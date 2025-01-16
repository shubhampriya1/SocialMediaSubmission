import mongoose from "mongoose";
const connection = () => {
  const url =
    "mongodb+srv://shubham:1234567890@cluster0.ppm7bwf.mongodb.net/SocialMedia?retryWrites=true&w=majority";

  mongoose.connect(url);
  mongoose.connection.on("connected", () => {
    console.log("connected with database sucessfully🚀🚀");
  });
  mongoose.connection.on("disconnected", () => {
    console.log("disconnected");
  });
  mongoose.connection.on("error", () => {
    console.log("error", error.message);
  });
};
export default connection;
