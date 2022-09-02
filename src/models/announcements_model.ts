import { Schema, model } from "mongoose";
import { type } from "os";

import { IAnnouncements } from "../types/interfaces";

const AnnouncementSchema = new Schema<IAnnouncements>({
  referenceType: {
    type: String,
    enum: ["Session", "Advertisment"],
    default: "Session",
    required: true,
  },
  referenceID: { type: String, required: true },
  statues: {
    type: String,
    enum: ["published", "published"],
    default: "published",
  },
  topic: { type: String, required: true },
  details: { type: String, required: true },
  sentDate: { type: Date, required: true },
  attachments: { type: String, required: true },
  //receiversUIDs:[{type:Schema.Types.ObjectId,ref:"User"}],
  receiversUIDs: [{ type: String, required: true }],
});
AnnouncementSchema.virtual("url").get(function () {
  return "announcements/" + this._id;
});
module.exports = model<IAnnouncements>("Announcement", AnnouncementSchema);
