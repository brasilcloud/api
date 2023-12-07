const knex = require("../database/knex");
class AgendaController {

    async create(request, response) {

        const { name, start, end , id} = request.body;


        const user = await knex("agenda").insert({
            name,
            start,
            end,
            user_id: id
        })


        return response.json({user});
    }

    async update(request, response) {
        const { name, start, end } = request.body;

        const { id } = request.params;

        const user = await knex("agenda").where({ id }).update({
            name,
        })

        return response.json({user});
    }

    async show (request, response) {
        const user_id = request.user.id;

        const agenda = await knex("agenda").where({ user_id });

        return response.json({agenda});
    }

    async delete(request, response) {
        const { id } = request.params;


        await knex("agenda").where({id}).delete();


        return response.json();
    }
}

module.exports = AgendaController;