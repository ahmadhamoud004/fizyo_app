import { Schema, model } from "mongoose";

import { IAlarms } from "../types/interfaces";

const AlarmsSchema = new Schema<IAlarms>({
  name: { type: String, required: true },
  referenceType: {
    type: String,
    enum: ["Agreement", "Session", "Dispute", "ServiceProvider"],
    default: "Session",
    required: true,
  },
  referenceID: { type: [Schema.Types.ObjectId], refPath: "referenceType" },

  frequencyUnit: {
    type: String,
    enum: ["Days", "Hours"],
    default: "Hours",
    required: true,
  },
  frequency: { type: Number, required: true },
  active: { type: Boolean, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
});
AlarmsSchema.virtual("url").get(function () {
  return "alarms/" + this._id;
});
module.exports = model<IAlarms>("Alarm", AlarmsSchema);
