import { Schema, model } from "mongoose";
import { IEmployees } from "../types/interfaces";

const EmployeesSchema = new Schema<IEmployees>({
  //uID: { type: Schema.Types.ObjectId, ref: 'IUsers' },
  uID: { type: String, required: false },
  //roleId: { type: Schema.Types.ObjectId, ref: 'IRoles' },
  roleId: { type: String, required: false },
  salery: {type: Number, required: false},
  attachments:[
    {
      name: { type: String, required: false },
      url: { type: String, required: false },
      type: { type: String, required: false },
    },
  ],
});

EmployeesSchema.virtual("url").get(function () {
  return "Employees/" + this._id;
});

module.exports = model<IEmployees>(
  "Employee",
  EmployeesSchema
);