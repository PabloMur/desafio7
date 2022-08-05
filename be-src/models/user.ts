import { Model, DataTypes } from "sequelize";

import { sequelize } from "./conn";

export class User extends Model {}
User.init(
  {
    // los atributos de nuestro modelo (las columnas)
    fullname: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize, // la conexión a la base
    modelName: "user", // tenemos que decirle el nombre del modelo (en singular)
  }
);
