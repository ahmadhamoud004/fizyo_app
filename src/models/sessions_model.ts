import { Schema, model } from "mongoose";
import { type } from "os";
import { ISessions } from "../types/interfaces";

const SessionsSchema = new Schema<ISessions>({
  sessionType: {
    type: String,
    enum: ["group", "individual"],
    default: "individual",
    required: true,
  },
  //serviceProvidersID: {type: Schema.Types.ObjectId,ref: "ServiceProvider"},
  serviceProvidersID: { type: String },

  //clientsIDs: [{ type: Schema.Types.ObjectId, ref: "Client" }],
  clientsIDs: { type: String },

  name: { type: String, required: true },
  details: { type: String, required: true },
  startDate: { type: Date, required: true },
  duration: { type: Number, required: true },
  serviceType: {
    type: String,
    enum: ["Home", "Office", "Online"],
    default: "Office",
  },
  location: { type: String, required: true },
  attachments: {
    type: {
      attachmentUrl: { type: String, required: true },
      attachmentName: { type: String, required: true },
      attachmentType: { type: String, required: true },
    },
  },
  requirements: { type: String, required: true },
  ratings: [
    {
      type: {
        // raterUID: { type: Schema.Types.ObjectId, ref: "User" },
        raterUID: { type: String, required: true },
        ratingValue: { type: String, required: true },
        ratingDate: { type: Date, required: true },
      },
    },
  ],
  reviews: [
    {
      type: {
        //reviewerUID: { type: Schema.Types.ObjectId, ref: "User" },
        reviewerUID: { type: String, required: true },
        reviewDetails: { type: String, required: true },
        reviewDate: { type: Date, required: true },
      },
    },
  ],
  sessionFee: { type: Number, required: true },
  payments: {
    type: {
      discount: { type: Number, required: true },
      paymentMethod: { type: String, required: true },
      // payerID: { type: Schema.Types.ObjectId, ref: "Client", required: false },
      payerID: { type: String, required: true },
      amount: { type: Number, required: true },
    },
  },
  status: {
    type: String,
    enum: ["initiated", "agreed", "canceled", "finished"],
    default: "initiated",
    required: true,
  },
  doctorReferral: { type: String, required: true },
});
SessionsSchema.virtual("url").get(function () {
  return "sessions/" + this._id;
});
module.exports = model<ISessions>("Session", SessionsSchema);
