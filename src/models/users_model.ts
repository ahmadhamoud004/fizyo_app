import { Schema, model } from "mongoose";
import { IUsers, IEnumValues } from "../types/interfaces";

const UsersSchema = new Schema<IUsers>({
  // Example on String
  email: { type: String, required: true },
  password: { type: String, required: true },
  profilePicture: { type: String, required: false },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  // Example on Enum
  gender: {
    type: String,
    required: true,
    // enum: IEnu,
    // default: "Male",
  },
  // Example on Date
  DOB: { type: Date, required: false },
  // Example on object[] with attributes
  address: [
    {
      country: { type: String, required: true },
      government: { type: String, required: true },
      manipolicity: { type: String, required: true },
    },
  ],
  verified: {
    type: String,
    required: true,
    enum: ["notSent", "pending", "verified"],
    default: "notSent",
  },
  status: {
    type: String,
    required: true,
    enum: ["inActive", "active", "suspended", "lost", "deleted"],
    default: "inActive",
  },
  accountType: {
    type: String,
    required: true,
    enum: ["PT", "EM", "PA"],
    default: "PT",
  },
  lastLoginDate: { type: Date, required: false },
  // Example on object
  accountSetting: { type: Object, required: false },
  // Example on String[]
  languages: [{ type: String, required: true }],
  maritalStatus: {
    type: String,
    required: true,
    enum: ["married", "single", "divorced", "widow"],
    default: "single",
  },
});

UsersSchema.virtual("url").get(function () {
  return "users/" + this._id;
});

module.exports = model<IUsers>("User", UsersSchema);
