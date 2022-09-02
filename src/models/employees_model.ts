import { Schema, model } from "mongoose";
import { IEmployees } from "../types/interfaces";

const EmployeesSchema = new Schema<IEmployees>({
  uID: { type: Schema.Types.ObjectId, ref: "User" },
  //uID: { type: String, required: true },
  roleID: { type: Schema.Types.ObjectId, ref: "Role" },
  //roleID: { type: String, required: true },
  salary: { type: Number, required: true },
  attachments: [
    {
      type: {
        name: { type: String, required: true },
        url: { type: String, required: true },
        type: { type: String, required: true },
      },
    },
  ],
});

EmployeesSchema.virtual("url").get(function () {
  return "employees/" + this._id;
});

module.exports = model<IEmployees>("Employee", EmployeesSchema);
