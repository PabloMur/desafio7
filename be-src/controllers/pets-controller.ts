import { algoliaIndex } from "../lib/algolia";
import { Pet, User } from "../models";
import { cloudinary } from "../lib/cloudinary";

export async function createPet(userId, petData) {
  if (!userId) throw "user_id es necesario";

  if (userId && petData.image) {
    try {
      const user = await User.findByPk(userId);
      const imageParseada = await cloudinary.uploader.upload(petData.image, {
        resource_type: "image",
        discard_original_filename: true,
        width: 1000,
      });

      const pet = await Pet.create({
        ...petData,
        image: imageParseada.secure_url,
        userId: user.get("id"),
      });

      const petInAlgolia = await algoliaIndex.saveObject({
        objectID: pet.get("id").toString(),
        fullname: pet.get("fullname"),
        image: pet.get("image"),
        zone: pet.get("zone"),
        status: pet.get("state"),
        userId: user.get("id"),
        ownerEmail:user.get("email"),
        _geoloc: {
          lat: pet.get("lat"),
          lng: pet.get("lng"),
        },
      });

      return { pet, petInAlgolia };
    } catch (error) {
      console.error(error);
    }
  }
}
export async function allPets() {
  return await Pet.findAll({
    include: [User],
  });
}

export async function specificPet(petId) {
  return await Pet.findByPk(petId, {
    include: [User],
  });
}

function bodyToIndex(body, id?) {
  const respuesta: any = {};

  if (body.fullname) respuesta.fullname = body.fullname;
  if (body.image) respuesta.image = body.image;
  if (body.ownerId) respuesta.ownerId = body.ownerId;
  if (body.zone) respuesta.zone = body.zone;
  if (body.lat && body.lng)
    respuesta._geoloc = { lat: body.lat, lng: body.lng };

  if (id) respuesta.objectID = id;

  return respuesta;
}

export async function updatePetData(dataForUpadate, petId) {
  try {
    let pet;

    if (dataForUpadate.image.includes("data")) {
      console.log("tiene data");
      const imageParseada = await cloudinary.uploader.upload(
        dataForUpadate.image,
        {
          resource_type: "image",
          discard_original_filename: true,
          width: 1000,
        }
      );
      pet = {
        ...dataForUpadate,
        image: imageParseada.secure_url,
      };

      const indexItem = await bodyToIndex(pet, petId);
      await algoliaIndex.partialUpdateObject(indexItem);
      await Pet.update(pet, {
        where: {
          id: petId,
        },
      });
    } else {
      pet = {
        dataForUpadate,
      };
      const petUpdated = await Pet.update(pet, {
        where: {
          id: petId,
        },
      });
      const indexItem = bodyToIndex(pet, petId);
      const algoliaUpdate = await algoliaIndex.partialUpdateObject(indexItem);
      return { petUpdated, algoliaUpdate };
    }
  } catch (error) {
    console.error(error);
  }
}

export async function deletePet(petId: string, userId) {
  if (userId) {
    try {
      const pet = await Pet.findByPk(petId);
      await algoliaIndex.deleteObject(petId).then(() => console.log(petId));
      await pet.destroy();
      return true;
    } catch (error) {
      console.error(error);
    }
  }
}
