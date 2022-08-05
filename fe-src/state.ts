import { fetchMachine } from "./fetch";

const state = {
  data: {
    fullname: "",
    email: "",
    registrated: false,
    logged: false,
    token: "",
    location: {
      lat: "",
      lng: "",
    },
    pets: [],
  },
  listeners: [],

  init() {
    const localData = localStorage.getItem("saved-state");
    this.setState(JSON.parse(localData as any));
  },

  getState() {
    return this.data;
  },

  setState(newState) {
    this.data = newState;
    for (const cb of this.listeners) {
      cb();
    }
    localStorage.setItem("saved-state", JSON.stringify(newState));
    console.log("Soy el state, he cambiado", this.data);
  },

  subscribe(callback: (any) => any) {
    this.listeners.push(callback);
  },

  //seteamos el nombre y el email del player en el state
  setUserEmail(email: string) {
    const cs = this.getState();
    this.setState({ ...cs, email: email });
  },

  setUserName(password: string) {},

  //creo que deberia subscribir a los botones y no la pagina-- los botones de la lista

  async createUser() {
    try {
      const cs = this.getState();
    } catch (error) {
      console.error(error);
    }
  },
};

export { state };
