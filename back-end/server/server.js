if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
const bcrypt = require("bcrypt");

const app = express();
const port = process.env.PORT || 5000;

const queries = require("../db/queries");

// Initialize Passport.js
const initializePassport = require("./passport-config");
initializePassport(
  passport,
  (email) => queries.users.getUserByEmail(email),
  (id) => queries.users.getUserById(id)
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

if (process.env.NODE_ENV === "production") {
  app.use(express.static("/../../front-end/build"));
}

app.get("*", (req, res) => {
  res.status(404);
});

app.post(
  "/signin",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/signin",
    failureFlash: true,
  })
);

app.post("/signup", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await queries.users
      .create({ ...req.body, password: hashedPassword })
      .then((response) => {
        if (response && response.created_at) {
          console.log("user-created->>", response);
          res.redirect("/signin");
        }
      });
  } catch (err) {
    console.log("\n***Error***:\n\t", err.message);
    res.status(409).send(JSON.stringify(err.message));
  }
});

app.listen(port, () => console.log(`Server is Listening on port: ${port}...`));
