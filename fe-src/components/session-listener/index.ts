import { state } from "../../state";

class SessionListener extends HTMLElement {
  shadow: ShadowRoot;
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }
  render() {
    const getUserMe = async () => {
      await state.getUserMe();
    };
    const cs = state.getState();
    cs.logged ? getUserMe() : console.log("No estas Logueado");
  }

  connectedCallback() {
    state.subscribe(() => {
      this.render();
    });
    this.render();
  }
}

customElements.define("session-lister", SessionListener);
