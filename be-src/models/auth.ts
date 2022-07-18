import { Model, DataTypes } from "sequelize";
import { sequelize } from "./conn";

export class Auth extends Model {}
Auth.init(
  {
    // los atributos de nuestro modelo (las columnas)
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
      allowNull: false,
    },
  },
  {
    sequelize, // la conexión a la base
    modelName: "auth", // tenemos que decirle el nombre del modelo (en singular)
  }
);
