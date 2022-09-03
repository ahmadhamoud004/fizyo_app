import { Model, Types } from "mongoose";
import CommunicationsController from "../controllers/communications_controller";
import { ICommunications } from "../types/interfaces";

describe("CommunicationsController", () => {
  const CommunicationModel: Model<ICommunications> = require("../models/communications_model");
  const controller = new CommunicationsController();

  describe("createCommunication", () => {
    it("should be created correctly", async () => {
      expect(
        async () =>
          await controller.createCommunication({
            _id: "6313197208b52ee1da804406",
            referenceType: "Dispute",
            referenceID: "6313197208b52ee1da804405",
            partiesUIDs: ["6313197208b52ee1da804405"],
            lastUpdate: new Date("2022-09-10"),
            messages: [
              {
                messageType: "txt",
                messageContent: "hello",
                senderUID: "6313197208b52ee1da804405",
                sendDate: new Date("2022-09-10"),
                deliveryDetails: [{ status: "done" }],
              },
            ],
          })
      ).not.toThrow();
    });
  });

  describe("getCommunications", () => {
    it("should get all communications", async () => {
      expect(async () => await controller.getCommunications()).not.toThrow();
    });
  });

  describe("updateCommunication", () => {
    it("should update a specific communication correctly", async () => {
      expect(
        async () =>
          await controller.updateCommunication("6313197208b52ee1da804406", {
            messages: [
              {
                messageType: "voice",
                messageContent: "hiii",
                senderUID: "6313197208b52ee1da804405",
                sendDate: new Date("2022-09-10"),
                deliveryDetails: [{ status: "updated" }],
              },
            ],
          })
      ).not.toThrow();
    });
  });

  describe("getCommunication", () => {
    it("should get a specific communication by Id", async () => {
      expect(
        async () =>
          await controller.getCommunication("6313197208b52ee1da804406")
      ).not.toThrow();
    });
  });

  describe("deleteCommunication", () => {
    it("should be deleted correctly", async () => {
      expect(
        async () =>
          await controller.deleteCommunication("6313197208b52ee1da804406")
      ).not.toThrow();
    });
  });
});
