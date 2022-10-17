const optionsMariaDB = {
  client: "mysql",
  connection: {
    host: "127.0.0.1",
    user: "fsepulveda",
    password: "123456",
    database: "desafio7",
    port: 3307,
  },
};
const optionsSQLite = {
  client: "sqlite3",
  connection: { filename: "./mydb.sqlite" },
  useNullAsDefault: true,
};

module.exports = { optionsMariaDB, optionsSQLite };
