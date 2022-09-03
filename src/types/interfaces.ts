import { Types } from "mongoose";
export interface ISessions {
  _id?: Types.ObjectId | string;
  sessionType: "group" | "individual"; //enum
  serviceProvidersID?: string | Types.ObjectId | IServiceProviders;
  //serviceProvidersID?: string | Types.ObjectId;
  clientsIDs?: string[] | Types.ObjectId[] | IClients[];
  //clientsIDs?: string[] | Types.ObjectId[];
  name: string;
  details: string;
  startDate: Date;
  duration: number;
  serviceType: "Online" | "Home" | "Office"; //enum
  location: object;
  attachments?: {
    attachmentUrl: string;
    attachmentName: string;
    attachmentType: string;
  };
  requirements: string;
  ratings?: {
    raterUID: string | Types.ObjectId | IUsers;
    // raterUID: string;
    ratingValue: string;
    ratingDate: Date;
  }[];
  reviews?: {
    reviewerUID: string | Types.ObjectId | IUsers;
    // reviewerUID: string | Types.ObjectId;
    reviewDetails: string;
    reviewDate: Date;
  }[];
  sessionFee: number;
  payments?: {
    discount: number;
    paymentMethod: string;
    payerID: string | Types.ObjectId | IUsers;
    amount: number;
  };
  status: "initiated" | "agreed" | "canceled" | "finished"; //enum
  doctorReferral?: string;
  url?: string;
}

export interface IAnnouncements {
  _id?: Types.ObjectId | string;
  referenceType: "Session" | "Advertisement"; //enum
  referenceID?: string | ISessions | INotifications;
  statues: "draft" | "published"; //enum
  topic: string;
  details: string;
  sentDate: Date;
  attachments: object[];
  receiversUIDs?: string[] | Types.ObjectId[] | IUsers[];
  //receiversUIDs: string[] | Types.ObjectId[];
  url?: string;
}
export interface IAlarms {
  _id?: string | Types.ObjectId;
  name: string;
  referenceType: "Agreement" | "Session" | "Dispute" | "ServiceProvider"; //enum
  referenceID?:
    | string
    | IAgreements
    | ISessions
    | IDisputes
    | IServiceProviders;
  frequencyUnit: "Days" | "Hours"; //enum
  frequency: number;
  active: boolean;
  startDate: Date;
  endDate: Date;
  url?: string;
}
export interface INotifications {
  _id?: Types.ObjectId | string;
  referenceType:
    | "Session"
    | "Agreement"
    | "Dispute"
    | "Alarm"
    | "Announcement"
    | "User"
    | "Communication"; //enum
  referenceID:
    | string
    | ISessions
    | IAgreements
    | IDisputes
    | IAlarms
    | IAnnouncements
    | IUsers
    | ICommunications;
  statues: "sent" | "delivered" | "opened"; //enum
  title: string;
  details: string;
  sentDate: Date;
  receivedDate: Date;
  openDate: Date;
  receiverUID: string | Types.ObjectId | IUsers;
  //receiverUID: string | Types.ObjectId;
  url?: string;
}

export interface IEnumValues {
  _id?: Types.ObjectId | string;
  enumName: string;
  enumValues: string[];
  enumNote: string;
  url?: string;
}

export interface IServiceProviders {
  _id?: Types.ObjectId | string;
  // Example on foreign key string
  uID?: string | Types.ObjectId | IUsers;
  // Example on string
  bio: string;
  specialties: string;
  // Example on string[] enum
  preferredServiceType: string[] | ("online" | "home" | "office")[];
  // Example on number
  minSessionFee: number;
  maxSessionFee: number;
  // Example on object with attributes
  documents?: { url: string; name: string; attType: string };
  // Example on string[] of foreign keys
  reviewerUIDs?: string[] | Types.ObjectId[] | IUsers[];
  // Example on enum
  verificationStatus:
    | "notSubmitted"
    | "pendingReview"
    | "inReview"
    | "verified"
    | "rejected";
  // Example on date
  verificationDate: Date;
  verifiedByUID?: string | Types.ObjectId | IUsers;
  url?: string;
}

export interface IDisputes {
  _id?: Types.ObjectId | string;
  sessionID?: string | Types.ObjectId | ISessions;
  firstPartyUID?: string | Types.ObjectId | IUsers;
  secondUID?: string | Types.ObjectId | IUsers;
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
  resolverUID?: string | Types.ObjectId | IUsers;
  inProgressDate: Date;
  receivedDate: Date;
  suspendedDate: Date;
  closedDate: Date;
  url?: string;
}

export interface ICommunications {
  _id?: string | Types.ObjectId;
  referenceType: "Agreement" | "Session" | "Dispute" | "User";
  referenceID?:
    | string
    | Types.ObjectId
    | ISessions
    | IAgreements
    | IDisputes
    | IUsers;
  partiesUIDs?: string[] | Types.ObjectId[] | IUsers[];
  lastUpdate: Date;
  // Example on object[] with attributes
  messages: {
    messageType: string;
    messageContent: string;
    senderUID: string | Types.ObjectId | IUsers;
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
  attachments?: object[];
  reminder: boolean;
  url?: string;
}

export interface IClients {
  _id?: string | Types.ObjectId;
  uID?: string | Types.ObjectId | IUsers;
  preferredServiceType: string[] | ("online" | "home" | "office")[];
  diseases: string;
  preferences: object;
  url?: string;
}

export interface IUsers {
  _id?: Types.ObjectId | string;
  email: string;
  phoneNumber: string;
  password: string;
  profilePicture: string;
  firstName: string;
  lastName: string;
  gender: string; // Enum
  DOB: Date;
  address?: {
    country: string;
    government: string;
    manipolicity: string;
  }[];
  verified: "notSent" | "pending" | "verified";
  status: "inActive" | "active" | "suspended" | "lost" | "deleted";
  accountType: "PT" | "EM" | "PA";
  lastLoginDate: Date;
  accountSetting: object;
  languages: string[];
  maritalStatus: "married" | "single" | "divorced" | "widow";
  url?: string;
}

export interface IRoles {
  _id?: string | Types.ObjectId;
  name: string;
  employees?: string[] | Types.ObjectId[] | IEmployees[];
  //employeesArr?: Array<PopulatedDoc<IEmployees & Document>>;
  users?: string[] | Types.ObjectId[] | IUsers[];
  service_provider?: string[] | Types.ObjectId[] | IServiceProviders[];
  clients?: string[] | Types.ObjectId[] | IClients[];
  sessions?: string[] | Types.ObjectId[] | ISessions[];
  communications?: string[] | Types.ObjectId[] | ICommunications[];
  disputes?: string[] | Types.ObjectId[] | IDisputes[];
  enum_values?: string[] | Types.ObjectId[] | IEnumValues[];
  url?: string;
}

export interface IEmployees {
  _id?: Types.ObjectId;
  uID?: string | Types.ObjectId | IUsers;
  //user: PopulatedDoc<IUsers & Document>;
  roleID?: string | Types.ObjectId | IRoles;
  //role: PopulatedDoc<IRoles & Document>;
  salary: number;
  attachments?: {
    name: string;
    url: string;
    type: string;
  }[];
  url?: string;
}
