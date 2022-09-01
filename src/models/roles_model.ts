import { Schema, model } from "mongoose";
import { IRoles } from "../types/interfaces";

const RolesSchema = new Schema<IRoles>({
  name: { type: String, required: true, },
  employees:[{type:Schema.Types.ObjectId, ref:"IEmployees"}],
  users: [{ type: String }],
  service_provider: [{ type: String }],
  clients: [{ type: String }],
  sessions: [{ type: String }],
  communications: [{ type: String }],
  disputes: [{ type: String }],
  enum_values: [{ type: String }],
});

RolesSchema.virtual("url").get(function () {
  return "Roles/" + this._id;
});

module.exports = model<IRoles>(
  "Roles",
  RolesSchema
);