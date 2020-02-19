import { HttpService } from "./HttpService";

export const NotificationService = {

    getNotisByUser: async (userId: number): Promise<any> => {
        const uri = "notifications/users/" + userId;
        return await HttpService.get(uri).then((res) => {
            return res;
        });
    },

};
