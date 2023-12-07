const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class ServicesController {
    async create(request, response) {
        const { name, value, duration } = request.body;
        const user_id = request.user.id;

        console.log(name, value, duration);

        if(name && value && duration) {
            await knex("services").insert({
                name,
                value,
                user_id,
                duration
            })
        }else {
            throw new AppError("Preencha todos os campos!");
        }


        return response.json();
    }
    async update(request, response) {
        const { name, value, duration} = request.body;

        const { id } = request.params;

        const idVerification = await knex("services").where({ id }); 

        
        if(!idVerification.length > 0) {
            throw new AppError("Nota não encontrada!");
        }

        await knex("services").where({id}).update({
            name, 
            value, 
            duration
        })

        return response.json();
    }
    async delete(request, response) {
        const {id_service} = request.params;

        await knex("services").where({id: id_service}).delete();

        return response.json();
    }
    async show(request, response) {
        const user_id = request.user.id;

        const services = await knex("services").where({user_id});

        return response.json({services});
    }

    async showClient(request, response) {
        const {user_id} = request.params;

        const services = await knex("services").where({user_id});


        return response.json({services});
    }
}

module.exports = ServicesController;