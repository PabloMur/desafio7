"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@vaadin/router");
const router = new router_1.Router(document.querySelector(".root"));
router.setRoutes([
    { path: "/", component: "home-page" },
    { path: "/report", component: "report-page" },
    { path: "/around", component: "pets-around" },
    { path: "/signup", component: "signup-page" },
    { path: "/login", component: "login-page" },
    { path: "/my-pets", component: "my-pets-page" },
    { path: "/my-data", component: "my-data-page" },
]);
