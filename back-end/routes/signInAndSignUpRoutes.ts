const express = require("express");
const router = express.Router();

router.post("/signIn", (req: any, res: any) => {
  const userInfo = { ...req.body };
  console.log("userInfo->>", userInfo);
  res.redirect("/");
});

router.post("/signUp", (req: any, res: any) => {
  const userInfo = { ...req.body };
  console.log("userInfo->>", userInfo);
});

export = router;
