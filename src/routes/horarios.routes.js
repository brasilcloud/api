const { Router } = require("express");

const HorarioController = require("../controllers/HorarioController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const horarioController =  new HorarioController();

const horarioRoutes = Router();

horarioRoutes.post("/", ensureAuthenticated, horarioController.create);
horarioRoutes.get("/", ensureAuthenticated, horarioController.show);
horarioRoutes.get("/disponiveis/:user_id/:selectedDate", ensureAuthenticated, horarioController.showDisp);



module.exports = horarioRoutes;