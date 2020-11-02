const express = require("express");
require("dotenv").config({ silent: process.env.NODE_ENV === "production" });
const morgan = require("morgan");
const compression = require("compression");
const passport = require("passport");
const session = require("express-session");
const sessionStore = require("connect-session-knex")(session);
const flash = require("express-flash");
const path = require("path");

const routes = require("./routes/authenticationApi");
const knex = require("../db/knex");
const initializePassport = require("./passport/passport-config");
initializePassport(passport);

const app = express();
const PORT = process.env.PORT || 8080;
const dev = app.get("env") !== "production";
const store = new sessionStore({ knex });

app.use(express.static("front-end/build"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(compression());
app.use(flash());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use("/api", routes);

if (!dev) {
  app.disable("x-powered-by");
  app.use(morgan("common"));
}

if (dev) app.use(morgan("dev"));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../../front-end/build/index.html"));
});

app.listen(PORT, console.log(`Server is listening on ${PORT}...`));
