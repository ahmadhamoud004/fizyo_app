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
import { IAnnouncements } from "../types/interfaces";
import { Model } from "mongoose";

const AnnouncementModel: Model<IAnnouncements> = require("../models/announcements_model");

@Route("announcements")
export default class AnnouncementController {
  /**
   * Get List of All Announcements
   */
  @Get("/")
  public async getAnnouncements(): Promise<IAnnouncements[]> {
    return await AnnouncementModel.find();
  }

  /**
   * Get a Announcement details
   * @example AnnouncementId "631330dbb5a0b3d3c3d6b0e7"
   */
  @Response(404, "the requested Announcement in not found")
  @Get("{announcementId}")
  public async getAnnouncement(
    announcementId: string
  ): Promise<IAnnouncements | null> {
    return await AnnouncementModel.findById(announcementId);
  }

  /**
   * Delete a announcement
   * @example announcementId "631330dbb5a0b3d3c3d6b0e7"
   */
  @Response(404, "the requested announcement in not found")
  @SuccessResponse("200", "Deleted")
  @Delete("{announcementId}")
  public async deleteAnnouncement(announcementId: string) {
    return await AnnouncementModel.findByIdAndDelete(announcementId);
  }

  /**
   * Create a Announcement
   */

  @Response(422, "Validation Failed")
  @SuccessResponse("200", "Created")
  @Example<IAnnouncements>({
    referenceType: "Session",
    referenceID: "63131c361ea32f520cb28bd6",
    statues: "draft",
    topic: "new topic",
    details: "The announcement contain info ",
    sentDate: new Date("2022-09-10"),
    attachments: [{ name: "personal information" }],
    receiversUIDs: ["63124dffdcf1e4974079a441", "63130ba28d796320172e58d6"],
  })
  @Post("create")
  public async createAnnouncement(
    @Body() announcement: IAnnouncements
  ): Promise<IAnnouncements> {
    return new AnnouncementModel({
      ...announcement,
    }).save();
  }

  /**
   * Update a announcement
   * @example AnnouncementId "631330dbb5a0b3d3c3d6b0e7"
   */
  @Response(422, "Validation Failed")
  @SuccessResponse("200", "updated")
  @Put("update/{announcementId}")
  public async updateAnnouncement(
    @Path() announcementId: string,
    @Body() announcement: Partial<IAnnouncements>
  ): Promise<IAnnouncements | null> {
    let announcementDocument = await AnnouncementModel.findById(announcementId);
    if (announcementDocument != null) {
      announcementDocument.referenceType =
        announcement.referenceType ?? announcementDocument.referenceType;
      announcementDocument.referenceID =
        announcement.referenceID ?? announcementDocument.referenceID;
      announcementDocument.statues =
        announcement.statues ?? announcementDocument.statues;
      announcementDocument.topic =
        announcement.topic ?? announcementDocument.topic;
      announcementDocument.details =
        announcement.details ?? announcementDocument.details;

      announcementDocument.sentDate =
        announcement.sentDate ?? announcementDocument.sentDate;
      announcementDocument.attachments =
        announcement.attachments ?? announcementDocument.attachments;
      announcementDocument.receiversUIDs =
        announcement.receiversUIDs ?? announcementDocument.receiversUIDs;

      return await announcementDocument.save();
    }
    return null;
  }
}
