"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const conn_1 = require("./conn");
class User extends sequelize_1.Model {
}
exports.User = User;
User.init({
    // los atributos de nuestro modelo (las columnas)
    fullname: {
        type: sequelize_1.DataTypes.STRING,
    },
    lastname: {
        type: sequelize_1.DataTypes.STRING,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
    },
    bio: {
        type: sequelize_1.DataTypes.STRING,
    },
    imageDataUrl: {
        type: sequelize_1.DataTypes.STRING,
    },
}, {
    sequelize: conn_1.sequelize,
    modelName: "user", // tenemos que decirle el nombre del modelo (en singular)
});
