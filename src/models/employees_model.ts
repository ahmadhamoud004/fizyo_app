import { Schema, model } from "mongoose";
import { IEmployees } from "../types/interfaces";

const EmployeesSchema = new Schema<IEmployees>({
  //uID: { type: Schema.Types.ObjectId, ref: 'IUsers' },
  uID: { type: String, required: true },
  //roleID: { type: Schema.Types.ObjectId, ref: 'IRoles' },
  roleID: { type: String, required: true },
  salery: {type: Number, required: true},
  attachments:[
    {
      type: Object({
        name: { type: String, required: true },
        url: { type: String, required: true },
        type: { type: String, required: true },
      }),
    },
  ],
});

EmployeesSchema.virtual("url").get(function () {
  return "Employees/" + this._id;
});

module.exports = model<IEmployees>(
  "Employees",
  EmployeesSchema
);