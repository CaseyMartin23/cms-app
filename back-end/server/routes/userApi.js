const express = require("express");
const router = express.Router();
const queryUsers = require("../../db/queries/users");

router.get("/username/:userId", async (req, res) => {
  try {
    const username = await queryUsers.getNameById(req.params.userId);
    res.send(JSON.stringify(username));
  } catch (err) {
    console.err(err);
    res.send(JSON.stringify(err));
  }
});

module.exports = router;
