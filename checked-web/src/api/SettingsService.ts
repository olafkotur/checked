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
        const body = settings;
        return await HttpService.post(uri, body).then((res) => {
            return res;
        });
    }

};