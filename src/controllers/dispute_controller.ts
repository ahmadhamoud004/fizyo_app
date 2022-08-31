import {
  Get,
  Post,
  Delete,
  Put,
  Route,
  SuccessResponse,
  Body,
  Response,
  Example,
  Path,
} from "tsoa";
import { Model } from "mongoose";
import { IDispute } from "../types/interfaces";

const DisputeModel: Model<IDispute> = require("../models/dispute_model");

@Route("disputes")
export default class DisputeController {
  /**
   * Get List of All disputes
   */
  @Get("/")
  public async getDisputes(): Promise<IDispute[]> {
    return await DisputeModel.find();
  }

  /**
   * Get a dispute details
   * @example disputeId "       "
   */
  @Response(404, "The requested dispute is not found")
  @Get("{disputeId}")
  public async getDispute(disputeId: string): Promise<IDispute | null> {
    return DisputeModel.findById(disputeId);
  }

  /**
   * Delete a dispute
   * @example disputeId "       "
   */
  @Response(404, "The requested dispute is not found")
  @SuccessResponse("200", "Deleted")
  @Delete("{disputeId}")
  public async deleteDispute(disputeId: string): Promise<IDispute | null> {
    return DisputeModel.findByIdAndDelete(disputeId);
  }

  /**
   * Create a dispute
   */
  @Response(422, "Validation Failed")
  @SuccessResponse("200", "Created")
  @Example<IDispute>({
    sessionID: "yuuruyyudde",
    firstPartyUID: "_",
    secondUID: "_",
    topic: "treatment",
    details: "more details",
    attachments: [
      { url: "http://localhost:8000/disputes", name: "file", type: "pdf" },
    ], // name, url, type
    status: "sent",
    resolverUID: "_",
    inProgressDate: new Date("2022-09-10"),
    receivedDate: new Date("2022-09-10"),
    suspendedDate: new Date("2022-09-10"),
    closedDate: new Date("2022-09-10"),
  })
  @Post("create")
  public async createDispute(@Body() dispute: IDispute): Promise<IDispute> {
    return new DisputeModel({ ...dispute }).save();
  }

  /**
   * Update a dispute
   */
  @Response(422, "Validation Failed")
  @SuccessResponse("200", "Updated")
  @Put("update/{disputeId}")
  public async updateDispute(
    @Path() disputeId: string,
    @Body() dispute: Partial<IDispute>
  ): Promise<IDispute | null> {
    let disputeDocument = await DisputeModel.findById(disputeId);
    if (disputeDocument != null) {
      disputeDocument.sessionID =
        dispute.sessionID ?? disputeDocument.sessionID;
      disputeDocument.firstPartyUID =
        dispute.firstPartyUID ?? disputeDocument.firstPartyUID;
      disputeDocument.secondUID =
        dispute.secondUID ?? disputeDocument.secondUID;
      disputeDocument.topic = dispute.topic ?? disputeDocument.topic;
      disputeDocument.details = dispute.details ?? disputeDocument.details;
      disputeDocument.attachments =
        dispute.attachments ?? disputeDocument.attachments; // name, url, type
      disputeDocument.status = dispute.status ?? disputeDocument.status;
      disputeDocument.resolverUID =
        dispute.resolverUID ?? disputeDocument.resolverUID;
      disputeDocument.inProgressDate =
        dispute.inProgressDate ?? disputeDocument.inProgressDate;
      disputeDocument.receivedDate =
        dispute.receivedDate ?? disputeDocument.receivedDate;
      disputeDocument.suspendedDate =
        dispute.suspendedDate ?? disputeDocument.suspendedDate;
      disputeDocument.closedDate =
        dispute.closedDate ?? disputeDocument.closedDate;

      return await disputeDocument.save();
    }
    return null;
  }
}
