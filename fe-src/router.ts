import { Router } from "@vaadin/router";

const router = new Router(document.querySelector(".root"));

router.setRoutes([
  { path: "/", component: "home-page" },
  { path: "/report", component: "report-page" },
  { path: "/around", component: "pets-around" },
  { path: "/signup", component: "signup-page" },
]);
