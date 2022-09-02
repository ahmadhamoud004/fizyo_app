import { Schema, model } from "mongoose";
import { type } from "os";
import { ISessions } from "../types/interfaces";

const SessionsSchema = new Schema<ISessions>({
  sessionType: {
    type: String,
    enum: ["group", "individual"],
    default: "individual"
  },
  //serviceProvidersID: {type: Schema.Types.ObjectId,ref: "ServiceProvider"},
  serviceProvidersID: {type:String},

  //clientsIDs: [{ type: Schema.Types.ObjectId, ref: "Client" }],
  clientsIDs: { type: String },

  name: { type: String },
  details: { type: String },
  startDate: { type: Date},
  duration: { type: Number},
  serviceType: {
    type: String,
    required: false,
    enum: ["Home", "Office", "Online"],
    default: "Office"
  },
  location: { type: String },
  attachments: {
    type: {
      attachmentUrl: { type: String},
      attachmentName: { type: String },
      attachmentType: { type: String }
    }
  },
  requirements: { type: String},
  ratings: [
    {
      type: {
        // raterUID: { type: Schema.Types.ObjectId, ref: "User" },
        raterUID: { type: String },
        ratingValue: { type: String},
        ratingDate: { type: Date}
      }
    }
  ],
  reviews: [
    {
      type: {
        //reviewerUID: { type: Schema.Types.ObjectId, ref: "User" },
        reviewerUID: { type: String },
        reviewDeatails: { type: String },
        reviewDate: { type: Date },
      }
    }
  ],
  sessionFee: { type: Number },
  payments: {
    type: {
      discount: { type: Number },
      paymentMethod: { type: String },
      // payerID: { type: Schema.Types.ObjectId, ref: "Client", required: false },
      payerID: { type: String },
      amount: { type: Number },
    }
  },
  status: {
    type: String,
    enum: ["initiated", "agreed", "canceled", "finished"],
    default: "initiated"
  },
  doctorReferral: { type: String }

});
module.exports = model<ISessions>("Session", SessionsSchema);
