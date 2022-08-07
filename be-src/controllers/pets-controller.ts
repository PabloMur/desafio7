import { algoliaIndex } from "../lib/algolia";
import { Pet, User } from "../models";

export async function createPet(userId, petData) {
  if (!userId) {
    throw "user_id es necesario";
  }

  if (userId) {
    const user = await User.findByPk(userId);

    const pet = await Pet.create({
      ...petData,
      userId: user.get("id"),
    });
  
    const petInAlgolia = await algoliaIndex.saveObject({
      objectID: pet.get("id").toString(),
      nombre: pet.get("fullname"),
      _geoloc: {
        lat: pet.get("lat"),
        lng: pet.get("lng"),
      },
    });

    return {pet,petInAlgolia};
  } else {
    throw "Error, user not found";
  }
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
