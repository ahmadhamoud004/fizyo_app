import { Schema, model } from 'mongoose';
import { IServiceProviders } from '../types/interfaces';

const ServiceProvidersSchema = new Schema<IServiceProviders>({
  uID: { type: Schema.Types.ObjectId, ref: 'User' },
  bio: { type: String, required: true },
  specialities: { type: String, required: true },
  preferredServiceType: [
    {
      type: String,
      required: true,
      enum: ['online', 'home', 'office'],
      default: 'online',
    },
  ],
  minSessionFee: Number,
  maxSessionFee: Number,
  documents: {
    type: { url: String, name: String, type: String },
    required: true,
  },
  reviewerUIDs: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  verificationStatus: {
    type: String,
    required: true,
    enum: ['notSubmitted', 'pendingReview', 'inReview', 'verified', 'rejected'],
    default: 'notSubmitted',
  },
  verificationDate: { type: Date, required: true },
  verifiedByUID: { type: Schema.Types.ObjectId, ref: 'User' },
});

ServiceProvidersSchema.virtual('url').get(function () {
  return 'serviceProviders/' + this._id;
});

module.exports = model<IServiceProviders>(
  'ServiceProvider',
  ServiceProvidersSchema
);
