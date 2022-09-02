import { Schema, model } from "mongoose";
import { IClients } from "../types/interfaces";

const ClientsSchema = new Schema<IClients>({
  uID: { type: String },
  preferredServiceType: [
    {
      type: String,
      required: true,
      enum: ["online", "home", "office"],
      default: "online",
    },
  ],
  diseases: { type: String, required: true },
  preferences: { type: Object, required: true },
});

ClientsSchema.virtual("url").get(function () {
  return "clients/" + this._id;
});

module.exports = model<IClients>("Client", ClientsSchema);
