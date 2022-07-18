import { Sequelize } from "sequelize";

export const sequelize = new Sequelize({
  dialect: "postgres",
  username: "vccriwfedpzbxt",
  password: "1d55159fb910abd63ef0c713cc3e7a35cadec19cab2aa5c55d0b05d00a8e6484",
  database: "dafqqqv0j7p0j",
  port: 5432,
  host: "ec2-52-22-136-117.compute-1.amazonaws.com",
  ssl: true,
  // esto es necesario para que corra correctamente
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

//sequelize.sync({ alter: true });
