import { userInfo } from "os";

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const path = require("path");
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
const bcrypt = require("bcrypt");

const app = express();
const port = process.env.PORT || 5000;

const { queries } = require("../db/queries");

const { initializePassport } = require("./passport-config");
initializePassport(
  passport,
  (email: string) => queries.users.getUserByEmail(email),
  (id: number) => queries.users.getUserById(id)
);

app.use(express.static(path.join(__dirname, "/../front-end/build")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
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

const isUserAuthenticated = (req: any, res: any, next: any) => {
  if (req.isAuthenticated()) return next();
  res.redirect("/signin");
};

const userIsAlreadyAuthenticated = (req: any, res: any, next: any) => {
  if (req.isAuthenticated()) return res.redirect("/");
  next();
};

app.get("*", isUserAuthenticated, (req: any, res: any) =>
  res.sendFile(path.resolve(__dirname + "/../front-end/build/index.html"))
);

app.post(
  "/signin",
  userIsAlreadyAuthenticated,
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

app.post("/signup", userIsAlreadyAuthenticated, async (req: any, res: any) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await queries.users
      .create({ ...req.body, password: hashedPassword })
      .then((response: any) => {
        if (response && response.created_at) {
          console.log("user-created->>", response);
          res.send(JSON.stringify("Account was successfully created")).end();
        }
      });
  } catch (err) {
    console.log("\n***Error***:\n\t", err.message);
    res.status(409).send(JSON.stringify(err.message));
  }
});

app.listen(port, () => console.log(`Server is Listening on port: ${port}...`));
