import { HttpService } from './http';
import { config } from '../config';
import { INotification, IUser, ILiveResponse } from "../models";

export const NotificationService = {

/* TODO:
  1. Member is not in any zone
  2. Too many members in one zone
  3. Temperature is too low / too high
  4. No movement in a while
  5. Moving too quickly
*/

  start: async (domain: string) => {
    const users: any = await HttpService.get(`${domain}/api/users`)//;
    const pending: INotification[] = [];

    // Check for notifications for each user
    users.result.forEach(async (user: IUser) => {
      await NotificationService.shouldNotifyTemperature(domain, user).then((n: any) => n ? pending.push(n) : false);
    });
  },

  // Sends notification if the temperature is too low or too high
  shouldNotifyTemperature: async (domain: string, user: IUser) => {
    const data: any = await HttpService.get(`${domain}/api/live/temperature`);
    if (data.length === 0) {
      return false;
    }

    const notification: INotification = {
      userId: user.userId,
      priority: 1,
      value: ''
    };

    // Check if the temperature is either too low or too high
    const filtered: ILiveResponse[] = data.result.filter((live: ILiveResponse) => user.userId === live.userId);
    filtered.forEach((live: ILiveResponse) => {
      if (live.value <= config.warnings.minTemperature) {
        notification.value = `The temperature appears to be too low reading a value of ${live.value}`;
      }
      if (live.value >= config.warnings.maxTemperature) {
        notification.value = `The temperature appears to be too high reading a value of ${live.value}`;
      }
    })    

    return notification.value ? notification : false;
  },

  // // Sends notification if too many members are gathered in one zone
  // shouldNotifyGrouping: (domain: string): INotification => {

  // },

  // // Sends notification if a member is not in any zone
  // shouldNotifyOutofBounds: (domain: string): INotification => {

  // },

  // // Sends notification if a member has not movement in a while
  // shouldNotifyNoMovement: (domain: string): INotification => {

  // },

  // // Sends notification if a member is moving too quick between zones
  // shouldNotifyFastMovement: (domain: string): INotification => {

  // },
}