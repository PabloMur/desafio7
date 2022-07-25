import { fetchMachine } from "./fetch";

const state = {
  data: {
    token: "",
    location: {
      lat: "",
      lng: "",
    },
    pets: [],
    user: {},
  },
  listeners: [],

  init() {
    const localData = localStorage.getItem("saved-state");
    this.setState(JSON.parse(localData as any));
  },

  getState() {
    return this.data;
  },
  //seteamos el nombre y el email del player en el state
  setNombreAndEmail(nombre: string, email: string) {
    const cs = this.getState();
    cs.nombre = nombre;
    cs.email = email;
    this.setState(cs);
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

  async createPlayer(cb?) {
    try {
      const cs = this.getState();
      const nombre = cs.nombre;
      const email = cs.email;

      cs.registrated = true;
      this.setState(cs);
      console.log("Player creado");

      if (cb) {
        cb();
      }
    } catch (error) {
      console.error(error);
    }
  },
};

export { state };
