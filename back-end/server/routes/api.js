const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");

const queryUsers = require("../../db/queries/users");

const router = express.Router();

router.post("/register", async (req, res) => {
  const userRegisterInfo = req.body;
  try {
    const hashedPassword = await bcrypt.hash(userRegisterInfo.password, 10);
    console.log("registerData->", {
      ...userRegisterInfo,
      password: hashedPassword,
    });

    const [userExists] = await queryUsers.getByEmail(userRegisterInfo.email);

    if (userExists) {
      console.log("userExists->", userExists);
      throw new Error("User Already exists!!");
    } else {
      await queryUsers
        .createUser({ ...userRegisterInfo, password: hashedPassword })
        .then((resp) => {
          console.log("createUser-resp->", resp);
          res.send(JSON.stringify({ ...resp, redirectUrl: "/login" }));
        });
    }
  } catch (err) {
    console.log(err);
    res.send(JSON.stringify({ error: err.message }));
  }
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user)
      return res.send(JSON.stringify({ response: "Login unsuccessful" }));
    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.send(
        JSON.stringify({ response: "Login successful", redirectUrl: "/" })
      );
    });
  })(req, res, next);
});

module.exports = router;
