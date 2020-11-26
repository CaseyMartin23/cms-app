const express = require("express");
const router = express.Router();

const queryWorkspaces = require("../../db/queries/workspaces");

router.post("/create-workspace", async (req, res) => {
  try {
    await queryWorkspaces
      .createWorkspace({ ...req.body, owned_by: req.user.id })
      .then((resp) => {
        res.send(JSON.stringify(resp));
      });
  } catch (err) {
    console.error(err);
    res.send(JSON.stringify(err));
  }
});

router.put("/update-workspace", async (req, res) => {
  try {
    await queryWorkspaces.updateWorkspace(req.body).then((resp) => {
      res.send(JSON.stringify(resp));
    });
  } catch (err) {
    console.error(err);
    res.send(JSON.stringify(err));
  }
});

router.delete("/delete-workspace/:workspaceId", async (req, res) => {
  try {
    await queryWorkspaces
      .deleteWorkspace(req.params.workspaceId)
      .then((resp) => {
        res.send(JSON.stringify(resp));
      });
  } catch (err) {
    console.error(err);
    res.send(JSON.stringify(err));
  }
});

router.get("/workspace/:workspaceId", async (req, res) => {
  const workspace = await queryWorkspaces.getWorkspaceById(
    req.params.workspaceId
  );
  res.send(JSON.stringify(workspace));
});

router.get("/user-workspaces", async (req, res) => {
  const userWorkspaces = await queryWorkspaces.getWorkspacesByUserId(
    req.user.id
  );
  res.send(JSON.stringify(userWorkspaces));
});

module.exports = router;
