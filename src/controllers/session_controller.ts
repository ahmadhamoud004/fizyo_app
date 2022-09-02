import {
    Get,
    Post,
    Route,
    SuccessResponse,
    Body,
    Response,
    Example,
    Delete,
    Path,
    Put,
  } from "tsoa";
import { ISessions } from "../types/interfaces";
import { Model } from "mongoose";

const SessionModel: Model<ISessions> = require("../models/SessionsModel");

@Route("sessions")
export default class SessionController {
  /**
   * Get List of All Sessions
   */
  @Get("/")
  public async getSessions(): Promise<ISessions[]> {
    return await SessionModel.find();
  }

   /**
   * Get a Session details
   * @example SessionId "6300e18d3bbd975cf6459994"
   */
    @Response(404, "the requested session in not found")
    @Get("{sessionId}")
    public async getSession(sessionId: string): Promise<ISessions | null> {
      return await SessionModel.findById(sessionId);
    }

    /**
   * Delete a session
   * @example sessionId "6300e18d3bbd975cf6459994"
   */
  @Response(404, "the requested session in not found")
  @SuccessResponse("200", "Deleted")
  @Delete("{sessionId}")
  public async deletesession(sessionId: string) {
    return await SessionModel.findByIdAndDelete(sessionId);
  }

   /**
   * Create a session
   */
    @Response(422, "Validation Failed")
    @SuccessResponse("200", "Created")
    @Example<ISessions>({
        sessionType:"group",
        serviceProvidersID:"6300e18d3bbd975cf6459994" ,
        clientsIDs:["6300e18d3bbd975cf64599"],
        name: "therapist",
        details:"therapost" ,
        startDate:new Date("2022-09-10"),  
        duration:50,
        serviceType:"Home",
        location:"aleppo",
        attachments:{
          attachmentUrl:"attachmentUrl",
          attachmentName:"attachmentName",
          attachmentType:"attachmentType",
        },
        requirements:"",
        ratings:[{
          raterUID:"raterUID",
          ratingValue:"ratingValue",
          ratingDate:new Date("2022-09-10"),
        }],
        reviews:[{
          reviewerUID:"reviewerUID",
          reviewDetails:"reviewDetails",
          reviewDate:new Date("2022-09-10"),
  }],
          sessionFee:25,
           payments:{
            discount:10,
           paymentMethod:"paymentMethod",
           payerID:"payerID",
           amount:10
          },
          status:"agreed",
          doctorReferral:"doctorReferral",
})
    @Post("create")
    public async createSession(@Body() session: ISessions): Promise<ISessions> {
      return new SessionModel({
        ...session,
      }).save();
    }

      /**
   * Update a session
   */
  @Response(422, "Validation Failed")
  @SuccessResponse("200", "updated")
  @Put("update/{sessionId}")
  public async updateSession(
    @Path() sessionId: string,
    @Body() session: Partial<ISessions>
  ): Promise<ISessions | null> {
    let sessionDocument = await SessionModel.findById(sessionId);
    if (sessionDocument != null) {
      sessionDocument.sessionType = session.sessionType ?? sessionDocument.sessionType;
      sessionDocument.serviceProvidersID = session.serviceProvidersID ?? sessionDocument.serviceProvidersID;
      sessionDocument.clientsIDs = session.clientsIDs ?? sessionDocument.clientsIDs;
      sessionDocument.name = session.name ?? sessionDocument.name;
      sessionDocument.details = session.details ?? sessionDocument.details;

      sessionDocument.startDate = session.startDate ?? sessionDocument.startDate;
      sessionDocument.duration = session.duration ?? sessionDocument.duration;
      sessionDocument.serviceType = session.serviceType ?? sessionDocument.serviceType;
      sessionDocument.location = session.location ?? sessionDocument.location;
      sessionDocument.attachments = session.attachments ?? sessionDocument.attachments;
      sessionDocument.requirements = session.requirements ?? sessionDocument.requirements;
      sessionDocument.ratings = session.ratings ?? sessionDocument.ratings;
      sessionDocument.reviews = session.reviews ?? sessionDocument.reviews;
      sessionDocument.sessionFee = session.sessionFee ?? sessionDocument.sessionFee;
      sessionDocument.payments = session.payments ?? sessionDocument.payments;
      sessionDocument.status = session.status ?? sessionDocument.status;
      sessionDocument.doctorReferral = session.doctorReferral ?? sessionDocument.doctorReferral;
      return await sessionDocument.save();
    }
    return null;
  }
}