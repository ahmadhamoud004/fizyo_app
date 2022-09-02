import { Schema, model } from "mongoose";
import { IRoles } from "../types/interfaces";

const RolesSchema = new Schema<IRoles>({
  name: { type: String, required: true },
  employees: [{ type: Schema.Types.ObjectId, ref: "Employee" }],
  users: [{ type: Schema.Types.ObjectId, ref: "User" }],
  service_provider: [{ type: Schema.Types.ObjectId, ref: "ServiceProvider" }],
  clients: [{ type: Schema.Types.ObjectId, ref: "Client" }],
  sessions: [{ type: Schema.Types.ObjectId, ref: "Session" }],
  communications: [{ type: Schema.Types.ObjectId, ref: "Communication" }],
  disputes: [{ type: Schema.Types.ObjectId, ref: "Disputes" }],
  enum_values: [{ type: Schema.Types.ObjectId, ref: "EnumValue" }],
});

RolesSchema.virtual("url").get(function () {
  return "roles/" + this._id;
});

module.exports = model<IRoles>("Role", RolesSchema);
