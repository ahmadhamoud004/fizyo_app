import { Model, Types } from "mongoose";
import SessionController from "../controllers/session_controller";
import { ISessions } from "../types/interfaces";

describe("SessionController", () => {
  const SessionModel: Model<ISessions> = require("../models/sessions_model");
  const controller = new SessionController();

  describe("createSession", () => {
    it("should be created correctly", async () => {
      expect(
        async () =>
          await controller.createSession({
            _id: "6313197208b52ee1da804777",
            sessionType: "individual",
            serviceProvidersID: "6313197208b52ee1da804405",
            clientsIDs: ["6313197208b52ee1da804405"],
            name: "math",
            details: "mathematical analysis",
            startDate: new Date("2022-10-11"),
            duration: 50,
            serviceType: "Home",
            location: { city: "Aleppo" },
            attachments: {
              attachmentUrl: "www.google.com",
              attachmentName: "cd",
              attachmentType: "pdf",
            },
            requirements: "no requirement",
            ratings: [
              {
                raterUID: "6313197208b52ee1da804405",
                ratingValue: "5",
                ratingDate: new Date("2022-10-11"),
              },
              {
                raterUID: "6313197208b52ee1da804405",
                ratingValue: "4",
                ratingDate: new Date("2022-10-11"),
              },
            ],
            reviews: [
              {
                reviewerUID: "6313197208b52ee1da804405",
                reviewDetails: "goooood",
                reviewDate: new Date("2022-10-11"),
              },
            ],
            sessionFee: 1500,
            payments: {
              discount: 25,
              paymentMethod: "paypal",
              payerID: "6313197208b52ee1da804405",
              amount: 250,
            },
            status: "agreed",
            doctorReferral: "no ",
          })
      ).not.toThrow();
    });
  });

  describe("getSessions", () => {
    it("should get all sessions", async () => {
      expect(async () => await controller.getSessions()).not.toThrow();
    });
  });

  describe("updateSession", () => {
    it("should update a specific session correctly", async () => {
      expect(
        async () =>
          await controller.updateSession("6313197208b52ee1da804777", {
            sessionType: "group",
            duration: 120,
            serviceType: "Online",
          })
      ).not.toThrow();
    });
  });

  describe("getSession", () => {
    it("should get a specific session by Id", async () => {
      expect(
        async () => await controller.getSession("6313197208b52ee1da804777")
      ).not.toThrow();
    });
  });

  describe("deleteSession", () => {
    it("should be deleted correctly", async () => {
      expect(
        async () => await controller.deleteSession("6313197208b52ee1da804777")
      ).not.toThrow();
    });
  });
});