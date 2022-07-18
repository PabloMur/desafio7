"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloudinary = void 0;
const cloudinary_1 = require("cloudinary");
Object.defineProperty(exports, "cloudinary", { enumerable: true, get: function () { return cloudinary_1.v2; } });
cloudinary_1.v2.config({
    cloud_name: "fps-devs",
    api_key: "586389221448689",
    api_secret: "SuSBcFJVTzEzpG5ovo4A924rmaA",
});
