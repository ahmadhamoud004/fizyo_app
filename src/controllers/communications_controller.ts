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
import { ICommunications } from "../types/interfaces";

const CommunicationsModel: Model<ICommunications> = require("../models/communications_model");

@Route("communications")
export default class CommunicationsController {
  /**
   * Get List of All communications
   */
  @Get("/")
  public async getCommunications(): Promise<ICommunications[]> {
    return await CommunicationsModel.find();
  }

  /**
   * Get a communication details
   * @example communicationId "63107b4a8e2578704ed06b1d"
   */
  @Response(404, "The requested communication is not found")
  @Get("{communicationId}")
  public async getCommunication(
    communicationId: string
  ): Promise<ICommunications | null> {
    return await CommunicationsModel.findById(communicationId);
  }

  /**
   * Delete a communication
   * @example communicationId "63107b4a8e2578704ed06b1d"
   */
  @Response(404, "The requested communication is not found")
  @SuccessResponse("200", "Deleted")
  @Delete("{communicationId}")
  public async deleteCommunication(
    communicationId: string
  ): Promise<ICommunications | null> {
    return await CommunicationsModel.findByIdAndDelete(communicationId);
  }

  /**
   * Create a communication
   */
  @Response(422, "Validation Failed")
  @SuccessResponse("200", "Created")
  @Example<ICommunications>({
    referenceType: "Session",
    referenceID: "_",
    partiesUIDs: ["_"],
    lastUpdate: new Date("2022-09-10"),
    messages: [
      {
        messageType: "txt",
        messageContent: "hello",
        senderUID: "_",
        sendDate: new Date("2022-09-10"),
        deliveryDetails: [{ status: "done" }],
      },
    ],
  })
  @Post("create")
  public async createCommunication(
    @Body() communication: ICommunications
  ): Promise<ICommunications> {
    return await new CommunicationsModel({ ...communication }).save();
  }

  /**
   * Update a communication
   */
  @Response(422, "Validation Failed")
  @SuccessResponse("200", "Updated")
  @Put("update/{communicationId}")
  public async updateCommunication(
    @Path() communicationId: string,
    @Body() communication: Partial<ICommunications>
  ): Promise<ICommunications | null> {
    let communicationDocument = await CommunicationsModel.findById(
      communicationId
    );
    if (communicationDocument != null) {
      communicationDocument.referenceType =
        communication.referenceType ?? communicationDocument.referenceType;
      communicationDocument.referenceID =
        communication.referenceID ?? communicationDocument.referenceID;
      communicationDocument.partiesUIDs =
        communication.partiesUIDs ?? communicationDocument.partiesUIDs;
      communicationDocument.lastUpdate =
        communication.lastUpdate ?? communicationDocument.lastUpdate;
      communicationDocument.messages =
        communication.messages ?? communicationDocument.messages;

      return await communicationDocument.save();
    }
    return null;
  }
}
