import { Schema,model } from "mongoose";

import {IEnumValues} from '../types/interfaces';

const EnumsSchema = new Schema<IAlarms>({

    name:{type:String, required:true},
    values:[{type:String, required:true}],
    note:{type:String, required:true},
        
});
module.exports = model<IEnumValues>('IEnumValues',EnumsSchema );