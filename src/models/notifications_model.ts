import { Schema, model } from "mongoose";
import { INotifications } from "../types/interfaces";

const NotificationsSchema = new Schema<INotifications>({
  referenceType: {
    type: String,
    enum: [
      "Session",
      "Agreement",
      "Dispute",
      "Alarm",
      "Announcement",
      "User",
      "Communication",
    ],
    default: "Session",
    required: true,
  },
  referenceID: { type: Schema.Types.ObjectId, ref: "referenceType" },
  statues: {
    type: String,
    enum: ["sent", "delivered", "opened"],
    default: "sent",
    required: true,
  },
  title: { type: String, required: true },
  details: { type: String, required: true },
  sentDate: { type: Date, required: true },
  receivedDate: { type: Date, required: true },
  openDate: { type: Date, required: true },
  receiverUID: { type: Schema.Types.ObjectId, ref: "User" },
  // receiverUID: { type: String },
});
NotificationsSchema.virtual("url").get(function () {
  return "notifications/" + this._id;
});
module.exports = model<INotifications>("Notification", NotificationsSchema);
