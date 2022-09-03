import { Schema, model } from "mongoose";

import { IEnumValues } from "../types/interfaces";

const EnumsSchema = new Schema<IEnumValues>({
  enumName: { type: String, required: true },
  enumValues: [{ type: String, required: true }],
  enumNote: { type: String, required: true },
});
EnumsSchema.virtual("url").get(function () {
  return "enumValues/" + this._id;
});
module.exports = model<IEnumValues>("EnumValue", EnumsSchema);
