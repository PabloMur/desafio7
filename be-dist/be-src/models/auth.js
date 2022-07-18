"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = void 0;
const sequelize_1 = require("sequelize");
const conn_1 = require("./conn");
class Auth extends sequelize_1.Model {
}
exports.Auth = Auth;
Auth.init({
    // los atributos de nuestro modelo (las columnas)
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    user_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize: conn_1.sequelize,
    modelName: "auth", // tenemos que decirle el nombre del modelo (en singular)
});
