const express = require("express");
const app = express();

const port = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.status(200).json({ message: "Application running as tiptop" });
});

app.listen(port, () =>
  console.log("listening on http://localhost:8000")
);
