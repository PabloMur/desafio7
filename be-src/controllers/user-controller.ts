import { User, Pet } from "../models/index";

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
  const empty = emailExists.length === 0;
  return empty ? false : true;
}

export async function updateUserProfile(userId, data) {
  const user = await User.findByPk(userId);
  await user.update(data);
  return user;
}
