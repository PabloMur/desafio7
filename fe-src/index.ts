import "./router";
import "./pagesInit";
import "./componentsInit";

import { state } from "./state";

(function () {
  if (localStorage.getItem("saved-state")) {
    state.init();
  }
})();
