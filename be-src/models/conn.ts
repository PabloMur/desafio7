import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  "postgres://urwqpdcc:bMcYXRPPMsd6nx4LehZpFtN23JD1iXog@babar.db.elephantsql.com/urwqpdcc"
);

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();
