import { HttpService } from './http';
import { config } from '../config';
import { INotification, IUser, ILiveResponse, ILocationResponse, IGrouping } from "../models";

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

    // Check for notifications for each user
    users.result.forEach(async (user: IUser) => {
      const pending: INotification[] = [];
      await NotificationService.shouldNotifyTemperature(domain, user).then((n: any) => n ? pending.push(n) : false);
      await NotificationService.shouldNotifyGrouping(domain, user).then((n: any) => n ? pending.push(n) : false);

      // Sending all notifications for this user
      pending.forEach(async (notif: INotification) => {
        await HttpService.post(`${domain}/api/notifications/create`, notif);
        console.log(`NotificationService: Sent new notification for user ${notif.userId}`);
      });
    });

    return true;
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

  // Sends notification if too many members are gathered in one zone
  shouldNotifyGrouping: async (domain: string, user: IUser) => {
    const data: any = await HttpService.get(`${domain}/api/location/users/${user.userId}`);
    if (data.length === 0) {
      return false;
    }

    const notification: INotification = {
      userId: user.userId,
      priority: 2,
      value: ''
    };

    // Get a count of all the members in each zone
    const count: IGrouping[] = [];
    data.result.forEach((location: ILocationResponse) => {
      const existing = count.find((c: IGrouping) => c.zoneId === location.zoneId);
      if (existing) {
        count[count.indexOf(existing)].count += 1;
      } else {
        count.push({ zoneId: location.zoneId, count: 1 });
      }
    });

    // Determine whether there is a gathering
    count.forEach((c: IGrouping) => {
      if (c.count / data.result.length >= config.warnings.gatheringThreshold) {
        notification.value = `There seems to be a large gathering of members in zone ${c.zoneId}`;
      }
    });

    return notification.value ? notification : false;
  },

}