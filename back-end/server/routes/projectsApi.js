const express = require("express");
const router = express.Router();

const queryProjects = require("../../db/queries/projects");

router.post("/create-project", async (req, res) => {
  try {
    const createdProject = await queryProjects.createProject({
      ...req.body,
      owned_by: req.user.id,
    });
    res.status(200).json({ ...createdProject, success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, msg: err.message });
  }
});

router.put("/update-project", async (req, res) => {
  try {
    const projectUpdated = await queryProjects.updateProject(req.body);
    res.status(200).json({ ...projectUpdated, success: true });
  } catch (err) {
    console.error(err);
    res.send(500).json({ success: false, msg: err.message });
  }
});

router.put("/update-project-name/:projectId/:newName", async (req, res) => {
  try {
    const { projectId, newName } = req.params;
    const projectNameUpdated = await queryProjects.updateProjectName(
      projectId,
      newName
    );
    res.status(200).json({ ...projectNameUpdated, success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, msg: err.message });
  }
});

router.delete("/delete-project/:projectId", async (req, res) => {
  try {
    const projectDeleted = await queryProjects.deleteProject(
      req.params.projectId
    );
    res.status(200).json({ ...projectDeleted, success: true });
  } catch (err) {
    console.error(err);
    res.send(500).json({ success: false, msg: err.message });
  }
});

router.get("/project/:projectId", async (req, res) => {
  try {
    const userProject = await queryProjects.getProjectById(
      req.params.projectId
    );
    res.status(200).json({ success: true, userProject });
  } catch (err) {
    console.error(err);
    res.send(500).json({ success: false, msg: err.message });
  }
});

router.get("/user-projects", async (req, res) => {
  try {
    const userProjects = await queryProjects.getProjectsByUserId(req.user.id);
    res.status(200).json({ success: true, userProjects });
  } catch (err) {
    console.error(err);
    res.send(500).json({ success: false, msg: err.message });
  }
});

module.exports = router;
