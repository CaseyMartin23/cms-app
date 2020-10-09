const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");

const queryUsers = require("../../db/queries/users");

const router = express.Router();

router.get("/isAuthed", (req, res) => {
  if (!req.user) {
    res.send(JSON.stringify({ isAuthed: false }));
  } else {
    res.send(JSON.stringify({ isAuthed: true }));
  }
  console.log("req-user->", req.user);
});

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
      throw new Error("User Already exists");
    } else {
      await queryUsers
        .createUser({ ...userRegisterInfo, password: hashedPassword })
        .then((resp) => {
          console.log("createUser-resp->", resp);
          res.send(JSON.stringify({ ...resp, registered: true }));
        });
    }
  } catch (err) {
    console.log(err);
    res.send(JSON.stringify({ error: err.message, registered: false }));
  }
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user)
      return res.send(
        JSON.stringify({
          error: "Incorrect email/password",
          response: "Login unsuccessful",
          loggedIn: false,
        })
      );
    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.send(
        JSON.stringify({ response: "Login successful", loggedIn: true })
      );
    });
  })(req, res, next);
});

module.exports = router;
