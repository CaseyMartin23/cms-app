const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { queries } = require("../../db/queries");

const router = express.Router();

router.post("/signIn", async (req: any, res: any) => {
  try {
    const [user] = await queries.users.getByEmail(req.body.email);
    if (user == null) return res.status(400).send("Can't find user");

    if (await bcrypt.compare(req.body.password, user.password)) {
      res.redirect("/");
    } else {
      console.log("Access Denied (Added an Error here!)");
    }
  } catch (err) {
    res.status(500).send();
    console.log(err);
  }
});

router.post("/signUp", async (req: any, res: any) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    queries.users
      .create({ ...req.body, password: hashedPassword })
      .then((users: any) => console.log("created-user->>", users[0]));
  } catch (err) {
    console.log(err);
  }
});

export = router;
