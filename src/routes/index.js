// Aqui eu consigo separar os meus grupos de rotas
const { Router } = require("express");

const usersRouter = require("./users.routes");
const sessionsRoutes = require("./sessions.routes");
const userSessionsRoutes = require("./sessionsUser.routes");
const servicesRoutes = require("./services.routes");
const agendaRoutes = require("./agenda.routes");
const horariosRoutes = require("./horarios.routes");

const routes = Router();

routes.use("/users", usersRouter);
routes.use("/sessions", sessionsRoutes);
routes.use("/userServices", userSessionsRoutes);
routes.use("/services", servicesRoutes);
routes.use("/agenda", agendaRoutes);
routes.use("/horarios", horariosRoutes);

module.exports = routes;