import { algoliaIndex } from "../lib/algolia";
import { Pet, User } from "../models";

export async function createPet(data, user_id) {
  const { fullname, age, zone, lat, lng, state } = data;
  const [pet, created] = await Pet.findOrCreate({
    where: { user_id: user_id },
    defaults: {
      fullname,
      age,
      zone,
      lat,
      lng,
      state,
    },
  });

  const petInAlgolia = await algoliaIndex.saveObject({
    objectID: pet.get("id"),
    nombre: pet.get("fullname"),
    _geoloc: {
      lat: pet.get("lat"),
      lng: pet.get("lng"),
    },
  });

  return {
    pet,
    created,
    petInAlgolia,
  };
}

export async function allPets() {
  return await Pet.findAll();
}

export async function specificPet(user_id) {
  return await Pet.findOne({
    where: {
      user_id,
    },
  });
}

function bodyToIndex(body, id?) {
  const respuesta: any = {};
  if (body.fullname) {
    respuesta.fullname = body.fullname;
  }
  if (body.ownerId) {
    respuesta.ownerId = body.ownerId;
  }
  if (body.lat && body.lng) {
    respuesta._geoloc = { lat: body.lat, lng: body.lng };
  }
  if (id) {
    respuesta.objectID = id;
  }
  return respuesta;
}

export async function updatePetData(dataForUpadate, petId) {
  const [petUpdated] = await Pet.update(dataForUpadate, {
    where: {
      id: petId,
    },
  });

  const indexItem = bodyToIndex(dataForUpadate, petId);
  const algoliaRes = await algoliaIndex.partialUpdateObject(indexItem);
  return petUpdated;
}

export async function deletePet() {}
