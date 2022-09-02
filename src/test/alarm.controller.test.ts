import { Model, Types } from "mongoose";
import AlarmController from "../controllers/alarm_controller";
import { IAlarms } from "../types/interfaces";

describe("AlarmController", () => {
  const AlarmModel: Model<IAlarms> = require("../models/AlarmsModel");
  const controller = new AlarmController();

  describe("createAlarm", () => {
    it("should be created correctly", async () => {
      expect(
        async () =>
          await controller.createAlarm({
            _id: "6300e18b3bbd975cf6459983",
            name:"new therpist",
            referenceType:"disputes",
            referenceID:"155552222",
            frequencyUnit:"Days",
            frequency:15,
            active:true,
            startDate:new Date(10/11/2022),
            endDate:new Date(25/11/2022)

          })
      ).not.toThrow();
    });
  });

  describe("getAlarms", () => {
    it("should get all Alarms", async () => {
      expect(async () => await controller.getAlarms()).not.toThrow();
    });
  });

  describe("updatealarm", () => {
    it("should update a specific alarm correctly", async () => {
      expect(
        async () =>
          await controller.updatealarm("6310d1e9f2d63b32d0c306ba", {
            referenceType:"agreements",
            frequencyUnit:"Hours",
            frequency:25
          })
      ).not.toThrow();
    });
  });

  describe("getAlarm", () => {
    it("should get a specific notification by Id", async () => {
      expect(
        async () =>
          await controller.getAlarm("6310d1e9f2d63b32d0c306ba")
      ).not.toThrow();
    });
  });

  describe("deleteAlarm", () => {
    it("should be deleted correctly", async () => {
      expect(
        async () =>
          await controller.deleteAlarm("6310d1e9f2d63b32d0c306ba")
      ).not.toThrow();
    });
  });
});