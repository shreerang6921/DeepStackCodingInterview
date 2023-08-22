const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.DB_URI)
  .then(() => console.log("connected to database"))
  .catch((err) => console.log(err));

app.use("/", routes);

const port = 8000;
app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
