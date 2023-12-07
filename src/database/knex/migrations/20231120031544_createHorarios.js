exports.up = knex => knex.schema.createTable("horarios", table => {
    table.increments("id").primary();
    table.string("horario", 255).notNullable(); // Ajuste para um tipo de dados de texto
    table.integer("user_id").unsigned().references("id").inTable("user_barber").onDelete("CASCADE");
});

exports.down = knex => knex.schema.dropTable("horarios");
