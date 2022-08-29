import { Model, Types } from 'mongoose';
import CommunicationsController from '../controllers/communications_controller';
import { ICommunications } from '../types/interfaces';

describe('CommunicationController', () => {
  const CommunicationModel: Model<ICommunications> = require('../models/communications_model');
  const controller = new CommunicationsController();

  describe('createCommunication', () => {
    it('should be created correctly', async () => {
      expect(
        async () =>
          await controller.createCommunication({
            _id: '6300e18b3bbd975cf6457777',
            referenceType: 'disputes',
            referenceID: '6300e18b3bbd975cf6456666',
            partiesUIDs: ['6300e18b3bbd975cf6456666'],
            lastUpdate: new Date('2022-09-10'),
            messages: [
              {
                messageType: 'txt',
                messageContent: 'hello',
                senderUID: '123456845522',
                sendDate: new Date('2022-09-10'),
                deliveryDetails: [{ status: 'done' }],
              },
            ],
          })
      ).not.toThrow();
    });
  });

  describe('getCommunications', () => {
    it('should get all communications', async () => {
      expect(async () => await controller.getCommunications()).not.toThrow();
    });
  });

  describe('updateCommunication', () => {
    it('should update a specific communication correctly', async () => {
      expect(
        async () =>
          await controller.updateCommunication('6300e18b3bbd975cf6457777', {
            referenceType: 'agreements',
            messages: [
              {
                messageType: 'voice',
                messageContent: 'hiii',
                senderUID: '123456845522',
                sendDate: new Date('2022-09-10'),
                deliveryDetails: [{ status: 'updated' }],
              },
            ],
          })
      ).not.toThrow();
    });
  });

  describe('getCommunication', () => {
    it('should get a specific communication by Id', async () => {
      expect(
        async () =>
          await controller.getCommunication('6300e18b3bbd975cf6457777')
      ).not.toThrow();
    });
  });

  describe('deleteCommunication', () => {
    it('should be deleted correctly', async () => {
      expect(
        async () =>
          await controller.deleteCommunication('6300e18b3bbd975cf6456666')
      ).not.toThrow();
    });
  });
});
