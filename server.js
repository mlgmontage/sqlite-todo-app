const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const sqlite3 = require("sqlite3");
const morgan = require("morgan");
const cors = require("cors");

app.use(morgan("dev"));
app.use(cors());

let db = new sqlite3.Database(
  "./database/todos.db",
  sqlite3.OPEN_READWRITE,
  (error) => {
    if (error) {
      console.error(error.message);
    }
    console.log("Connected to the todos database.");
  }
);

app.get("/", async (req, res) => {
  await db.serialize(() => {
    db.all(`SELECT * FROM todo`, (err, rows) => {
      if (err) {
        console.error(err.message);
      }
      res.status(200).send(rows);
    });
  });
});

app.listen(port, () => {
  console.log(`listenning on port ${port}`);
});
