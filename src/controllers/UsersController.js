const knex = require("../database/knex");
const { hash, compare } = require("bcryptjs");
const AppError = require("../utils/AppError");

class UsersController {

    // index - GET para listar vários registros.  
    // show - GET para exibit um registro especifico
    // create - POST para criar um registro.
    // update - PUT para atualizar um registro
    // delete - DELETE para remover um registro.

    async create(request, response) {
        const { name, email, whatsapp, isAdmin, password } = request.body;

        const emailInUse = await knex("user_barber").where({ email });

        // Faz com que o nenhum usuário utilize o mesmo e-mail para criar uma conta
        if(emailInUse.length > 0) {
            throw new AppError("Email já está em uso");
        }

        // Criptografia de senha
        const hashediPassword =  await hash(password, 8);
    
        await knex("user_barber").insert({
            name,
            email, 
            whatsapp,
            isAdmin,
            password: hashediPassword
        })

        response.json();
    }

    async update(request, response){
        const { name, email, password, old_password} = request.body;
        const user_id = request.user.id;
        
        const user = await knex("user_barber").where({ id: user_id }).first();
        
        console.log(user);
        if(!user.length < 0) {
            throw AppError("Nenhum usuário não encontrado");
        }
        
        if(password && !old_password) {
            throw new AppError("Informe senha senha antiga");
        }

        if(password && old_password) {
            
            const newPassword = await compare(old_password, user.password);

            if(!newPassword) {
                throw new AppError("Email e/ou incorreta!");
            }

            user.password = await hash(password, 8);
        }

        await knex("user_barber").where({ id: user_id }).update({
            name: name,
            email: email,
        })
        
        return response.json({name, email, password});
    }

    async show(request, response) {
        const barbeiros = await knex("user_barber").where({isAdmin: true});

        return response.json({barbeiros})
    }
}

module.exports = UsersController;