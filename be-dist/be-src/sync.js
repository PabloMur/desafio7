"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const conn_1 = require("./models/conn");
require("./models");
conn_1.sequelize.sync({ force: true }).then((res) => {
    console.log(res);
});
