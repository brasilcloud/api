exports.up = async knex => {
    const tableExists = await knex.schema.hasTable('services');
    if (!tableExists) {
      return knex.schema.createTable("services", table => {
        table.increments("id").primary();
        table.string("name", 255).notNullable();
        table.string("value", 10).notNullable(); // Ajuste para um tipo de dados numérico
        table.string("duration", 10).notNullable(); // Ajuste para um tipo de dados numérico
        table.integer("user_id").unsigned().references("id").inTable("user_barber").onDelete("CASCADE");
        table.string("image", 255);
        table.timestamp("created_at").defaultTo(knex.fn.now());
      });
    }
  };
  
  exports.down = knex => knex.schema.dropTable("services");