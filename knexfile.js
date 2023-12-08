const path = require("path");

module.exports = {
  development: {
    client: 'mysql',
    connection: {
      host: process.env.HOST,
      user: process.env.USER,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      charset: 'utf8',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: path.resolve(__dirname, "src", "database", "knex", "migrations"),
    },
    useNullAsDefault: true,
  },
};
