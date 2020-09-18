const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { queries } = require("../../db/queries");

const router = express.Router();

router.post("/sign-in", async (req: any, res: any) => {
  try {
    const [user] = await queries.users.getByEmail(req.body.email);
    if (user == null) return res.status(400).send("Can't find user");

    if (await bcrypt.compare(req.body.password, user.password)) {
      res.redirect("/");
    } else {
      console.log("Access Denied (Added an Error here!)");
    }
    res.end();
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
});

router.post("/sign-up", async (req: any, res: any) => {
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

export = router;
