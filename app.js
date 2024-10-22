const express = require("express");
const path = require("path");
const { initSocket } = require("./socket");
const app = express();

app.set("view engine", "ejs");
app.use("views", express.static(path.join(__dirname, "views")));

app.get("/", (req, res) => {
  res.render("login");
});

app.get("/chat", (req, res) => {
  res.render("chat");
});

app.get("/chat/:id", (req, res) => {
  res.render("chat");
});

const server = app.listen(8000, () =>
  console.log("listening on http://localhost:8000")
);

initSocket(server);
