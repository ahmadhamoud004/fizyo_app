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
import { IUsers } from "../types/interfaces";

const UsersModel: Model<IUsers> = require("../models/users_model");

@Route("users")
export default class UsersController {
  /**
   * Get all of users
   */
  @Get("/")
  public async getUsers(): Promise<IUsers[]> {
    return await UsersModel.find();
  }

  /**
   * Get a user details
   * @example userId "       "
   */
  @Response(404, "The requested user is not found")
  @Get("{userId}")
  public async getUser(userId: string): Promise<IUsers | null> {
    return await UsersModel.findById(userId);
  }

  /**
   * Delete a user
   * @example userId "ertwerwryer45"
   */
  @Response(404, "The requested user is not found")
  @SuccessResponse("200", "Deleted")
  @Delete("{userId}")
  public async deleteUser(userId: string): Promise<IUsers | null> {
    return await UsersModel.findByIdAndDelete(userId);
  }

  /**
   * Create a user
   */
  @Response(422, "Validation failed")
  @SuccessResponse("200", "Created")
  @Example<IUsers>({
    //uID: "43234erwrdfserwr",
    email: "nour@gmail.com",
    phoneNumber: "00352681531905",
    password: "00352681531905",
    profilePicture: "main.png",
    firstName: "Muhammad",
    lastName: "Nour",
    gender: "Male",
    DOB: new Date("2022-09-10"),
    address: [
      {
        country: "Syria",
        government: "SY",
        manipolicity: "Fixed",
      },
    ],
    verified: "notSent",
    status: "active",
    accountType: "EM",
    lastLoginDate: new Date("2022-09-10"),
    accountSetting: { name: "Setting1", value: "Some value" },
    languages: ["AR", "EN"],
    maritalStatus: "single",
  })
  @Post("create")
  public async createUser(@Body() user: IUsers): Promise<IUsers> {
    return await new UsersModel({ ...user }).save();
  }

  /**
   * Update user
   */
  @Response(422, "Validation Failed")
  @SuccessResponse("200", "Updated")
  @Put("update/{userId}")
  public async updateUser(
    @Path() userId: string,
    @Body() user: Partial<IUsers>
  ): Promise<IUsers | null> {
    let userDocument = await UsersModel.findById(userId);
    if (userDocument != null) {
      userDocument.email = user.email ?? userDocument.email;
      userDocument.phoneNumber = user.phoneNumber ?? userDocument.phoneNumber;
      userDocument.password = user.password ?? userDocument.password;
      userDocument.profilePicture = user.profilePicture ?? userDocument.profilePicture;
      userDocument.firstName = user.firstName ?? userDocument.firstName;
      userDocument.lastName = user.lastName ?? userDocument.lastName;
      userDocument.gender = user.gender ?? userDocument.gender;
      userDocument.DOB = user.DOB ?? userDocument.DOB;
      userDocument.address = user.address ?? userDocument.address;
      userDocument.verified = user.verified ?? userDocument.verified;
      userDocument.status = user.status ?? userDocument.status;
      userDocument.accountType = user.accountType ?? userDocument.accountType;
      userDocument.lastLoginDate = user.lastLoginDate ?? userDocument.lastLoginDate;
      userDocument.accountSetting = user.accountSetting ?? userDocument.accountSetting;
      userDocument.languages = user.languages ?? userDocument.languages;
      userDocument.maritalStatus = user.maritalStatus ?? userDocument.maritalStatus;
      return await userDocument.save();
    }
    return null;
  }
}
