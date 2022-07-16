const API_BASE = "https://desafio-mod6.herokuapp.com";

import { rtdb, ref, onValue } from "./rtdb";

const state = {
  data: {
    token: "",
    roomId: "",
    rtdbRoomId: "",
    roomCreator: "",
    user: {},
    result: "",
  },
  listeners: [],

  init() {
    const localData = localStorage.getItem("saved-state");
    this.setState(JSON.parse(localData as any));
  },

  listenRTDBData() {
    const cs = this.getState();
    const gameRoomRef = ref(rtdb, `/gamerooms/${cs.rtdbRoomId}/currentGame`);
    onValue(gameRoomRef, (snapshot) => {
      const data = snapshot.val();
      this.setState({ ...cs, rtdbData: data });
    });
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
      const urlForFetch = API_BASE + "/signup";

      const fetchedData = await fetch(urlForFetch, {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, nombre: nombre }),
      });

      const response = await fetchedData.json();

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

  async guestPlayer(callback?) {
    const cs = this.getState();
    const rtdbGameRoomId = cs.rtdbRoomId;
    const nombre = cs.nombre;

    await fetch(API_BASE + "/player-guest", {
      mode: "cors",
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre: nombre,
        rtdbGameRoomId: rtdbGameRoomId,
      }),
    });

    if (callback) {
      callback();
    }
  },

  async signIn(cb?) {
    const cs = this.getState();

    if (cs.email) {
      const fetchedData = await fetch(API_BASE + "/authorize", {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: cs.email }),
      });
      const response = await fetchedData.json();
      cs.userId = response.id;
      this.setState(cs);
      if (cb) {
        cb();
      }
    } else {
      console.error("no hay un mail en el state");
    }
  },

  async askNewGameRoom(callback?) {
    const cs = this.getState();
    try {
      const requestAskingNewGameroom = await fetch(API_BASE + "/game-rooms", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ userId: cs.userId, nombre: cs.nombre }),
      });
      const response = await requestAskingNewGameroom.json();
      cs.roomId = response.friendlyId;
      cs.rtdbRoomId = response.longGameRoomId;
      cs.roomCreator = true;
      this.setState(cs);
      if (callback) {
        callback();
      }
    } catch (err) {
      console.error(err);
    }
  },

  async accesToGameRoom(callback?) {
    const cs = this.getState();
    const roomId = cs.roomId;
    const userId = cs.userId;
    const requestAccesing = await fetch(
      API_BASE + "/game-rooms/" + roomId + "?userId=" + userId
    );
    const data = await requestAccesing.json();
    cs.rtdbRoomId = data;
    cs.roomId = roomId;
    this.setState(cs);
    this.listenRTDBData();

    if (callback) {
      callback();
    }
  },

  async playerIsReady(localOrGuest: player, callback?) {
    //recibe "playerOne" o "playerTwo"
    const cs = this.getState();
    const request = await fetch(API_BASE + "/start", {
      mode: "cors",
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        player: localOrGuest,
        rtdbRoomId: cs.rtdbRoomId,
      }),
    });
    if (callback) {
      callback();
    }
  },

  async playersChoice(localOrGuest: player, choice: move, callback?) {
    //recibe "playerOne" o "playerTwo"
    const cs = state.getState();
    const rtdbRoomId = cs.rtdbRoomId;

    const request = await fetch(API_BASE + "/choice", {
      mode: "cors",
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        player: localOrGuest,
        rtdbRoomId: rtdbRoomId,
        choice: choice,
      }),
    });
    if (callback) {
      callback();
    }
  },

  async replay(callback?) {
    const cs = this.getState();
    const rtdbRoomId = cs.rtdbRoomId;
    await fetch(API_BASE + "/replay", {
      mode: "cors",
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        rtdbRoomId: rtdbRoomId,
      }),
    });
    if (callback) {
      callback();
    }
  },

  async cleaningReplay(callback?) {
    const cs = this.getState();
    const rtdbRoomId = cs.rtdbRoomId;
    await fetch(API_BASE + "/clear-replay", {
      mode: "cors",
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        rtdbRoomId: rtdbRoomId,
      }),
    });
    if (callback) {
      callback();
    }
  },
  async growScore(player: player, callback?) {
    const cs = this.getState();
    const rtdbRoomId = cs.rtdbRoomId;
    const score = cs.roomCreator
      ? cs.rtdbData.playerOne.score
      : cs.rtdbData.playerTwo.score;
    await fetch(API_BASE + "/grow-score", {
      mode: "cors",
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        player: player,
        rtdbRoomId: rtdbRoomId,
        score: score + 1,
      }),
    });
    if (callback) {
      callback();
    }
  },

  whoWins(localMove: move, guestMove: move, callback) {
    const cs = this.getState();

    const pOneGanaConTijeras = localMove == "tijera" && guestMove == "papel";
    const pOneGanaConPiedra = localMove == "piedra" && guestMove == "tijera";
    const pOnelGanaConPapel = localMove == "papel" && guestMove == "piedra";

    const pTwoGanaConTijeras = localMove == "papel" && guestMove == "tijera";
    const pTwoGanaConPapel = localMove == "piedra" && guestMove == "papel";
    const pTwoGanaConPiedra = localMove == "tijera" && guestMove == "piedra";

    const ganaPlayerOne = [
      pOneGanaConPiedra,
      pOnelGanaConPapel,
      pOneGanaConTijeras,
    ].includes(true);

    const ganaPlayerTwo = [
      pTwoGanaConTijeras,
      pTwoGanaConPapel,
      pTwoGanaConPiedra,
    ].includes(true);

    const empate = localMove == guestMove;
    const iAmLocal = cs.roomCreator;

    if (ganaPlayerOne) {
      if (iAmLocal) {
        state.growScore("playerOne", () => {
          state.setState({ ...cs, result: "ganaste" });
          state.listenRTDBData();
          callback();
        });
      } else if (!iAmLocal) {
        state.setState({ ...cs, result: "perdiste" });
        state.listenRTDBData();
        callback();
      }
    }
    if (ganaPlayerTwo) {
      if (!iAmLocal) {
        state.growScore("playerTwo", () => {
          state.setState({ ...cs, result: "ganaste" });
          state.listenRTDBData();
          callback();
        });
      } else if (iAmLocal) {
        state.setState({ ...cs, result: "perdiste" });
        state.listenRTDBData();
        callback();
      }
    }
    if (empate) {
      this.setState({ ...cs, result: "empataste" });
      state.listenRTDBData();
      callback();
    }
  },
};

export { state };
