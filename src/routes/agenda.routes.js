const { Router } = require("express");

const AgendaController = require("../controllers/AgendaController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const agendaController =  new AgendaController();

const agendaRoutes = Router();

agendaRoutes.post("/", ensureAuthenticated, agendaController.create);
agendaRoutes.put("/:id", ensureAuthenticated, agendaController.update);
agendaRoutes.get("/", ensureAuthenticated, agendaController.show);
agendaRoutes.delete("/:id", ensureAuthenticated, agendaController.delete);



module.exports = agendaRoutes;