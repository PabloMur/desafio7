class PopupPetCard extends HTMLElement {
  shadow: ShadowRoot;
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }
  render() {
    const style = document.createElement("style");

    this.shadow.innerHTML = ``;

    style.innerHTML = ``;

    this.shadow.appendChild(style);
  }
  connectedCallback() {
    this.render();
  }
}

customElements.define("popup-pet-card", PopupPetCard);
