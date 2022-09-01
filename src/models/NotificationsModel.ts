import { Schema,model } from "mongoose";
import { type } from "os";

import {INotifications} from '../types/interfaces';

const NOtificationsSchema = new Schema<INotifications>({

    referenceType:{type:String,
        enum:['sessions','agreements','disputes','alarm','announcements','users','communications'],
        default:"sessions",
        required:true  },
    referenceID:{type:String, required:true},
    statues:{type:String,
        enum:['sent','delivered','opened'],
        default:"sent",
        required:true  },
    title:{type:String, required:true},
    details:{type:String, required:true},
    sentDate:{type:Date, required:true},
    receivedDate:{type:Date, required:true},
    openDate:{type:Date, required:true},
    receiverUID:{type:Schema.Types.ObjectId, ref:"User"}
    
});
module.exports = model<INotifications>('Notification',NOtificationsSchema );