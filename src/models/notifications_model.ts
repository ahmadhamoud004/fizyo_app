import { Schema, model } from "mongoose";
import { INotifications } from "../types/interfaces";

const NotificationsSchema = new Schema<INotifications>({
  referenceType: {
    type: String,
    enum: [
      "sessions",
      "agreements",
      "disputes",
      "alarm",
      "announcements",
      "users",
      "communications",
    ],
    default: "sessions",
    required: true,
  },
  referenceID: { type: String, required: true },
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
  //receiverUID:{type:Schema.Types.ObjectId, ref:"User"}
  receiverUID: { type: String },
});
NotificationsSchema.virtual("url").get(function () {
  return "notifications/" + this._id;
});
module.exports = model<INotifications>("Notification", NotificationsSchema);
