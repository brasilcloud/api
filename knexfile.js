const path = require("path");

module.exports = {
  development: {
    client: 'mysql',
    connection: {
      host: 'mysql-ag-br1-1.hospedagemelastica.com.br',
      user: 'mrotrr_testando',
      password: 'ZzMS6!so0&)nwx%t',
      database: 'mrotrr_testando',
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
