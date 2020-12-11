const express = require("express");
require("dotenv").config({ silent: process.env.NODE_ENV === "production" });
const morgan = require("morgan");
const passport = require("passport");
const path = require("path");

require("./passport/passport-config")(passport);

const app = express();
const PORT = process.env.PORT || 8080;
const dev = app.get("env") !== "production";

app.use(express.static("front-end/build"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());
app.use(require("./routes"));

if (!dev) {
  app.disable("x-powered-by");
  app.use(morgan("common"));
}

if (dev) app.use(morgan("dev"));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../../front-end/build/index.html"));
});

app.listen(PORT, console.log(`Server is listening on ${PORT}...`));
