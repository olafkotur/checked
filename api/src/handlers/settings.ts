import express from 'express';
import moment from 'moment';
import { ResponseService } from '../services/response';
import { DbHelperService } from '../services/dbHelper';
import { MongoService } from '../services/mongo';
import { ISettingsResponse } from '../types/response';
import { IDbSettings } from '../types/db';

export const SettingHandler = {

  updateSetting: async (req: express.Request, res: express.Response) => {
    const userId: number = parseInt(req.params.userId || '0');
    const exists: boolean = await DbHelperService.exists('users', { userId });
    if (!exists) {
      return ResponseService.bad('Cannot update the settings without a valid userId', res);
    }

    // Get the previous settings for comparison
    const previousSettings: any = await MongoService.findOne('settings', { userId });
    if (previousSettings === null) {
      return ResponseService.notFound('This user does not have any settings associated', res);
    }

    // Update only the new settings that have been provided in the request
    const newSettings: IDbSettings = {
      userId: previousSettings.userId,
      logoImage: req.body.logoImage || previousSettings.logoImage,
      darkMode: req.body.darkMode ? req.body.darkMode === 'true' : previousSettings.darkMode,
      timeZone: req.body.timeZone || previousSettings.timeZone,
      themeColor: req.body.themeColor || previousSettings.themeColor,
      interval: req.body.interval ? parseInt(req.body.interval) : previousSettings.req.body.interval,
      minTemperature: req.body.minTemperature ? parseInt(req.body.minTemperature) : previousSettings.req.body.minTemperature,
      maxTemperature: req.body.maxTemperature ? parseInt(req.body.maxTemperature) : previousSettings.req.body.maxTemperature,
      gatheringThreshold: req.body.gatheringThreshold ? parseFloat(req.body.gatheringThreshold) : previousSettings.req.body.gatheringThreshold,
      createdAt: previousSettings.createdAt,
      lastUpdated: new Date(),
    };

    await MongoService.updateOne('settings', { userId }, newSettings);
    return ResponseService.ok('Updated user settings', res);
  },

  getSettingByUser: async (req: express.Request, res: express.Response) => {
    const userId: number = parseInt(req.params.userId || '0');
    const exists: boolean = await DbHelperService.exists('users', { userId });
    if (!exists) {
      return ResponseService.data({}, res);
    }

    const data: any = await MongoService.findOne('settings', { userId });
    if (data === null) {
      return ResponseService.data({}, res);
    }

    // Convert to a response friendly format
    const formatted: ISettingsResponse = {
      userId: data.userId,
      logoImage: data.logoImage,
      darkMode: data.darkMode,
      timeZone: data.timeZone,
      themeColor: data.themeColor,
      interval: data.interval,
      minTemperature: data.minTemperature,
      maxTemperature: data.maxTemperature,
      gatheringThreshold: data.gatheringThreshold,
      createdAt: moment(data.createdAt).unix(),
      lastUpdated: moment(data.lastUpdated).unix(),
    };

    return ResponseService.data(formatted, res);
  },

};
