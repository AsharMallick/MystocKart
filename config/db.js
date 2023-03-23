const mongoose = require("mongoose");

exports.connectDB = async () => {
  mongoose.set("strictQuery", false);
  await mongoose
    .connect(process.env.MONGO_URI || "mongodb://0.0.0.0:27017/ecommerce")
    .then(() => console.log(`DB connected`))
    .catch((e) => console.log(`Some error occured => ${e}`));
};