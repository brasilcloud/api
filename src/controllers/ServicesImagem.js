const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const DiskStorage = require("../providers/DiskStorage");

class ServicesImagem {
    async update(request, response) {
        const service_id = request.params.service_id; // Suponho que você receba o ID do serviço na URL

        const avatarFilename = request.file.filename;

        const diskStorage = new DiskStorage();

        const service = await knex("services")
            .where({ id: service_id }).first();

        if (!service) {
            throw new AppError("Serviço não encontrado", 404);
        }

        if (service.imagem) { // Ajuste para o nome do campo 'imagem'
            await diskStorage.deleFile(service.imagem); // Ajuste para o nome do campo 'imagem'
        }

        const filename = await diskStorage.saveFile(avatarFilename);
        service.imagem = filename; // Ajuste para o nome do campo 'imagem'

        await knex("services").update(service).where({ id: service_id });

        return response.json(service);
    }
}

module.exports = ServicesImagem;
