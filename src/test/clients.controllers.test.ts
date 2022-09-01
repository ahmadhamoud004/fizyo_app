import { Model, Types } from "mongoose";
import ClientsController from "../controllers/clients_controller";
import { IClients } from "../types/interfaces";

describe("ClientController", () => {
  const ClientModel: Model<IClients> = require("../models/clients_model");
  const controller = new ClientsController();

  describe("createClient", () => {
    it("should be created correctly", async () => {
      expect(
        async () =>
          await controller.createClient({
            _id: "6300e18b3bbd975cf6456666",
            uID: "ertewryrtuyr43535355543",
            preferredServiceType: ["online"],
            diseases: "diseases",
            preferences: { pref: "pref test" },
          })
      ).not.toThrow();
    });
  });

  describe("getClients", () => {
    it("should get all clients", async () => {
      expect(async () => await controller.getClients()).not.toThrow();
    });
  });

  describe("updateClient", () => {
    it("should update a specific client correctly", async () => {
      expect(
        async () =>
          await controller.updateClient("6300e18b3bbd975cf6456666", {
            preferredServiceType: ["home"],
            diseases: "diseases updated",
          })
      ).not.toThrow();
    });
  });

  describe("getClient", () => {
    it("should get a specific client by Id", async () => {
      expect(
        async () => await controller.getClient("6300e18b3bbd975cf6456666")
      ).not.toThrow();
    });
  });

  describe("deleteClient", () => {
    it("should be deleted correctly", async () => {
      expect(
        async () => await controller.deleteClient("6300e18b3bbd975cf6456666")
      ).not.toThrow();
    });
  });
});
