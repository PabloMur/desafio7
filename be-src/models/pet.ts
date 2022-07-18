import { Model, DataTypes } from "sequelize";
import { sequelize } from "./conn";

export class Pet extends Model {}
Pet.init(
  {
    // los atributos de nuestro modelo (las columnas)
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    zone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize, // la conexión a la base
    modelName: "pet", // tenemos que decirle el nombre del modelo (en singular)
  }
);
