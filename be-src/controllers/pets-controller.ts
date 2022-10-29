import { algoliaIndex } from "../lib/algolia";
import { Pet, User } from "../models";
import { cloudinary } from "../lib/cloudinary";

export async function createPet(userId, petData) {
  if (!userId) throw "user_id es necesario";

  if (userId && petData.image) {
    try {
      const user = await User.findByPk(userId);
      //const { image, fullname, age, zone, lat, lng, state } = petData;
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
        pet,
        objectID: pet.get("id").toString(),
        nombre: pet.get("fullname"),
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
  return await Pet.findByPk(petId);
}

function bodyToIndex(body, id?) {
  const respuesta: any = {};

  if (body.fullname) respuesta.fullname = body.fullname;
  if (body.ownerId) respuesta.ownerId = body.ownerId;
  if (body.lat && body.lng)
    respuesta._geoloc = { lat: body.lat, lng: body.lng };

  if (id) respuesta.objectID = id;

  return respuesta;
}

export async function updatePetData(dataForUpadate, petId) {
  const [petUpdated] = await Pet.update(dataForUpadate, {
    where: {
      id: petId,
    },
  });

  const indexItem = bodyToIndex(dataForUpadate, petId);
  await algoliaIndex.partialUpdateObject(indexItem);

  return petUpdated;
}

export async function updateProfile(userId, updateData) {
  if (!updateData) throw new Error("Se necesita data para actualizar");

  if (updateData.imageDataUrl) {
    const imageUpload = await cloudinary.uploader.upload(
      updateData.imageDataUrl,
      {
        resource_type: "image",
        discard_original_filename: true,
        width: 1000,
      }
    );

    const updateDataComplete = {
      fullname: updateData.fullname,
      bio: updateData.bio,
      imageDataUrl: imageUpload.secure_url,
    };

    console.log(imageUpload.secure_url);

    await User.update(updateDataComplete, {
      where: {
        id: userId,
      },
    });

    return updateDataComplete;
  }
}

export async function deletePet(petId: string, userId) {
  if (userId) {
    try {
      const pet = await Pet.findByPk(petId);
      await pet.destroy();
      return true;
    } catch (error) {
      console.error(error);
    }
  }
}
