import {
  Get,
  Post,
  Delete,
  Put,
  Route,
  SuccessResponse,
  Body,
  Response,
  Example,
  Path,
} from 'tsoa';
import { Model } from 'mongoose';
import { IServiceProviders } from '../types/interfaces';

const ServiceProvidersModel: Model<IServiceProviders> = require('../models/service_providers_model');

@Route('serviceProviders')
export default class ServiceProvidersController {
  /**
   * Get List of All serviceProviders
   */
  @Get('/')
  public async getServiceProviders(): Promise<IServiceProviders[]> {
    return await ServiceProvidersModel.find();
  }

  /**
   * Get a serviceProvider details
   * @example serviceProviderId "       "
   */
  @Response(404, 'The requested serviceProvider is not found')
  @Get('{serviceProviderId}')
  public async getServiceProvider(
    serviceProviderId: string
  ): Promise<IServiceProviders | null> {
    return ServiceProvidersModel.findById(serviceProviderId);
  }

  /**
   * Delete a serverProvider
   * @example serviceProviderId "       "
   */
  @Response(404, 'The requested serviceProvider is not found')
  @SuccessResponse('200', 'Deleted')
  @Delete('{serviceProviderId}')
  public async deleteServiceProvider(
    serviceProviderId: string
  ): Promise<IServiceProviders | null> {
    return ServiceProvidersModel.findByIdAndDelete(serviceProviderId);
  }

  /**
   * Create a serviceProvider
   */

  @Response(422, 'Validation Failed')
  @SuccessResponse('200', 'Created')
  @Example<IServiceProviders>({
    uID: '_',
    bio: 'this is the best',
    specialities: 'Physiotherapist',
    preferredServiceType: ['online', 'home', 'office'],
    minSessionFee: 100.0,
    maxSessionFee: 150.0,
    documents: {
      url: 'http://localhost:8000/documents',
      name: 'certificate',
      type: 'pdf',
    },
    reviewerUIDs: ['123456123457', '123456'],
    verificationStatus: 'notSubmitted',

    verificationDate: new Date('2022-09-10'),
    verifiedByUID: '_',
  })
  @Post('create')
  public async createServiceProvider(
    @Body() serviceProvider: IServiceProviders
  ): Promise<IServiceProviders> {
    return new ServiceProvidersModel({ ...serviceProvider }).save();
  }

  /**
   * Update a ServiceProvider
   */
  @Response(422, 'Validation Failed')
  @SuccessResponse('200', 'Updated')
  @Put('update/{serviceProviderId}')
  public async updateServiceProvider(
    @Path() serviceProviderId: string,
    @Body() serviceProvider: Partial<IServiceProviders>
  ): Promise<IServiceProviders | null> {
    let serviceProviderDocument = await ServiceProvidersModel.findById(
      serviceProviderId
    );
    if (serviceProviderDocument != null) {
      serviceProviderDocument.uID =
        serviceProvider.uID ?? serviceProviderDocument.uID;
      serviceProviderDocument.bio =
        serviceProvider.bio ?? serviceProviderDocument.bio;
      serviceProviderDocument.specialities =
        serviceProvider.specialities ?? serviceProviderDocument.specialities;
      serviceProviderDocument.preferredServiceType =
        serviceProvider.preferredServiceType ??
        serviceProviderDocument.preferredServiceType;
      serviceProviderDocument.minSessionFee =
        serviceProvider.minSessionFee ?? serviceProviderDocument.minSessionFee;
      serviceProviderDocument.maxSessionFee =
        serviceProvider.maxSessionFee ?? serviceProviderDocument.maxSessionFee;
      serviceProviderDocument.documents =
        serviceProvider.documents ?? serviceProviderDocument.documents;
      serviceProviderDocument.reviewerUIDs =
        serviceProvider.reviewerUIDs ?? serviceProviderDocument.reviewerUIDs;
      serviceProviderDocument.verificationStatus =
        serviceProvider.verificationStatus ??
        serviceProviderDocument.verificationStatus;

      serviceProviderDocument.verificationDate =
        serviceProvider.verificationDate ??
        serviceProviderDocument.verificationDate;
      serviceProviderDocument.verifiedByUID =
        serviceProvider.verifiedByUID ?? serviceProviderDocument.verifiedByUID;
      return await serviceProviderDocument.save();
    }
    return null;
  }
}
