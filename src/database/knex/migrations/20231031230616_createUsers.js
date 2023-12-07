exports.up = knex => knex.schema.createTable("user_barber", table => {
    table.increments("id").primary();
    table.string("name", 255).notNullable();
    table.string("email", 255).notNullable().unique();
    table.string("whatsapp", 20);
    table.string("password", 255).notNullable();
    table.string("avatar", 255);
    table.boolean("isAdmin").defaultTo(false);
    table.timestamp("created_at").defaultTo(knex.fn.now());
});

exports.down = knex => knex.schema.dropTable("user_barber");
