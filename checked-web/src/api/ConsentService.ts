import { HttpService } from "./HttpService";

export const ConsentService = {


    getConditions: async (): Promise<any> => {
        const uri = "legal/copy/conditions";

        return await HttpService.get(uri).then((res: any) => {
            // console.log(res);
            return res.result;
        });
    },


    getPrivacy: async (): Promise<any> => {
        const uri = "legal/copy/privacy";

        return await HttpService.get(uri).then((res: any) => {
            // console.log(res);
            return res.result;
        });
    },


    getConsent: async (): Promise<any> => {
        const uri = "legal/copy/consent";

        return await HttpService.get(uri).then((res: any) => {
            // console.log(res);
            return res.result;
        });
    },



    





};