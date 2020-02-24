import { HttpService } from "./HttpService";

export const HistoryService = {

    getHistoricByUser: async (userId: number): Promise<any> => {
        const uri = "historic/" + userId;
        return await HttpService.get(uri).then((res: any) => {
            return res;
        });
    },

};