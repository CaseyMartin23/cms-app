const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();

type UsersType = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  remember_me?: boolean;
};

const users: UsersType[] = [];

router.post("/signIn", async (req: any, res: any) => {
  try {
    const user = users.find((user) => user.email === req.body.email);
    if (user == null) return res.status(400).send("Can't find user");

    if (await bcrypt.compare(req.body.password, user.password)) {
      console.log("Access Granted");
    } else {
      console.log("Access Denied");
    }

    // res.redirect("/");
  } catch (err) {
    res.status(500).send();
    console.log(err);
  }
});

router.post("/signUp", async (req: any, res: any) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    users.push({ ...req.body, password: hashedPassword });
    console.log("users->>", users);
  } catch (err) {
    console.log(err);
  }
});

export = router;
