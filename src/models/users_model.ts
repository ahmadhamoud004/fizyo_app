import { Schema, model } from "mongoose";
import { IUsers } from "../types/interfaces";

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
    enum: ["Male", "Female"],
    default: "Male",
  },
  // Example on Date
  DOB: { type: Date, required: true },
  // Example on object[] with attributes
  address: [
    {
        country: { type: String },
        government: { type: String },
        manipolicity: { type: String },
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
    enum: ["inActive", "penactiveding", "suspended", "lost", "deleted"],
    default: "inActive",
  },
  accountType: {
    type: String,
    required: true,
    enum: ["PT", "EM", "PA"],
    default: "PT",
  },
  lastLoginDate: { type: Date, required: true },
  // Example on object
  accountSetting:{type: Object, required: false},
  // Example on String[]
  languages: [{ type: String }],
  maritalStatus: {
    type: String,
    required: true,
    enum: ["married", "single", "divorced", "widow"],
    default: "single",
  }
});

UsersSchema.virtual("url").get(function () {
  return "Users/" + this._id;
});

module.exports = model<IUsers>(
  "User",
  UsersSchema
);