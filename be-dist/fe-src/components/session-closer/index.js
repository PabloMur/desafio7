class SessionCloser extends HTMLElement {
    shadow;
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
customElements.define("custom-session-closer", SessionCloser);
