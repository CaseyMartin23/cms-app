const express = require("express");
const queryWorkspaces = require("../../db/queries/workspaces");
const router = express.Router();

router.post("/create-workspace", async (req, res) => {
  try {
    await queryWorkspaces
      .createWorkspace({ ...req.body, owned_by: req.user.id })
      .then((resp) => {
        res.status(200).json({ ...resp, success: true });
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, msg: err.message });
  }
});

router.put("/update-workspace", async (req, res) => {
  try {
    await queryWorkspaces.updateWorkspace(req.body).then((resp) => {
      res.status(200).json({ ...resp, success: true });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, msg: err.message });
  }
});

router.put("/update-workspace-name", async (req, res) => {
  try {
    await queryWorkspaces.updateWorkspaceName(req.body).then((resp) => {
      res.status().json({ ...resp, success: true });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, msg: err.message });
  }
});

router.delete("/delete-workspace/:workspaceId", async (req, res) => {
  try {
    await queryWorkspaces
      .deleteWorkspace(req.params.workspaceId)
      .then((resp) => {
        res.status(200).json({ ...resp, success: true });
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

    res.status(200).json({ success: true, userWorkspace: workspace });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, msg: err.message });
  }
});

router.get("/user-workspaces", async (req, res) => {
  try {
    const userWorkspaces = await queryWorkspaces.getWorkspacesByUserId(
      req.user.id
    );
    res.status(200).json({ success: true, userWorkspaces });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, msg: err.message });
  }
});

router.get("/users-workspaces-ids-names", async (req, res) => {
  try {
    const workspaces = await queryWorkspaces.getWorkspaceNamesAndIdByUserId(
      req.user.id
    );
    res.status(200).json({ success: true, user_workspaces: workspaces });
  } catch (err) {
    console.error(err);
    res.status(501).json({ success: false, msg: err.message });
  }
});

module.exports = router;
