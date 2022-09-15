import { Model, DataTypes } from "sequelize";
import { sequelize } from "./conn";

export class Auth extends Model {}
Auth.init(
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    modelName: "auth",
  }
);
