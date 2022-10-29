class PetCard extends HTMLElement {
  shadow: ShadowRoot;
  profileImage: any;
  petName: any;
  petZone: any;
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    this.profileImage = this.getAttribute("profile-image");
    this.petName = this.getAttribute("pet-name");
    this.petZone = this.getAttribute("pet-zone");
  }
  render() {
    const style = document.createElement("style");

    this.shadow.innerHTML = `
      <div class="card-container">
        <div class="pet-profile-image">
        </div>
        <div class="pet-data-container">
          <div class="name-and-zone">
            <h3 class="pet-name">${this.petName}</h3>
            <h5 class="pet-zone">${this.petZone}</h5>
          </div>
          <div>
            <button class="edit-button">Tengo Informacion</button>
          </div>
        </div>
      </div>
    `;

    style.innerHTML = `
      *{
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }

      .card-container{
        background: #ffe5b5;
        width: 250px;
        margin: 10px auto;
        border-radius: 20px;
        overflow: hidden;
        padding: 10px;
        border: 1px solid #00000029;
        box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
        font-family: 'DM Serif Display', serif;
      }
      img{
        width: auto;
        height: 30vh;
      }
      .pet-profile-image{
        max-width: 300px;
        width: auto;
        height: 30vh;
        background-image: url(${this.profileImage});
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
        border-radius: 20px;
      }
      .pet-data-container{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px;
      }
      .name-and-zone{
        width:50%;
      }

      .edit-button{
        color: white;
        background: black;
        border: none;
        font-size: 18px;
        padding: 5px;
        border-radius: 10px;
      }
    `;

    this.shadow.appendChild(style);
  }
  connectedCallback() {
    this.render();
  }
}

customElements.define("custom-pet-card", PetCard);
