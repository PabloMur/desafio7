import { fetchMachine } from "./fetch";
const apiBase = process.env.API_BASE_URL;

const state = {
  data: {
    fullname: "",
    email: "",
    registrated: false,
    logged: false,
    token: "",
    userLocation: {
      lat: 0,
      lng: 0,
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
      const fetchingUser = await fetch(apiBase + "/auth", {
        method: "post",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullname: "Poli",
          email: "escuchado@gmail.com",
          password: "password",
        }),
      });
      const res = await fetchingUser.json();
      if (res) {
        console.log(res);
      }
      return res;
    } catch (error) {
      console.error(error);
    }
  },

  //cheackear el mail que nos pasa el user
  async getUserLocation() {
    const cs = this.getState();
    navigator.geolocation.getCurrentPosition((position) => {
      cs.userLocation.lat = position.coords.latitude;
      cs.userLocation.lng = position.coords.longitude;
      this.setState(cs);
    });
  },
};

export { state };
