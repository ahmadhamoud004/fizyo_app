import { Types } from "mongoose";

export interface IServiceProviders {
  _id?: Types.ObjectId | string;
  // Example on foreign key string
  uID?: string | Types.ObjectId;
  // Example on string
  bio: string;
  specialities: string;
  // Example on string[] enum
  preferredServiceType: string[] | ("online" | "home" | "office")[];
  // Example on number
  minSessionFee: number;
  maxSessionFee: number;
  // Example on object with attributes
  documents?: { url: string; name: string; attType: string };
  // Example on string[] of foreign keys
  reviewerUIDs?: string[] | Types.ObjectId[];
  // Example on enum
  verificationStatus:
    | "notSubmitted"
    | "pendingReview"
    | "inReview"
    | "verified"
    | "rejected";
  // Example on date
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
  // Example on object[] with attributes
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
  _id?: Types.ObjectId | string;
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
  accountSetting: object;
  languages: string[];
  maritalStatus:   
    "married" | "single" | "divorced" | "widow";
}

export interface IRoles {
  _id: Types.ObjectId;
  name: string;
  employees?: string[] | Types.ObjectId[];
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