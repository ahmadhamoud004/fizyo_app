import { Schema,model } from "mongoose";
import { type } from "os";

import {IAlarms} from '../types/interfaces';

const AlarmsSchema = new Schema<IAlarms>({

    name:{type:String, required:true},
    referenceType:{type:String,
    enum:['agreements','sessions','disputes','services providers'],
    default:"sessions",
    required:true  },
    referenceID:{type:String},
    frequencyUnit:{type:String,
    enum:["days","hours"],
    default:"hours",
    required:true},
    frequency:{type:Number,required:true},
    active:{type:Boolean,required:true},
    startDate:{type:Date,required:true},
    endDate:{type:Date,required:true}    
});
module.exports = model<IAlarms>('Alarm',AlarmsSchema );