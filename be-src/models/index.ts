import { Pet } from "./pet";
import { User } from "./user";
import { Auth } from "./auth";
import { Report } from "./report";

User.hasMany(Pet);
Pet.belongsTo(User);
Pet.hasMany(Report);
Report.belongsTo(Pet);

export { Pet, User, Auth, Report };
