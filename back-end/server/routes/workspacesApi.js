const express = require("express");
const router = express.Router();

const queryWorkspaces = require("../../db/queries/workspaces");

router.get("/userWorkspaces", async (req, res) => {
  const userWorkspaces = await queryWorkspaces.getWorkspacesByUserId(
    req.user.id
  );
  res.send(JSON.stringify(userWorkspaces));
});

module.exports = router;
