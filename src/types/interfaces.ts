import { Types } from "mongoose";

export interface IServiceProviders {
  _id?: Types.ObjectId | string;
  uID?: string | Types.ObjectId;
  bio: string;
  specialities: string;
  // preferredServiceType: string[] | ("online" | "home" | "office")[];
  minSessionFee: Number;
  maxSessionFee: Number;
  // documents?: { url: string; name: string; type: string };
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

export interface IDispute {
  _id?: Types.ObjectId | string;
  sessionID?: string | Types.ObjectId;
  firstPartyUID?: string | Types.ObjectId;
  secondUID?: string | Types.ObjectId;
  topic: string;
  details: string;
  attachments?: { url: string; name: string; type: string }[]; // name, url, type
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
  // attachments: Object[];
  reminder: boolean;
  url?: string;
}
