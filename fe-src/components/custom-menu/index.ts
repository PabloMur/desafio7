import { Router } from "@vaadin/router";
import { state } from "../../state";

class CustomMenu extends HTMLElement {
  shadow: ShadowRoot;
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    this.click();
  }
  render() {
    const style = document.createElement("style");
    this.shadow.innerHTML = `
              <div class="menu-container">  
                  <div class="menu-logo">
                    <custom-logo></custom-logo>
                  </div>
                  <nav class="menu-nav">
                      <ul class="nav-list">
                          <list-button route="/my-data">My Data</list-button>
                          <list-button route="/my-pets">My Pets</list-button>
                          <list-button route="/report">My Reports</list-button>
                          <list-button variant="enfasis" route="/login">Login</list-button>
                          <list-button variant="dark" route="/signup">Signup</list-button>
                          <button class="logout">logOut</button>
                      </ul> 
                  </nav>
                  <div class="nav-burger-logo">
                    <div class="lineOne"></div>
                    <div class="lineTwo"></div>
                    <div class="lineThree"></div>
                  </div>
              </div>
          `;
    style.innerHTML = `
          *{
            box-sizing: border-box;
          }
          .escondido{
            display: none;
          }
          .mostrado{
            display:inherit;
            background: green;
          }
          .menu-container{
              height: 11vh;
              width:100%;
              max-width:100%;
              background:var(--purple);
              margin-top:0;
              display:flex;
              justify-content: space-between;
              align-items:center;
              color:white;
              padding:20px 60px;
              position:fixed;
              left: 0;
              top: 0;
              z-index:10;
          }
          @media (max-width: 600px){
            .menu-container{
              padding: 20px;
            }
            .menu-nav{
              position: absolute;
              top: 12vh;
              left: 100%;
              width: 100%;
              margin: 0 auto;
              background: var(--purple);
              height: 89vh;
              overflow:hidden;
              justify-content: center;
              align-items:center;
            }
          }

          .menu-logo{
            display:flex;
            align-items: center;
          }
          .nav-list{
              display:flex;
              width:100%;
              height: 9vh;
              justify-content: space-around;    
              align-items: center;  
          }
          
          a{
            font-weight: bolder;
            font-family: var(--font-family);
          }

          @media (max-width: 600px) {
            .nav-list {
              width: 100%;
              height: 60vh; 
              flex-direction: column;
              padding: 0;
            }
            a{
              font-weight: bolder;
            }
          }
          li{
              list-style:none;
              height: 12vh;
              min-width: 6.1vw;
              display: flex;
              justify-content: center;
              align-items:center;
          }
          @media (max-width: 600px){
            li{
              background: var(--purple);
              width: 50%;
              font-size: 30px;
              
            }
          }
          .logo-name{
              font-size: 30px;
              letter-spacing: 2px;
              margin-left: 30px;
          }
          @media (max-width: 600px){
            .logo-name{
              font-size: 2rem;
              margin-left:0;
            }
          }
          .nav-list-link{
              color: white;
              text-decoration: none;
          }
          .nav-list-link:hover{
              color:var(--main-bg-color);
          }
          .nav-burger-logo{
            display: none;
          }
          @media (max-width: 600px){
            .nav-burger-logo{
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              height: 30px;
              width:31px;
            }
            .lineOne, .lineTwo, .lineThree{
              background: black;
              height: 25%;
              border-radius: 3px;
            }
          }

          .emphasis{
            background: black;
            padding: 5px 8px;
            border-radius: 5px;
          }

          .secondary{
            background: var(--blue);
            padding: 5px 8px;
            border-radius: 5px;
          }

          .mostrado{
            display:inherit;
            left: 0;
          }
          
      `;
    this.shadow.appendChild(style);
  }
  click() {
    this.render();
    let burger = this.shadow.querySelector(".nav-burger-logo") as any;
    let lista = this.shadow.querySelector(".menu-nav") as any;
    let salir = this.shadow.querySelector(".logout" as any);

    salir.addEventListener("click", () => {
      state.logout();
      Router.go("/login");
    });

    burger.addEventListener("click", () => {
      lista.classList.toggle("mostrado");
    });
  }
}

customElements.define("custom-menu", CustomMenu);
