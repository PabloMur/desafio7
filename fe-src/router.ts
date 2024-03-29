import { Router } from "@vaadin/router";

const router = new Router(document.querySelector(".root"));

router.setRoutes([
  { path: "/", component: "home-page" },
  { path: "/report", component: "report-page" },
  { path: "/around", component: "pets-around" },
  { path: "/signup", component: "signup-page" },
  { path: "/login", component: "login-page" },
  { path: "/my-pets", component: "my-pets-page" },
  { path: "/my-data", component: "my-data-page" },
  { path: "/password", component: "password-page" },
  { path: "/mapbox", component: "mapbox-page" },
  { path: "/sighting", component: "sighting-page" },
  { path: "/edit-pet", component: "edit-pet-page" },
]);
