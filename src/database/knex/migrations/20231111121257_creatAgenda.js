exports.up = knex => knex.schema.createTable("agenda", table => {
    table.increments("id").primary();
    table.string("name", 255).notNullable();
    table.string("start", 20).notNullable(); // Ajuste para um tipo de dados de data/hora
    table.string("end", 20).notNullable(); // Ajuste para um tipo de dados de data/hora
    table.integer("user_id").unsigned().references("id").inTable("user_barber").onDelete("CASCADE");
    table.timestamp("created_at").defaultTo(knex.fn.now());
});

exports.down = knex => knex.schema.dropTable("agenda");
