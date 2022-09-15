class LoadingComp extends HTMLElement {
  shadow: ShadowRoot;
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }
  render() {
    const style = document.createElement("style");

    this.shadow.innerHTML = `
    <div class="loader_container">
      <p>Loading, please wait!</p>
      <iframe src="https://giphy.com/embed/VIfKkSJDf4yroE6QcR" width="60px" height="60px"</iframe>
    </div>
    `;

    style.innerHTML = `
    *{
      box-sizing: border-box;
      border: none;
    }

    .loader_container{
      background:#000000eb;
      color:white;
      position: absolute;
      top:0;
      right:0;
      left:0;
      bottom:0;
      padding: 30px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      z-index: 3;
    }
    
    .loader_container p{
      border:none;
      color:white;
      font-size: 40px;
      transition: 5s linear;
    }

    .loader_container p:hover{
      font-size: 60px;
    }
    `;

    this.shadow.appendChild(style);
  }
  connectedCallback() {
    this.render();
  }
}

customElements.define("loading-comp", LoadingComp);
