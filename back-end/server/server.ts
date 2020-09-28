import { Request, Response } from "express";

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

// app.use(express.static(path.join(__dirname, "/../../front-end/build")));
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

// app.get("*", (req: any, res: any) =>
//   res.sendFile(path.resolve(__dirname + "/../../front-end/build/index.html"))
// );

app.post(
  "/signin",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/signin",
    failureFlash: true,
  })
);

app.post("/signup", async (req: Request, res: Response) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await queries.users
      .create({ ...req.body, password: hashedPassword })
      .then((response: any) => {
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

// app.get("/test", (req: any, res: any) => {
//   console.log("TeSTinG....\nIt works!!!");
//   res.send("");
// });

app.get("/isUserAuthed", async (req: Request, res: Response) => {
  const isAuthed = (await req.isAuthenticated())
    ? await req.isAuthenticated()
    : false;

  res.send(JSON.stringify(isAuthed));
  res.end();
});

app.listen(port, () => console.log(`Server is Listening on port: ${port}...`));
