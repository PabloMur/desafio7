class PetCard extends HTMLElement {
    shadow;
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: "open" });
    }
    render() {
        const style = document.createElement("style");
        const profileImage = this.getAttribute("profile-image");
        this.shadow.innerHTML = `
      <div class="card-container">
        <div class="pet-profile-image">
          <img src="${profileImage}">
        </div>
        <div class="pet-data-container">
          <div class="name-and-zone">
            <h3 class="pet-name">Otto</h3>
            <h5 class="pet-zone">Centro Mar del Plata</h5>
          </div>
          <div>
            <button>Reportar Mascota</button>
          </div>
        </div>
      </div>
    `;
        style.innerHTML = `
      .card-container{
        background: var(--orange);
        width: 80%;
        max-width: 300px;
        margin: 10px auto;
        border-radius: 10px;
      }
      img{
        width: auto;
        height: 30vh;
      }
      .pet-profile-image{
        background: red;
        max-width: 300px;
      }
      .pet-data-container{
        background: red;
        display: flex;
        align-items: center;
        padding: 10px;
      }
      .name-and-zone{
        background: green;
        width:50%;
      }
    `;
        this.shadow.appendChild(style);
    }
    connectedCallback() {
        this.render();
    }
}
customElements.define("custom-pet-card", PetCard);
