const express = require("express");
const queryUsers = require("../../db/queries/users");

const router = express.Router();

router.post("/register", (req, res) => {
  const userRegisterInfo = req.body;
  if (userRegisterInfo) {
    console.log("registerData->", userRegisterInfo);
    queryUsers.createUser(userRegisterInfo).then((resp) => res.send(resp));
  } else {
    res.send({ response: "Error with receiving register data..." });
  }
});

router.post("/login", (req, res) => {
  const userLoginInfo = req.body;
  if (userLoginInfo) {
    console.log("loginData->", userLoginInfo);
    res.send({ response: "Received Login Data!" });
  } else {
    res.send({ response: "Error with receiving login data..." });
  }
});

module.exports = router;
