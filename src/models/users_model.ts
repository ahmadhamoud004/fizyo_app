import { Schema, model } from "mongoose";
import { IUsers } from "../types/interfaces";

const UsersSchema = new Schema<IUsers>({
  email: { type: String, required: true },
  password: { type: String, required: true },
  profilePicture: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  
  // Enum
  gender: {
    type: String,
    required: true,
    enum: ["Male", "Female"],
    default: "Male",
  },
  
  DOB: { type: Date, required: true },
  
  // Objects Array
  address: [
    {
      type: Object({
        country: { type: String },
        government: { type: String },
        manipolicity: { type: String },
      }),
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

  // Object
  accountSetting:{type: Object, required: false},

  // Array Of Strings
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
  "Users",
  UsersSchema
);