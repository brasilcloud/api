const knex = require("../database/knex");
const AppError = require("../utils/AppError"); 
const { compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const authConfig = require("../configs/auth");

class UserSessionsController {
    async create(request, response) {
        const { email, password } = request.body;

        const user = await knex("user_barber").where({email}).first();

        if(!user) {
            throw new AppError("E-mail e/ou senha incorreta", 401);
        }

        const confirmPassword = await compare(password, user.password);

        if(!confirmPassword) {
            throw new AppError("E-mail e/ou senha incorreta", 401);
        }

        const { secret, expiresIn } = authConfig.jwt;
        const token = sign({}, secret, {
            subject: String(user.id),
            expiresIn
        })

        return response.json({user, token});
    }
}

module.exports = UserSessionsController;