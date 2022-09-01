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
   * Get List of All serviceProviders
   */
  @Get("/")
  public async getClients(): Promise<IClients[]> {
    return await ClientsModel.find();
  }
}
