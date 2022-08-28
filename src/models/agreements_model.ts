import { Schema, model } from 'mongoose';
import { IAgreements } from '../types/interfaces';

const AgreementsSchema = new Schema<IAgreements>({
  name: { type: String, required: true },
  parties: [{ type: String, required: true }],
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  details: { type: String, required: true },
  attachments: [{ type: Object, required: true }],
  reminder: { type: Boolean, required: true },
});

AgreementsSchema.virtual('url').get(function () {
  return 'agreements' + this._id;
});

module.exports = model<IAgreements>('Agreement', AgreementsSchema);
