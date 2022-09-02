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
   * @example AnnouncementId "6300e18d3bbd975cf6459994"
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
   * @example announcementId "6300e18d3bbd975cf6459994"
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
    _id: "6300e18b3bbd975cf6459983",
    referenceType: "Advertisment",
    referenceID: "11115555555555",
    statues: "draft",
    topic: "new topic",
    details: "The announcement contain info ",
    sentDate: new Date("2022-09-10"),
    attachments: "no attachment",
    receiversUIDs: ["11111111166666660"],
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
