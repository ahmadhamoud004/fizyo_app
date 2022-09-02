import {
  Get,
  Post,
  Route,
  SuccessResponse,
  Body,
  Response,
  Example,
  Delete,
  Path,
  Put,
} from "tsoa";
import { IAlarms } from "../types/interfaces";
import { Model } from "mongoose";

const AlarmModel: Model<IAlarms> = require("../models/alarms_model");

@Route("alarms")
export default class AlarmController {
  /**
   * Get List of All Alarms
   */
  @Get("/")
  public async getAlarms(): Promise<IAlarms[]> {
    return await AlarmModel.find();
  }

  /**
   * Get a Alarm details
   * @example AlarmId "6300e18d3bbd975cf6459994"
   */
  @Response(404, "the requested Alarm in not found")
  @Get("{alarmId}")
  public async getAlarm(alarmId: string): Promise<IAlarms | null> {
    return await AlarmModel.findById(alarmId);
  }

  /**
   * Delete a alarm
   * @example alarmId "6300e18d3bbd975cf6459994"
   */
  @Response(404, "the requested alarm in not found")
  @SuccessResponse("200", "Deleted")
  @Delete("{alarmId}")
  public async deleteAlarm(alarmId: string) {
    return await AlarmModel.findByIdAndDelete(alarmId);
  }

  /**
   * Create a alarm
   */
  @Response(422, "Validation Failed")
  @SuccessResponse("200", "Created")
  @Example<IAlarms>({
    name: "new therapist",
    referenceType: "disputes",
    referenceID: "155552222",
    frequencyUnit: "Days",
    frequency: 15,
    active: true,
    startDate: new Date("2022-09-10"),
    endDate: new Date("2022-09-10"),
  })
  @Post("create")
  public async createAlarm(@Body() alarm: IAlarms): Promise<IAlarms> {
    return new AlarmModel({
      ...alarm,
    }).save();
  }

  /**
   * Update a alarm
   */
  @Response(422, "Validation Failed")
  @SuccessResponse("200", "updated")
  @Put("update/{alarmId}")
  public async updateAlarm(
    @Path() alarmId: string,
    @Body() alarm: Partial<IAlarms>
  ): Promise<IAlarms | null> {
    let alarmDocument = await AlarmModel.findById(alarmId);
    if (alarmDocument != null) {
      alarmDocument.name = alarm.name ?? alarmDocument.name;
      alarmDocument.referenceType =
        alarm.referenceType ?? alarmDocument.referenceType;
      alarmDocument.referenceID =
        alarm.referenceID ?? alarmDocument.referenceID;

      alarmDocument.frequencyUnit =
        alarm.frequencyUnit ?? alarmDocument.frequencyUnit;
      alarmDocument.frequency = alarm.frequency ?? alarmDocument.frequency;

      alarmDocument.active = alarm.active ?? alarmDocument.active;
      alarmDocument.startDate = alarm.startDate ?? alarmDocument.startDate;
      alarmDocument.endDate = alarm.endDate ?? alarmDocument.endDate;

      return await alarmDocument.save();
    }
    return null;
  }
}
