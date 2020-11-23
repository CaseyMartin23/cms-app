const express = require("express");
const router = express.Router();

const queryProjects = require("../../db/queries/projects");

router.post("/create-project", async (req, res) => {
  try {
    await queryProjects.createProject(req.body).then((resp) => {
      res.send(JSON.stringify(resp));
    });
  } catch (err) {
    console.error(err);
    res.send(JSON.stringify(err));
  }
});

router.put("/update-project", async (req, res) => {
  try {
    await queryProjects.updateProject(req.body).then((resp) => {
      res.send(JSON.stringify(resp));
    });
  } catch (err) {
    console.error(err);
    res.send(JSON.stringify(err));
  }
});

router.delete("/delete-project/:projectId", async (req, res) => {
  try {
    await queryProjects.deleteProject(req.params.projectId).then((resp) => {
      res.send(JSON.stringify(resp));
    });
  } catch (err) {
    console.error(err);
    res.send(JSON.stringify(err));
  }
});

router.get("/project/:projectId", async (req, res) => {
  const project = await queryProjects.getProjectsById(req.params.projectId);
  res.send(JSON.stringify(project));
});

router.get("/user-projects/:userId", async (req, res) => {
  const userProjects = await queryProjects.getProjectsByUserId(
    req.params.userId
  );
  res.send(JSON.stringify(userProjects));
});

router.get("/workspace-projects/:workspaceId", async (req, res) => {
  const workspaceProjects = await queryProjects.getProjectsByWorkspaceId(
    req.params.workspaceId
  );
  res.send(JSON.stringify(workspaceProjects));
});

module.exports = router;
