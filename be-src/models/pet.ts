import { Model, DataTypes } from "sequelize";
import { sequelize } from "./conn";

export class Pet extends Model {}
Pet.init(
  {
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
    sequelize,
    modelName: "pet",
  }
);
