import { HttpService } from "./HttpService";

export const LinkService = {
    getMembersByOverseer:async (overseerId: string): Promise<any> => {
        const uri = "links/members/" + overseerId;
        return await HttpService.get(uri).then((res) => {
            return res;
        });
    },

};