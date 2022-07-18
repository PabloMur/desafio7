import { Pet } from "./pet";
import { User } from "./user";
import { Auth } from "./auth";

User.hasMany(Pet);
Pet.belongsTo(User);

export { Pet, User, Auth };
