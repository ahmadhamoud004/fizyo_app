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
import { IClients } from "../types/interfaces";

const ClientsModel: Model<IClients> = require("../models/clients_model");

@Route("clients")
export default class ClientControllers {
  /**
   * Get List of All clients
   */
  @Get("/")
  public async getClients(): Promise<IClients[]> {
    return await ClientsModel.find();
  }

  /**
   * Get a client details
   * @example clientId "6310750be8f4ab035351fb78"
   */
  @Response(404, "The requested client is not found")
  @Get("{clientId}")
  public async getClient(clientId: string): Promise<IClients | null> {
    return await ClientsModel.findById(clientId);
  }

  /**
   * Delete a client
   * @example clientId "6310750be8f4ab035351fb78"
   */
  @Response(404, "The requested client is not found")
  @SuccessResponse("200", "Deleted")
  @Delete("{clientId}")
  public async deleteClient(clientId: string): Promise<IClients | null> {
    return await ClientsModel.findByIdAndDelete(clientId);
  }

  /**
   * Create a client
   */

  @Response(422, "Validation Failed")
  @SuccessResponse("200", "Created")
  @Example<IClients>({
    uID: "63124dffdcf1e4974079a441",
    preferredServiceType: ["online"],
    diseases: "diseases",
    preferences: { pref: "pref test" },
  })
  @Post("create")
  public async createClient(@Body() client: IClients): Promise<IClients> {
    return await new ClientsModel({ ...client }).save();
  }

  /**
   * Update a Client
   * @example clientId "6310750be8f4ab035351fb78"
   */
  @Response(422, "Validation Failed")
  @SuccessResponse("200", "Updated")
  @Put("update/{clientId}")
  public async updateClient(
    @Path() clientId: string,
    @Body() client: Partial<IClients>
  ): Promise<IClients | null> {
    let clientDocument = await ClientsModel.findById(clientId);
    if (clientDocument != null) {
      clientDocument.uID = client.uID ?? clientDocument.uID;
      clientDocument.preferredServiceType =
        client.preferredServiceType ?? clientDocument.preferredServiceType;
      clientDocument.diseases = client.diseases ?? clientDocument.diseases;
      clientDocument.preferences =
        client.preferences ?? clientDocument.preferences;
      return await clientDocument.save();
    }
    return null;
  }
}
