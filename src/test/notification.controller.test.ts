import { Model, Types } from "mongoose";
import NotificationController from "../controllers/notification_controller";
import { INotifications } from "../types/interfaces";

describe("NotificationController", () => {
  const NotificationModel: Model<INotifications> = require("../models/notifications_model");
  const controller = new NotificationController();

  describe("createNotification", () => {
    it("should be created correctly", async () => {
      expect(
        async () =>
          await controller.createNotification({
            _id: "6300e18b3bbd975cf6459983",
            referenceType: "Agreement",
            referenceID: "630ded831cb815c4d98d3du6",
            statues: "opened",
            title: "Warning",
            details: "this notification title",
            sentDate: new Date("10-11-2022"),
            receivedDate: new Date("11-11-2022"),
            openDate: new Date("11-11-2022"),
            receiverUID: "6300e18b3bbd975cf6459983",
          })
      ).not.toThrow();
    });
  });

  describe("getNotifications", () => {
    it("should get all notifications", async () => {
      expect(async () => await controller.getNotifications()).not.toThrow();
    });
  });

  describe("updateNotification", () => {
    it("should update a specific notification correctly", async () => {
      expect(
        async () =>
          await controller.updateNotification("6300e18b3bbd975cf6459983", {
            statues: "opened",
            details: "change information",
          })
      ).not.toThrow();
    });
  });

  describe("getNotification", () => {
    it("should get a specific notification by Id", async () => {
      expect(
        async () => await controller.getNotification("6300e18b3bbd975cf6459983")
      ).not.toThrow();
    });
  });

  describe("deleteNotification", () => {
    it("should be deleted correctly", async () => {
      expect(
        async () =>
          await controller.deleteNotification("6300e18b3bbd975cf6459983")
      ).not.toThrow();
    });
  });
});
