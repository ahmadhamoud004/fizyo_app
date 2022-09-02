import { Schema,model } from "mongoose";
import { type } from "os";

import {IAnnouncements} from '../types/interfaces';

const AnnouncementSchema = new Schema<IAnnouncements>({

  referenceType:{
    type:String,
    required:true,
    enum:["session","advertisment"],
    default:"session"},
  referenceID:{type:String},
  statues:{type:String,
           enum:["draft","published"],
            default:"published"},
    topic:{type:String},
    details:{type:String},
    sentDate:{type:Date},
    attachments:{type:String},
    //receiversUIDs:[{type:Schema.Types.ObjectId,ref:"User"}],
    receiversUIDs:[{type:String}]
});
module.exports = model<IAnnouncements>('Announcement', AnnouncementSchema);