import { User, Pet, Report } from "../models/index";

export async function createReport(petData) {
  if (!petData.ownerId) {
    throw "user_id es necesario";
  }

  if (petData.ownerId) {
    const report = await Report.create(petData);
    return report;
  } else {
    throw "Error, user not found";
  }
}
