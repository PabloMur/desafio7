import { Model, DataTypes } from "sequelize";
import { sequelize } from "./conn";

export class Report extends Model {}
Report.init(
  {
    reporter_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    reporter_phone: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    report_message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    petId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "report",
  }
);
