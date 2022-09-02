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
import { IEmployees } from "../types/interfaces";

const EmployeesModel: Model<IEmployees> = require("../models/employees_model");

@Route("employees")
export default class EmployeesController {
  /**
   * Get all employees
   */
  @Get("/")
  public async getEmployees(): Promise<IEmployees[]> {
    return await EmployeesModel.find();
  }

  /**
   * Get employee details
   * @example employeeId "       "
   */
  @Response(404, "The requested employee is not found")
  @Get("{employeeId}")
  public async getEmployee(employeeId: string): Promise<IEmployees | null> {
    return await EmployeesModel.findById(employeeId);
  }

  /**
   * Delete employee
   * @example employeeId "ertwerwryer45"
   */
  @Response(404, "The requested role is not found")
  @SuccessResponse("200", "Deleted")
  @Delete("{employeeId}")
  public async deleteEmployee(employeeId: string): Promise<IEmployees | null> {
    return await EmployeesModel.findByIdAndDelete(employeeId);
  }

  /**
   * Create employee
   */
  @Response(422, "Validation failed")
  @SuccessResponse("200", "Created")
  @Example<IEmployees>({
    uID: "_",
    roleID: "_",
    salary: 5000.5,
    attachments: [
      {
        name: "memo",
        url: "www.google.com",
        type: "some type",
      },
    ],
  })
  @Post("create")
  public async createEmployee(
    @Body() employee: IEmployees
  ): Promise<IEmployees> {
    return await new EmployeesModel({ ...employee }).save();
  }

  /**
   * Update employee
   */
  @Response(422, "Validation Failed")
  @SuccessResponse("200", "Updated")
  @Put("update/{employeeId}")
  public async updateEmployee(
    @Path() employeeId: string,
    @Body() employee: Partial<IEmployees>
  ): Promise<IEmployees | null> {
    let employeeDocument = await EmployeesModel.findById(employeeId);
    if (employeeDocument != null) {
      employeeDocument.uID = employee.uID ?? employeeDocument.uID;
      employeeDocument.roleID = employee.roleID ?? employeeDocument.roleID;
      employeeDocument.salary = employee.salary ?? employeeDocument.salary;
      employeeDocument.attachments =
        employee.attachments ?? employeeDocument.attachments;
      return await employeeDocument.save();
    }
    return null;
  }
}
