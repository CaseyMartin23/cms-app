const router = require("express").Router();
const passport = require("passport");

const authenticationRoutes = require("./authenticationApi");
const userRoutes = require("./userApi");
const workspaceRoutes = require("./workspacesApi");
const projectRoutes = require("./projectsApi");
const ticketRoutes = require("./ticketsApi");

router.use("/api", authenticationRoutes);

router.use(
  "/api",
  passport.authenticate("jwt", { session: false }),
  userRoutes,
  workspaceRoutes,
  projectRoutes,
  ticketRoutes
);

module.exports = router;
