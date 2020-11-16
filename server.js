const express = require("express");
const volleyball = require("volleyball");
const cors = require("cors");
const port = process.env.PORT || 8080;
const dotenv = require("dotenv");

dotenv.config();
const app = express();
app.use(volleyball);
app.use(cors());

app.use("/api/todos", require("./api/routes/todos"));

app.listen(port, () =>
  console.log(`App listening on http://localhost:${port}`)
);
