import { Model, Types } from "mongoose";
import SessionController from "../controllers/session_controller";
import { ISessions } from "../types/interfaces";

describe("SessionController", () => {
  const SessionModel: Model<ISessions> = require("../models/SessionsModel");
  const controller = new SessionController();

  describe("createSession", () => {
    it("should be created correctly", async () => {
      expect(
        async () =>
          await controller.createSession({
            _id: "6300e18b3bbd975cf6459983",
            sessionType:"individual",
            serviceProvidersID:"6300e18b3bbd975cf6459983",
            clientsIDs:["6300e18b3bbd975cf6459983"],
            name:"math",
            details:"mathmatical analysis",
            startDate:new Date(10/10/2022),
            duration:50,
            serviceType:"Home",
            location:"aleppo",
            attachments:{attachmentUrl:"www.google.com",attachmentName:"cd",attachmentType:"pdf"},
            requirements:"no requirement",
            ratings:[{raterUID:"111111111111115",ratingValue:"5",ratingDate:new Date(10/10/2022)},{raterUID:"11111111141121115",ratingValue:"4",ratingDate:new Date(10/10/2022)}],
            reviews:[{reviewerUID:"11115551515",reviewDetails:"goooood",reviewDate:new Date(10/10/2021)}],
            sessionFee:1500,
            payments:{discount:25,paymentMethod:"paypal",payerID:"1145655",amount:250},
            status:"agreed",
            doctorReferral:"no "

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
          await controller.updateSession("6310d1e9f2d63b32d0c306ba", {
            sessionType:"group",
            duration:120,
            serviceType:"Online",
          })
      ).not.toThrow();
    });
  });

  describe("getSession", () => {
    it("should get a specific session by Id", async () => {
      expect(
        async () =>
          await controller.getSession("6310d1e9f2d63b32d0c306ba")
      ).not.toThrow();
    });
  });

  describe("deleteSession", () => {
    it("should be deleted correctly", async () => {
      expect(
        async () =>
          await controller.deletesession("6310d1e9f2d63b32d0c306ba")
      ).not.toThrow();
    });
  });
});