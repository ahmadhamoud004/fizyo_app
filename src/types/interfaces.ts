import {  Types } from "mongoose";
export interface ISessions {
  _id?: Types.ObjectId | string;
  sessionType:'group'|'individual'; //enum
  //serviceProvidersID?: string | Types.ObjectId | IserviceProviders;
  serviceProvidersID?: string | Types.ObjectId;
  //clientsIDs?: string[] | Types.ObjectId[] |IClients[];
  clientsIDs?: string[] | Types.ObjectId[];
  name: string;
  details: string;
  startDate: Date ;
  duration:number;
  serviceType:'Online'| 'Home'|'Office'; //enum
  location:string;
  attachments?:{ attachmentUrl:string;attachmentName:string;attachmentType:string; };
  requirements:string;
  ratings?:{
          //raterUID:string|Types.ObjectId|IUsers
          raterUID:string;
          ratingValue:string;
          ratingDate:Date;}[];
  reviews:{
    //reviewerUID:string|Types.ObjectId|IUsers
    reviewerUID:string|Types.ObjectId;
    reviewDetails:string;
    reviewDate:Date;
}[];
  sessionFee:number;
  payments:{
    discount:number;
    paymentMethod:string;
    payerID:string|Types.ObjectId;
    amount:number;
  };
  status:'initiated'|'agreed'|'canceled'|'finished';//enum
  doctorReferral:string;
}

export interface IAnnouncements{
_id ?: Types.ObjectId|string;
referenceType?:'Session'|'Advertisment';//enum
referenceID:string|null;
statues: 'draft'|'published';//enum
topic:string;
details:string;
sentDate:Date;
attachments:string;
//receiversUIDs?:string[]|Types.ObjectId[]|IUsers[];
receiversUIDs:string[]|Types.ObjectId[];

}
export interface IAlarms{
    _id?:string|Types.ObjectId;
    name:string;
    referenceType:'agreements'|'sessions'|'disputes'|'services providers';//enum
    referenceID?:string;
    frequencyUnit:'Days'|'Hours';//enum
    frequency:number;
    active:boolean;
    startDate:Date;
    endDate:Date;

}
export interface INotifications{
_id?: Types.ObjectId|string;
referenceType:'sessions'|'agreements'|'disputes'|'alarm'|'announcements'|'users'|'communications';//enum
referenceID:string;
statues:'sent'|'delivered'|'opened';//enum
title:string;
details: string;
sentDate:Date;
receivedDate:Date;
openDate:Date;
//receiverUID:string|Types.ObjectId|IUsers;
receiverUID:string|Types.ObjectId;
}

export interface IEnumValues{

    _id?:Types.ObjectId|string;
    enumName:string;
    enumValues:string[];
    enumNote:string;
}
