class MyPetCard extends HTMLElement {
  profileImage: any;
  petName: any;
  petZone: any;
  petId: any;
  status: string;
  constructor() {
    super();
    this.profileImage =
      this.getAttribute("profile-image") ||
      "https://images.pexels.com/photos/58997/pexels-photo-58997.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
    this.petName = this.getAttribute("pet-name") || "Apix";
    this.petZone = this.getAttribute("pet-zone") || "Planeta Tierra";
    this.petId = this.getAttribute("pet-id")
    this.status = this.getAttribute("pet-status") || "perdido";
  }
  render() {
    const style = document.createElement("style");

    this.innerHTML = `
          <div class="card-container">
            <div class="pet-profile-image">
            </div>
            <div class="pet-data-container">
              <custom-text class="pet-name">${this.petName}</custom-text>
              <h5 class="pet-zone">Ultima zona: ${this.petZone}</h5>
              <h5 class="pet-satus">Actualmente: ${this.status}</h5>
              <button class="finded-button">Reportar como encontrado</button>
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
          width: 300px;
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
          height: 40vh;
        }
        .pet-profile-image{
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
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
        }
  
        .finded-button{
          width: 100%;
          color: white;
          background: black;
          border: none;
          font-size: 18px;
          padding: 10px;
          border-radius: 10px;
        }
      `;

    this.appendChild(style);
  }

  addListeners() {
    this.render();
    const button = this.querySelector(".finded-button");
    button.addEventListener("click", () => {
      this.dispatchEvent(
        new CustomEvent("report", {
          detail: {
            petId: this.petId,
            petName: this.petName,
          },
          bubbles: true,
        })
      );
    });
  }
  connectedCallback() {
    this.addListeners();
  }
}

customElements.define("my-pet-card", MyPetCard);
