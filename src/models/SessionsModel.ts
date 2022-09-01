import { Schema,model } from "mongoose";
import { type } from "os";
import {ISessions} from '../types/interfaces';

const SessionsSchema = new Schema<ISessions>({

  sessionType:{type:String,
              required:true,
              enum:["group","individual"],
              default:"individual"
  
  },
  serviceProvidersID: {type:Schema.Types.ObjectId,ref:"IserviceProviders",required:true},
  clientsIDs:[{type:Schema.Types.ObjectId, ref:"Client"}],
  name: {type:String,required:true},
  details: {type:String,required:true},
  startDate: {type:Date,required:true},  
  duration:{type:Number, required:true},
  serviceType:{
    
    type:String,
    required:true,
    enum:["Home","Office","Online"],
    default:"Office"

},
  location:Object,
  attachments:{type:{
    attachmentUrl:{type:String,required:true},
    attachmentName:{type:String,required:true},
    attachmentType:{type:String,required:true},
  },required:true
  },
  requirements:{type:String,required:true},
  ratings:[{
    type:{
      raterUID:{type:Schema.Types.ObjectId,ref:"User"},
      ratingValue:{type:String,required:true},
      ratingDate:{type:Date,required:true},

    }

  }],
  reviews:[{
    type:{
      reviewerUID:{type:Schema.Types.ObjectId,ref:"User"},
      reviewDeatails:{type:String,required:true},
      reviewDate:{type:Date,required:true},

    }

  }],
  sessionFee:{type:Number,required:true},
  payments:{
    type:{
    discount:{type:Number},
    payment:{type:String},
    paymentMethod:{type:String},
    payerID:{type:Schema.Types.ObjectId,ref:"Client",required:true},
    amount:{type:Number}
  }
  },
  status:{
    type:String,
    enum:["initiated","agreed","canceled","finished"],
    default:"initiated"
  },
  doctorReferral:{type:String},


});
module.exports = model<ISessions>('Session', SessionsSchema);