const mongoose = require("mongoose");
const app = require("./app");
require("dotenv").config();

const port = process.env.PORT || 3000;
const { DB_URL } = process.env;

mongoose
  .set("strictQuery", false)
  .connect(DB_URL)
  .then(() =>
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    })
  )
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
