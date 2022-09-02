import { Schema, model } from "mongoose";
import { IRoles } from "../types/interfaces";

const RolesSchema = new Schema<IRoles>({
  name: { type: String, required: true },
  employees: [{ type: Schema.Types.ObjectId, ref: "Employee" }],
  users: [{ type: String, required: true }],
  service_provider: [{ type: String, required: true }],
  clients: [{ type: String, required: true }],
  sessions: [{ type: String, required: true }],
  communications: [{ type: String, required: true }],
  disputes: [{ type: String, required: true }],
  enum_values: [{ type: String, required: true }],
});

RolesSchema.virtual("url").get(function () {
  return "roles/" + this._id;
});

module.exports = model<IRoles>("Role", RolesSchema);
