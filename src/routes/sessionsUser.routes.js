const { Router } = require("express");

const UserSessionsController = require("../controllers/UserSessionsController");

const userSessionsController = new UserSessionsController();

const userSessionsRoutes = Router();

userSessionsRoutes.post("/", userSessionsController.create);


module.exports = userSessionsRoutes;