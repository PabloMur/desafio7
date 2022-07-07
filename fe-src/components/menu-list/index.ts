class MenuList extends HTMLElement {
  shadow: ShadowRoot;
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }
  render() {
    const style = document.createElement("style");
    this.shadow.innerHTML = `
        <div class="links-container">
            <div class="closer-button">
              <button>X</button>
            </div>
            <ul class="opciones">
              <li><a href="/login">Mis Datos</a></li>
              <li><a href="/login">Mis mascotas reportadas</a></li>
              <li><a href="/login">Reportar Mascota</a></li>
            </ul>
        </div>
    `;
    style.innerHTML = `
        .links-container{
          position: absolute;
          bottom: 0;
          right: 0;
          height: 870vh;
          width: 80%;
          max-width: 400px;
          background: var(--purple);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .closer-button{
          background: red;
          display: flex;
          justify-content: end;
          height: 5vh
        }
        button{
          margin-right: 20px;
        }
        .opciones{
          background: green;
          height: 60%;
          display: flex;
          flex-direction: column;
          justify-content: space-evenly;
          align-items: center;
          padding: 0;
          margin: 0;
        }
        li{
          list-style: none;
        }
        a{
          text-decoration: none;
          color: black;
          font-size: 25px;
          font-family: sans-serif;
        }
    `;
    this.shadow.appendChild(style);
  }
  connectedCallback() {
    this.render();
    const button = this.shadow.querySelector(".closer-button");
    button.addEventListener("click", () => {});
  }
}
customElements.define("menu-list", MenuList);
