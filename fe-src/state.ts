type msg = {
  to: string;
  from: string;
  subject: string;
  text: string;
  html: string;
};

type pet = {
  fullname: string;
  age: string;
  zone: string;
  lat: number;
  lng: number;
  state: string;
  image: string;
};

const state = {
  data: {
    route: null,
    id: "",
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
    report: {},
  },
  listeners: [],

  init() {
    const localData = localStorage.getItem("saved-state");
    this.setState(JSON.parse(localData as any));
  },

  logout() {
    localStorage.removeItem("saved-state");
    this.setState({
      route: null,
      id: "",
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
      report: {},
    });
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

  //Seteamos la ruta para navegar en la app en caso de que este logueado el user
  navigationRoute(route: string) {
    const cs = this.getState();
    this.setState({
      ...cs,
      route,
    });
  },

  //seteamos el nombre y el email del player en el state
  setUserEmail(email: string) {
    const cs = this.getState();
    this.setState({ ...cs, email });
  },

  setUserName(fullname: string) {
    const cs = this.getState();
    this.setState({ ...cs, fullname });
  },
  //Esto creo que no lo estoy usando!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  userRegistrated() {
    const cs = this.getState();
    this.setState({ ...cs, registrated: true });
  },

  userLogged() {
    const cs = this.getState();
    this.setState({ ...cs, logged: true });
  },

  // PARA SEGuir desarrollando, es buena idea pero a pulir
  dataForReport(value: any) {
    const cs = state.getState();
    this.setState({
      ...cs,
      report: {
        value,
      },
    });
  },

  //creo que deberia subscribir a los botones y no la pagina-- los botones de la lista
  async createUser(password: string, fullname: string) {
    try {
      const email = this.getState().email;
      const fetchingUser = await fetch("/auth", {
        method: "post",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullname,
          email,
          password,
        }),
      });
      const res = await fetchingUser.json();

      res ?? console.log(res);

      return res;
    } catch (error) {
      console.error(error);
    }
  },

  //cheackear el mail que nos pasa el user
  async checkEmail() {
    try {
      const cs = this.getState();
      const fetchingEmail = await fetch("/auth/email-check", {
        method: "post",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: cs.email,
        }),
      });
      const response = fetchingEmail.json();
      return response;
    } catch (error) {
      console.error(error);
    }
  },
  //obtener el token del usuario
  async getToken(password: string) {
    try {
      const cs = this.getState();
      const fetchingEmail = await fetch("/auth/token", {
        method: "post",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: cs.email,
          password,
        }),
      });
      const response = await fetchingEmail.json();

      if (response.error) {
        alert("contraseña incorrecta");
        return response;
      } else {
        this.setUserToken(response.token);
        this.userLogged();

        return response;
      }
    } catch (error) {
      console.error(error);
    }
  },

  setUserToken(token: string) {
    try {
      const cs = this.getState();
      this.setState({ ...cs, token });
    } catch (error) {
      console.error(error);
    }
  },

  //obtener la data del usuario
  async getUserMe() {
    try {
      const cs = this.getState();
      const token = cs.token;
      const fetchingUser = await fetch("/auth/me", {
        method: "get",
        mode: "cors",
        headers: {
          Authorization: `bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const response = await fetchingUser.json();

      this.setState({
        ...cs,
        id: response.id,
        fullname: response.fullname,
        pets: response.pets,
      });

      return response;
    } catch (error) {
      console.error(error);
    }
  },

  async UpdateUserName(fullname: string) {
    try {
      const cs = this.getState();
      const token = cs.token;
      const fetchingUserName = await fetch("/auth/me", {
        method: "put",
        mode: "cors",
        headers: {
          Authorization: `bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullname: fullname,
        }),
      });

      const response = await fetchingUserName.json();
      console.log(response);

      return response;
    } catch (error) {
      console.error(error);
    }
  },

  async reportUserPet(pet: pet) {
    const cs = state.getState();
    const token = cs.token;

    const fetchPets = await fetch("/pet", {
      method: "post",
      mode: "cors",
      headers: {
        Authorization: `bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pet),
    });

    const response = await fetchPets.json();
    return response;
  },

  async getUserPets() {
    const cs = state.getState();
    const token = cs.token;

    const fetchPets = await fetch("/me/pets", {
      method: "get",
      mode: "cors",
      headers: {
        Authorization: `bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const response = await fetchPets.json();
    this.setState({
      ...cs,
      pets: response.pets,
    });
    return response;
  },

  async getPetsAround(lat, lon) {
    try {
      const fetchPets = await fetch(`/pets-around?lat=${lat}&lng=${lon}`);
      const response = await fetchPets.json();
      return response;
    } catch (err) {
      console.error(err);
    }
  },

  async sendEmail(mensaje: msg) {
    try {
      const cs = this.getState();
      const test = await fetch("/send-email", {
        method: "post",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          msg: {
            to: cs.email,
            from: "pablomurillo.sp@gmail.com",
            subject: "Avistamiento de tu mascota",
            text: "and",
            html: "<strong>Este mensaje ha sido enviado desde el Front-End mother!</strong>",
          },
        }),
      });

      const response = await test.json();
      return response;
    } catch (error) {
      console.error(error);
    }
  },
};

export { state };
