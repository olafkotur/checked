import { HttpService } from "./HttpService";
import { ISettings } from "../types";

export const SettingsService = {

    getUserSettings: async (userId: number): Promise<any> => {
        const uri = "settings/" + userId;
        return await HttpService.get(uri).then((res) => {
            return res;
        });
    },

    setUserSettings: async (userId: number, settings: ISettings): Promise<any> => {
        const uri = "settings/update/" + userId;

        const body = {
            logoImage: settings.logoImage,
            darkMode: settings.darkMode,
            timeZone: settings.timeZone,
            themeColor: settings.themeColor,           
            interval: settings.notifications.interval,
            minTemperature: settings.notifications.minTemperature,
            maxTemperature: settings.notifications.maxTemperature,
            gatheringThreshold: settings.notifications.gatheringThreshold
            
        };
        return await HttpService.post(uri, body).then((res) => {
            console.log(res);
            return res;
        });
    }

};