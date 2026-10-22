const app = require("./src/app");
const connectToDB = require("./src/db/db");
const dotenv = require("dotenv");
dotenv.config();

const startServer = async () => {
  try {
    await connectToDB();
    app.listen(process.env.PORT, () => {
      console.log("server is running on port : ", process.env.PORT);
    });
  } catch (error) {
    console.log("server running error : ", error);
    throw error
  }
};
startServer();
