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
import { IRoles } from "../types/interfaces";

const RolesModel: Model<IRoles> = require("../models/roles_model");

@Route("roles")
export default class RolesController {
  /**
   * Get all of roles
   */
  @Get("/")
  public async getRoles(): Promise<IRoles[]> {
    return await RolesModel.find();
  }

  /**
   * Get role details
   * @example roleId "       "
   */
  @Response(404, "The requested role is not found")
  @Get("{roleId}")
  public async getRole(
    roleId: string
  ): Promise<IRoles | null> {
    return await RolesModel.findById(roleId);
  }

  /**
   * Delete role
   * @example roleId "ertwerwryer45"
   */
  @Response(404, "The requested role is not found")
  @SuccessResponse("200", "Deleted")
  @Delete("{roleId}")
  public async deleteRole(
    roleId: string
  ): Promise<IRoles | null> {
    return await RolesModel.findByIdAndDelete(roleId);
  }

  /**
   * Create role
   */
  @Response(422, "Validation failed")
  @SuccessResponse("200", "Created")
  @Example<IRoles>({
    name: "Admin",
    employees: [],
    users: [],
    service_provider: [],
    clients: [],
    sessions: [],
    communications: [],
    disputes: [],
    enum_values: []
  })
  @Post("create")
  public async createRole(
    @Body() role: IRoles
  ): Promise<IRoles> {
    return await new RolesModel({ ...role }).save();
  }

  /**
   * Update role
   */
  @Response(422, "Validation Failed")
  @SuccessResponse("200", "Updated")
  @Put("update/{roleId}")
  public async updateRole(
    @Path() roleId: string,
    @Body() user: Partial<IRoles>
  ): Promise<IRoles | null> {
    let roleDocument = await RolesModel.findById(
      roleId
    );
    if (roleDocument != null) {
      roleDocument.name = user.name ?? roleDocument.name;
      roleDocument.employees = user.employees ?? roleDocument.employees;
      roleDocument.users = user.users ?? roleDocument.users;
      roleDocument.service_provider = user.service_provider ?? roleDocument.service_provider;
      roleDocument.clients = user.clients ?? roleDocument.clients;
      roleDocument.sessions = user.sessions ?? roleDocument.sessions;
      roleDocument.communications = user.communications ?? roleDocument.communications;
      roleDocument.disputes = user.disputes ?? roleDocument.disputes;
      roleDocument.enum_values = user.enum_values ?? roleDocument.enum_values;
      return await roleDocument.save();
    }
    return null;
  }
}