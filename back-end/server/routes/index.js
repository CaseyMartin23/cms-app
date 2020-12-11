const router = require("express").Router();

const authenticationRoutes = require("./authenticationApi");
const userRoutes = require("./userApi");
const workspaceRoutes = require("./workspacesApi");
const projectRoutes = require("./projectsApi");
const ticketRoutes = require("./ticketsApi");

router.use(
  "/api",
  authenticationRoutes,
  userRoutes,
  workspaceRoutes,
  projectRoutes,
  ticketRoutes
);

module.exports = router;
