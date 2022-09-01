import { Types } from "mongoose";

export interface IServiceProviders {
  _id?: Types.ObjectId | string;
  uID?: string | Types.ObjectId;
  bio: string;
  specialities: string;
  preferredServiceType: string[] | ("online" | "home" | "office")[];
  minSessionFee: number;
  maxSessionFee: number;
  documents?: { url: string; name: string; attType: string };
  reviewerUIDs?: string[] | Types.ObjectId[];
  verificationStatus:
    | "notSubmitted"
    | "pendingReview"
    | "inReview"
    | "verified"
    | "rejected";
  verificationDate: Date;
  verifiedByUID?: string | Types.ObjectId;
  url?: string;
}

export interface IDisputes {
  _id?: Types.ObjectId | string;
  sessionID?: string | Types.ObjectId;
  firstPartyUID?: string | Types.ObjectId;
  secondUID?: string | Types.ObjectId;
  topic: string;
  details: string;
  attachments?: { url: string; name: string; disType: string }[]; // name, url, type
  status:
    | "sent"
    | "received"
    | "in-progress"
    | "suspended"
    | "rejected"
    | "resolved";
  resolverUID?: string | Types.ObjectId;
  inProgressDate: Date;
  receivedDate: Date;
  suspendedDate: Date;
  closedDate: Date;
  url?: string;
}

export interface ICommunications {
  _id?: string | Types.ObjectId;
  referenceType: "sessions" | "agreements" | "disputes" | "users";
  referenceID?: string | Types.ObjectId;
  partiesUIDs?: string[] | Types.ObjectId[];
  lastUpdate: Date;
  messages: {
    messageType: string;
    messageContent: string;
    senderUID: string | Types.ObjectId;
    sendDate: Date;
    deliveryDetails: object[];
  }[];
  url?: string;
}

export interface IAgreements {
  _id?: string | Types.ObjectId;
  name: string;
  parties: string[];
  startDate: Date;
  endDate: Date;
  details: string;
  attachments: object[];
  reminder: boolean;
  url?: string;
}

export interface IClients {
  _id?: string | Types.ObjectId;
  uID?: string | Types.ObjectId;
  preferredServiceType: string[] | ("online" | "home" | "office")[];
  diseases: string;
  preferences: object;
}

export interface IUsers {
  _id: Types.ObjectId | string;
  email: string;
  phoneNumber: string;
  password: string;
  profilePicture: string;
  firstName: string;
  lastName: string;
  gender:
    "Male" | "Female";
  DOB:Date;
  address: {
    country: string;
    government: string;
    manipolicity: string;
  }[];
  verified: 
    "notSent" | "pending" | "verified";
  status:
    "inActive" | "active" | "suspended" | "lost" | "deleted";
  accountType:
    "PT" | "EM" | "PA";
  lastLoginDate: Date;
  accountSetting: Object;
  languages: string[];
  maritalStatus:   
    "married" | "single" | "divorced" | "widow";
}

export interface IRoles {
  _id: Types.ObjectId;
  name: string;
  employees?: string[] | Types.ObjectId[] | IEmployees[];
  //employeesArr?: Array<PopulatedDoc<IEmployees & Document>>;
  users: string[];
  service_provider: string[];
  clients: string[];
  sessions: string[];
  communications: string[];
  disputes: string[];
  enum_values: string[];
}

export interface IEmployees {
  _id: Types.ObjectId;
  uID?: string | Types.ObjectId;
  //user: PopulatedDoc<IUsers & Document>;
  roleID?: string | Types.ObjectId;
  //role: PopulatedDoc<IRoles & Document>;
  salery: Number;
  attachments: {
    name: string;
    url: string;
    type: string;
  }[];
}