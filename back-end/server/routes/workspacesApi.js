const express = require("express");
const router = express.Router();

const queryWorkspaces = require("../../db/queries/workspaces");
const queryUsers = require("../../db/queries/users");

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

router.put("/update-workspace-name", async (req, res) => {
  try {
    await queryWorkspaces.updateWorkspaceName(req.body).then((resp) => {
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
        res.status(200).json(resp);
      });
  } catch (err) {
    console.error(err);
    res.status(501).json({ success: false, msg: error.message });
  }
});

router.get("/workspace/:workspaceId", async (req, res) => {
  try {
    const workspace = await queryWorkspaces.getWorkspaceById(
      req.params.workspaceId
    );
    const workspaceOwner = await queryUsers.getEmailById(workspace.owned_by);
    const workspaceAndOwnerName = {
      ...workspace,
      owned_by: workspaceOwner.email,
    };
    res.send(JSON.stringify(workspaceAndOwnerName));
  } catch (err) {
    console.log(err);
    res.send(JSON.stringify(err));
  }
});

router.get("/user-workspaces", async (req, res) => {
  const userWorkspaces = await queryWorkspaces.getWorkspacesByUserId(
    req.user.id
  );
  res.send(JSON.stringify(userWorkspaces));
});

module.exports = router;
