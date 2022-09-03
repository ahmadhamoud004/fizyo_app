import { Model, Types } from "mongoose";
import AlarmController from "../controllers/alarm_controller";
import { IAlarms } from "../types/interfaces";

describe("AlarmController", () => {
  const AlarmModel: Model<IAlarms> = require("../models/alarms_model");
  const controller = new AlarmController();

  describe("createAlarm", () => {
    it("should be created correctly", async () => {
      expect(
        async () =>
          await controller.createAlarm({
            _id: "6300e18b3bbd975cf645998i3345",
            name: "new therpist",
            referenceType: "Dispute",
            referenceID: "63124dffdcf1e4974079a441",
            frequencyUnit: "Days",
            frequency: 15,
            active: true,
            startDate: new Date("10-11-2022"),
            endDate: new Date("25-11-2022"),
          })
      ).not.toThrow();
    });
  });

  describe("getAlarms", () => {
    it("should get all Alarms", async () => {
      expect(async () => await controller.getAlarms()).not.toThrow();
    });
  });

  describe("updateAlarm", () => {
    it("should update a specific alarm correctly", async () => {
      expect(
        async () =>
          await controller.updateAlarm("6300e18b3bbd975cf645998i3345", {
            frequencyUnit: "Hours",
            frequency: 25,
          })
      ).not.toThrow();
    });
  });

  describe("getAlarm", () => {
    it("should get a specific notification by Id", async () => {
      expect(
        async () => await controller.getAlarm("6300e18b3bbd975cf645998i3345")
      ).not.toThrow();
    });
  });

  describe("deleteAlarm", () => {
    it("should be deleted correctly", async () => {
      expect(
        async () => await controller.deleteAlarm("6300e18b3bbd975cf645998i3345")
      ).not.toThrow();
    });
  });
});
