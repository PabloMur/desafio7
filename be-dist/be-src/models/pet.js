"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pet = void 0;
const sequelize_1 = require("sequelize");
const conn_1 = require("./conn");
class Pet extends sequelize_1.Model {
}
exports.Pet = Pet;
Pet.init({
    // los atributos de nuestro modelo (las columnas)
    fullname: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    age: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    zone: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: conn_1.sequelize,
    modelName: "pet", // tenemos que decirle el nombre del modelo (en singular)
});
