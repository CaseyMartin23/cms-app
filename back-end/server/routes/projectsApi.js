const express = require("express");
const router = express.Router();

const queryProjects = require("../../db/queries/projects");

router.post("/create-project", async (req, res) => {
  try {
    const createdProject = await queryProjects.createProject({
      ...req.body,
      owned_by: req.user.id,
    });
    res.status(200).json(createdProject);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, msg: err.message });
  }
});

router.put("/update-project", async (req, res) => {
  try {
    const projectUpdated = await queryProjects.updateProject(req.body);
    res.status(200).json(projectUpdated);
  } catch (err) {
    console.error(err);
    res.send(500).json(err);
  }
});

router.delete("/delete-project/:projectId", async (req, res) => {
  try {
    const projectDeleted = await queryProjects.deleteProject(
      req.params.projectId
    );
    res.status(200).json(projectDeleted);
  } catch (err) {
    console.error(err);
    res.send(500).json({ success: false, msg: err.message });
  }
});

router.get("/project/:projectId", async (req, res) => {
  try {
    const project = await queryProjects.getProjectById(req.params.projectId);
    res.status(200).json({ success: true, project });
  } catch (err) {
    console.error(err);
    res.send(500).json({ success: false, msg: err.message });
  }
});

router.get("/user-projects", async (req, res) => {
  try {
    const userId = req.user.id;
    const projects = await queryProjects.getProjectsByUserId(userId);
    res.status(200).json({ success: true, user_projects: projects });
  } catch (err) {
    console.error(err);
    res.send(500).json({ success: false, msg: err.message });
  }
});

router.get("/workspace-projects/:workspaceId", async (req, res) => {
  try {
    const workspaceProjects = await queryProjects.getProjectsByWorkspaceId(
      req.params.workspaceId
    );
    res.status(200).json(workspaceProjects);
  } catch (err) {
    console.error(err);
    res.send(500).json(err);
  }
});

module.exports = router;
