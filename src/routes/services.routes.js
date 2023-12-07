const { Router } = require("express");
const multer = require("multer");
const uploadConfig = require("../configs/upload");

const ServicesController = require("../controllers/ServicesController");
const ServicesImagem = require("../controllers/ServicesImagem");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const upload = multer(uploadConfig.MULTER);
const servicesController =  new ServicesController();
const servicesImagem =  new ServicesImagem();

const servicesRoutes = Router();

servicesRoutes.post("/", ensureAuthenticated, servicesController.create);
servicesRoutes.put("/:id", ensureAuthenticated, servicesController.update);
servicesRoutes.delete("/:id_service", ensureAuthenticated, servicesController.delete);
servicesRoutes.get("/", ensureAuthenticated, servicesController.show);
servicesRoutes.get("/showClient/:user_id", ensureAuthenticated, servicesController.showClient);
servicesRoutes.patch("/imagem/:service_id", ensureAuthenticated, upload.single("imagem"), servicesImagem.update);

//usersRoutes.patch("/avatar", ensureAuthenticated, upload.single("avatar"), userAvatarController.update);




module.exports = servicesRoutes;