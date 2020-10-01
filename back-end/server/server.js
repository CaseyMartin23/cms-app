const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("front-end/build"));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../../front-end/build/index.html"));
});

app.listen(PORT, console.log(`Server is listening on ${PORT}...`));
