import { Model, DataTypes } from "sequelize";

import { sequelize } from "./conn";

export class User extends Model {}
User.init(
  {
    // los atributos de nuestro modelo (las columnas)
    fullname: {
      type: DataTypes.STRING,
    },
    lastname: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    bio: {
      type: DataTypes.STRING,
    },
    imageDataUrl: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize, // la conexión a la base
    modelName: "user", // tenemos que decirle el nombre del modelo (en singular)
  }
);
