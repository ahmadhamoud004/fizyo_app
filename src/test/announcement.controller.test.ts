import { Model, Types } from "mongoose";
import AnnouncementController from "../controllers/announcement_controller";
import { IAnnouncements } from "../types/interfaces";

describe("AnnouncementController", () => {
  const AnnouncementModel: Model<IAnnouncements> = require("../models/announcements_model");
  const controller = new AnnouncementController();

  describe("createAnnouncement", () => {
    it("should be created correctly", async () => {
      expect(
        async () =>
          await controller.createAnnouncement({
            _id: "6300e18b3bbd975cf6459983",
            referenceType: "Advertisment",
            referenceID: "11115555555555",
            statues: "draft",
            topic: "new topic",
            details: "The announcement contain info ",
            sentDate: new Date("10-11-2022"),
            attachments: "no attachment",
            receiversUIDs: ["11111111166666660"],
          })
      ).not.toThrow();
    });
  });

  describe("getAnnouncements", () => {
    it("should get all announcements", async () => {
      expect(async () => await controller.getAnnouncements()).not.toThrow();
    });
  });

  describe("updateAnnouncement", () => {
    it("should update a specific session correctly", async () => {
      expect(
        async () =>
          await controller.updateAnnouncement("6310d1e9f2d63b32d0c306ba", {
            referenceType: "Session",
            statues: "published",
            attachments: "new attachments",
            details: "change information",
          })
      ).not.toThrow();
    });
  });

  describe("getAnnouncement", () => {
    it("should get a specific announcement by Id", async () => {
      expect(
        async () => await controller.getAnnouncement("6310d1e9f2d63b32d0c306ba")
      ).not.toThrow();
    });
  });

  describe("deleteSession", () => {
    it("should be deleted correctly", async () => {
      expect(
        async () =>
          await controller.deleteAnnouncement("6310d1e9f2d63b32d0c306ba")
      ).not.toThrow();
    });
  });
});
