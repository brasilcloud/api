const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class HoraraioController {


    async create(request, response) {
        const { horario } = request.body;
        const user_id = request.user.id;

        const horarios = await knex("horarios").where({ horario });

        console.log(horarios);
        if(horarios.length > 0) {
            throw new AppError("Horário já existe");
        }
    
        await knex("horarios").insert({
            horario,
            user_id
        })

        return response.json();
    }

    async show(request, response) {
        const user_id = request.user.id;

        const horario = await knex("horarios").where({user_id: user_id});

        return response.json({horario});
    }

    async showDisp(request, response) {
        const { user_id, selectedDate } = request.params;
    
        try {
            // Obter todos os horários da tabela 'horarios'
            const horarios = await knex("horarios").select("horario");
    
            // Obter os horários agendados do usuário na data selecionada
            const horariosAgendados = await knex("agenda")
                .where({ user_id: user_id })
                .whereRaw('DATE(start) = ?', [selectedDate]) // Filtrar por data selecionada
                .select("start", "end");
    
            // Criar um array com todos os horários disponíveis que não estão agendados
            const horariosDisponiveis = horarios.filter((horario) => {
                const horarioAtual = horario.horario;
                // Verificar se o horário atual está incluído em algum intervalo agendado
                return !horariosAgendados.some((agenda) => {
                    const start = agenda.start.split('T')[1]; // Obter parte após 'T' para o start
                    const end = agenda.end.split('T')[1]; // Obter parte após 'T' para o end
                    return horarioAtual >= start && horarioAtual <= end;
                });
            });
    
            return response.json({ horariosDisponiveis });
        } catch (error) {
            return response.status(500).json({ error: "Erro ao buscar horários disponíveis." });
        }
    }
    

}

module.exports = HoraraioController;