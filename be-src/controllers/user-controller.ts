import { User, Pet } from "../models/index";
import { cloudinary } from "../lib/cloudinary";

export async function createUser(fullname: string, email: string) {
  const [user, created] = await User.findOrCreate({
    where: { email: email },
    defaults: {
      fullname: fullname,
      email: email,
    },
  });
  return {
    user,
    created,
  };
}

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

    return pet;
  } else {
    throw "Error, user not found";
  }
}

export async function updateProfile(userId, updateData) {
  if (!updateData) {
    throw new Error("Se necesita data para actualizar");
  }
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

export async function getProfile(userId: number) {
  const userProfile = await User.findByPk(userId);
  return userProfile;
}

export async function getAllProfiles() {
  const profiles = await User.findAll();
  return profiles;
}

export async function getPets(userId: number) {
  const pets = await Pet.findAll({
    where: {
      userId: userId,
    },
    include: [User],
  });
  return pets;
}

export async function checkProfile(email: string) {
  const emailExists = await User.findAll({
    where: { email: email },
  });

  return emailExists ? true : false;
}
