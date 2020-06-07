const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const sqlite3 = require("sqlite3");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(morgan("dev"));
app.use(cors());
app.use(express.urlencoded({ extended: false })); // can replace body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("./public/build"));

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

app.get("/todos", (req, res) => {
  db.serialize(() => {
    db.all(`SELECT * FROM todo`, (err, rows) => {
      if (err) {
        console.error(err.message);
      }
      res.status(200).send(rows);
    });
  });
});

app.get("/todo/:id", (req, res) => {
  const id = req.params.id;
  db.serialize(() => {
    db.all(`SELECT * FROM todo WHERE id = ?`, [id], (err, row) => {
      if (err) {
        console.error(err.message);
      }
      res.status(200).send(row);
    });
  });
});

app.post("/todo", (req, res) => {
  const text = req.body.text;
  const completed = req.body.completed;

  db.serialize(() => {
    db.run(
      `INSERT INTO todo(text, completed) VALUES (? , ?)`,
      [text, completed],
      (err) => {
        if (err) {
          console.log(err);
        }
        res.redirect("/");
      }
    );
  });
});

app.post("/todo/delete", (req, res) => {
  const id = req.body.id;

  db.serialize(() => {
    db.run(`DELETE FROM todo WHERE id = ?`, [id], (err) => {
      if (err) {
        console.log(err);
      }
      res.redirect("/");
    });
  });
});

app.listen(port, () => {
  console.log(`listenning on port ${port}`);
});
