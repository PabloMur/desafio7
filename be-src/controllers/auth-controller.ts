import { Auth } from "../models/index";

export async function createAuth(userId, email, password) {
  const [auth, authCreated] = await Auth.findOrCreate({
    where: { user_id: userId },
    defaults: {
      email: email,
      password: password,
      user_id: userId,
    },
  });

  return {
    auth,
    authCreated,
  };
}

export async function authId(email, password) {
  try {
    const res = await Auth.findOne({
      where: { email: email, password: password },
    });
    return res;
  } catch (error) {
    console.error(error);
  }
}

export async function updatePassword(user_id, password) {
  try {
    const authUser = await Auth.findByPk(user_id);
    await authUser.update({ password });
    return authUser;
  } catch (error) {
    console.error(error);
  }
}
