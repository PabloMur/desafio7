class PetInfoSender extends HTMLElement {
  petName: string;
  shadow: ShadowRoot;
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    this.petName = this.getAttribute("petname") || " esta mascota:";
  }
  render() {
    const style = document.createElement("style");

    this.shadow.innerHTML = `
        <div class="infosender-container">
          <form class="form">
              <custom-text varian="title">Repotar Informacion de ${this.petName}</custom-text>
              <label>
                <p>Tu nombre</p>
                <input type="text" name="informant-name" required>
              </label>
              <label>
                <p>Tu telefono</p>
                <input type="tel" required name="informant-phone-number">
              </label>
              <label>
                <p>Donde lo viste?</p>
                <textarea name="information"></textarea>
              </label>
              <div>
                <button class="button">Enviar</button>
              </div>
            </form>
        </div>
    
    `;

    style.innerHTML = `
      *{
        box-sizing: border-box;
      }
      .infosender-container{
        background:#000000eb;
        height: 90vh;
        width: 100%;
        display:flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: 10vh;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 3;
      }
      .form{
        height: 80vh;
        width: 90%;
        max-width: 400px;
        background: #ffe5b5;
        border-radius: 20px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
      label{
        background: red;
        width: 90%;
        margin: 0 auto;
      }
      input{
        border: none;
        width: 90%;
        margin: 0 auto;
        height: 50px;
        border-radius: 5px;
        box-shadow: 5px 5px 2px #c7c7c7;
        padding: 5px;
        font-size: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      p{
        background: orange;
      }
    `;

    this.shadow.appendChild(style);
  }

  addlisteners() {
    this.render();
    const form = this.shadow.querySelector(".form");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const target = e.target as any;
      const informantName = target["informant-name"].value;
      const informantTel = target["informant-phone-number"].value;
      const information = target["information"].value;

      console.log(informantName, informantTel, information);
    });
  }
  connectedCallback() {
    this.addlisteners();
  }
}

customElements.define("pet-info-sender", PetInfoSender);
