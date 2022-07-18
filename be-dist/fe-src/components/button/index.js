class Button extends HTMLElement {
    shadow;
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: "open" });
    }
    render() {
        const style = document.createElement("style");
        this.shadow.innerHTML = `
      <button class="button"></button>
      `;
        const button = this.shadow.querySelector(".button");
        button.textContent = this.textContent || "ups!";
        style.innerHTML = `
        .button{
          font-size: 18px;
          border-radius: 4px;
          padding: 17px 13px;
          background-color:black;
          color:#D8FCFC;
          width: 200px;
          border:none;
          border-radius: 8px;
          animation: lower .4s ease ;
          margin:0 auto;
        }
        @media screen and (max-width: 600px){
          .root{
            min-width: 90%;
            margin:0 5vw;
          }
        }
        @keyframes lower{
          0%{
            transform: translateY(100%);
          }
          75%{
            transform: translateY(-10%);
          }
          100%{
            transform: translateY(0%);
          }
        }
        `;
        this.shadow.appendChild(style);
    }
    connectedCallback() {
        this.render();
    }
}
customElements.define("custom-button", Button);
